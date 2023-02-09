<template>
	<div class="container py-5">
		<div class="card-lists col-xl-10">
		<h2>Portfolio</h2>			
			<div class="row row-cols-4 g-3 my-4">
				<div class="col" v-for="(card, index) in cardItems" :key="index">
					<div class="card" @click="goDetail(index)">
						<div class="card-img">
							<img :src="card.image" class="card-img-top" alt="...">
						</div>
						<div class="card-body">
							<p class="card-title text-truncate">{{ card.project }}</p>
							<p class="card-text"><span class="date text-muted">{{ index }}, {{ card.date }}</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { getWorks } from '@/api/works';
import { useRouter } from 'vue-router';

const cardItems = ref([]);
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
	router.push({ name:  'PortfolioDetailView', params: { id }});
}

</script>

<style scoped></style>
