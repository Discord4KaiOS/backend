import DiscordRequest from "./DiscordRequest";
import type { Config } from "./config";
import Gateway from "./DiscordGateway";
import Deferred from "./lib/Deffered";
import {
	ReadyEvent,
	ClientRelationship,
	RelationshipType,
	PrivateChannel,
	ClientChannel,
	ClientUserGuildSetting,
	ClientChannelOverride,
	ClientAPIUser,
} from "./lib/types";
import EventEmitter from "./lib/EventEmitter";
import {
	APIChannel,
	APIGuildMember,
	APIGuildTextChannel,
	GuildTextChannelType,
	Snowflake,
	ChannelType,
	APIUser,
} from "discord-api-types/v10";
import {
	DiscordDMChannel,
	DiscordGroupDMChannel,
	DiscordGuildChannelCategory,
	DiscordGuildTextChannel,
} from "./DiscordChannels";
import { WritableStore, Jar } from "./lib/utils";
import { DiscordGuild, DiscordServerProfile } from "./DiscordGuild";
import Logger from "./Logger";
import ReadStateHandler, { DiscordReadState } from "./ReadStateHandler";

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
export class DiscordUser extends WritableStore<ClientAPIUser> {
	id: string;
	constructor(public $: ClientAPIUser, private $relationships: RelationshipsJar) {
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

class RelationshipsJar extends Jar<DiscordRelationship> {
	constructor(public $client: DiscordClientReady) {
		super();
	}

	logger = new Logger("RelationshipsJar");

	get(id: string) {
		const has = super.get(id);
		if (!has) {
			const user = this.$client.users.get(id);
			if (!user) {
				this.logger.err("user not found", id)();
				throw new Error("user not found " + id);
			}
			const makeOne = new DiscordRelationship(
				{ id, type: 0, nickname: null, user: user.value },
				this.$client.users
			);
			this.set(id, makeOne);
			return makeOne;
		}
		return has;
	}
}

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

export class DiscordGuildSetting extends WritableStore<
	Omit<ClientUserGuildSetting, "version" | "channel_overrides">
> {
	channelOverrides = new ChannelOverridesJar();
}

class DiscordChannelOverride extends WritableStore<ClientChannelOverride> {}

class ChannelOverridesJar extends Jar<DiscordChannelOverride> {
	insert(...overrides: ClientChannelOverride[]) {
		overrides.forEach(($) => {
			const has = this.get($.channel_id);
			if (has) {
				has.shallowSet($);
			} else {
				this.set($.channel_id, new DiscordChannelOverride($));
			}
		});
	}
}

export class DiscordGuildSettingsJar extends Jar<DiscordGuildSetting, string | null> {}

export class DiscordClientReady {
	users = new UsersJar();
	relationships = new RelationshipsJar(this);
	dms = new DMsJar();
	guilds = new GuildsJar();
	guildSettings = new DiscordGuildSettingsJar();
	readStates = new ReadStateHandler(this);

	static logger = new Logger("DiscordClientReady");
	config: Config;

	close() {
		this.Gateway.close();
	}

	// that's deep
	handleRelationships(...relationships: ClientRelationship[]) {
		relationships.forEach((r) => {
			// to avoid user not being found
			this.addUser(r.user);
			// it will always return a relationship
			const has = this.relationships.get(r.id);
			has.shallowSet({ type: r.type, nickname: r.nickname });
		});
	}

	handleDMChannels(...channels: Array<PrivateChannel>) {
		channels.forEach((r) => {
			const has = this.dms.get(r.id);

			r.recipients?.forEach((u) => this.addUser(u));

			const { id, recipients, type, ...obj } = r;

			const _recipients = r.recipients?.map((u) => this.users.get(u.id)!) || [];

			if (has) {
				has.shallowUpdate((e) => ({ ...e, ...obj }));

				has.recipients.shallowSet(_recipients);
			} else {
				if (r.type === ChannelType.DM) {
					const dm = new DiscordDMChannel(obj, r.id, _recipients, this.Request, this.Gateway);
					this.dms.add(r.id, dm);
				} else {
					const groupDM = new DiscordGroupDMChannel(
						obj,
						r.id,
						_recipients,
						this.Request,
						this.Gateway
					);
					this.dms.add(r.id, groupDM);
				}
			}
		});
	}

	handleGuildSettings(...settings: ClientUserGuildSetting[]) {
		settings.forEach(({ version, channel_overrides, ...settings }) => {
			const has = this.guildSettings.get(settings.guild_id);

			if (has) {
				has.shallowSet(settings);
				has.channelOverrides.insert(...channel_overrides);
			} else {
				const guildSetting = new DiscordGuildSetting(settings);
				guildSetting.channelOverrides.insert(...channel_overrides);
				this.guildSettings.set(settings.guild_id, guildSetting);
			}
		});
	}

	constructor(
		ready: ReadyEvent,
		public Gateway: Gateway,
		public Request: DiscordRequest,
		config: Config
	) {
		this.config = config;
		if (!config.client) throw Error("DiscordClient not initialized!");

		this.handleRelationships(...ready.relationships);

		config.user_id = ready.user.id;
		this.addUser(ready.user);

		ready.relationships.forEach((u) => this.addUser(u.user));

		ready.guilds.forEach((a) => {
			const guild = new DiscordGuild(a, this.Request, this.Gateway, this.users, this.guildSettings);
			guild.handleChannels(...a.channels);
			guild.channels.sorted.refresh();
			this.guilds.add(a.id, guild);
			a.members.forEach((m) => {
				const user = this.addUser(m.user);
				const profile = user.profiles.insert(m, guild);
				guild.members.add(profile);
			});
		});

		this.handleGuildSettings(...ready.user_guild_settings);
		Gateway.on("t:user_guild_settings_update", (evt: ClientUserGuildSetting) =>
			this.handleGuildSettings(evt)
		);

		const handleRelationship = (evt: ClientRelationship) => this.handleRelationships(evt);

		Gateway.on("t:relationship_update", handleRelationship);
		Gateway.on("t:relationship_add", handleRelationship);
		Gateway.on("t:relationship_remove", (evt: ClientRelationship) => {
			this.relationships.get(evt.id).shallowSet({ type: 0, nickname: null });
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
						DiscordClientReady.logger.err("guild_id was not provided by APIChannel!", _channel);
						return;
					}

					const _guild = this.guilds.get(guild_id);

					if (_guild) {
						_guild.handleChannels(channel as ClientChannel);
						_guild.channels.sorted.refresh();
					} else {
						DiscordClientReady.logger.err("guild is missing!!", guild_id, _channel);
					}

					break;
			}
		};

		Gateway.on("t:channel_create", handleChannels);
		Gateway.on("t:channel_update", handleChannels);
		Gateway.on("t:channel_delete", (channel) => {
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
						DiscordClientReady.logger.err("guild_id was not provided by APIChannel!", _channel);
						return;
					}

					const _guild = this.guilds.get(guild_id);

					if (_guild) {
						_guild.channels.delete(_channel.id);
						_guild.channels.sorted.refresh();
					} else {
						DiscordClientReady.logger.err("guild is missing!!", guild_id, _channel);
					}

					break;
			}
		});

