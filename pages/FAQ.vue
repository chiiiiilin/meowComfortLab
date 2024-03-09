<template>
	<main>
		<section v-for="doc in documents" :key="doc.id" class="px-4 py-5">
			<h2>{{ doc.title }}</h2>
			<div class="lg:flex justify-between">
				<div
					v-for="content in doc.contents"
					:key="content.id"
					class="py-3 lg:px-3 lg:w-1/2 box-border"
				>
					<h3 class="text-accent">{{ content.title }}</h3>
					<div
						v-for="detail in content.details"
						:key="detail.id"
						class="py-2"
					>
						<h4 class="text-lg">{{ detail.title }} :</h4>
						<p class="text-gray-500">
							{{ detail.description }}
						</p>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script setup>
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const documents = ref([]);

onMounted(async () => {
	const db = getFirestore();
	const docRef = doc(db, 'siteInfo', 'FAQ');
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		let data = docSnap.data();
		documents.value = Object.entries(data)
			.map(([id, content]) => ({
				id,
				...content,
			}))
			.sort((a, b) => a.order - b.order);
	}
});
</script>

<style lang="scss" scoped></style>
