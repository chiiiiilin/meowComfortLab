import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import gsap from 'gsap';

interface ToastOptions {
	message: string;
	type: string;
	duration?: number;
}
interface Toast {
	showToast(options: ToastOptions): void;
}

declare module '#app' {
	interface NuxtApp {
		$auth: Auth;
		$firestore: Firestore;
		$toast: Toast;
	}
}

declare module '#app' {
	interface NuxtApp {
		$gsap: typeof gsap;
	}
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$gsap: typeof gsap;
	}
}
