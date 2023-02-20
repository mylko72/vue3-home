<template>
  <div v-if="isHover" ref="tooltip" :style="[computedStyledObject, {'margin-left': '-90px'}]" :class="[{ show: isHover }, direction]" class="tooltip-view">
    <div v-if="direction == 'top'" class="inner arrow-down">
      <p>{{ infoTxt }}</p>
    </div>
    <div v-else-if="direction == 'top-right'" class="inner arrow-down">
      <p>툴팁은 {{ direction }}에서 나타납니다.</p>
    </div>
    <div v-else-if="direction == 'top-left'" class="inner arrow-down">
      <p>툴팁은 {{ direction }}에서 나타납니다.</p>
    </div>
    <div v-else-if="direction == 'bottom'" class="inner arrow-up">
      <p>툴팁은 {{ direction }}에서 나타납니다.</p>
    </div>
    <div v-else-if="direction == 'bottom-right'" class="inner arrow-up">
      <p>툴팁은 {{ direction }}에서 나타납니다.</p>
    </div>
    <div v-else-if="direction == 'bottom-left'" class="inner arrow-up">
      <p>툴팁은 {{ direction }}에서 나타납니다.</p>
    </div>
    <div v-else-if="direction == 'left'" class="inner arrow-right">
      <p>툴팁은 {{ direction }}에서 나타납니다.</p>
    </div>
    <div v-else-if="direction == 'left-up'" class="inner arrow-right">
      <p>툴팁은 {{ direction }}에서 나타납니다.</p>
    </div>
    <div v-else-if="direction == 'left-down'" class="inner arrow-right">
      <p>툴팁은 {{ direction }}에서 나타납니다.</p>
    </div>
    <div v-else-if="direction == 'right'" class="inner arrow-left">
      <p>툴팁은 {{ direction }}에서 나타납니다.</p>
    </div>
    <div v-else-if="direction == 'right-up'" class="inner arrow-left">
      <p>툴팁은 {{ direction }}에서 나타납니다.</p>
    </div>
    <div v-else class="inner arrow-left">
      <p>툴팁은 {{ direction }}에서 나타납니다.</p>
    </div>
  </div> 
  {{ computedStyledObject }}
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
  return { 'margin-left' : `-${marginLeft.value}px`};
})

onMounted(() => {
  if(props.isHover.value){
    marginLeft.value = tooltip.value.clientWidth;
  }
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