<template>
	<div>member</div>
	<button class="btn" @click="handleLogout">logout</button>
</template>

<script setup>
const { logoutUser } = useFirebaseAuth();
definePageMeta({
	middleware: 'auth',
});

const handleLogout = async () => {
	const isSuccess = await logoutUser();
	if (isSuccess) {
		console.log('登出成功');
	} else {
		console.log('登出失敗');
	}
};
</script>

<style lang="scss" scoped></style>
