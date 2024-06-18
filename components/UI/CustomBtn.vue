<template>
	<div class="flex items-center cursor-pointer group overflow-hidden">
		<p
			class="relative text-xl lg:text-2xl mr-1 lg:mr-3 text-gray-600 font-medium after:bg-accent after:absolute after:h-px after:w-full after:left-0 after:top-full after:transition-transform after:duration-500 group-hover:after:translate-x-0 after:translate-x-[-200%]"
		>
			{{ label }}
		</p>
		<span
			class="border py-1 p-2 rounded-full duration-300 delay-300 group-hover:text-white group-hover:bg-accent group-hover:border-accent group-hover:translate-x-3"
		>
			&gt;&gt;
		</span>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	label: string;
}>();
</script>

<style scoped></style>
