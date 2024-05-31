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
						<SvgIcon
							name="delete"
							class="w-5 h-5 absolute right-5 text-gray-500 cursor-pointer hover:text-gray-600"
							@click="deleteItem(item.id, $event)"
						></SvgIcon>
					</div>
				</li>
			</ul>
			<NuxtLink
				to="/cart"
				class="btn btn-sm btn-block btn-accent mt-5"
				@click="cartStore.setShowCartDropdown(false)"
			>
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
</script>

<style scoped></style>
