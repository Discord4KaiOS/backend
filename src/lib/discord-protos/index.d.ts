export * from "./proto/PreloadedUserSettings";
// export * from "./proto/FrecencyUserSettings";
declare module "@protobuf-ts/runtime" {
	interface MessageType<T> {
		fromBase64(base64: string): T;
	}
}
