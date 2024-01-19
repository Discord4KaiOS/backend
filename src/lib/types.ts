import type {
	APIUser,
	GatewayActivity,
	APIInteractionGuildMember,
	APIGuild,
	GatewayReadyDispatchData,
	APIGuildTextChannel,
	GuildTextChannelType,
	APIGuildForumChannel,
	APIGuildCategoryChannel,
	APIVoiceChannelBase,
} from "discord-api-types/v10";
export type * from "discord-api-types/v10";
import type { ChannelType } from "./utils";
import { PreloadedUserSettings } from "./discord-protos";

export interface ClientAPIUser extends APIUser {
	avatar_decoration_data?: {
		sku_id: string;
		asset: string;
	} | null;
}

interface ClientGuildMember
	extends Pick<
		APIInteractionGuildMember,
		| "roles"
		| "premium_since"
		| "pending"
		| "nick"
		| "mute"
		| "joined_at"
		| "flags"
		| "deaf"
		| "communication_disabled_until"
		| "avatar"
	> {
	user_id: string;
}

export interface ReadyEvent extends Omit<GatewayReadyDispatchData, "guilds"> {
	// user_settings: UserSettings;
	user_settings_proto: string;
	user_settings: PreloadedUserSettings;
	user_guild_settings: {
		entries: ClientUserGuildSetting[];
		partial: boolean;
		version: number;
	};
	// is this part intentional?
	user: ClientAPIUser;
	sessions: Session[];
	session_type: string;
	relationships: ClientRelationship[];
	read_state: {
		entries: ClientReadState[];
		partial: boolean;
		version: number;
	};
	private_channels: PrivateChannel[];
	guilds: ClientGuild[];

	merged_members: ClientGuildMember[][];

	country_code: string;
	connected_accounts: ConnectedAccount[];
	auth_session_id_hash: string;
	api_code_version: number;
	users: ClientAPIUser[];
}

interface ConnectedAccount {
	visibility: number;
	verified: boolean;
	type: string;
	two_way_link: boolean;
	show_activity: boolean;
	revoked: boolean;
	name: string;
	metadata_visibility: number;
	id: string;
	friend_sync: boolean;
	access_token?: string;
}

export interface ClientGuild extends APIGuild {
	large: boolean;
	nsfw: boolean;
	stage_instances: any[];
	home_header: null;
	channels: ClientChannel[];
	threads: any[];
	member_count: number;
	voice_states: any[];
	presences: Presence[];
	embedded_activities: any[];
	guild_hashes: GuildHashes;
	application_command_counts: { [key: string]: number };
	lazy: boolean;
	joined_at: string;
	guild_scheduled_events: GuildScheduledEvent[];

	// this is dead but the way I coded this entire thing requires it
	members: APIInteractionGuildMember[];
}

// DISCORD MAADE BREAKING CHANGES GRRRR
export interface ReadySupplementalEvent {
	// incomplete i'll add more if I figure out how it works
	merged_members: ClientGuildMember[][];
}

interface IconEmoji {
	name: string;
	id: null;
}

type ClientGuildTextChannel = APIGuildTextChannel<GuildTextChannelType> & ClientChannelBase;
type ClientGuildVoiceChannel = APIVoiceChannelBase<
	ChannelType.GuildVoice | ChannelType.GuildStageVoice
> &
	ClientChannelBase;
type ClientGuildForumChannel = APIGuildForumChannel & ClientChannelBase;

export type ClientChannel =
	| APIGuildCategoryChannel
	| ClientGuildTextChannel
	| ClientGuildVoiceChannel
	| ClientGuildForumChannel;

// this is what's undocumented in the discord api types library
interface ClientChannelBase {
	version: number;
	/**
	 * AI generated emojis for mobile lmao
	 */
	icon_emoji: IconEmoji;
	template?: string;
}

interface GuildHashes {
	version: number;
	roles: GuildHashesChannels;
	metadata: GuildHashesChannels;
	channels: GuildHashesChannels;
}
interface GuildHashesChannels {
	omitted: boolean;
	hash: string;
}

interface GuildScheduledEvent {
	status: number;
	sku_ids: any[];
	scheduled_start_time: Date;
	scheduled_end_time: Date;
	privacy_level: number;
	name: string;
	image: null;
	id: string;
	guild_id: string;
	entity_type: number;
	entity_metadata: EntityMetadata;
	entity_id: null;
	description: string;
	channel_id: null;
}

interface EntityMetadata {
	location: string;
}

export interface ClientUser extends ClientAPIUser {
	verified: boolean;
	purchased_flags: number;
	premium_type: number;
	premium: boolean;
	phone: null;
	nsfw_allowed: boolean;
	mobile: boolean;
	mfa_enabled: boolean;
	flags: number;
	email?: string;
	desktop: boolean;
	banner_color: null;
	banner: null;
	accent_color: null;
}

export type DiscordClients = "desktop" | "mobile" | "web";
export type ClientStatuses = "online" | "idle" | "dnd" | "offline";

interface Presence {
	user: {
		id: string;
	};
	status: string;
	client_status: {
		[key in DiscordClients]?: ClientStatuses;
	};
	activities: GatewayActivity[];
}

export interface PrivateChannel {
	type: ChannelType.DM | ChannelType.GroupDM;
	recipients?: ClientAPIUser[];
	last_message_id?: string | null;
	last_pin_timestamp?: string | null;
	is_spam?: boolean;
	id: string;
	flags?: number;
	owner_id?: string;
	name?: string | null;
	icon?: string | null;
	/**
	 * Application id of the group DM creator if it is bot-created
	 */
	application_id?: string;
	/**
	 * Whether the channel is managed by an OAuth2 application
	 */
	managed?: boolean;
}

export interface ClientReadState {
	mention_count: number;
	last_pin_timestamp: string | null;
	last_message_id: string | null;
	id: string;
}

export const enum RelationshipType {
	// copilot being a bit too smart, it's scary
	NONE = 0,
	FRIEND = 1,
	BLOCKED = 2,
	PENDING_INCOMING = 3,
	PENDING_OUTGOING = 4,
	// i wonder what this is??
	IMPLICIT = 5,
}

export interface ClientRelationship {
	type: RelationshipType;
	nickname: null | string;
	user_id: string;
	id: string;
}

interface Session {
	status: string;
	session_id: string;
	client_info: {
		version: number;
		os: string;
		client: string;
	};
	activities: any[];
}

export interface ClientUserGuildSetting {
	version: number;
	suppress_roles: boolean;
	suppress_everyone: boolean;
	notify_highlights: number;
	muted: boolean;
	mute_scheduled_events: boolean;
	mute_config: null;
	mobile_push: boolean;
	message_notifications: number;
	hide_muted_channels: boolean;
	guild_id: null | string;
	flags: number;
	channel_overrides: ClientChannelOverride[];
}

export interface ClientChannelOverride {
	flags: number;
	muted: boolean;
	mute_config: null;
	message_notifications: number;
	collapsed: boolean;
	channel_id: string;
}
