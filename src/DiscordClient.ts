import DiscordRequest from "./DiscordRequest";
import type { Config } from "./config";
import Gateway from "./DiscordGateway";
import Deferred from "./lib/Deffered";
import { ReadyEvent, ClientRelationship, RelationshipType, PrivateChannel, ChannelType } from "./lib/types";
import EventEmitter from "./lib/EventEmitter";
import type { APIChannel, APIUser, Snowflake } from "discord-api-types/v10";
import { Writable, get, writable, Readable, derived, Updater, Subscriber, Invalidator, Unsubscriber } from "./lib/stores";
import { DiscordDMChannel, DiscordGroupDMChannel } from "./DiscordChannels";
import { WritableStore } from "./lib/utils";

export class DiscordUser extends WritableStore<APIUser> {
	id: string;
	constructor(initial: APIUser, private $relationships: Map<string, DiscordRelationship>) {
		super(initial);
		this.id = initial.id;
	}

	get relationship() {
		return this.$relationships.get(this.id);
	}
}

export class DiscordRelationship extends WritableStore<{
	type: RelationshipType;
	nickname: string | null;
}> {
	id: string;
	constructor(initial: ClientRelationship, private $users: Map<string, DiscordUser>) {
		super({ type: initial.type, nickname: initial.nickname });
		this.id = initial.id;
	}

	get user() {
		return this.$users.get(this.id);
	}
}

class Jar<T> extends Map<string, T> {
	on: (event: string, listener: Function) => void;
	once: (event: string, listener: Function) => void;
	off: (event: string, listener: Function) => void;
	emit: (event: string, ...args: any[]) => void;
	offAll: (event?: string | undefined) => void;
	subscribe: (event: string, listener: Function) => Unsubscriber;
	constructor() {
		super();

		const evtM = new EventEmitter();
		this.on = evtM.on.bind(evtM);
		this.once = evtM.once.bind(evtM);
		this.off = evtM.off.bind(evtM);
		this.emit = evtM.emit.bind(evtM);
		this.offAll = evtM.offAll.bind(evtM);
		this.subscribe = evtM.subscribe.bind(evtM);
	}

	set(key: string, value: T) {
		super.set(key, value);
		this.emit("update", key, value);
		return this;
	}

	add(key: string, value: T) {
		return this.set(key, value);
	}

	delete(key: string): boolean {
		const result = super.delete(key);
		this.emit("update", key);
		return result;
	}

	list() {
		return [...super.values()];
	}
}

class UsersJar extends Jar<DiscordUser> {}

class RelationshipsJar extends Jar<DiscordRelationship> {}

class DMsJar extends Jar<DiscordDMChannel | DiscordGroupDMChannel> {}

export class DiscordClientInit {
	users = new UsersJar();
	relationships = new RelationshipsJar();
	dms = new DMsJar();

	// that's deep
	handleRelationships(...relationships: ClientRelationship[]) {
		relationships.forEach((r) => {
			const has = this.relationships.get(r.id);
			has?.shallowSet({ type: r.type, nickname: r.nickname });
			if (!has) {
				this.relationships.set(r.id, new DiscordRelationship(r, this.users));
			}
		});
	}

	handleDMChannels(...channels: Array<PrivateChannel>) {
		channels.forEach((r) => {
			const has = this.dms.get(r.id);

			r.recipients?.forEach((u) => this.addUser(u));

			const { id, recipients, type, ...obj } = r;

			const _recipients = r.recipients?.map((u) => this.users.get(u.id)!) || [];

			if (has) {
				has.shallowSet(obj as any);

				has.recipients.shallowSet(_recipients);
			} else {
				if (r.type === ChannelType.DM) {
					const dm = new DiscordDMChannel(obj, r.id, this.Request, this.Gateway);
					this.dms.add(r.id, dm);
					dm.recipients.shallowSet(_recipients);
				} else {
					const groupDM = new DiscordGroupDMChannel(obj, r.id, this.Request, this.Gateway);
					this.dms.add(r.id, groupDM);
					groupDM.recipients.shallowSet(_recipients);
				}
			}
		});
	}

	constructor(ready: ReadyEvent, public Gateway: Gateway, public Request: DiscordRequest, public config: Config) {
		if (!config.client) throw Error("DiscordClient not initialized!");

		this.handleRelationships(...ready.relationships);

		ready.relationships.forEach((u) => this.addUser(u.user));

		const handleRelationship = (evt: ClientRelationship) => this.handleRelationships(evt);

		Gateway.on("t:relationship_update", handleRelationship);
		Gateway.on("t:relationship_add", handleRelationship);
		Gateway.on("t:relationship_remove", (evt: ClientRelationship) => {
			this.relationships.get(evt.id)?.shallowSet({ type: 0, nickname: null });
		});

		console.log(ready);

		this.handleDMChannels(...ready.private_channels);
		Gateway.on("t:channel_create", (channel: APIChannel) => {
			switch (channel.type) {
				case ChannelType.DM:
				case ChannelType.GroupDM:
					this.handleDMChannels(channel);
					break;
			}
		});
		Gateway.on("t:channel_delete", (channel: APIChannel) => {
			switch (channel.type) {
				case ChannelType.DM:
				case ChannelType.GroupDM:
					this.dms.delete(channel.id);
					break;
			}
		});
		Gateway.on("t:channel_update", (channel: APIChannel) => {
			switch (channel.type) {
				case ChannelType.DM:
				case ChannelType.GroupDM:
					this.handleDMChannels(channel);
					break;
			}
		});

		// assume this is a thing only found in groupchats
		Gateway.on("t:channel_recipient_add", (evt: { channel_id: Snowflake; user: APIUser }) => {
			this.addUser(evt.user);
			const dm = this.dms.get(evt.channel_id) as DiscordGroupDMChannel;
			dm.recipients.shallowUpdate((m) => m.concat(this.users.get(evt.user.id)!));
		});
		Gateway.on("t:channel_recipient_remove", (evt: { channel_id: Snowflake; user: APIUser }) => {
			const dm = this.dms.get(evt.channel_id) as DiscordGroupDMChannel;
			const user = this.users.get(evt.user.id)!;
			dm.recipients.shallowUpdate((m) => m.filter((e) => e !== user));
		});
	}

	addUser(user: APIUser) {
		const has = this.users.get(user.id);
		has?.shallowSet(user);
		if (!has) {
			this.users.set(user.id, new DiscordUser(user, this.relationships));
		}
	}
}

export default class DiscordClient extends EventEmitter {
	Gateway: Gateway;
	getClient: () => Promise<DiscordClientInit>;

	constructor(public Request: DiscordRequest, token: string, public config: Config) {
		super();

		Request.token = token;
		config.token = token;
		config.client = this;

		this.Gateway = new Gateway(config.debug ?? false);
		this.Gateway.login(token);
		this.Gateway.init();

		const deffered = new Deferred<DiscordClientInit>();
		this.getClient = () => deffered.promise;

		this.Gateway.on("t:ready", (evt: ReadyEvent) => {
			deffered.resolve(new DiscordClientInit(evt, this.Gateway, this.Request, config));
		});

		this.Gateway.on("close", () => {
			this.emit("close");
		});
	}
}
