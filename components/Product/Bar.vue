<template>
	<NuxtLink
		class="group card glass w-full h-36 px-3 py-1 hover:shadow-md transition duration-500 ease-in-out grid grid-cols-5 gap-4 items-center text-center cursor-pointer"
		:to="`/product/${product.id}`"
	>
		<img
			class="w-[150px] rounded-md"
			:src="product.coverImages[1]"
			:alt="`${product.name}照片`"
		/>
		<div class="text-left">
			<p class="text-lg">{{ product.name }}</p>
			<p v-if="!product.subcategory" class="text-xs text-gray-400">
				{{ product.category }}
			</p>
			<p v-if="product.subcategory" class="text-sm text-gray-400">
				{{ product.category }} · {{ product.subcategory }}
			</p>
		</div>
		<p class="text-xl font-bold text-accent text-center">
			NT${{ product.price }}
		</p>
		<button
			class="btn btn-sm btn-block btn-accent"
			@click.prevent="addToCart()"
		>
			加入購物車
		</button>
		<div @click.prevent="toggleWishList">
			<svg
				v-if="!isWishItem"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 512 512"
				class="w-[30px] text-gray-400 m-auto py-3 cursor-pointer hover:text-accent"
			>
				<path
					d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81c-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0 0 18 0c96.26-65.34 184.09-143.09 183-252.42c-.54-52.67-42.32-96.81-95.08-96.81z"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
				></path>
			</svg>
			<svg
				v-else
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 1024 1024"
				class="w-[30px] text-rose-300 m-auto py-3 cursor-pointer hover:text-gray-300"
			>
				<path
					d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8a264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39c-10 6.1-19.5 12.8-28.5 20.1c-9-7.3-18.5-14-28.5-20.1c-41.8-25.5-89.9-39-139.2-39c-35.5 0-69.9 6.8-102.4 20.3c-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9c0 33.3 6.8 68 20.3 103.3c11.3 29.5 27.5 60.1 48.2 91c32.8 48.9 77.9 99.9 133.9 151.6c92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3c56-51.7 101.1-102.7 133.9-151.6c20.7-30.9 37-61.5 48.2-91c13.5-35.3 20.3-70 20.3-103.3c.1-35.3-7-69.6-20.9-101.9z"
					fill="currentColor"
				></path>
			</svg>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '@/stores/productStore';
const cartStore = useCartStore();
const props = defineProps<{
	product: Product;
}>();

const addToCart = () => {
	cartStore.addCartItem(props.product.id, 1);
	cartStore.setShowCartDropdown(true);
	setTimeout(() => {
		cartStore.setShowCartDropdown(false);
	}, 3000);
};

const toggleWishList = () => {
	if (isWishItem.value) {
		cartStore.deleteWishItem(props.product.id);
	} else {
		cartStore.addWishItem(props.product.id);
	}
};
const isWishItem = computed(() => {
	return cartStore.wishItems.some((item) => item.id === props.product.id);
});
</script>
