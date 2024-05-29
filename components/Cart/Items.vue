<template>
	<h2>購物車</h2>
	<template v-if="cartItemsWithDetails.length === 0">
		<p class="text-center m-auto">購物車內尚無商品喵 ฅ'ㅅ'ฅ</p>
	</template>
	<template v-else>
		<ul class="py-5 my-auto">
			<li class="py-3 border-b-[0.5px] border-gray-200">
				<div class="grid grid-cols-7 gap-4 items-center text-center">
					<p class="col-span-2 text-left">商品資訊</p>
					<p class="">單價</p>
					<p class="col-span-2">數量</p>
					<p>小計</p>
					<p></p>
				</div>
			</li>
			<li
				v-for="(item, index) in cartItemsWithDetails"
				:key="item.id"
				:class="[
					'py-3',
					{
						'border-b-[0.5px] border-gray-200':
							index !== cartItemsWithDetails.length - 1,
					},
				]"
			>
				<div class="grid grid-cols-7 gap-4 items-center text-center">
					<div class="flex items-center col-span-2">
						<img
							:src="item.coverImages?.[0]"
							alt=""
							class="w-16 h-16 mr-5 rounded-sm cursor-pointer"
							@click="openInNewTab(`/product/${item.id}`)"
						/>
						<p class="text-gray-600">
							{{ item.name }}
						</p>
					</div>
					<p class="text-gray-800">NT${{ item.price }}</p>
					<div class="flex m-auto col-span-2">
						<div
							class="px-5 cursor-pointer hover:text-gray-600"
							@click="decreaseQuantity(item)"
						>
							-
						</div>
						<p class="text-gray-800">
							{{ item.quantity }}
						</p>
						<div
							class="px-5 cursor-pointer hover:text-gray-600"
							@click="increaseQuantity(item)"
						>
							+
						</div>
					</div>
					<p class="text-gray-800">
						NT${{ (item.price ?? 0) * item.quantity }}
					</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 24 24"
						class="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-600 m-auto"
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
		<div class="grid grid-cols-7 gap-4 items-center text-center py-3">
			<p class="col-span-2 col-start-6 text-center text-lg">
				合計 : NT$ {{ totalPrice }}
			</p>
		</div>
		<NuxtLink to="/cart" class="btn btn-sm btn-block btn-accent">
			前往結帳
		</NuxtLink>
	</template>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const cartStore = useCartStore();
const productStore = useProductStore();

const cartItemsWithDetails = computed(() => {
	return cartStore.cartItems.map((cartItem) => {
		const product = productStore.products.find((p) => p.id === cartItem.id);
		return reactive({
			...cartItem,
			...product,
		});
	});
});

const openInNewTab = (url: string) => {
	window.open(url, '_blank');
};

const deleteItem = (itemId: string, event: MouseEvent) => {
	event.stopPropagation();
	cartStore.deleteCartItem(itemId);
};

const decreaseQuantity = (item: { id: string; quantity: number }) => {
	if (item.quantity > 0) item.quantity--;
	cartStore.updateCartItemQuantity(item.id, item.quantity);
};

const increaseQuantity = (item: { id: string; quantity: number }) => {
	item.quantity++;
	cartStore.updateCartItemQuantity(item.id, item.quantity);
};

const totalPrice = computed(() => {
	return cartItemsWithDetails.value.reduce((total, item) => {
		return total + (item.price ?? 0) * item.quantity;
	}, 0);
});
</script>

<style scoped></style>
