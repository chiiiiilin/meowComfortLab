<template>
	<Top
		imageUrl="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
		title="所有商品"
	/>
	<div class="p-3 max-w-screen-xl m-auto lg:flex">
		<aside class="hidden lg:block py-3 px-5 w-1/5">
			<menu>
				<ul class="menu w-full rounded-box">
					<template v-for="category in products" :key="category.name">
						<li v-if="!category.children">
							<NuxtLink :to="`/${category.name}`">
								{{ category.chName }}
							</NuxtLink>
						</li>
						<li v-if="category.children">
							<details open>
								<summary>{{ category.chName }}</summary>
								<ul>
									<li
										v-for="subCategory in category.children"
										:key="subCategory.name"
									>
										<NuxtLink :to="`/${subCategory.name}`">
											{{ subCategory.chName }}
										</NuxtLink>
									</li>
								</ul>
							</details>
						</li>
					</template>
				</ul>
			</menu>
		</aside>
		<main class="w-full lg:w-4/5">
			<NuxtPage />
		</main>
	</div>
</template>

<script setup lang="ts">
const productStore = useProductStore();
const { $toast } = useNuxtApp();
const { products } = productStore;
</script>

<style scoped></style>
