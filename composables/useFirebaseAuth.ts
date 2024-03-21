import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNuxtApp } from '#app';

export const useFirebaseAuth = () => {
	const { $auth, $firestore } = useNuxtApp(); //firebase.client.js有設置plugin

	const user = useState<User | null>('firebase_user', () => null);
	const authInitialized = useState<boolean>('auth_initialized', () => false);

	const initAuthStateListener = (): Promise<void> => {
		return new Promise((resolve) => {
			$auth.onAuthStateChanged(async (firebaseUser: User | null) => {
				user.value = firebaseUser;
				authInitialized.value = true;
				if (firebaseUser) {
					try {
						await saveUserToFirestore(firebaseUser);
					} catch (error) {
						console.error('Error saving user to Firestore:', error);
					}
				}
				resolve();
			});
		});
	};

	const registerUser = async (email: string, password: string) => {
		try {
			const userCreds = await createUserWithEmailAndPassword(
				$auth,
				email,
				password
			);
			if (userCreds) {
				user.value = userCreds.user;
				await sendEmailVerification(userCreds.user);
				return true;
			}
		} catch (error: any) {
			console.error(error.message);
			return false;
		}
		return false;
	};
	const loginUser = async (email: string, password: string) => {
		try {
			const userCreds = await signInWithEmailAndPassword(
				$auth,
				email,
				password
			);
			if (userCreds) {
				user.value = userCreds.user;
				await saveUserToFirestore(user.value);
				return true;
			}
		} catch (error: any) {
			console.error(error.message);
			throw error;
		}
		return false;
	};

	const loginWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup($auth, provider);
			if (result) {
				user.value = result.user;
				await saveUserToFirestore(result.user);
				return true;
			}
		} catch (error: any) {
			console.error(error.message);
			return false;
		}
		return false;
	};

	const logoutUser = async () => {
		try {
			await signOut($auth);
			user.value = null;
			return true;
		} catch (error: any) {
			console.error(error.message);
			return false;
		}
	};

	const sendVerificationEmail = async () => {
		if (user.value && !user.value.emailVerified) {
			try {
				await sendEmailVerification(user.value as User);
				return { success: true };
			} catch (error: any) {
				console.error(error.message);
				return { success: false, message: error.code };
			}
		}
		return false;
	};

	const passwordReset = async (emailAddress: string) => {
		try {
			await sendPasswordResetEmail($auth, emailAddress);
			return true;
		} catch (error: any) {
			console.error(error);
			return false;
		}
	};

	const saveUserToFirestore = async (user: User) => {
		if (!user.uid) return;
		const userRef = doc($firestore, 'users', user.uid);
		try {
			await setDoc(
				userRef,
				{
					name: user.displayName || '',
					email: user.email,
					emailVerified: user.emailVerified,
				},
				{ merge: true }
			);
		} catch (error: any) {
			console.error('Error saving user data:', error.message);
		}
	};

	const getUserInfo = async (user: User) => {
		if (!user) return null;

		const userRef = doc($firestore, 'users', user.uid);
		const docSnap = await getDoc(userRef);
		return docSnap.exists() ? docSnap.data() : null;
	};

	// 在會員中心更新用戶資訊時也更新 firebase Auth 資訊避免之後登入被覆蓋
	const updateUserAuthProfile = async (
		user: User,
		updates: { displayName?: string }
	) => {
		try {
			await updateProfile(user, updates);
			return true;
		} catch (error) {
			console.error('Failed to update authentication profile', error);
			return false;
		}
	};

	// 在會員中心更新 Firestore 中的用戶資訊
	const updateUserFirestoreDoc = async (uid: string, userInfo: UserInfo) => {
		try {
			const userRef = doc($firestore, 'users', uid);
			await setDoc(userRef, userInfo, { merge: true });
			return true;
		} catch (error) {
			console.error('Failed to update Firestore document', error);
			return false;
		}
	};

	interface UserInfo {
		name: string;
		email: string;
		phone: string;
		address: {
			city: string;
			district: string;
			detail: string;
			zip: string;
		};
	}
	return {
		user,
		authInitialized,
		initAuthStateListener,
		registerUser,
		loginUser,
		loginWithGoogle,
		logoutUser,
		sendVerificationEmail,
		passwordReset,
		saveUserToFirestore,
		getUserInfo,
		updateUserAuthProfile,
		updateUserFirestoreDoc,
	};
};
