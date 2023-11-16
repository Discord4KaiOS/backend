/**
 * this file contains the polyfills that will be loaded before anything else
 * WARNING: the code will also be executed in workers, be cautious in adding polyfills
 */
const s = self;

// this is needed because esbuild es6 transpiled code requires it
Object.getOwnPropertyDescriptors ||= function getOwnPropertyDescriptors(obj) {
	if (obj === null || obj === undefined) {
		throw new TypeError("Cannot convert undefined or null to object");
	}

	const protoPropDescriptor = Object.getOwnPropertyDescriptor(obj, "__proto__");
	const descriptors = protoPropDescriptor ? { ["__proto__"]: protoPropDescriptor } : {};

	for (let name of Object.getOwnPropertyNames(obj)) {
		descriptors[name] = Object.getOwnPropertyDescriptor(obj, name);
	}

	return descriptors;
};

if (s.NodeList) NodeList.prototype.forEach ||= Array.prototype.forEach;

// code stolen here: https://github.com/ustccjw/unhandled-rejection-polyfill/blob/master/src/index.js
if (typeof PromiseRejectionEvent === "undefined") {
	const Promise = s.Promise;

	function dispatchUnhandledRejectionEvent(promise, reason) {
		const event = document.createEvent("Event");
		Object.defineProperties(event, {
			promise: {
				value: promise,
				writable: false,
			},
			reason: {
				value: reason,
				writable: false,
			},
		});
		event.initEvent("unhandledrejection", false, true);
		s.dispatchEvent(event);
		console.error(promise);
	}

	var MyPromise = function (resolver) {
		if (!(this instanceof MyPromise)) {
			throw new TypeError("Cannot call a class as a function");
		}
		const promise = new Promise((resolve, reject) => {
			const customReject = (reason) => {
				// macro-task(setTimeout) will execute after micro-task(promise)
				setTimeout(() => {
					if (promise.handled !== true) dispatchUnhandledRejectionEvent(promise, reason);
				}, 0);
				return reject(reason);
			};
			try {
				return resolver(resolve, customReject);
			} catch (err) {
				return customReject(err);
			}
		});
		promise.__proto__ = MyPromise.prototype;
		return promise;
	};

	MyPromise.__proto__ = Promise;
	MyPromise.prototype.__proto__ = Promise.prototype;

	MyPromise.prototype.then = function (resolve, reject) {
		return Promise.prototype.then.call(
			this,
			resolve,
			reject &&
				((reason) => {
					this.handled = true;
					return reject(reason);
				})
		);
	};

	MyPromise.prototype.catch = function (reject) {
		return Promise.prototype.catch.call(
			this,
			reject &&
				((reason) => {
					this.handled = true;
					return reject(reason);
				})
		);
	};

	s.Promise = MyPromise;
}

// Source: https://gitlab.com/ollycross/element-polyfill
(function (arr) {
	function docFragger(args) {
		const docFrag = document.createDocumentFragment();

		args.forEach((argItem) => docFrag.appendChild(argItem instanceof Node ? argItem : document.createTextNode(String(argItem))));

		return docFrag;
	}

	const { defineProperty } = Object;

	function define(item, name, value) {
		defineProperty(item, name, { configurable: true, enumerable: true, writable: true, value });
	}

	arr.forEach(function (item) {
		if (!item) return;
		if (!item.hasOwnProperty("append")) {
			define(item, "append", function append(...args) {
				this.appendChild(docFragger(args));
			});
		}
		if (!item.hasOwnProperty("prepend")) {
			define(item, "prepend", function prepend(...args) {
				this.insertBefore(docFragger(args), this.firstChild);
			});
		}
		if (!item.hasOwnProperty("after")) {
			define(item, "after", function after(...argArr) {
				var docFrag = document.createDocumentFragment();

				argArr.forEach(function (argItem) {
					docFrag.appendChild(argItem instanceof Node ? argItem : document.createTextNode(String(argItem)));
				});

				this.parentNode.insertBefore(docFrag, this.nextSibling);
			});
		}
	});
})([s.Element?.prototype, s.Document?.prototype, s.DocumentFragment?.prototype]);

if (s.Document) {
	// toFix that weird is=undefined attribute that happens because KaiOS tries to do webcomponents but fails miserably
	const createElOriginal = Document.prototype.createElement;

	Document.prototype.createElement = function (type) {
		return createElOriginal.call(this, type);
	};
}
