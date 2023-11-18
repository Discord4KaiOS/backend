import DiscordRequest from "./DiscordRequest";
import type { Config } from "./config";
import Gateway from "./DiscordGateway";
import Deferred from "./lib/Deffered";
import {
	ReadyEvent,
	ClientRelationship,
	RelationshipType,
	PrivateChannel,
	ChannelType,
	ClientChannel,
} from "./lib/types";
import EventEmitter from "./lib/EventEmitter";
import type {
	APIChannel,
	APIGuildMember,
	APIGuildTextChannel,
	APIUser,
	GuildTextChannelType,
	Snowflake,
	TextChannelType,
} from "discord-api-types/v10";
import { Unsubscriber } from "./lib/stores";
import {
	DiscordDMChannel,
	DiscordGroupDMChannel,
	DiscordGuildChannelCategory,
	DiscordGuildTextChannel,
} from "./DiscordChannels";
import { WritableStore, Jar } from "./lib/utils";
import { DiscordGuild, DiscordServerProfile } from "./DiscordGuild";
import Logger from "./Logger";

class ServerProfilesJar extends Jar<DiscordServerProfile> {
	constructor(public $user: DiscordUser) {
		super();
	}
	insert(profile: APIGuildMember, guild: DiscordGuild) {
		const has = this.get(guild.id);
		if (has) {
			const updater = (p: DiscordServerProfile["value"]) => ({ ...p, ...profile });
			// roles is the only part that needs to be recursively checked
			if (profile.roles) has.deepUpdate(updater);
			else has.shallowUpdate(updater);
		} else {
			const _profile = new DiscordServerProfile(profile, guild, this.$user);
			this.set(guild.id, _profile);
			return _profile;
		}
		return has;
	}
}
export class DiscordUser extends WritableStore<APIUser> {
	id: string;
	constructor(public $: APIUser, private $relationships: Jar<DiscordRelationship>) {
		super($);
		this.id = $.id;
	}

	get relationship() {
		return this.$relationships.get(this.id);
	}

	profiles = new ServerProfilesJar(this);
}

export class DiscordRelationship extends WritableStore<{
	type: RelationshipType;
	nickname: string | null;
}> {
	id: string;
	constructor(initial: ClientRelationship, private $users: Jar<DiscordUser>) {
		super({ type: initial.type, nickname: initial.nickname });
		this.id = initial.id;
	}

	get user() {
		return this.$users.get(this.id);
	}
}

class UsersJar extends Jar<DiscordUser> {}

class RelationshipsJar extends Jar<DiscordRelationship> {}

class DMsJar extends Jar<DiscordDMChannel | DiscordGroupDMChannel> {}

class GuildsJar extends Jar<DiscordGuild> {
	findChannelById(id: Snowflake) {
		let found:
			| DiscordGuildChannelCategory
			| DiscordGuildTextChannel<GuildTextChannelType>
			| undefined;
		this.list().find((a) => (found = a.channels.get(id)));
		return found;
	}
}

export class DiscordClientInit {
	users = new UsersJar();
	relationships = new RelationshipsJar();
	dms = new DMsJar();
	guilds = new GuildsJar();
	private logger = new Logger("DiscordClientInit");

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

	constructor(
		ready: ReadyEvent,
		public Gateway: Gateway,
		public Request: DiscordRequest,
		public config: Config
	) {
		if (!config.client) throw Error("DiscordClient not initialized!");

		this.handleRelationships(...ready.relationships);

		config.user_id = ready.user.id;
		this.addUser(ready.user);

		ready.relationships.forEach((u) => this.addUser(u.user));

		ready.guilds.forEach((a) => {
			const guild = new DiscordGuild(a, this.Request, this.Gateway, this.users, config);
			guild.handleChannels(...a.channels);
			this.guilds.add(a.id, guild);
			a.members.forEach((m) => {
				const user = this.addUser(m.user);
				const profile = user.profiles.insert(m, guild);
				guild.members.add(profile);
			});
		});

		const handleRelationship = (evt: ClientRelationship) => this.handleRelationships(evt);

		Gateway.on("t:relationship_update", handleRelationship);
		Gateway.on("t:relationship_add", handleRelationship);
		Gateway.on("t:relationship_remove", (evt: ClientRelationship) => {
			this.relationships.get(evt.id)?.shallowSet({ type: 0, nickname: null });
		});

		console.log(ready);

		this.handleDMChannels(...ready.private_channels);

		const handleChannels = (channel: APIChannel) => {
			switch (channel.type) {
				case ChannelType.DM:
				case ChannelType.GroupDM:
					this.handleDMChannels(channel);
					break;
				case ChannelType.GuildCategory:
				case ChannelType.GuildText:
				case ChannelType.GuildAnnouncement:
					const _channel = channel as APIGuildTextChannel<GuildTextChannelType>;

					let guild_id = _channel.guild_id;

					// if for some reason this is missing
					if (!guild_id) {
						guild_id = this.guilds.findChannelById(_channel.id)?.guild.id;
					}

					if (!guild_id) {
						this.logger.err("guild_id was not provided by APIChannel", _channel);
						return;
					}

					this.guilds.get(guild_id)?.handleChannels(channel as ClientChannel);

					break;
			}
		};

		Gateway.on("t:channel_create", handleChannels);
		Gateway.on("t:channel_update", handleChannels);
		Gateway.on("t:channel_delete", (channel: APIChannel) => {
			switch (channel.type) {
				case ChannelType.DM:
				case ChannelType.GroupDM:
					this.dms.delete(channel.id);
					break;
				case ChannelType.GuildCategory:
				case ChannelType.GuildText:
				case ChannelType.GuildAnnouncement:
					const _channel = channel as APIGuildTextChannel<GuildTextChannelType>;

					let guild_id = _channel.guild_id;

					// if for some reason this is missing
					if (!guild_id) {
						guild_id = this.guilds.findChannelById(_channel.id)?.guild.id;
					}

					if (!guild_id) {
						this.logger.err("guild_id was not provided by APIChannel", _channel);
						return;
					}

					this.guilds.get(guild_id)?.channels.delete(_channel.id);
					break;
			}
		});

		// assume this is a thing only found in groupchats
		Gateway.on("t:channel_recipient_add", (evt: { channel_id: Snowflake; user: APIUser }) => {
			this.addUser(evt.user);
			const dm = this.dms.get(evt.channel_id) as DiscordGroupDMChannel;
			const user = this.users.get(evt.user.id)!;

			dm.recipients.shallowUpdate((m) => m.concat(user));
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
			const _user = new DiscordUser(user, this.relationships);
			this.users.set(user.id, _user);
			return _user;
		}
		return has;
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
