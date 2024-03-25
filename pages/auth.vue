<script setup lang="ts">
const authStore = useAuthStore();
const { $toast } = useNuxtApp();
const { registerUser, loginUser, loginWithGoogle, passwordReset } = authStore;

const cardActive = ref('isLogin');
const creds = reactive({
	email: '',
	password: '',
	passwordCheck: '',
});
const handleRegistration = async () => {
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(creds.email)) {
		$toast.showToast({
			message: '請輸入有效的電子郵件',
			type: 'error',
		});
	} else if (creds.password !== creds.passwordCheck) {
		$toast.showToast({
			message: '密碼驗證錯誤',
			type: 'error',
		});
	} else if (creds.password.length < 6) {
		$toast.showToast({
			message: '密碼最少需6個字元',
			type: 'error',
		});
	} else if (!/[A-Za-z]/.test(creds.password)) {
		$toast.showToast({
			message: '密碼必須包含至少一個英文字母',
			type: 'error',
		});
	} else if (/[^A-Za-z0-9]/.test(creds.password)) {
		$toast.showToast({
			message: '密碼不可含有符號及空格',
			type: 'error',
		});
	}

	try {
		const isSuccess = await registerUser(creds.email, creds.password);
		if (isSuccess) {
			$toast.showToast({
				message: '註冊成功',
				type: 'success',
			});
			cardActive.value = 'isLogin';
		}
	} catch (error: any) {
		let errorMessage = '';
		if (
			error.response &&
			error.response.data &&
			error.response.data.error
		) {
			switch (error.response.data.error.message) {
				case 'EMAIL_EXISTS':
					errorMessage = '此電子郵件已被註冊';
					break;
				default:
					errorMessage = '發生未知錯誤，請稍後再試';
					break;
			}
		}

		$toast.showToast({
			message: errorMessage,
			type: 'error',
		});
	}
};
const handleLogin = async () => {
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(creds.email)) {
		$toast.showToast({
			message: '請輸入有效的電子郵件',
			type: 'error',
		});
	} else if (creds.password.length < 6) {
		$toast.showToast({
			message: '密碼最少需6個字元',
			type: 'error',
		});
	} else if (!/[A-Za-z]/.test(creds.password)) {
		$toast.showToast({
			message: '密碼必須包含至少一個英文字母',
			type: 'error',
		});
	} else if (/[^A-Za-z0-9]/.test(creds.password)) {
		$toast.showToast({
			message: '密碼不可含有符號及空格',
			type: 'error',
		});
	}
	try {
		const isSuccess = await loginUser(creds.email, creds.password);
		if (isSuccess) {
			$toast.showToast({
				message: '登入成功',
				type: 'success',
			});
			navigateTo('/member');
		}
	} catch (error: any) {
		let errorMessage = '';

		switch (error.code) {
			case 'auth/invalid-credential':
				errorMessage = '請重新檢查電子郵件及密碼';
				break;
			case 'auth/wrong-password':
				errorMessage = '密碼錯誤';
				break;
			default:
				errorMessage = '發生未知錯誤，請稍後再試';
				break;
		}

		$toast.showToast({
			message: errorMessage,
			type: 'error',
		});
	}
};

const handleLoginWithGoogle = async () => {
	const isSuccess = await loginWithGoogle();
	if (isSuccess) {
		$toast.showToast({
			message: '登入成功',
			type: 'success',
		});
		navigateTo('/member');
	} else {
		$toast.showToast({
			message: '登入失敗',
			type: 'error',
		});
	}
};

const handlePasswordReset = async () => {
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(creds.email)) {
		$toast.showToast({
			message: '請輸入有效的電子郵件',
			type: 'error',
		});
		return;
	}
	const isSuccess = await passwordReset(creds.email);
	if (isSuccess) {
		$toast.showToast({
			message: '請至電子信箱重設密碼',
			type: 'success',
		});
	} else {
		$toast.showToast({
			message: '重設密碼郵件發送失敗，請重試。',
			type: 'error',
		});
	}
};
</script>

