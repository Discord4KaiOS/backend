import type { Snowflake } from "discord-api-types/globals";
import Logger from "../Logger";
import EventEmitter, { EventMap } from "./EventEmitter";
import { Invalidator, Subscriber, Unsubscriber, Updater, get, writable } from "./stores";
import JSBI from "jsbi";

import type { Signal, signal } from "@preact/signals";

let _signal: null | typeof signal = null;

import("@preact/signals").then((s) => (_signal = s.signal)).catch(() => {});

let currentJarID = Symbol("jarID");

const JarIDEvent = Symbol("id");

export interface JarEventMap<K, V> extends EventMap {
	update: [K, V] | [K, void | undefined] | [K];
}

export enum ChannelType {
	/**
	 * A text channel within a guild
	 */
	GuildText = 0,
	/**
	 * A direct message between users
	 */
	DM = 1,
	/**
	 * A voice channel within a guild
	 */
	GuildVoice = 2,
	/**
	 * A direct message between multiple users
	 */
	GroupDM = 3,
	/**
	 * An organizational category that contains up to 50 channels
	 *
	 * See https://support.discord.com/hc/articles/115001580171
	 */
	GuildCategory = 4,
	/**
	 * A channel that users can follow and crosspost into their own guild
	 *
	 * See https://support.discord.com/hc/articles/360032008192
	 */
	GuildAnnouncement = 5,
	/**
	 * A temporary sub-channel within a Guild Announcement channel
	 */
	AnnouncementThread = 10,
	/**
	 * A temporary sub-channel within a Guild Text or Guild Forum channel
	 */
	PublicThread = 11,
	/**
	 * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
	 */
	PrivateThread = 12,
	/**
	 * A voice channel for hosting events with an audience
	 *
	 * See https://support.discord.com/hc/articles/1500005513722
	 */
	GuildStageVoice = 13,
	/**
	 * The channel in a Student Hub containing the listed servers
	 *
	 * See https://support.discord.com/hc/articles/4406046651927
	 */
	GuildDirectory = 14,
	/**
	 * A channel that can only contain threads
	 */
	GuildForum = 15,
	/**
	 * A channel like forum channels but contains media for server subscriptions
	 *
	 * See https://creator-support.discord.com/hc/articles/14346342766743
	 */
	GuildMedia = 16,
	/**
	 * A channel that users can follow and crosspost into their own guild
	 *
	 * @deprecated This is the old name for {@apilink ChannelType#GuildAnnouncement}
	 *
	 * See https://support.discord.com/hc/articles/360032008192
	 */
	GuildNews = 5,
	/**
	 * A temporary sub-channel within a Guild Announcement channel
	 *
	 * @deprecated This is the old name for {@apilink ChannelType#AnnouncementThread}
	 */
	GuildNewsThread = 10,
	/**
	 * A temporary sub-channel within a Guild Text channel
	 *
	 * @deprecated This is the old name for {@apilink ChannelType#PublicThread}
	 */
	GuildPublicThread = 11,
	/**
	 * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
	 *
	 * @deprecated This is the old name for {@apilink ChannelType#PrivateThread}
	 */
	GuildPrivateThread = 12,
}

export type GuildTextChannelType = Exclude<TextChannelType, ChannelType.DM | ChannelType.GroupDM>;

export type TextChannelType =
	| ChannelType.DM
	| ChannelType.GroupDM
	| ChannelType.GuildAnnouncement
	| ChannelType.PublicThread
	| ChannelType.PrivateThread
	| ChannelType.AnnouncementThread
	| ChannelType.GuildText
	| ChannelType.GuildForum
	| ChannelType.GuildVoice
	| ChannelType.GuildStageVoice
	| ChannelType.GuildMedia;

export class Jar<T, R = string, M extends JarEventMap<R, T> = JarEventMap<R, T>> extends Map<R, T> {
	readonly id: symbol = currentJarID;

	get [Symbol.toStringTag || Symbol()]() {
		return "Jar";
	}

	static emitter = new EventEmitter<{
		[JarIDEvent]: [symbol];
	}>();
	static logger = new Logger("Jar");
	on: <K extends keyof M>(event: K, listener: (...args: M[K]) => any) => void;
	once: <K extends keyof M>(event: K, listener: (...args: M[K]) => any) => void;
	off: <K extends keyof M>(event: K, listener: (...args: M[K]) => any) => void;
	emit: <K extends keyof M>(event: K, ...args: M[K]) => void;
	offAll: <K extends keyof M>(event?: K | undefined) => void;
	subscribe: <K extends keyof M>(event: K, listener: (...args: M[K]) => any) => Unsubscriber;

	static updateID() {
		return (currentJarID = Symbol("jarID"));
	}

	static offAllByCurrentID() {
		Jar.emitter.emit(JarIDEvent, currentJarID);
		return (currentJarID = Symbol("jarID"));
	}

	static offAllByID(id: symbol) {
		Jar.emitter.emit(JarIDEvent, id);
	}

	logger?: Logger;

	constructor() {
		super();

		const evtM = new EventEmitter<M>();
		this.on = evtM.on.bind(evtM);
		this.once = evtM.once.bind(evtM);
		this.off = evtM.off.bind(evtM);
		this.emit = evtM.emit.bind(evtM);
		this.offAll = evtM.offAll.bind(evtM);
		this.subscribe = evtM.subscribe.bind(evtM);

		Jar.emitter.on(JarIDEvent, (id) => {
			if (id === this.id) {
				evtM.offAll();
				(this.logger || Jar.logger)?.dbg("offAll", id, this)();
			}
		});

		this.init();
	}

