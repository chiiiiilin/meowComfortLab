<template>
	<aside class="hidden lg:block py-3 px-5 w-1/5">
		<menu>
			<ul class="menu w-full rounded-box">
				<li v-for="item in items" :key="item.name">
					<details :open="item.name === activeCategory">
						<summary>{{ item.name }}</summary>
						<ul>
							<li>
								<NuxtLink
									:to="`/products?category=${item.name}`"
									@click="setActiveCategory(item.name)"
								>
									所有{{ item.name }}
								</NuxtLink>
							</li>
							<li v-for="subitem in item.subitems" :key="subitem">
								<NuxtLink
									:to="`/products?category=${item.name}&subcategory=${subitem}`"
									@click="
										setActiveCategory(item.name, subitem)
									"
								>
									{{ subitem }}
								</NuxtLink>
							</li>
						</ul>
					</details>
				</li>
			</ul>
		</menu>
	</aside>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			required: true,
		},
		activeCategory: {
			type: String,
			required: false,
		},
		activeSubcategory: {
			type: String,
			required: false,
		},
		setActiveCategory: {
			type: Function,
			required: true,
		},
	},
};
</script>
