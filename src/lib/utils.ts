import { Invalidator, Subscriber, Unsubscriber, Updater, get, writable } from "./stores";

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

export class WritableStore<T> {
	set: (this: void, value: T) => void;
	update: (this: void, updater: Updater<T>) => void;
	subscribe: (this: void, run: Subscriber<T>, invalidate?: Invalidator<T> | undefined) => Unsubscriber;

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

	get value() {
		return get(this);
	}
}
