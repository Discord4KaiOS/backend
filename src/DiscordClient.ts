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
	ClientGuild,
	ReadySupplementalEvent,
} from "./lib/types";
import EventEmitter from "./lib/EventEmitter";
import type {
	APIChannel,
	APIGuildMember,
	APIGuildTextChannel,
	Snowflake,
	APIMessage,
	GatewayGuildCreateDispatchData,
	GatewayActivity,
	PresenceUpdateReceiveStatus,
	GatewayPresenceClientStatus,
} from "discord-api-types/v10";
import {
	DiscordDMChannel,
	DiscordDirectMessage,
	DiscordGroupDMChannel,
	DiscordGuildChannelCategory,
	DiscordGuildTextChannel,
} from "./DiscordChannels";
import {
	WritableStore,
	Jar,
	convertSnowflakeToDate,
	ChannelType,
	GuildTextChannelType,
} from "./lib/utils";
import { DiscordGuild, DiscordServerProfile } from "./DiscordGuild";
import Logger from "./Logger";
import ReadStateHandler, { DiscordReadState } from "./ReadStateHandler";
import { PreloadedUserSettings } from "./lib/discord-protos";

class ServerProfilesJar extends Jar<DiscordServerProfile> {
	constructor(public $user: DiscordUser) {
		super();
	}
	insert(profile: APIGuildMember, guild: DiscordGuild) {
		const has = this.get(guild.id);
		if (has) {
			// roles is the only part that needs to be recursively checked
			if (profile.roles) has.setStateDeep(profile);
			else has.setState(profile);
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
	$users: UsersJar;

	constructor(public $: ClientAPIUser, public $client: DiscordClientReady) {
		super($);
		this.id = $.id;
		this.$users = $client.users;
	}

	get relationship() {
		return this.$client.relationships.get(this.id);
	}

	get presence() {
		return this.$client.presences.get(this.id);
	}

	profiles = new ServerProfilesJar(this);
}

export class DiscordRelationship extends WritableStore<{
	type: RelationshipType;
	nickname: string | null;
}> {
	id: string;
	constructor(initial: ClientRelationship, private $users: UsersJar) {
		super({ type: initial.type, nickname: initial.nickname });
		this.id = initial.id || initial.user_id;
	}

	get user() {
		return this.$users.get(this.id);
	}
}

export class UsersJar extends Jar<DiscordUser> {
	constructor(public $client: DiscordClientReady) {
		super();
	}
}

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
				{ id, type: 0, nickname: null, user_id: id },
				this.$client.users
			);
			this.set(id, makeOne);
			return makeOne;
		}
		return has;
	}
}

class SortedDMs extends WritableStore<Array<DiscordDMChannel | DiscordGroupDMChannel>> {
	constructor(public $: DMsJar) {
		super([]);
	}

	/**
	 * refresh every time a new message is received
	 */
	refresh() {
		this.shallowSet(this.$.toSorted());
	}
}

function snowflakeToDateNumber(id: string) {
	return convertSnowflakeToDate(id).getTime();
}

class DMsJar extends Jar<DiscordDMChannel | DiscordGroupDMChannel> {
	sorted = new SortedDMs(this);

	toSorted() {
		const all = this.list();

		all.sort(
			(a, b) =>
				snowflakeToDateNumber(b.lastMessageID.value || b.id) -
				snowflakeToDateNumber(a.lastMessageID.value || a.id)
		);
		// all.sort((a, b) => Number(b.value.last_message_id || 0) - Number(a.value.last_message_id || 0));
		return all;
	}
}

interface GuildsFolder {
	id: number | string;
	name: string | null;
	color: number | null;
	guilds: Array<DiscordGuild>;
	guild_ids: Array<string>;
}

class GuildsJar extends Jar<DiscordGuild> {
	constructor(public $client: DiscordClientReady) {
		super();

		this.on("update", () => {
			this.refresh();
		});

		this.refresh();
	}

	findChannelById(id: Snowflake) {
		let found:
			| DiscordGuildChannelCategory
			| DiscordGuildTextChannel<GuildTextChannelType>
			| undefined;
		this.list().find((a) => (found = a.channels.get(id)));
		return found;
	}

	sorted = new WritableStore<Array<DiscordGuild | GuildsFolder>>([]);

	refresh() {
		this.sorted.deepSet(this.toSorted());
	}

