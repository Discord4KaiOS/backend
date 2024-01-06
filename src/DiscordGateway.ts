import type {
	GatewayGuildCreateDispatchData,
	GatewayGuildDeleteDispatchData,
	GatewayGuildUpdateDispatchData,
	GatewayMessageCreateDispatchData,
	GatewayMessageDeleteBulkDispatchData,
	GatewayMessageDeleteDispatchData,
	GatewayMessageUpdateDispatchData,
	GatewayTypingStartDispatchData,
} from "discord-api-types/v10";
import Logger from "./Logger";
import EventEmitter from "./lib/EventEmitter";

import Pako from "pako";
import type { Inflate } from "pako";
import {
	APIChannel,
	ClientAPIUser,
	ClientReadState,
	ClientRelationship,
	ReadyEvent,
	Snowflake,
} from "./lib/types";

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

interface GatewayEventsMap extends GatewayEventsUnion {
	"t:ready": [ReadyEvent];

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

	close: [];
	[x: string]: any[];
	[x: symbol]: any[];
}

export default class Gateway extends EventEmitter<GatewayEventsMap> {
	private token?: string;
	private ws?: WebSocket;
	private sequence_num: number | null = null;
	private authenticated = false;
	readonly streamURL = "wss://gateway.discord.gg/?v=9&encoding=json&compress=zlib-stream";
	private _inflate: Inflate | null = null;

	constructor(public _debug = false) {
		super();
	}

	logger = new Logger("Gateway", getRandomColor());

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
		this.send({
			op: 2,
			d: {
				status: "online",
				token: this.token,
				properties: {
					browser: "Discord Android",
					device: "sveltecord, discord4kaios",
					os: "Android",
				},
			},
		});
	}

	close() {
		this.ws?.close();
		this.ws = undefined;
		if (this._inflate) {
			// @ts-ignore
			this._inflate.chunks = [];
			this._inflate.onEnd = () => {};
			this._inflate = null;
		}
	}

	init() {
		if (!this.token) throw Error("You need to authenticate first!");

		this.logger.info("Connecting to gateway...")();

		this.close();

		const inflate = new Pako.Inflate({ chunkSize: 65536, to: "string" });

		inflate.onEnd = (e: number) => {
			// @ts-ignore
			if (e !== Pako.Z_OK) throw new Error(`zlib error, ${e}, ${inflate.strm.msg}`);

			// @ts-ignore
			const chunks = inflate.chunks as string[];

			const result = chunks.join("");
			result && this.#handlePacket(JSON.parse(result));
			chunks.length = 0;
		};

		this._inflate = inflate;

		const ws = (this.ws = new WebSocket(this.streamURL));
		ws.binaryType = "arraybuffer";

		ws.addEventListener("message", ({ data }: MessageEvent<ArrayBuffer>) => {
			if (!this._inflate) return;
			if (!(data instanceof ArrayBuffer)) {
				this.logger.err("Received non-arraybuffer data!", data)();
			}

			const view = new DataView(data),
				shouldFlush = view.byteLength >= 4 && 65535 === view.getUint32(view.byteLength - 4, false);

			// @ts-ignore
			this._inflate.push(data, shouldFlush && Pako.Z_SYNC_FLUSH);
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
