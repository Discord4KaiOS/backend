// https://github.com/avengy/hcaptcha-bypass-discord/
// probably doesn't work anymore, not really used right  now

const crypto = require("crypto");
const http = require("http");
const https = require("https");
const querystring = require("querystring");

const headers = {
	Host: "hcaptcha.com",
	Connection: "keep-alive",
	"sec-ch-ua": 'Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92',
	Accept: "application/json",
	"sec-ch-ua-mobile": "?0",
	"User-Agent":
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
	"Content-type": "application/json; charset=utf-8",
	Origin: "https://newassets.hcaptcha.com",
	"Sec-Fetch-Site": "same-site",
	"Sec-Fetch-Mode": "cors",
	"Sec-Fetch-Dest": "empty",
	Referer: "https://newassets.hcaptcha.com/",
	"Accept-Language": "en-US,en;q=0.9",
};

function N_Data(req) {
	try {
		const x = "0123456789/:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		req = req.split(".");
		req = {
			header: JSON.parse(atob(req[0] + "=======")),
			payload: JSON.parse(atob(req[1] + "=======")),
			raw: {
				header: req[0],
				payload: req[1],
				signature: req[2],
			},
		};

		function a(r) {
			for (let t = r.length - 1; t >= 0; t--) {
				if (r[t] < x.length - 1) {
					r[t] += 1;
					return true;
				}
				r[t] = 0;
			}
			return false;
		}

		function i(r) {
			let t = "";
			for (let n = 0; n < r.length; n++) {
				t += x[r[n]];
			}
			return t;
		}

		function o(r, e) {
			let n = e;
			const hashed = crypto.createHash("sha1");
			hashed.update(e);
			const o = hashed.digest("hex");
			const t = hashed.digest();
			e = null;
			n = -1;
			o = [];
			for (let n = n + 1; n < 8 * t.length; n++) {
				e = (t[Math.floor(n / 8)] >> n % 8) & 1;
				o.push(e);
			}
			const a = o.slice(0, r);

			function index2(x, y) {
				if (x.includes(y)) {
					return x.indexOf(y);
				}
				return -1;
			}
			return (a[0] === 0 && index2(a, 1) >= r - 1) || index2(a, 1) === -1;
		}

		function get() {
			for (let e = 0; e < 25; e++) {
				const n = Array(e).fill(0);
				while (a(n)) {
					const u = req["payload"]["d"] + "::" + i(n);
					if (o(req["payload"]["s"], u)) {
						return i(n);
					}
				}
			}
		}

		const result = get();
		const hsl = [
			"1",
			req["payload"]["s"].toString(),
			new Date().toISOString().slice(0, 19).replace(/[-:]/g, ""),
			req["payload"]["d"],
			"",
			result,
		].join(":");
		return hsl;
	} catch (e) {
		console.log(e);
		return false;
	}
}

function REQ_Data(host, sitekey, proxy) {
	try {
		const options = {
			headers: headers,
			agent: new http.Agent({ keepAlive: true }),
			timeout: 4000,
		};
		const r = https.get(
			`https://hcaptcha.com/checksiteconfig?host=${host}&sitekey=${sitekey}&sc=1&swa=1`,
			options,
			(res) => {
				let data = "";
				res.on("data", (chunk) => {
					data += chunk;
				});
				res.on("end", () => {
					const json = JSON.parse(data);
					if (json["pass"]) {
						return json["c"];
					} else {
						return false;
					}
				});
			}
		);
		r.on("error", () => {
			return false;
		});
	} catch {
		return false;
	}
}

