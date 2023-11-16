import Logger from "./Logger";
import EventEmitter from "./lib/EventEmitter";

import { pako } from "./lib/pako";

type Dispatch = 0;
type Heartbeat = 1;
type Identify = 2;
type PresenceUpdate = 3;
type VoiceStateUpdate = 4;
type Resume = 6;
type Reconnect = 7;
type RequestGuildMembers = 8;
type InvalidSession = 9;
type Hello = 10;
type HeartbeatAck = 11;
type GuildSync = 12;
type LazyGuilds = 14;

type GatewayOPCodes =
	| Dispatch
	| Heartbeat
	| Identify
	| PresenceUpdate
	| VoiceStateUpdate
	| Resume
	| Reconnect
	| RequestGuildMembers
	| InvalidSession
	| Hello
	| HeartbeatAck
	| GuildSync
	| LazyGuilds;

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

export default class Gateway extends EventEmitter {
	private token?: string;
	private ws?: WebSocket;
	private sequence_num: number | null = null;
	private authenticated = false;
	readonly streamURL = "wss://gateway.discord.gg/?v=9&encoding=json&compress=zlib-stream";
	// @ts-ignore
	private pako = pako();
	private _inflate: any;

	constructor(public _debug = false) {
		super();
	}

	logger = new Logger("Gateway", getRandomColor());

	login(token: string) {
		this.token = token;
	}
	send(data: object) {
		this.logger.dbg("send:", data)();
		this.ws?.send(JSON.stringify(data));
	}
	#handlePacket(packet: GatewayEvent) {
		this.logger.dbg("Handling packet with OP ", packet.op)();

		switch (packet.op) {
			case 0:
				this.#packetDispatch(packet);
				break;
			case 9:
				this.#packetInvalidSess(packet);
				break;
			case 10:
				this.#packetHello(packet);
				break;
			case 11:
				this.#packetAck();
				break;
			default:
				this.logger.dbg("OP " + packet.op + "not found!")();
				break;
		}
	}
	#packetDispatch(packet: GatewayEvent) {
		this.sequence_num = packet.s;
		this.logger.dbg("dispatch:", packet)();
		packet.t && this.emit("t:" + packet.t.toLowerCase(), packet.d);
	}
	#packetInvalidSess(packet: GatewayEvent<false>) {
		this.logger.dbg("sess inv:", packet)();
		this.close();
	}

	#packetHello(
		packet: GatewayEvent<{
			heartbeat_interval: number;
		}>
	) {
		const ws = this.ws,
			beatMeat = () => this.send({ op: 1, d: this.sequence_num });

		this.logger.dbg("Sending initial heartbeat...")();
		beatMeat();

		const interval = setInterval(() => {
			if (ws !== this.ws) return clearInterval(interval);
			this.logger.dbg("Sending heartbeat...")();
			beatMeat();
		}, packet.d.heartbeat_interval) as number;
		this.logger.dbg("heartbeat interval: ", packet.d.heartbeat_interval)();
	}

	#packetAck() {
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
			this._inflate.chunks = [];
			this._inflate.onEnd = () => {};
			this._inflate = null;
		}
	}

	init() {
		if (!this.token) throw Error("You need to authenticate first!");

		this.logger.dbg("Connecting to gateway...")();

		this.close();

		const pako = this.pako;

		this._inflate = new pako.Inflate({ chunkSize: 65536, to: "string" });
		const ws = (this.ws = new WebSocket(this.streamURL));
		ws.binaryType = "arraybuffer";

		this._inflate.onEnd = (e: number) => {
			if (e !== pako.Z_OK) throw new Error(`zlib error, ${e}, ${this._inflate.strm.msg}`);

			const chunks = this._inflate?.chunks as string[];

			const result = chunks.join("");
			result && this.#handlePacket(JSON.parse(result));
			chunks.length = 0;
		};

		ws.addEventListener("message", ({ data }: MessageEvent<ArrayBuffer>) => {
			if (!this._inflate) return;
			const r = new DataView(data as ArrayBuffer),
				o = r.byteLength >= 4 && 65535 === r.getUint32(r.byteLength - 4, false);
			this._inflate.push(data, !!o && pako.Z_SYNC_FLUSH);
		});

		ws.addEventListener("open", () => this.logger.dbg("Sending Identity [OP 2]...")());
		ws.addEventListener("close", () => {
			this.ws = undefined;
			this.close();
			console.error("Discord gateway closed!");
			this.emit("close");
		});
	}
}
