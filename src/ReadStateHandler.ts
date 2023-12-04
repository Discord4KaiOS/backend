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

	incrementCount(channelID: string, count = 1) {
		this.get(channelID).shallowUpdate((s) => ({
			...s,
			mention_count: s.mention_count + count,
		}));
	}

	updateCount(channelID: string, count?: number, message_id?: string | null) {
		const state = this.get(channelID);
		const current = state.value;

		// Return early if messageId is provided and if last_message_id won't change
		if (message_id && message_id === current.last_message_id) {
			return;
		}

		state.shallowUpdate((s) => ({
			...s,
			mention_count: count || s.mention_count,
			last_message_id: message_id || current.last_message_id,
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
				throw new Error("channel was not found");
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
