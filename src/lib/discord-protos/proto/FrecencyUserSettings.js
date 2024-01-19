import { WireType } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GIFType
 */
export var FrecencyUserSettings_GIFType;
(function (FrecencyUserSettings_GIFType) {
    /**
     * @generated from protobuf enum value: NONE = 0;
     */
    FrecencyUserSettings_GIFType[FrecencyUserSettings_GIFType["NONE"] = 0] = "NONE";
    /**
     * @generated from protobuf enum value: IMAGE = 1;
     */
    FrecencyUserSettings_GIFType[FrecencyUserSettings_GIFType["IMAGE"] = 1] = "IMAGE";
    /**
     * @generated from protobuf enum value: VIDEO = 2;
     */
    FrecencyUserSettings_GIFType[FrecencyUserSettings_GIFType["VIDEO"] = 2] = "VIDEO";
})(FrecencyUserSettings_GIFType || (FrecencyUserSettings_GIFType = {}));
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings", [
            { no: 1, name: "versions", kind: "message", T: () => FrecencyUserSettings_Versions },
            { no: 2, name: "favorite_gifs", kind: "message", T: () => FrecencyUserSettings_FavoriteGIFs },
            { no: 3, name: "favorite_stickers", kind: "message", T: () => FrecencyUserSettings_FavoriteStickers },
            { no: 4, name: "sticker_frecency", kind: "message", T: () => FrecencyUserSettings_StickerFrecency },
            { no: 5, name: "favorite_emojis", kind: "message", T: () => FrecencyUserSettings_FavoriteEmojis },
            { no: 6, name: "emoji_frecency", kind: "message", T: () => FrecencyUserSettings_EmojiFrecency },
            { no: 7, name: "application_command_frecency", kind: "message", T: () => FrecencyUserSettings_ApplicationCommandFrecency },
            { no: 8, name: "favorite_soundboard_sounds", kind: "message", T: () => FrecencyUserSettings_FavoriteSoundboardSounds },
            { no: 9, name: "application_frecency", kind: "message", T: () => FrecencyUserSettings_ApplicationFrecency },
            { no: 10, name: "heard_sound_frecency", kind: "message", T: () => FrecencyUserSettings_HeardSoundFrecency },
            { no: 11, name: "played_sound_frecency", kind: "message", T: () => FrecencyUserSettings_PlayedSoundFrecency },
            { no: 12, name: "guild_and_channel_frecency", kind: "message", T: () => FrecencyUserSettings_GuildAndChannelFrecency }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.Versions versions */ 1:
                    message.versions = FrecencyUserSettings_Versions.internalBinaryRead(reader, reader.uint32(), options, message.versions);
                    break;
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIFs favorite_gifs */ 2:
                    message.favoriteGifs = FrecencyUserSettings_FavoriteGIFs.internalBinaryRead(reader, reader.uint32(), options, message.favoriteGifs);
                    break;
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteStickers favorite_stickers */ 3:
                    message.favoriteStickers = FrecencyUserSettings_FavoriteStickers.internalBinaryRead(reader, reader.uint32(), options, message.favoriteStickers);
                    break;
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.StickerFrecency sticker_frecency */ 4:
                    message.stickerFrecency = FrecencyUserSettings_StickerFrecency.internalBinaryRead(reader, reader.uint32(), options, message.stickerFrecency);
                    break;
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteEmojis favorite_emojis */ 5:
                    message.favoriteEmojis = FrecencyUserSettings_FavoriteEmojis.internalBinaryRead(reader, reader.uint32(), options, message.favoriteEmojis);
                    break;
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.EmojiFrecency emoji_frecency */ 6:
                    message.emojiFrecency = FrecencyUserSettings_EmojiFrecency.internalBinaryRead(reader, reader.uint32(), options, message.emojiFrecency);
                    break;
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationCommandFrecency application_command_frecency */ 7:
                    message.applicationCommandFrecency = FrecencyUserSettings_ApplicationCommandFrecency.internalBinaryRead(reader, reader.uint32(), options, message.applicationCommandFrecency);
                    break;
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteSoundboardSounds favorite_soundboard_sounds */ 8:
                    message.favoriteSoundboardSounds = FrecencyUserSettings_FavoriteSoundboardSounds.internalBinaryRead(reader, reader.uint32(), options, message.favoriteSoundboardSounds);
                    break;
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationFrecency application_frecency */ 9:
                    message.applicationFrecency = FrecencyUserSettings_ApplicationFrecency.internalBinaryRead(reader, reader.uint32(), options, message.applicationFrecency);
                    break;
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.HeardSoundFrecency heard_sound_frecency */ 10:
                    message.heardSoundFrecency = FrecencyUserSettings_HeardSoundFrecency.internalBinaryRead(reader, reader.uint32(), options, message.heardSoundFrecency);
                    break;
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.PlayedSoundFrecency played_sound_frecency */ 11:
                    message.playedSoundFrecency = FrecencyUserSettings_PlayedSoundFrecency.internalBinaryRead(reader, reader.uint32(), options, message.playedSoundFrecency);
                    break;
                case /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GuildAndChannelFrecency guild_and_channel_frecency */ 12:
                    message.guildAndChannelFrecency = FrecencyUserSettings_GuildAndChannelFrecency.internalBinaryRead(reader, reader.uint32(), options, message.guildAndChannelFrecency);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.Versions versions = 1; */
        if (message.versions)
            FrecencyUserSettings_Versions.internalBinaryWrite(message.versions, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIFs favorite_gifs = 2; */
        if (message.favoriteGifs)
            FrecencyUserSettings_FavoriteGIFs.internalBinaryWrite(message.favoriteGifs, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteStickers favorite_stickers = 3; */
        if (message.favoriteStickers)
            FrecencyUserSettings_FavoriteStickers.internalBinaryWrite(message.favoriteStickers, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.StickerFrecency sticker_frecency = 4; */
        if (message.stickerFrecency)
            FrecencyUserSettings_StickerFrecency.internalBinaryWrite(message.stickerFrecency, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteEmojis favorite_emojis = 5; */
        if (message.favoriteEmojis)
            FrecencyUserSettings_FavoriteEmojis.internalBinaryWrite(message.favoriteEmojis, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.EmojiFrecency emoji_frecency = 6; */
        if (message.emojiFrecency)
            FrecencyUserSettings_EmojiFrecency.internalBinaryWrite(message.emojiFrecency, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationCommandFrecency application_command_frecency = 7; */
        if (message.applicationCommandFrecency)
            FrecencyUserSettings_ApplicationCommandFrecency.internalBinaryWrite(message.applicationCommandFrecency, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteSoundboardSounds favorite_soundboard_sounds = 8; */
        if (message.favoriteSoundboardSounds)
            FrecencyUserSettings_FavoriteSoundboardSounds.internalBinaryWrite(message.favoriteSoundboardSounds, writer.tag(8, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationFrecency application_frecency = 9; */
        if (message.applicationFrecency)
            FrecencyUserSettings_ApplicationFrecency.internalBinaryWrite(message.applicationFrecency, writer.tag(9, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.HeardSoundFrecency heard_sound_frecency = 10; */
        if (message.heardSoundFrecency)
            FrecencyUserSettings_HeardSoundFrecency.internalBinaryWrite(message.heardSoundFrecency, writer.tag(10, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.PlayedSoundFrecency played_sound_frecency = 11; */
        if (message.playedSoundFrecency)
            FrecencyUserSettings_PlayedSoundFrecency.internalBinaryWrite(message.playedSoundFrecency, writer.tag(11, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GuildAndChannelFrecency guild_and_channel_frecency = 12; */
        if (message.guildAndChannelFrecency)
            FrecencyUserSettings_GuildAndChannelFrecency.internalBinaryWrite(message.guildAndChannelFrecency, writer.tag(12, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings
 */
export const FrecencyUserSettings = new FrecencyUserSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_Versions$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.Versions", [
            { no: 1, name: "client_version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "server_version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "data_version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.clientVersion = 0;
        message.serverVersion = 0;
        message.dataVersion = 0;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 client_version */ 1:
                    message.clientVersion = reader.uint32();
                    break;
                case /* uint32 server_version */ 2:
                    message.serverVersion = reader.uint32();
                    break;
                case /* uint32 data_version */ 3:
                    message.dataVersion = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* uint32 client_version = 1; */
        if (message.clientVersion !== 0)
            writer.tag(1, WireType.Varint).uint32(message.clientVersion);
        /* uint32 server_version = 2; */
        if (message.serverVersion !== 0)
            writer.tag(2, WireType.Varint).uint32(message.serverVersion);
        /* uint32 data_version = 3; */
        if (message.dataVersion !== 0)
            writer.tag(3, WireType.Varint).uint32(message.dataVersion);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.Versions
 */
export const FrecencyUserSettings_Versions = new FrecencyUserSettings_Versions$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_FavoriteGIF$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIF", [
            { no: 1, name: "format", kind: "enum", T: () => ["discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GIFType", FrecencyUserSettings_GIFType] },
            { no: 2, name: "src", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "width", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "height", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 5, name: "order", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.format = 0;
        message.src = "";
        message.width = 0;
        message.height = 0;
        message.order = 0;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GIFType format */ 1:
                    message.format = reader.int32();
                    break;
                case /* string src */ 2:
                    message.src = reader.string();
                    break;
                case /* uint32 width */ 3:
                    message.width = reader.uint32();
                    break;
                case /* uint32 height */ 4:
                    message.height = reader.uint32();
                    break;
                case /* uint32 order */ 5:
                    message.order = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GIFType format = 1; */
        if (message.format !== 0)
            writer.tag(1, WireType.Varint).int32(message.format);
        /* string src = 2; */
        if (message.src !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.src);
        /* uint32 width = 3; */
        if (message.width !== 0)
            writer.tag(3, WireType.Varint).uint32(message.width);
        /* uint32 height = 4; */
        if (message.height !== 0)
            writer.tag(4, WireType.Varint).uint32(message.height);
        /* uint32 order = 5; */
        if (message.order !== 0)
            writer.tag(5, WireType.Varint).uint32(message.order);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIF
 */
export const FrecencyUserSettings_FavoriteGIF = new FrecencyUserSettings_FavoriteGIF$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_FavoriteGIFs$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIFs", [
            { no: 1, name: "gifs", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "message", T: () => FrecencyUserSettings_FavoriteGIF } },
            { no: 2, name: "hide_tooltip", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.gifs = {};
        message.hideTooltip = false;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIF> gifs */ 1:
                    this.binaryReadMap1(message.gifs, reader, options);
                    break;
                case /* bool hide_tooltip */ 2:
                    message.hideTooltip = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = FrecencyUserSettings_FavoriteGIF.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIFs.gifs");
            }
        }
        map[key ?? ""] = val ?? FrecencyUserSettings_FavoriteGIF.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIF> gifs = 1; */
        for (let k of globalThis.Object.keys(message.gifs)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            FrecencyUserSettings_FavoriteGIF.internalBinaryWrite(message.gifs[k], writer, options);
            writer.join().join();
        }
        /* bool hide_tooltip = 2; */
        if (message.hideTooltip !== false)
            writer.tag(2, WireType.Varint).bool(message.hideTooltip);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIFs
 */
export const FrecencyUserSettings_FavoriteGIFs = new FrecencyUserSettings_FavoriteGIFs$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_FavoriteStickers$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteStickers", [
            { no: 1, name: "sticker_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.stickerIds = [];
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated fixed64 sticker_ids */ 1:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.stickerIds.push(reader.fixed64().toString());
                    else
                        message.stickerIds.push(reader.fixed64().toString());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated fixed64 sticker_ids = 1; */
        if (message.stickerIds.length) {
            writer.tag(1, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.stickerIds.length; i++)
                writer.fixed64(message.stickerIds[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteStickers
 */
export const FrecencyUserSettings_FavoriteStickers = new FrecencyUserSettings_FavoriteStickers$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_FrecencyItem$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem", [
            { no: 1, name: "total_uses", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "recent_uses", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 4 /*ScalarType.UINT64*/ },
            { no: 3, name: "frecency", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "score", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.totalUses = 0;
        message.recentUses = [];
        message.frecency = 0;
        message.score = 0;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 total_uses */ 1:
                    message.totalUses = reader.uint32();
                    break;
                case /* repeated uint64 recent_uses */ 2:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.recentUses.push(reader.uint64().toString());
                    else
                        message.recentUses.push(reader.uint64().toString());
                    break;
                case /* int32 frecency */ 3:
                    message.frecency = reader.int32();
                    break;
                case /* int32 score */ 4:
                    message.score = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* uint32 total_uses = 1; */
        if (message.totalUses !== 0)
            writer.tag(1, WireType.Varint).uint32(message.totalUses);
        /* repeated uint64 recent_uses = 2; */
        if (message.recentUses.length) {
            writer.tag(2, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.recentUses.length; i++)
                writer.uint64(message.recentUses[i]);
            writer.join();
        }
        /* int32 frecency = 3; */
        if (message.frecency !== 0)
            writer.tag(3, WireType.Varint).int32(message.frecency);
        /* int32 score = 4; */
        if (message.score !== 0)
            writer.tag(4, WireType.Varint).int32(message.score);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem
 */
export const FrecencyUserSettings_FrecencyItem = new FrecencyUserSettings_FrecencyItem$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_StickerFrecency$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.StickerFrecency", [
            { no: 1, name: "stickers", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => FrecencyUserSettings_FrecencyItem } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.stickers = {};
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> stickers */ 1:
                    this.binaryReadMap1(message.stickers, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.fixed64().toString();
                    break;
                case 2:
                    val = FrecencyUserSettings_FrecencyItem.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.StickerFrecency.stickers");
            }
        }
        map[key ?? "0"] = val ?? FrecencyUserSettings_FrecencyItem.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> stickers = 1; */
        for (let k of globalThis.Object.keys(message.stickers)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.Bit64).fixed64(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            FrecencyUserSettings_FrecencyItem.internalBinaryWrite(message.stickers[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.StickerFrecency
 */
export const FrecencyUserSettings_StickerFrecency = new FrecencyUserSettings_StickerFrecency$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_FavoriteEmojis$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteEmojis", [
            { no: 1, name: "emojis", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.emojis = [];
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string emojis */ 1:
                    message.emojis.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated string emojis = 1; */
        for (let i = 0; i < message.emojis.length; i++)
            writer.tag(1, WireType.LengthDelimited).string(message.emojis[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteEmojis
 */
export const FrecencyUserSettings_FavoriteEmojis = new FrecencyUserSettings_FavoriteEmojis$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_EmojiFrecency$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.EmojiFrecency", [
            { no: 1, name: "emojis", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "message", T: () => FrecencyUserSettings_FrecencyItem } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.emojis = {};
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> emojis */ 1:
                    this.binaryReadMap1(message.emojis, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = FrecencyUserSettings_FrecencyItem.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.EmojiFrecency.emojis");
            }
        }
        map[key ?? ""] = val ?? FrecencyUserSettings_FrecencyItem.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> emojis = 1; */
        for (let k of globalThis.Object.keys(message.emojis)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            FrecencyUserSettings_FrecencyItem.internalBinaryWrite(message.emojis[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.EmojiFrecency
 */
export const FrecencyUserSettings_EmojiFrecency = new FrecencyUserSettings_EmojiFrecency$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_ApplicationCommandFrecency$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationCommandFrecency", [
            { no: 1, name: "application_commands", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "message", T: () => FrecencyUserSettings_FrecencyItem } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.applicationCommands = {};
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> application_commands */ 1:
                    this.binaryReadMap1(message.applicationCommands, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = FrecencyUserSettings_FrecencyItem.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationCommandFrecency.application_commands");
            }
        }
        map[key ?? ""] = val ?? FrecencyUserSettings_FrecencyItem.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> application_commands = 1; */
        for (let k of globalThis.Object.keys(message.applicationCommands)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            FrecencyUserSettings_FrecencyItem.internalBinaryWrite(message.applicationCommands[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationCommandFrecency
 */
export const FrecencyUserSettings_ApplicationCommandFrecency = new FrecencyUserSettings_ApplicationCommandFrecency$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_FavoriteSoundboardSounds$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteSoundboardSounds", [
            { no: 1, name: "sound_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.soundIds = [];
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated fixed64 sound_ids */ 1:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.soundIds.push(reader.fixed64().toString());
                    else
                        message.soundIds.push(reader.fixed64().toString());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated fixed64 sound_ids = 1; */
        if (message.soundIds.length) {
            writer.tag(1, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.soundIds.length; i++)
                writer.fixed64(message.soundIds[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteSoundboardSounds
 */
export const FrecencyUserSettings_FavoriteSoundboardSounds = new FrecencyUserSettings_FavoriteSoundboardSounds$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_ApplicationFrecency$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationFrecency", [
            { no: 1, name: "applications", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "message", T: () => FrecencyUserSettings_FrecencyItem } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.applications = {};
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> applications */ 1:
                    this.binaryReadMap1(message.applications, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = FrecencyUserSettings_FrecencyItem.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationFrecency.applications");
            }
        }
        map[key ?? ""] = val ?? FrecencyUserSettings_FrecencyItem.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> applications = 1; */
        for (let k of globalThis.Object.keys(message.applications)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            FrecencyUserSettings_FrecencyItem.internalBinaryWrite(message.applications[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationFrecency
 */
export const FrecencyUserSettings_ApplicationFrecency = new FrecencyUserSettings_ApplicationFrecency$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_HeardSoundFrecency$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.HeardSoundFrecency", [
            { no: 1, name: "heard_sounds", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "message", T: () => FrecencyUserSettings_FrecencyItem } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.heardSounds = {};
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> heard_sounds */ 1:
                    this.binaryReadMap1(message.heardSounds, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = FrecencyUserSettings_FrecencyItem.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.HeardSoundFrecency.heard_sounds");
            }
        }
        map[key ?? ""] = val ?? FrecencyUserSettings_FrecencyItem.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> heard_sounds = 1; */
        for (let k of globalThis.Object.keys(message.heardSounds)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            FrecencyUserSettings_FrecencyItem.internalBinaryWrite(message.heardSounds[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.HeardSoundFrecency
 */
export const FrecencyUserSettings_HeardSoundFrecency = new FrecencyUserSettings_HeardSoundFrecency$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_PlayedSoundFrecency$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.PlayedSoundFrecency", [
            { no: 1, name: "played_sounds", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "message", T: () => FrecencyUserSettings_FrecencyItem } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.playedSounds = {};
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> played_sounds */ 1:
                    this.binaryReadMap1(message.playedSounds, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = FrecencyUserSettings_FrecencyItem.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.PlayedSoundFrecency.played_sounds");
            }
        }
        map[key ?? ""] = val ?? FrecencyUserSettings_FrecencyItem.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> played_sounds = 1; */
        for (let k of globalThis.Object.keys(message.playedSounds)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            FrecencyUserSettings_FrecencyItem.internalBinaryWrite(message.playedSounds[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.PlayedSoundFrecency
 */
export const FrecencyUserSettings_PlayedSoundFrecency = new FrecencyUserSettings_PlayedSoundFrecency$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FrecencyUserSettings_GuildAndChannelFrecency$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GuildAndChannelFrecency", [
            { no: 1, name: "guild_and_channels", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => FrecencyUserSettings_FrecencyItem } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.guildAndChannels = {};
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> guild_and_channels */ 1:
                    this.binaryReadMap1(message.guildAndChannels, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.fixed64().toString();
                    break;
                case 2:
                    val = FrecencyUserSettings_FrecencyItem.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GuildAndChannelFrecency.guild_and_channels");
            }
        }
        map[key ?? "0"] = val ?? FrecencyUserSettings_FrecencyItem.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> guild_and_channels = 1; */
        for (let k of globalThis.Object.keys(message.guildAndChannels)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.Bit64).fixed64(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            FrecencyUserSettings_FrecencyItem.internalBinaryWrite(message.guildAndChannels[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GuildAndChannelFrecency
 */
export const FrecencyUserSettings_GuildAndChannelFrecency = new FrecencyUserSettings_GuildAndChannelFrecency$Type();
