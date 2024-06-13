import type {
	GatewayGuildCreateDispatchData,
	GatewayGuildDeleteDispatchData,
	GatewayGuildMemberUpdateDispatchData,
	GatewayGuildMembersChunkDispatchData,
	GatewayGuildUpdateDispatchData,
	GatewayMessageCreateDispatchData,
	GatewayMessageDeleteBulkDispatchData,
	GatewayMessageDeleteDispatchData,
	GatewayMessageReactionAddDispatchData,
	GatewayMessageReactionRemoveAllDispatchData,
	GatewayMessageReactionRemoveDispatchData,
	GatewayMessageReactionRemoveEmojiDispatchData,
	GatewayMessageUpdateDispatchData,
	GatewayPresenceUpdateDispatchData,
	GatewayTypingStartDispatchData,
	GatewayVoiceState,
} from "discord-api-types/v10";
import Logger from "./Logger";
import EventEmitter from "./lib/EventEmitter";

import {
	APIChannel,
	ClientAPIGuildMember,
	ClientAPIUser,
	ClientReadState,
	ClientRelationship,
	ReadyEvent,
	ReadySupplementalEvent,
	Snowflake,
} from "./lib/types";
import { createInflateInstance } from "./lib/wrapped";
import * as Comlink from "comlink";

const enum GatewayOPCodes {
	Dispatch = 0,
	Heartbeat = 1,
	Identify = 2,
	PresenceUpdate = 3,
	VoiceStateUpdate = 4,
	Resume = 6,
	Reconnect = 7,
	RequestGuildMembers = 8,
	InvalidSession = 9,
	Hello = 10,
	HeartbeatAck = 11,
	GuildSync = 12,
	LazyGuilds = 14,
}

interface GatewayEvent<T = any> {
	op: GatewayOPCodes;
	d: T;
	s: number;
	t?: string;
}

function getRandomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

interface MessageACKEvent {
	version: number;
	message_id: string;
	channel_id: string;
	mention_count?: number;
	manual?: boolean;
	ack_type?: 0;
}

interface ChannelUnreadUpdateEvent {
	channel_unread_updates: ClientReadState[];
	guild_id: string;
}

type GatewayEventsUnion = Record<
	"t:relationship_update" | "t:relationship_add" | "t:relationship_remove",
	[ClientRelationship]
> &
	Record<"t:channel_create" | "t:channel_update" | "t:channel_delete", [APIChannel]> &
	Record<
		"t:channel_recipient_add" | "t:channel_recipient_remove",
		[{ channel_id: Snowflake; user: ClientAPIUser }]
	>;

/**
 * undocumented
 */
interface ClientPassiveUpdateV1 {
	/**
	 * both voice_states and members have same length,
	 * so it's assumed that we're supposed to merge them
	 *
	 * differences to GatewayVoiceState
	 * - member is not defined
	 * - guild_id is assumed using the passive_update
	 */
	voice_states: Omit<GatewayVoiceState, "member" | "guild_id">[];
	/**
	 * both voice_states and members have same length,
	 * so it's assumed that we're supposed to merge them
	 */
	members: ClientAPIGuildMember[];
	guild_id: string;
	/**
	 * seems like the new way discord handles read state, i guess it's to make startup time faster?
	 */
	channels: Partial<ClientReadState>[];
}

interface GatewayEventsMap extends GatewayEventsUnion {
	"t:ready": [ReadyEvent];
	"t:ready_supplemental": [ReadySupplementalEvent];

	"t:channel_unread_update": [ChannelUnreadUpdateEvent];
	"t:typing_start": [GatewayTypingStartDispatchData];

	// message things
	"t:message_ack": [MessageACKEvent];
	"t:message_create": [GatewayMessageCreateDispatchData];
	"t:message_update": [GatewayMessageUpdateDispatchData];
	"t:message_delete": [GatewayMessageDeleteDispatchData];
	"t:message_delete_bulk": [GatewayMessageDeleteBulkDispatchData];

	"t:guild_create": [GatewayGuildCreateDispatchData];
	"t:guild_update": [GatewayGuildUpdateDispatchData];
	"t:guild_delete": [GatewayGuildDeleteDispatchData];

	"t:guild_member_update": [GatewayGuildMemberUpdateDispatchData];
	"t:presence_update": [GatewayPresenceUpdateDispatchData];

	"t:guild_members_chunk": [GatewayGuildMembersChunkDispatchData];

	"t:message_reaction_add": [GatewayMessageReactionAddDispatchData];
	"t:message_reaction_remove": [GatewayMessageReactionRemoveDispatchData];
	"t:message_reaction_remove_all": [GatewayMessageReactionRemoveAllDispatchData];
	"t:message_reaction_remove_emoji": [GatewayMessageReactionRemoveEmojiDispatchData];

	"t:passive_update_v1": [ClientPassiveUpdateV1];

	"t:user_note_update": [{ id: Snowflake; note: string }];

	close: [];
	[x: string]: any[];
	[x: symbol]: any[];
}

