import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNuxtApp } from '#app';

export const useFirebaseAuth = () => {
	const { $auth, $firestore } = useNuxtApp(); //firebase.client.js有設置plugin

	const user = useState('firebase_user', () => null);

	const registerUser = async (email, password) => {
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
		} catch (error) {
			console.error(error.message);
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
				user.value = userCreds.user;
				await saveUserToFirestore(user.value);
				return true;
			}
		} catch (error) {
			console.error(error.message);
			return false;
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
		} catch (error) {
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
		} catch (error) {
			console.error(error.message);
			return false;
		}
	};

	const sendVerificationEmail = async () => {
		if (user.value && !user.value.emailVerified) {
			await sendEmailVerification(user.value);
			console.log('Verification email sent.');
		} else {
			console.log('User is not logged in or already verified.');
		}
	};

	const passwordReset = async (emailAddress) => {
		try {
			await sendPasswordResetEmail($auth, emailAddress);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	const saveUserToFirestore = async (user) => {
		const userRef = doc($firestore, 'users', user.uid);
		// 抓現有的user
		const docSnap = await getDoc(userRef);
		// 如果沒有這個user才要建立
		if (!docSnap.exists()) {
			try {
				await setDoc(
					userRef,
					{
						name: user.displayName,
						email: user.email,
						emailVerified: user.emailVerified,
					},
					{ merge: true }
				);
			} catch (error) {
				console.error('Error saving user data:', error);
			}
		}
	};

	return {
		user,
		registerUser,
		loginUser,
		loginWithGoogle,
		logoutUser,
		sendVerificationEmail,
		passwordReset,
		saveUserToFirestore,
	};
};
