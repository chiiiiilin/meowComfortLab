<template>
	<main class="max-w-screen-lg m-auto my-[100px] px-3">
		<section
			v-for="doc in mainStore.faqList"
			:key="doc.id"
			class="px-4 py-5"
		>
			<h2>{{ doc.title }}</h2>
			<div class="lg:flex justify-between">
				<div
					v-for="content in doc.contents"
					:key="content.id"
					class="lg:w-[45%] box-border"
				>
					<h3>{{ content.title }}</h3>
					<div v-for="detail in content.details" :key="detail.id">
						<h4 class="text-lg">{{ detail.title }} :</h4>
						<p class="text-gray-400">
							{{ detail.description }}
						</p>
					</div>
				</div>
			</div>
		</section>
		<section class="px-4 py-5">
			<h2>訂製申請表單</h2>
			<h3>
				如需客製化商品，或室內空間規劃服務，請填寫此表單，將由專人聯繫為您服務。
			</h3>
		</section>
	</main>
</template>

<script setup lang="ts">
const mainStore = useMainStore();

onMounted(async () => {
	if (mainStore.faqList.length == 0) {
		mainStore.getFaqList();
	}
});
</script>

<style scoped src="@/assets/css/normalStyle.css"></style>
