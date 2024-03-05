import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();

	const firebaseConfig = {
		apiKey: 'AIzaSyCcJN7JqOqswEo1cr8cYV1IFvW3Gi6bgJ4',
		authDomain: 'meow-comfort-lab.firebaseapp.com',
		projectId: 'meow-comfort-lab',
		storageBucket: 'meow-comfort-lab.appspot.com',
		messagingSenderId: '876976346525',
		appId: '1:876976346525:web:33cd50668de8ba25fa0b74',
		measurementId: 'G-KN3K8VFVRQ',
	};

	const app = initializeApp(firebaseConfig);

	const analytics = getAnalytics(app);
	const auth = getAuth(app);

	nuxtApp.vueApp.provide('auth', auth);
	nuxtApp.provide('auth', auth);

});
