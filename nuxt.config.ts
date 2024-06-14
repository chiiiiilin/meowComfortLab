import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default defineNuxtConfig({
	vite: {
		plugins: [
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
				//代表所有svg檔案都會放在assets/icons資歷夾裡
				symbolId: '[dir]/[name]',
				customDomId: '__svg__icons__dom__',
			}),
		],
	},
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
	css: ['~/assets/css/style.css'],
	plugins: [
		{ src: '~/plugins/firebase.client.ts', mode: 'client' },
		'~/plugins/gsap.js',
		{ src: '~/plugins/lenis.client.ts', mode: 'client' },
	],
	nitro: {
		preset: 'firebase',
		firebase: {
			gen: 2,
		},
	},
	runtimeConfig: {
		public: {
			firebaseApiKey: process.env.FIREBASE_API_KEY,
			firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
			firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
			firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
			firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			firebaseAppId: process.env.FIREBASE_APP_ID,
			measurementId: process.env.FIREBASE_MEASUREMENT_ID,
		},
	},
});
