<template>
	<div class="p-3 max-w-screen-xl m-auto py-20 lg:flex">
		<aside class="hidden lg:block p-3 w-1/5">
			<menu>
				<ul class="w-fit">
					<template
						v-for="item in mainStore.navItems"
						:key="item.source"
					>
						<template v-if="item.source === 'member'">
							<li
								v-for="subItem in item.children"
								:key="subItem.source"
							>
								<NuxtLink
									:to="`/${subItem.source}`"
									class="flex items-center py-1 px-3 hover:text-primary-dark cursor-pointer"
								>
									<div
										v-if="subItem.svg"
										v-html="subItem.svg"
									></div>
									{{ subItem.name }}
								</NuxtLink>
							</li>
							<li
								class="cursor-pointer text-primary-dark flex items-center py-1 px-3"
								@click="handleLogout"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4 mr-2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
									/>
								</svg>
								登出
							</li>
						</template>
					</template>
				</ul>
			</menu>
		</aside>
		<main class="w-full lg:w-4/5">
			<NuxtPage />
		</main>
	</div>
</template>

<script setup lang="ts">
const mainStore = useMainStore();
const authStore = useAuthStore();
const { $toast } = useNuxtApp();
const { user } = storeToRefs(authStore);
const { initAuthStateListener, logoutUser } = authStore;

const handleLogout = async () => {
	const isSuccess = await logoutUser();
	if (isSuccess) {
		navigateTo('/');
		$toast.showToast({
			message: '已登出',
			type: 'success',
		});
	} else {
		$toast.showToast({
			message: '登出失敗',
			type: 'error',
		});
	}
};

onMounted(async () => {
	await initAuthStateListener();
	if (!user.value) {
		navigateTo('/auth');
	}
});
</script>

<style lang="scss" scoped></style>
