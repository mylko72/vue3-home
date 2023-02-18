<template>
	<div>
		<TheHeader />
		<TheView />
		<TheFooter />
		<TopButton />
	</div>
</template>

<script setup>
import TheHeader from '@/layout/TheHeader.vue';
import TheView from '@/layout/TheView.vue';
import TheFooter from './layout/TheFooter.vue';
import TopButton from './components/TopButton.vue';
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

</script>

<style scoped>

</style>
