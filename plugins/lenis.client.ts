import { defineNuxtPlugin } from '#app';
import Lenis from '@studio-freight/lenis';

export default defineNuxtPlugin((nuxtApp) => {
	const lenis = new Lenis({
		smoothWheel: true,
		duration: 1.5,
	});

	function raf(time: number) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	nuxtApp.provide('lenis', lenis);
});
