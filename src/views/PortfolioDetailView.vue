<template>
	<div class="container py-5">
    <h2>Portfolio</h2>			
    <div class="detail-view">
			<div v-if="error" class="error-msg">
				<span class="text-muted">{{ error.message }}</span>
			</div>
      <template v-else-if="workItem">
        <div class="view-tit">
          <h3>{{ workItem.project }}</h3>
          <button 
            type="button" 
            ref="prev" 
            class="btn prev-btn" 
            @click.prevent="goList" 
            @mouseenter="showTooltip" 
            @mouseout="hideTooltip">
            <i class="bi bi-chevron-left"></i>
          </button>
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
    <Teleport to="body">
			<AppTooltip :isHover="hover" :left="anchorLeft" :top="anchorTop" :direction="anchorDirection" :message="anchorMessage" />
		</Teleport>
  </div>
</template>

<script>
const routeInfo = {
  name: null
}

export default{
  beforeRouteEnter(to, from) {
    console.log('to', to.name);
    console.log('from', from.name);
    routeInfo.name = from.name;
  },
}
</script>


<script setup>
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
import { useAxios } from '@/composables/useAxios';
import AppTooltip from '@/components/app/AppTooltip.vue';
import { useTooltip } from '@/composables/useTooltip';

const workItem = ref({
  project: null,
  thumbnail: null,
  images: [],
  client: null,
  date: null,
  url: null,
});
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const queryInfo = ref(null);

const { response, data: items, error, loading } = useAxios(
	'/works.json', 
	{ method:'get'},
	{
		onSuccess: () => { 
			console.log('data success...');
			workItem.value = items.value.works[id];
			queryInfo.value = route.query;
		}
	}
);

const hover = ref(false);
const prev = ref(null);
const tooltipMsg = ref('');
const tooltipDirection = ref(null);

const { anchorTop, anchorLeft, anchorDirection, anchorMessage } = useTooltip(
	{'anchor': prev, 'direction': 'left', 'message': '이전으로 가기'}
);

const showTooltip = () => {
	hover.value = true;
}
const hideTooltip = () => {
	hover.value = false;
}

const goList = () => {
  router.push({name: routeInfo.name, query: queryInfo.value})
}

</script>

<style scoped>

</style>