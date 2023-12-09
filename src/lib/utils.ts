import { Snowflake } from "discord-api-types/globals";
import Logger from "../Logger";
import { Config } from "../config";
import EventEmitter, { EventMap } from "./EventEmitter";
import { Invalidator, Subscriber, Unsubscriber, Updater, get, writable } from "./stores";
import JSBI from "jsbi";

let currentJarID = Symbol("jarID");

const JarIDEvent = Symbol("id");

export interface JarEventMap<K, V> extends EventMap {
	update: [K, V] | [K, void | undefined] | [K];
}

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

	static _configs_: Record<symbol, Config> = {};

	static setConfigByID(id: symbol, config: Config) {
		Jar._configs_[id] = config;
	}

	_config_<K extends keyof Config>(key: K): Config[K] {
		const config = Jar._configs_[this.id];
		if (!config) throw new Error("No config found");
		const val = config[key];
		if (val === undefined) throw new Error(`No config found for ${key}`);
		return config[key]!;
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
	}

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
