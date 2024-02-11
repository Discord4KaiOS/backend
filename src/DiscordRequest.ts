import { SuperProperties } from "./DiscordGateway";
import { Config } from "./config";
import Deferred from "./lib/Deffered";
import EventEmitter from "./lib/EventEmitter";

export class ResponseError extends Error {
	code?: number;
	errors?: object;

	get [Symbol.toStringTag || Symbol()]() {
		return "ResponseError";
	}

	constructor(public statusCode: number, public xhr: XMLHttpRequest) {
		super("ResponseError");

		try {
			if (xhr.responseText) {
				this.message = xhr.responseText;

				const json = JSON.parse(xhr.responseText);
				if (json.message) {
					this.message = json.message;
				}
				this.code = json.code;
				this.errors = json.errors;
			}
		} catch {}
	}
}

export class Response<T = any> {
	response: () => Promise<T>;

	constructor(public xhr: XMLHttpRequest) {
		const deffered = new Deferred<T>();

		this.response = () => deffered.promise;

		// reject if status is not 2xx
		xhr.onloadend = () => {
			if (xhr.status < 200 || xhr.status >= 300) {
				deffered.reject(new ResponseError(xhr.status, xhr));
			} else {
				deffered.resolve(xhr.response);
			}
		};
	}
}

export class ResponsePost<T> extends EventEmitter {
	response: () => Promise<T>;

	constructor(resp: Response<T>) {
		super();

		const { response } = resp;
		this.response = response;

		if (resp.xhr.upload) resp.xhr.upload.onprogress = this.emit.bind(this, "progress");
	}
}

interface RequestProps {
	headers?: Record<string, string | null | undefined>;
	data?: object | string | FormData;
	responseType?: XMLHttpRequestResponseType;
}

function fullURL(path = "/") {
	const base = "https://discord.com";

	if (path.startsWith("http")) {
		return path;
	}

	if (path.startsWith("/")) {
		return base + path;
	}

	return `${base}/api/v9/${path}`;
}

export default class DiscordRequest {
	token: string | undefined;
	superProperties: string;

	constructor(public config: Config) {
		this.token = config.token;
		// @ts-ignore: should work
		this.get = this.request.bind(this, "get");
		// @ts-ignore: should work
		this.patch = this.request.bind(this, "patch");
		// @ts-ignore: should work
		this.put = this.request.bind(this, "put");
		// @ts-ignore: should work
		this.delete = this.request.bind(this, "delete");

		this.superProperties = btoa(JSON.stringify(SuperProperties));
	}

	post<T = any>(url: string, props: RequestProps) {
		return new ResponsePost(this.request<T>("post", url, props));
	}

	get!: <T = any>(url: string, props: RequestProps) => Response<T>;
	patch!: <T = any>(url: string, props: RequestProps) => Response<T>;
	put!: <T = any>(url: string, props: RequestProps) => Response<T>;
	delete!: <T = any>(url: string, props: RequestProps) => Response<T>;

	request<T = any>(method: string, url: string, props: RequestProps) {
		// @ts-ignore: this should work, I have no idea why it's not working
		const xhr = new XMLHttpRequest({ mozAnon: true, mozSystem: true });
		xhr.open(method, fullURL(url), true);

		const headers = {
			"Content-Type": "application/json",
			authorization: this.token || null,
		};

		if (props.headers) {
			Object.assign(headers, props.headers);
		}

		Object.entries(headers).forEach(([a, b]) => {
			if (a && b) xhr.setRequestHeader(a, b.replace(/\r?\n|\r/g, "")); // nodejs http bug
		});

		xhr.responseType = "json";
		if (props.responseType) {
			xhr.responseType = props.responseType;
		}

		let body: string | FormData | undefined;

		if (props.data) {
			if (typeof props.data === "string") {
				body = props.data;
			} else if (props.data instanceof FormData) {
				body = props.data;
			} else {
				body = JSON.stringify(props.data);
			}
		}

		xhr.send(body);
		return new Response<T>(xhr);
	}
}
