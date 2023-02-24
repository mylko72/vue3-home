import { ref } from 'vue';

export default {
  install(app, options){

    const $viewport = ref({
      name: 'mobile',
      size: {
        width: 0,
        height: 0
      }
    });

    updateSize();

    function updateSize(){
      const winWidth = window.innerWidth;

      if(winWidth < 768){
        $viewport.value.name = 'mobile';
      }else if(winWidth >= 768 && winWidth < 992){
        $viewport.value.name = 'tablet';
      }else {
        $viewport.value.name = 'desktop';
      }

      $viewport.value.size.width = window.innerWidth;
      $viewport.value.size.height = window.innerHeight;
    }    

    window.addEventListener('resize', updateSize);
  
    app.provide('viewport', $viewport);
  }
}