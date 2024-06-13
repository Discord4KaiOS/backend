import * as Comlink from "comlink";
import type { Exposed } from "./worker";
// @ts-ignore
import DiscordWorker from "./worker.ts?worker";

const worker = new DiscordWorker();

const wrapped = Comlink.wrap<Exposed>(worker);

const getGuildFoldersFromProto = wrapped.getGuildFoldersFromProto;
const createInflateInstance = wrapped.createInflateInstance;

export { getGuildFoldersFromProto, createInflateInstance };
