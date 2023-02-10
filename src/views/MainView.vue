<template>
	<div>
		<div class="key-visual"></div>
		<div class="container col-xl-12 col-xxl-11">
			<h2 class="mt-5">Recent Works</h2>
			<div class="row row-cols-2 g-3 gy-4 g-xl-4 my-4">
				<div class="col" v-for="(card, index) in cardItems" :key="index">
					<template v-if="index <= 5">
						<WorkItem 
							display="card-list"
							:thumbnail="card.thumbnail"
							:project="card.project"
							:client="card.client"
							:url="card.url"
							:date="card.date"
							@click="goDetail(index)">
						</WorkItem>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { getWorks } from '@/api/works';
import WorkItem from '@/components/WorkItem.vue';

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


</script>

<style scoped>
.key-visual {
	height: 500px;
	background-image: url(@/assets/images/img_winter.jpg);
	background-position: 50% 100%;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
}
</style>