		// assume this is a thing only found in groupchats
		Gateway.on("t:channel_recipient_add", (evt) => {
			this.addUser(evt.user);
			const dm = this.dms.get(evt.channel_id)!;
			const user = this.users.get(evt.user.id)!;

			dm.recipients.shallowUpdate((m) => m.concat(user));
		});
		Gateway.on("t:channel_recipient_remove", (evt) => {
			const dm = this.dms.get(evt.channel_id)!;
			const user = this.users.get(evt.user.id)!;

			dm.recipients.shallowUpdate((m) => m.filter((e) => e !== user));
		});

		ready.read_state.forEach((rs) => {
			this.readStates.add(rs.id, new DiscordReadState(rs));
		});
		Gateway.on("t:message_ack", ({ mention_count, channel_id, message_id, ack_type }) => {
			this.readStates.updateCount(channel_id, mention_count, message_id);
		});
		Gateway.on("t:channel_unread_update", (event) => {
			event.channel_unread_updates.forEach((state) => {
				this.readStates.updateCount(state.id, state.mention_count, state.last_message_id);
			});
		});
	}

	addUser(user: ClientAPIUser) {
		const has = this.users.get(user.id);
		// user object from API for current user lacks some properties

		if (has) {
			const updater = <T>(u: T) => ({ ...u, ...user });

			// use deep comparison when decoration is present
			if (user.avatar_decoration_data) {
				has.deepUpdate(updater);
			} else has.shallowUpdate(updater);
		} else {
			const _user = new DiscordUser(user, this.relationships);
			this.users.set(user.id, _user);
			return _user;
		}
		return has;
	}
}

export default class DiscordClient extends EventEmitter {
	Gateway: Gateway;
	getClient: () => Promise<DiscordClientReady>;

	constructor(public Request: DiscordRequest, token: string, public config: Config) {
		super();

		Request.token = token;
		config.token = token;
		config.client = this;

		this.Gateway = new Gateway(config.debug ?? false);
		this.Gateway.login(token);
		this.Gateway.init();

		const deffered = new Deferred<DiscordClientReady>();
		this.getClient = () => deffered.promise;

		const currentJarID = Jar.updateID();

		this.Gateway.once("t:ready", (evt: ReadyEvent) => {
			try {
				deffered.resolve(new DiscordClientReady(evt, this.Gateway, this.Request, config));
			} catch (error) {
				console.error(error);
			}
		});

		this.Gateway.once("close", () => {
			this.Gateway.offAll();
			Jar.offAllByID(currentJarID);
			this.emit("close");
		});
	}

	close() {
		this.Gateway.close();
	}
}
