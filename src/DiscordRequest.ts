import { SuperProperties } from "./DiscordGateway";
import { DiscordSetup, CaptchaEvent } from "./DiscordSetup";
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

export class CaptchaError extends ResponseError {
	get [Symbol.toStringTag || Symbol()]() {
		return "CaptchaError";
	}
}

export class Response<T = any> {
	response: () => Promise<T>;

	constructor(public xhr: XMLHttpRequest, context: RequestContext) {
		const deffered = new Deferred<T>();

		this.response = () => deffered.promise;

		// reject if status is not 2xx
		xhr.onloadend = async () => {
			if (xhr.status < 200 || xhr.status >= 300) {
				// console.error("XHR ERROR OCCURED SHOULD BE REJECTED AS EXPECTED");
				const response = xhr.response;
				if ("captcha_sitekey" in response) {
					const c_evt = new CaptchaEvent(response.captcha_sitekey, response.captcha_service);
					context.self.setup?.emit("captcha", c_evt);
					try {
						const result = await c_evt.result;
						if (result === null) {
							throw new CaptchaError(xhr.status, xhr);
						}

						const retryWithCaptcha = context.self.request(context.method, context.url, {
							...context.props,
							headers: {
								...context.props.headers,
								"X-Captcha-Key": result,
							},
						});

						deffered.resolve(await retryWithCaptcha.response());
						return;
					} catch (e) {
						deffered.reject(e);
						return;
					}
				}

				deffered.reject(new ResponseError(xhr.status, xhr));
			} else {
				deffered.resolve(xhr.response);
			}
		};
	}
}

export class ResponsePost<T> extends EventEmitter<{
	progress: [ProgressEvent];
}> {
	response: () => Promise<T>;
	xhr: XMLHttpRequest;

	constructor(resp: Response<T>) {
		super();

		const { response, xhr } = resp;
		this.response = response;
		this.xhr = xhr;

		if (xhr.upload) xhr.upload.onprogress = this.emit.bind(this, "progress");
	}
}

interface RequestProps {
	headers?: Record<string, string | null | undefined>;
	data?: object | string | FormData;
	responseType?: XMLHttpRequestResponseType;
}

interface RequestContext {
	self: DiscordRequest;
	method: string;
	url: string;
	props: RequestProps;
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
	setup: DiscordSetup | undefined;

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
		xhr.open(method.toUpperCase(), fullURL(url), true);

		const headers = {
			"Content-Type": "application/json",
			authorization: this.token || null,
			// seems like mozAnon doesn't work on KaiOS v3
			Origin: "https://discord.com",
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

		let body: string | FormData | Blob | undefined;

		if (props.data) {
			if (
				typeof props.data === "string" ||
				props.data instanceof Blob ||
				props.data instanceof FormData
			) {
				body = props.data;
			} else {
				body = JSON.stringify(props.data);
			}
		}

		xhr.send(body);
		return new Response<T>(xhr, {
			self: this,
			method,
			url,
			props,
		});
	}
}
