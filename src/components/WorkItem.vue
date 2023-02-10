<template>
  <div class="card" :class="workType">
    <div class="card-img">
      <img :src="thumbnail" class="card-img-top" alt="...">
    </div>
    <div class="card-body">
      <p class="card-title text-truncate">{{ project }}</p>
      <p class="card-text" v-if="props.client"><span class="date text-muted">{{ client }}</span></p>
      <p class="card-text" v-if="props.url"><span class="date text-muted">{{ url }}</span></p>
      <p class="card-text"><span class="date text-muted">{{ date }}</span></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const workType = ref(null);

const props = defineProps({
  display: String,
  thumbnail: {
    type: String,
    required: true
  },
  project: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  client: String,
  url: String,
});

workType.value = props.display;

console.log(workType.value);
</script>

<style lang="scss" scoped>

</style>