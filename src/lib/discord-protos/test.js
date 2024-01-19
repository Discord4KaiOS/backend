import { PreloadedUserSettings } from ".";
const encoded = PreloadedUserSettings.toBase64({
    status: {
        status: {
            value: "online",
        },
        customStatus: {
            text: "Hello World",
            emojiId: 1197786668183326750n,
            emojiName: "",
            expiresAtMs: 0n,
        },
    },
});
const decoded = PreloadedUserSettings.fromBase64(encoded);
console.log(encoded, decoded);
