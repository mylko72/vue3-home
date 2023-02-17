import { ref } from '@vue/reactivity';
import { onMounted, onUnmounted } from '@vue/runtime-core';

export const useScroll = (el) => {

  const pageYOffset = ref(0);
  const pageXOffset = ref(0);
  const absTop = ref(0);

  function update () {
    pageYOffset.value = window.pageYOffset;
    pageXOffset.value = window.pageXOffset;
  }

  onMounted(() => {
    console.log(el);
        
    if(el){
      const { top } = el.value.getBoundingClientRect();	
      absTop.value = top + window.pageYOffset;
    }

    window.addEventListener('scroll', update);
  });

  onUnmounted(() => {window.removeEventListener('scroll', update)});

  return {
    pageXOffset,
    pageYOffset,
    absTop
  }
}