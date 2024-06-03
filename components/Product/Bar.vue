<template>
	<!-- 手機板 -->
	<NuxtLink
		class="md:hidden group card glass w-full h-auto p-3 relative"
		:to="`/product/${product.id}`"
	>
		<div class="flex items-center">
			<img
				class="w-[150px] rounded-md mr-5"
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
				<p class="text-xl font-bold text-accent mt-5">
					NT${{ product.price }}
				</p>
			</div>
		</div>
		<button
			class="btn btn-sm btn-block btn-accent mt-5"
			@click.prevent="addToCart()"
		>
			加入購物車
		</button>
		<div @click.prevent="toggleWishList" class="absolute right-3 top-3">
			<SvgIcon
				name="heart-outline"
				v-if="!isWishItem"
				class="w-6 h-6 md:w-[30px] md:h-[30px] text-gray-400 m-auto cursor-pointer hover:text-accent"
			></SvgIcon>
			<SvgIcon
				name="heart-filled"
				v-else
				class="w-6 h-6 md:w-[30px] md:h-[30px] text-rose-300 m-auto cursor-pointer hover:text-gray-300"
			></SvgIcon>
		</div>
	</NuxtLink>
	<!-- 電腦版 -->
	<NuxtLink
		class="hidden group card glass w-full h-auto px-3 py-1 hover:shadow-md transition duration-500 ease-in-out md:grid grid-cols-5 gap-4 items-center text-center cursor-pointer"
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
			<SvgIcon
				name="heart-outline"
				v-if="!isWishItem"
				class="w-[30px] text-gray-400 m-auto cursor-pointer hover:text-accent"
			></SvgIcon>
			<SvgIcon
				name="heart-filled"
				v-else
				class="w-[30px] text-rose-300 m-auto cursor-pointer hover:text-gray-300"
			></SvgIcon>
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
