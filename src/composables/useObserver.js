import { ref } from "vue";
import { onMounted } from "vue";

export const useObserver = (target, showCallback, hideCallback) => {
  const isInView = ref(false);

  const config = ref({
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.1
  });

  const callback = (entries, observer) => {
    entries.forEach(entry => {
        const { intersectionRatio: currentRatio, isIntersecting } = entry;

        if(isIntersecting){
          if(showCallback && typeof showCallback == 'function'){
            showCallback(entry.target);
          }
          isInView.value = true;
        } else {                     
          if(hideCallback && typeof hideCallback == 'function'){
            hideCallback(entry.target);
          }
          isInView.value = false;
        }
    });
  }

  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver(callback, config.value);
    observer.observe(target);
  }

  return {
    isInView
  }
}