	init() {}

	set(key: R, value: T) {
		super.set(key, value);
		this.emit("update", key, value);
		return this;
	}

	add(key: R, value: T) {
		return this.set(key, value);
	}

	delete(key: R): boolean {
		const result = super.delete(key);
		this.emit("update", key);
		return result;
	}

	list() {
		return [...super.values()];
	}
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function shallowEqual(objA: any, objB: any) {
	const { is, hasOwnProperty } = Object;

	if (is(objA, objB)) {
		return true;
	}

	if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
		return false;
	}

	var keysA = Object.keys(objA);
	var keysB = Object.keys(objB);

	if (keysA.length !== keysB.length) {
		return false;
	}

	// Test for A's keys different from B.
	for (var i = 0; i < keysA.length; i++) {
		if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
			return false;
		}
	}

	return true;
}

export const deepEqual = (a: any, b: any): boolean => {
	if (a === b) return true;
	if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
	if (!a || !b || (typeof a !== "object" && typeof b !== "object")) return a === b;
	if (a === null || a === undefined || b === null || b === undefined) return false;
	if (a.prototype !== b.prototype) return false;
	let keys = Object.keys(a);
	if (keys.length !== Object.keys(b).length) return false;
	return keys.every((k) => deepEqual(a[k], b[k]));
};

export function spread<U>(obj: U) {
	return <T>(t: T) => ({ ...t, ...obj });
}

export class WritableStore<T> {
	get [Symbol.toStringTag || Symbol()]() {
		return "WritableStore";
	}

	set: (this: void, value: T) => void;
	update: (this: void, updater: Updater<T>) => void;
	subscribe: (
		this: void,
		run: Subscriber<T>,
		invalidate?: Invalidator<T> | undefined
	) => Unsubscriber;

	constructor(value: T) {
		const { subscribe, set, update } = writable(value);

		this.set = set;
		this.update = update;
		this.subscribe = subscribe;
	}

	/**
	 * this is basically how React works lol
	 */
	shallowSet(value: T) {
		const update = !shallowEqual(this.value, value);
		update && this.set(value);
		return update;
	}

	shallowUpdate(updater: Updater<T>) {
		const newVal = updater(this.value);
		const update = !shallowEqual(this.value, newVal);
		update && this.set(newVal);
		return update;
	}

	/**
	 * recursively check if the value is different
	 */
	deepSet(value: T) {
		const update = !deepEqual(this.value, value);
		update && this.set(value);
		return update;
	}

	deepUpdate(updater: Updater<T>) {
		const newVal = updater(this.value);
		const shouldUpdate = !deepEqual(this.value, newVal);
		shouldUpdate && this.set(newVal);
		return shouldUpdate;
	}

	setStateDeep(val: Partial<T>) {
		const toCompare: Partial<T> = {};

		for (const key in val) {
			toCompare[key as keyof T] = this.value[key as keyof T];
		}

		const update = !deepEqual(toCompare, val);

		update && this.set({ ...this.value, ...val });
	}

	/**
	 * very similar to React
	 */
	setState(val: Partial<T>) {
		const toCompare: Partial<T> = {};

		for (const key in val) {
			toCompare[key as keyof T] = this.value[key as keyof T];
		}

		const update = !shallowEqual(toCompare, val);

		update && this.set({ ...this.value, ...val });
	}

	get value() {
		return get(this);
	}

	toJSON() {
		const jsonObj: any = {};

		Object.getOwnPropertyNames(this).forEach((key) => {
			const el = (this as any)[key];
			if (typeof el !== "function") jsonObj[key] = el;
		});

		jsonObj.value = this.value;

		return jsonObj;
	}

	private _signal: Signal<T> | null = null;

	/**
	 * @internal
	 * returns a preact signal value if available, returns null if not available,
	 * will assert a signal is available for convenience purposes
	 */
	get v(): T {
		if (this._signal) return this._signal.value;
		if (!_signal) return null as any;
		const signal = _signal(this.value);
		this.subscribe((val) => (signal.value = val));
		this._signal = signal;
		return signal.value;
	}
}

/**
 * get rid of undefined properties so that it doesn't affect the spread syntax
 */
export function toVoid<T>(obj: T): T {
	// to get rid of undefined shit without ruining stuff
	for (const key in obj) {
		const el = obj[key as keyof typeof obj];
		if (el === undefined) delete obj[key as keyof typeof obj];
	}

	return obj;
}

export function toQuery(obj: Record<string, any> = {}) {
	return Object.keys(obj)
		.filter((a) => obj[a] != null)
		.map((key) => `${key}=${encodeURIComponent(obj[key])}`)
		.join("&");
}

export const DISCORD_EPOCH = 1420070400000;

// Converts a snowflake ID string into a JS Date object using the provided epoch (in ms), or Discord's epoch if not provided
export function convertSnowflakeToDate(snowflake: Snowflake, epoch = DISCORD_EPOCH) {
	// Convert snowflake to BigInt to extract timestamp bits
	// https://discord.com/developers/docs/reference#snowflakes
	const milliseconds = JSBI.signedRightShift(JSBI.BigInt(snowflake), JSBI.BigInt(22));

	return new Date(JSBI.toNumber(milliseconds) + epoch);
}

convertSnowflakeToDate.DISCORD_EPOCH = DISCORD_EPOCH;
