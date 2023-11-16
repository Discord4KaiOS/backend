import {
	APIAttachment,
	APIGuildTextChannel,
	APIMessageReference,
	APIOverwrite,
	APIUser,
	ChannelFlags,
	ChannelType,
	GuildTextChannelType,
	Snowflake,
	TextChannelType,
	ThreadAutoArchiveDuration,
} from "discord-api-types/v10";
import { DiscordClientInit, DiscordUser } from "./DiscordClient";
import DiscordRequest from "./DiscordRequest";
import Gateway from "./DiscordGateway";
import { Invalidator, Subscriber, Unsubscriber, Updater, get, writable } from "./lib/stores";
import { WritableStore } from "./lib/utils";

export function generateNonce() {
	return String(Date.now() * 512 * 1024);
}

interface DiscordChannelBaseProps {
	flags?: ChannelFlags;
}

class _ExtendStore<T = any> extends WritableStore<T> {}

class DiscordChannelBase<T extends DiscordChannelBaseProps> extends _ExtendStore<T> {
	type!: ChannelType;
	id!: Snowflake;

	Request!: DiscordRequest;
	Gateway!: Gateway;

	constructor(props: T) {
		super(props);
	}
}

interface CreateMessageParams {
	content: string;
	nonce?: string;
	tts?: boolean;
	message_reference?: APIMessageReference;
	//message_components?: // TODO
	attachments?: Partial<APIAttachment>[];
}

interface DiscordTextChannelProps extends DiscordChannelBaseProps {
	last_message_id?: Snowflake | null;
	last_pin_timestamp: string | null;
}

class DiscordTextChannel<T extends DiscordTextChannelProps> extends DiscordChannelBase<T> {
	declare type: TextChannelType;

	constructor(props: T) {
		super(props);
	}

	sendMessage(message: string = "", opts: Partial<CreateMessageParams> = {}, attachments?: File[] | Blob[]) {
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
}

interface DiscordGuildTextChannelProps extends DiscordTextChannelProps {
	name: string;
	position: number;
	permission_overwrites: APIOverwrite[];

	rate_limit_per_user: number;

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
	parent_id: Snowflake | null;
}

class DiscordGuildTextChannel<T extends DiscordGuildTextChannelProps> extends DiscordTextChannel<T> {
	declare type: GuildTextChannelType;
	guild_id!: Snowflake;

	constructor(props: T) {
		super(props);
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

	constructor(initialProps: Partial<DiscordDMBaseProps>, public id: Snowflake, public Request: DiscordRequest, public Gateway: Gateway) {
		super({ last_message_id: null, last_pin_timestamp: null, ...initialProps });
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

	constructor(initialProps: Partial<DiscordGroupDMChannelProps>, public id: Snowflake, public Request: DiscordRequest, public Gateway: Gateway) {
		super({ last_message_id: null, last_pin_timestamp: null, ...initialProps });
	}
}
