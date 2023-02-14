<template>
	<div class="container py-5">
		<div class="card-lists col-xl-12 col-xxl-11">
			<h2>Portfolio</h2>			
			<div class="d-flex">
				<div class="ms-auto">
					<div class="btn-group">
						<button type="button" class="btn btn-outline-secondary" :class="{'active' : !isActive}" @click="viewType = 'card-list'">
							<i class="bi bi-card-list"></i>
							<span class="visually-hidden">리스트</span>
						</button>
						<button type="button" class="btn btn-outline-secondary" :class="{'active' : isActive}" @click="viewType = 'card-thumb'">
							<i class="bi bi-card-image"></i>
							<span class="visually-hidden">썸네일</span>
						</button>
					</div>
				</div>
			</div>
			<div class="row g-3 g-xl-4 my-2" :class="viewClass">
				<div class="col" v-for="(card, index) in cardItems" :key="index">		
					<WorkItem 
						v-bind="workItems(card)"
						@click="viewType === 'card-thumb' && goDetail(index, $event)">
						<template #card-image>
							<div class="card-img">
								<img v-if="card.thumbnail" :src="card.thumbnail" @click="viewType === 'card-list' && goDetail(index)" class="card-img-top" alt="">
								<img v-else src="/src/assets/images/img_no.png" class="card-img-top no-img" alt="">
							</div>
						</template>
					</WorkItem>
				</div>
			</div>
		</div>
		<Transition name="slide">
			<div v-if="isAlert" class="alert alert-danger v-alert" role="alert">
				상세 이미지가 없습니다.
			</div>
		</Transition>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getWorks } from '@/api/posts';
import { useRoute, useRouter } from 'vue-router';
import WorkItem from '@/components/WorkItem.vue';

const cardItems = ref([]);
const isAlert = ref(false);
const isActive = ref(null);
const defaultType = ref(null);
const thumbClass = ref(['row-cols-2', 'row-cols-md-3', 'row-cols-lg-4']);
const listClass = ref(['row-cols-1', 'row-cols-lg-2']);
const route = useRoute();

const routeInfo = computed(() => {
	return route.query.type;
});

console.log('routeInfo', routeInfo.value)

const fetchWorks = async () => {
	try {
		const { data } = await getWorks('/works.json');
		cardItems.value = data.works;
		defaultType.value = routeInfo.value ? routeInfo.value : 'card-thumb';
		isActive.value = routeInfo.value === 'card-list' ? false : true;
		console.log(cardItems.value);
	}catch(e){
		console.log(e.message);
	}
}

fetchWorks();

const viewType = computed({
	get() {
		return defaultType.value;
	},

	set(newType) {
		defaultType.value = newType;
		isActive.value = !isActive.value;
	}
});

const viewClass = computed(() => {
	return defaultType.value === 'card-thumb' ? thumbClass.value : listClass.value;
});

const workItems = (work) => {
	return defaultType.value == 'card-thumb' ?
	{
		view: 'card-thumb',  
		project: work.project, 
		date: work.date
	} : {
		view: 'card-list',  
		badge: true,
		project: work.project,
		client: work.client,
		url: work.url,
		date: work.date
	}
}

const router = useRouter();
const goDetail = (id, $event) => {
	if(!cardItems.value[id].images.length){
		isAlert.value = true;
		setTimeout(() => {
			isAlert.value = false;
		}, 2000)
		return false;
	} 
	router.push({ name:  'PortfolioDetailView', params: { id }, query:{ type: viewType.value } });
}

</script>

<style scoped>
.slide-enter-from, 
.slide-leave-to {opacity:0; transform:translateY(-100vh)}
.slide-enter-to, 
.slide-leave-from {opacity:1;  transform:translateY(0)}
.slide-enter-active, 
.slide-leave-active {transition:all .5s ease}
</style>
