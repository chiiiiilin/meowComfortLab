import { getAuth } from 'firebase/auth';

export default defineNuxtRouteMiddleware((to, from, next) => {
	const auth = getAuth();
	const user = auth.currentUser;
	console.log('middleware', auth);
	if (to.path.startsWith('/member') && (!user || !user.emailVerified)) {
		// 如果用戶未登入或郵箱未驗證且試圖訪問需要認證的路徑，重定向到登入頁面
		return navigateTo('/auth');
	}
});
