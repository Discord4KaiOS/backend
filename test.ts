/// <reference types="bun-types" />

import { appendFile } from "fs/promises";
import { DiscordClient, DiscordGuild, DiscordRelationship, MFA, setup } from "./index";
// @ts-ignore
import XMLHttpRequest from "./scripts/xhr.js";
import Logger from "./src/Logger.js";
import * as utils from "./src/lib/utils.js";

const logger = new Logger("test.ts");

global.XMLHttpRequest = XMLHttpRequest as any;

if (global.lastResult) {
	const r = global.lastResult as DiscordClient;
	r.Gateway.close();
}

function setToken(token: string) {
	appendFile(".env", `\nTOKEN=${token}`);
}

const spread = (
	Bun.env.TOKEN
		? {
				token: Bun.env.TOKEN as string,
		  }
		: {
				email: Bun.env.EMAIL as string,
				password: Bun.env.PASSWORD as string,
		  }
) as any;

logger.dbg("setup start!")();
let result = await setup({
	...spread,
	config: {
		debug: true,
	},
});

global.lastResult = result;

if (result instanceof MFA) {
	// do shit
} else {
	const client = await result.getClient();

	global.client = client;

	client.relationships.forEach((e) => {
		e.subscribe((stat) => {
			logger.dbg(
				"DiscordRelationshipChange",
				e.user?.value.global_name,
				stat.type,
				stat.nickname
			)();
		});
	});

	client.relationships.on("update", (key, e: DiscordRelationship) => {
		e.subscribe((stat) => {
			logger.dbg(
				"DiscordRelationshipChange",
				e.user?.value.global_name,
				stat.type,
				stat.nickname
			)();
		});
	});

	function enumarateDMs() {
		logger.dbg("DMsJar", [...client.dms.values()])();
	}

	enumarateDMs();
	client.dms.on("update", enumarateDMs);

	function enumarateChannels(guild: DiscordGuild) {
		logger.dbg("Enumerating Channels:", guild.value.name)();
		guild.channels.sorted(true).forEach((c) => {
			const args = [c.value.name];
			if ("roleAccess" in c) {
				if (c.roleAccess().VIEW_CHANNEL === false) args.unshift("[hidden]");
			}
			logger.dbg(...args)();
		});
	}
	client.guilds.forEach((guild) => {
		enumarateChannels(guild);
		let index: number = 0;

		guild.channels.sorted(true).forEach((e, i) => {
			index = i;
			e.subscribe(() => {
				if (index === i) return;
				enumarateChannels(guild);
			});
		});

		index++;

		guild.channels.on("update", (key, val) => {
			val?.subscribe(() => {
				enumarateChannels(guild);
			});

			if (!val) {
				enumarateChannels(guild);
			}
		});
	});
}

Logger.logToFile = true;

global.Logger = Logger;
global.result = result;
global.utils = utils;
