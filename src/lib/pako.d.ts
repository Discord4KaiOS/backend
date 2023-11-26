import type _Pako from "pako";

type Constants = typeof _Pako.constants;

export class Inflate extends _Pako.Inflate {
	chunks: any[] = [];
	strm: any;
}

interface Pako extends Constants {
	deflate: typeof _Pako.deflate;
	inflate: typeof _Pako.inflate;
	gzip: typeof _Pako.gzip;
	ungzip: typeof _Pako.ungzip;
	deflateRaw: typeof _Pako.deflateRaw;
	inflateRaw: typeof _Pako.inflateRaw;
	Deflate: typeof _Pako.Deflate;
	Inflate: typeof Inflate;
}

function pako(): Pako {
	return _Pako as any;
}

export default pako;
