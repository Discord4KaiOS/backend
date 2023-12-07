import {
	APIAttachment,
	APIMessageReference,
	APIMessage,
	APIOverwrite,
	ChannelFlags,
	ChannelType,
	Snowflake,
	TextChannelType,
	ThreadAutoArchiveDuration,
} from "discord-api-types/v10";
import { DiscordUser } from "./DiscordClient";
import DiscordRequest from "./DiscordRequest";
import Gateway from "./DiscordGateway";
import { Jar, WritableStore, toQuery } from "./lib/utils";
import { DiscordGuild } from "./DiscordGuild";

export function generateNonce() {
	return String(Date.now() * 512 * 1024);
}

interface DiscordChannelBaseProps {
	flags?: ChannelFlags;
}

class DiscordChannelBase<T extends DiscordChannelBaseProps> extends WritableStore<T> {
	type!: ChannelType;
	id!: Snowflake;

	Request?: DiscordRequest;
	Gateway?: Gateway;

	constructor(props: T) {
		super(props);
	}
}

interface DiscordChannelCategoryProps extends DiscordChannelBaseProps {
	name: string;
	position: number;
}

export class DiscordGuildChannelCategory extends DiscordChannelBase<DiscordChannelCategoryProps> {
	type = ChannelType.GuildCategory;

	constructor(
		initialProps: DiscordChannelCategoryProps,
		public id: Snowflake,
		public guild: DiscordGuild
	) {
		super({ name: initialProps.name, position: initialProps.position });
	}
}

interface CreateMessageParams {
	content: string;
	nonce?: string;
	tts?: boolean;
	message_reference?: APIMessageReference;
	// TODO
	//message_components?:
	attachments?: Partial<APIAttachment>[];
}

interface DiscordTextChannelProps extends DiscordChannelBaseProps {
	last_message_id?: Snowflake | null;
	last_pin_timestamp?: string | null;
}

/**
 * TODO:
 * - DiscordReactions/DiscordReaction class
 */
export class DiscordMessage<T extends DiscordTextChannelProps> extends WritableStore<
	Pick<APIMessage, "content" | "pinned"> & {
		edited_timestamp?: null | Date;
	}
> {
	static preserveDeleted = false;
	deleted = new WritableStore(false);

	embeds = new WritableStore<APIMessage["embeds"]>([]);
	attachments = new WritableStore<APIMessage["attachments"]>([]);
	stickers = new WritableStore<APIMessage["sticker_items"]>([]);
	reference?: APIMessageReference;
	id: string;

	constructor(
		public $: APIMessage,
		public author: DiscordUser,
		public $channel: DiscordTextChannel<T>
	) {
		super({
			content: $.content,
			edited_timestamp: $.edited_timestamp ? new Date($.edited_timestamp) : null,
			pinned: $.pinned,
		});

		this.id = $.id;
		this.embeds.set($.embeds);
		this.attachments.set($.attachments);
		this.stickers.set($.sticker_items);
		this.reference = $.message_reference;
	}

	delete() {
		return this.$channel.Request.delete(`channels/${this.$channel.id}/messages/${this.id}`, {});
	}

	pin(put = true) {
		return this.$channel.Request[put ? "put" : "delete"](
			`channels/${this.$channel.id}/pins/${this.id}`,
			{}
		);
	}

	unpin(put = false) {
		return this.pin(put);
	}

	wouldPing(...args: any[]) {
		return false;
	}
}

class MessagesJar<T extends DiscordTextChannelProps> extends Jar<DiscordMessage<T>> {}

class DiscordTextChannel<T extends DiscordTextChannelProps> extends DiscordChannelBase<T> {
	declare type: TextChannelType;

	declare Request: DiscordRequest;

	messages = new MessagesJar<T>();

	constructor(props: T) {
		super(props);
	}

