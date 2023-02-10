<template>
	<div class="container py-5">
		<div class="card-lists col-xl-12 col-xxl-11">
			<h2>Portfolio</h2>			
			<div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 g-xl-4 my-4">
				<div class="col" v-for="(card, index) in cardItems" :key="index">
					<WorkItem 
						display="card-thumb"
						:thumbnail="card.thumbnail"
						:project="card.project"
						:date="card.date"
						@click="goDetail(index)">
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
const isAlert = ref(false);

const fetchWorks = async () => {
	try {
		cardItems.value = await getWorks();
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
