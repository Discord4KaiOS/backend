import type {
	APIAttachment,
	APIMessageReference,
	APIMessage,
	APIOverwrite,
	ChannelFlags,
	Snowflake,
	ThreadAutoArchiveDuration,
	APIEmoji,
	APIReaction,
} from "discord-api-types/v10";

import {
	DiscordClientReady,
	DiscordGuildSettingsJar,
	DiscordUser,
	UsersJar,
} from "./DiscordClient";
import DiscordRequest, { ResponsePost } from "./DiscordRequest";
import Gateway from "./DiscordGateway";
import { Jar, WritableStore, toQuery, toVoid, ChannelType, mergeLikeSet } from "./lib/utils";
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
import { Signal, signal } from "@preact/signals";
import EventEmitter from "./lib/EventEmitter";
import Deferred from "./lib/Deffered";

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
	type?: number;

	flags?: number;
	channel_id?: string;
	sticker_ids?: string[];
}

interface DiscordTextChannelProps extends DiscordChannelBaseProps {
	last_message_id?: Snowflake | null;
	last_pin_timestamp?: string | null;
}

let preserveDeleted = false;

/**
 * TODO: DiscordReactions/DiscordReaction class
 */

export class MessageReaction extends WritableStore<{
	count: number;
	/**
	 * reacted by ME-hee-hee
	 */
	me: boolean;
	emoji: APIEmoji;
}> {
	constructor(public $: APIReaction, public $message: DiscordMessage<DiscordTextChannelProps>) {
		super({
			count: $.count,
			me: $.me,
			emoji: $.emoji,
		});
	}

	toggle() {
		return this.$message.$channel.Request[this.value.me ? "delete" : "put"](
			`channels/${this.$message.$channel.id}/messages/${this.$message.id}/reactions/${emojiURI(
				this.$.emoji
			)}/@me`,
			{}
		);
	}

	/**
	 *
	 * @param me whether the reaction was added by me
	 */
	addCount(me = false) {
		const count = this.value.count + 1;
		this.setState({ count, me });
	}

	/**
	 *
	 * @param me whether the reaction was removed by me
	 */
	removeCount(me = false) {
		const count = this.value.count - 1;

		this.setState({ count, me: me ? false : this.value.me });
	}
}

function emojiURI(emoji: APIEmoji | string) {
	const en = encodeURIComponent;
	if (typeof emoji === "object") {
		return emoji.id ? en(emoji.name + ":" + emoji.id) : en(emoji.name || "");
	}
	return en(String(emoji));
}

export class DiscordMessageReactionsJar extends Jar<MessageReaction> {
	state = new WritableStore<MessageReaction[]>([]);

	constructor(public $message: DiscordMessage<any>) {
		super();
	}

	refresh() {
		this.list().forEach((a) => {
			const emoji = a.value.emoji;
			if (a.value.count === 0) this.delete(emoji.id || emoji.name!);
		});

		this.state.set(this.list());
	}

	insert(reaction: APIReaction) {
		const id = reaction.emoji.id || reaction.emoji.name;
		if (!id) throw new Error("Invalid emoji");
		const has = this.get(id);

		if (has) {
			has.setState(reaction);
			return has;
		}

		const r = new MessageReaction(reaction, this.$message);

		this.set(id, r);

		this.refresh();
		return r;
	}

	detach(emoji: APIEmoji) {
		const id = emoji.id || emoji.name;
		if (!id) throw new Error("Invalid emoji");
		const has = this.get(id);
		if (!has) return;

		this.delete(id);
		this.refresh();
	}

	addCount(emoji: APIEmoji, me = false) {
		const id = emoji.id || emoji.name;
		if (!id) throw new Error("Invalid emoji");
		const has = this.get(id);
		if (!has) {
			this.insert({ emoji, count: 1, me } as any);
			return;
		}

		has.addCount(me);
		this.refresh();
	}

