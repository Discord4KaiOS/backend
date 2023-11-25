// @ts-ignore
import prune from "json-prune";

interface Log {
	type: string;
	args: any[];
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
	static disabledNames: string[] = [];

	constructor(public name: string, public color: string = "#3E82E5") {}

	stacktrace(message: string, error: any) {
		console.error(
			`%c[${this.name}]%c ${message}\n\n%c`,
			"color: #3a71c1; font-weight: 700;",
			"color: red; font-weight: 700;",
			"color: red;",
			error
		);
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
		if (Logger.disabledNames.includes(this.name)) return () => {};

		const binded = Function.prototype.bind.call(
			console[type],
			console,
			`%c[${this.name}]%c`,
			`color: ${this.color}; font-weight: 700;`,
			"",
			...args
		);

		Logger.fileLog(this.name, String(type), args, new Error().stack);

		return binded;
	}

	static fileLog(name: string, type: string, args: any[], stack?: string) {
		setTimeout(() => {
			const obj = {
				name,
				type,
				args,
				stack,
			};

			Logger.file.push(obj);
		}, 5 + Math.floor(100 * Math.random()));
	}

	static exportFile() {
		return prune(Logger.file, {
			allProperties: true,
			inheritedProperties: true,
			// replacer: function r(value: any, defaultValue: any, circular: any) {
			// 	if (typeof value === "object" && !circular) {
			// 		return prune(value, {
			// 			allProperties: true,
			// 			inheritedProperties: true,
			// 			replacer: r,
			// 		});
			// 	}
			// 	return defaultValue;
			// },
		});
	}
}
