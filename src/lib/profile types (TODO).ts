import { ClientAPIGuildMember, ClientAPIUser } from "./types";

export interface ClientUserProfile {
	user: ClientAPIUser;
	connected_accounts: Array<{
		type: string;
		id: string;
		name: string;
		verified: boolean;
		metadata?: {
			created_at: string;
			game_count: string;
			item_count_dota2: string;
			item_count_tf2: string;
		};
	}>;
	premium_since: null | string;
	premium_type: number | null;
	premium_guild_since: null | string;
	profile_themes_experiment_bucket: number;
	user_profile: ErProfile;
	badges: Array<{
		id: string;
		description: string;
		icon: string;
		link?: string;
	}>;
	guild_badges: any[];
	mutual_friends: ClientAPIUser[];
	mutual_guilds: Array<{
		id: string;
		nick: null | string;
	}>;
	guild_member: ClientAPIGuildMember;
	guild_member_profile: ErProfile;
	legacy_username: null | string;
}

interface ErProfile {
	guild_id?: string;
	pronouns: string;
	bio?: string;
	banner?: null | string;
	accent_color?: number | null;
	theme_colors?: null;
	popout_animation_particle_type?: null;
	emoji?: null;
	profile_effect?: {
		id: string;
	} | null;
}