<template>
	<div class="h-screen background pt-[30%] lg:pt-[15%]">
		<div class="card w-11/12 lg:w-1/4 glass m-auto lg:ml-[65%]">
			<div class="card-body">
				<div class="flex w-full justify-between text-center">
					<h2
						class="w-1/2 py-3 cursor-pointer font-bold"
						:class="{
							'text-primary-dark': cardActive === 'isLogin',
							'text-gray-300': cardActive !== 'isLogin',
						}"
						@click="cardActive = 'isLogin'"
					>
						登入
					</h2>
					<h2
						class="w-1/2 py-3 cursor-pointer font-bold"
						:class="{
							'text-primary-dark':
								cardActive === 'isRegistration',
							'text-gray-300': cardActive !== 'isRegistration',
						}"
						@click="cardActive = 'isRegistration'"
					>
						註冊
					</h2>
				</div>
				<template v-if="cardActive === 'isLogin'">
					<form @submit.prevent="handleLogin">
						<label
							class="input input-ghost input-sm flex items-center gap-3 my-3"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="w-4 h-4 opacity-70"
							>
								<path
									d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
								/>
								<path
									d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
								/>
							</svg>
							<input
								type="email"
								class="grow"
								placeholder="請輸入電子郵件信箱"
								v-model="creds.email"
							/>
						</label>
						<label
							class="input input-ghost input-sm flex items-center gap-3 my-3"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="w-4 h-4 opacity-70"
							>
								<path
									fill-rule="evenodd"
									d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
									clip-rule="evenodd"
								/>
							</svg>
							<input
								type="password"
								class="grow"
								placeholder="請輸入密碼"
								v-model="creds.password"
							/>
						</label>
						<div class="text-right mt-[-12px]">
							<span
								class="text-xs text-primary-dark cursor-pointer hover:text-black"
								@click="handlePasswordReset"
								>忘記密碼?</span
							>
						</div>
						<button
							class="btn btn-sm btn-block btn-accent mt-5"
							type="submit"
						>
							登入
						</button>
					</form>
					<a
						class="text-accent hover:text-yellow-600 text-center cursor-pointer text-sm tracking-wider"
						@click="handleLoginWithGoogle"
						>以 google 帳號登入</a
					>
				</template>
				<template v-else-if="cardActive === 'isRegistration'">
					<form @submit.prevent="handleRegistration">
						<label
							class="input input-ghost input-sm flex items-center gap-3 my-3"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="w-4 h-4 opacity-70"
							>
								<path
									d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
								/>
								<path
									d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
								/>
							</svg>
							<input
								type="email"
								class="grow"
								placeholder="請輸入電子郵件信箱"
								v-model="creds.email"
							/>
						</label>
						<label
							class="input input-ghost input-sm flex items-center gap-3 my-3"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="w-4 h-4 opacity-70"
							>
								<path
									fill-rule="evenodd"
									d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
									clip-rule="evenodd"
								/>
							</svg>
							<input
								type="password"
								class="grow"
								placeholder="請設6個字元以上英數組合密碼"
								v-model="creds.password"
							/>
						</label>
						<label
							class="input input-ghost input-sm flex items-center gap-3 my-3"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="w-4 h-4 opacity-70"
							>
								<path
									fill-rule="evenodd"
									d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
									clip-rule="evenodd"
								/>
							</svg>
							<input
								type="password"
								class="grow"
								placeholder="請再次輸入密碼"
								v-model="creds.passwordCheck"
							/>
						</label>
						<button
							class="btn btn-sm btn-block btn-accent mt-5"
							type="submit"
						>
							註冊
						</button>
					</form>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped>
.background {
	background-image: url('https://images.unsplash.com/photo-1571570703598-39eb580a0329?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
	background-position: bottom;
}
</style>
