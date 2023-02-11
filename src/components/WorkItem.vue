<template>
  <div class="card" :class="workType">
    <slot name="card-header" />
    <slot name="card-image" />

    <div class="card-body">
      <p class="card-title text-truncate">
        <span class="badge" v-if="badge">Project</span> 
        <span class="text-truncate">{{ project }}</span>
      </p>
      <p class="card-text" v-if="client">
        <span class="badge" v-if="badge">client</span> 
        <span class="date text-muted">{{ client }}</span>
      </p>
      <p class="card-text" v-if="date">
        <span class="badge" v-if="badge">date</span> 
        <span class="date text-muted">{{ date }}</span>
      </p>
      <p class="card-text" v-if="url">
        <span class="badge" v-if="badge">url</span> 
        <a :href="url" class="d-inline-block text-truncate" target="_blank"><span class="date text-muted">{{ url }}</span></a>
      </p>
      <p class="card-text" v-if="desc">
        <span class="badge" v-if="badge">수행내용</span> 
        <span class="date text-muted">{{ desc }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const workType = ref(null);

const props = defineProps({
  display: String,
  badge: Boolean,
  project: {
    type: String,
    required: true
  },
  date: {
    type: String,
  },
  client: String,
  url: String,
  desc: String
});

workType.value = props.display;

console.log(workType.value);
</script>

<style lang="scss" scoped>

</style>