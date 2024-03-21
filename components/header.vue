<template>
	<header class="bg-primary shadow-lg fixed w-full z-[999]">
		<div
			class="max-w-screen-xl px-3 flex justify-between items-center mx-auto"
		>
			<h1 class="h-[45px] p-1 lg:h-[60px]">
				<NuxtLink to="/"
					><img
						src="/image/logo-large.svg"
						alt=""
						class="w-full h-full object-contain"
				/></NuxtLink>
			</h1>
			<!-- 電腦 -->
			<nav>
				<ul
					class="flex list-none items-center h-full justify-items-end"
				>
					<li
						v-for="navItem in mainStore.navItems"
						:key="navItem.name"
						class="px-2 lg:px-3.5"
					>
						<NuxtLink
							:to="`/${navItem['source']}`"
							class="hover:text-primary-dark transition"
						>
							<template v-if="navItem.icon">
								<div
									v-if="navItem.name === '會員專區'"
									class="hidden lg:block"
								>
									<svg
										width="25"
										height="25"
										viewBox="0 0 59 61"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M29.5 45.75V53.375"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M19.3594 36.2188C20.8868 36.2188 22.125 34.9386 22.125 33.3594C22.125 31.7802 20.8868 30.5 19.3594 30.5C17.832 30.5 16.5938 31.7802 16.5938 33.3594C16.5938 34.9386 17.832 36.2188 19.3594 36.2188Z"
											fill="black"
										/>
										<path
											d="M39.6406 36.2188C41.168 36.2188 42.4062 34.9386 42.4062 33.3594C42.4062 31.7802 41.168 30.5 39.6406 30.5C38.1132 30.5 36.875 31.7802 36.875 33.3594C36.875 34.9386 38.1132 36.2188 39.6406 36.2188Z"
											fill="black"
										/>
										<path
											d="M29.5 11.4375V20.9688"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M33.1875 41.9375L29.5 45.75L25.8125 41.9375"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M22.125 12.6289V20.9688"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M36.875 12.6289V20.9688"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M7.375 32.4063V12.2238C7.37561 11.8458 7.4849 11.4766 7.68898 11.1629C7.89306 10.8493 8.18271 10.6055 8.52113 10.4625C8.85955 10.3195 9.23145 10.2837 9.58958 10.3597C9.94771 10.4357 10.2759 10.6201 10.5324 10.8895L15.5797 16.1078C19.6119 13.0411 24.4944 11.4031 29.5 11.4375C34.5056 11.4031 39.3881 13.0411 43.4203 16.1078V16.1078L48.4676 10.8895C48.7241 10.6201 49.0523 10.4357 49.4104 10.3597C49.7685 10.2837 50.1405 10.3195 50.4789 10.4625C50.8173 10.6055 51.1069 10.8493 51.311 11.1629C51.5151 11.4766 51.6244 11.8458 51.625 12.2238V32.4063C51.625 43.9867 41.7148 53.375 29.5 53.375C17.2852 53.375 7.375 43.9867 7.375 32.4063Z"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
								<div v-else-if="navItem.name === '購物車'">
									<svg
										width="25"
										height="25"
										viewBox="0 0 56 58"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M40.25 41.6875H15.2688L9.16563 6.93281C9.09422 6.5166 8.88459 6.13934 8.57301 5.86628C8.26144 5.59322 7.86751 5.44155 7.45937 5.4375H3.5"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M17.5 50.75C19.9162 50.75 21.875 48.7213 21.875 46.2188C21.875 43.7162 19.9162 41.6875 17.5 41.6875C15.0838 41.6875 13.125 43.7162 13.125 46.2188C13.125 48.7213 15.0838 50.75 17.5 50.75Z"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M40.25 50.75C42.6662 50.75 44.625 48.7213 44.625 46.2188C44.625 43.7162 42.6662 41.6875 40.25 41.6875C37.8338 41.6875 35.875 43.7162 35.875 46.2188C35.875 48.7213 37.8338 50.75 40.25 50.75Z"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M13.6719 32.625H41.1469C41.9649 32.6276 42.7577 32.3314 43.3858 31.7886C44.0139 31.2458 44.4372 30.4911 44.5813 29.657L47.25 14.5H10.5"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
							</template>
							<div v-else class="hidden lg:block">
								{{ navItem['name'] }}
							</div>
						</NuxtLink>
					</li>
					<!-- 手機 -->
					<img
						src="https://chiiiiilin.github.io/lifecat/pictures/hb.svg"
						alt=""
						class="w-7 h-7 cursor-pointer ml-3 lg:hidden"
						@click="mainStore.toggleNav"
					/>
				</ul>
			</nav>
		</div>
	</header>
	<!-- 手機 -->
	<nav
		class="fixed w-full top-[45px] left-0 bg-primary p-5 transition duration-500 shadow-md z-[998]"
		:class="{
			'translate-y-0': mainStore.isNavOpen,
			'translate-y-[-120%]': !mainStore.isNavOpen,
		}"
	>
		<ul class="list-none flex flex-col">
			<template v-for="navItem in mainStore.navItems" :key="navItem.name">
				<li
					v-if="!navItem.icon"
					class="w-full py-1 hover:text-primary-dark cursor-pointer"
				>
					<NuxtLink
						:to="`/${navItem['source']}`"
						class="w-full block"
					>
						{{ navItem['name'] }}
					</NuxtLink>
				</li>
			</template>
			<div class="w-full h-[0.5px] my-4 bg-gray-400"></div>
			<template v-if="authInitialized && user">
				<li>Hello, {{ user.displayName }}</li>
				<li class="text-xs text-gray-600">{{ user.email }}</li>
				<template v-for="item in mainStore.navItems" :key="item.source">
					<div v-if="item.source === 'member'" class="mt-3">
						<li
							v-for="subItem in item.children"
							:key="subItem.source"
						>
							<NuxtLink
								:to="`/${subItem.source}`"
								class="flex items-center py-1 hover:text-primary-dark cursor-pointer"
							>
								<div
									v-if="subItem.svg"
									v-html="subItem.svg"
								></div>
								{{ subItem.name }}
							</NuxtLink>
						</li>
						<li
							class="cursor-pointer text-primary-dark flex items-center py-1"
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
					</div>
				</template>
			</template>
			<template v-else>
				<li
					@click="handleLogin"
					class="cursor-pointer text-primary-dark flex items-center py-1"
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
							d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
						/>
					</svg>
					登入
				</li>
			</template>
		</ul>
	</nav>
	<div class="h-[45px] lg:h-[60px]"></div>
</template>
<script setup lang="ts">
const mainStore = useMainStore();
const { $toast } = useNuxtApp();
const { user, authInitialized, initAuthStateListener, logoutUser } =
	useFirebaseAuth();

onMounted(async () => {
	await initAuthStateListener();
});
const handleLogin = () => {
	mainStore.closeNav();
	navigateTo('/auth');
};
const handleLogout = async () => {
	const isSuccess = await logoutUser();
	if (isSuccess) {
		mainStore.closeNav();
		$toast.showToast({
			message: '已登出',
			type: 'success',
		});
		navigateTo('/auth');
	} else {
		$toast.showToast({
			message: '登出失敗',
			type: 'error',
		});
	}
};
</script>
<style scoped></style>
