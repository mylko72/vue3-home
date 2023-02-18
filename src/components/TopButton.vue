<template>
  <div>
		<Teleport to="body">
      <Transition name="slide">
        <div v-if="show" class="top-btn" @click="scrollTop">
          <button class="btn"><i class="bi bi-arrow-up-short"></i></button>
        </div>
      </Transition>
		</Teleport>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useScroll } from "@/composables/useScroll";

const { pageYOffset, absTop } = useScroll({top: 110});

const show = computed(() => {
  console.log(pageYOffset.value)
  console.log(absTop.value)
  return pageYOffset.value > absTop.value
})

const scrollTop = () => {
  document.body.scrollIntoView({ behavior: 'smooth' });
}

</script>

<style scoped>
.slide-enter-from, 
.slide-leave-to {opacity:0; transform:translateY(30px)}
.slide-enter-to, 
.slide-leave-from {opacity:1;  transform:translateY(0)}
.slide-enter-active, 
.slide-leave-active {transition:all .5s ease}
</style>
