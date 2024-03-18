import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

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
		$toast: Toast
	}
}
