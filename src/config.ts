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
}
