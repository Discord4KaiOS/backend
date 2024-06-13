import * as Comlink from "comlink";
import { PreloadedUserSettings } from "./discord-protos";
import * as Pako from "pako";

function getGuildFoldersFromProto(proto: string) {
	const userSettings = PreloadedUserSettings.fromBase64(proto);
	return userSettings.guildFolders?.folders || [];
}

function createInflateInstance(onPush: (data: any) => void) {
	let inflate: null | Pako.Inflate = new Pako.Inflate({ chunkSize: 65536, to: "string" });
	inflate.onEnd = (e: number) => {
		// @ts-ignore
		if (e !== Pako.Z_OK) throw new Error(`zlib error, ${e}, ${inflate.strm.msg}`);

		// @ts-ignore
		const chunks = inflate.chunks as string[];

		const result = chunks.join("");
		result && onPush(JSON.parse(result));
		chunks.length = 0;
	};

	return Comlink.proxy((data: ArrayBuffer | null) => {
		if (data === null || !inflate) {
			if (inflate) {
				// @ts-ignore
				inflate.chunks = [];
				inflate.onEnd = () => {};
				inflate = null;
			}
			return;
		}

		const view = new DataView(data),
			shouldFlush = view.byteLength >= 4 && 65535 === view.getUint32(view.byteLength - 4, false);

		// @ts-ignore
		inflate.push(data, shouldFlush && Pako.Z_SYNC_FLUSH);
	});
}

const exposed = {
	getGuildFoldersFromProto,
	createInflateInstance,
};

Comlink.expose(exposed);

export type Exposed = typeof exposed;
