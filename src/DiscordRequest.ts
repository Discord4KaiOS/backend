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

export class RateLimitError extends Error {
	readonly start = performance.now();

	retryAfter = 10;

	constructor(public xhr: XMLHttpRequest) {
		super("RateLimitError");

		if (xhr.response?.retry_after) {
			this.retryAfter = Math.ceil(xhr.response.retry_after) + 1;
			return;
		}

		const fromHeader = xhr.getResponseHeader("Retry-After");
		if (fromHeader) {
			this.retryAfter = Math.ceil(Number(fromHeader)) + 1;
			return;
		}
	}

	private promise = null as Promise<void> | null;

	wait() {
		if (this.promise) return this.promise;

		const now = performance.now();

		if (now > this.start + this.retryAfter * 1000) {
			this.promise = Promise.resolve();
			return this.promise;
		}

		const time = this.start + this.retryAfter * 1000 - now;

		this.promise = new Promise((resolve) => setTimeout(resolve, time));
		return this.promise;
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
						// @ts-ignore
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

				if (xhr.status === 429) {
					deffered.reject(new RateLimitError(xhr));
					return;
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

URLSearchParams;

interface RequestProps {
	headers?: Record<string, string | null | undefined>;
	data?: object | string | FormData;
	responseType?: XMLHttpRequestResponseType;
	/**
	 * adds search params on the url, if the url already has search params, it will be overwritten by the search params present in the url
	 */
	search?: Record<string, string | any>;
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

const _string_superProperties = btoa(JSON.stringify(SuperProperties));

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

		this.superProperties = _string_superProperties;
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

		const _url = new URL(fullURL(url));

		const urlWithoutParams = _url.origin + _url.pathname;
		const paramsInit = Object.assign({}, props.search ?? {}, Object.fromEntries(_url.searchParams));
		const params = new URLSearchParams(paramsInit);

		const mergedURL = urlWithoutParams + (params.size ? "?" + params.toString() : "");

		xhr.open(method.toUpperCase(), mergedURL, true);

		const headers = {
			"Content-Type": "application/json",
			authorization: this.token || null,
			// seems like mozAnon doesn't work on KaiOS v3
			Origin: "https://discord.com",
			"User-Agent": SuperProperties.browser_user_agent,
			Referer: "https://discord.com",
			"X-Debug-Options": "bugReporterEnabled",
			"X-Super-Properties": this.superProperties,
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
