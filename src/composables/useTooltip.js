import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

export const useTooltip = (options = {}) => {

  const isHover = ref(false);
  const calcPos = ref({top:0, left:0});
  const tooltipTxt = ref('썸네일로 보기');
  const tooltipDirection = ref(null);
  const tooltipStyle = computed(() => {
    return { top: '-9999px', left: 0 }
  });



  onMounted(() => {
    const { target, top } = { ...options };
  });

  onUnmounted(() => {

  });

  return {

  }
};