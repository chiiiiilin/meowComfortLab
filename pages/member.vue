<template>
	<div>member</div>
	<button class="btn" @click="handleLogout">logout</button>
</template>

<script setup>
const { logoutUser } = useFirebaseAuth();

const handleLogout = async () => {
	const isSuccess = await logoutUser();
	if (isSuccess) {
		console.log('登出成功');
	} else {
		console.log('登出失敗');
	}
};

onMounted(() => {
	const { user } = useFirebaseAuth();
	if (!user.value || !user.value.emailVerified) {
		navigateTo('/auth');
	}
});
</script>

<style lang="scss" scoped></style>
