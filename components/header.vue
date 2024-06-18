<template>
	<header
		class="glass !bg-primary !bg-opacity-60 shadow-lg fixed w-full z-[999]"
	>
		<div
			class="max-w-screen-xl px-3 flex justify-between items-center mx-auto relative"
		>
			<h1
				class="h-[45px] p-1 lg:h-[60px]"
				:class="{ invisible: atHomeTop }"
			>
				<NuxtLink to="/">
					<SvgIcon
						name="logo-large"
						class="w-[150px] h-full object-contain"
					></SvgIcon
				></NuxtLink>
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
									<SvgIcon
										name="member-cat"
										class="w-[25px] h-[25px]"
									></SvgIcon>
								</div>
								<div
									v-else-if="navItem.name === '購物車'"
									class="indicator block"
									@mouseenter="showCartDropdown()"
									@mouseleave="handleMouseLeave"
									@click.prevent="showCartDropdown()"
								>
									<span
										class="indicator-item badge badge-primary bg-red-400 border-red-400 transition-duration-500"
										:class="{
											'scale-75':
												cartStore.cartItems.length !==
												0,
											'scale-0':
												cartStore.cartItems.length ===
												0,
										}"
										>{{ cartStore.cartItems.length }}</span
									>
									<SvgIcon
										name="cart"
										class="w-[25px] h-[25px]"
									></SvgIcon>
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
		<CartDropdown
			:class="{
				'translate-x-0': cartStore.showCartDropdown,
				'translate-x-[150%]': !cartStore.showCartDropdown,
			}"
			class="cart-dropdown z-0"
		/>
	</header>
	<!-- 手機 -->
	<nav
		class="fixed w-full top-[45px] left-0 bg-primary p-5 transition duration-500 shadow-md z-[998]"
		:class="{
			'translate-y-0': mainStore.isNavOpen,
			'translate-y-[-120%]': !mainStore.isNavOpen,
		}"
	>
		<ul class="menu list-none flex flex-col">
			<template v-for="navItem in mainStore.navItems" :key="navItem.name">
				<template v-if="!navItem.icon">
					<li v-if="!navItem.children">
						<NuxtLink :to="`/${navItem.source}`">{{
							navItem.name
						}}</NuxtLink>
					</li>
					<li v-else>
						<details>
							<summary>{{ navItem.name }}</summary>
							<ul>
								<li
									v-for="child in navItem.children"
									:key="child.name"
								>
									<details>
										<summary>{{ child.name }}</summary>
										<ul v-if="child.children">
											<li>
												<NuxtLink
													:to="`/${child.source}`"
													>所有{{
														child.name
													}}</NuxtLink
												>
											</li>
											<li
												v-for="subChild in child.children"
												:key="subChild.name"
											>
												<NuxtLink
													:to="`/${subChild.source}`"
													>{{
														subChild.name
													}}</NuxtLink
												>
											</li>
										</ul>
									</details>
								</li>
							</ul>
						</details>
					</li>
				</template>
			</template>
			<div class="w-full h-[0.5px] my-4 bg-gray-400"></div>
			<template v-if="authInitialized && user">
				<li class="ml-4">Hello, {{ user.displayName }}</li>
				<li class="text-xs text-gray-600 ml-4">{{ user.email }}</li>
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
								<SvgIcon
									v-if="subItem.svg"
									:name="subItem.svg"
									class="w-4 h-4 mr-2"
								></SvgIcon>
								{{ subItem.name }}
							</NuxtLink>
						</li>
						<li
							class="cursor-pointer text-primary-dark flex items-center py-1"
							@click="handleLogout"
						>
							<SvgIcon
								name="logout"
								class="w-4 h-4 mr-2"
							></SvgIcon>
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
					<SvgIcon name="login" class="w-4 h-4 mr-2"></SvgIcon>
					登入
				</li>
			</template>
		</ul>
	</nav>
	<div class="h-[45px] lg:h-[60px]"></div>
</template>
<script setup lang="ts">
const route = useRoute();
const mainStore = useMainStore();
const authStore = useAuthStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const { $toast } = useNuxtApp();
const { user, authInitialized } = storeToRefs(authStore);
const { initAuthStateListener, logoutUser } = authStore;

//logo隱藏
const atHomeTop = ref(false);
const checkScrollPosition = () => {
	if (window.scrollY < 300 && route.name === 'index') {
		atHomeTop.value = true;
	} else {
		atHomeTop.value = false;
	}
};
onMounted(() => {
	window.addEventListener('scroll', checkScrollPosition);
	checkScrollPosition();
});
onUnmounted(() => {
	window.removeEventListener('scroll', checkScrollPosition);
});

//購物車
const showCartDropdown = () => {
	if (route.name !== 'cart') {
		cartStore.setShowCartDropdown(true);
	}
};
const handleClickOutside = (event: MouseEvent) => {
	const cartElement = document.querySelector('.indicator.block');
	const cartDropdown = document.querySelector('.cart-dropdown');

	if (
		cartElement &&
		!cartElement.contains(event.target as Node) &&
		cartDropdown &&
		!cartDropdown.contains(event.target as Node)
	) {
		cartStore.setShowCartDropdown(false);
		document.removeEventListener('click', handleClickOutside);
	}
};

const handleMouseLeave = () => {
	document.addEventListener('click', handleClickOutside);
};

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside);
});

//商品列表併入nav
const categories = computed(() => {
	const categoryMap = new Map<string, Set<string>>();

	productStore.products.forEach((product) => {
		if (!categoryMap.has(product.category)) {
			categoryMap.set(product.category, new Set<string>());
		}
		if (product.subcategory) {
			categoryMap.get(product.category)?.add(product.subcategory);
		}
	});

	return Array.from(categoryMap.entries()).map(([name, subitems]) => ({
		name,
		subitems: Array.from(subitems),
	}));
});
onMounted(async () => {
	await productStore.getProducts();
	mainStore.updateNavItems(categories.value);
	await initAuthStateListener();
});

//登入&登出
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
onMounted(async () => {
	await initAuthStateListener();
});
</script>
<style scoped></style>
