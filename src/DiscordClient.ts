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
	ClientAPIGuildMember,
} from "./lib/types";
import EventEmitter from "./lib/EventEmitter";
import type {
	APIChannel,
	APIGuildTextChannel,
	Snowflake,
	GatewayGuildCreateDispatchData,
	GatewayActivity,
	PresenceUpdateReceiveStatus,
	GatewayPresenceClientStatus,
	APIUser,
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
	mergeLikeSet,
} from "./lib/utils";
import { DiscordGuild, DiscordServerProfile } from "./DiscordGuild";
import Logger from "./Logger";
import ReadStateHandler, { DiscordReadState } from "./ReadStateHandler";
import type { PreloadedUserSettings_GuildFolder } from "./lib/discord-protos";
import { Writable, writable } from "./lib/stores";
import DiscordGifPicker from "./DiscordGifPicker";

class ServerProfilesJar extends Jar<DiscordServerProfile> {
	constructor(public $user: DiscordUser) {
		super();
	}
	insert(profile: ClientAPIGuildMember, guild: DiscordGuild) {
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

/*
1 << 0		Discord Employee
1 << 1		Partnered Server Owner
1 << 2		HypeSquad Events Member
1 << 3		Bug Hunter Level 1
1 << 6		House Bravery Member
1 << 7		House Brilliance Member
1 << 8		House Balance Member
1 << 9		Early Nitro Supporter
1 << 10		User is a team
1 << 14		Bug Hunter Level 2
1 << 16		Verified Bot
1 << 17		Early Verified Bot Developer
1 << 18		Moderator Programs Alumni
1 << 19		Bot uses only HTTP interactions and is shown in the online member list
1 << 22		User is an Active Developer
*/

const TROPHIES = [
	"STAFF",
	"PARTNER",
	"HYPESQUAD",
	"BUG_HUNTER_LEVEL_1",
	,
	,
	"HYPESQUAD_ONLINE_HOUSE_1",
	"HYPESQUAD_ONLINE_HOUSE_2",
	"HYPESQUAD_ONLINE_HOUSE_3",
	"PREMIUM_EARLY_SUPPORTER",
	"TEAM_PSEUDO_USER",
	,
	,
	,
	"BUG_HUNTER_LEVEL_2",
	,
	"VERIFIED_BOT",
	"VERIFIED_DEVELOPER",
	"CERTIFIED_MODERATOR",
	"BOT_HTTP_INTERACTIONS",
	,
	,
	"ACTIVE_DEVELOPER",
];

type TROPHY =
	| "STAFF"
	| "PARTNER"
	| "HYPESQUAD"
	| "BUG_HUNTER_LEVEL_1"
	| "HYPESQUAD_ONLINE_HOUSE_1"
	| "HYPESQUAD_ONLINE_HOUSE_2"
	| "HYPESQUAD_ONLINE_HOUSE_3"
	| "PREMIUM_EARLY_SUPPORTER"
	| "TEAM_PSEUDO_USER"
	| "BUG_HUNTER_LEVEL_2"
	| "VERIFIED_BOT"
	| "VERIFIED_DEVELOPER"
	| "CERTIFIED_MODERATOR"
	| "BOT_HTTP_INTERACTIONS"
	| "ACTIVE_DEVELOPER";

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

	isWebhook() {
		return this.$.bot && this.$.discriminator === "0000";
	}

	private _throphies = [] as TROPHY[];

	/**
	 * quick way to get the throphies, use getProfile for a better way of obtaining throphies
	 */
	get throphies() {
		if (this._throphies.length) return this._throphies;
		return (this._throphies = TROPHIES.filter((_, i) => {
			if (!_ || typeof this.$.public_flags == "undefined") return false;
			const bitwise = 1 << i;

			return (bitwise & this.$.public_flags) == bitwise;
		}) as TROPHY[]);
	}

	note = new WritableStore<null | string>(null);

	async getNote() {
		if (this.note.value) return;
		try {
			const resp = await this.$client.Request.get(`users/@me/notes/${this.id}`, {}).response();
			this.note.set(resp.note);
		} catch {
			this.note.set("");
		}
	}

	setNote(note: string) {
		return this.$client.Request.put(`users/@me/notes/${this.id}`, { data: { note } });
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

	get(key: string): DiscordUser | undefined {
		const has = super.get(key);
		if (!has) {
			// what to do????
		}
		return has;
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

		$client.guildFolders.subscribe(() => {
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

		// console.error(this.$client.userSettings.value.guildFolders);

		const guildFolders = this.$client.guildFolders.value || [];

		// cloned folders objects
		const folders = guildFolders
			.filter((a) => a.id)
			.map((obj) => {
				return {
					guilds: [],
					id: obj.id!.value,
					color: obj.color?.value || null,
					guild_ids: obj.guildIds,
					name: obj.name?.value || null,
				} as GuildsFolder;
			});
		const arrangement = guildFolders.map((a) => a.guildIds).flat();

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

class DiscordGuildFoldersSetting extends WritableStore<PreloadedUserSettings_GuildFolder[] | null> {
	constructor() {
		super(null);
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

	guildFolders = new DiscordGuildFoldersSetting();

	users: UsersJar;
	relationships: RelationshipsJar;
	dms: DMsJar;
	guilds: GuildsJar;
	guildSettings: DiscordGuildSettingsJar;
	readStates: ReadStateHandler;
	presences = new PresencesJar();
	gif: DiscordGifPicker;

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
		const currentUser = this.users.get(this.ready.user.id)!;

		channels.forEach((r) => {
			const has = this.dms.get(r.id);

			const { id, recipient_ids, recipients, type, ...obj } = r;

			// add users
			recipients?.forEach((a) => this.addUser(a));

			let dmToManipulate: DiscordDMChannel | DiscordGroupDMChannel | undefined;

			const _recipients = recipients
				? recipients.map((a) => this.users.get(a.id)!).filter((a) => a)
				: recipient_ids.map((a) => this.users.get(a)!).filter((a) => a);

			if (has) {
				dmToManipulate = has;
				has.setState(obj);

				has.recipients.shallowSet(mergeLikeSet(currentUser, _recipients));
			} else {
				if (r.type === ChannelType.DM) {
					const dm = new DiscordDMChannel(obj, r.id, _recipients, this);
					dmToManipulate = dm;
					this.dms.add(r.id, dm);
				} else {
					const groupDM = new DiscordGroupDMChannel(obj, r.id, _recipients, this);
					dmToManipulate = groupDM;
					this.dms.add(r.id, groupDM);
				}
				this.dms.sorted.refresh();
			}

			if (dmToManipulate)
				recipient_ids
					.filter((a) => typeof a == "string")
					.forEach((a) => {
						if (dmToManipulate?.recipients.value.find((a) => a.id)) {
							// if it's already in there we don't have to wait for the user to load up
							return;
						}
						const unsub = this.waitForUser(a).subscribe((user) => {
							if (user) {
								unsub();
								dmToManipulate?.recipients.shallowUpdate((m) => mergeLikeSet(m, user));
							}
						});
					});
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

				const _user = ("user" in member && (member.user as APIUser)) || user.$;

				const profile = user.profiles.insert({ ...member, user: _user }, guild);
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

		this.gif = new DiscordGifPicker(Request);

		// import only when needed
		import("./lib/wrapped").then((a) => {
			a.getGuildFoldersFromProto(ready.user_settings_proto).then((guildFolders) => {
				this.guildFolders.set(guildFolders);
			});
		});

		this.users = new UsersJar(this);
		this.relationships = new RelationshipsJar(this);
		ready.users.forEach((u) => this.addUser(u));

		this.dms = new DMsJar();

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
			let guild: DiscordGuild;

			// dirty bit
			if ("properties" in _guild) {
				const properties = _guild.properties;
				delete _guild.properties;
				Object.assign(_guild, properties);
			}

			const has = this.guilds.get(_guild.id);
			if (has) {
				guild = has;
				const $ = _guild as ClientGuild;
				guild.setState({
					name: $.name,
					icon: $.icon,
					description: $.description,
					owner_id: $.owner_id,
					roles: $.roles,
					rules_channel_id: $.rules_channel_id,
				});
			} else {
				// what's the use of this???
				ready.guilds.push(_guild as ClientGuild);

				guild = new DiscordGuild(
					// nothing should go wrong, right??
					_guild as ClientGuild,
					this.Request,
					this.Gateway,
					this.users,
					this.guildSettings
				);
			}

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
		Gateway.on("t:guild_delete", (evt) => {
			const guild = this.guilds.get(evt.id);
			if (!guild) return;

			guild.members.forEach((a) => {
				const user = a.user;
				user.profiles.delete(guild.id);
			});

			this.guilds.delete(evt.id);
		});

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

		const getMessagesJar = (channel_id: string, guild_id?: string, log?: any) => {
			const channel = findChannel(channel_id, guild_id);

			if (channel && "messages" in channel) {
				return channel.messages;
			}

			throw errJarNotFound(log);
		};

		const errJarNotFound = (m: any) => {
			const text = `message: channel not found or invalid`;
			this.logger.err(m)();
			return new Error(text);
		};

		const getMessage = (id: string, channel_id: string, guild_id?: string) => {
			const mJar = getMessagesJar(channel_id, guild_id);
			if (!mJar) throw errJarNotFound({ channel_id, guild_id, id });
			const message = mJar.get(id);

			if (!message) {
				this.logger.err(
					"message_reaction_remove: message not found or invalid",
					channel_id,
					guild_id,
					id
				)();
				throw new Error("message not found " + `${channel_id} ${guild_id} ${id}`);
			}

			return message;
		};

		Gateway.on("t:message_create", (m) => {
			const mJar = getMessagesJar(m.channel_id, m.guild_id);

			const mm = mJar.append(m);
			mm.$channel.lastMessageID.set(m.id);

			if (mm instanceof DiscordDirectMessage) {
				this.dms.sorted.refresh();
			}

			// if current user sent a message to a channel, the readState count changes to 0
			if (m.author.id === this.ready.user.id) {
				mm.$channel.readState.setState({ last_message_id: m.id, mention_count: 0 });
				return;
			}

			if (mm.wouldPing()) {
				mm.$channel.readState.increment();
			}
		});
		Gateway.on("t:message_update", (m) => {
			const mJar = getMessagesJar(m.channel_id, m.guild_id, m);

			mJar.update(m);
		});
		Gateway.on("t:message_delete", (evt) => {
			const mJar = getMessagesJar(evt.channel_id, evt.guild_id, evt);

			mJar.remove(evt.id);
		});
		Gateway.on("t:message_delete_bulk", (evt) => {
			const mJar = getMessagesJar(evt.channel_id, evt.guild_id);

			mJar.removeBulk(evt.ids);
		});

		Gateway.on("t:message_reaction_add", (evt) => {
			const message = getMessage(evt.message_id, evt.channel_id, evt.guild_id);

			message.reactions.addCount(evt.emoji, evt.user_id === this.ready.user.id);
		});

		Gateway.on("t:message_reaction_remove", (evt) => {
			const message = getMessage(evt.message_id, evt.channel_id, evt.guild_id);

			message.reactions.removeCount(evt.emoji, evt.user_id === this.ready.user.id);
		});

		Gateway.on("t:message_reaction_remove_all", (evt) => {
			const message = getMessage(evt.message_id, evt.channel_id, evt.guild_id);

			message.reactions.detachAll();
		});

		Gateway.on("t:message_reaction_remove_emoji", (evt) => {
			const message = getMessage(evt.message_id, evt.channel_id, evt.guild_id);

			message.reactions.detach(evt.emoji);
		});

		// ANCHOR: Typing start
		Gateway.on("t:typing_start", (evt) => {
			const channel = findChannel(evt.channel_id, evt.guild_id);

			if (!channel) {
				this.logger.err("typing_start: channel not found or invalid", evt)();
				return;
			}

			if ("typingState" in channel) {
				let user = this.users.get(evt.user_id);

				if (!user && evt.member?.user) {
					user = this.addUser(evt.member.user);
				}

				user && channel.typingState.add(user);
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
			evt.members.forEach((rest) => {
				if (!rest.user) return;

				const _user = this.addUser(rest.user);
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

		Gateway.on("t:passive_update_v1", (evt) => {
			const guild_id = evt.guild_id;
			const guild = this.guilds.get(guild_id);
			if (!guild) return;

			evt.members.forEach((member) => {
				if (!member.user) return;
				const user = this.addUser(member.user);
				if (!user) return;
				const profile = user.profiles.insert(member, guild);
				guild.members.add(profile);
			});

			evt.channels.forEach((state) => {
				if (!state.id) return;

				const _state = this.readStates.get(state.id);
				_state.setState(state);
				if (_state.notFound) {
					this.logger.log("readstate was assigned via passive update", state)();
				}
			});
		});

		Gateway.on("t:user_settings_proto_update", (evt) => {
			if (!evt.partial && evt.settings?.proto) {
				import("./lib/wrapped").then((a) =>
					a.getGuildFoldersFromProto(evt.settings.proto).then((guildFolders) => {
						this.guildFolders.set(guildFolders);
					})
				);
			}
		});

		Gateway.on("t:user_note_update", (e) => {
			const user = this.users.get(e.id);
			if (user) user.note.set(e.note);
			else {
				const unsub = this.waitForUser(e.id).subscribe((user) => {
					if (user) {
						unsub();
						user.note.set(e.note);
					}
				});
			}
		});
	}

	waitingForUsers = new Map<string, Writable<DiscordUser | null>>();

	waitForUser(id: string) {
		const $user = writable<DiscordUser | null>(null);

		const initUser = this.users.get(id);

		if (initUser) {
			$user.set(initUser);
		} else {
			this.waitingForUsers.set(id, $user);
		}

		return $user;
	}

	addUser(user: ClientAPIUser | APIUser) {
		const has = this.users.get(user.id);
		// user object from API for current user lacks some properties

		if (has) {
			// use deep comparison when decoration is present
			if ("avatar_decoration_data" in user && user.avatar_decoration_data) {
				has.setStateDeep(user);
			} else has.setState(user);
		} else {
			const _user = new DiscordUser(user, this);
			// webhook users should not be cached
			if (user.bot && user.discriminator == "0000") {
				return _user;
			}
			this.users.set(user.id, _user);
			this.waitingForUsers.get(user.id)?.set(_user);
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
