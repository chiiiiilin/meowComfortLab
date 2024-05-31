<template>
	<div
		class="p-3 lg:max-w-screen-xl mx-auto flex justify-center items-center py-16"
	>
		<div v-if="product" class="lg:flex items-center">
			<div>
				<img
					:src="product.coverImages[0]"
					:alt="product.name"
					class="max-w-xs lg:max-w-md"
				/>
			</div>
			<div class="mx-3 lg:mx-10 h-full flex flex-col justify-between">
				<h1 class="text-3xl">{{ product.name }}</h1>
				<p v-html="product.description" class="my-5"></p>
				<p class="text-2xl font-bold text-accent tracking-wider">
					NT${{ product.price }}
				</p>
				<div
					class="flex justify-between items-center border-[0.5px] border-gray-300 rounded my-5"
				>
					<div
						class="text-lg font-bold px-5 cursor-pointer hover:text-accent"
						@click="decreaseQuantity"
					>
						-
					</div>
					<p>{{ quantity }}</p>
					<div
						class="text-lg font-bold px-5 cursor-pointer hover:text-accent"
						@click="increaseQuantity"
					>
						+
					</div>
				</div>
				<div class="btn btn-sm btn-block btn-accent" @click="addToCart">
					加入購物車
				</div>
				<div @click="toggleWishList" class="m-auto">
					<div
						v-if="!isWishItem"
						class="flex items-center text-sm text-gray-400 m-auto py-3 cursor-pointer hover:text-accent"
					>
						<SvgIcon
							name="heart-outline"
							class="w-[20px] h-[20px] mr-1"
						></SvgIcon>
						<span>加入收藏清單</span>
					</div>
					<div
						v-else
						class="flex items-center text-sm text-rose-300 m-auto py-3 cursor-pointer hover:text-gray-300"
					>
						<SvgIcon
							name="heart-filled"
							class="w-[20px] h-[20px] mr-1"
						></SvgIcon>
						<span>已加入收藏清單</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Product } from '@/stores/productStore';

const route = useRoute();
const cartStore = useCartStore();
const productStore = useProductStore();
const product = ref<Product | null>(null);
const productId = route.params.id as string;

onMounted(async () => {
	await productStore.getProducts();
	product.value =
		productStore.products.find((p) => p.id === productId) || null;
	await cartStore.loadWishItems();
});

const quantity = ref(1);
const decreaseQuantity = () => {
	if (quantity.value > 1) {
		quantity.value--;
	}
};
const increaseQuantity = () => {
	quantity.value++;
};
const addToCart = () => {
	if (product.value) {
		cartStore.addCartItem(product.value.id, quantity.value);
		cartStore.setShowCartDropdown(true);
		setTimeout(() => {
			cartStore.setShowCartDropdown(false);
		}, 3000);
	}
};
const toggleWishList = () => {
	if (product.value) {
		if (isWishItem.value) {
			cartStore.deleteWishItem(product.value.id);
		} else {
			cartStore.addWishItem(product.value.id);
		}
	}
};
const isWishItem = computed(() => {
	return cartStore.wishItems.some((item) => item.id === productId);
});
</script>