	removeCount(emoji: APIEmoji, me = false) {
		const id = emoji.id || emoji.name;
		if (!id) throw new Error("Invalid emoji");
		const has = this.get(id);
		if (!has) return;

		has.removeCount(me);
		this.refresh();
	}

	detachAll() {
		this.state.set([]);
		this.clear();
	}

	private reaction(method: "put" | "delete", emoji: APIEmoji | string, user = "@me") {
		return this.$message.$channel.Request[method](
			`channels/${this.$message.$channel.id}/messages/${this.$message.id}/reactions/${emojiURI(
				emoji
			)}/${user}`,
			{}
		);
	}

	addReaction(emoji: APIEmoji | string, user = "@me") {
		return this.reaction("put", emoji, user);
	}

	removeReaction(emoji: APIEmoji | string, user = "@me") {
		return this.reaction("delete", emoji, user);
	}

	deleteAllReaction() {
		return this.$message.$channel.Request.delete(
			`channels/${this.$message.$channel.id}/messages/${this.$message.id}/reactions`,
			{}
		);
	}

	deleteAllReactionEmoji(emoji: APIEmoji | string) {
		return this.$message.$channel.Request.delete(
			`channels/${this.$message.$channel.id}/messages/${this.$message.id}/reactions/${emojiURI(
				emoji
			)}`,
			{}
		);
	}
}

export class DiscordMessage<
	T extends DiscordTextChannelProps = DiscordTextChannelProps
