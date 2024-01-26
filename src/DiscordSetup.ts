import DiscordClient from "./DiscordClient";
import DiscordRequest from "./DiscordRequest";
import Logger from "./Logger";
import { Config } from "./config";
import EventEmitter from "./lib/EventEmitter";
import { ClientReadState } from "./lib/types";

interface Props {
	config?: Config;
}

interface PropsSignIn extends Props {
	password: string;
	email: string;
}

interface PropsToken extends Props {
	token: string;
}

export class MFA extends EventEmitter {
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
	mfa: true;
	sms: false;
	ticket: string;
	backup: true;
	totp: true;
	webauthn: null;
}

interface Cache {
	readStates: ClientReadState[];
}

export default class DiscordSetup {
	result: DiscordClient | MFA | null = null;

	constructor(public cache: Cache) {}

	async login(props: PropsSignIn): Promise<DiscordClient | MFA>;
	async login(props: PropsToken): Promise<DiscordClient>;
	async login(props: PropsSignIn | PropsToken) {
		this.result = null;
		const logger = new Logger("setup");

		const config = props.config || {};

		const req = new DiscordRequest(config);

		if ("token" in props) {
			logger.dbg("token provided")();
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

		const loginReq = req.post<TokenResponse | MFAResponse>("auth/login", {
			data: {
				login: email,
				password,
				undelete: false,
				login_source: null,
				gift_code_sku_id: null,
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
}
