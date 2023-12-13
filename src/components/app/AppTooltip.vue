<template>
  <div ref="tooltip" :style="[{ 'left': left, 'top': top }, marginLeftSty]" :class="[{ show: isHover }, direction]" class="tooltip-view">
    <div class="inner arrow-down">
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
  left: {
    type: String,
  },
  top: {
    type: String,
  },  
  message: {
    type: String,
  },
  direction: {
    type: String,
  }
});

const tooltip = ref(null);
const marginLeft = ref(0);
const marginLeftSty = computed(() => {
  marginLeft.value = 0;
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
</script>

<style scoped>

</style>