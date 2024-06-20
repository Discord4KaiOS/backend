import DiscordClient from "./DiscordClient";
import DiscordRequest from "./DiscordRequest";
import Logger from "./Logger";
import { Config } from "./config";
import EventEmitter from "./lib/EventEmitter";

interface Props {
	config?: Config;
	/**
	 * Add headers necessary for discord's fingerprinting
	 * @default true
	 */
	fingerprint?: boolean;
}

interface PropsSignIn extends Props {
	password: string;
	email: string;
}

interface PropsToken extends Props {
	token: string;
}

export class MFA extends EventEmitter<{
	auth: [DiscordClient];
}> {
	get [Symbol.toStringTag || Symbol()]() {
		return "MFA";
	}

	constructor(public req: DiscordRequest, public ticket: string, public config: Config) {
		super();
	}
	async auth(code: string) {
		const len = code.length;

		if (code === "" || isNaN(+code) || len < 0 || len > 8) {
			throw new Error("Invalid code");
		}

		/*

    {
			code: "383837",
			ticket: "ticketToken",
			login_source: null,
			gift_code_sku_id: null,
		}
		
    */
		const totpResp = await this.req
			.post<TokenResponse>("auth/mfa/totp", {
				data: {
					code,
					ticket: this.ticket,
					login_source: null,
					gift_code_sku_id: null,
				},
			})
			.response();

		const client = new DiscordClient(this.req, totpResp.token, this.config);
		this.emit("auth", client);
		return client;
	}
}

interface TokenResponse {
	user_id: string;
	token: string;
	user_settings: { locale: string; theme: "dark" | "light" };
}

interface MFAResponse {
	user_id: string;
	mfa: boolean;
	sms: boolean;
	ticket: string;
	backup: boolean;
	totp: boolean;
	webauthn: null;
}

interface Cache {}

export class CaptchaEvent {
	readonly type = "captcha";

	/**
	 * hidden
	 * @internal
	 * @deprecated
	 */
	result: string | Promise<string> | null = null;

	constructor(readonly sitekey: string, readonly service: string) {}

	register(captcha_key: string | Promise<string>) {
		this.result = captcha_key;
	}
}

export class InvalidTokenError extends Error {
	name = "InvalidTokenError";
	message = "token failed to authenticate";
}

export class DiscordSetup extends EventEmitter<{
	captcha: [CaptchaEvent];
}> {
	result: DiscordClient | MFA | null = null;

	constructor(public cache?: Cache) {
		super();
	}

	/**

{
	message: "Invalid Form Body",
	code: 50035,
	errors: {
		login: { _errors: [{ code: "INVALID_LOGIN", message: "Login or password is invalid." }] },
		password: { _errors: [{ code: "INVALID_LOGIN", message: "Login or password is invalid." }] },
	},
}


create a login error with this name

{
	message: "Invalid Form Body",
	code: 50035,
	errors: {
		login: {
			_errors: [
				{
					code: "ACCOUNT_LOGIN_VERIFICATION_EMAIL",
					message: "New login location detected, please check your e-mail.",
				},
			],
		},
	},
}
	*/

	/**
	 * shit probably useful:
	 * - `"X-Discord-Locale": "en-US"`
	 * - `"X-Discord-Timezone": "Asia/Manila"`
	 */
	headers: Record<string, string> = {};

	fingerprint = "";

	request?: DiscordRequest;

	async login(props: PropsSignIn): Promise<DiscordClient | MFA>;
	async login(props: PropsToken): Promise<DiscordClient>;
	async login(props: PropsSignIn | PropsToken) {
		this.result = null;

		const shouldFingerPrint = props.fingerprint ?? true;

		const logger = new Logger("setup");

		const config = props.config || {};

		const req = new DiscordRequest(config);
		this.request = req;
		req.setup = this;

		const fingerprintHeaders = shouldFingerPrint
			? {
					"X-Super-Properties": req.superProperties,
					"X-Debug-Options": "bugReporterEnabled",
			  }
			: null;

		if ("token" in props) {
			logger.dbg("token provided")();

			logger.dbg("validating token...")();

			try {
				await req
					.get("users/@me", {
						headers: {
							authorization: props.token,
						},
					})
					.response();
			} catch {
				this.result = null;
				throw new InvalidTokenError();
			}

			return (this.result = new DiscordClient(req, props.token, config));
		}

		const { email, password } = props;

		/*
  intercepted 11/16/2023

  login postReq

  {
		login: "email";
		password: "password";
		undelete: false;
		login_source: null;
		gift_code_sku_id: null;
	}
  */

		// weird fingerprint shit i learned
		// https://git.srht.taylor.fish/~taylor/harmony/tree/master/harmony/discord.py
		//
		if (shouldFingerPrint && !this.fingerprint) {
			const experimentsReq = req.get("experiments", {
				headers: {
					"X-Context-Properties": "eyJsb2NhdGlvbiI6IkxvZ2luIn0=", // base64 of '{"location":"Login"}' ,
					...fingerprintHeaders,
					...this.headers,
				},
			});

			const result = await experimentsReq.response();

			if ("fingerprint" in result) this.fingerprint = result.fingerprint;
		}

		const loginReq = req.post<TokenResponse | MFAResponse>("auth/login", {
			data: {
				login: email,
				password,
				undelete: false,
				login_source: null,
				gift_code_sku_id: null,
			},
			headers: {
				"X-Fingerprint": this.fingerprint,
				...fingerprintHeaders,
				...this.headers,
			},
		});

		/*
  intercepted 11/16/2023

  MFA response

  {
		user_id: "user_id",
		mfa: true,
		sms: false,
		ticket: "ticketToken",
		backup: true,
		totp: true,
		webauthn: null,
	}
  
  */
		const loginResp = await loginReq.response();

		if ("mfa" in loginResp) {
			return (this.result = new MFA(req, loginResp.ticket, config));
		}

		return (this.result = new DiscordClient(req, loginResp.token, config));
	}

	logout() {
		const req = this.request;
		const token = this.request?.token;
		if (token && req) {
			return req.post("auth/logout", {
				data: { provider: null, voip_provider: null },
				headers: {
					"X-Super-Properties": req.superProperties,
					"X-Debug-Options": "bugReporterEnabled",
				},
			});
		}

		throw new Error("Apparently login didn't happen?");
	}
}

/**
 * quick setup
 *
 *  */
export async function setup(props: PropsSignIn): Promise<DiscordClient | MFA>;
export async function setup(props: PropsToken): Promise<DiscordClient>;
export async function setup(props: PropsSignIn | PropsToken) {
	return new DiscordSetup().login(props as any);
}
