import Logger from "../Logger";

export type Unsubscriber = () => void;

export default class EventEmitter {
	private _events = new Map<string, Set<Function>>();
	static logger = new Logger("EventEmitter");

	on(event: string, listener: Function): void {
		this._events.set(event, (this._events.get(event) || new Set()).add(listener));
	}

	once(event: string, listener: Function) {
		const wrapper = (...args: any[]) => {
			listener(...args);
			this.off(event, wrapper);
		};
		this.on(event, wrapper);
	}

	off(event: string, listener: Function) {
		this._events.get(event)?.delete(listener);
	}

	subscribe(event: string, listener: Function): Unsubscriber {
		this.on(event, listener);
		return () => this.off(event, listener);
	}

	offAll(event?: string) {
		if (event) this._events.delete(event);
		else this._events.clear();
	}

	emit(event: string, ...args: any[]) {
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
