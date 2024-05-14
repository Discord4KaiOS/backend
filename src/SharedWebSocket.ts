import Pako from "pako";
import EventEmitter from "./lib/EventEmitter";
import Logger from "./Logger";

export const enum SharedWebSocketType {
	STRING = "string",
	ARRAYBUFFER = "arraybuffer",
	ZLIB = "zlib",
}

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

export interface DiscordSharedWebSocketProps {
	url: string;
	type: SharedWebSocketType;
	logger?: string;
	color?: string;
	gateway: boolean;
}

export class DiscordSharedWebSocket extends EventEmitter<{
	message: [string | object];
	open: [];
	close: [];
}> {
	private ws: WebSocket;
	type: SharedWebSocketType;
	private inflate: Pako.Inflate | null = null;
	logger: Logger;
	private gateway: boolean;
	closed = false;

	constructor(props: DiscordSharedWebSocketProps) {
		super();
		this.ws = new WebSocket(props.url);
		if (props.type != "string") {
			this.ws.binaryType = "arraybuffer";
		}
		this.type = props.type;

		this.gateway = props.gateway;

		this.logger = new Logger(props.logger ?? "SharedWebSocket", props.color ?? "blue");

		if (props.type == "zlib") {
			const inflate = (this.inflate = new Pako.Inflate({ chunkSize: 65536, to: "string" }));

			inflate.onEnd = (e: number) => {
				// @ts-ignore
				if (e !== Pako.Z_OK) throw new Error(`zlib error, ${e}, ${inflate.strm.msg}`);

				// @ts-ignore
				const chunks = inflate.chunks as string[];

				const result = chunks.join("");
				result && this.handlePacket(JSON.parse(result));
				chunks.length = 0;
			};
		}

		this.ws.onmessage = ({ data }: MessageEvent<ArrayBuffer | string | Blob>) => {
			if (this.type == "zlib") {
				if (!this.inflate) return;

				if (!(data instanceof ArrayBuffer)) {
					this.logger.err("Received non-arraybuffer data!", data)();
					return;
				}

				const view = new DataView(data),
					shouldFlush =
						view.byteLength >= 4 && 65535 === view.getUint32(view.byteLength - 4, false);

				// @ts-ignore
				this.inflate.push(data, shouldFlush && Pako.Z_SYNC_FLUSH);

				return;
			}

			if (this.type == "string") {
				if (typeof data == "string") {
					this.handlePacket(data);
				} else {
					this.logger.err("Received non-string data!", data)();
				}

				return;
			}

			if (this.type == "arraybuffer") {
				if (data instanceof ArrayBuffer) {
					this.handlePacket(data);
				} else {
					this.logger.err("Received non-arraybuffer data!", data)();
				}
			}
		};

		this.ws.onopen = () => {
			this.emit("open");
		};

		this.ws.onclose = () => {
			this.emit("close");

			if (this.inflate) {
				// @ts-ignore
				this.inflate.chunks = [];
				this.inflate.onEnd = () => {};
				this.inflate = null;
			}
		};
	}

	private sequence_num = 0;

	private gatewayHello(packet: any) {
		const beatMeat = () => this.send({ op: 1, d: this.sequence_num });

		this.logger.info("Sending initial heartbeat...")();
		beatMeat();

		const interval = setInterval(() => {
			if (this.closed) return clearInterval(interval);
			this.logger.info("Sending heartbeat...")();
			beatMeat();
		}, packet.d.heartbeat_interval) as any as number;
		this.logger.info("heartbeat interval: ", packet.d.heartbeat_interval)();
	}

	send(data: any) {
		this.ws.send(JSON.stringify(data));
	}

	private handlePacket(data: any) {
		this.emit("message", data);

		if (!this.gateway) return;

		if ("s" in data) {
			this.sequence_num = data.s;
		}

		if ("op" in data) {
			if (data.op == GatewayOPCodes.Hello) {
				this.gatewayHello(data);
			}
		}
	}
}
