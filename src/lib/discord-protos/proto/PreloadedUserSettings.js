import { WireType } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Int64Value } from "./google/protobuf/wrappers";
import { Int32Value } from "./google/protobuf/wrappers";
import { UInt32Value } from "./google/protobuf/wrappers";
import { BoolValue } from "./google/protobuf/wrappers";
import { Timestamp } from "./google/protobuf/timestamp";
import { StringValue } from "./google/protobuf/wrappers";
import { UInt64Value } from "./google/protobuf/wrappers";
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.InboxTab
 */
export var PreloadedUserSettings_InboxTab;
(function (PreloadedUserSettings_InboxTab) {
    /**
     * @generated from protobuf enum value: UNSPECIFIED = 0;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: MENTIONS = 1;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["MENTIONS"] = 1] = "MENTIONS";
    /**
     * @generated from protobuf enum value: UNREADS = 2;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["UNREADS"] = 2] = "UNREADS";
    /**
     * @generated from protobuf enum value: TODOS = 3;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["TODOS"] = 3] = "TODOS";
    /**
     * @generated from protobuf enum value: FOR_YOU = 4;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["FOR_YOU"] = 4] = "FOR_YOU";
    /**
     * @generated from protobuf enum value: GAME_INVITES = 5;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["GAME_INVITES"] = 5] = "GAME_INVITES";
})(PreloadedUserSettings_InboxTab || (PreloadedUserSettings_InboxTab = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.DmSpamFilterV2
 */
export var PreloadedUserSettings_DmSpamFilterV2;
(function (PreloadedUserSettings_DmSpamFilterV2) {
    /**
     * @generated from protobuf enum value: DEFAULT_UNSET = 0;
     */
    PreloadedUserSettings_DmSpamFilterV2[PreloadedUserSettings_DmSpamFilterV2["DEFAULT_UNSET"] = 0] = "DEFAULT_UNSET";
    /**
     * @generated from protobuf enum value: DISABLED = 1;
     */
    PreloadedUserSettings_DmSpamFilterV2[PreloadedUserSettings_DmSpamFilterV2["DISABLED"] = 1] = "DISABLED";
    /**
     * @generated from protobuf enum value: NON_FRIENDS = 2;
     */
    PreloadedUserSettings_DmSpamFilterV2[PreloadedUserSettings_DmSpamFilterV2["NON_FRIENDS"] = 2] = "NON_FRIENDS";
    /**
     * @generated from protobuf enum value: FRIENDS_AND_NON_FRIENDS = 3;
     */
    PreloadedUserSettings_DmSpamFilterV2[PreloadedUserSettings_DmSpamFilterV2["FRIENDS_AND_NON_FRIENDS"] = 3] = "FRIENDS_AND_NON_FRIENDS";
})(PreloadedUserSettings_DmSpamFilterV2 || (PreloadedUserSettings_DmSpamFilterV2 = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentRedaction
 */
export var PreloadedUserSettings_ExplicitContentRedaction;
(function (PreloadedUserSettings_ExplicitContentRedaction) {
    /**
     * @generated from protobuf enum value: UNSET_EXPLICIT_CONTENT_REDACTION = 0;
     */
    PreloadedUserSettings_ExplicitContentRedaction[PreloadedUserSettings_ExplicitContentRedaction["UNSET_EXPLICIT_CONTENT_REDACTION"] = 0] = "UNSET_EXPLICIT_CONTENT_REDACTION";
    /**
     * @generated from protobuf enum value: SHOW = 1;
     */
    PreloadedUserSettings_ExplicitContentRedaction[PreloadedUserSettings_ExplicitContentRedaction["SHOW"] = 1] = "SHOW";
    /**
     * @generated from protobuf enum value: BLUR = 2;
     */
    PreloadedUserSettings_ExplicitContentRedaction[PreloadedUserSettings_ExplicitContentRedaction["BLUR"] = 2] = "BLUR";
    /**
     * @generated from protobuf enum value: BLOCK = 3;
     */
    PreloadedUserSettings_ExplicitContentRedaction[PreloadedUserSettings_ExplicitContentRedaction["BLOCK"] = 3] = "BLOCK";
})(PreloadedUserSettings_ExplicitContentRedaction || (PreloadedUserSettings_ExplicitContentRedaction = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildActivityStatusRestrictionDefault
 */
export var PreloadedUserSettings_GuildActivityStatusRestrictionDefault;
(function (PreloadedUserSettings_GuildActivityStatusRestrictionDefault) {
    /**
     * @generated from protobuf enum value: OFF = 0;
     */
    PreloadedUserSettings_GuildActivityStatusRestrictionDefault[PreloadedUserSettings_GuildActivityStatusRestrictionDefault["OFF"] = 0] = "OFF";
    /**
     * @generated from protobuf enum value: ON_FOR_LARGE_GUILDS = 1;
     */
    PreloadedUserSettings_GuildActivityStatusRestrictionDefault[PreloadedUserSettings_GuildActivityStatusRestrictionDefault["ON_FOR_LARGE_GUILDS"] = 1] = "ON_FOR_LARGE_GUILDS";
})(PreloadedUserSettings_GuildActivityStatusRestrictionDefault || (PreloadedUserSettings_GuildActivityStatusRestrictionDefault = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Theme
 */
export var PreloadedUserSettings_Theme;
(function (PreloadedUserSettings_Theme) {
    /**
     * @generated from protobuf enum value: UNSET = 0;
     */
    PreloadedUserSettings_Theme[PreloadedUserSettings_Theme["UNSET"] = 0] = "UNSET";
    /**
     * @generated from protobuf enum value: DARK = 1;
     */
    PreloadedUserSettings_Theme[PreloadedUserSettings_Theme["DARK"] = 1] = "DARK";
    /**
     * @generated from protobuf enum value: LIGHT = 2;
     */
    PreloadedUserSettings_Theme[PreloadedUserSettings_Theme["LIGHT"] = 2] = "LIGHT";
})(PreloadedUserSettings_Theme || (PreloadedUserSettings_Theme = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.FavoriteChannelType
 */
export var PreloadedUserSettings_FavoriteChannelType;
(function (PreloadedUserSettings_FavoriteChannelType) {
    /**
     * @generated from protobuf enum value: UNSET_FAVORITE_CHANNEL_TYPE = 0;
     */
    PreloadedUserSettings_FavoriteChannelType[PreloadedUserSettings_FavoriteChannelType["UNSET_FAVORITE_CHANNEL_TYPE"] = 0] = "UNSET_FAVORITE_CHANNEL_TYPE";
    /**
     * @generated from protobuf enum value: REFERENCE_ORIGINAL = 1;
     */
    PreloadedUserSettings_FavoriteChannelType[PreloadedUserSettings_FavoriteChannelType["REFERENCE_ORIGINAL"] = 1] = "REFERENCE_ORIGINAL";
    /**
     * @generated from protobuf enum value: CATEGORY = 2;
     */
    PreloadedUserSettings_FavoriteChannelType[PreloadedUserSettings_FavoriteChannelType["CATEGORY"] = 2] = "CATEGORY";
})(PreloadedUserSettings_FavoriteChannelType || (PreloadedUserSettings_FavoriteChannelType = {}));
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings", [
            { no: 1, name: "versions", kind: "message", T: () => PreloadedUserSettings_Versions },
            { no: 2, name: "inbox", kind: "message", T: () => PreloadedUserSettings_InboxSettings },
            { no: 3, name: "guilds", kind: "message", T: () => PreloadedUserSettings_AllGuildSettings },
            { no: 4, name: "user_content", kind: "message", T: () => PreloadedUserSettings_UserContentSettings },
            { no: 5, name: "voice_and_video", kind: "message", T: () => PreloadedUserSettings_VoiceAndVideoSettings },
            { no: 6, name: "text_and_images", kind: "message", T: () => PreloadedUserSettings_TextAndImagesSettings },
            { no: 7, name: "notifications", kind: "message", T: () => PreloadedUserSettings_NotificationSettings },
            { no: 8, name: "privacy", kind: "message", T: () => PreloadedUserSettings_PrivacySettings },
            { no: 9, name: "debug", kind: "message", T: () => PreloadedUserSettings_DebugSettings },
            { no: 10, name: "game_library", kind: "message", T: () => PreloadedUserSettings_GameLibrarySettings },
            { no: 11, name: "status", kind: "message", T: () => PreloadedUserSettings_StatusSettings },
            { no: 12, name: "localization", kind: "message", T: () => PreloadedUserSettings_LocalizationSettings },
            { no: 13, name: "appearance", kind: "message", T: () => PreloadedUserSettings_AppearanceSettings },
            { no: 14, name: "guild_folders", kind: "message", T: () => PreloadedUserSettings_GuildFolders },
            { no: 15, name: "favorites", kind: "message", T: () => PreloadedUserSettings_Favorites },
            { no: 16, name: "audio_context_settings", kind: "message", T: () => PreloadedUserSettings_AudioSettings },
            { no: 17, name: "communities", kind: "message", T: () => PreloadedUserSettings_CommunitiesSettings },
            { no: 18, name: "broadcast", kind: "message", T: () => PreloadedUserSettings_BroadcastSettings },
            { no: 19, name: "clips", kind: "message", T: () => PreloadedUserSettings_ClipsSettings }
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
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Versions versions */ 1:
                    message.versions = PreloadedUserSettings_Versions.internalBinaryRead(reader, reader.uint32(), options, message.versions);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.InboxSettings inbox */ 2:
                    message.inbox = PreloadedUserSettings_InboxSettings.internalBinaryRead(reader, reader.uint32(), options, message.inbox);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AllGuildSettings guilds */ 3:
                    message.guilds = PreloadedUserSettings_AllGuildSettings.internalBinaryRead(reader, reader.uint32(), options, message.guilds);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.UserContentSettings user_content */ 4:
                    message.userContent = PreloadedUserSettings_UserContentSettings.internalBinaryRead(reader, reader.uint32(), options, message.userContent);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VoiceAndVideoSettings voice_and_video */ 5:
                    message.voiceAndVideo = PreloadedUserSettings_VoiceAndVideoSettings.internalBinaryRead(reader, reader.uint32(), options, message.voiceAndVideo);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.TextAndImagesSettings text_and_images */ 6:
                    message.textAndImages = PreloadedUserSettings_TextAndImagesSettings.internalBinaryRead(reader, reader.uint32(), options, message.textAndImages);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.NotificationSettings notifications */ 7:
                    message.notifications = PreloadedUserSettings_NotificationSettings.internalBinaryRead(reader, reader.uint32(), options, message.notifications);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.PrivacySettings privacy */ 8:
                    message.privacy = PreloadedUserSettings_PrivacySettings.internalBinaryRead(reader, reader.uint32(), options, message.privacy);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.DebugSettings debug */ 9:
                    message.debug = PreloadedUserSettings_DebugSettings.internalBinaryRead(reader, reader.uint32(), options, message.debug);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GameLibrarySettings game_library */ 10:
                    message.gameLibrary = PreloadedUserSettings_GameLibrarySettings.internalBinaryRead(reader, reader.uint32(), options, message.gameLibrary);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.StatusSettings status */ 11:
                    message.status = PreloadedUserSettings_StatusSettings.internalBinaryRead(reader, reader.uint32(), options, message.status);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.LocalizationSettings localization */ 12:
                    message.localization = PreloadedUserSettings_LocalizationSettings.internalBinaryRead(reader, reader.uint32(), options, message.localization);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AppearanceSettings appearance */ 13:
                    message.appearance = PreloadedUserSettings_AppearanceSettings.internalBinaryRead(reader, reader.uint32(), options, message.appearance);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildFolders guild_folders */ 14:
                    message.guildFolders = PreloadedUserSettings_GuildFolders.internalBinaryRead(reader, reader.uint32(), options, message.guildFolders);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Favorites favorites */ 15:
                    message.favorites = PreloadedUserSettings_Favorites.internalBinaryRead(reader, reader.uint32(), options, message.favorites);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioSettings audio_context_settings */ 16:
                    message.audioContextSettings = PreloadedUserSettings_AudioSettings.internalBinaryRead(reader, reader.uint32(), options, message.audioContextSettings);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CommunitiesSettings communities */ 17:
                    message.communities = PreloadedUserSettings_CommunitiesSettings.internalBinaryRead(reader, reader.uint32(), options, message.communities);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.BroadcastSettings broadcast */ 18:
                    message.broadcast = PreloadedUserSettings_BroadcastSettings.internalBinaryRead(reader, reader.uint32(), options, message.broadcast);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ClipsSettings clips */ 19:
                    message.clips = PreloadedUserSettings_ClipsSettings.internalBinaryRead(reader, reader.uint32(), options, message.clips);
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
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Versions versions = 1; */
        if (message.versions)
            PreloadedUserSettings_Versions.internalBinaryWrite(message.versions, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.InboxSettings inbox = 2; */
        if (message.inbox)
            PreloadedUserSettings_InboxSettings.internalBinaryWrite(message.inbox, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AllGuildSettings guilds = 3; */
        if (message.guilds)
            PreloadedUserSettings_AllGuildSettings.internalBinaryWrite(message.guilds, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.UserContentSettings user_content = 4; */
        if (message.userContent)
            PreloadedUserSettings_UserContentSettings.internalBinaryWrite(message.userContent, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VoiceAndVideoSettings voice_and_video = 5; */
        if (message.voiceAndVideo)
            PreloadedUserSettings_VoiceAndVideoSettings.internalBinaryWrite(message.voiceAndVideo, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.TextAndImagesSettings text_and_images = 6; */
        if (message.textAndImages)
            PreloadedUserSettings_TextAndImagesSettings.internalBinaryWrite(message.textAndImages, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.NotificationSettings notifications = 7; */
        if (message.notifications)
            PreloadedUserSettings_NotificationSettings.internalBinaryWrite(message.notifications, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.PrivacySettings privacy = 8; */
        if (message.privacy)
            PreloadedUserSettings_PrivacySettings.internalBinaryWrite(message.privacy, writer.tag(8, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.DebugSettings debug = 9; */
        if (message.debug)
            PreloadedUserSettings_DebugSettings.internalBinaryWrite(message.debug, writer.tag(9, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GameLibrarySettings game_library = 10; */
        if (message.gameLibrary)
            PreloadedUserSettings_GameLibrarySettings.internalBinaryWrite(message.gameLibrary, writer.tag(10, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.StatusSettings status = 11; */
        if (message.status)
            PreloadedUserSettings_StatusSettings.internalBinaryWrite(message.status, writer.tag(11, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.LocalizationSettings localization = 12; */
        if (message.localization)
            PreloadedUserSettings_LocalizationSettings.internalBinaryWrite(message.localization, writer.tag(12, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AppearanceSettings appearance = 13; */
        if (message.appearance)
            PreloadedUserSettings_AppearanceSettings.internalBinaryWrite(message.appearance, writer.tag(13, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildFolders guild_folders = 14; */
        if (message.guildFolders)
            PreloadedUserSettings_GuildFolders.internalBinaryWrite(message.guildFolders, writer.tag(14, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Favorites favorites = 15; */
        if (message.favorites)
            PreloadedUserSettings_Favorites.internalBinaryWrite(message.favorites, writer.tag(15, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioSettings audio_context_settings = 16; */
        if (message.audioContextSettings)
            PreloadedUserSettings_AudioSettings.internalBinaryWrite(message.audioContextSettings, writer.tag(16, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CommunitiesSettings communities = 17; */
        if (message.communities)
            PreloadedUserSettings_CommunitiesSettings.internalBinaryWrite(message.communities, writer.tag(17, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.BroadcastSettings broadcast = 18; */
        if (message.broadcast)
            PreloadedUserSettings_BroadcastSettings.internalBinaryWrite(message.broadcast, writer.tag(18, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ClipsSettings clips = 19; */
        if (message.clips)
            PreloadedUserSettings_ClipsSettings.internalBinaryWrite(message.clips, writer.tag(19, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings
 */
export const PreloadedUserSettings = new PreloadedUserSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_Versions$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Versions", [
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
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Versions
 */
export const PreloadedUserSettings_Versions = new PreloadedUserSettings_Versions$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_InboxSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.InboxSettings", [
            { no: 1, name: "current_tab", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.InboxTab", PreloadedUserSettings_InboxTab] },
            { no: 2, name: "viewed_tutorial", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.currentTab = 0;
        message.viewedTutorial = false;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.InboxTab current_tab */ 1:
                    message.currentTab = reader.int32();
                    break;
                case /* bool viewed_tutorial */ 2:
                    message.viewedTutorial = reader.bool();
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
        /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.InboxTab current_tab = 1; */
        if (message.currentTab !== 0)
            writer.tag(1, WireType.Varint).int32(message.currentTab);
        /* bool viewed_tutorial = 2; */
        if (message.viewedTutorial !== false)
            writer.tag(2, WireType.Varint).bool(message.viewedTutorial);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.InboxSettings
 */
export const PreloadedUserSettings_InboxSettings = new PreloadedUserSettings_InboxSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ChannelIconEmoji$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelIconEmoji", [
            { no: 1, name: "id", kind: "message", T: () => UInt64Value },
            { no: 2, name: "name", kind: "message", T: () => StringValue },
            { no: 3, name: "color", kind: "message", T: () => UInt64Value }
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
                case /* optional google.protobuf.UInt64Value id */ 1:
                    message.id = UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.id);
                    break;
                case /* optional google.protobuf.StringValue name */ 2:
                    message.name = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.name);
                    break;
                case /* optional google.protobuf.UInt64Value color */ 3:
                    message.color = UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.color);
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
        /* optional google.protobuf.UInt64Value id = 1; */
        if (message.id)
            UInt64Value.internalBinaryWrite(message.id, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue name = 2; */
        if (message.name)
            StringValue.internalBinaryWrite(message.name, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt64Value color = 3; */
        if (message.color)
            UInt64Value.internalBinaryWrite(message.color, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelIconEmoji
 */
export const PreloadedUserSettings_ChannelIconEmoji = new PreloadedUserSettings_ChannelIconEmoji$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ChannelSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelSettings", [
            { no: 1, name: "collapsed_in_inbox", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "icon_emoji", kind: "message", T: () => PreloadedUserSettings_ChannelIconEmoji }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.collapsedInInbox = false;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool collapsed_in_inbox */ 1:
                    message.collapsedInInbox = reader.bool();
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelIconEmoji icon_emoji */ 2:
                    message.iconEmoji = PreloadedUserSettings_ChannelIconEmoji.internalBinaryRead(reader, reader.uint32(), options, message.iconEmoji);
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
        /* bool collapsed_in_inbox = 1; */
        if (message.collapsedInInbox !== false)
            writer.tag(1, WireType.Varint).bool(message.collapsedInInbox);
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelIconEmoji icon_emoji = 2; */
        if (message.iconEmoji)
            PreloadedUserSettings_ChannelIconEmoji.internalBinaryWrite(message.iconEmoji, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelSettings
 */
export const PreloadedUserSettings_ChannelSettings = new PreloadedUserSettings_ChannelSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_CustomCallSound$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CustomCallSound", [
            { no: 1, name: "sound_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/ },
            { no: 2, name: "guild_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.soundId = "0";
        message.guildId = "0";
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* fixed64 sound_id */ 1:
                    message.soundId = reader.fixed64().toString();
                    break;
                case /* fixed64 guild_id */ 2:
                    message.guildId = reader.fixed64().toString();
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
        /* fixed64 sound_id = 1; */
        if (message.soundId !== "0")
            writer.tag(1, WireType.Bit64).fixed64(message.soundId);
        /* fixed64 guild_id = 2; */
        if (message.guildId !== "0")
            writer.tag(2, WireType.Bit64).fixed64(message.guildId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CustomCallSound
 */
export const PreloadedUserSettings_CustomCallSound = new PreloadedUserSettings_CustomCallSound$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ChannelListSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelListSettings", [
            { no: 1, name: "layout", kind: "message", T: () => StringValue },
            { no: 2, name: "message_previews", kind: "message", T: () => StringValue }
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
                case /* optional google.protobuf.StringValue layout */ 1:
                    message.layout = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.layout);
                    break;
                case /* optional google.protobuf.StringValue message_previews */ 2:
                    message.messagePreviews = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.messagePreviews);
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
        /* optional google.protobuf.StringValue layout = 1; */
        if (message.layout)
            StringValue.internalBinaryWrite(message.layout, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue message_previews = 2; */
        if (message.messagePreviews)
            StringValue.internalBinaryWrite(message.messagePreviews, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelListSettings
 */
export const PreloadedUserSettings_ChannelListSettings = new PreloadedUserSettings_ChannelListSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_GuildSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildSettings", [
            { no: 1, name: "channels", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => PreloadedUserSettings_ChannelSettings } },
            { no: 2, name: "hub_progress", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "guild_onboarding_progress", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "guild_recents_dismissed_at", kind: "message", T: () => Timestamp },
            { no: 5, name: "dismissed_guild_content", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 6, name: "join_sound", kind: "message", T: () => PreloadedUserSettings_CustomCallSound },
            { no: 7, name: "mobile_redesign_channel_list_settings", kind: "message", T: () => PreloadedUserSettings_ChannelListSettings },
            { no: 8, name: "disable_raid_alert_push", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 9, name: "disable_raid_alert_nag", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.channels = {};
        message.hubProgress = 0;
        message.guildOnboardingProgress = 0;
        message.dismissedGuildContent = new Uint8Array(0);
        message.disableRaidAlertPush = false;
        message.disableRaidAlertNag = false;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelSettings> channels */ 1:
                    this.binaryReadMap1(message.channels, reader, options);
                    break;
                case /* uint32 hub_progress */ 2:
                    message.hubProgress = reader.uint32();
                    break;
                case /* uint32 guild_onboarding_progress */ 3:
                    message.guildOnboardingProgress = reader.uint32();
                    break;
                case /* optional google.protobuf.Timestamp guild_recents_dismissed_at */ 4:
                    message.guildRecentsDismissedAt = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.guildRecentsDismissedAt);
                    break;
                case /* bytes dismissed_guild_content */ 5:
                    message.dismissedGuildContent = reader.bytes();
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CustomCallSound join_sound */ 6:
                    message.joinSound = PreloadedUserSettings_CustomCallSound.internalBinaryRead(reader, reader.uint32(), options, message.joinSound);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelListSettings mobile_redesign_channel_list_settings */ 7:
                    message.mobileRedesignChannelListSettings = PreloadedUserSettings_ChannelListSettings.internalBinaryRead(reader, reader.uint32(), options, message.mobileRedesignChannelListSettings);
                    break;
                case /* bool disable_raid_alert_push */ 8:
                    message.disableRaidAlertPush = reader.bool();
                    break;
                case /* bool disable_raid_alert_nag */ 9:
                    message.disableRaidAlertNag = reader.bool();
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
                    val = PreloadedUserSettings_ChannelSettings.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildSettings.channels");
            }
        }
        map[key ?? "0"] = val ?? PreloadedUserSettings_ChannelSettings.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelSettings> channels = 1; */
        for (let k of globalThis.Object.keys(message.channels)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.Bit64).fixed64(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            PreloadedUserSettings_ChannelSettings.internalBinaryWrite(message.channels[k], writer, options);
            writer.join().join();
        }
        /* uint32 hub_progress = 2; */
        if (message.hubProgress !== 0)
            writer.tag(2, WireType.Varint).uint32(message.hubProgress);
        /* uint32 guild_onboarding_progress = 3; */
        if (message.guildOnboardingProgress !== 0)
            writer.tag(3, WireType.Varint).uint32(message.guildOnboardingProgress);
        /* optional google.protobuf.Timestamp guild_recents_dismissed_at = 4; */
        if (message.guildRecentsDismissedAt)
            Timestamp.internalBinaryWrite(message.guildRecentsDismissedAt, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* bytes dismissed_guild_content = 5; */
        if (message.dismissedGuildContent.length)
            writer.tag(5, WireType.LengthDelimited).bytes(message.dismissedGuildContent);
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CustomCallSound join_sound = 6; */
        if (message.joinSound)
            PreloadedUserSettings_CustomCallSound.internalBinaryWrite(message.joinSound, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ChannelListSettings mobile_redesign_channel_list_settings = 7; */
        if (message.mobileRedesignChannelListSettings)
            PreloadedUserSettings_ChannelListSettings.internalBinaryWrite(message.mobileRedesignChannelListSettings, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        /* bool disable_raid_alert_push = 8; */
        if (message.disableRaidAlertPush !== false)
            writer.tag(8, WireType.Varint).bool(message.disableRaidAlertPush);
        /* bool disable_raid_alert_nag = 9; */
        if (message.disableRaidAlertNag !== false)
            writer.tag(9, WireType.Varint).bool(message.disableRaidAlertNag);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildSettings
 */
export const PreloadedUserSettings_GuildSettings = new PreloadedUserSettings_GuildSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_AllGuildSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AllGuildSettings", [
            { no: 1, name: "guilds", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => PreloadedUserSettings_GuildSettings } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.guilds = {};
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildSettings> guilds */ 1:
                    this.binaryReadMap1(message.guilds, reader, options);
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
                    val = PreloadedUserSettings_GuildSettings.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AllGuildSettings.guilds");
            }
        }
        map[key ?? "0"] = val ?? PreloadedUserSettings_GuildSettings.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildSettings> guilds = 1; */
        for (let k of globalThis.Object.keys(message.guilds)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.Bit64).fixed64(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            PreloadedUserSettings_GuildSettings.internalBinaryWrite(message.guilds[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AllGuildSettings
 */
export const PreloadedUserSettings_AllGuildSettings = new PreloadedUserSettings_AllGuildSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_UserContentSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.UserContentSettings", [
            { no: 1, name: "dismissed_contents", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 2, name: "last_dismissed_outbound_promotion_start_date", kind: "message", T: () => StringValue },
            { no: 3, name: "premium_tier_0_modal_dismissed_at", kind: "message", T: () => Timestamp },
            { no: 4, name: "guild_onboarding_upsell_dismissed_at", kind: "message", T: () => Timestamp },
            { no: 5, name: "safety_user_sentiment_notice_dismissed_at", kind: "message", T: () => Timestamp }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.dismissedContents = new Uint8Array(0);
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bytes dismissed_contents */ 1:
                    message.dismissedContents = reader.bytes();
                    break;
                case /* optional google.protobuf.StringValue last_dismissed_outbound_promotion_start_date */ 2:
                    message.lastDismissedOutboundPromotionStartDate = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.lastDismissedOutboundPromotionStartDate);
                    break;
                case /* optional google.protobuf.Timestamp premium_tier_0_modal_dismissed_at */ 3:
                    message.premiumTier0ModalDismissedAt = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.premiumTier0ModalDismissedAt);
                    break;
                case /* optional google.protobuf.Timestamp guild_onboarding_upsell_dismissed_at */ 4:
                    message.guildOnboardingUpsellDismissedAt = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.guildOnboardingUpsellDismissedAt);
                    break;
                case /* optional google.protobuf.Timestamp safety_user_sentiment_notice_dismissed_at */ 5:
                    message.safetyUserSentimentNoticeDismissedAt = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.safetyUserSentimentNoticeDismissedAt);
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
        /* bytes dismissed_contents = 1; */
        if (message.dismissedContents.length)
            writer.tag(1, WireType.LengthDelimited).bytes(message.dismissedContents);
        /* optional google.protobuf.StringValue last_dismissed_outbound_promotion_start_date = 2; */
        if (message.lastDismissedOutboundPromotionStartDate)
            StringValue.internalBinaryWrite(message.lastDismissedOutboundPromotionStartDate, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.Timestamp premium_tier_0_modal_dismissed_at = 3; */
        if (message.premiumTier0ModalDismissedAt)
            Timestamp.internalBinaryWrite(message.premiumTier0ModalDismissedAt, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.Timestamp guild_onboarding_upsell_dismissed_at = 4; */
        if (message.guildOnboardingUpsellDismissedAt)
            Timestamp.internalBinaryWrite(message.guildOnboardingUpsellDismissedAt, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.Timestamp safety_user_sentiment_notice_dismissed_at = 5; */
        if (message.safetyUserSentimentNoticeDismissedAt)
            Timestamp.internalBinaryWrite(message.safetyUserSentimentNoticeDismissedAt, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.UserContentSettings
 */
export const PreloadedUserSettings_UserContentSettings = new PreloadedUserSettings_UserContentSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_VideoFilterBackgroundBlur$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VideoFilterBackgroundBlur", [
            { no: 1, name: "use_blur", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.useBlur = false;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool use_blur */ 1:
                    message.useBlur = reader.bool();
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
        /* bool use_blur = 1; */
        if (message.useBlur !== false)
            writer.tag(1, WireType.Varint).bool(message.useBlur);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VideoFilterBackgroundBlur
 */
export const PreloadedUserSettings_VideoFilterBackgroundBlur = new PreloadedUserSettings_VideoFilterBackgroundBlur$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_VideoFilterAsset$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VideoFilterAsset", [
            { no: 1, name: "id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/ },
            { no: 2, name: "asset_hash", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.id = "0";
        message.assetHash = "";
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* fixed64 id */ 1:
                    message.id = reader.fixed64().toString();
                    break;
                case /* string asset_hash */ 2:
                    message.assetHash = reader.string();
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
        /* fixed64 id = 1; */
        if (message.id !== "0")
            writer.tag(1, WireType.Bit64).fixed64(message.id);
        /* string asset_hash = 2; */
        if (message.assetHash !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.assetHash);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VideoFilterAsset
 */
export const PreloadedUserSettings_VideoFilterAsset = new PreloadedUserSettings_VideoFilterAsset$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_SoundboardSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.SoundboardSettings", [
            { no: 1, name: "volume", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.volume = 0;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* float volume */ 1:
                    message.volume = reader.float();
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
        /* float volume = 1; */
        if (message.volume !== 0)
            writer.tag(1, WireType.Bit32).float(message.volume);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.SoundboardSettings
 */
export const PreloadedUserSettings_SoundboardSettings = new PreloadedUserSettings_SoundboardSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_VoiceAndVideoSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VoiceAndVideoSettings", [
            { no: 1, name: "blur", kind: "message", T: () => PreloadedUserSettings_VideoFilterBackgroundBlur },
            { no: 2, name: "preset_option", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "custom_asset", kind: "message", T: () => PreloadedUserSettings_VideoFilterAsset },
            { no: 5, name: "always_preview_video", kind: "message", T: () => BoolValue },
            { no: 6, name: "afk_timeout", kind: "message", T: () => UInt32Value },
            { no: 7, name: "stream_notifications_enabled", kind: "message", T: () => BoolValue },
            { no: 8, name: "native_phone_integration_enabled", kind: "message", T: () => BoolValue },
            { no: 9, name: "soundboard_settings", kind: "message", T: () => PreloadedUserSettings_SoundboardSettings }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.presetOption = 0;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VideoFilterBackgroundBlur blur */ 1:
                    message.blur = PreloadedUserSettings_VideoFilterBackgroundBlur.internalBinaryRead(reader, reader.uint32(), options, message.blur);
                    break;
                case /* uint32 preset_option */ 2:
                    message.presetOption = reader.uint32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VideoFilterAsset custom_asset */ 3:
                    message.customAsset = PreloadedUserSettings_VideoFilterAsset.internalBinaryRead(reader, reader.uint32(), options, message.customAsset);
                    break;
                case /* optional google.protobuf.BoolValue always_preview_video */ 5:
                    message.alwaysPreviewVideo = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.alwaysPreviewVideo);
                    break;
                case /* optional google.protobuf.UInt32Value afk_timeout */ 6:
                    message.afkTimeout = UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.afkTimeout);
                    break;
                case /* optional google.protobuf.BoolValue stream_notifications_enabled */ 7:
                    message.streamNotificationsEnabled = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.streamNotificationsEnabled);
                    break;
                case /* optional google.protobuf.BoolValue native_phone_integration_enabled */ 8:
                    message.nativePhoneIntegrationEnabled = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.nativePhoneIntegrationEnabled);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.SoundboardSettings soundboard_settings */ 9:
                    message.soundboardSettings = PreloadedUserSettings_SoundboardSettings.internalBinaryRead(reader, reader.uint32(), options, message.soundboardSettings);
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
        /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VideoFilterBackgroundBlur blur = 1; */
        if (message.blur)
            PreloadedUserSettings_VideoFilterBackgroundBlur.internalBinaryWrite(message.blur, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* uint32 preset_option = 2; */
        if (message.presetOption !== 0)
            writer.tag(2, WireType.Varint).uint32(message.presetOption);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VideoFilterAsset custom_asset = 3; */
        if (message.customAsset)
            PreloadedUserSettings_VideoFilterAsset.internalBinaryWrite(message.customAsset, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue always_preview_video = 5; */
        if (message.alwaysPreviewVideo)
            BoolValue.internalBinaryWrite(message.alwaysPreviewVideo, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value afk_timeout = 6; */
        if (message.afkTimeout)
            UInt32Value.internalBinaryWrite(message.afkTimeout, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue stream_notifications_enabled = 7; */
        if (message.streamNotificationsEnabled)
            BoolValue.internalBinaryWrite(message.streamNotificationsEnabled, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue native_phone_integration_enabled = 8; */
        if (message.nativePhoneIntegrationEnabled)
            BoolValue.internalBinaryWrite(message.nativePhoneIntegrationEnabled, writer.tag(8, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.SoundboardSettings soundboard_settings = 9; */
        if (message.soundboardSettings)
            PreloadedUserSettings_SoundboardSettings.internalBinaryWrite(message.soundboardSettings, writer.tag(9, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.VoiceAndVideoSettings
 */
export const PreloadedUserSettings_VoiceAndVideoSettings = new PreloadedUserSettings_VoiceAndVideoSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ExplicitContentSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentSettings", [
            { no: 1, name: "explicit_content_guilds", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction] },
            { no: 2, name: "explicit_content_friend_dm", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction] },
            { no: 3, name: "explicit_content_non_friend_dm", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.explicitContentGuilds = 0;
        message.explicitContentFriendDm = 0;
        message.explicitContentNonFriendDm = 0;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentRedaction explicit_content_guilds */ 1:
                    message.explicitContentGuilds = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentRedaction explicit_content_friend_dm */ 2:
                    message.explicitContentFriendDm = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentRedaction explicit_content_non_friend_dm */ 3:
                    message.explicitContentNonFriendDm = reader.int32();
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
        /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentRedaction explicit_content_guilds = 1; */
        if (message.explicitContentGuilds !== 0)
            writer.tag(1, WireType.Varint).int32(message.explicitContentGuilds);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentRedaction explicit_content_friend_dm = 2; */
        if (message.explicitContentFriendDm !== 0)
            writer.tag(2, WireType.Varint).int32(message.explicitContentFriendDm);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentRedaction explicit_content_non_friend_dm = 3; */
        if (message.explicitContentNonFriendDm !== 0)
            writer.tag(3, WireType.Varint).int32(message.explicitContentNonFriendDm);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentSettings
 */
export const PreloadedUserSettings_ExplicitContentSettings = new PreloadedUserSettings_ExplicitContentSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_TextAndImagesSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.TextAndImagesSettings", [
            { no: 1, name: "diversity_surrogate", kind: "message", T: () => StringValue },
            { no: 2, name: "use_rich_chat_input", kind: "message", T: () => BoolValue },
            { no: 3, name: "use_thread_sidebar", kind: "message", T: () => BoolValue },
            { no: 4, name: "render_spoilers", kind: "message", T: () => StringValue },
            { no: 5, name: "emoji_picker_collapsed_sections", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "sticker_picker_collapsed_sections", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "view_image_descriptions", kind: "message", T: () => BoolValue },
            { no: 8, name: "show_command_suggestions", kind: "message", T: () => BoolValue },
            { no: 9, name: "inline_attachment_media", kind: "message", T: () => BoolValue },
            { no: 10, name: "inline_embed_media", kind: "message", T: () => BoolValue },
            { no: 11, name: "gif_auto_play", kind: "message", T: () => BoolValue },
            { no: 12, name: "render_embeds", kind: "message", T: () => BoolValue },
            { no: 13, name: "render_reactions", kind: "message", T: () => BoolValue },
            { no: 14, name: "animate_emoji", kind: "message", T: () => BoolValue },
            { no: 15, name: "animate_stickers", kind: "message", T: () => UInt32Value },
            { no: 16, name: "enable_tts_command", kind: "message", T: () => BoolValue },
            { no: 17, name: "message_display_compact", kind: "message", T: () => BoolValue },
            { no: 19, name: "explicit_content_filter", kind: "message", T: () => UInt32Value },
            { no: 20, name: "view_nsfw_guilds", kind: "message", T: () => BoolValue },
            { no: 21, name: "convert_emoticons", kind: "message", T: () => BoolValue },
            { no: 22, name: "expression_suggestions_enabled", kind: "message", T: () => BoolValue },
            { no: 23, name: "view_nsfw_commands", kind: "message", T: () => BoolValue },
            { no: 24, name: "use_legacy_chat_input", kind: "message", T: () => BoolValue },
            { no: 25, name: "soundboard_picker_collapsed_sections", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 26, name: "dm_spam_filter", kind: "message", T: () => UInt32Value },
            { no: 27, name: "dm_spam_filter_v2", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.DmSpamFilterV2", PreloadedUserSettings_DmSpamFilterV2] },
            { no: 28, name: "include_stickers_in_autocomplete", kind: "message", T: () => BoolValue },
            { no: 29, name: "explicit_content_settings", kind: "message", T: () => PreloadedUserSettings_ExplicitContentSettings }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.emojiPickerCollapsedSections = [];
        message.stickerPickerCollapsedSections = [];
        message.soundboardPickerCollapsedSections = [];
        message.dmSpamFilterV2 = 0;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.StringValue diversity_surrogate */ 1:
                    message.diversitySurrogate = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.diversitySurrogate);
                    break;
                case /* optional google.protobuf.BoolValue use_rich_chat_input */ 2:
                    message.useRichChatInput = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.useRichChatInput);
                    break;
                case /* optional google.protobuf.BoolValue use_thread_sidebar */ 3:
                    message.useThreadSidebar = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.useThreadSidebar);
                    break;
                case /* optional google.protobuf.StringValue render_spoilers */ 4:
                    message.renderSpoilers = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.renderSpoilers);
                    break;
                case /* repeated string emoji_picker_collapsed_sections */ 5:
                    message.emojiPickerCollapsedSections.push(reader.string());
                    break;
                case /* repeated string sticker_picker_collapsed_sections */ 6:
                    message.stickerPickerCollapsedSections.push(reader.string());
                    break;
                case /* optional google.protobuf.BoolValue view_image_descriptions */ 7:
                    message.viewImageDescriptions = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.viewImageDescriptions);
                    break;
                case /* optional google.protobuf.BoolValue show_command_suggestions */ 8:
                    message.showCommandSuggestions = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.showCommandSuggestions);
                    break;
                case /* optional google.protobuf.BoolValue inline_attachment_media */ 9:
                    message.inlineAttachmentMedia = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.inlineAttachmentMedia);
                    break;
                case /* optional google.protobuf.BoolValue inline_embed_media */ 10:
                    message.inlineEmbedMedia = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.inlineEmbedMedia);
                    break;
                case /* optional google.protobuf.BoolValue gif_auto_play */ 11:
                    message.gifAutoPlay = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.gifAutoPlay);
                    break;
                case /* optional google.protobuf.BoolValue render_embeds */ 12:
                    message.renderEmbeds = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.renderEmbeds);
                    break;
                case /* optional google.protobuf.BoolValue render_reactions */ 13:
                    message.renderReactions = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.renderReactions);
                    break;
                case /* optional google.protobuf.BoolValue animate_emoji */ 14:
                    message.animateEmoji = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.animateEmoji);
                    break;
                case /* optional google.protobuf.UInt32Value animate_stickers */ 15:
                    message.animateStickers = UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.animateStickers);
                    break;
                case /* optional google.protobuf.BoolValue enable_tts_command */ 16:
                    message.enableTtsCommand = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableTtsCommand);
                    break;
                case /* optional google.protobuf.BoolValue message_display_compact */ 17:
                    message.messageDisplayCompact = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.messageDisplayCompact);
                    break;
                case /* optional google.protobuf.UInt32Value explicit_content_filter */ 19:
                    message.explicitContentFilter = UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.explicitContentFilter);
                    break;
                case /* optional google.protobuf.BoolValue view_nsfw_guilds */ 20:
                    message.viewNsfwGuilds = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.viewNsfwGuilds);
                    break;
                case /* optional google.protobuf.BoolValue convert_emoticons */ 21:
                    message.convertEmoticons = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.convertEmoticons);
                    break;
                case /* optional google.protobuf.BoolValue expression_suggestions_enabled */ 22:
                    message.expressionSuggestionsEnabled = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.expressionSuggestionsEnabled);
                    break;
                case /* optional google.protobuf.BoolValue view_nsfw_commands */ 23:
                    message.viewNsfwCommands = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.viewNsfwCommands);
                    break;
                case /* optional google.protobuf.BoolValue use_legacy_chat_input */ 24:
                    message.useLegacyChatInput = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.useLegacyChatInput);
                    break;
                case /* repeated string soundboard_picker_collapsed_sections */ 25:
                    message.soundboardPickerCollapsedSections.push(reader.string());
                    break;
                case /* optional google.protobuf.UInt32Value dm_spam_filter */ 26:
                    message.dmSpamFilter = UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.dmSpamFilter);
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.DmSpamFilterV2 dm_spam_filter_v2 */ 27:
                    message.dmSpamFilterV2 = reader.int32();
                    break;
                case /* optional google.protobuf.BoolValue include_stickers_in_autocomplete */ 28:
                    message.includeStickersInAutocomplete = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.includeStickersInAutocomplete);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentSettings explicit_content_settings */ 29:
                    message.explicitContentSettings = PreloadedUserSettings_ExplicitContentSettings.internalBinaryRead(reader, reader.uint32(), options, message.explicitContentSettings);
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
        /* optional google.protobuf.StringValue diversity_surrogate = 1; */
        if (message.diversitySurrogate)
            StringValue.internalBinaryWrite(message.diversitySurrogate, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue use_rich_chat_input = 2; */
        if (message.useRichChatInput)
            BoolValue.internalBinaryWrite(message.useRichChatInput, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue use_thread_sidebar = 3; */
        if (message.useThreadSidebar)
            BoolValue.internalBinaryWrite(message.useThreadSidebar, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue render_spoilers = 4; */
        if (message.renderSpoilers)
            StringValue.internalBinaryWrite(message.renderSpoilers, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* repeated string emoji_picker_collapsed_sections = 5; */
        for (let i = 0; i < message.emojiPickerCollapsedSections.length; i++)
            writer.tag(5, WireType.LengthDelimited).string(message.emojiPickerCollapsedSections[i]);
        /* repeated string sticker_picker_collapsed_sections = 6; */
        for (let i = 0; i < message.stickerPickerCollapsedSections.length; i++)
            writer.tag(6, WireType.LengthDelimited).string(message.stickerPickerCollapsedSections[i]);
        /* optional google.protobuf.BoolValue view_image_descriptions = 7; */
        if (message.viewImageDescriptions)
            BoolValue.internalBinaryWrite(message.viewImageDescriptions, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue show_command_suggestions = 8; */
        if (message.showCommandSuggestions)
            BoolValue.internalBinaryWrite(message.showCommandSuggestions, writer.tag(8, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue inline_attachment_media = 9; */
        if (message.inlineAttachmentMedia)
            BoolValue.internalBinaryWrite(message.inlineAttachmentMedia, writer.tag(9, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue inline_embed_media = 10; */
        if (message.inlineEmbedMedia)
            BoolValue.internalBinaryWrite(message.inlineEmbedMedia, writer.tag(10, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue gif_auto_play = 11; */
        if (message.gifAutoPlay)
            BoolValue.internalBinaryWrite(message.gifAutoPlay, writer.tag(11, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue render_embeds = 12; */
        if (message.renderEmbeds)
            BoolValue.internalBinaryWrite(message.renderEmbeds, writer.tag(12, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue render_reactions = 13; */
        if (message.renderReactions)
            BoolValue.internalBinaryWrite(message.renderReactions, writer.tag(13, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue animate_emoji = 14; */
        if (message.animateEmoji)
            BoolValue.internalBinaryWrite(message.animateEmoji, writer.tag(14, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value animate_stickers = 15; */
        if (message.animateStickers)
            UInt32Value.internalBinaryWrite(message.animateStickers, writer.tag(15, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue enable_tts_command = 16; */
        if (message.enableTtsCommand)
            BoolValue.internalBinaryWrite(message.enableTtsCommand, writer.tag(16, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue message_display_compact = 17; */
        if (message.messageDisplayCompact)
            BoolValue.internalBinaryWrite(message.messageDisplayCompact, writer.tag(17, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value explicit_content_filter = 19; */
        if (message.explicitContentFilter)
            UInt32Value.internalBinaryWrite(message.explicitContentFilter, writer.tag(19, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue view_nsfw_guilds = 20; */
        if (message.viewNsfwGuilds)
            BoolValue.internalBinaryWrite(message.viewNsfwGuilds, writer.tag(20, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue convert_emoticons = 21; */
        if (message.convertEmoticons)
            BoolValue.internalBinaryWrite(message.convertEmoticons, writer.tag(21, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue expression_suggestions_enabled = 22; */
        if (message.expressionSuggestionsEnabled)
            BoolValue.internalBinaryWrite(message.expressionSuggestionsEnabled, writer.tag(22, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue view_nsfw_commands = 23; */
        if (message.viewNsfwCommands)
            BoolValue.internalBinaryWrite(message.viewNsfwCommands, writer.tag(23, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue use_legacy_chat_input = 24; */
        if (message.useLegacyChatInput)
            BoolValue.internalBinaryWrite(message.useLegacyChatInput, writer.tag(24, WireType.LengthDelimited).fork(), options).join();
        /* repeated string soundboard_picker_collapsed_sections = 25; */
        for (let i = 0; i < message.soundboardPickerCollapsedSections.length; i++)
            writer.tag(25, WireType.LengthDelimited).string(message.soundboardPickerCollapsedSections[i]);
        /* optional google.protobuf.UInt32Value dm_spam_filter = 26; */
        if (message.dmSpamFilter)
            UInt32Value.internalBinaryWrite(message.dmSpamFilter, writer.tag(26, WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.DmSpamFilterV2 dm_spam_filter_v2 = 27; */
        if (message.dmSpamFilterV2 !== 0)
            writer.tag(27, WireType.Varint).int32(message.dmSpamFilterV2);
        /* optional google.protobuf.BoolValue include_stickers_in_autocomplete = 28; */
        if (message.includeStickersInAutocomplete)
            BoolValue.internalBinaryWrite(message.includeStickersInAutocomplete, writer.tag(28, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ExplicitContentSettings explicit_content_settings = 29; */
        if (message.explicitContentSettings)
            PreloadedUserSettings_ExplicitContentSettings.internalBinaryWrite(message.explicitContentSettings, writer.tag(29, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.TextAndImagesSettings
 */
export const PreloadedUserSettings_TextAndImagesSettings = new PreloadedUserSettings_TextAndImagesSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_NotificationSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.NotificationSettings", [
            { no: 1, name: "show_in_app_notifications", kind: "message", T: () => BoolValue },
            { no: 2, name: "notify_friends_on_go_live", kind: "message", T: () => BoolValue },
            { no: 3, name: "notification_center_acked_before_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/ },
            { no: 4, name: "enable_burst_reaction_notifications", kind: "message", T: () => BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.notificationCenterAckedBeforeId = "0";
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.BoolValue show_in_app_notifications */ 1:
                    message.showInAppNotifications = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.showInAppNotifications);
                    break;
                case /* optional google.protobuf.BoolValue notify_friends_on_go_live */ 2:
                    message.notifyFriendsOnGoLive = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.notifyFriendsOnGoLive);
                    break;
                case /* fixed64 notification_center_acked_before_id */ 3:
                    message.notificationCenterAckedBeforeId = reader.fixed64().toString();
                    break;
                case /* optional google.protobuf.BoolValue enable_burst_reaction_notifications */ 4:
                    message.enableBurstReactionNotifications = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableBurstReactionNotifications);
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
        /* optional google.protobuf.BoolValue show_in_app_notifications = 1; */
        if (message.showInAppNotifications)
            BoolValue.internalBinaryWrite(message.showInAppNotifications, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue notify_friends_on_go_live = 2; */
        if (message.notifyFriendsOnGoLive)
            BoolValue.internalBinaryWrite(message.notifyFriendsOnGoLive, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* fixed64 notification_center_acked_before_id = 3; */
        if (message.notificationCenterAckedBeforeId !== "0")
            writer.tag(3, WireType.Bit64).fixed64(message.notificationCenterAckedBeforeId);
        /* optional google.protobuf.BoolValue enable_burst_reaction_notifications = 4; */
        if (message.enableBurstReactionNotifications)
            BoolValue.internalBinaryWrite(message.enableBurstReactionNotifications, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.NotificationSettings
 */
export const PreloadedUserSettings_NotificationSettings = new PreloadedUserSettings_NotificationSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_PrivacySettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.PrivacySettings", [
            { no: 1, name: "allow_activity_party_privacy_friends", kind: "message", T: () => BoolValue },
            { no: 2, name: "allow_activity_party_privacy_voice_channel", kind: "message", T: () => BoolValue },
            { no: 3, name: "restricted_guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/ },
            { no: 4, name: "default_guilds_restricted", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "allow_accessibility_detection", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 8, name: "detect_platform_accounts", kind: "message", T: () => BoolValue },
            { no: 9, name: "passwordless", kind: "message", T: () => BoolValue },
            { no: 10, name: "contact_sync_enabled", kind: "message", T: () => BoolValue },
            { no: 11, name: "friend_source_flags", kind: "message", T: () => UInt32Value },
            { no: 12, name: "friend_discovery_flags", kind: "message", T: () => UInt32Value },
            { no: 13, name: "activity_restricted_guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/ },
            { no: 14, name: "default_guilds_activity_restricted", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildActivityStatusRestrictionDefault", PreloadedUserSettings_GuildActivityStatusRestrictionDefault] },
            { no: 15, name: "activity_joining_restricted_guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/ },
            { no: 16, name: "message_request_restricted_guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/ },
            { no: 17, name: "default_message_request_restricted", kind: "message", T: () => BoolValue },
            { no: 18, name: "drops_opted_out", kind: "message", T: () => BoolValue },
            { no: 19, name: "non_spam_retraining_opt_in", kind: "message", T: () => BoolValue },
            { no: 20, name: "family_center_enabled", kind: "message", T: () => BoolValue },
            { no: 21, name: "family_center_enabled_v2", kind: "message", T: () => BoolValue },
            { no: 22, name: "hide_legacy_username", kind: "message", T: () => BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.restrictedGuildIds = [];
        message.defaultGuildsRestricted = false;
        message.allowAccessibilityDetection = false;
        message.activityRestrictedGuildIds = [];
        message.defaultGuildsActivityRestricted = 0;
        message.activityJoiningRestrictedGuildIds = [];
        message.messageRequestRestrictedGuildIds = [];
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.BoolValue allow_activity_party_privacy_friends */ 1:
                    message.allowActivityPartyPrivacyFriends = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.allowActivityPartyPrivacyFriends);
                    break;
                case /* optional google.protobuf.BoolValue allow_activity_party_privacy_voice_channel */ 2:
                    message.allowActivityPartyPrivacyVoiceChannel = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.allowActivityPartyPrivacyVoiceChannel);
                    break;
                case /* repeated fixed64 restricted_guild_ids */ 3:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.restrictedGuildIds.push(reader.fixed64().toString());
                    else
                        message.restrictedGuildIds.push(reader.fixed64().toString());
                    break;
                case /* bool default_guilds_restricted */ 4:
                    message.defaultGuildsRestricted = reader.bool();
                    break;
                case /* bool allow_accessibility_detection */ 7:
                    message.allowAccessibilityDetection = reader.bool();
                    break;
                case /* optional google.protobuf.BoolValue detect_platform_accounts */ 8:
                    message.detectPlatformAccounts = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.detectPlatformAccounts);
                    break;
                case /* optional google.protobuf.BoolValue passwordless */ 9:
                    message.passwordless = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.passwordless);
                    break;
                case /* optional google.protobuf.BoolValue contact_sync_enabled */ 10:
                    message.contactSyncEnabled = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.contactSyncEnabled);
                    break;
                case /* optional google.protobuf.UInt32Value friend_source_flags */ 11:
                    message.friendSourceFlags = UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.friendSourceFlags);
                    break;
                case /* optional google.protobuf.UInt32Value friend_discovery_flags */ 12:
                    message.friendDiscoveryFlags = UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.friendDiscoveryFlags);
                    break;
                case /* repeated fixed64 activity_restricted_guild_ids */ 13:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.activityRestrictedGuildIds.push(reader.fixed64().toString());
                    else
                        message.activityRestrictedGuildIds.push(reader.fixed64().toString());
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildActivityStatusRestrictionDefault default_guilds_activity_restricted */ 14:
                    message.defaultGuildsActivityRestricted = reader.int32();
                    break;
                case /* repeated fixed64 activity_joining_restricted_guild_ids */ 15:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.activityJoiningRestrictedGuildIds.push(reader.fixed64().toString());
                    else
                        message.activityJoiningRestrictedGuildIds.push(reader.fixed64().toString());
                    break;
                case /* repeated fixed64 message_request_restricted_guild_ids */ 16:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.messageRequestRestrictedGuildIds.push(reader.fixed64().toString());
                    else
                        message.messageRequestRestrictedGuildIds.push(reader.fixed64().toString());
                    break;
                case /* optional google.protobuf.BoolValue default_message_request_restricted */ 17:
                    message.defaultMessageRequestRestricted = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.defaultMessageRequestRestricted);
                    break;
                case /* optional google.protobuf.BoolValue drops_opted_out */ 18:
                    message.dropsOptedOut = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.dropsOptedOut);
                    break;
                case /* optional google.protobuf.BoolValue non_spam_retraining_opt_in */ 19:
                    message.nonSpamRetrainingOptIn = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.nonSpamRetrainingOptIn);
                    break;
                case /* optional google.protobuf.BoolValue family_center_enabled */ 20:
                    message.familyCenterEnabled = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.familyCenterEnabled);
                    break;
                case /* optional google.protobuf.BoolValue family_center_enabled_v2 */ 21:
                    message.familyCenterEnabledV2 = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.familyCenterEnabledV2);
                    break;
                case /* optional google.protobuf.BoolValue hide_legacy_username */ 22:
                    message.hideLegacyUsername = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.hideLegacyUsername);
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
        /* optional google.protobuf.BoolValue allow_activity_party_privacy_friends = 1; */
        if (message.allowActivityPartyPrivacyFriends)
            BoolValue.internalBinaryWrite(message.allowActivityPartyPrivacyFriends, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue allow_activity_party_privacy_voice_channel = 2; */
        if (message.allowActivityPartyPrivacyVoiceChannel)
            BoolValue.internalBinaryWrite(message.allowActivityPartyPrivacyVoiceChannel, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* repeated fixed64 restricted_guild_ids = 3; */
        if (message.restrictedGuildIds.length) {
            writer.tag(3, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.restrictedGuildIds.length; i++)
                writer.fixed64(message.restrictedGuildIds[i]);
            writer.join();
        }
        /* bool default_guilds_restricted = 4; */
        if (message.defaultGuildsRestricted !== false)
            writer.tag(4, WireType.Varint).bool(message.defaultGuildsRestricted);
        /* bool allow_accessibility_detection = 7; */
        if (message.allowAccessibilityDetection !== false)
            writer.tag(7, WireType.Varint).bool(message.allowAccessibilityDetection);
        /* optional google.protobuf.BoolValue detect_platform_accounts = 8; */
        if (message.detectPlatformAccounts)
            BoolValue.internalBinaryWrite(message.detectPlatformAccounts, writer.tag(8, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue passwordless = 9; */
        if (message.passwordless)
            BoolValue.internalBinaryWrite(message.passwordless, writer.tag(9, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue contact_sync_enabled = 10; */
        if (message.contactSyncEnabled)
            BoolValue.internalBinaryWrite(message.contactSyncEnabled, writer.tag(10, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value friend_source_flags = 11; */
        if (message.friendSourceFlags)
            UInt32Value.internalBinaryWrite(message.friendSourceFlags, writer.tag(11, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value friend_discovery_flags = 12; */
        if (message.friendDiscoveryFlags)
            UInt32Value.internalBinaryWrite(message.friendDiscoveryFlags, writer.tag(12, WireType.LengthDelimited).fork(), options).join();
        /* repeated fixed64 activity_restricted_guild_ids = 13; */
        if (message.activityRestrictedGuildIds.length) {
            writer.tag(13, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.activityRestrictedGuildIds.length; i++)
                writer.fixed64(message.activityRestrictedGuildIds[i]);
            writer.join();
        }
        /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildActivityStatusRestrictionDefault default_guilds_activity_restricted = 14; */
        if (message.defaultGuildsActivityRestricted !== 0)
            writer.tag(14, WireType.Varint).int32(message.defaultGuildsActivityRestricted);
        /* repeated fixed64 activity_joining_restricted_guild_ids = 15; */
        if (message.activityJoiningRestrictedGuildIds.length) {
            writer.tag(15, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.activityJoiningRestrictedGuildIds.length; i++)
                writer.fixed64(message.activityJoiningRestrictedGuildIds[i]);
            writer.join();
        }
        /* repeated fixed64 message_request_restricted_guild_ids = 16; */
        if (message.messageRequestRestrictedGuildIds.length) {
            writer.tag(16, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.messageRequestRestrictedGuildIds.length; i++)
                writer.fixed64(message.messageRequestRestrictedGuildIds[i]);
            writer.join();
        }
        /* optional google.protobuf.BoolValue default_message_request_restricted = 17; */
        if (message.defaultMessageRequestRestricted)
            BoolValue.internalBinaryWrite(message.defaultMessageRequestRestricted, writer.tag(17, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue drops_opted_out = 18; */
        if (message.dropsOptedOut)
            BoolValue.internalBinaryWrite(message.dropsOptedOut, writer.tag(18, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue non_spam_retraining_opt_in = 19; */
        if (message.nonSpamRetrainingOptIn)
            BoolValue.internalBinaryWrite(message.nonSpamRetrainingOptIn, writer.tag(19, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue family_center_enabled = 20; */
        if (message.familyCenterEnabled)
            BoolValue.internalBinaryWrite(message.familyCenterEnabled, writer.tag(20, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue family_center_enabled_v2 = 21; */
        if (message.familyCenterEnabledV2)
            BoolValue.internalBinaryWrite(message.familyCenterEnabledV2, writer.tag(21, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue hide_legacy_username = 22; */
        if (message.hideLegacyUsername)
            BoolValue.internalBinaryWrite(message.hideLegacyUsername, writer.tag(22, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.PrivacySettings
 */
export const PreloadedUserSettings_PrivacySettings = new PreloadedUserSettings_PrivacySettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_DebugSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.DebugSettings", [
            { no: 1, name: "rtc_panel_show_voice_states", kind: "message", T: () => BoolValue }
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
                case /* optional google.protobuf.BoolValue rtc_panel_show_voice_states */ 1:
                    message.rtcPanelShowVoiceStates = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.rtcPanelShowVoiceStates);
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
        /* optional google.protobuf.BoolValue rtc_panel_show_voice_states = 1; */
        if (message.rtcPanelShowVoiceStates)
            BoolValue.internalBinaryWrite(message.rtcPanelShowVoiceStates, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.DebugSettings
 */
export const PreloadedUserSettings_DebugSettings = new PreloadedUserSettings_DebugSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_GameLibrarySettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GameLibrarySettings", [
            { no: 1, name: "install_shortcut_desktop", kind: "message", T: () => BoolValue },
            { no: 2, name: "install_shortcut_start_menu", kind: "message", T: () => BoolValue },
            { no: 3, name: "disable_games_tab", kind: "message", T: () => BoolValue }
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
                case /* optional google.protobuf.BoolValue install_shortcut_desktop */ 1:
                    message.installShortcutDesktop = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.installShortcutDesktop);
                    break;
                case /* optional google.protobuf.BoolValue install_shortcut_start_menu */ 2:
                    message.installShortcutStartMenu = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.installShortcutStartMenu);
                    break;
                case /* optional google.protobuf.BoolValue disable_games_tab */ 3:
                    message.disableGamesTab = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.disableGamesTab);
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
        /* optional google.protobuf.BoolValue install_shortcut_desktop = 1; */
        if (message.installShortcutDesktop)
            BoolValue.internalBinaryWrite(message.installShortcutDesktop, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue install_shortcut_start_menu = 2; */
        if (message.installShortcutStartMenu)
            BoolValue.internalBinaryWrite(message.installShortcutStartMenu, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue disable_games_tab = 3; */
        if (message.disableGamesTab)
            BoolValue.internalBinaryWrite(message.disableGamesTab, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GameLibrarySettings
 */
export const PreloadedUserSettings_GameLibrarySettings = new PreloadedUserSettings_GameLibrarySettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_CustomStatus$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CustomStatus", [
            { no: 1, name: "text", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "emoji_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/ },
            { no: 3, name: "emoji_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "expires_at_ms", kind: "scalar", T: 6 /*ScalarType.FIXED64*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.text = "";
        message.emojiId = "0";
        message.emojiName = "";
        message.expiresAtMs = "0";
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string text */ 1:
                    message.text = reader.string();
                    break;
                case /* fixed64 emoji_id */ 2:
                    message.emojiId = reader.fixed64().toString();
                    break;
                case /* string emoji_name */ 3:
                    message.emojiName = reader.string();
                    break;
                case /* fixed64 expires_at_ms */ 4:
                    message.expiresAtMs = reader.fixed64().toString();
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
        /* string text = 1; */
        if (message.text !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.text);
        /* fixed64 emoji_id = 2; */
        if (message.emojiId !== "0")
            writer.tag(2, WireType.Bit64).fixed64(message.emojiId);
        /* string emoji_name = 3; */
        if (message.emojiName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.emojiName);
        /* fixed64 expires_at_ms = 4; */
        if (message.expiresAtMs !== "0")
            writer.tag(4, WireType.Bit64).fixed64(message.expiresAtMs);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CustomStatus
 */
export const PreloadedUserSettings_CustomStatus = new PreloadedUserSettings_CustomStatus$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_StatusSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.StatusSettings", [
            { no: 1, name: "status", kind: "message", T: () => StringValue },
            { no: 2, name: "custom_status", kind: "message", T: () => PreloadedUserSettings_CustomStatus },
            { no: 3, name: "show_current_game", kind: "message", T: () => BoolValue }
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
                case /* optional google.protobuf.StringValue status */ 1:
                    message.status = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.status);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CustomStatus custom_status */ 2:
                    message.customStatus = PreloadedUserSettings_CustomStatus.internalBinaryRead(reader, reader.uint32(), options, message.customStatus);
                    break;
                case /* optional google.protobuf.BoolValue show_current_game */ 3:
                    message.showCurrentGame = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.showCurrentGame);
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
        /* optional google.protobuf.StringValue status = 1; */
        if (message.status)
            StringValue.internalBinaryWrite(message.status, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CustomStatus custom_status = 2; */
        if (message.customStatus)
            PreloadedUserSettings_CustomStatus.internalBinaryWrite(message.customStatus, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue show_current_game = 3; */
        if (message.showCurrentGame)
            BoolValue.internalBinaryWrite(message.showCurrentGame, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.StatusSettings
 */
export const PreloadedUserSettings_StatusSettings = new PreloadedUserSettings_StatusSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_LocalizationSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.LocalizationSettings", [
            { no: 1, name: "locale", kind: "message", T: () => StringValue },
            { no: 2, name: "timezone_offset", kind: "message", T: () => Int32Value }
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
                case /* optional google.protobuf.StringValue locale */ 1:
                    message.locale = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.locale);
                    break;
                case /* optional google.protobuf.Int32Value timezone_offset */ 2:
                    message.timezoneOffset = Int32Value.internalBinaryRead(reader, reader.uint32(), options, message.timezoneOffset);
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
        /* optional google.protobuf.StringValue locale = 1; */
        if (message.locale)
            StringValue.internalBinaryWrite(message.locale, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.Int32Value timezone_offset = 2; */
        if (message.timezoneOffset)
            Int32Value.internalBinaryWrite(message.timezoneOffset, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.LocalizationSettings
 */
export const PreloadedUserSettings_LocalizationSettings = new PreloadedUserSettings_LocalizationSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ClientThemeSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ClientThemeSettings", [
            { no: 2, name: "background_gradient_preset_id", kind: "message", T: () => UInt32Value }
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
                case /* optional google.protobuf.UInt32Value background_gradient_preset_id */ 2:
                    message.backgroundGradientPresetId = UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.backgroundGradientPresetId);
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
        /* optional google.protobuf.UInt32Value background_gradient_preset_id = 2; */
        if (message.backgroundGradientPresetId)
            UInt32Value.internalBinaryWrite(message.backgroundGradientPresetId, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ClientThemeSettings
 */
export const PreloadedUserSettings_ClientThemeSettings = new PreloadedUserSettings_ClientThemeSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_AppearanceSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AppearanceSettings", [
            { no: 1, name: "theme", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Theme", PreloadedUserSettings_Theme] },
            { no: 2, name: "developer_mode", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "client_theme_settings", kind: "message", T: () => PreloadedUserSettings_ClientThemeSettings },
            { no: 4, name: "mobile_redesign_disabled", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "channel_list_layout", kind: "message", T: () => StringValue },
            { no: 7, name: "message_previews", kind: "message", T: () => StringValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.theme = 0;
        message.developerMode = false;
        message.mobileRedesignDisabled = false;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Theme theme */ 1:
                    message.theme = reader.int32();
                    break;
                case /* bool developer_mode */ 2:
                    message.developerMode = reader.bool();
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ClientThemeSettings client_theme_settings */ 3:
                    message.clientThemeSettings = PreloadedUserSettings_ClientThemeSettings.internalBinaryRead(reader, reader.uint32(), options, message.clientThemeSettings);
                    break;
                case /* bool mobile_redesign_disabled */ 4:
                    message.mobileRedesignDisabled = reader.bool();
                    break;
                case /* optional google.protobuf.StringValue channel_list_layout */ 6:
                    message.channelListLayout = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.channelListLayout);
                    break;
                case /* optional google.protobuf.StringValue message_previews */ 7:
                    message.messagePreviews = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.messagePreviews);
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
        /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Theme theme = 1; */
        if (message.theme !== 0)
            writer.tag(1, WireType.Varint).int32(message.theme);
        /* bool developer_mode = 2; */
        if (message.developerMode !== false)
            writer.tag(2, WireType.Varint).bool(message.developerMode);
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ClientThemeSettings client_theme_settings = 3; */
        if (message.clientThemeSettings)
            PreloadedUserSettings_ClientThemeSettings.internalBinaryWrite(message.clientThemeSettings, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* bool mobile_redesign_disabled = 4; */
        if (message.mobileRedesignDisabled !== false)
            writer.tag(4, WireType.Varint).bool(message.mobileRedesignDisabled);
        /* optional google.protobuf.StringValue channel_list_layout = 6; */
        if (message.channelListLayout)
            StringValue.internalBinaryWrite(message.channelListLayout, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue message_previews = 7; */
        if (message.messagePreviews)
            StringValue.internalBinaryWrite(message.messagePreviews, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AppearanceSettings
 */
export const PreloadedUserSettings_AppearanceSettings = new PreloadedUserSettings_AppearanceSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_GuildFolder$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildFolder", [
            { no: 1, name: "guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/ },
            { no: 2, name: "id", kind: "message", T: () => Int64Value },
            { no: 3, name: "name", kind: "message", T: () => StringValue },
            { no: 4, name: "color", kind: "message", T: () => UInt64Value }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.guildIds = [];
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated fixed64 guild_ids */ 1:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.guildIds.push(reader.fixed64().toString());
                    else
                        message.guildIds.push(reader.fixed64().toString());
                    break;
                case /* optional google.protobuf.Int64Value id */ 2:
                    message.id = Int64Value.internalBinaryRead(reader, reader.uint32(), options, message.id);
                    break;
                case /* optional google.protobuf.StringValue name */ 3:
                    message.name = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.name);
                    break;
                case /* optional google.protobuf.UInt64Value color */ 4:
                    message.color = UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.color);
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
        /* repeated fixed64 guild_ids = 1; */
        if (message.guildIds.length) {
            writer.tag(1, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.guildIds.length; i++)
                writer.fixed64(message.guildIds[i]);
            writer.join();
        }
        /* optional google.protobuf.Int64Value id = 2; */
        if (message.id)
            Int64Value.internalBinaryWrite(message.id, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue name = 3; */
        if (message.name)
            StringValue.internalBinaryWrite(message.name, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt64Value color = 4; */
        if (message.color)
            UInt64Value.internalBinaryWrite(message.color, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildFolder
 */
export const PreloadedUserSettings_GuildFolder = new PreloadedUserSettings_GuildFolder$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_GuildFolders$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildFolders", [
            { no: 1, name: "folders", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PreloadedUserSettings_GuildFolder },
            { no: 2, name: "guild_positions", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.folders = [];
        message.guildPositions = [];
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildFolder folders */ 1:
                    message.folders.push(PreloadedUserSettings_GuildFolder.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated fixed64 guild_positions */ 2:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.guildPositions.push(reader.fixed64().toString());
                    else
                        message.guildPositions.push(reader.fixed64().toString());
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
        /* repeated discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildFolder folders = 1; */
        for (let i = 0; i < message.folders.length; i++)
            PreloadedUserSettings_GuildFolder.internalBinaryWrite(message.folders[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated fixed64 guild_positions = 2; */
        if (message.guildPositions.length) {
            writer.tag(2, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.guildPositions.length; i++)
                writer.fixed64(message.guildPositions[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.GuildFolders
 */
export const PreloadedUserSettings_GuildFolders = new PreloadedUserSettings_GuildFolders$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_FavoriteChannel$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.FavoriteChannel", [
            { no: 1, name: "nickname", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "type", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.FavoriteChannelType", PreloadedUserSettings_FavoriteChannelType] },
            { no: 3, name: "position", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "parent_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.nickname = "";
        message.type = 0;
        message.position = 0;
        message.parentId = "0";
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string nickname */ 1:
                    message.nickname = reader.string();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.FavoriteChannelType type */ 2:
                    message.type = reader.int32();
                    break;
                case /* uint32 position */ 3:
                    message.position = reader.uint32();
                    break;
                case /* fixed64 parent_id */ 4:
                    message.parentId = reader.fixed64().toString();
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
        /* string nickname = 1; */
        if (message.nickname !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.nickname);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.FavoriteChannelType type = 2; */
        if (message.type !== 0)
            writer.tag(2, WireType.Varint).int32(message.type);
        /* uint32 position = 3; */
        if (message.position !== 0)
            writer.tag(3, WireType.Varint).uint32(message.position);
        /* fixed64 parent_id = 4; */
        if (message.parentId !== "0")
            writer.tag(4, WireType.Bit64).fixed64(message.parentId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.FavoriteChannel
 */
export const PreloadedUserSettings_FavoriteChannel = new PreloadedUserSettings_FavoriteChannel$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_Favorites$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Favorites", [
            { no: 1, name: "favorite_channels", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => PreloadedUserSettings_FavoriteChannel } },
            { no: 2, name: "muted", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.favoriteChannels = {};
        message.muted = false;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.FavoriteChannel> favorite_channels */ 1:
                    this.binaryReadMap1(message.favoriteChannels, reader, options);
                    break;
                case /* bool muted */ 2:
                    message.muted = reader.bool();
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
                    val = PreloadedUserSettings_FavoriteChannel.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Favorites.favorite_channels");
            }
        }
        map[key ?? "0"] = val ?? PreloadedUserSettings_FavoriteChannel.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.FavoriteChannel> favorite_channels = 1; */
        for (let k of globalThis.Object.keys(message.favoriteChannels)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.Bit64).fixed64(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            PreloadedUserSettings_FavoriteChannel.internalBinaryWrite(message.favoriteChannels[k], writer, options);
            writer.join().join();
        }
        /* bool muted = 2; */
        if (message.muted !== false)
            writer.tag(2, WireType.Varint).bool(message.muted);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.Favorites
 */
export const PreloadedUserSettings_Favorites = new PreloadedUserSettings_Favorites$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_AudioContextSetting$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioContextSetting", [
            { no: 1, name: "muted", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "volume", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 3, name: "modified_at", kind: "scalar", T: 6 /*ScalarType.FIXED64*/ },
            { no: 4, name: "soundboard_muted", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.muted = false;
        message.volume = 0;
        message.modifiedAt = "0";
        message.soundboardMuted = false;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool muted */ 1:
                    message.muted = reader.bool();
                    break;
                case /* float volume */ 2:
                    message.volume = reader.float();
                    break;
                case /* fixed64 modified_at */ 3:
                    message.modifiedAt = reader.fixed64().toString();
                    break;
                case /* bool soundboard_muted */ 4:
                    message.soundboardMuted = reader.bool();
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
        /* bool muted = 1; */
        if (message.muted !== false)
            writer.tag(1, WireType.Varint).bool(message.muted);
        /* float volume = 2; */
        if (message.volume !== 0)
            writer.tag(2, WireType.Bit32).float(message.volume);
        /* fixed64 modified_at = 3; */
        if (message.modifiedAt !== "0")
            writer.tag(3, WireType.Bit64).fixed64(message.modifiedAt);
        /* bool soundboard_muted = 4; */
        if (message.soundboardMuted !== false)
            writer.tag(4, WireType.Varint).bool(message.soundboardMuted);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioContextSetting
 */
export const PreloadedUserSettings_AudioContextSetting = new PreloadedUserSettings_AudioContextSetting$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_AudioSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioSettings", [
            { no: 1, name: "user", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => PreloadedUserSettings_AudioContextSetting } },
            { no: 2, name: "stream", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => PreloadedUserSettings_AudioContextSetting } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.user = {};
        message.stream = {};
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioContextSetting> user */ 1:
                    this.binaryReadMap1(message.user, reader, options);
                    break;
                case /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioContextSetting> stream */ 2:
                    this.binaryReadMap2(message.stream, reader, options);
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
                    val = PreloadedUserSettings_AudioContextSetting.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioSettings.user");
            }
        }
        map[key ?? "0"] = val ?? PreloadedUserSettings_AudioContextSetting.create();
    }
    binaryReadMap2(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.fixed64().toString();
                    break;
                case 2:
                    val = PreloadedUserSettings_AudioContextSetting.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioSettings.stream");
            }
        }
        map[key ?? "0"] = val ?? PreloadedUserSettings_AudioContextSetting.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioContextSetting> user = 1; */
        for (let k of globalThis.Object.keys(message.user)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.Bit64).fixed64(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            PreloadedUserSettings_AudioContextSetting.internalBinaryWrite(message.user[k], writer, options);
            writer.join().join();
        }
        /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioContextSetting> stream = 2; */
        for (let k of globalThis.Object.keys(message.stream)) {
            writer.tag(2, WireType.LengthDelimited).fork().tag(1, WireType.Bit64).fixed64(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            PreloadedUserSettings_AudioContextSetting.internalBinaryWrite(message.stream[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.AudioSettings
 */
export const PreloadedUserSettings_AudioSettings = new PreloadedUserSettings_AudioSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_CommunitiesSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CommunitiesSettings", [
            { no: 1, name: "disable_home_auto_nav", kind: "message", T: () => BoolValue }
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
                case /* optional google.protobuf.BoolValue disable_home_auto_nav */ 1:
                    message.disableHomeAutoNav = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.disableHomeAutoNav);
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
        /* optional google.protobuf.BoolValue disable_home_auto_nav = 1; */
        if (message.disableHomeAutoNav)
            BoolValue.internalBinaryWrite(message.disableHomeAutoNav, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.CommunitiesSettings
 */
export const PreloadedUserSettings_CommunitiesSettings = new PreloadedUserSettings_CommunitiesSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_BroadcastSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.BroadcastSettings", [
            { no: 1, name: "allow_friends", kind: "message", T: () => BoolValue },
            { no: 2, name: "allowed_guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/ },
            { no: 3, name: "allowed_user_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/ },
            { no: 4, name: "auto_broadcast", kind: "message", T: () => BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.allowedGuildIds = [];
        message.allowedUserIds = [];
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.BoolValue allow_friends */ 1:
                    message.allowFriends = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.allowFriends);
                    break;
                case /* repeated fixed64 allowed_guild_ids */ 2:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.allowedGuildIds.push(reader.fixed64().toString());
                    else
                        message.allowedGuildIds.push(reader.fixed64().toString());
                    break;
                case /* repeated fixed64 allowed_user_ids */ 3:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.allowedUserIds.push(reader.fixed64().toString());
                    else
                        message.allowedUserIds.push(reader.fixed64().toString());
                    break;
                case /* optional google.protobuf.BoolValue auto_broadcast */ 4:
                    message.autoBroadcast = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.autoBroadcast);
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
        /* optional google.protobuf.BoolValue allow_friends = 1; */
        if (message.allowFriends)
            BoolValue.internalBinaryWrite(message.allowFriends, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated fixed64 allowed_guild_ids = 2; */
        if (message.allowedGuildIds.length) {
            writer.tag(2, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.allowedGuildIds.length; i++)
                writer.fixed64(message.allowedGuildIds[i]);
            writer.join();
        }
        /* repeated fixed64 allowed_user_ids = 3; */
        if (message.allowedUserIds.length) {
            writer.tag(3, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.allowedUserIds.length; i++)
                writer.fixed64(message.allowedUserIds[i]);
            writer.join();
        }
        /* optional google.protobuf.BoolValue auto_broadcast = 4; */
        if (message.autoBroadcast)
            BoolValue.internalBinaryWrite(message.autoBroadcast, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.BroadcastSettings
 */
export const PreloadedUserSettings_BroadcastSettings = new PreloadedUserSettings_BroadcastSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ClipsSettings$Type extends MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ClipsSettings", [
            { no: 1, name: "allow_voice_recording", kind: "message", T: () => BoolValue }
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
                case /* optional google.protobuf.BoolValue allow_voice_recording */ 1:
                    message.allowVoiceRecording = BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.allowVoiceRecording);
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
        /* optional google.protobuf.BoolValue allow_voice_recording = 1; */
        if (message.allowVoiceRecording)
            BoolValue.internalBinaryWrite(message.allowVoiceRecording, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PreloadedUserSettings.ClipsSettings
 */
export const PreloadedUserSettings_ClipsSettings = new PreloadedUserSettings_ClipsSettings$Type();
