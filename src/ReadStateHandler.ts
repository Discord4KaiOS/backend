import { DiscordClientReady } from "..";
import Logger from "./Logger";
import { ClientReadState } from "./lib/types";
import { Jar, WritableStore } from "./lib/utils";

export class DiscordReadState extends WritableStore<ClientReadState> {}

export default class ReadStateHandler extends Jar<DiscordReadState> {
	constructor(public $: DiscordClientReady) {
		super();
	}

	static logger = new Logger("ReadStateHandler");

	updateCount(channelID: string, count: number) {
		const state = this.get(channelID);

		if (!state) {
			ReadStateHandler.logger.err("state not found", channelID)();
			return;
		}

		state.shallowUpdate((s) => ({
			...s,
			mention_count: s.mention_count + count,
		}));
	}

	add(channelID: string, state: DiscordReadState) {
		const has = this.has(channelID);
		if (has) {
			ReadStateHandler.logger.dbg("state already exists", channelID)();
			this.get(channelID)!.shallowSet(state.value);
			return this;
		}
		return this.set(channelID, state);
	}

	get(channelID: string) {
		const has = super.get(channelID);

		if (!has) {
			ReadStateHandler.logger.dbg("readstate not found", channelID)();

			const channel = this.$.guilds.findChannelById(channelID);

			if (!channel) {
				ReadStateHandler.logger.err("channel not found", channelID)();
				return undefined;
			}

			const newState = new DiscordReadState({
				last_message_id: null,
				last_pin_timestamp: null,
				id: channelID,
				mention_count: 0,
			});
			this.set(channelID, newState);
			return newState;
		}

		return has;
	}
}
