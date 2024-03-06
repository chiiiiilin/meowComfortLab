export default defineNuxtPlugin((nuxtApp) => {
	const mainStore = useMainStore();

	nuxtApp.$router.beforeEach((to, from, next) => {
		mainStore.closeNav();
		next();
	});
});
