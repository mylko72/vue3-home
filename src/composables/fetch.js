import { ref } from "@vue/reactivity";
import { getWorks } from '@/api/posts';

export const useFetch = (url) => {

  const response = ref(null);
  const error = ref(null);
  // const show = ref(false);
  const isLoading = ref(false);
  
  const fetchWorks = async () => {
    try {
      const { data } = await getWorks(url);
      response.value = data.works;
      // show.value = true;
      isLoading.value = true;
    }catch(err){
      error.value = err;
    }
  }
  
  fetchWorks();
      
  return {
    response,
    error,
    // show,
    isLoading
  }
}


