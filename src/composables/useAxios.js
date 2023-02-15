import axios from "axios";
import { isRef, ref, unref, watchEffect } from 'vue';

const defaultConfig = {
  method: 'get'
}

const defaultOptions = {
  immediate: true
}

export const useAxios = (url, config = {}, options = {}) => {
  const response = ref(null);
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);
  const { params } = config;
  const { onSuccess, onError, immediate } = {...defaultOptions, ...options};

  const fetch = (body) => {
    data.value = null;
    error.value = null;
    loading.value = true;

    axios(url, {
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === 'object' ?  body : {}
    })
    .then((res) => {
      response.value = res;
      data.value = res.data;
      if(onSuccess){
        onSuccess(res);
      }
    }).catch(err => {
      error.value = err
      if(onError){
        onError(err);
      }
    }).finally(() => {
      loading.value = false;
    })
  }

  if(isRef(params)){
    watchEffect(fetch);
  }else{
    if(immediate){
      fetch();
    }
  }
 
  return {
    response,
    data,
    error,
    loading,
    fetch
  }
}