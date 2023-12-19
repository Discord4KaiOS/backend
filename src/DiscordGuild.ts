import type {
	APIGuildMember,
	APIOverwrite,
	GuildTextChannelType,
	Snowflake,
} from "discord-api-types/v10";
import { DiscordGuildChannelCategory, DiscordGuildTextChannel } from "./DiscordChannels";
import { DiscordGuildSettingsJar, DiscordUser, UsersJar } from "./DiscordClient";
import { WritableStore, toVoid, Jar, spread, ChannelType } from "./lib/utils";
import { ClientChannel, ClientGuild } from "./lib/types";
import DiscordRequest from "./DiscordRequest";
import Logger from "./Logger";
import Gateway from "./DiscordGateway";

export const PermissionFlagsBits = {
	CREATE_INSTANT_INVITE: 1,
	KICK_MEMBERS: 2,
	BAN_MEMBERS: 4,
	ADMINISTRATOR: 8,
	MANAGE_CHANNELS: 16,
	MANAGE_GUILD: 32,
	ADD_REACTIONS: 64,
	VIEW_AUDIT_LOG: 128,
	PRIORITY_SPEAKER: 256,
	STREAM: 512,
	VIEW_CHANNEL: 1024,
	SEND_MESSAGES: 2048,
	SEND_TTS_MESSAGES: 4096,
	MANAGE_MESSAGES: 8192,
	EMBED_LINKS: 16384,
	ATTACH_FILES: 32768,
	READ_MESSAGE_HISTORY: 65536,
	MENTION_EVERYONE: 131072,
	USE_EXTERNAL_EMOJIS: 262144,
	VIEW_GUILD_INSIGHTS: 524288,
	CONNECT: 1048576,
	SPEAK: 2097152,
	MUTE_MEMBERS: 4194304,
	DEAFEN_MEMBERS: 8388608,
	MOVE_MEMBERS: 16777216,
	USE_VAD: 33554432,
	CHANGE_NICKNAME: 67108864,
	MANAGE_NICKNAMES: 134217728,
	MANAGE_ROLES: 268435456,
	MANAGE_WEBHOOKS: 536870912,
	MANAGE_EMOJIS: 1073741824,
};

export class DiscordServerProfile extends WritableStore<
	Pick<
		APIGuildMember,
		| "avatar"
		| "deaf"
		| "mute"
		| "nick"
		| "roles"
		| "communication_disabled_until"
		| "pending"
		| "premium_since"
	>
> {
	constructor(public $: APIGuildMember, public $guild: DiscordGuild, public user: DiscordUser) {
		super($);
	}
}

type RoleAccess = Partial<Record<keyof typeof PermissionFlagsBits, boolean>>;

type ChannelsJarItems = DiscordGuildTextChannel<GuildTextChannelType> | DiscordGuildChannelCategory;

class SortedChannels extends WritableStore<ChannelsJarItems[]> {
	constructor(public $: ChannelsJar) {
		super($.toSorted(true));
	}

	refresh() {
		this.shallowSet(this.$.toSorted(true));
	}
}

const forcedChannels = new Set<string>();

class ChannelsJar extends Jar<ChannelsJarItems> {
	sorted = new SortedChannels(this);

	constructor(public guild: DiscordGuild) {
		super();
	}

	/**
	 * force these channels to show up (because stuff occur that i'm not bothered to test out)
	 */
	forced = forcedChannels;

	toSorted(includeHidden = false) {
		/**
		 * TODO: implement experimental favorite category
		 */
		const implementExperimentalFavoriteCategory =
			this.guild?.config?.experimental_favorite_channels || false;

		const favorites: ChannelsJarItems[] = [];

		const list = this.list();

		const position = (a: ChannelsJarItems, b: ChannelsJarItems) =>
			a?.value.position - b?.value.position;

		list.sort(position);

		const map = new Map<string | null, typeof list>([[null, []]]);

		// assign the categories to their respective parent_id
		list.forEach((e) => {
			if (e.type === ChannelType.GuildCategory) {
				map.set(e.id, [e]);
			}
		});

		list.forEach((e) => {
			if (e instanceof DiscordGuildChannelCategory) return;

			if (this.forced.has(e.id) || includeHidden || e.roleAccess().VIEW_CHANNEL !== false) {
				switch (e.type) {
					case ChannelType.GuildText:
					case ChannelType.GuildAnnouncement:
						if (implementExperimentalFavoriteCategory && e.userOverrides?.value.flags === 6144) {
							e.favorite = true;
							favorites.push(e);
							break;
						}

						e.favorite = false;
						const parent = map.get(e.value.parent_id || null);
						(parent || map.get(null)!).push(e);
						break;
				}
			}
		});

		map.forEach((val, key) => {
			if (val.length <= 1) {
				map.delete(key);
			}
		});

		const result = [...map.values()].sort(([a], [b]) => position(a, b)).flat();

		if (favorites.length) {
			favorites.sort(position);
			result.unshift(...favorites);
		}

		return result;
	}
}

export class DiscordGuild extends WritableStore<
	Pick<ClientGuild, "name" | "icon" | "description" | "owner_id" | "roles" | "rules_channel_id">
