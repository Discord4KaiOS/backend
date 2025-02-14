import type { APIOverwrite, GuildTextChannelType, Snowflake } from "discord-api-types/v10";
import { DiscordGuildChannelCategory, DiscordGuildTextChannel } from "./DiscordChannels";
import { DiscordGuildSettingsJar, DiscordUser, UsersJar } from "./DiscordClient";
import { WritableStore, toVoid, Jar, ChannelType, sleep } from "./lib/utils";
import { ClientAPIGuildMember, ClientChannel, ClientGuild } from "./lib/types";
import DiscordRequest from "./DiscordRequest";
import Logger from "./Logger";
import Gateway from "./DiscordGateway";
import BigInteger from "./lib/bigint/BigInteger";

export const PermissionFlagsBits = {
	CreateInstantInvite: BigInteger.BigInt(1),
	KickMembers: BigInteger.BigInt(2),
	BanMembers: BigInteger.BigInt(4),
	Administrator: BigInteger.BigInt(8),
	ManageChannels: BigInteger.BigInt(16),
	ManageGuild: BigInteger.BigInt(32),
	AddReactions: BigInteger.BigInt(64),
	ViewAuditLog: BigInteger.BigInt(128),
	PrioritySpeaker: BigInteger.BigInt(256),
	Stream: BigInteger.BigInt(512),
	ViewChannel: BigInteger.BigInt(1024),
	SendMessages: BigInteger.BigInt(2048),
	SendTTSMessages: BigInteger.BigInt(4096),
	ManageMessages: BigInteger.BigInt(8192),
	EmbedLinks: BigInteger.BigInt(16384),
	AttachFiles: BigInteger.BigInt(32768),
	ReadMessageHistory: BigInteger.BigInt(65536),
	MentionEveryone: BigInteger.BigInt(131072),
	UseExternalEmojis: BigInteger.BigInt(262144),
	ViewGuildInsights: BigInteger.BigInt(524288),
	Connect: BigInteger.BigInt(1048576),
	Speak: BigInteger.BigInt(2097152),
	MuteMembers: BigInteger.BigInt(4194304),
	DeafenMembers: BigInteger.BigInt(8388608),
	MoveMembers: BigInteger.BigInt(16777216),
	UseVAD: BigInteger.BigInt(33554432),
	ChangeNickname: BigInteger.BigInt(67108864),
	ManageNicknames: BigInteger.BigInt(134217728),
	ManageRoles: BigInteger.BigInt(268435456),
	ManageWebhooks: BigInteger.BigInt(536870912),
	ManageEmojisAndStickers: BigInteger.BigInt(1073741824),
	ManageGuildExpressions: BigInteger.BigInt(1073741824),
	UseApplicationCommands: BigInteger.BigInt(2147483648),
	RequestToSpeak: BigInteger.BigInt(4294967296),
	ManageEvents: BigInteger.BigInt(8589934592),
	ManageThreads: BigInteger.BigInt(17179869184),
	CreatePublicThreads: BigInteger.BigInt(34359738368),
	CreatePrivateThreads: BigInteger.BigInt(68719476736),
	UseExternalStickers: BigInteger.BigInt(137438953472),
	SendMessagesInThreads: BigInteger.BigInt(274877906944),
	UseEmbeddedActivities: BigInteger.BigInt(549755813888),
	ModerateMembers: BigInteger.BigInt(1099511627776),
	ViewCreatorMonetizationAnalytics: BigInteger.BigInt(2199023255552),
	UseSoundboard: BigInteger.BigInt(4398046511104),
	CreateGuildExpressions: BigInteger.BigInt(8796093022208),
	CreateEvents: BigInteger.BigInt(17592186044416),
	UseExternalSounds: BigInteger.BigInt(35184372088832),
	SendVoiceMessages: BigInteger.BigInt(70368744177664),
	SendPolls: BigInteger.BigInt(562949953421312),
	UseExternalApps: BigInteger.BigInt(1125899906842624),
} as const;

export class DiscordServerProfile extends WritableStore<
	Pick<
		ClientAPIGuildMember,
		| "avatar"
		| "deaf"
		| "mute"
		| "nick"
		| "roles"
		| "communication_disabled_until"
		| "pending"
		| "premium_since"
		| "bio"
	>
