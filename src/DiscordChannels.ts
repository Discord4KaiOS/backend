import type {
	APIAttachment,
	APIMessageReference,
	APIMessage,
	APIOverwrite,
	ChannelFlags,
	Snowflake,
	ThreadAutoArchiveDuration,
} from "discord-api-types/v10";

import {
	DiscordClientReady,
	DiscordGuildSettingsJar,
	DiscordUser,
	UsersJar,
} from "./DiscordClient";
import DiscordRequest from "./DiscordRequest";
import Gateway from "./DiscordGateway";
import { Jar, WritableStore, toQuery, toVoid, ChannelType } from "./lib/utils";
type TextChannelType =
	| ChannelType.DM
	| ChannelType.GroupDM
	| ChannelType.GuildAnnouncement
	| ChannelType.PublicThread
	| ChannelType.PrivateThread
	| ChannelType.AnnouncementThread
	| ChannelType.GuildText
	| ChannelType.GuildForum
	| ChannelType.GuildVoice
	| ChannelType.GuildStageVoice
	| ChannelType.GuildMedia;

import { DiscordGuild } from "./DiscordGuild";

export function generateNonce() {
	return String(Date.now() * 512 * 1024);
}

interface DiscordChannelBaseProps {
	flags?: ChannelFlags;
}

abstract class DiscordChannelBase<T extends DiscordChannelBaseProps> extends WritableStore<T> {
	abstract type: ChannelType;
	abstract id: Snowflake;

	abstract Request: DiscordRequest;
	abstract Gateway: Gateway;

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

	Request: DiscordRequest;
	Gateway: Gateway;

