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

import { APIChannel, ClientAPIGuildMember, ClientAPIUser, ClientReadState, ClientRelationship, ReadyEvent, ReadySupplementalEvent, Snowflake } from "./lib/types";
import { createInflateInstance } from "./lib/wrapped";
import * as Comlink from "comlink";

import { v4 as uuidv4 } from "uuid";

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

type GatewayEventsUnion = Record<"t:relationship_update" | "t:relationship_add" | "t:relationship_remove", [ClientRelationship]> &
	Record<"t:channel_create" | "t:channel_update" | "t:channel_delete", [APIChannel]> &
	Record<"t:channel_recipient_add" | "t:channel_recipient_remove", [{ channel_id: Snowflake; user: ClientAPIUser }]>;

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

interface KoriProperties {
	browser_user_agent: string;
	browser_version: string;
	client_build_number: number;
}

const DEFAULT_USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0";
const DEFAULT_BROWSER_VERSION = "140.0";
const DEFAULT_CLIENT_BUILD_NUMBER = 413685;

async function getLatestFirefoxUserAgent() {
	// take useragent from here
	const resp = await fetch("https://jnrbsn.github.io/user-agents/user-agents.json");
	const json = await resp.json();
	const ua: string = json[11];

	return {
		browser_user_agent: ua,
		browser_version: ua.match(/Firefox\/([\d.]+)/)![1],
	};
}

async function getLatestDiscordBuildNumber(): Promise<KoriProperties> {
	const requestUserAgent = await getLatestFirefoxUserAgent().catch(() => null);
	const userAgent = requestUserAgent ? requestUserAgent.browser_user_agent : DEFAULT_USER_AGENT;
	const browserVersion = requestUserAgent ? requestUserAgent.browser_version : DEFAULT_BROWSER_VERSION;

	return new Promise((res) => {
		const xhr = new XMLHttpRequest();

		xhr.open("GET", "https://discord.com/app");

		// we don't set user-agent when dev mode
		// for some reason my cors bypass extension aint working lol
		if (!import.meta.env.DEV) xhr.setRequestHeader("User-Agent", userAgent);

		// this causes an error on KaiOS 3.0 :(
		try {
			xhr.withCredentials = true;
		} catch {}

		xhr.onload = () => {
			let client_build_number = DEFAULT_CLIENT_BUILD_NUMBER;

			// console.error("DISCORD HTML CONTENT", xhr.responseText);

			const match = xhr.responseText.match(/"BUILD_NUMBER":"(\d+)"/);
			if (match) {
				const buildNumber = match[1];
				client_build_number = Number(buildNumber);
			}

			res({ browser_user_agent: userAgent, browser_version: browserVersion, client_build_number });
		};

		xhr.send();
	});
}

async function getLatestProperties() {
	const properties = await getLatestDiscordBuildNumber();
	localStorage.setItem("kori_properties", JSON.stringify(properties));
	// console.info("LATEST DISCORD PROPERTIES:", properties);
	return properties;
}

function getProperties(): KoriProperties {
	const defaultProperties = {
		browser_user_agent: DEFAULT_USER_AGENT,
		browser_version: DEFAULT_BROWSER_VERSION,
		client_build_number: DEFAULT_CLIENT_BUILD_NUMBER,
	};

	getLatestProperties();

	if (typeof localStorage != "undefined") {
		const fromStorage = localStorage.getItem("kori_properties");
		if (!fromStorage) return defaultProperties;
		return JSON.parse(fromStorage);
	}
	return defaultProperties;
}

const properties = getProperties();

export const SuperProperties = {
	os: "Linux",
	browser: "Firefox",
	device: "",
	system_locale: navigator.language,
	has_client_mods: false,
	os_version: "",
	referrer: "",
	referring_domain: "",
	referrer_current: "",
	referring_domain_current: "",
	release_channel: "stable",
	client_event_source: null,
	client_launch_id: uuidv4(),
	client_heartbeat_session_id: Boolean(Math.floor(Math.random() * 2)) ? undefined : uuidv4(),
	client_app_state: "unfocused",
	...properties,
} as const;

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
				alert("You got disconnected!");
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
							capabilities: 161789,
							properties: {
								...SuperProperties,
								is_fast_connect: false,
								latest_headless_tasks: [],
								latest_headless_task_run_seconds_before: null,
								gateway_connect_reasons: "AppSkeleton",
							},
							presence: { status: "unknown", since: 0, activities: [], afk: false },
							compress: false,
							client_state: { guild_versions: {} },
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
			const inflateInstance = (this.inflateInstance = await createInflateInstance(
				Comlink.proxy((data) => {
					this.#handlePacket(data);
				})
			));

			const ws = (this.ws = new WebSocket(this.streamURL));
			ws.binaryType = "arraybuffer";
			ws.addEventListener("message", async ({ data }: MessageEvent<ArrayBuffer>) => {
				if (!("byteLength" in data)) {
					this.logger.err("Received non-arraybuffer data!", data)();
					return;
				}
				if (!this.inflateInstance) return;
				inflateInstance(data);
			});
			ws.addEventListener("open", () => this.logger.info("Sending Identity [OP 2]...")());
			ws.addEventListener("close", () => {
				this.ws = undefined;
				this.close();
				this.logger.err("Discord gateway closed!")();
				this.emit("close");
			});
		});
	}
}
