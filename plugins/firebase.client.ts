import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();

	const firebaseConfig = {
		apiKey: config.public.firebaseApiKey,
		authDomain: config.public.firebaseAuthDomain,
		projectId: config.public.firebaseProjectId,
		storageBucket: config.public.firebaseStorageBucket,
		messagingSenderId: config.public.firebaseMessagingSenderId,
		appId: config.public.firebaseAppId,
	};

	const app = initializeApp(firebaseConfig);

	const auth = getAuth(app);
	const firestore = getFirestore(app);
	const storage = getStorage(app);

	nuxtApp.vueApp.provide('auth', auth);
	nuxtApp.provide('auth', auth);

	nuxtApp.vueApp.provide('firestore', firestore);
	nuxtApp.provide('firestore', firestore);

	nuxtApp.vueApp.provide('storage', storage);
	nuxtApp.provide('storage', storage);
});
