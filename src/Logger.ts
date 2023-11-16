interface Log {
	type: string;
	message: any[];
	name: string;
	stack?: string;
}

type Console = typeof console;
type consoleTypes = keyof Console;
/**
 *
 * stolen from betterdiscord
 */
export default class Logger {
	static file: Log[] = [];
	static logToFile = false;

	constructor(public name: string, public color: string = "#3E82E5") {}

	stacktrace(message: string, error: any) {
		console.error(`%c[${this.name}]%c ${message}\n\n%c`, "color: #3a71c1; font-weight: 700;", "color: red; font-weight: 700;", "color: red;", error);
	}

	err(...args: any[]) {
		return this._log("error", ...args);
	}

	error(...args: any[]) {
		return this._log("error", ...args);
	}

	warn(...args: any[]) {
		return this._log("warn", ...args);
	}

	info(...args: any[]) {
		return this._log("info", ...args);
	}

	dbg(...args: any[]) {
		return this._log("debug", ...args);
	}

	debug(...args: any[]) {
		return this._log("debug", ...args);
	}

	log(...args: any[]) {
		return this._log("log", ...args);
	}

	private _log(type: consoleTypes, ...args: any[]) {
		const binded = Function.prototype.bind.call(console[type], console, `%c[${this.name}]%c`, `color: ${this.color}; font-weight: 700;`, "", ...args);

		if (Logger.logToFile) Logger.file.push({ name: this.name, type: String(type), message: args, stack: new Error().stack });

		return binded;
	}
}
