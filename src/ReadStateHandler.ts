import { DiscordClientReady } from "..";
import Logger from "./Logger";
import { ClientReadState } from "./lib/types";
import { Jar, WritableStore } from "./lib/utils";

interface DiscordReadStateProps extends Omit<ClientReadState, "last_message_id"> {
	/**
	 *  - undefined -> generated because it was not found
	 *  - null -> discord says last state was no messages
	 *  - string -> last message id
	 */
	last_message_id: string | null | undefined;
}

export class DiscordReadState extends WritableStore<DiscordReadStateProps> {
	increment(count = 1) {
		this.shallowUpdate((s) => ({
			...s,
			mention_count: s.mention_count + count,
		}));
	}
}

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

	updateCount(channelID: string, message_id?: string | null, count?: number) {
		const state = this.get(channelID);
		const current = state.value;

		// Return early if messageId is provided and if last_message_id won't change
		if (message_id && message_id === current.last_message_id) {
			return;
		}

		let newCount = count;

		if (typeof newCount === "undefined" && message_id && current.last_message_id) {
			if (message_id >= current.last_message_id) {
				newCount = 0;
			}
		}

		state.setState({
			mention_count: newCount || 0,
			last_message_id: message_id || current.last_message_id,
		});
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

			const dmChannel = this.$.dms.get(channelID);
			const channel = dmChannel || this.$.guilds.findChannelById(channelID);

			if (!channel) {
				ReadStateHandler.logger.err("channel not found", channelID)();
				throw new Error("channel was not found");
			}

			if ("lastMessageID" in channel) {
				// weeirrrddd
				const lastMessageID = channel.lastMessageID.value as string | null;

				const newState = new DiscordReadState({
					last_message_id: lastMessageID,
					last_pin_timestamp: null,
					id: channelID,
					mention_count: 0,
				});
				this.set(channelID, newState);
				return newState;
			} else {
				ReadStateHandler.logger.err("invalid channel", channelID)();
				throw new Error("invalid channel");
			}
		}

		return has;
	}
}
