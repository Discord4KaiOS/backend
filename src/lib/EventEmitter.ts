import Logger from "../Logger";

export type Unsubscriber = () => void;

export interface EventMap {
	[x: string]: any[];
	[x: symbol]: any[];
}

export default class EventEmitter<T extends EventMap = EventMap> {
	private _events = new Map<keyof T, Set<Function>>();
	static logger = new Logger("EventEmitter");

	removeAllListeners() {
		this._events.clear();
	}

	on<K extends keyof T>(event: K, listener: (...args: T[K]) => any): void {
		this._events.set(event, (this._events.get(event) || new Set()).add(listener));
	}

	addEventListener<K extends keyof T>(event: K, listener: (...args: T[K]) => any): void {
		this.on(event, listener);
	}

	once<K extends keyof T>(event: K, listener: (...args: T[K]) => any) {
		const wrapper = (...args: any) => {
			listener(...args);
			this.off(event, wrapper);
		};
		this.on(event, wrapper);
	}

	off<K extends keyof T>(event: K, listener: (...args: T[K]) => any) {
		this._events.get(event)?.delete(listener);
	}

	removeEventListener<K extends keyof T>(event: K, listener: (...args: T[K]) => any) {
		this.off(event, listener);
	}

	subscribe<K extends keyof T>(event: K, listener: (...args: T[K]) => any): Unsubscriber {
		this.on(event, listener);
		return () => this.off(event, listener);
	}

	offAll<K extends keyof T>(event?: K) {
		if (event) this._events.delete(event);
		else this._events.clear();
	}

	emit<K extends keyof T>(event: K, ...args: T[K]) {
		const err = (e: any) => {
			EventEmitter.logger.err("unhandled error in event listener", e);
		};
		this._events.get("*")?.forEach((listener) => {
			try {
				listener(event, ...args);
			} catch (e) {
				err(e);
			}
		});
		this._events.get(event)?.forEach((listener) => {
			try {
				listener(...args);
			} catch (e) {
				err(e);
			}
		});
	}
}