	constructor(
		initialProps: DiscordChannelCategoryProps,
		public id: Snowflake,
		public guild: DiscordGuild
	) {
		super({ name: initialProps.name, position: initialProps.position });
		this.Request = guild.Request;
		this.Gateway = guild.Gateway;
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

let preserveDeleted = false;

/**
 * TODO: DiscordReactions/DiscordReaction class
 */
export class DiscordMessage<T extends DiscordTextChannelProps> extends WritableStore<
	Pick<APIMessage, "content" | "pinned" | "edited_timestamp">
> {
	get [Symbol.toStringTag || Symbol()]() {
		return "DiscordMessage";
	}

	static get preserveDeleted() {
		return preserveDeleted;
	}

	static set preserveDeleted(val) {
		preserveDeleted = val;
	}

	deleted = new WritableStore(false);

	embeds = new WritableStore<APIMessage["embeds"]>([]);
	attachments = new WritableStore<APIMessage["attachments"]>([]);
	stickers = new WritableStore<APIMessage["sticker_items"]>([]);
	reference?: APIMessageReference;
	id: string;
	user_id: string;

	constructor(
		public $: APIMessage,
		public author: DiscordUser,
		public $channel: DiscordTextChannel<T>,
		public $guild: DiscordGuild | null = null
	) {
		super({
			content: $.content,
			edited_timestamp: $.edited_timestamp,
			pinned: $.pinned,
		});

		this.id = $.id;
		this.embeds.set($.embeds);
		this.attachments.set($.attachments);
		this.stickers.set($.sticker_items);
		this.reference = $.message_reference;

		this.user_id = $channel.Request.config.user_id!;
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

	/**
	 * TODO: figure out how message editing actually works
	 */
	edit(content: string, opts: any = {}) {
		return this.$channel.Request.patch(`channels/${this.$channel.id}/messages/${this.id}`, {
			data: { content, ...opts },
		});
	}

	reply(content: string, opts: Partial<CreateMessageParams> = {}, attachments?: File[] | Blob[]) {
		return this.$channel.sendMessage(
			content,
			{
				...opts,
				message_reference: {
					message_id: this.id,
					channel_id: this.$channel.id,
				},
			},
			attachments
		);
	}

	wouldPing() {
		const userID = this.user_id;

		const { mention_everyone, mentions, mention_roles } = this.$;

		const initialResult = Boolean(mention_everyone || mentions?.find((a) => a.id == userID));

		if (initialResult) return true;

		if (this.$guild && mention_roles) {
			const roles = this.$guild.$users.get(userID)?.profiles.get(this.$guild.id)?.value.roles;
			if (roles) return Boolean(mention_roles.some((r) => roles.includes(r)));
		}

		return false;
	}
}

function minutesDiff(performance_now: number) {
	return Math.floor(Math.abs(performance.now() - performance_now) / 1000 / 60);
}

export class MessagesJar<T extends DiscordTextChannelProps> extends Jar<DiscordMessage<T>> {
	constructor(public $channel: DiscordTextChannel<T>) {
		super();
	}

	lastPush = performance.now();
	state = new WritableStore<DiscordMessage<T>[]>([]);

	private _messageType = DiscordMessage;

	newMessage(message: APIMessage) {
		const user = this.$channel.$client.addUser(message.author);
		const m = new this._messageType(message, user, this.$channel);
		return m;
	}

	/**
	 * run this every time the state is being accessed
	 */
	async refresh() {
		const currentState = this.state.value;
		// if it's been more than 3 minutes since the last time gateway pushed messages,
		// we have to check if there's been new messages that hasn't been pushed
		if (minutesDiff(this.lastPush) > 3 && currentState.length > 0) {
			const mResp = this.$channel.getMessages({ limit: 100, after: currentState.at(-1)!.id });
			const messages = await mResp.response();

			this.lastPush = performance.now();

			if (messages.length) this.converge(messages);
		}
	}

	setMessageType(type: typeof DiscordMessage) {
		this._messageType = type;
	}

	update(message: Partial<APIMessage>) {
		const has = this.get(message.id!);
		if (!has) return null;

		has.shallowSet(
			toVoid({
				content: message.content!,
				edited_timestamp: message.edited_timestamp!,
				pinned: message.pinned!,
			})
		);

		return has;
	}

	/**
	 * used when you append from a gateway event
	 */
	append(message: APIMessage) {
		// just in case
		const attemptToUpdate = this.update(message);

		// if an update was successful, then return the update
		if (attemptToUpdate) {
			return attemptToUpdate;
		}

		const m = this.newMessage(message);
		this.state.update((s) => s.concat(m));
		this.set(m.id, m);

		this.lastPush = performance.now();
		return m;
	}

	converge(messages: APIMessage[]) {
		// filtered only contains messages not found in the newer batch
		const filtered = this.state.value.filter((m) => {
			const found = messages.find((mm) => mm.id === m.id);

			// if NOT found, then add
			// else don't add
			return !found;
		});

		messages.forEach((m) => {
			const has = this.get(m.id);

			if (has) {
				// if message is already present in the jar, update it
				has.shallowSet({
					content: m.content,
					edited_timestamp: m.edited_timestamp,
					pinned: m.pinned,
				});

				filtered.push(has);
			} else {
				const message = this.newMessage(m);
				this.set(m.id, message);

				filtered.push(message);
			}
		});

		// sort by ID, or maybe by timestamp?
		filtered.sort((a, b) => {
			if (a.id < b.id) return -1;
			if (a.id > b.id) return 1;
			return 0;
		});

		this.state.shallowSet(filtered);
	}

	private async _loadMessages(limit = 15) {
		const currentState = this.state.value;

		// if we currently have more messages than the limit, we have to fetch more
		if (currentState.length >= limit) {
			const messages = await this.$channel
				.getMessages({ before: currentState[0].id, limit })
				.response();
			this.converge(messages);
			return messages;
		} else {
			const mResp = this.$channel.getMessages({ limit });
			const messages = await mResp.response();
			this.converge(messages);
			return messages;
		}
	}

	private loadMessagesPromise: ReturnType<typeof this._loadMessages> | null = null;

	async loadMessages(limit = 15) {
		if (this.loadMessagesPromise) return this.loadMessagesPromise;
		const promise = this._loadMessages(limit);
		this.loadMessagesPromise = promise;
		await promise;
		this.loadMessagesPromise = null;
		return promise;
	}

	remove(id: Snowflake) {
		const has = this.get(id);
		if (!has) return;

		if (DiscordMessage.preserveDeleted) {
			has.deleted.set(true);
		} else {
			const currentState = this.state.value;
			currentState.splice(currentState.indexOf(has), 1);
			this.state.set(currentState.slice(0));
			this.delete(id);
		}
	}

	removeBulk(ids: Snowflake[]) {
		const currentState = this.state.value;

		ids.forEach((id) => {
			// the code used if preserved is more efficient
			if (DiscordMessage.preserveDeleted) this.remove(id);
			else {
				const has = this.get(id);
				if (!has) return;

				currentState.splice(currentState.indexOf(has), 1);
				this.delete(id);
			}
		});

		this.state.set(currentState.slice(0));
	}
}

class TypingState<T extends DiscordTextChannelProps> extends WritableStore<DiscordUser[]> {
	constructor(public $channel: DiscordTextChannel<T>) {
		super([]);
	}

	private _user?: DiscordUser;

	getUser() {
		return (
			this._user || (this._user = this.$channel.$users.get(this.$channel.Request.config.user_id!)!)
		);
	}

	users = new Set<DiscordUser>();
	timeouts = new Map<DiscordUser, ReturnType<typeof setTimeout>>();

	sync() {
		this.shallowSet([...this.users]);
	}

	add(user: DiscordUser) {
		const previousTimeout = this.timeouts.get(user);
		clearTimeout(previousTimeout!);

		this.users.add(user);
		this.sync();

		this.timeouts.set(
			user,
			setTimeout(() => {
				this.users.delete(user);
				this.sync();
			}, 9000)
		);
	}

	/**
	 * use this to handle typing for the current user
	 */
	debounce() {
		const user = this.getUser();
		if (this.users.has(user)) return;

		this.$channel.Request.post(`channels/${this.$channel.id}/typing`, {});
		this.add(user);
	}
}

abstract class DiscordTextChannel<T extends DiscordTextChannelProps> extends DiscordChannelBase<T> {
	abstract type: TextChannelType;
	abstract id: Snowflake;

	abstract Request: DiscordRequest;
	abstract Gateway: Gateway;

	abstract $users: UsersJar;
	abstract $client: DiscordClientReady;
	messages = new MessagesJar<T>(this);

	typingState = new TypingState<T>(this);

	lastMessageID = new WritableStore<Snowflake | null>(null);

	constructor(props: T) {
		super(props);
	}

	sendMessage(
		content: string = "",
		opts: Partial<CreateMessageParams> = {},
		attachments?: File[] | Blob[]
	) {
		if (!content && !attachments) throw new Error("Message or attachments must be provided");

		const obj: CreateMessageParams = {
			content: content.trim(),
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

	ack() {
		return this.Request.post(`channels/${this.id}/messages/${this.lastMessageID.value}/ack`, {
			data: { token: "null" },
		});
	}

	// TODO: implement .isMuted() on DiscordTextChannel
	isMuted() {
		return false;
	}

	get readState() {
		return this.$client.readStates.get(this.id)!;
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
	Request: DiscordRequest;
	Gateway: Gateway;
	$users: UsersJar;
	$client: DiscordClientReady;

	constructor(props: T, public type: R, public guild: DiscordGuild, public id: Snowflake) {
		super(props);
		this.Request = guild.Request;
		this.Gateway = guild.Gateway;
		this.$users = guild.$users;
		this.$client = guild.$users.$client;
		this.lastMessageID.set(props.last_message_id || null);
	}

	favorite = false;

	get userOverrides() {
		return this.guild.userSettings?.channelOverrides.get(this.id);
	}

	roleAccess() {
		return this.guild.parseRoleAccess(this.value.permission_overwrites);
	}
}

export class DiscordDirectMessage<T extends DiscordDMBaseProps> extends DiscordMessage<T> {
	/**
	 * @param appended - whether this function is being called because a new message was created
	 */
	wouldPing(appended = true) {
		// if this was newly created and the channel is NOT muted, then ping
		// else use the default implementation
		return Boolean(appended && !this.$channel.isMuted()) || super.wouldPing();
	}
}

interface DiscordDMBaseProps extends DiscordTextChannelProps {}
abstract class DiscordDMBase<T extends DiscordDMBaseProps> extends DiscordTextChannel<T> {
	recipients = new WritableStore<DiscordUser[]>([]);

	abstract type: TextChannelType;
	abstract id: Snowflake;
	abstract Request: DiscordRequest;
	abstract Gateway: Gateway;
	abstract $users: UsersJar;
	abstract $guildSettings: DiscordGuildSettingsJar;

	constructor(props: T) {
		super(props);
		this.messages.setMessageType(DiscordDirectMessage);
		this.lastMessageID.set(props.last_message_id || null);
	}

	isMuted() {
		const override = this.$guildSettings.get(null)?.channelOverrides.get(this.id);
		if (override) return override.value.muted;

		return false;
	}
}

export class DiscordDMChannel extends DiscordDMBase<DiscordDMBaseProps> {
	type = ChannelType.DM as TextChannelType;
	$users: UsersJar;

	Request: DiscordRequest;
	Gateway: Gateway;
	$guildSettings: DiscordGuildSettingsJar;

	constructor(
		initialProps: Partial<DiscordDMBaseProps>,
		public id: Snowflake,
		recipients: DiscordUser[],
		public $client: DiscordClientReady
	) {
		super({ last_message_id: null, last_pin_timestamp: null, ...initialProps });
		this.recipients.set(recipients);
		this.$users = $client.users;
		this.Request = $client.Request;
		this.Gateway = $client.Gateway;
		this.$guildSettings = $client.guildSettings;
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
	$users: UsersJar;

	Request: DiscordRequest;
	Gateway: Gateway;
	$guildSettings: DiscordGuildSettingsJar;

	constructor(
		initialProps: Partial<DiscordGroupDMChannelProps>,
		public id: Snowflake,
		recipients: DiscordUser[],
		public $client: DiscordClientReady
	) {
		super({ last_message_id: null, last_pin_timestamp: null, ...initialProps });
		this.recipients.set(recipients);
		this.$users = $client.users;
		this.Request = $client.Request;
		this.Gateway = $client.Gateway;
		this.$guildSettings = $client.guildSettings;
	}
}
