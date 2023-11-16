import _Pako from "pako";

interface Pako {
	deflate: typeof _Pako.deflate;
	inflate: typeof _Pako.inflate;
	gzip: typeof _Pako.gzip;
	ungzip: typeof _Pako.ungzip;
	deflateRaw: typeof _Pako.deflateRaw;
	inflateRaw: typeof _Pako.inflateRaw;
	Deflate: typeof _Pako.Deflate;
	Inflate: typeof _Pako.Inflate;
	[x: string]: Function | number;
}

export declare function pako(): Pako;
