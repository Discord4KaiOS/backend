import { MessageType } from "@protobuf-ts/runtime";
function fromBase64(base64) {
    return this.fromBinary(Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)));
}
export * from "./proto/PreloadedUserSettings";

declare module "@protobuf-ts/runtime" {
    interface MessageType<T> {
        fromBase64(base64: string): T;
    }
}

MessageType.prototype.fromBase64 = fromBase64;
