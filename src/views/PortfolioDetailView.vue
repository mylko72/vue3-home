<template>
	<div class="container py-5">
		<div class="col-xl-10">
		  <h2>Portfolio</h2>			
      <div class="detail-view">
        <div class="d-flex align-items-center justify-content-between">
          <h3>{{ selectedItem.project }}</h3>
          <button type="button" class="btn prev-btn" @click.prevent="goList"><i class="bi bi-chevron-left"></i></button>
        </div>
        <hr />
        <div class="row flex-column flex-md-row mt-4 g-3">
          <div class="col-12 col-md-7 col-lg-8">
              <img v-for="(image, index) in selectedItem.images" :key="index" :src="image" class="img-fluid" :class="[index > 0 ? 'mt-4' : 'mt-0']" alt="" />
          </div>
          <div class="col-12 col-md-5 col-lg-4">
            <ul class="list-group desc-list">
              <li class="list-group-item"><span class="badge">Project</span> <span class="txt">{{ selectedItem.project }}</span></li>
              <li class="list-group-item"><span class="badge">Client</span> <span class="txt">{{ selectedItem.client }}</span></li>
              <li class="list-group-item"><span class="badge">Date</span> <span class="txt">{{ selectedItem.date }}</span></li>
              <li class="list-group-item"><span class="badge">Url</span> <a href="https://www.ssfshop.com/" class="d-inline-block text-truncate" target="_blank">{{ selectedItem.url }}</a></li>
              <li class="list-group-item"><span class="txt">{{ selectedItem.desc }}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { getWorksById } from '@/api/works.js';
import { useRoute, useRouter } from 'vue-router';
import { computed } from '@vue/runtime-core';

const selectedItem = ref({
  project: null,
  thumbnail: null,
  images: [],
  client: null,
  date: null,
  url: null,
});

const route = useRoute();
const router = useRouter();
const selectedId = route.params.id;

const fetchItem = async (id) => {
  try {
    selectedItem.value = await getWorksById(id);
    console.log(selectedItem.value);
  }catch(e){
    console.log(e.message)
  }
}

fetchItem(selectedId);

const goList = () => {
  router.push({name: 'PortfolioListView'});
}

</script>

<style scoped>

</style>