	toSorted() {
		const all = this.list();

		// cloned folders objects
		const folders = this.$client.userSettings.value
			.guildFolders!.folders.filter((a) => a.id)
			.map((obj) => {
				return {
					guilds: [],
					id: obj.id!.value,
					color: obj.color?.value || null,
					guild_ids: obj.guildIds,
					name: obj.name?.value || null,
				} as GuildsFolder;
			});
		const arrangement = this.$client.userSettings.value
			.guildFolders!.folders.map((a) => a.guildIds)
			.flat();

		if (arrangement.length) {
			const indexer = <T extends { id: string }>({ id }: T) => arrangement.indexOf(id);
			all.sort((a, b) => {
				return indexer(a) - indexer(b);
			});
		} else {
			// sort by joined date first (recently joined > older)
			all.sort((a, b) => {
				return new Date(b.$.joined_at).getTime() - new Date(a.$.joined_at).getTime();
			});
		}

		const arr: Array<DiscordGuild | GuildsFolder> = [];

		all.forEach((guild) => {
			const folder = folders.find((e) => e.id && e.guild_ids.includes(guild.id));

			if (folder) {
				folder.guilds.push(guild);
				if (!arr.includes(folder)) arr.push(folder);
			} else {
				arr.push(guild);
			}
		});

		return arr;
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

class DiscordUserSettings extends WritableStore<ReadyEvent["user_settings"]> {
	constructor(public $client: DiscordClientReady) {
		super($client.ready.user_settings);
	}
}

export class DiscordPresence extends WritableStore<{
	activities: GatewayActivity[];
	status: PresenceUpdateReceiveStatus;
	client_status: GatewayPresenceClientStatus | null;
}> {}

class PresencesJar extends Jar<DiscordPresence> {
	get(id: string) {
		const has = super.get(id);
		if (!has) {
			const presence = new DiscordPresence({
				activities: [],
				status: "offline" as PresenceUpdateReceiveStatus,
				client_status: null,
			});

			this.set(id, presence);

			return presence;
		}
		return has;
	}
}

export class DiscordClientReady {
	static logger = new Logger("DiscordClientReady");
	config: Config;

	logger = new Logger("DiscordClientReady");
	userSettings: DiscordUserSettings;
	users: UsersJar;
	relationships: RelationshipsJar;
	dms: DMsJar;
	guilds: GuildsJar;
	guildSettings: DiscordGuildSettingsJar;
	readStates: ReadStateHandler;
	presences = new PresencesJar();

	close() {
		this.Gateway.close();
	}

	// that's deep
	handleRelationships(...relationships: ClientRelationship[]) {
		relationships.forEach((r) => {
			// it will always return a relationship
			const has = this.relationships.get(r.id);
			has.shallowSet({ type: r.type, nickname: r.nickname });
		});
	}

	handleDMChannels(...channels: Array<PrivateChannel>) {
		channels.forEach((r) => {
			const has = this.dms.get(r.id);

			const { id, recipient_ids, recipients, type, ...obj } = r;

			const _recipients = recipients
				? recipients.map((a) => this.users.get(a.id)!)
				: recipient_ids.map((a) => this.users.get(a)!);

			if (has) {
				has.setState(obj);

				has.recipients.shallowSet(_recipients);
			} else {
				if (r.type === ChannelType.DM) {
					const dm = new DiscordDMChannel(obj, r.id, _recipients, this);
					this.dms.add(r.id, dm);
				} else {
					const groupDM = new DiscordGroupDMChannel(obj, r.id, _recipients, this);
					this.dms.add(r.id, groupDM);
				}
				this.dms.sorted.refresh();
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

	handleMergedMembers(merged_members: ReadyEvent["merged_members"]) {
		merged_members.forEach((members, guildIndex) => {
			const guild = this.guilds.get(this.ready.guilds[guildIndex].id);

			if (!guild) throw new Error("handleMergedMembers guild not found");

			members.forEach((member) => {
				const user = this.users.get(member.user_id);
				if (!user) throw new Error("handleMergedMembers user not found");

				const profile = user.profiles.insert(member, guild);
				guild.members.add(profile);
			});
		});
	}

	handleMergedPresences(merged_presences: ReadySupplementalEvent["merged_presences"]) {
		Object.values(merged_presences)
			.flat(2)
			.forEach((a) => {
				this.presences.get(a.user_id).shallowSet({
					client_status: a.client_status || null,
					status: a.status || ("offline" as PresenceUpdateReceiveStatus),
					activities: a.activities || [],
				});
			});
	}

	constructor(
		public ready: ReadyEvent,
		public Gateway: Gateway,
		public Request: DiscordRequest,
		config: Config
	) {
		this.config = config;
		if (!config.client) throw Error("DiscordClient not initialized!");

		this.users = new UsersJar(this);
		this.relationships = new RelationshipsJar(this);
		ready.users.forEach((u) => this.addUser(u));

		this.dms = new DMsJar();

		this.userSettings = new DiscordUserSettings(this);
		this.guilds = new GuildsJar(this);
		this.guildSettings = new DiscordGuildSettingsJar();
		this.readStates = new ReadStateHandler(this);

		this.handleRelationships(...ready.relationships);

		config.user_id = ready.user.id;
		this.addUser(ready.user);

		ready.read_state.entries.forEach((rs) => {
			this.readStates.add(rs.id, new DiscordReadState(rs));
		});

		Gateway.on("t:channel_unread_update", (event) => {
			event.channel_unread_updates.forEach((state) => {
				this.readStates.updateCount(state.id, state.last_message_id, state.mention_count);
			});
		});

		const addGuild = (_guild: ClientGuild | GatewayGuildCreateDispatchData) => {
			ready.guilds.push(_guild as ClientGuild);

			const guild = new DiscordGuild(
				// nothing should go wrong, right??
				_guild as ClientGuild,
				this.Request,
				this.Gateway,
				this.users,
				this.guildSettings
			);

			// nothing should go wrong, right??
			guild.handleChannels(...(_guild.channels as ClientChannel[]));

			this.guilds.add(_guild.id, guild);

			_guild.members.forEach((m) => {
				if (!m.user) return;
				const user = this.addUser(m.user);
				const profile = user.profiles.insert(m, guild);
				guild.members.add(profile);
			});

			guild.channels.sorted.refresh();
		};

		ready.guilds.forEach(addGuild);

		Gateway.on("t:ready_supplemental", (evt) => {
			this.handleMergedMembers(evt.merged_members);
			this.handleMergedPresences(evt.merged_presences);
		});

		Gateway.on("t:guild_create", addGuild);
		Gateway.on(
			"t:guild_update",
			({ name, icon, owner_id, description, roles, rules_channel_id, ...evt }) => {
				const guild = this.guilds.get(evt.id);
				if (!guild) return;

				guild.setStateDeep({ name, icon, owner_id, description, roles, rules_channel_id });
			}
		);
		Gateway.on("t:guild_member_update", (evt) => {
			const user = this.users.get(evt.user.id);

			if (!user) throw new Error("guild member update user not found " + evt.user.id);

			const guild = this.guilds.get(evt.guild_id);
			if (!guild) throw new Error("guild member update guild not found " + evt.guild_id);

			user.profiles.insert(evt as any, guild);

			if (user.id == ready.user.id) {
				guild.channels.sorted.refresh();
			}
		});

		/// ANCHOR: guild settings events
		this.handleGuildSettings(...ready.user_guild_settings.entries);
		Gateway.on("t:user_guild_settings_update", (evt: ClientUserGuildSetting) =>
			this.handleGuildSettings(evt)
		);

		/// ANCHOR: relationship events
		const handleRelationship = (evt: ClientRelationship) => this.handleRelationships(evt);
		Gateway.on("t:relationship_update", handleRelationship);
		Gateway.on("t:relationship_add", handleRelationship);
		Gateway.on("t:relationship_remove", (evt) => {
			this.relationships.get(evt.id).shallowSet({ type: 0, nickname: null });
		});

		// console.log(ready);

		/// ANCHOR: channel events
		this.handleDMChannels(...ready.private_channels);
		const handleChannels = (channel: APIChannel) => {
			switch (channel.type) {
				case ChannelType.DM:
				case ChannelType.GroupDM:
					this.handleDMChannels(channel as PrivateChannel);
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

		/// ANCHOR: message events
		Gateway.on("t:message_ack", ({ mention_count, channel_id, message_id }) => {
			this.readStates.updateCount(channel_id, message_id, mention_count);
		});

		const findChannel = (channel_id: string, guild_id?: string) => {
			if (guild_id) {
				const guild = this.guilds.get(guild_id);
				if (guild) return guild.channels.get(channel_id);
			}

			const fromDMs = this.dms.get(channel_id);

			if (fromDMs) return fromDMs;

			// this should not be needed
			const findChannel = this.guilds.findChannelById(channel_id);
			if (findChannel) return findChannel;
		};

		const getMessagesJar = (channel_id: string, guild_id?: string) => {
			const channel = findChannel(channel_id, guild_id);

			if (channel && "messages" in channel) {
				return channel.messages;
			}

			return null;
		};
		const errJarNotFound = (m: Partial<APIMessage>, type: string) => {
			const text = `message_${type}: channel not found or invalid`;
			this.logger.err(text, m)();
			throw new Error(text);
		};

		Gateway.on("t:message_create", (m) => {
			const mJar = getMessagesJar(m.channel_id, m.guild_id);
			if (!mJar) errJarNotFound(m, "create");

			const mm = mJar!.append(m);
			mm.$channel.lastMessageID.set(m.id);

			if (mm instanceof DiscordDirectMessage) {
				this.dms.sorted.refresh();
			}

			if (mm.wouldPing()) {
				mm.$channel.readState.increment();
			}
		});
		Gateway.on("t:message_update", (m) => {
			const mJar = getMessagesJar(m.channel_id, m.guild_id);
			if (!mJar) errJarNotFound(m, "update");

			mJar?.update(m);
		});
		Gateway.on("t:message_delete", (evt) => {
			const mJar = getMessagesJar(evt.channel_id, evt.guild_id);
			if (!mJar) errJarNotFound(evt, "delete");

			mJar?.remove(evt.id);
		});
		Gateway.on("t:message_delete_bulk", (evt) => {
			const mJar = getMessagesJar(evt.channel_id, evt.guild_id);
			if (!mJar) errJarNotFound(evt, "delete_bulk");

			mJar?.removeBulk(evt.ids);
		});
		// TODO: handle message reactions

		// ANCHOR: Typing start
		Gateway.on("t:typing_start", (evt) => {
			const channel = findChannel(evt.channel_id, evt.guild_id);

			if (!channel) {
				this.logger.err("typing_start: channel not found or invalid", evt)();
				return;
			}

			if ("typingState" in channel) {
				channel.typingState.add(this.users.get(evt.user_id)!);
			}
		});

		Gateway.on("t:presence_update", (evt) => {
			this.presences.get(evt.user.id).shallowSet({
				client_status: evt.client_status || null,
				status: evt.status || ("offline" as PresenceUpdateReceiveStatus),
				activities: evt.activities || [],
			});
		});

		Gateway.on("t:guild_members_chunk", (evt) => {
			evt.members.forEach(({ user, ...rest }) => {
				if (!user) return;

				const _user = this.addUser(user);
				const guild = this.guilds.get(evt.guild_id);
				if (!guild) return;

				const profile = _user.profiles.insert(rest, guild);
				guild.members.add(profile);
			});

			evt.presences?.forEach((a) => {
				// assuming from the newer api changes
				const user_id = ("user_id" in a && (a.user_id as string)) || a.user.id;
				this.presences.get(user_id).shallowSet({
					client_status: a.client_status || null,
					status: a.status || ("offline" as PresenceUpdateReceiveStatus),
					activities: a.activities || [],
				});
			});
		});
	}

	addUser(user: ClientAPIUser) {
		const has = this.users.get(user.id);
		// user object from API for current user lacks some properties

		if (has) {
			// use deep comparison when decoration is present
			if (user.avatar_decoration_data) {
				has.setStateDeep(user);
			} else has.setState(user);
		} else {
			const _user = new DiscordUser(user, this);
			// webhook user objects should not be cached
			if (user.bot && user.discriminator == "0000") {
				return _user;
			}
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
				const user_settings = PreloadedUserSettings.fromBase64(evt.user_settings_proto);
				evt.user_settings = user_settings;
				evt.guilds.forEach((a) => {
					// dirty bit, too lazy to rewrite types sorry
					if ("properties" in a) {
						const properties = a.properties;
						delete a.properties;
						Object.assign(a, properties);
					}
				});

				// another dirty bit yikes, too complicated
				evt.merged_members.forEach((members, guildIndex) => {
					const guild = evt.guilds[guildIndex];
					guild.members = members.map((a) => {
						return {
							...a,
							user:
								evt.user.id === a.user_id ? evt.user : evt.users.find((e) => e.id === a.user_id)!,
							permissions: "wtf?",
						};
					});
				});

				deffered.resolve(new DiscordClientReady(evt, this.Gateway, this.Request, config));
			} catch (error) {
				deffered.reject(error);
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