	sendMessage(
		message: string = "",
		opts: Partial<CreateMessageParams> = {},
		attachments?: File[] | Blob[]
	) {
		if (!message && !attachments) throw new Error("Message or attachments must be provided");

		const obj: CreateMessageParams = {
			content: message.trim(),
			nonce: generateNonce(),
			...opts,
		};
		const url = `channels/${this.id}/messages`;

		if (!attachments) {
			return this.Request.post(url, { data: obj });
		}

		const form = new FormData();

		obj.attachments = [];
		const len = attachments.length;
		for (let id = 0; id < len; id++) {
			const file = attachments[id];
			obj.attachments.push({
				id: String(id),
				filename: "name" in file ? file.name : "blob",
			});
			form.append(`files[${id}]`, file);
		}

		form.append("payload_json", JSON.stringify(obj));

		return this.Request.post(url, { data: form });
	}

	getMessages(query: { limit?: number; before?: string; after?: string; around?: string }) {
		return this.Request.get<APIMessage[]>(`channels/${this.id}/messages?` + toQuery(query), {});
	}
}

interface DiscordGuildTextChannelProps extends DiscordTextChannelProps {
	name: string;
	position: number;
	permission_overwrites: APIOverwrite[];

	rate_limit_per_user?: number;

	nsfw: boolean;

	/**
	 * Default duration for newly created threads, in minutes, to automatically archive the thread after recent activity
	 */
	default_auto_archive_duration?: ThreadAutoArchiveDuration;
	/**
	 * The initial `rate_limit_per_user` to set on newly created threads.
	 * This field is copied to the thread at creation time and does not live update
	 */
	default_thread_rate_limit_per_user?: number;

	/**
	 * The channel topic (0-4096 characters for thread-only channels, 0-1024 characters for all others)
	 */
	topic?: string | null;

	/**
	 * ID of the parent category for a channel (each parent category can contain up to 50 channels)
	 *
	 * OR
	 *
	 * ID of the parent channel for a thread
	 */
	parent_id?: Snowflake | null;
}

type GuildTextChannelType = Exclude<TextChannelType, ChannelType.DM | ChannelType.GroupDM>;
export class DiscordGuildTextChannel<
	R extends GuildTextChannelType,
	T extends DiscordGuildTextChannelProps = DiscordGuildTextChannelProps
> extends DiscordTextChannel<T> {
	constructor(props: T, public type: R, public guild: DiscordGuild, public id: Snowflake) {
		super(props);
		this.Request = guild.Request;
		this.Gateway = guild.Gateway;
	}

	favorite = false;

	get userOverrides() {
		return this.guild.userSettings?.channelOverrides.get(this.id);
	}

	roleAccess() {
		return this.guild.parseRoleAccess(this.value.permission_overwrites);
	}
}

interface DiscordDMBaseProps extends DiscordTextChannelProps {}
class DiscordDMBase<T extends DiscordDMBaseProps> extends DiscordTextChannel<T> {
	recipients = new WritableStore<DiscordUser[]>([]);

	constructor(props: T) {
		super(props);
	}
}

export class DiscordDMChannel extends DiscordDMBase<DiscordDMBaseProps> {
	type = ChannelType.DM as TextChannelType;

	constructor(
		initialProps: Partial<DiscordDMBaseProps>,
		public id: Snowflake,
		recipients: DiscordUser[],
		public Request: DiscordRequest,
		public Gateway: Gateway
	) {
		super({ last_message_id: null, last_pin_timestamp: null, ...initialProps });
		this.recipients.set(recipients);
	}
}

interface DiscordGroupDMChannelProps extends DiscordDMBaseProps {
	/**
	 * The name of the channel (1-100 characters)
	 */
	name?: string | null;
	/**
	 * Application id of the group DM creator if it is bot-created
	 */
	application_id?: Snowflake;
	/**
	 * Icon hash
	 */
	icon?: string | null;
	/**
	 * ID of the DM creator
	 */
	owner_id?: Snowflake;
	/**
	 * Whether the channel is managed by an OAuth2 application
	 */
	managed?: boolean;
}
export class DiscordGroupDMChannel extends DiscordDMBase<DiscordGroupDMChannelProps> {
	type = ChannelType.GroupDM as TextChannelType;

	constructor(
		initialProps: Partial<DiscordGroupDMChannelProps>,
		public id: Snowflake,
		recipients: DiscordUser[],
		public Request: DiscordRequest,
		public Gateway: Gateway
	) {
		super({ last_message_id: null, last_pin_timestamp: null, ...initialProps });
		this.recipients.set(recipients);
	}
}
