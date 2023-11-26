/**
 * Code Taken from the discord website
 * reverse engineered and stuff
 * I have absolutely no idea why other stuff doesn't work
 */
export default function pako() {
	const CONSTANTS = {
		Z_NO_FLUSH: 0,
		Z_PARTIAL_FLUSH: 1,
		Z_SYNC_FLUSH: 2,
		Z_FULL_FLUSH: 3,
		Z_FINISH: 4,
		Z_BLOCK: 5,
		Z_TREES: 6,
		Z_OK: 0,
		Z_STREAM_END: 1,
		Z_NEED_DICT: 2,
		Z_ERRNO: -1,
		Z_STREAM_ERROR: -2,
		Z_DATA_ERROR: -3,
		Z_BUF_ERROR: -5,
		Z_NO_COMPRESSION: 0,
		Z_BEST_SPEED: 1,
		Z_BEST_COMPRESSION: 9,
		Z_DEFAULT_COMPRESSION: -1,
		Z_FILTERED: 1,
		Z_HUFFMAN_ONLY: 2,
		Z_RLE: 3,
		Z_FIXED: 4,
		Z_DEFAULT_STRATEGY: 0,
		Z_BINARY: 0,
		Z_TEXT: 1,
		Z_UNKNOWN: 2,
		Z_DEFLATED: 8,
	};

	const Utils = {
		assign: function (e) {
			for (var t = Array.prototype.slice.call(arguments, 1); t.length; ) {
				var n = t.shift();
				if (n) {
					if ("object" != typeof n) throw new TypeError(n + "must be non-object");
					for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				}
			}
			return e;
		},
		shrinkBuf: function (e, t) {
			if (e.length === t) return e;
			if (e.subarray) return e.subarray(0, t);
			e.length = t;
			return e;
		},
		Buf8: Uint8Array,
		Buf16: Uint16Array,
		Buf32: Int32Array,
		arraySet: function (e, t, n, r, o) {
			if (t.subarray && e.subarray) e.set(t.subarray(n, n + r), o);
			else for (var i = 0; i < r; i++) e[o + i] = t[n + i];
		},
		flattenChunks: function (e) {
			var t, n, r, o, i, a;
			r = 0;
			for (t = 0, n = e.length; t < n; t++) r += e[t].length;
			a = new Uint8Array(r);
			o = 0;
			for (t = 0, n = e.length; t < n; t++) {
				i = e[t];
				a.set(i, o);
				o += i.length;
			}
			return a;
		},
	};

	var exports_827948 = {};
	var o_9241 = 15,
		i_9241 = [
			3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131,
			163, 195, 227, 258, 0, 0,
		],
		a_9241 = [
			16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20,
			20, 21, 21, 21, 21, 16, 72, 78,
		],
		s_9241 = [
			1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537,
			2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0,
		],
		u_9241 = [
			16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26,
			26, 27, 27, 28, 28, 29, 29, 64, 64,
		];

	const t_502869 = (function () {
		for (var e, t = [], n = 0; n < 256; n++) {
			e = n;
			for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1;
			t[n] = e;
		}
		return t;
	})();

	var o_827948 = function (e, t, n, r) {
			for (var o = (65535 & e) | 0, i = ((e >>> 16) & 65535) | 0, a = 0; 0 !== n; ) {
				n -= a = n > 2e3 ? 2e3 : n;
				do {
					i = (i + (o = (o + t[r++]) | 0)) | 0;
				} while (--a);
				o %= 65521;
				i %= 65521;
			}
			return o | (i << 16) | 0;
		},
		i_827948 = function (e, n, r, o) {
			var i = t_502869,
				a = o + r;
			e ^= -1;
			for (var s = o; s < a; s++) e = (e >>> 8) ^ i[255 & (e ^ n[s])];
			return -1 ^ e;
		},
		a_827948 = function (e, t) {
			var n, r, o, i, a, s, u, c, l, f, _, d, E, p, h, I, T, m, O, v, S, g, y, A, N;
			n = e.state;
			r = e.next_in;
			A = e.input;
			o = r + (e.avail_in - 5);
			i = e.next_out;
			N = e.output;
			a = i - (t - e.avail_out);
			s = i + (e.avail_out - 257);
			u = n.dmax;
			c = n.wsize;
			l = n.whave;
			f = n.wnext;
			_ = n.window;
			d = n.hold;
			E = n.bits;
			p = n.lencode;
			h = n.distcode;
			I = (1 << n.lenbits) - 1;
			T = (1 << n.distbits) - 1;
			e: do {
				if (E < 15) {
					d += A[r++] << E;
					E += 8;
					d += A[r++] << E;
					E += 8;
				}
				m = p[d & I];
				t: for (;;) {
					d >>>= O = m >>> 24;
					E -= O;
					if (0 === (O = (m >>> 16) & 255)) N[i++] = 65535 & m;
					else {
						if (!(16 & O)) {
							if (0 == (64 & O)) {
								m = p[(65535 & m) + (d & ((1 << O) - 1))];
								continue t;
							}
							if (32 & O) {
								n.mode = 12;
								break e;
							}
							e.msg = "invalid literal/length code";
							n.mode = 30;
							break e;
						}
						v = 65535 & m;
						if ((O &= 15)) {
							if (E < O) {
								d += A[r++] << E;
								E += 8;
							}
							v += d & ((1 << O) - 1);
							d >>>= O;
							E -= O;
						}
						if (E < 15) {
							d += A[r++] << E;
							E += 8;
							d += A[r++] << E;
							E += 8;
						}
						m = h[d & T];
						n: for (;;) {
							d >>>= O = m >>> 24;
							E -= O;
							if (!(16 & (O = (m >>> 16) & 255))) {
								if (0 == (64 & O)) {
									m = h[(65535 & m) + (d & ((1 << O) - 1))];
									continue n;
								}
								e.msg = "invalid distance code";
								n.mode = 30;
								break e;
							}
							S = 65535 & m;
							if (E < (O &= 15)) {
								d += A[r++] << E;
								if ((E += 8) < O) {
									d += A[r++] << E;
									E += 8;
								}
							}
							if ((S += d & ((1 << O) - 1)) > u) {
								e.msg = "invalid distance too far back";
								n.mode = 30;
								break e;
							}
							d >>>= O;
							E -= O;
							if (S > (O = i - a)) {
								if ((O = S - O) > l && n.sane) {
									e.msg = "invalid distance too far back";
									n.mode = 30;
									break e;
								}
								g = 0;
								y = _;
								if (0 === f) {
									g += c - O;
									if (O < v) {
										v -= O;
										do {
											N[i++] = _[g++];
										} while (--O);
										g = i - S;
										y = N;
									}
								} else if (f < O) {
									g += c + f - O;
									if ((O -= f) < v) {
										v -= O;
										do {
											N[i++] = _[g++];
										} while (--O);
										g = 0;
										if (f < v) {
											v -= O = f;
											do {
												N[i++] = _[g++];
											} while (--O);
											g = i - S;
											y = N;
										}
									}
								} else {
									g += f - O;
									if (O < v) {
										v -= O;
										do {
											N[i++] = _[g++];
										} while (--O);
										g = i - S;
										y = N;
									}
								}
								for (; v > 2; ) {
									N[i++] = y[g++];
									N[i++] = y[g++];
									N[i++] = y[g++];
									v -= 3;
								}
								if (v) {
									N[i++] = y[g++];
									v > 1 && (N[i++] = y[g++]);
								}
							} else {
								g = i - S;
								do {
									N[i++] = N[g++];
									N[i++] = N[g++];
									N[i++] = N[g++];
									v -= 3;
								} while (v > 2);
								if (v) {
									N[i++] = N[g++];
									v > 1 && (N[i++] = N[g++]);
								}
							}
							break;
						}
					}
					break;
				}
			} while (r < o && i < s);
			r -= v = E >> 3;
			d &= (1 << (E -= v << 3)) - 1;
			e.next_in = r;
			e.next_out = i;
			e.avail_in = r < o ? o - r + 5 : 5 - (r - o);
			e.avail_out = i < s ? s - i + 257 : 257 - (i - s);
			n.hold = d;
			n.bits = E;
		},
		s_827948 = function (e, t, n, c, l, f, _, d) {
			var E,
				p,
				h,
				I,
				T,
				m,
				O,
				v,
				S,
				g = d.bits,
				y = 0,
				A = 0,
				N = 0,
				b = 0,
				R = 0,
				C = 0,
				L = 0,
				D = 0,
				P = 0,
				M = 0,
				w = null,
				U = 0,
				G = new Utils.Buf16(16),
				k = new Utils.Buf16(16),
				x = null,
				B = 0;
			for (y = 0; y <= o_9241; y++) G[y] = 0;
			for (A = 0; A < c; A++) G[t[n + A]]++;
			R = g;
			for (b = o_9241; b >= 1 && 0 === G[b]; b--);
			R > b && (R = b);
			if (0 === b) {
				l[f++] = 20971520;
				l[f++] = 20971520;
				d.bits = 1;
				return 0;
			}
			for (N = 1; N < b && 0 === G[N]; N++);
			R < N && (R = N);
			D = 1;
			for (y = 1; y <= o_9241; y++) {
				D <<= 1;
				if ((D -= G[y]) < 0) return -1;
			}
			if (D > 0 && (0 === e || 1 !== b)) return -1;
			k[1] = 0;
			for (y = 1; y < o_9241; y++) k[y + 1] = k[y] + G[y];
			for (A = 0; A < c; A++) 0 !== t[n + A] && (_[k[t[n + A]]++] = A);
			if (0 === e) {
				w = x = _;
				m = 19;
			} else if (1 === e) {
				w = i_9241;
				U -= 257;
				x = a_9241;
				B -= 257;
				m = 256;
			} else {
				w = s_9241;
				x = u_9241;
				m = -1;
			}
			M = 0;
			A = 0;
			y = N;
			T = f;
			C = R;
			L = 0;
			h = -1;
			I = (P = 1 << R) - 1;
			if ((1 === e && P > 852) || (2 === e && P > 592)) return 1;
			for (;;) {
				O = y - L;
				if (_[A] < m) {
					v = 0;
					S = _[A];
				} else if (_[A] > m) {
					v = x[B + _[A]];
					S = w[U + _[A]];
				} else {
					v = 96;
					S = 0;
				}
				E = 1 << (y - L);
				N = p = 1 << C;
				do {
					l[T + (M >> L) + (p -= E)] = (O << 24) | (v << 16) | S | 0;
				} while (0 !== p);
				E = 1 << (y - 1);
				for (; M & E; ) E >>= 1;
				if (0 !== E) {
					M &= E - 1;
					M += E;
				} else M = 0;
				A++;
				if (0 == --G[y]) {
					if (y === b) break;
					y = t[n + _[A]];
				}
				if (y > R && (M & I) !== h) {
					0 === L && (L = R);
					T += N;
					D = 1 << (C = y - L);
					for (; C + L < b && !((D -= G[C + L]) <= 0); ) {
						C++;
						D <<= 1;
					}
					P += 1 << C;
					if ((1 === e && P > 852) || (2 === e && P > 592)) return 1;
					l[(h = M & I)] = (R << 24) | (C << 16) | (T - f) | 0;
				}
			}
			0 !== M && (l[T + M] = ((y - L) << 24) | (64 << 16) | 0);
			d.bits = R;
			return 0;
		},
		u_827948 = -2,
		c_827948 = 12,
		l_827948 = 30;
	function f_827948(e) {
		return ((e >>> 24) & 255) + ((e >>> 8) & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
	}
	function __827948() {
		this.mode = 0;
		this.last = !1;
		this.wrap = 0;
		this.havedict = !1;
		this.flags = 0;
		this.dmax = 0;
		this.check = 0;
		this.total = 0;
		this.head = null;
		this.wbits = 0;
		this.wsize = 0;
		this.whave = 0;
		this.wnext = 0;
		this.window = null;
		this.hold = 0;
		this.bits = 0;
		this.length = 0;
		this.offset = 0;
		this.extra = 0;
		this.lencode = null;
		this.distcode = null;
		this.lenbits = 0;
		this.distbits = 0;
		this.ncode = 0;
		this.nlen = 0;
		this.ndist = 0;
		this.have = 0;
		this.next = null;
		this.lens = new Utils.Buf16(320);
		this.work = new Utils.Buf16(288);
		this.lendyn = null;
		this.distdyn = null;
		this.sane = 0;
		this.back = 0;
		this.was = 0;
	}
	function d_827948(e) {
		var t;
		if (!e || !e.state) return u_827948;
		t = e.state;
		e.total_in = e.total_out = t.total = 0;
		e.msg = "";
		t.wrap && (e.adler = 1 & t.wrap);
		t.mode = 1;
		t.last = 0;
		t.havedict = 0;
		t.dmax = 32768;
		t.head = null;
		t.hold = 0;
		t.bits = 0;
		t.lencode = t.lendyn = new Utils.Buf32(852);
		t.distcode = t.distdyn = new Utils.Buf32(592);
		t.sane = 1;
		t.back = -1;
		return 0;
	}
	function E_827948(e) {
		var t;
		if (!e || !e.state) return u_827948;
		(t = e.state).wsize = 0;
		t.whave = 0;
		t.wnext = 0;
		return d_827948(e);
	}
	function p_827948(e, t) {
		var n, r;
		if (!e || !e.state) return u_827948;
		r = e.state;
		if (t < 0) {
			n = 0;
			t = -t;
		} else {
			n = 1 + (t >> 4);
			t < 48 && (t &= 15);
		}
		if (t && (t < 8 || t > 15)) return u_827948;
		null !== r.window && r.wbits !== t && (r.window = null);
		r.wrap = n;
		r.wbits = t;
		return E_827948(e);
	}
	function h_827948(e, t) {
		var n, r;
		if (!e) return u_827948;
		r = new __827948();
		e.state = r;
		r.window = null;
		0 !== (n = p_827948(e, t)) && (e.state = null);
		return n;
	}
	var I_827948,
		T_827948,
		m_827948 = !0;
	function O_827948(e) {
		if (m_827948) {
			var t;
			I_827948 = new Utils.Buf32(512);
			T_827948 = new Utils.Buf32(32);
			t = 0;
			for (; t < 144; ) e.lens[t++] = 8;
			for (; t < 256; ) e.lens[t++] = 9;
			for (; t < 280; ) e.lens[t++] = 7;
			for (; t < 288; ) e.lens[t++] = 8;
			s_827948(1, e.lens, 0, 288, I_827948, 0, e.work, { bits: 9 });
			t = 0;
			for (; t < 32; ) e.lens[t++] = 5;
			s_827948(2, e.lens, 0, 32, T_827948, 0, e.work, { bits: 5 });
			m_827948 = !1;
		}
		e.lencode = I_827948;
		e.lenbits = 9;
		e.distcode = T_827948;
		e.distbits = 5;
	}
	function v_827948(e, t, n, o) {
		var i,
			a = e.state;
		if (null === a.window) {
			a.wsize = 1 << a.wbits;
			a.wnext = 0;
			a.whave = 0;
			a.window = new Utils.Buf8(a.wsize);
		}
		if (o >= a.wsize) {
			Utils.arraySet(a.window, t, n - a.wsize, a.wsize, 0);
			a.wnext = 0;
			a.whave = a.wsize;
		} else {
			(i = a.wsize - a.wnext) > o && (i = o);
			Utils.arraySet(a.window, t, n - o, i, a.wnext);
			if ((o -= i)) {
				Utils.arraySet(a.window, t, n - o, o, 0);
				a.wnext = o;
				a.whave = a.wsize;
			} else {
				a.wnext += i;
				a.wnext === a.wsize && (a.wnext = 0);
				a.whave < a.wsize && (a.whave += i);
			}
		}
		return 0;
	}
	exports_827948.inflateReset = E_827948;
	exports_827948.inflateReset2 = p_827948;
	exports_827948.inflateResetKeep = d_827948;
	exports_827948.inflateInit = function (e) {
		return h_827948(e, 15);
	};
	exports_827948.inflateInit2 = h_827948;
	exports_827948.inflate = function (e, t) {
		var n,
			_,
			d,
			E,
			p,
			h,
			I,
			T,
			m,
			S,
			g,
			y,
			A,
			N,
			b,
			R,
			C,
			L,
			D,
			P,
			M,
			w,
			U,
			G,
			k = 0,
			x = new Utils.Buf8(4),
			B = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
		if (!e || !e.state || !e.output || (!e.input && 0 !== e.avail_in)) return u_827948;
		(n = e.state).mode === c_827948 && (n.mode = 13);
		p = e.next_out;
		d = e.output;
		I = e.avail_out;
		E = e.next_in;
		_ = e.input;
		h = e.avail_in;
		T = n.hold;
		m = n.bits;
		S = h;
		g = I;
		w = 0;
		e: for (;;)
			switch (n.mode) {
				case 1:
					if (0 === n.wrap) {
						n.mode = 13;
						break;
					}
					for (; m < 16; ) {
						if (0 === h) break e;
						h--;
						T += _[E++] << m;
						m += 8;
					}
					if (2 & n.wrap && 35615 === T) {
						n.check = 0;
						x[0] = 255 & T;
						x[1] = (T >>> 8) & 255;
						n.check = i_827948(n.check, x, 2, 0);
						T = 0;
						m = 0;
						n.mode = 2;
						break;
					}
					n.flags = 0;
					n.head && (n.head.done = !1);
					if (!(1 & n.wrap) || (((255 & T) << 8) + (T >> 8)) % 31) {
						e.msg = "incorrect header check";
						n.mode = l_827948;
						break;
					}
					if (8 != (15 & T)) {
						e.msg = "unknown compression method";
						n.mode = l_827948;
						break;
					}
					m -= 4;
					M = 8 + (15 & (T >>>= 4));
					if (0 === n.wbits) n.wbits = M;
					else if (M > n.wbits) {
						e.msg = "invalid window size";
						n.mode = l_827948;
						break;
					}
					n.dmax = 1 << M;
					e.adler = n.check = 1;
					n.mode = 512 & T ? 10 : c_827948;
					T = 0;
					m = 0;
					break;
				case 2:
					for (; m < 16; ) {
						if (0 === h) break e;
						h--;
						T += _[E++] << m;
						m += 8;
					}
					n.flags = T;
					if (8 != (255 & n.flags)) {
						e.msg = "unknown compression method";
						n.mode = l_827948;
						break;
					}
					if (57344 & n.flags) {
						e.msg = "unknown header flags set";
						n.mode = l_827948;
						break;
					}
					n.head && (n.head.text = (T >> 8) & 1);
					if (512 & n.flags) {
						x[0] = 255 & T;
						x[1] = (T >>> 8) & 255;
						n.check = i_827948(n.check, x, 2, 0);
					}
					T = 0;
					m = 0;
					n.mode = 3;
				case 3:
					for (; m < 32; ) {
						if (0 === h) break e;
						h--;
						T += _[E++] << m;
						m += 8;
					}
					n.head && (n.head.time = T);
					if (512 & n.flags) {
						x[0] = 255 & T;
						x[1] = (T >>> 8) & 255;
						x[2] = (T >>> 16) & 255;
						x[3] = (T >>> 24) & 255;
						n.check = i_827948(n.check, x, 4, 0);
					}
					T = 0;
					m = 0;
					n.mode = 4;
				case 4:
					for (; m < 16; ) {
						if (0 === h) break e;
						h--;
						T += _[E++] << m;
						m += 8;
					}
					if (n.head) {
						n.head.xflags = 255 & T;
						n.head.os = T >> 8;
					}
					if (512 & n.flags) {
						x[0] = 255 & T;
						x[1] = (T >>> 8) & 255;
						n.check = i_827948(n.check, x, 2, 0);
					}
					T = 0;
					m = 0;
					n.mode = 5;
				case 5:
					if (1024 & n.flags) {
						for (; m < 16; ) {
							if (0 === h) break e;
							h--;
							T += _[E++] << m;
							m += 8;
						}
						n.length = T;
						n.head && (n.head.extra_len = T);
						if (512 & n.flags) {
							x[0] = 255 & T;
							x[1] = (T >>> 8) & 255;
							n.check = i_827948(n.check, x, 2, 0);
						}
						T = 0;
						m = 0;
					} else n.head && (n.head.extra = null);
					n.mode = 6;
				case 6:
					if (1024 & n.flags) {
						(y = n.length) > h && (y = h);
						if (y) {
							if (n.head) {
								M = n.head.extra_len - n.length;
								n.head.extra || (n.head.extra = new Array(n.head.extra_len));
								Utils.arraySet(n.head.extra, _, E, y, M);
							}
							512 & n.flags && (n.check = i_827948(n.check, _, y, E));
							h -= y;
							E += y;
							n.length -= y;
						}
						if (n.length) break e;
					}
					n.length = 0;
					n.mode = 7;
				case 7:
					if (2048 & n.flags) {
						if (0 === h) break e;
						y = 0;
						do {
							M = _[E + y++];
							n.head && M && n.length < 65536 && (n.head.name += String.fromCharCode(M));
						} while (M && y < h);
						512 & n.flags && (n.check = i_827948(n.check, _, y, E));
						h -= y;
						E += y;
						if (M) break e;
					} else n.head && (n.head.name = null);
					n.length = 0;
					n.mode = 8;
				case 8:
					if (4096 & n.flags) {
						if (0 === h) break e;
						y = 0;
						do {
							M = _[E + y++];
							n.head && M && n.length < 65536 && (n.head.comment += String.fromCharCode(M));
						} while (M && y < h);
						512 & n.flags && (n.check = i_827948(n.check, _, y, E));
						h -= y;
						E += y;
						if (M) break e;
					} else n.head && (n.head.comment = null);
					n.mode = 9;
				case 9:
					if (512 & n.flags) {
						for (; m < 16; ) {
							if (0 === h) break e;
							h--;
							T += _[E++] << m;
							m += 8;
						}
						if (T !== (65535 & n.check)) {
							e.msg = "header crc mismatch";
							n.mode = l_827948;
							break;
						}
						T = 0;
						m = 0;
					}
					if (n.head) {
						n.head.hcrc = (n.flags >> 9) & 1;
						n.head.done = !0;
					}
					e.adler = n.check = 0;
					n.mode = c_827948;
					break;
				case 10:
					for (; m < 32; ) {
						if (0 === h) break e;
						h--;
						T += _[E++] << m;
						m += 8;
					}
					e.adler = n.check = f_827948(T);
					T = 0;
					m = 0;
					n.mode = 11;
				case 11:
					if (0 === n.havedict) {
						e.next_out = p;
						e.avail_out = I;
						e.next_in = E;
						e.avail_in = h;
						n.hold = T;
						n.bits = m;
						return 2;
					}
					e.adler = n.check = 1;
					n.mode = c_827948;
				case c_827948:
					if (5 === t || 6 === t) break e;
				case 13:
					if (n.last) {
						T >>>= 7 & m;
						m -= 7 & m;
						n.mode = 27;
						break;
					}
					for (; m < 3; ) {
						if (0 === h) break e;
						h--;
						T += _[E++] << m;
						m += 8;
					}
					n.last = 1 & T;
					m -= 1;
					switch (3 & (T >>>= 1)) {
						case 0:
							n.mode = 14;
							break;
						case 1:
							O_827948(n);
							n.mode = 20;
							if (6 === t) {
								T >>>= 2;
								m -= 2;
								break e;
							}
							break;
						case 2:
							n.mode = 17;
							break;
						case 3:
							e.msg = "invalid block type";
							n.mode = l_827948;
					}
					T >>>= 2;
					m -= 2;
					break;
				case 14:
					T >>>= 7 & m;
					m -= 7 & m;
					for (; m < 32; ) {
						if (0 === h) break e;
						h--;
						T += _[E++] << m;
						m += 8;
					}
					if ((65535 & T) != ((T >>> 16) ^ 65535)) {
						e.msg = "invalid stored block lengths";
						n.mode = l_827948;
						break;
					}
					n.length = 65535 & T;
					T = 0;
					m = 0;
					n.mode = 15;
					if (6 === t) break e;
				case 15:
					n.mode = 16;
				case 16:
					if ((y = n.length)) {
						y > h && (y = h);
						y > I && (y = I);
						if (0 === y) break e;
						Utils.arraySet(d, _, E, y, p);
						h -= y;
						E += y;
						I -= y;
						p += y;
						n.length -= y;
						break;
					}
					n.mode = c_827948;
					break;
				case 17:
					for (; m < 14; ) {
						if (0 === h) break e;
						h--;
						T += _[E++] << m;
						m += 8;
					}
					n.nlen = 257 + (31 & T);
					T >>>= 5;
					m -= 5;
					n.ndist = 1 + (31 & T);
					T >>>= 5;
					m -= 5;
					n.ncode = 4 + (15 & T);
					T >>>= 4;
					m -= 4;
					if (n.nlen > 286 || n.ndist > 30) {
						e.msg = "too many length or distance symbols";
						n.mode = l_827948;
						break;
					}
					n.have = 0;
					n.mode = 18;
				case 18:
					for (; n.have < n.ncode; ) {
						for (; m < 3; ) {
							if (0 === h) break e;
							h--;
							T += _[E++] << m;
							m += 8;
						}
						n.lens[B[n.have++]] = 7 & T;
						T >>>= 3;
						m -= 3;
					}
					for (; n.have < 19; ) n.lens[B[n.have++]] = 0;
					n.lencode = n.lendyn;
					n.lenbits = 7;
					U = { bits: n.lenbits };
					w = s_827948(0, n.lens, 0, 19, n.lencode, 0, n.work, U);
					n.lenbits = U.bits;
					if (w) {
						e.msg = "invalid code lengths set";
						n.mode = l_827948;
						break;
					}
					n.have = 0;
					n.mode = 19;
				case 19:
					for (; n.have < n.nlen + n.ndist; ) {
						for (;;) {
							R = ((k = n.lencode[T & ((1 << n.lenbits) - 1)]) >>> 16) & 255;
							C = 65535 & k;
							if ((b = k >>> 24) <= m) break;
							if (0 === h) break e;
							h--;
							T += _[E++] << m;
							m += 8;
						}
						if (C < 16) {
							T >>>= b;
							m -= b;
							n.lens[n.have++] = C;
						} else {
							if (16 === C) {
								G = b + 2;
								for (; m < G; ) {
									if (0 === h) break e;
									h--;
									T += _[E++] << m;
									m += 8;
								}
								T >>>= b;
								m -= b;
								if (0 === n.have) {
									e.msg = "invalid bit length repeat";
									n.mode = l_827948;
									break;
								}
								M = n.lens[n.have - 1];
								y = 3 + (3 & T);
								T >>>= 2;
								m -= 2;
							} else if (17 === C) {
								G = b + 3;
								for (; m < G; ) {
									if (0 === h) break e;
									h--;
									T += _[E++] << m;
									m += 8;
								}
								m -= b;
								M = 0;
								y = 3 + (7 & (T >>>= b));
								T >>>= 3;
								m -= 3;
							} else {
								G = b + 7;
								for (; m < G; ) {
									if (0 === h) break e;
									h--;
									T += _[E++] << m;
									m += 8;
								}
								m -= b;
								M = 0;
								y = 11 + (127 & (T >>>= b));
								T >>>= 7;
								m -= 7;
							}
							if (n.have + y > n.nlen + n.ndist) {
								e.msg = "invalid bit length repeat";
								n.mode = l_827948;
								break;
							}
							for (; y--; ) n.lens[n.have++] = M;
						}
					}
					if (n.mode === l_827948) break;
					if (0 === n.lens[256]) {
						e.msg = "invalid code -- missing end-of-block";
						n.mode = l_827948;
						break;
					}
					n.lenbits = 9;
					U = { bits: n.lenbits };
					w = s_827948(1, n.lens, 0, n.nlen, n.lencode, 0, n.work, U);
					n.lenbits = U.bits;
					if (w) {
						e.msg = "invalid literal/lengths set";
						n.mode = l_827948;
						break;
					}
					n.distbits = 6;
					n.distcode = n.distdyn;
					U = { bits: n.distbits };
					w = s_827948(2, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, U);
					n.distbits = U.bits;
					if (w) {
						e.msg = "invalid distances set";
						n.mode = l_827948;
						break;
					}
					n.mode = 20;
					if (6 === t) break e;
				case 20:
					n.mode = 21;
				case 21:
					if (h >= 6 && I >= 258) {
						e.next_out = p;
						e.avail_out = I;
						e.next_in = E;
						e.avail_in = h;
						n.hold = T;
						n.bits = m;
						a_827948(e, g);
						p = e.next_out;
						d = e.output;
						I = e.avail_out;
						E = e.next_in;
						_ = e.input;
						h = e.avail_in;
						T = n.hold;
						m = n.bits;
						n.mode === c_827948 && (n.back = -1);
						break;
					}
					n.back = 0;
					for (;;) {
						R = ((k = n.lencode[T & ((1 << n.lenbits) - 1)]) >>> 16) & 255;
						C = 65535 & k;
						if ((b = k >>> 24) <= m) break;
						if (0 === h) break e;
						h--;
						T += _[E++] << m;
						m += 8;
					}
					if (R && 0 == (240 & R)) {
						L = b;
						D = R;
						P = C;
						for (;;) {
							R = ((k = n.lencode[P + ((T & ((1 << (L + D)) - 1)) >> L)]) >>> 16) & 255;
							C = 65535 & k;
							if (L + (b = k >>> 24) <= m) break;
							if (0 === h) break e;
							h--;
							T += _[E++] << m;
							m += 8;
						}
						T >>>= L;
						m -= L;
						n.back += L;
					}
					T >>>= b;
					m -= b;
					n.back += b;
					n.length = C;
					if (0 === R) {
						n.mode = 26;
						break;
					}
					if (32 & R) {
						n.back = -1;
						n.mode = c_827948;
						break;
					}
					if (64 & R) {
						e.msg = "invalid literal/length code";
						n.mode = l_827948;
						break;
					}
					n.extra = 15 & R;
					n.mode = 22;
				case 22:
					if (n.extra) {
						G = n.extra;
						for (; m < G; ) {
							if (0 === h) break e;
							h--;
							T += _[E++] << m;
							m += 8;
						}
						n.length += T & ((1 << n.extra) - 1);
						T >>>= n.extra;
						m -= n.extra;
						n.back += n.extra;
					}
					n.was = n.length;
					n.mode = 23;
				case 23:
					for (;;) {
						R = ((k = n.distcode[T & ((1 << n.distbits) - 1)]) >>> 16) & 255;
						C = 65535 & k;
						if ((b = k >>> 24) <= m) break;
						if (0 === h) break e;
						h--;
						T += _[E++] << m;
						m += 8;
					}
					if (0 == (240 & R)) {
						L = b;
						D = R;
						P = C;
						for (;;) {
							R = ((k = n.distcode[P + ((T & ((1 << (L + D)) - 1)) >> L)]) >>> 16) & 255;
							C = 65535 & k;
							if (L + (b = k >>> 24) <= m) break;
							if (0 === h) break e;
							h--;
							T += _[E++] << m;
							m += 8;
						}
						T >>>= L;
						m -= L;
						n.back += L;
					}
					T >>>= b;
					m -= b;
					n.back += b;
					if (64 & R) {
						e.msg = "invalid distance code";
						n.mode = l_827948;
						break;
					}
					n.offset = C;
					n.extra = 15 & R;
					n.mode = 24;
				case 24:
					if (n.extra) {
						G = n.extra;
						for (; m < G; ) {
							if (0 === h) break e;
							h--;
							T += _[E++] << m;
							m += 8;
						}
						n.offset += T & ((1 << n.extra) - 1);
						T >>>= n.extra;
						m -= n.extra;
						n.back += n.extra;
					}
					if (n.offset > n.dmax) {
						e.msg = "invalid distance too far back";
						n.mode = l_827948;
						break;
					}
					n.mode = 25;
				case 25:
					if (0 === I) break e;
					y = g - I;
					if (n.offset > y) {
						if ((y = n.offset - y) > n.whave && n.sane) {
							e.msg = "invalid distance too far back";
							n.mode = l_827948;
							break;
						}
						if (y > n.wnext) {
							y -= n.wnext;
							A = n.wsize - y;
						} else A = n.wnext - y;
						y > n.length && (y = n.length);
						N = n.window;
					} else {
						N = d;
						A = p - n.offset;
						y = n.length;
					}
					y > I && (y = I);
					I -= y;
					n.length -= y;
					do {
						d[p++] = N[A++];
					} while (--y);
					0 === n.length && (n.mode = 21);
					break;
				case 26:
					if (0 === I) break e;
					d[p++] = n.length;
					I--;
					n.mode = 21;
					break;
				case 27:
					if (n.wrap) {
						for (; m < 32; ) {
							if (0 === h) break e;
							h--;
							T |= _[E++] << m;
							m += 8;
						}
						g -= I;
						e.total_out += g;
						n.total += g;
						g &&
							(e.adler = n.check =
								n.flags ? i_827948(n.check, d, g, p - g) : o_827948(n.check, d, g, p - g));
						g = I;
						if ((n.flags ? T : f_827948(T)) !== n.check) {
							e.msg = "incorrect data check";
							n.mode = l_827948;
							break;
						}
						T = 0;
						m = 0;
					}
					n.mode = 28;
				case 28:
					if (n.wrap && n.flags) {
						for (; m < 32; ) {
							if (0 === h) break e;
							h--;
							T += _[E++] << m;
							m += 8;
						}
						if (T !== (4294967295 & n.total)) {
							e.msg = "incorrect length check";
							n.mode = l_827948;
							break;
						}
						T = 0;
						m = 0;
					}
					n.mode = 29;
				case 29:
					w = 1;
					break e;
				case l_827948:
					w = -3;
					break e;
				case 31:
					return -4;
				default:
					return u_827948;
			}
		e.next_out = p;
		e.avail_out = I;
		e.next_in = E;
		e.avail_in = h;
		n.hold = T;
		n.bits = m;
		if (
			(n.wsize || (g !== e.avail_out && n.mode < l_827948 && (n.mode < 27 || 4 !== t))) &&
			v_827948(e, e.output, e.next_out, g - e.avail_out)
		) {
			n.mode = 31;
			return -4;
		}
		S -= e.avail_in;
		g -= e.avail_out;
		e.total_in += S;
		e.total_out += g;
		n.total += g;
		n.wrap &&
			g &&
			(e.adler = n.check =
				n.flags
					? i_827948(n.check, d, g, e.next_out - g)
					: o_827948(n.check, d, g, e.next_out - g));
		e.data_type =
			n.bits +
			(n.last ? 64 : 0) +
			(n.mode === c_827948 ? 128 : 0) +
			(20 === n.mode || 15 === n.mode ? 256 : 0);
		((0 === S && 0 === g) || 4 === t) && 0 === w && (w = -5);
		return w;
	};
	exports_827948.inflateEnd = function (e) {
		if (!e || !e.state) return u_827948;
		var t = e.state;
		t.window && (t.window = null);
		e.state = null;
		return 0;
	};
	exports_827948.inflateGetHeader = function (e, t) {
		var n;
		if (!e || !e.state) return u_827948;
		if (0 == (2 & (n = e.state).wrap)) return u_827948;
		n.head = t;
		t.done = !1;
		return 0;
	};
	exports_827948.inflateSetDictionary = function (e, t) {
		var n,
			r = t.length;
		if (!e || !e.state) return u_827948;
		if (0 !== (n = e.state).wrap && 11 !== n.mode) return u_827948;
		if (11 === n.mode && o_827948(1, t, r, 0) !== n.check) return -3;
		if (v_827948(e, t, r, r)) {
			n.mode = 31;
			return -4;
		}
		n.havedict = 1;
		return 0;
	};
	exports_827948.inflateInfo = "pako inflate (from Nodeca project)";

	const extraUtils = {};

	var o_929373 = !0,
		i_929373 = !0;
	try {
		String.fromCharCode.apply(null, [0]);
	} catch (e) {
		o_929373 = !1;
	}
	try {
		String.fromCharCode.apply(null, new Uint8Array(1));
	} catch (e) {
		i_929373 = !1;
	}

	for (var a_929373 = new Utils.Buf8(256), s_929373 = 0; s_929373 < 256; s_929373++)
		a_929373[s_929373] =
			s_929373 >= 252
				? 6
				: s_929373 >= 248
				? 5
				: s_929373 >= 240
				? 4
				: s_929373 >= 224
				? 3
				: s_929373 >= 192
				? 2
				: 1;
	a_929373[254] = a_929373[254] = 1;

	extraUtils.string2buf = function (e) {
		var t,
			n,
			o,
			i,
			a,
			s = e.length,
			u = 0;
		for (i = 0; i < s; i++) {
			if (
				55296 == (64512 & (n = e.charCodeAt(i))) &&
				i + 1 < s &&
				56320 == (64512 & (o = e.charCodeAt(i + 1)))
			) {
				n = 65536 + ((n - 55296) << 10) + (o - 56320);
				i++;
			}
			u += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
		}
		t = new Utils.Buf8(u);
		for (a = 0, i = 0; a < u; i++) {
			if (
				55296 == (64512 & (n = e.charCodeAt(i))) &&
				i + 1 < s &&
				56320 == (64512 & (o = e.charCodeAt(i + 1)))
			) {
				n = 65536 + ((n - 55296) << 10) + (o - 56320);
				i++;
			}
			if (n < 128) t[a++] = n;
			else if (n < 2048) {
				t[a++] = 192 | (n >>> 6);
				t[a++] = 128 | (63 & n);
			} else if (n < 65536) {
				t[a++] = 224 | (n >>> 12);
				t[a++] = 128 | ((n >>> 6) & 63);
				t[a++] = 128 | (63 & n);
			} else {
				t[a++] = 240 | (n >>> 18);
				t[a++] = 128 | ((n >>> 12) & 63);
				t[a++] = 128 | ((n >>> 6) & 63);
				t[a++] = 128 | (63 & n);
			}
		}
		return t;
	};

	function u_929373(e, t) {
		if (t < 65534 && ((e.subarray && i_929373) || (!e.subarray && o_929373)))
			return String.fromCharCode.apply(null, Utils.shrinkBuf(e, t));
		for (var n = "", a = 0; a < t; a++) n += String.fromCharCode(e[a]);
		return n;
	}
	extraUtils.buf2binstring = function (e) {
		return u_929373(e, e.length);
	};
	extraUtils.binstring2buf = function (e) {
		for (var t = new Utils.Buf8(e.length), n = 0, o = t.length; n < o; n++) t[n] = e.charCodeAt(n);
		return t;
	};
	extraUtils.buf2string = function (e, t) {
		var n,
			r,
			o,
			i,
			s = t || e.length,
			c = new Array(2 * s);
		for (r = 0, n = 0; n < s; )
			if ((o = e[n++]) < 128) c[r++] = o;
			else if ((i = a_929373[o]) > 4) {
				c[r++] = 65533;
				n += i - 1;
			} else {
				o &= 2 === i ? 31 : 3 === i ? 15 : 7;
				for (; i > 1 && n < s; ) {
					o = (o << 6) | (63 & e[n++]);
					i--;
				}
				if (i > 1) c[r++] = 65533;
				else if (o < 65536) c[r++] = o;
				else {
					o -= 65536;
					c[r++] = 55296 | ((o >> 10) & 1023);
					c[r++] = 56320 | (1023 & o);
				}
			}
		return u_929373(c, r);
	};
	extraUtils.utf8border = function (e, t) {
		var n;
		(t = t || e.length) > e.length && (t = e.length);
		n = t - 1;
		for (; n >= 0 && 128 == (192 & e[n]); ) n--;
		return n < 0 || 0 === n ? t : n + a_929373[e[n]] > t ? n : t;
	};

	const exports_178843 = {};

	var s = {
			2: "need dictionary",
			1: "stream end",
			0: "",
			"-1": "file error",
			"-2": "stream error",
			"-3": "data error",
			"-4": "insufficient memory",
			"-5": "buffer error",
			"-6": "incompatible version",
		},
		u = function () {
			this.input = null;
			this.next_in = 0;
			this.avail_in = 0;
			this.total_in = 0;
			this.output = null;
			this.next_out = 0;
			this.avail_out = 0;
			this.total_out = 0;
			this.msg = "";
			this.state = null;
			this.data_type = 2;
			this.adler = 0;
		},
		c = function () {
			this.text = 0;
			this.time = 0;
			this.xflags = 0;
			this.os = 0;
			this.extra = null;
			this.extra_len = 0;
			this.name = "";
			this.comment = "";
			this.hcrc = 0;
			this.done = !1;
		},
		l = Object.prototype.toString;

	function Inflate(e) {
		if (!(this instanceof Inflate)) return new Inflate(e);
		this.options = Utils.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e || {});
		var t = this.options;
		if (t.raw && t.windowBits >= 0 && t.windowBits < 16) {
			t.windowBits = -t.windowBits;
			0 === t.windowBits && (t.windowBits = -15);
		}
		!(t.windowBits >= 0 && t.windowBits < 16) || (e && e.windowBits) || (t.windowBits += 32);
		t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15);
		this.err = 0;
		this.msg = "";
		this.ended = !1;
		this.chunks = [];
		this.strm = new u();
		this.strm.avail_out = 0;
		var n = exports_827948.inflateInit2(this.strm, t.windowBits);
		if (n !== CONSTANTS.Z_OK) throw new Error(s[n]);
		this.header = new c();
		exports_827948.inflateGetHeader(this.strm, this.header);
	}
	Inflate.prototype.push = function (e, t) {
		var n,
			s,
			u,
			c,
			f,
			_,
			d = this.strm,
			E = this.options.chunkSize,
			p = this.options.dictionary,
			h = !1;
		if (this.ended) return !1;
		s = t === ~~t ? t : !0 === t ? CONSTANTS.Z_FINISH : CONSTANTS.Z_NO_FLUSH;
		"string" == typeof e
			? (d.input = extraUtils.binstring2buf(e))
			: "[object ArrayBuffer]" === l.call(e)
			? (d.input = new Uint8Array(e))
			: (d.input = e);
		d.next_in = 0;
		d.avail_in = d.input.length;
		do {
			if (0 === d.avail_out) {
				d.output = new Utils.Buf8(E);
				d.next_out = 0;
				d.avail_out = E;
			}
			if ((n = exports_827948.inflate(d, CONSTANTS.Z_NO_FLUSH)) === CONSTANTS.Z_NEED_DICT && p) {
				_ =
					"string" == typeof p
						? extraUtils.string2buf(p)
						: "[object ArrayBuffer]" === l.call(p)
						? new Uint8Array(p)
						: p;
				n = exports_827948.inflateSetDictionary(this.strm, _);
			}
			if (n === CONSTANTS.Z_BUF_ERROR && !0 === h) {
				n = CONSTANTS.Z_OK;
				h = !1;
			}
			if (n !== CONSTANTS.Z_STREAM_END && n !== CONSTANTS.Z_OK) {
				this.onEnd(n);
				this.ended = !0;
				return !1;
			}
			if (
				d.next_out &&
				(0 === d.avail_out ||
					n === CONSTANTS.Z_STREAM_END ||
					(0 === d.avail_in && (s === CONSTANTS.Z_FINISH || s === CONSTANTS.Z_SYNC_FLUSH)))
			)
				if ("string" === this.options.to) {
					u = extraUtils.utf8border(d.output, d.next_out);
					c = d.next_out - u;
					f = extraUtils.buf2string(d.output, u);
					d.next_out = c;
					d.avail_out = E - c;
					c && Utils.arraySet(d.output, d.output, u, c, 0);
					this.onData(f);
				} else this.onData(Utils.shrinkBuf(d.output, d.next_out));
			0 === d.avail_in && 0 === d.avail_out && (h = !0);
		} while ((d.avail_in > 0 || 0 === d.avail_out) && n !== CONSTANTS.Z_STREAM_END);
		n === CONSTANTS.Z_STREAM_END && (s = CONSTANTS.Z_FINISH);
		if (s === CONSTANTS.Z_FINISH) {
			n = exports_827948.inflateEnd(this.strm);
			this.onEnd(n);
			this.ended = !0;
			return n === CONSTANTS.Z_OK;
		}
		if (s === CONSTANTS.Z_SYNC_FLUSH) {
			this.onEnd(CONSTANTS.Z_OK);
			d.avail_out = 0;
			return !0;
		}
		return !0;
	};
	Inflate.prototype.onData = function (e) {
		this.chunks.push(e);
	};
	Inflate.prototype.onEnd = function (e) {
		e === CONSTANTS.Z_OK &&
			("string" === this.options.to
				? (this.result = this.chunks.join(""))
				: (this.result = Utils.flattenChunks(this.chunks)));
		this.chunks = [];
		this.err = e;
		this.msg = this.strm.msg;
	};
	function inflate(e, t) {
		var n = new Inflate(t);
		n.push(e, !0);
		if (n.err) throw n.msg || s[n.err];
		return n.result;
	}
	exports_178843.Inflate = Inflate;
	exports_178843.inflate = inflate;
	exports_178843.inflateRaw = function (e, t) {
		(t = t || {}).raw = !0;
		return inflate(e, t);
	};
	exports_178843.ungzip = inflate;

	const defaultExport = {};
	Utils.assign(defaultExport, exports_178843, CONSTANTS);
	return defaultExport;
}
