<template>
  <div>
		<Teleport to="body">
			<div v-if="show" class="top-btn" @click="scrollTop">
				<button class="btn"><i class="bi bi-arrow-up-short"></i></button>
			</div>
		</Teleport>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useScroll } from "@/composables/useScroll";

const props = defineProps(['target'])

const target = props.target;
const { pageYOffset, absTop } = useScroll(props.target);

const show = computed(() => {
  console.log(pageYOffset.value)
  console.log(absTop.value)
  return true;
})

const scrollTop = () => {
  document.body.scrollIntoView({ behavior: 'smooth' });
}

</script>

<style lang="scss" scoped>

</style>