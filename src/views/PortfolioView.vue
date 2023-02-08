<template>
	<div class="container py-5">
		<div class="card-lists col-10">
		<h2>Portfolio</h2>			
			<div class="row row-cols-4 g-3 my-4">
				<div class="col" v-for="(card, index) in cardItems" :key="index">
					<div class="card">
						<div class="card-img">
							<img :src="card.image" class="card-img-top" alt="...">
						</div>
						<div class="card-body">
							<p class="card-title text-truncate">{{card.project}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const cardItems = ref([]);

cardItems.value = [
	{
			"project": "삼성물산 패션몰 개선 및 운영",
			"image": "/src/assets/images/img_ssfshop_s.jpg",
			"client": "삼성물산",
			"date" : "2022.06 ~ 2022.12",
			"view": "sshshop",
			"url" : "https://www.ssfshop.com/"
	},        
	{
			"project": "신한은행 배달앱서비스 땡겨요",
			"image": "/src/assets/images/img_ddangyo_s.jpg",
			"client": "신한은행",
			"date" : "2021.08 ~ 2022.02",
			"view": "ddangyo",
			"url" : "https://www.ddangyo.com/"
	},
	{
			"project": "삼성SDS 인적자원 Visibility 강화과제",
			"image": "/src/assets/images/img_sds_s.jpg",
			"client": "삼성SDS",
			"date" : "2020.06 ~ 2021.06",
			"view": ""
	},
	{
			"project": "신라면세점",
			"image": "/src/assets/images/img_shilladfs_s.jpg",
			"client": "신라면세점",
			"date" : "2018.04 ~ 2020.06",
			"view": "shilladfs",
			"url" : "http://m.shilladfs.com/estore/kr/ko/"
	},
	{
			"project": "홈앤쇼핑",
			"image": "/src/assets/images/img_hnsmall_s.jpg",
			"client": "홈앤쇼핑",
			"date" : "2017.02 ~ 2018.02",
			"view": "hnsmall",
			"url" : " https://www.hnsmall.com/"
	},
];

</script>

<style scoped></style>
