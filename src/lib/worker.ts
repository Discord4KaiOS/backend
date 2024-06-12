import * as Comlink from "comlink";
import { PreloadedUserSettings } from "./discord-protos";

function getGuildFoldersFromProto(proto: string) {
	const userSettings = PreloadedUserSettings.fromBase64(proto);
	return userSettings.guildFolders?.folders || [];
}

const exposed = {
	getGuildFoldersFromProto,
};

Comlink.expose(exposed);

export type Exposed = typeof exposed;