export const SuperProperties = {
	os: "Android",
	browser: "Chrome",
	device: "",
	system_locale: "en-US",
	browser_user_agent:
		"Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
	browser_version: "116.0.0.0",
	os_version: "8.0.0",
	referrer: "",
	referring_domain: "",
	referrer_current: "",
	referring_domain_current: "",
	release_channel: "stable",
	client_build_number: 259501,
	client_event_source: null,
};

export default class Gateway extends EventEmitter<GatewayEventsMap> {
	private token?: string;
	private ws?: WebSocket;
	private sequence_num: number | null = null;
	private authenticated = false;
	readonly streamURL = "wss://gateway.discord.gg/?v=9&encoding=json&compress=zlib-stream";

	constructor(public _debug = false) {
		super();
	}

	customAck: null | any = null;

	logger = new Logger("Gateway", getRandomColor());

	private reconnect = false;
	private reconnectURL = "";

	login(token: string) {
		this.token = token;
	}
	send(data: object) {
		this.logger.info("send:", data)();
		this.ws?.send(JSON.stringify(data));
	}
	#handlePacket(packet: GatewayEvent) {
		this.logger.info("Handling packet with OP ", packet.op)();

		switch (packet.op) {
			case GatewayOPCodes.Dispatch:
				this.#dispatch(packet);
				break;
			case GatewayOPCodes.InvalidSession:
				this.#invalidSess(packet);
				break;
			case GatewayOPCodes.Hello:
				this.#hello(packet);
				break;
			case GatewayOPCodes.HeartbeatAck:
				this.#hearbeatAck();
				break;
			case GatewayOPCodes.Reconnect:
				// TODO: We could probably just reconnect according to the discord docs, but eh
				this.close();
				break;
			default:
				this.logger.err("OP " + packet.op + "not found!")();
				break;
		}
	}
	#dispatch(packet: GatewayEvent) {
		this.sequence_num = packet.s;
		this.logger.info("dispatch:", packet)();
		packet.t && this.emit("t:" + packet.t.toLowerCase(), packet.d);
	}
	#invalidSess(packet: GatewayEvent<false>) {
		this.logger.info("sess inv:", packet)();
		this.close();
	}

	#hello(
		packet: GatewayEvent<{
			heartbeat_interval: number;
		}>
	) {
		const ws = this.ws,
			beatMeat = () => this.send({ op: 1, d: this.sequence_num });

		this.logger.info("Sending initial heartbeat...")();
		beatMeat();

		const interval = setInterval(() => {
			if (ws !== this.ws) return clearInterval(interval);
			this.logger.info("Sending heartbeat...")();
			beatMeat();
		}, packet.d.heartbeat_interval) as any as number;
		this.logger.info("heartbeat interval: ", packet.d.heartbeat_interval)();
	}

	#hearbeatAck() {
		if (this.authenticated) return;
		this.authenticated = true;
		this.send(
			this.customAck
				? this.customAck
				: {
						op: 2,
						d: {
							token: this.token,
							capabilities: 16381,
							properties: SuperProperties,
							presence: {
								status: "unknown",
								since: 0,
								activities: [],
								afk: false,
							},
							compress: false,
							client_state: {
								guild_versions: {},
								highest_last_message_id: "0",
								read_state_version: 0,
								user_guild_settings_version: -1,
								user_settings_version: -1,
								private_channels_version: "0",
								api_code_version: 0,
							},
						},
				  }
		);
	}

	close() {
		this.ws?.close();
		this.ws = undefined;
		if (this.inflateInstance) {
			this.inflateInstance(null);
			this.inflateInstance = null;
		}
	}

	inflateInstance: Awaited<ReturnType<typeof createInflateInstance>> | null = null;

	init() {
		if (!this.token) throw Error("You need to authenticate first!");

		this.logger.info("Connecting to gateway...")();

		this.close();

		import("./lib/wrapped").then(async ({ createInflateInstance }) => {
			this.inflateInstance = await createInflateInstance(
				Comlink.proxy((data) => {
					this.#handlePacket(data);
				})
			);
		});

		const ws = (this.ws = new WebSocket(this.streamURL));
		ws.binaryType = "arraybuffer";

		const buffersToSend: ArrayBuffer[] = [];

		ws.addEventListener("message", async ({ data }: MessageEvent<ArrayBuffer>) => {
			if (!("byteLength" in data)) {
				this.logger.err("Received non-arraybuffer data!", data)();
				return;
			}

			if (!this.inflateInstance) {
				buffersToSend.push(data);
			} else {
				if (buffersToSend.length) {
					for (let i = 0; i < buffersToSend.length; i++) {
						const buff = buffersToSend[i];
						await this.inflateInstance(buff);
						console.log("buffer was received before inflateInstance was made");
					}
					buffersToSend.length = 0;
				}

				await this.inflateInstance(data);
			}
		});
		ws.addEventListener("open", () => this.logger.info("Sending Identity [OP 2]...")());
		ws.addEventListener("close", () => {
			this.ws = undefined;
			this.close();
			this.logger.err("Discord gateway closed!")();
			this.emit("close");
		});
	}
}
