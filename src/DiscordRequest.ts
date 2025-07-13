import { SuperProperties } from "./DiscordGateway";
import { DiscordSetup, CaptchaEvent } from "./DiscordSetup";
import { Config } from "./config";
import Deferred from "./lib/Deffered";
import EventEmitter from "./lib/EventEmitter";
import moment from "moment-timezone";

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

interface FirstChunkResponse {
	status: number;
	bytes: Uint8Array;
}

class ResponseFirstChunk {
	response: () => Promise<FirstChunkResponse>;

	constructor(public xhr: XMLHttpRequest) {
		const deffered = new Deferred<FirstChunkResponse>();

		this.response = () => deffered.promise;

		xhr.onprogress = function () {
			if (xhr.response) {
				const chunk = new Uint8Array(xhr.response || 0);

				const result = {
					bytes: chunk,
					status: xhr.status,
				};

				if (xhr.status < 200 || xhr.status >= 300) {
					deffered.reject(result);
				} else {
					deffered.resolve(result);
				}

				xhr.abort();
			}
		};

		xhr.onreadystatechange = function () {
			if (xhr.readyState > 1) {
				const byteView = new Uint8Array(xhr.response || 0);

				const result = {
					bytes: byteView,
					status: xhr.status,
				};

				if (xhr.status < 200 || xhr.status >= 300) {
					deffered.reject(result);
				} else {
					deffered.resolve(result);
				}
				xhr.abort(); // Stop further loading
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

const acceptLanguageHeader = navigator.languages.map((lang, i) => `${lang}${i === 0 ? "" : `;q=${(1 - i * 0.1).toFixed(1)}`}`).join(",");

export default class DiscordRequest {
	token: string | undefined;
	superProperties: string;
	setup: DiscordSetup | undefined;

	private timeZone: string;

	static get SuperProperties() {
		return SuperProperties;
	}

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
		this.timeZone = moment.tz.guess();
	}

	post<T = any>(url: string, props: RequestProps) {
		return new ResponsePost(this.request<T>("post", url, props));
	}

	get!: <T = any>(url: string, props: RequestProps) => Response<T>;
	patch!: <T = any>(url: string, props: RequestProps) => Response<T>;
	put!: <T = any>(url: string, props: RequestProps) => Response<T>;
	delete!: <T = any>(url: string, props: RequestProps) => Response<T>;

	/**
	 * this sends a get request and aborts it as soon as we get a response
	 * response() will be the status code
	 */
	getFirstChunk(url: string, props: Omit<RequestProps, "responseType">) {
		const isKai2 = !!(import.meta.env.KAIOS != 3 && navigator.mozApps);
		const [xhr, body] = this.createXHR("GET", url, {
			...props,
			responseType: isKai2 ? ("moz-chunked-arraybuffer" as any) : "arraybuffer",
		});

		const resp = new ResponseFirstChunk(xhr);

		xhr.send(body);

		return resp;
	}

	private createXHR(method: string, url: string, props: RequestProps) {
		// @ts-ignore: this should work, I have no idea why it's not working
		const xhr = new XMLHttpRequest();

		const _url = new URL(fullURL(url));

		const urlWithoutParams = _url.origin + _url.pathname;
		const paramsInit = Object.assign({}, props.search ?? {}, Object.fromEntries(_url.searchParams));
		const params = new URLSearchParams(paramsInit);

		const mergedURL = urlWithoutParams + (params.size ? "?" + params.toString() : "");

		xhr.open(method.toUpperCase(), mergedURL, true);

		// this causes an error on KaiOS 3.0 :(
		try {
			xhr.withCredentials = true;
		} catch {}

		const headers = {
			"Content-Type": "application/json",
			Authorization: this.token || null,
			// seems like mozAnon doesn't work on KaiOS v3
			Origin: "https://discord.com",
			"User-Agent": SuperProperties.browser_user_agent,
			Referer: "https://discord.com",
			"X-Debug-Options": "bugReporterEnabled",
			"X-Discord-Locale": navigator.language,
			"X-Super-Properties": this.superProperties,
			"X-Discord-Timezone": this.timeZone,
			TE: "trailers",
			Pragma: "no-cache",
			"Cache-Control": "no-cache",
			"Sec-Fetch-Dest": "empty",
			"Sec-Fetch-Mode": "cors",
			"Sec-Fetch-Site": "same-origin",
			Connection: "keep-alive",
			Accept: "*/*",
			"Accept-Language": acceptLanguageHeader,
			"Accept-Encoding": "gzip, deflate, br, zstd",
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
			if (typeof props.data === "string" || props.data instanceof Blob || props.data instanceof FormData) {
				body = props.data;
			} else {
				body = JSON.stringify(props.data);
			}
		}

		return [xhr, body] as const;
	}

	request<T = any>(method: string, url: string, props: RequestProps) {
		const [xhr, body] = this.createXHR(method, url, props);

		const resp = new Response<T>(xhr, {
			self: this,
			method,
			url,
			props,
		});

		xhr.send(body);

		return resp;
	}
}
