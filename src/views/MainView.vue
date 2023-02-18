<template>
	<div>
		<div class="key-visual"></div>
		<div class="container col-xl-12 col-xxl-11 my-work">
			<h2 class="mt-5">Recent Works</h2>
			<div v-if="error" class="error-msg">
				<span class="text-muted">{{ error.message }}</span>
			</div>
			<div v-else-if="cardItems" class="row row-cols-1 row-cols-lg-2 g-3 gy-4 g-xl-4">
				<div class="col" v-for="(card, index) in cardItems" :key="index">
						<WorkItem 
							view="card-list"
							:badge="true"
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
				</div>
			</div>
      <div v-else class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
		</div>
		<div class="my-ability active">
			<div class="container">
				<div class="row g-3">
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
						<div class="circle">
							<i class="bi bi-browser-chrome"></i>
							<p>Web Standard</p>
							<p>Web Accessibility</p>
							<p>Cross Browsing</p>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
						<div class="circle">
							<i class="bi bi-filetype-html"></i>
							<p>HTML5</p>
							<p>CSS3</p>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
						<div class="circle">
							<i class="bi bi-file-earmark-code"></i>
							<p>Javascript</p>
							<p>Typescript</p>
							<p>Vue.js</p>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
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
		<div class="my-concern">
			<div class="container">
				<div class="row gx-5 gy-5">
					<div class="col-xs-12 col-md-6">
						<h2>Git, 분산 버전 관리시스템</h2>
						<div class="d-flex">
							<div class="col-4 col-sm-4 col-md-3 me-3">
								<img src="/src/assets/images/img_git.png" class="img-fluid" alt="" />
							</div>
							<div class="col-xs-8 col-sm-8 col-md-9">
								<p>Git은 분산버전 관리시스템으로 작업파일을 로컬 저장소뿐만 아니라 원격 저장소에도 저장할 수 있으며 작업 이력을 관리하고 분기하여 원하는 시점으로 파일을 복원하거나 통합할 수 있다. 여러사람과 협업과 공유도 가능하며 버전별로 이력을 관리할 수 있는 Git을 이용하여 소스의 품질 향상시키는 방법을 배워보자.</p>
								<div class="d-grid col-6 mx-auto">
									<a href="http://mylko72.gitbooks.io/git/" role="button" class="btn btn-outline-secondary" target="_blank">GitBook 보기</a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-md-6">
						<h2>TypeScript <span class="h4">is JavaScript with syntax for types.</span></h2>
						<div class="d-flex">
							<div class="col-4 col-sm-4 col-md-3 me-3">
								<img src="/src/assets/images/img_typescript_logo.png" class="img-fluid" alt="Typescript" />
							</div>
							<div class="col-xs-8 col-sm-8 col-md-9">
								<p>2012년 마이크로소프트가 발표한 타입스크립트(TypeScript)는 자바스크립트(JavaScript)를 기반으로 정적 타입 문법을 추가한 프로그래밍 언어이다. 타입(Types)을 사용하면 JavaScript 애플리케이션을 개발할 때 정적 타입 검사 및 코드 리팩토링과 같은 생산성 높은 개발을 수행할 수 있다.</p>
								<div class="d-grid col-6 mx-auto">
									<a href="https://www.typescriptlang.org/" class="btn btn-outline-secondary" role="button" target="_blank">공식문서</a>
								</div>								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { getWorks } from '@/api/posts';
import WorkItem from '@/components/WorkItem.vue';
import { useRouter } from "vue-router";
import { useFetch } from '@/composables/fetch';
import { useAxios } from '@/composables/useAxios';

const cardItems = ref(null);
const limit = 6;
const router = useRouter();

// const { response, error, isLoading } = useFetch('/works.json');
const { response, data: items, error, loading } = useAxios(
	'/src/api/works.json', 
	{ method:'get'},
	{
		onSuccess: () => {
			console.log('data success...')
			cardItems.value = items.value.works.slice(0, limit);
		}
	}
);

const fetchWorks = async (limit) => {
	try {
		const { data } = await getWorks('/works.json');
		cardItems.value = data.works.slice(0, limit);
		show.value = true;
		isLoading.value = true;
		console.log(cardItems.value);
	}catch(err){
		error.value = err;
		console.log(e.message);
	}
}

//fetchWorks(limit);

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
