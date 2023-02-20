<template>
  <div ref="tooltip" :style="[computedStyledObject, marginLeftStyle]" :class="[{ show: isHover }, direction]" class="tooltip-view">
    <div v-if="direction == 'top'" class="inner arrow-down">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else-if="direction == 'top-right'" class="inner arrow-down">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else-if="direction == 'top-left'" class="inner arrow-down">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else-if="direction == 'bottom'" class="inner arrow-up">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else-if="direction == 'bottom-right'" class="inner arrow-up">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else-if="direction == 'bottom-left'" class="inner arrow-up">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else-if="direction == 'left'" class="inner arrow-right">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else-if="direction == 'left-up'" class="inner arrow-right">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else-if="direction == 'left-down'" class="inner arrow-right">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else-if="direction == 'right'" class="inner arrow-left">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else-if="direction == 'right-up'" class="inner arrow-left">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else class="inner arrow-left">
      <p>{{ infoTxt }}</p>
    </div>
  </div> 
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";

const props = defineProps({
  isHover: {
    type: Boolean,
    default: false
  },
  computedStyledObject: {
    type: Object
  },
  infoTxt: {
    type: String
  }
})

const tooltip = ref(null);
const direction = ref('top');
const marginLeft = ref(0);
const styleObject = ref({
  left: 0,
  top: 0,
  width: 0,
  height: 0
});
const marginLeftStyle = computed(() => {
  if(props.isHover){
    marginLeft.value = tooltip.value.clientWidth/2;
  }
  return { 'margin-left' : `-${marginLeft.value}px`};
})

onMounted(() => {
  // marginLeft.value = tooltip.value.clientWidth;
})

// const computedStyledObject = computed(() => {
//   return {
//     display: 'inline-block',
//     left: styleObject.value.left + 'px',
//     top: styleObject.value.top + 'px'
//   }  
// })

</script>

<style scoped>

</style>