> {
	id: Snowflake;
	channels = new ChannelsJar(this);
	static logger = new Logger("DiscordGuild");
	members = new Set<DiscordServerProfile>();

	get [Symbol.toStringTag || Symbol()]() {
		return "DiscordGuild";
	}

	constructor(
		public $: ClientGuild,
		public Request: DiscordRequest,
		public Gateway: Gateway,
		public $users: UsersJar,
		public $guildSettings: DiscordGuildSettingsJar
	) {
		super({
			name: $.name,
			icon: $.icon,
			description: $.description,
			owner_id: $.owner_id,
			roles: $.roles,
			rules_channel_id: $.rules_channel_id,
		});
		this.id = $.id;
	}

	get userSettings() {
		return this.$guildSettings.get(this.id);
	}

	get config() {
		return this.Request.config;
	}

	parseRoleAccess(overwrites: APIOverwrite[] = []) {
		const rej = new Error("Gateway not initialized properly!");

		const obj: RoleAccess = {};

		const user_id = this.config.user_id;
		if (!user_id) throw rej;

		const roles = this.value.roles;
		const isOwner = this.value.owner_id === user_id;

		const profileRoles = this.$users
			.get(user_id)!
			.profiles.get(this.id)!
			.value.roles.concat(user_id);

		if (!roles || !profileRoles) throw rej;

		let everyone_id: string | null = null;

		if (roles.length) {
			[...roles]
				.sort((a, b) => a.position - b.position)
				.filter((o) => {
					const isEveryone = o.position === 0;
					if (isEveryone) everyone_id = o.id;

					return profileRoles.includes(o.id) || isEveryone;
				})
				.map((o) => o.permissions)
				.forEach((perms) => {
					Object.entries(PermissionFlagsBits).forEach(([perm, num]) => {
						if ((num & +perms) === num) obj[perm as keyof typeof PermissionFlagsBits] = true;
					});
				});
		}

		if (obj.ADMINISTRATOR === true || isOwner) {
			Object.keys(PermissionFlagsBits).forEach((perm) => {
				obj[perm as keyof typeof PermissionFlagsBits] = true;
			});

			return obj;
		}

		const _overwrites = [...overwrites];

		if (everyone_id) {
			const everyone = _overwrites.findIndex((o) => o.id == everyone_id);
			if (everyone != -1) {
				_overwrites.unshift(_overwrites.splice(everyone, 1)[0]);
				profileRoles.unshift(everyone_id);
			}
		}

		_overwrites.forEach((o) => {
			if (profileRoles.includes(o.id)) {
				Object.entries(PermissionFlagsBits).forEach(([perm, num]) => {
					if ((+o.deny & num) === num) obj[perm as keyof typeof PermissionFlagsBits] = false;
					if ((+o.allow & num) === num) obj[perm as keyof typeof PermissionFlagsBits] = true;
				});
			}
		});

		return obj;
	}

	handleChannels(...args: ClientChannel[]) {
		args.forEach((a) => {
			const has = this.channels.get(a.id);
			switch (a.type) {
				case ChannelType.GuildCategory:
					{
						const props = {
							name: a.name,
							position: a.position,
						};

						if (!has) {
							this.channels.set(a.id, new DiscordGuildChannelCategory(props, a.id, this));
						} else (has as DiscordGuildChannelCategory).shallowSet(props);
					}
					break;
				case ChannelType.GuildAnnouncement:
				case ChannelType.GuildText:
					{
						const props = toVoid({
							name: a.name,
							last_pin_timestamp: a.last_pin_timestamp,
							last_message_id: a.last_message_id,
							position: a.position,
							permission_overwrites: a.permission_overwrites!,
							nsfw: a.nsfw!,
							parent_id: a.parent_id,
							topic: a.topic,
							rate_limit_per_user: a.rate_limit_per_user,
						});

						// this looks gross lmao
						type _channelType = typeof a.type;
						type _has = DiscordGuildTextChannel<_channelType>;

						if (!has) {
							this.channels.set(
								a.id,
								new DiscordGuildTextChannel<_channelType>(props, a.type, this, a.id)
							);
						} else {
							// if new state has array, then use deepEqual comparison
							if (props.permission_overwrites) (has as _has).setStateDeep(props);
							else (has as _has).setState(props);
						}
					}
					break;

				default:
					DiscordGuild.logger.err("unsupported ChannelType:", ChannelType[a.type], a)();
			}
		});
	}

	isMuted() {
		const settings = this.userSettings;
		if (settings) return settings.value.muted;
		return false;
	}

	/**
	 * undocumented "Lazy Guilds" api, it will request for members and other state changes for the guild
	 */
	lazy(user_ids?: string[]) {
		this.Gateway.send({
			op: 14,
			d: {
				activities: true,
				guild_id: this.id,
				threads: false,
				typing: true,
			},
		});
		this.Gateway.send({
			op: 8,
			d: {
				guild_id: [this.id],
				query: "",
				limit: 100,
				presences: false,
				user_ids,
			},
		});
	}
}
