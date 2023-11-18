import EventEmitter from "./EventEmitter";
import { Invalidator, Subscriber, Unsubscriber, Updater, get, writable } from "./stores";

export class Jar<T> extends Map<string, T> {
	on: (event: string, listener: Function) => void;
	once: (event: string, listener: Function) => void;
	off: (event: string, listener: Function) => void;
	emit: (event: string, ...args: any[]) => void;
	offAll: (event?: string | undefined) => void;
	subscribe: (event: string, listener: Function) => Unsubscriber;
	constructor() {
		super();

		const evtM = new EventEmitter();
		this.on = evtM.on.bind(evtM);
		this.once = evtM.once.bind(evtM);
		this.off = evtM.off.bind(evtM);
		this.emit = evtM.emit.bind(evtM);
		this.offAll = evtM.offAll.bind(evtM);
		this.subscribe = evtM.subscribe.bind(evtM);
	}

	set(key: string, value: T) {
		super.set(key, value);
		this.emit("update", key, value);
		return this;
	}

	add(key: string, value: T) {
		return this.set(key, value);
	}

	delete(key: string): boolean {
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

export class WritableStore<T> {
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
		!shallowEqual(this.value, value) && this.set(value);
	}

	shallowUpdate(updater: Updater<T>) {
		const newVal = updater(this.value);
		!shallowEqual(this.value, newVal) && this.set(newVal);
	}

	/**
	 * recursively check if the value is different
	 */
	deepSet(value: T) {
		const shallow = shallowEqual(this.value, value);

		// if it's not shallow equal, then check if it's not deep equal
		// technically, shallow equal is faster compared to deep equal
		if (!shallow || !deepEqual(this.value, value)) this.set(value);
	}

	deepUpdate(updater: Updater<T>) {
		const newVal = updater(this.value);
		const shallow = shallowEqual(this.value, newVal);
		const shouldUpdate = !shallow || !deepEqual(this.value, newVal);

		if (shouldUpdate) this.set(newVal);
	}

	get value() {
		return get(this);
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
