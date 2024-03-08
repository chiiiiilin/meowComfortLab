<template>
	<div v-if="user && user.value && user.value.emailVerified">member</div>
	<div v-else>請先驗證信箱</div>
	<button class="btn" @click="handleLogout">logout</button>
	<button @click="sendVerificationEmail">重發驗證信</button>
</template>

<script setup>
const { user, logoutUser, sendVerificationEmail } = useFirebaseAuth();
const handleLogout = async () => {
	const isSuccess = await logoutUser();
	if (isSuccess) {
		navigateTo('/');
		console.log('登出成功');
	} else {
		console.log('登出失敗');
	}
};

onMounted(() => {
	if (!user.value) {
		navigateTo('/auth');
	}
});
</script>

<style lang="scss" scoped></style>
