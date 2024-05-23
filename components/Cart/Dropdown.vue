<template>
	<div
		class="absolute right-4 top-full card glass bg-primary shadow-lg p-4 rounded-lg w-72 mt-2 transition duration-500"
	>
		<template v-if="cartItemsWithDetails.length === 0">
			<p class="text-center">購物車內尚無商品喵 ฅ'ㅅ'ฅ</p>
		</template>
		<template v-else>
			<ul>
				<li
					v-for="(item, index) in cartItemsWithDetails"
					:key="item.id"
					:class="[
						'p-3',
						{
							'border-b-[0.5px] border-gray-400':
								index !== cartItemsWithDetails.length - 1,
						},
					]"
				>
					<div class="flex items-center">
						<div
							class="flex items-center cursor-pointer"
							@click="openInNewTab(`/product/${item.id}`)"
						>
							<img
								:src="item.coverImages?.[0]"
								alt=""
								class="w-12 h-12 mr-4 rounded-sm"
							/>
							<div>
								<p class="text-gray-600 text-xs">
									{{ item.name }}
								</p>
								<p class="text-gray-800 text-sm">
									NT${{ item.price }} x {{ item.quantity }}
								</p>
							</div>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 24 24"
							class="w-5 h-5 absolute right-5 text-gray-500 cursor-pointer hover:text-gray-600"
							@click="deleteItem(item.id, $event)"
						>
							<g fill="none">
								<path
									d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5zM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25z"
									fill="currentColor"
								></path>
							</g>
						</svg>
					</div>
				</li>
			</ul>
			<NuxtLink to="/cart" class="btn btn-sm btn-block btn-accent mt-5">
				前往結帳
			</NuxtLink>
		</template>
	</div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const cartStore = useCartStore();
const productStore = useProductStore();

const cartItemsWithDetails = computed(() => {
	return cartStore.cartItems.map((cartItem) => {
		const product = productStore.products.find((p) => p.id === cartItem.id);
		return {
			...cartItem,
			...product,
		};
	});
});
const openInNewTab = (url: string) => {
	window.open(url, '_blank');
};

const deleteItem = (itemId: string, event: MouseEvent) => {
	event.stopPropagation();
	cartStore.deleteCartItem(itemId);
};

onMounted(() => {
	cartStore.loadCartItems();
	cartStore.loadAndMergeCartItems();
});

watch(
	() => authStore.user,
	(newUser) => {
		if (newUser) {
			cartStore.loadAndMergeCartItems();
		}
	}
);
</script>

<style scoped></style>