> {
	constructor(public $: ClientAPIGuildMember, public $guild: DiscordGuild, public user: DiscordUser) {
		super($);
	}
}

type RoleAccess = Partial<Record<keyof typeof PermissionFlagsBits, boolean>>;

type ChannelsJarItems = DiscordGuildTextChannel<GuildTextChannelType> | DiscordGuildChannelCategory;

class SortedChannels extends WritableStore<ChannelsJarItems[]> {
	constructor(public $: ChannelsJar) {
		super($.toSorted());
	}

	refresh() {
		this.shallowSet(this.$.toSorted());
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
		const implementExperimentalFavoriteCategory = this.guild?.config?.experimental_favorite_channels || false;

		const favorites: ChannelsJarItems[] = [];

		const list = this.list();

		const position = (a: ChannelsJarItems, b: ChannelsJarItems) => a?.value.position - b?.value.position;

		list.sort(position);

		const map = new Map<string | null, typeof list>([[null, []]]);

		// assign the categories to their respective parent_id
		list.forEach((e) => {
			if (e.type === ChannelType.GuildCategory) {
				map.set(e.id, [e]);
			}
		});

		list.forEach((e) => {
			if (!("readState" in e)) return;

			if (this.forced.has(e.id) || includeHidden || e.roleAccess().ViewChannel !== false) {
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
			if (key && val.length <= 1) {
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

let lastLazyGuild = "";

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

	static get lastLazyGuild() {
		return lastLazyGuild;
	}

	static set lastLazyGuild(value: string) {
		lastLazyGuild = value;
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

		// return early
		if (isOwner) {
			Object.keys(PermissionFlagsBits).forEach((perm) => {
				obj[perm as keyof typeof PermissionFlagsBits] = true;
			});

			return obj;
		}

		const profileRoles = this.$users.get(user_id)!.profiles.get(this.id)!.value.roles.concat(user_id);

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
					const _perms = BigInteger.BigInt(perms);

					Object.entries(PermissionFlagsBits).forEach(([perm, num]) => {
						if (BigInteger.equal(BigInteger.bitwiseAnd(num, _perms), num))
							obj[perm as keyof typeof PermissionFlagsBits] = true;
					});
				});
		}

		if (obj.Administrator === true) {
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
					const _deny = BigInteger.BigInt(o.deny);
					const _allow = BigInteger.BigInt(o.allow);

					if (BigInteger.equal(BigInteger.bitwiseAnd(_deny, num), num))
						obj[perm as keyof typeof PermissionFlagsBits] = false;
					if (BigInteger.equal(BigInteger.bitwiseAnd(_allow, num), num))
						obj[perm as keyof typeof PermissionFlagsBits] = true;
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
							this.channels.set(a.id, new DiscordGuildTextChannel<_channelType>(props, a.type, this, a.id));
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

	lazySubscribed = false;

	async lazySubscribe() {
		if (lastLazyGuild === this.id) return;
		lastLazyGuild = this.id;

		// op: 14 seems to be non existent now
		this.Gateway.send({
			op: 37,
			d: {
				subscriptions: {
					[this.id]: {
						typing: true,
						threads: true,
						activities: true,
					},

					// {
					// 	activities: true,
					// 	threads: true,
					// 	typing: true,

					// 	/*
					// 	// there's also
					// 	channels: {
					// 		[channel.id]: [ [0,99] ]
					// 	}
					// 	*/
					// },
				},
			},
		});

		// seems like there's a slight delay?
		await sleep(500 + Math.floor(Math.random() * 500));

		// absolutely have no idea what this is for
		this.Gateway.send({
			op: 36,
			d: {
				guild_id: this.id,
			},
		});
	}

	/**
	 * undocumented "Lazy Guilds" api, it will request for members and other state changes for the guild
	 */
	lazy(user_ids?: string[]) {
		this.lazySubscribe();

		// this seems to still be existent, should only work if user_ids is passed
		if (user_ids)
			this.Gateway.send({
				op: 8,
				d: {
					guild_id: [this.id],
					query: undefined,
					limit: undefined,
					presences: false,
					user_ids,
				},
			});
	}
}
