<template>
	<h2>收藏商品</h2>
	<main class="w-full my-5">
		<div class="w-full flex flex-wrap">
			<div
				class="w-full py-2"
				v-for="product in wishListProducts"
				:key="product.id"
			>
				<ProductBar :product="product" />
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

const productStore = useProductStore();
const cartStore = useCartStore();

const wishListProducts = computed(() => {
	return productStore.products.filter((product) =>
		cartStore.wishItems.some((item) => item.id === product.id)
	);
});

onMounted(async () => {
	await productStore.getProducts();
	await cartStore.loadWishItems();
});
</script>

<style scoped src="@/assets/css/normalStyle.css"></style>
