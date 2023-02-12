<template>
	<div>
		<div class="container py-5">
			<h2>About Me</h2>			
		</div>
		<div class="my-history">
			<div class="container py-5">
				<h3>My History</h3>
				<div class="row">
					<div class="col-3"></div>
					<div class="col-7">
						<row v-for="(card, index) in cardItems" :key="index">
							<WorkItem 
								view="card-default"
								:badge="show"
								:project="card.project"
								:url="card.url"
								:date="card.date"
								:task="card.task"
								:desc="card.desc">
								<template #card-header>
									<div class="card-header">
										| {{ card.date }} / {{ card.company }}
									</div>
								</template>
							</WorkItem>
						</row>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import WorkItem from '@/components/WorkItem.vue';
import { ref } from '@vue/reactivity';
import { getWorks } from '@/api/works';

const cardItems = ref([]);
const show = ref(false);

const fetchWorks = async () => {
	try {
		cardItems.value = await getWorks();
		show.value = true;
		console.log(cardItems.value);
	}catch(e){
		console.log(e.message);
	}
}

fetchWorks();

</script>

<style scoped></style>
