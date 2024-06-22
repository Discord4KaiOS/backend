import DiscordRequest from "./DiscordRequest";

interface Trending {
	categories: Category[];
	gifs: GIF[];
}

interface Category {
	name: string;
	src: string;
}

interface GIF {
	id: string;
	title: string;
	url: string;
	src: string;
	gif_src: string;
	width: number;
	height: number;
	preview: string;
}

const searchParams = {
	provider: "tenor",
	locale: "en-US",
} as const;

type MediaFormat =
	| "tinygif"
	| "mediumgif"
	| "tinymp4"
	| "nanogif"
	| "gif"
	| "nanomp4"
	| "loopedmp4"
	| "nanowebm"
	| "tinywebm"
	| "mp4"
	| "webm";

export default class DiscordGifPicker {
	constructor(public Request: DiscordRequest) {}

	getTrending(media_format: MediaFormat = "tinygif") {
		return this.Request.get<Trending>("gifs/trending", {
			search: { ...searchParams, media_format },
		});
	}

	getTrendingGifs(media_format: MediaFormat = "tinygif") {
		return this.Request.get<GIF[]>("gifs/trending-gifs", {
			search: { ...searchParams, media_format },
		});
	}

	search(q: string, media_format: MediaFormat = "tinygif") {
		return this.Request.get<GIF[]>("gifs/search", {
			search: { ...searchParams, q, media_format },
		});
	}
}
