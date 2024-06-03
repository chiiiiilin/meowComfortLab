<template>
	<div
		class="group card glass h-60 md:h-96 p-5 hover:bg-gray-200 transition duration-500 ease-in-out"
	>
		<NuxtLink
			:to="`/product/${product.id}`"
			class="h-full flex flex-col justify-center"
		>
			<div class="flex justify-center items-center h-full relative">
				<img
					class="absolute opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out w-full h-full object-contain"
					:src="product.coverImages[0]"
					:alt="`${product.name}照片`"
				/>
				<img
					class="absolute opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out w-full h-full object-contain"
					:src="product.coverImages[1]"
					:alt="`${product.name}使用照片`"
				/>
			</div>
			<div class="group-hover:hidden mt-5">
				<p class="text-lg text-center">{{ product.name }}</p>
				<p class="text-xl font-bold text-accent text-center">
					NT${{ product.price }}
				</p>
			</div>
		</NuxtLink>
		<button
			class="hidden group-hover:block btn btn-sm btn-block btn-accent mt-5"
			@click="addToCart()"
		>
			加入購物車
		</button>
	</div>
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
</script>
