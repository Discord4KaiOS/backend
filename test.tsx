/// <reference types="bun-types" />

import { DiscordClient, DiscordRelationship, MFA, setup } from "./index";
// @ts-ignore
import XMLHttpRequest from "./scripts/xhr.js";
import Logger from "./src/Logger.js";
import * as utils from "./src/lib/utils.js";
import { DiscordGroupDMChannel } from "./src/DiscordChannels.js";

import { Unsubscriber } from "./src/lib/stores.js";

const logger = new Logger("test.ts");

global.XMLHttpRequest = XMLHttpRequest as any;

if (global.lastResult) {
	const r = global.lastResult as DiscordClient;
	r.close();
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

	client.relationships.on("update", (key, e) => {
		if (e)
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
		logger.dbg("Enumerating DMs:")();

		client.dms.list().forEach((dm) => {
			let name: string;

			name = dm.recipients.value.map(({ value }) => value.global_name || value.username).join(", ");

			if (dm instanceof DiscordGroupDMChannel && dm.value.name) {
				name = dm.value.name;
			}

			// console.log(dm.readState, !dm.readState);

			// logger.dbg(name, dm, dm.value)();
		});
	}

	enumarateDMs();
	client.dms.on("update", enumarateDMs);

	client.guilds.forEach((guild) => {
		const registered: Unsubscriber[] = [];

		guild.channels.sorted.subscribe((channels) => {
			// logger.dbg("Enumerating Channels:", guild.value.name)();
			registered.forEach((e) => e());
			registered.length = 0;

			let done = false;

			channels.forEach((c) => {
				const args: any = [c.value.name, c, c.value];
				if ("roleAccess" in c) {
					if (c.roleAccess().VIEW_CHANNEL === false) {
						args.unshift("[hidden]");
					}
				}

				registered.push(
					c.subscribe((e) => {
						const ch_update = "channel update:";
						if (done && args[0] !== ch_update) {
							args.unshift(ch_update);
						}
						args[args.length - 3] = c.value.name;
						// logger.dbg(...args)();
					})
				);
			});

			done = true;
		});
	});
}

Logger.logToFile = true;

global.Logger = Logger;
global.result = result;
global.utils = utils;
