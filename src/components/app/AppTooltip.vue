<template>
  <div ref="tooltip" :style="[position, marginLeftSty]" :class="[{ show: isHover }, direction]" class="tooltip-view">
    <div v-if="direction == 'top'" class="inner arrow-down">
      <p>{{ message }}</p>
    </div>
    <div v-else-if="direction == 'top-right'" class="inner arrow-down">
      <p>{{ message }}</p>
    </div>
    <div v-else-if="direction == 'top-left'" class="inner arrow-down">
      <p>{{ message }}</p>
    </div>
    <div v-else-if="direction == 'bottom'" class="inner arrow-up">
      <p>{{ message }}</p>
    </div>
    <div v-else-if="direction == 'bottom-right'" class="inner arrow-up">
      <p>{{ message }}</p>
    </div>
    <div v-else-if="direction == 'bottom-left'" class="inner arrow-up">
      <p>{{ message }}</p>
    </div>
    <div v-else-if="direction == 'left'" class="inner arrow-right">
      <p>{{ message }}</p>
    </div>
    <div v-else-if="direction == 'left-up'" class="inner arrow-right">
      <p>{{ message }}</p>
    </div>
    <div v-else-if="direction == 'left-down'" class="inner arrow-right">
      <p>{{ message }}</p>
    </div>
    <div v-else-if="direction == 'right'" class="inner arrow-left">
      <p>{{ message }}</p>
    </div>
    <div v-else-if="direction == 'right-up'" class="inner arrow-left">
      <p>{{ message }}</p>
    </div>
    <div v-else class="inner arrow-left">
      <p>{{ message }}</p>
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
  position: {
    type: Object,
  },
  message: {
    type: String,
  },
  direction: {
    type: String,
  }
});

const emit = defineEmits(['transfer'])

const tooltip = ref(null);
const tooltipSpec = ref({
  width: 0,
  height: 0
});
const marginLeft = ref(0);
const marginLeftSty = computed(() => {
  if(props.isHover){
    if(props.direction === 'top' || props.direction === 'bottom'){
      marginLeft.value = -(tooltip.value.clientWidth/2);
    }else if(props.direction === 'left'){
      marginLeft.value = -(tooltip.value.clientWidth + 10);
    }else if(props.direction === 'right'){
      marginLeft.value = 10;
    }

  }else{
    marginLeft.value = 0;
  }
  return { 'margin-left' : `${marginLeft.value}px`};
})

onMounted(() => {
  // marginLeft.value = tooltip.value.clientWidth;
})

// const position = computed(() => {
//   return {
//     display: 'inline-block',
//     left: styleObject.value.left + 'px',
//     top: styleObject.value.top + 'px'
//   }  
// })

</script>

<style scoped>

</style>