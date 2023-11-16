import type { APIUser, APIEmoji, GatewayActivity, APIInteractionGuildMember, APIOverwrite, ChannelType } from "discord-api-types/v10";
export * from "discord-api-types/v10";

export interface ReadyEvent {
	v: number;
	user_settings: UserSettings;
	user_guild_settings: UserGuildSetting[];
	user: APIUser;
	sessions: Session[];
	session_type: string;
	session_id: string;
	resume_gateway_url: string;
	relationships: ClientRelationship[];
	read_state: ReadState[];
	private_channels: PrivateChannel[];
	guilds: ClientGuild[];
	country_code: string;
	connected_accounts: ConnectedAccount[];
	auth_session_id_hash: string;
	api_code_version: number;
}

export interface ConnectedAccount {
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

export interface ClientGuild {
	max_members: number;
	features: string[];
	roles: Role[];
	premium_progress_bar_enabled: boolean;
	application_id: null;
	nsfw_level: number;
	premium_tier: number;
	vanity_url_code: null | string;
	large: boolean;
	preferred_locale: string;
	premium_subscription_count: number;
	nsfw: boolean;
	splash: null | string;
	banner: null | string;
	id: string;
	stickers: Sticker[];
	owner_id: string;
	hub_type: null;
	system_channel_id: string;
	stage_instances: any[];
	rules_channel_id: null | string;
	home_header: null;
	channels: ClientChannel[];
	threads: any[];
	member_count: number;
	mfa_level: number;
	afk_channel_id: null | string;
	voice_states: any[];
	max_stage_video_channel_users: number;
	presences: Presence[];
	max_video_channel_users: number;
	embedded_activities: any[];
	emojis: APIEmoji[];
	guild_hashes: GuildHashes;
	application_command_counts: { [key: string]: number };
	afk_timeout: number;
	region: string;
	explicit_content_filter: number;
	verification_level: number;
	discovery_splash: null | string;
	default_message_notifications: number;
	lazy: boolean;
	joined_at: Date;
	members: APIInteractionGuildMember[];
	name: string;
	description: null | string;
	system_channel_flags: number;
	public_updates_channel_id: null | string;
	safety_alerts_channel_id: null | string;
	guild_scheduled_events: GuildScheduledEvent[];
	icon: null | string;
}

interface IconEmoji {
	name: string;
	id: null;
}

export interface ClientChannel {
	guild_id?: string;
	version: number;
	type: number;
	position: number;
	permission_overwrites: APIOverwrite[];
	name: string;
	id: string;
	flags: number;
	topic?: null | string;
	rate_limit_per_user?: number;
	parent_id?: string;
	icon_emoji: IconEmoji;
	nsfw?: boolean;
	last_pin_timestamp?: Date;
	last_message_id?: null | string;
	user_limit?: number;
	rtc_region?: null | string;
	bitrate?: number;
	template?: string;
	default_sort_order?: null;
	default_reaction_emoji?: null;
	default_forum_layout?: number;
	available_tags?: any[];
	default_thread_rate_limit_per_user?: number;
	video_quality_mode?: number;
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

export interface Presence {
	user: {
		id: string;
	};
	status: string;
	client_status: {
		[key in DiscordClients]?: ClientStatuses;
	};
	activities: GatewayActivity[];
}

export interface PresenceUser {
	id: string;
}

export interface Role {
	version: number;
	unicode_emoji: null | string;
	tags: Tags;
	position: number;
	permissions: string;
	name: string;
	mentionable: boolean;
	managed: boolean;
	id: string;
	icon: null | string;
	hoist: boolean;
	flags: number;
	color: number;
}

export interface Tags {
	bot_id?: string;
	premium_subscriber?: null;
}

export interface Sticker {
	version: number;
	type: number;
	tags: string;
	name: string;
	id: string;
	guild_id: string;
	format_type: number;
	description: null | string;
	available: boolean;
	asset?: string;
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

export interface ReadState {
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

export interface Session {
	status: string;
	session_id: string;
	client_info: {
		version: number;
		os: string;
		client: string;
	};
	activities: any[];
}

export interface UserGuildSetting {
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

export interface ChannelOverride {
	muted: boolean;
	mute_config: null;
	message_notifications: number;
	collapsed: boolean;
	channel_id: string;
}

export interface UserSettings {
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

export interface CustomStatus {
	text: string;
	expires_at: null;
	emoji_name: null | string;
	emoji_id: null | string;
}

export interface GuildFolder {
	name: null;
	id: number | null;
	guild_ids: string[];
	color: number | null;
}
