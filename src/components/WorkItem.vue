<template>
  <div class="card" :class="viewType">
    <slot name="card-header" />
    <slot name="card-image" />

    <div class="card-body">
      <p class="card-title text-truncate">
        <span class="badge" v-if="badge">{{ viewType == 'card-default' ? "프로젝트명" : 'Project' }}</span> 
        <span class="text-truncate">{{ project }}</span>
      </p>
      <p class="card-text" v-if="client">
        <span class="badge" v-if="badge">Client</span> 
        <span class="text-muted">{{ client }}</span>
      </p>
      <p class="card-text" v-if="date">
        <span class="badge" v-if="badge">{{ viewType == 'card-default' ? "수행기간" : 'Date' }}</span> 
        <span class="text-muted">{{ date }}</span>
      </p>
      <p class="card-text" v-if="url">
        <span class="badge" v-if="badge">Url</span> 
        <template v-for="link in url">
          <a :href="link" class="d-inline-block text-truncate text-url" target="_blank"><span class="text-muted">{{ link }}</span></a>
        </template>
      </p>
      <p class="card-text" v-if="task">
        <span class="badge" v-if="badge">담당업무</span> 
        <span class="text-muted">{{ task }}</span>
      </p>
      <p class="card-text" v-if="desc">
        <span class="badge" v-if="badge">수행내용</span> 
        <span class="desc text-muted">{{ desc }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

const props = defineProps({
  view: String,
  badge: Boolean,
  project: {
    type: String,
    required: true
  },
  date: {
    type: String,
  },
  client: String,
  url: [String, Array],
  task: String,
  desc: String
});

const viewType = computed(() => {
  return props.view;
});
</script>

<style lang="scss" scoped>

</style>