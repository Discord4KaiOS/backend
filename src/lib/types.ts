import type {
	APIUser,
	APIEmoji,
	GatewayActivity,
	APIInteractionGuildMember,
	APIOverwrite,
	ChannelType,
	APIGuild,
	GatewayReadyDispatch,
	GatewayReadyDispatchData,
	APIGuildTextChannel,
	GuildTextChannelType,
	APIGuildChannel,
	APIThreadOnlyChannel,
	APIGuildForumChannel,
	APIGuildCategoryChannel,
	APIVoiceChannelBase,
} from "discord-api-types/v10";
export * from "discord-api-types/v10";

export interface ReadyEvent extends Omit<GatewayReadyDispatchData, "guilds"> {
	user_settings: UserSettings;
	user_guild_settings: UserGuildSetting[];
	// is this part intentional?
	user: APIUser;
	sessions: Session[];
	session_type: string;
	relationships: ClientRelationship[];
	read_state: ReadState[];
	private_channels: PrivateChannel[];
	guilds: ClientGuild[];
	country_code: string;
	connected_accounts: ConnectedAccount[];
	auth_session_id_hash: string;
	api_code_version: number;
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
	members: APIInteractionGuildMember[];
	guild_scheduled_events: GuildScheduledEvent[];
}

interface IconEmoji {
	name: string;
	id: null;
}

type ClientGuildTextChannel = APIGuildChannel<GuildTextChannelType> & ClientChannelBase;
type ClientGuildVoiceChannel = APIVoiceChannelBase<ChannelType.GuildVoice | ChannelType.GuildStageVoice> & ClientChannelBase;
type ClientGuildForumChannel = APIGuildForumChannel & ClientChannelBase;

export type ClientChannel = APIGuildCategoryChannel | ClientGuildTextChannel | ClientGuildVoiceChannel | ClientGuildForumChannel;

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

export interface ClientUser extends APIUser {
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
	recipients?: APIUser[];
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

interface ReadState {
	mention_count: number;
	last_pin_timestamp: Date;
	last_message_id: string;
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
	id: string;
	user: APIUser;
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

interface UserGuildSetting {
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
	channel_overrides: ChannelOverride[];
}

interface ChannelOverride {
	muted: boolean;
	mute_config: null;
	message_notifications: number;
	collapsed: boolean;
	channel_id: string;
}

interface UserSettings {
	detect_platform_accounts: boolean;
	animate_stickers: number;
	inline_attachment_media: boolean;
	status: string;
	message_display_compact: boolean;
	view_nsfw_guilds: boolean;
	timezone_offset: number;
	enable_tts_command: boolean;
	disable_games_tab: boolean;
	stream_notifications_enabled: boolean;
	animate_emoji: boolean;
	guild_folders: GuildFolder[];
	activity_joining_restricted_guild_ids: any[];
	convert_emoticons: boolean;
	afk_timeout: number;
	passwordless: boolean;
	contact_sync_enabled: boolean;
	gif_auto_play: boolean;
	custom_status: CustomStatus;
	native_phone_integration_enabled: boolean;
	allow_accessibility_detection: boolean;
	friend_discovery_flags: number;
	show_current_game: boolean;
	restricted_guilds: any[];
	developer_mode: boolean;
	view_nsfw_commands: boolean;
	render_reactions: boolean;
	locale: string;
	render_embeds: boolean;
	inline_embed_media: boolean;
	default_guilds_restricted: boolean;
	explicit_content_filter: number;
	activity_restricted_guild_ids: any[];
	theme: "dark" | "light";
}

interface CustomStatus {
	text: string;
	expires_at: null;
	emoji_name: null | string;
	emoji_id: null | string;
}

interface GuildFolder {
	name: null;
	id: number | null;
	guild_ids: string[];
	color: number | null;
}