> extends WritableStore<Pick<APIMessage, "content" | "pinned" | "edited_timestamp">> {
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

	reactions: DiscordMessageReactionsJar;

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

		this.reactions = new DiscordMessageReactionsJar(this);

		$.reactions?.forEach((a) => {
			this.reactions.insert(a);
		});
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

	canPin() {
		const channel = this.$channel as DiscordGuildTextChannel | DiscordTextChannel<T>;

		if ("roleAccess" in channel) {
			const access = channel.roleAccess();
			// you can't pin if you can't manage messages
			if (access.MANAGE_MESSAGES !== true) return false;
		}

		// you can pretty much pin anywhere
		// you can only pin if message is default or a reply
		return [0, 19].includes(this.$.type);
	}

	/**
	 * TODO: figure out how message editing actually works
	 */
	edit(content: string, opts: any = {}) {
		return this.$channel.Request.patch(`channels/${this.$channel.id}/messages/${this.id}`, {
			data: { content, ...opts },
		});
	}

	isEditable() {
		// you can't edit voice messages
		if (this.$.flags == 8192) return false;
		if ([0, 19].includes(this.$.type) && this.user_id == this.author.id)
			// default message type or reply, you can only edit your own messages
			return true;

		return false;
	}

	reply(
		content: string,
		opts: Partial<CreateMessageParams> = {},
		attachments?: (Partial<APIAttachment> & {
			blob: File | Blob;
		})[]
	) {
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

	isRepliable() {
		const channel = this.$channel as DiscordGuildTextChannel | DiscordTextChannel<T>;

		if ("roleAccess" in channel) {
			const access = channel.roleAccess();
			// you can't reply if you can't send messages
			if (access.SEND_MESSAGES === false) return false;
		}

		// you can only reply if message is default or a reply
		if ([0, 19].includes(this.$.type)) return true;

		return false;
	}

	wouldPing(...args: any) {
		const userID = this.user_id;

		const { mention_everyone, mentions, mention_roles } = this.$;

		const initialResult = Boolean(
			mention_everyone || (userID != this.author.id && mentions?.find((a) => a.id == userID))
		);

		if (initialResult) return true;

		if (this.$guild && mention_roles) {
			const roles = this.$guild.$users.get(userID)?.profiles.get(this.$guild.id)?.value.roles;
			if (roles) return Boolean(mention_roles.some((r) => roles.includes(r)));
		}

		return false;
	}

	canDelete() {
		const isSameUser = this.author.id === this.user_id;

		if (isSameUser) return true;

		const channel = this.$channel as DiscordGuildTextChannel | DiscordTextChannel<T>;

		if ("roleAccess" in channel) {
			const access = channel.roleAccess();
			return access.MANAGE_MESSAGES === true;
		}

		return false;
	}
}

function minutesDiff(performance_now: number) {
	return Math.floor(Math.abs(performance.now() - performance_now) / 1000 / 60);
}

export class MessagesJar<T extends DiscordTextChannelProps = DiscordTextChannelProps> extends Jar<
	DiscordMessage<T>
> {
	constructor(public $channel: DiscordTextChannel<T>) {
		super();
	}

	lastPush = performance.now();
	state = new WritableStore<DiscordMessage<T>[]>([]);

	private _messageType = DiscordMessage;

	updateWaiting(m: DiscordMessage<T>) {
		const waiting = this.waiting.get(m.id);
		if (waiting) {
			this.waiting.delete(m.id);
			waiting.value = m;
		}
	}

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

	waiting = new Map<string, Signal<DiscordMessage<T> | null>>();

	waitForMessage(id: string) {
		const has = this.get(id);
		if (has) return signal(has);

		const hasBeenWaiting = this.waiting.get(id);
		if (hasBeenWaiting) {
			return hasBeenWaiting;
		}

		const _signal = signal<DiscordMessage<T> | null>(null);
		this.waiting.set(id, _signal);
		return _signal;
	}

	update(message: Partial<APIMessage>) {
		const has = this.get(message.id!);
		if (!has) return null;

		message.embeds && has.embeds.deepSet(message.embeds);
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
		this.updateWaiting(m);

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

				// if message is a reply,
				// then add reference to jar without converging
				if (m.referenced_message) {
					const ref = m.referenced_message;
					const has = this.get(ref.id);
					if (has) {
						has.shallowSet({
							content: ref.content,
							edited_timestamp: ref.edited_timestamp,
							pinned: ref.pinned,
						});
						this.updateWaiting(has);
					} else {
						const m = this.newMessage(ref);
						this.set(m.id, m);
						this.updateWaiting(m);
					}
				}

				this.set(m.id, message);
				this.updateWaiting(message);

				filtered.push(message);
			}
		});

		// sort by ID, or maybe by timestamp?
		filtered.sort((a, b) => {
			const _a = new Date(a.$.timestamp).getTime();
			const _b = new Date(b.$.timestamp).getTime();

			return _a - _b;
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

let id_pool = 12;

class AttachmentUploadProgress extends EventEmitter<{ abort: [] }> {
	aborted = false;
	responses: Promise<{
		response: ResponsePost<any>;
		id: number;
		upload_url: string;
		upload_filename: string;
		filename: string;
		__index: number;
	}>[];
	messageCreated: Promise<ResponsePost<any>>;
	private messageCreatedDeferred: Deferred<ResponsePost<any>>;

	constructor(
		public content: string,
		public opts: Partial<Omit<CreateMessageParams, "attachments">>,
		public attachments: (Partial<APIAttachment> & {
			blob: File | Blob;
		})[],
		public $channel: DiscordTextChannel<any>
	) {
		super();

		const responses = attachments.map(async (attachment, i) => {
			const { blob, ...file } = attachment;
			const filename = file.filename || ("name" in blob ? blob.name : "blob");

			const askForUploadURL = $channel.Request.post(`channels/${$channel.id}/attachments`, {
				data: {
					files: [
						{
							filename,
							file_size: blob.size,
							id: String(++id_pool),
							is_clip: false,
						},
					],
				},
			});

			const { attachments } = await askForUploadURL.response();

			if (!attachments.length) throw new Error("No attachments");

			const a = attachments[0] as {
				id: number;
				upload_url: string;
				upload_filename: string;
			};

			const pseudoPostReq = new ResponsePost(
				$channel.Request.put(a.upload_url, {
					data: blob,
					headers: {
						"Content-Type": "application/octet-stream",
					},
				})
			);

			this.on("abort", () => {
				pseudoPostReq.xhr.abort();
			});

			return {
				...a,
				filename,
				response: pseudoPostReq,
				__index: i,
			};
		});
		this.responses = responses;
		this.handleResponses();

		const deferred_createMessage = new Deferred<ResponsePost<any>>();
		this.messageCreated = deferred_createMessage.promise;
		this.messageCreatedDeferred = deferred_createMessage;
	}

	private async handleResponses() {
		const successfulUploads: Array<{
			upload_url: string;
			upload_filename: string;
			filename: string;
			__index: number;
		}> = [];

		for (let i = 0; i < this.responses.length; i++) {
			if (this.aborted) {
				return;
			}

			try {
				const response = await this.responses[i];
				await response.response.response();
				successfulUploads.push(response);
			} catch {}
		}

		if (this.aborted) return;

		const obj: CreateMessageParams = {
			content: this.content.trim(),
			nonce: generateNonce(),
			...this.opts,
			attachments: successfulUploads.map((a, i) => {
				const apiAttachemnt = this.attachments[a.__index] || null;

				return {
					id: String(i),
					filename: a.filename,
					uploaded_filename: a.upload_filename,
					...apiAttachemnt,
					blob: undefined,
				};
			}),
		};

		const url = `channels/${this.$channel.id}/messages`;

		this.messageCreatedDeferred.resolve(this.$channel.Request.post(url, { data: obj }));
	}

	abort() {
		this.aborted = true;
		this.emit("abort");
	}
}

abstract class DiscordTextChannel<
	T extends DiscordTextChannelProps = DiscordTextChannelProps
> extends DiscordChannelBase<T> {
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
		opts: Partial<Omit<CreateMessageParams, "attachments">> = {},
		attachments?: (Partial<APIAttachment> & {
			blob: File | Blob;
		})[]
	): ResponsePost<any> | AttachmentUploadProgress {
		if (!content && !attachments) throw new Error("Message or attachments must be provided");

		const obj: CreateMessageParams = {
			content: content.trim(),
			nonce: generateNonce(),
			...opts,
		};
		const url = `channels/${this.id}/messages`;

		const _attachments = attachments || [];
		if (!_attachments.length) {
			return this.Request.post(url, { data: obj });
		}

		return new AttachmentUploadProgress(content, opts, _attachments, this);

		/*
		const form = new FormData();

		obj.attachments = [];

		const len = _attachments.length;
		for (let id = 0; id < len; id++) {
			const { blob, ...file } = _attachments[id];

			const filename = file.filename || ("name" in blob ? blob.name : "blob");

			obj.attachments.push({
				...file,
				id: id as any,
				filename: filename,
			});
			form.append(`files[${id}]`, blob, filename);
		}

		form.append("payload_json", new Blob([JSON.stringify(obj)], { type: "application/json" }));

		return this.Request.post(url, { data: form, headers: { "Content-Type": "multipart/form-data" } });
		*/
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
	R extends GuildTextChannelType = GuildTextChannelType,
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

export class DiscordDirectMessage<
	T extends DiscordDMBaseProps = DiscordDMBaseProps
> extends DiscordMessage<T> {
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
abstract class DiscordDMBase<
	T extends DiscordDMBaseProps = DiscordChannelBaseProps
> extends DiscordTextChannel<T> {
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

		const currentUser = $client.users.get($client.config.user_id!)!;
		this.recipients.set(mergeLikeSet(currentUser, recipients));

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

		const currentUser = $client.users.get($client.config.user_id!)!;
		this.recipients.set(mergeLikeSet(currentUser, recipients));

		this.$users = $client.users;
		this.Request = $client.Request;
		this.Gateway = $client.Gateway;
		this.$guildSettings = $client.guildSettings;
	}
}
