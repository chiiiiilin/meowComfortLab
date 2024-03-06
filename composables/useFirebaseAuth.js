import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { useNuxtApp } from '#app';

export const useFirebaseAuth = () => {
	const nuxtApp = useNuxtApp();
	const $auth = nuxtApp.$auth; // 直接使用 $auth，無需類型斷言

	const user = useState('firebase_user', () => null);

	const registerUser = async (email, password) => {
		try {
			const userCreds = await createUserWithEmailAndPassword(
				$auth,
				email,
				password
			);
			if (userCreds) {
				user.value = userCreds.user; // 將用戶設置為 userCreds.user
				await sendEmailVerification(userCreds.user);
				return true;
			}
		} catch (error) {
			console.error(error.message); // 處理錯誤
			return false;
		}
		return false;
	};
	const loginUser = async (email, password) => {
		try {
			const userCreds = await signInWithEmailAndPassword(
				$auth,
				email,
				password
			);
			if (userCreds) {
				user.value = userCreds.user; // 更新用戶狀態

				return true; // 登入成功
			}
		} catch (error) {
			console.error(error.message); // 處理錯誤
			return false;
		}
		return false;
	};

	const loginWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup($auth, provider);
			if (result) {
				user.value = result.user; // 更新用戶狀態
				return true; // Google 登入成功
			}
		} catch (error) {
			console.error(error.message); // 處理錯誤
			return false;
		}
		return false;
	};

	const logoutUser = async () => {
		try {
			await signOut($auth); // 使用 Firebase Auth 的 signOut 方法登出
			user.value = null; // 清除用戶狀態
			return true; // 登出成功
		} catch (error) {
			console.error(error.message); // 處理錯誤
			return false;
		}
	};

	return { user, registerUser, loginUser, loginWithGoogle, logoutUser };
};
