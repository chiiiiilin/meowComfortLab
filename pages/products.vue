<template>
	<Top
		imageUrl="https://chiiiiilin.github.io/lifecat/pictures/shoppingpage.jpg"
		title="所有商品"
	/>
	<div class="p-3 max-w-screen-xl m-auto lg:flex">
		<AsideMenu
			:items="categories"
			:activeCategory="activeCategory"
			:activeSubcategory="activeSubcategory"
			:setActiveCategory="setActiveCategory"
		/>
		<main class="w-full lg:w-4/5">
			<div class="w-full flex flex-wrap">
				<div
					class="w-1/2 lg:w-1/3 p-2"
					v-for="product in filteredProducts"
					:key="product.name"
				>
					<ProductCard :product="product" />
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
const productStore = useProductStore();
const route = useRoute();

const activeCategory = ref<string | null>(null);
const activeSubcategory = ref<string | null>(null);

const setActiveCategory = (
	category: string,
	subcategory: string | null = null
) => {
	activeCategory.value = category;
	activeSubcategory.value = subcategory;
};

const filteredProducts = computed(() => {
	if (!activeCategory.value) {
		return productStore.products;
	}
	if (activeSubcategory.value) {
		return productStore.products.filter(
			(product) =>
				product.category === activeCategory.value &&
				product.subcategory === activeSubcategory.value
		);
	}
	return productStore.products.filter(
		(product) => product.category === activeCategory.value
	);
});

const categories = computed(() => {
	const categoryMap: Record<string, Set<string>> = {};

	productStore.products.forEach((product) => {
		if (!categoryMap[product.category]) {
			categoryMap[product.category] = new Set();
		}
		if (product.subcategory) {
			categoryMap[product.category].add(product.subcategory);
		}
	});

	return Object.keys(categoryMap).map((category) => ({
		name: category,
		subitems: Array.from(categoryMap[category]),
	}));
});

onMounted(async () => {
	await productStore.getProducts();
	if (route.query.category) {
		setActiveCategory(
			route.query.category as string,
			route.query.subcategory as string | null
		);
	}
});
</script>
