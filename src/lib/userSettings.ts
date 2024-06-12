import * as Comlink from "comlink";
import type { Exposed } from "./worker";

const worker = new Worker(new URL("./worker.ts", import.meta.url));

const wrapped = Comlink.wrap<Exposed>(worker);

const getGuildFoldersFromProto = wrapped.getGuildFoldersFromProto;

export { getGuildFoldersFromProto };
