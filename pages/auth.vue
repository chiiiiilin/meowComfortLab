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
	<div
		class="h-screen background bg-fixed bg-no-repeat bg-cover bg-center pt-[30%] lg:pt-[15%]"
	>
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
							<SvgIcon
								name="email-filled"
								class="w-4 h-4 opacity-70"
							></SvgIcon>
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
							<SvgIcon
								name="password-filled"
								class="w-4 h-4 opacity-70"
							></SvgIcon>
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
							<SvgIcon
								name="email-filled"
								class="w-4 h-4 opacity-70"
							></SvgIcon>
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
							<SvgIcon
								name="password-filled"
								class="w-4 h-4 opacity-70"
							></SvgIcon>
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
							<SvgIcon
								name="password-filled"
								class="w-4 h-4 opacity-70"
							></SvgIcon>
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
}
</style>
