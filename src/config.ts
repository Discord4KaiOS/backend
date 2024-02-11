import { DiscordClient } from "..";

/**
 * shared config throughout the library
 */
export interface Config {
	debug?: boolean;
	worker?: boolean;
	user_id?: string;
	token?: string;
	client?: DiscordClient;
	/**
	 * - false by default, favorite channels implementation is unknown
	 * - when toggled, you get a USER_GUILD_SETTINGS_UPDATE dispatch on the gateway
	 *
	 * when you favorite a channel:
	 * - USER_GUILD_SETTINGS_UPDATE.channel_overrides[n].flags = 6144
	 *
	 * when it's not favorite:
	 * - USER_GUILD_SETTINGS_UPDATE.channel_overrides[n].flags = 4096
	 *
	 * the bitwise number for this is unknown
	 */
	experimental_favorite_channels?: boolean;

	// headers to inject into every request
	custom_headers?: Record<string, string>;
}