function Get_Captcha(host, sitekey, n, req, proxy) {
	try {
		const json = {
			sitekey: sitekey,
			v: "b1129b9",
			host: host,
			n: n,
			motiondata:
				'{"st":1628923867722,"mm":[[203,16,1628923874730],[155,42,1628923874753],[137,53,1628923874770],[122,62,1628923874793],[120,62,1628923875020],[107,62,1628923875042],[100,61,1628923875058],[93,60,1628923875074],[89,59,1628923875090],[88,59,1628923875106],[87,59,1628923875131],[87,59,1628923875155],[84,56,1628923875171],[76,51,1628923875187],[70,47,1628923875203],[65,44,1628923875219],[63,42,1628923875235],[62,41,1628923875251],[61,41,1628923875307],[58,39,1628923875324],[54,38,1628923875340],[49,36,1628923875363],[44,36,1628923875380],[41,35,1628923875396],[40,35,1628923875412],[38,35,1628923875428],[38,35,1628923875444],[37,35,1628923875460],[37,35,1628923875476],[37,35,1628923875492]],"mm-mp":13.05084745762712,"md":[[37,35,1628923875529]],"md-mp":0,"mu":[[37,35,1628923875586]],"mu-mp":0,"v":1,"topLevel":{"st":1628923867123,"sc":{"availWidth":1680,"availHeight":932,"width":1680,"height":1050,"colorDepth":30,"pixelDepth":30,"availLeft":0,"availTop":23},"nv":{"vendorSub":"","productSub":"20030107","vendor":"Google Inc.","maxTouchPoints":0,"userActivation":{},"doNotTrack":null,"geolocation":{},"connection":{},"webkitTemporaryStorage":{},"webkitPersistentStorage":{},"hardwareConcurrency":12,"cookieEnabled":true,"appCodeName":"Mozilla","appName":"Netscape","appVersion":"5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36","platform":"MacIntel","product":"Gecko","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36","language":"en-US","languages":["en-US","en"],"onLine":true,"webdriver":false,"serial":{},"scheduling":{},"xr":{},"mediaCapabilities":{},"permissions":{},"locks":{},"usb":{},"mediaSession":{},"clipboard":{},"credentials":{},"keyboard":{},"mediaDevices":{},"storage":{},"serviceWorker":{},"wakeLock":{},"deviceMemory":8,"hid":{},"presentation":{},"userAgentData":{},"bluetooth":{},"managed":{},"plugins":["internal-pdf-viewer","mhjfbmdgcfjbbpaeojofohoefgiehjai","internal-nacl-plugin"]},"dr":"https://discord.com/","inv":false,"exec":false,"wn":[[1463,731,2,1628923867124],[733,731,2,1628923871704]],"wn-mp":4580,"xy":[[0,0,1,1628923867125]],"xy-mp":0,"mm":[[1108,233,1628923867644],[1110,230,1628923867660],[1125,212,1628923867678],[1140,195,1628923867694],[1158,173,1628923867711],[1179,152,1628923867727],[1199,133,1628923867744],[1221,114,1628923867768],[1257,90,1628923867795],[1272,82,1628923867811],[1287,76,1628923867827],[1299,71,1628923867844],[1309,68,1628923867861],[1315,66,1628923867877],[1326,64,1628923867894],[1331,62,1628923867911],[1336,60,1628923867927],[1339,58,1628923867944],[1343,56,1628923867961],[1345,54,1628923867978],[1347,53,1628923867994],[1348,52,1628923868011],[1350,51,1628923868028],[1354,49,1628923868045],[1366,44,1628923868077],[1374,41,1628923868094],[1388,36,1628923868110],[1399,31,1628923868127],[1413,25,1628923868144],[1424,18,1628923868161],[1436,10,1628923868178],[1445,3,1628923868195],[995,502,1628923871369],[722,324,1628923874673],[625,356,1628923874689],[523,397,1628923874705],[457,425,1628923874721]],"mm-mp":164.7674418604651},"session":[],"widgetList":["0a1l5c3yudk4"],"widgetId":"0a1l5c3yudk4","href":"https://discord.com/register","prev":{"escaped":false,"passed":false,"expiredChallenge":false,"expiredResponse":false}}',
			hl: "en",
			c: JSON.stringify(req),
		};
		const data = querystring.stringify(json);
		const options = {
			headers: headers,
			agent: new http.Agent({ keepAlive: true }),
			method: "POST",
			timeout: 4000,
		};
		const r = https.request(`https://hcaptcha.com/getcaptcha?s=${sitekey}`, options, (res) => {
			let data = "";
			res.on("data", (chunk) => {
				data += chunk;
			});
			res.on("end", () => {
				const json = JSON.parse(data);
				return json;
			});
		});
		r.on("error", () => {
			return false;
		});
		r.write(data);
		r.end();
	} catch (e) {
		console.log(e);
		return false;
	}
}

function bypass(sitekey, host, proxy) {
	try {
		const req = REQ_Data(sitekey, host, proxy);
		req["type"] = "hsl";
		const n = N_Data(req["req"]);
		const res = Get_Captcha(sitekey, host, n, req, proxy);
		if ("generated_pass_UUID" in res) {
			const captcha = res["generated_pass_UUID"];
			return captcha;
		} else {
			return false;
		}
	} catch {
		return false;
	}
}
