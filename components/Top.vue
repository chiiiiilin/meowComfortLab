<template>
	<div class="w-full">
		<div
			class="img w-full relative bg-no-repeat bg-fixed h-[200px] bg-contain lg:bg-auto lg:h-[350px] bg-top lg:bg-bottom before:bg-primary-dark after:bg-primary"
			:style="{ backgroundImage: `url(${props.imageUrl})` }"
		></div>
		<div
			class="relative max-w-screen-lg m-auto px-3 translate-y-[-30%] z-50"
		>
			<div
				class="title bg-primary-dark relative w-fit px-6 py-3 lg:px-12 lg:py-6"
			>
				<h1 class="text-3xl lg:text-5xl text-white">
					{{ props.title }}
				</h1>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	imageUrl: String,
	title: String,
});
</script>

<style scoped>
.img::before,
.img::after {
	content: '　';
	display: block;
	width: 0;
	height: 350px;
	position: absolute;
}
.img::before {
	animation: background-move 1.5s ease;
	z-index: 2;
}
.img::after {
	animation: background-move2 1.5s ease 0.3s;
	z-index: 1;
}
@keyframes background-move {
	0% {
		width: 100%;
	}
	100% {
		width: 0%;
	}
}
@keyframes background-move2 {
	0% {
		width: 100%;
		opacity: 0;
	}

	100% {
		width: 0%;
		opacity: 1;
	}
}
.title {
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
</style>
