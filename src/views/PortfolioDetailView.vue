<template>
	<div class="container py-5">
    <h2>Portfolio</h2>			
    <div class="detail-view">
			<div v-if="error" class="error-msg">
				<span class="text-muted">{{ error.message }}</span>
			</div>
      <template v-else-if="workItem">
        <div class="d-flex align-items-center justify-content-between">
          <h3>{{ workItem.project }}</h3>
          <button type="button" class="btn prev-btn" @click.prevent="goList"><i class="bi bi-chevron-left"></i></button>
        </div>
        <hr />
        <div class="row flex-column flex-md-row mt-4 g-3">
          <div class="col-12 col-md-7 col-lg-8 text-center">
              <img v-for="(image, index) in workItem.images" :key="index" :src="image" class="img-fluid" :class="{ 'mt-4' : index > 0 }" alt="" />
          </div>
          <div class="col-12 col-md-5 col-lg-4">
            <ul class="list-group desc-list">
              <li class="list-group-item"><span class="badge">Project</span> <span class="txt">{{ workItem.project }}</span></li>
              <li class="list-group-item"><span class="badge">Client</span> <span class="txt">{{ workItem.client }}</span></li>
              <li class="list-group-item"><span class="badge">Date</span> <span class="txt">{{ workItem.date }}</span></li>
              <li class="list-group-item" v-if="workItem.url"><span class="badge">Url</span> <a :href="workItem.url" class="d-inline-block text-truncate" target="_blank">{{ workItem.url }}</a></li>
              <li class="list-group-item"><span class="badge">Task</span> <span class="txt">{{ workItem.task }}</span></li>
              <li class="list-group-item"><span class="txt">{{ workItem.desc }}</span></li>
            </ul>
          </div>
        </div>
      </template>
      <div v-else class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { getWorks } from '@/api/posts';
import { useRoute, useRouter } from 'vue-router';
import { computed } from '@vue/runtime-core';

const workItem = ref({
  project: null,
  thumbnail: null,
  images: [],
  client: null,
  date: null,
  url: null,
});
const error = ref(null);
const route = useRoute();
const router = useRouter();
const workId = route.params.id;
const queryInfo = ref(null);
const isLoading = ref(false);

const fetchItem = async (id) => {
  try {
    const { data } = await getWorks('/works.json');
    workItem.value = data.works[id];
    console.log(workItem.value)
    queryInfo.value = route.query;
    isLoading.value = true;
  }catch(err){
    error.value = err;
    console.log(e.message)
  }
}

fetchItem(workId);

const goList = () => {
  // window.history.go(-1);
  router.push({name: 'PortfolioListView', query: queryInfo.value})
}

</script>

<style scoped>

</style>