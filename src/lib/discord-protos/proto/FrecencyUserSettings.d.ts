import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings
 */
export interface FrecencyUserSettings {
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.Versions versions = 1;
     */
    versions?: FrecencyUserSettings_Versions;
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIFs favorite_gifs = 2;
     */
    favoriteGifs?: FrecencyUserSettings_FavoriteGIFs;
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteStickers favorite_stickers = 3;
     */
    favoriteStickers?: FrecencyUserSettings_FavoriteStickers;
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.StickerFrecency sticker_frecency = 4;
     */
    stickerFrecency?: FrecencyUserSettings_StickerFrecency;
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteEmojis favorite_emojis = 5;
     */
    favoriteEmojis?: FrecencyUserSettings_FavoriteEmojis;
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.EmojiFrecency emoji_frecency = 6;
     */
    emojiFrecency?: FrecencyUserSettings_EmojiFrecency;
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationCommandFrecency application_command_frecency = 7;
     */
    applicationCommandFrecency?: FrecencyUserSettings_ApplicationCommandFrecency;
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteSoundboardSounds favorite_soundboard_sounds = 8;
     */
    favoriteSoundboardSounds?: FrecencyUserSettings_FavoriteSoundboardSounds;
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationFrecency application_frecency = 9;
     */
    applicationFrecency?: FrecencyUserSettings_ApplicationFrecency;
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.HeardSoundFrecency heard_sound_frecency = 10;
     */
    heardSoundFrecency?: FrecencyUserSettings_HeardSoundFrecency;
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.PlayedSoundFrecency played_sound_frecency = 11;
     */
    playedSoundFrecency?: FrecencyUserSettings_PlayedSoundFrecency;
    /**
     * @generated from protobuf field: optional discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GuildAndChannelFrecency guild_and_channel_frecency = 12;
     */
    guildAndChannelFrecency?: FrecencyUserSettings_GuildAndChannelFrecency;
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.Versions
 */
export interface FrecencyUserSettings_Versions {
    /**
     * @generated from protobuf field: uint32 client_version = 1;
     */
    clientVersion: number;
    /**
     * @generated from protobuf field: uint32 server_version = 2;
     */
    serverVersion: number;
    /**
     * @generated from protobuf field: uint32 data_version = 3;
     */
    dataVersion: number;
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIF
 */
export interface FrecencyUserSettings_FavoriteGIF {
    /**
     * @generated from protobuf field: discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GIFType format = 1;
     */
    format: FrecencyUserSettings_GIFType;
    /**
     * @generated from protobuf field: string src = 2;
     */
    src: string;
    /**
     * @generated from protobuf field: uint32 width = 3;
     */
    width: number;
    /**
     * @generated from protobuf field: uint32 height = 4;
     */
    height: number;
    /**
     * @generated from protobuf field: uint32 order = 5;
     */
    order: number;
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIFs
 */
export interface FrecencyUserSettings_FavoriteGIFs {
    /**
     * @generated from protobuf field: map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIF> gifs = 1;
     */
    gifs: {
        [key: string]: FrecencyUserSettings_FavoriteGIF;
    };
    /**
     * @generated from protobuf field: bool hide_tooltip = 2;
     */
    hideTooltip: boolean;
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteStickers
 */
export interface FrecencyUserSettings_FavoriteStickers {
    /**
     * @generated from protobuf field: repeated fixed64 sticker_ids = 1;
     */
    stickerIds: string[];
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem
 */
export interface FrecencyUserSettings_FrecencyItem {
    /**
     * @generated from protobuf field: uint32 total_uses = 1;
     */
    totalUses: number;
    /**
     * @generated from protobuf field: repeated uint64 recent_uses = 2;
     */
    recentUses: string[];
    /**
     * @generated from protobuf field: int32 frecency = 3;
     */
    frecency: number;
    /**
     * @generated from protobuf field: int32 score = 4;
     */
    score: number;
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.StickerFrecency
 */
export interface FrecencyUserSettings_StickerFrecency {
    /**
     * @generated from protobuf field: map<fixed64, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> stickers = 1;
     */
    stickers: {
        [key: string]: FrecencyUserSettings_FrecencyItem;
    };
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteEmojis
 */
export interface FrecencyUserSettings_FavoriteEmojis {
    /**
     * @generated from protobuf field: repeated string emojis = 1;
     */
    emojis: string[];
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.EmojiFrecency
 */
export interface FrecencyUserSettings_EmojiFrecency {
    /**
     * @generated from protobuf field: map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> emojis = 1;
     */
    emojis: {
        [key: string]: FrecencyUserSettings_FrecencyItem;
    };
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationCommandFrecency
 */
export interface FrecencyUserSettings_ApplicationCommandFrecency {
    /**
     * @generated from protobuf field: map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> application_commands = 1;
     */
    applicationCommands: {
        [key: string]: FrecencyUserSettings_FrecencyItem;
    };
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteSoundboardSounds
 */
export interface FrecencyUserSettings_FavoriteSoundboardSounds {
    /**
     * @generated from protobuf field: repeated fixed64 sound_ids = 1;
     */
    soundIds: string[];
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationFrecency
 */
export interface FrecencyUserSettings_ApplicationFrecency {
    /**
     * @generated from protobuf field: map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> applications = 1;
     */
    applications: {
        [key: string]: FrecencyUserSettings_FrecencyItem;
    };
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.HeardSoundFrecency
 */
export interface FrecencyUserSettings_HeardSoundFrecency {
    /**
     * @generated from protobuf field: map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> heard_sounds = 1;
     */
    heardSounds: {
        [key: string]: FrecencyUserSettings_FrecencyItem;
    };
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.PlayedSoundFrecency
 */
export interface FrecencyUserSettings_PlayedSoundFrecency {
    /**
     * @generated from protobuf field: map<string, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> played_sounds = 1;
     */
    playedSounds: {
        [key: string]: FrecencyUserSettings_FrecencyItem;
    };
}
/**
 * @generated from protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GuildAndChannelFrecency
 */
export interface FrecencyUserSettings_GuildAndChannelFrecency {
    /**
     * @generated from protobuf field: map<fixed64, discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem> guild_and_channels = 1;
     */
    guildAndChannels: {
        [key: string]: FrecencyUserSettings_FrecencyItem;
    };
}
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GIFType
 */
export declare enum FrecencyUserSettings_GIFType {
    /**
     * @generated from protobuf enum value: NONE = 0;
     */
    NONE = 0,
    /**
     * @generated from protobuf enum value: IMAGE = 1;
     */
    IMAGE = 1,
    /**
     * @generated from protobuf enum value: VIDEO = 2;
     */
    VIDEO = 2
}
declare class FrecencyUserSettings$Type extends MessageType<FrecencyUserSettings> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings>): FrecencyUserSettings;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings): FrecencyUserSettings;
    internalBinaryWrite(message: FrecencyUserSettings, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings
 */
export declare const FrecencyUserSettings: FrecencyUserSettings$Type;
declare class FrecencyUserSettings_Versions$Type extends MessageType<FrecencyUserSettings_Versions> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_Versions>): FrecencyUserSettings_Versions;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_Versions): FrecencyUserSettings_Versions;
    internalBinaryWrite(message: FrecencyUserSettings_Versions, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.Versions
 */
export declare const FrecencyUserSettings_Versions: FrecencyUserSettings_Versions$Type;
declare class FrecencyUserSettings_FavoriteGIF$Type extends MessageType<FrecencyUserSettings_FavoriteGIF> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_FavoriteGIF>): FrecencyUserSettings_FavoriteGIF;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_FavoriteGIF): FrecencyUserSettings_FavoriteGIF;
    internalBinaryWrite(message: FrecencyUserSettings_FavoriteGIF, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIF
 */
export declare const FrecencyUserSettings_FavoriteGIF: FrecencyUserSettings_FavoriteGIF$Type;
declare class FrecencyUserSettings_FavoriteGIFs$Type extends MessageType<FrecencyUserSettings_FavoriteGIFs> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_FavoriteGIFs>): FrecencyUserSettings_FavoriteGIFs;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_FavoriteGIFs): FrecencyUserSettings_FavoriteGIFs;
    private binaryReadMap1;
    internalBinaryWrite(message: FrecencyUserSettings_FavoriteGIFs, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteGIFs
 */
export declare const FrecencyUserSettings_FavoriteGIFs: FrecencyUserSettings_FavoriteGIFs$Type;
declare class FrecencyUserSettings_FavoriteStickers$Type extends MessageType<FrecencyUserSettings_FavoriteStickers> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_FavoriteStickers>): FrecencyUserSettings_FavoriteStickers;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_FavoriteStickers): FrecencyUserSettings_FavoriteStickers;
    internalBinaryWrite(message: FrecencyUserSettings_FavoriteStickers, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteStickers
 */
export declare const FrecencyUserSettings_FavoriteStickers: FrecencyUserSettings_FavoriteStickers$Type;
declare class FrecencyUserSettings_FrecencyItem$Type extends MessageType<FrecencyUserSettings_FrecencyItem> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_FrecencyItem>): FrecencyUserSettings_FrecencyItem;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_FrecencyItem): FrecencyUserSettings_FrecencyItem;
    internalBinaryWrite(message: FrecencyUserSettings_FrecencyItem, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FrecencyItem
 */
export declare const FrecencyUserSettings_FrecencyItem: FrecencyUserSettings_FrecencyItem$Type;
declare class FrecencyUserSettings_StickerFrecency$Type extends MessageType<FrecencyUserSettings_StickerFrecency> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_StickerFrecency>): FrecencyUserSettings_StickerFrecency;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_StickerFrecency): FrecencyUserSettings_StickerFrecency;
    private binaryReadMap1;
    internalBinaryWrite(message: FrecencyUserSettings_StickerFrecency, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.StickerFrecency
 */
export declare const FrecencyUserSettings_StickerFrecency: FrecencyUserSettings_StickerFrecency$Type;
declare class FrecencyUserSettings_FavoriteEmojis$Type extends MessageType<FrecencyUserSettings_FavoriteEmojis> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_FavoriteEmojis>): FrecencyUserSettings_FavoriteEmojis;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_FavoriteEmojis): FrecencyUserSettings_FavoriteEmojis;
    internalBinaryWrite(message: FrecencyUserSettings_FavoriteEmojis, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteEmojis
 */
export declare const FrecencyUserSettings_FavoriteEmojis: FrecencyUserSettings_FavoriteEmojis$Type;
declare class FrecencyUserSettings_EmojiFrecency$Type extends MessageType<FrecencyUserSettings_EmojiFrecency> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_EmojiFrecency>): FrecencyUserSettings_EmojiFrecency;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_EmojiFrecency): FrecencyUserSettings_EmojiFrecency;
    private binaryReadMap1;
    internalBinaryWrite(message: FrecencyUserSettings_EmojiFrecency, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.EmojiFrecency
 */
export declare const FrecencyUserSettings_EmojiFrecency: FrecencyUserSettings_EmojiFrecency$Type;
declare class FrecencyUserSettings_ApplicationCommandFrecency$Type extends MessageType<FrecencyUserSettings_ApplicationCommandFrecency> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_ApplicationCommandFrecency>): FrecencyUserSettings_ApplicationCommandFrecency;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_ApplicationCommandFrecency): FrecencyUserSettings_ApplicationCommandFrecency;
    private binaryReadMap1;
    internalBinaryWrite(message: FrecencyUserSettings_ApplicationCommandFrecency, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationCommandFrecency
 */
export declare const FrecencyUserSettings_ApplicationCommandFrecency: FrecencyUserSettings_ApplicationCommandFrecency$Type;
declare class FrecencyUserSettings_FavoriteSoundboardSounds$Type extends MessageType<FrecencyUserSettings_FavoriteSoundboardSounds> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_FavoriteSoundboardSounds>): FrecencyUserSettings_FavoriteSoundboardSounds;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_FavoriteSoundboardSounds): FrecencyUserSettings_FavoriteSoundboardSounds;
    internalBinaryWrite(message: FrecencyUserSettings_FavoriteSoundboardSounds, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.FavoriteSoundboardSounds
 */
export declare const FrecencyUserSettings_FavoriteSoundboardSounds: FrecencyUserSettings_FavoriteSoundboardSounds$Type;
declare class FrecencyUserSettings_ApplicationFrecency$Type extends MessageType<FrecencyUserSettings_ApplicationFrecency> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_ApplicationFrecency>): FrecencyUserSettings_ApplicationFrecency;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_ApplicationFrecency): FrecencyUserSettings_ApplicationFrecency;
    private binaryReadMap1;
    internalBinaryWrite(message: FrecencyUserSettings_ApplicationFrecency, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.ApplicationFrecency
 */
export declare const FrecencyUserSettings_ApplicationFrecency: FrecencyUserSettings_ApplicationFrecency$Type;
declare class FrecencyUserSettings_HeardSoundFrecency$Type extends MessageType<FrecencyUserSettings_HeardSoundFrecency> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_HeardSoundFrecency>): FrecencyUserSettings_HeardSoundFrecency;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_HeardSoundFrecency): FrecencyUserSettings_HeardSoundFrecency;
    private binaryReadMap1;
    internalBinaryWrite(message: FrecencyUserSettings_HeardSoundFrecency, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.HeardSoundFrecency
 */
export declare const FrecencyUserSettings_HeardSoundFrecency: FrecencyUserSettings_HeardSoundFrecency$Type;
declare class FrecencyUserSettings_PlayedSoundFrecency$Type extends MessageType<FrecencyUserSettings_PlayedSoundFrecency> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_PlayedSoundFrecency>): FrecencyUserSettings_PlayedSoundFrecency;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_PlayedSoundFrecency): FrecencyUserSettings_PlayedSoundFrecency;
    private binaryReadMap1;
    internalBinaryWrite(message: FrecencyUserSettings_PlayedSoundFrecency, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.PlayedSoundFrecency
 */
export declare const FrecencyUserSettings_PlayedSoundFrecency: FrecencyUserSettings_PlayedSoundFrecency$Type;
declare class FrecencyUserSettings_GuildAndChannelFrecency$Type extends MessageType<FrecencyUserSettings_GuildAndChannelFrecency> {
    constructor();
    create(value?: PartialMessage<FrecencyUserSettings_GuildAndChannelFrecency>): FrecencyUserSettings_GuildAndChannelFrecency;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FrecencyUserSettings_GuildAndChannelFrecency): FrecencyUserSettings_GuildAndChannelFrecency;
    private binaryReadMap1;
    internalBinaryWrite(message: FrecencyUserSettings_GuildAndChannelFrecency, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.FrecencyUserSettings.FrecencyUserSettings.GuildAndChannelFrecency
 */
export declare const FrecencyUserSettings_GuildAndChannelFrecency: FrecencyUserSettings_GuildAndChannelFrecency$Type;
export {};
