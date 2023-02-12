<template>
	<div class="container py-5">
		<div class="card-lists col-xl-12 col-xxl-11">
			<h2>Portfolio</h2>			
			<div class="d-flex">
				<div class="ms-auto">
					<div class="btn-group">
						<button type="button" class="btn btn-outline-secondary" @click="changeView('card-list')">
							<i class="bi bi-card-list"></i>
							<span class="visually-hidden">리스트</span>
						</button>
						<button type="button" class="btn btn-outline-secondary active" @click="changeView('card-thumb')">
							<i class="bi bi-card-image"></i>
							<span class="visually-hidden">썸네일</span>
						</button>
					</div>
				</div>
			</div>
			<div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 g-xl-4 my-2">
				<div class="col" v-for="(card, index) in cardItems" :key="index">
					<WorkItem 
						display="card-thumb"
						:project="card.project"
						:date="card.date"
						@click="goDetail(index)">
						<template #card-image>
								<div class="card-img">
									<img v-if="card.thumbnail" :src="card.thumbnail" class="card-img-top" alt="">
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
import { ref } from 'vue'
import { getWorks } from '@/api/works';
import { useRouter } from 'vue-router';
import WorkItem from '@/components/WorkItem.vue';

const cardItems = ref([]);
const thumbnail = ref(null);
const isAlert = ref(false);

const fetchWorks = async () => {
	try {
		cardItems.value = await getWorks();
		// thumbnail.value = card.thumbnail ? card.thumbnail : '@/assets/images/img_no.png';
		console.log(cardItems.value);
	}catch(e){
		console.log(e.message);
	}
}

fetchWorks();

const router = useRouter();
const goDetail = (id) => {
	if(!cardItems.value[id].images.length){
		isAlert.value = true;
		setTimeout(() => {
			isAlert.value = false;
		}, 2000)
		return false;
	} 
	router.push({ name:  'PortfolioDetailView', params: { id }});
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
