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
							class="px-5 cursor-pointer hover:text-accent"
							@click="decreaseQuantity(item)"
						>
							-
						</div>
						<p class="text-gray-800">
							{{ item.quantity }}
						</p>
						<div
							class="px-5 cursor-pointer hover:text-accent"
							@click="increaseQuantity(item)"
						>
							+
						</div>
					</div>
					<p class="text-gray-800">
						NT${{ (item.price ?? 0) * item.quantity }}
					</p>
					<SvgIcon
						name="delete"
						class="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-600 m-auto"
						@click="deleteItem(item.id, $event)"
					></SvgIcon>
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
