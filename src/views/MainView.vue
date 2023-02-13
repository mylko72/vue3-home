<template>
	<div>
		<div class="key-visual"></div>
		<div class="container col-xl-12 col-xxl-11">
			<h2 class="mt-5">Recent Works</h2>
			<div class="row row-cols-1 row-cols-lg-2 g-3 gy-4 g-xl-4 my-4 mb-5">
				<div class="col" v-for="(card, index) in cardItems" :key="index">
					<template v-if="index <= 5">
						<WorkItem 
							view="card-list"
							:badge="show"
							:project="card.project"
							:client="card.client"
							:url="card.url"
							:date="card.date">
							<template #card-image>
								<div class="card-img">
									<img v-if="card.thumbnail" :src="card.thumbnail" @click="goDetail(index)" class="card-img-top" alt="">
									<img v-else src="/src/assets/images/img_no.png" class="card-img-top no-img" alt="">
								</div>
							</template>
						</WorkItem>
					</template>
				</div>
			</div>
		</div>
			<div class="my-ability active">
				<div class="container">
					<div class="row">
						<div class="col-xs-12 col-sm-6 col-md-3">
							<div class="circle">
								<i class="bi bi-browser-chrome"></i>
								<p>Web Standard</p>
								<p>Web Accessibility</p>
								<p>Cross Browsing</p>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-3">
							<div class="circle">
								<i class="bi bi-filetype-html"></i>
								<p>HTML5</p>
								<p>CSS3</p>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-3">
							<div class="circle">
								<i class="bi bi-file-earmark-code"></i>
								<p>Javascript</p>
								<p>Typescript</p>
								<p>Vue.js</p>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-3">
							<div class="circle">
								<i class="bi bi-phone"></i>
								<p>Mobile</p>
								<p>Responsive</p>
								<p>Interactive</p>
							</div>
						</div>
					</div>
				</div>
			</div>
	</div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { getWorks } from '@/api/works';
import WorkItem from '@/components/WorkItem.vue';
import { useRouter } from "vue-router";

const cardItems = ref([]);
const show = ref(false);
const limit = 6;
const router = useRouter();

const fetchWorks = async (limit) => {
	try {
		cardItems.value = await getWorks(limit);
		show.value = true;
		console.log(cardItems.value);
	}catch(e){
		console.log(e.message);
	}
}

fetchWorks(limit);

const goDetail = (id) => {
	if(!cardItems.value[id].images.length){
		return false;
	} 
	router.push({ name:  'PortfolioDetailView', params: { id }});
}

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
