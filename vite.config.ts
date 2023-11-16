import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import polyfillKaiOS from "./scripts/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact(), polyfillKaiOS()],
	server: {
		port: 3000,
	},
	build: {
		target: "es6",
		cssTarget: "firefox48",
		cssCodeSplit: false,
		modulePreload: false,
		assetsInlineLimit: 0,
		minify: true,
		ssr: false,
		rollupOptions: {
			output: {
				format: "iife",
			},
		},
	},
	worker: {
		plugins: [polyfillKaiOS()],
	},
});
