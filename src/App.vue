<template>
	<div>
		<TheHeader />
		<TheView ref="el" />
		<TheFooter />
		<TopButton :target="target" />
	</div>
</template>

<script setup>
import TheHeader from '@/layout/TheHeader.vue';
import TheView from '@/layout/TheView.vue';
import TheFooter from './layout/TheFooter.vue';
import TopButton from './components/TopButton.vue';
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

const el = ref(null);
const target = ref(null);

onMounted(() => {
	target.value = el.value.$el;
	// console.log(el.value.$el);
})

</script>

<style scoped>

</style>
