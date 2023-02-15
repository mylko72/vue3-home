<template>
	<div>
		<div class="my-key-visual">

		</div>
		<div class="about-me">
			<div class="container pb-4">
				<h2>About Me</h2>	
				<div class="row">
					<div class="col-12 col-sm-8">
						<p> 2023년 웹관련 경력 <span class="red">21년차</span>이며,<br>
								웹디자이너로 시작하여 현재는 <span class="maroon">웹퍼블리셔</span>이자 <span class="blue">UI 개발자</span>이다.<br> <span class="brown">커피</span>... 그리고 <span class="green">자전거</span>를 타며 자연을 느끼는 소소함을 좋아한다.
						</p>
						<p>
							나의 일을 사랑하며<br>
							UI 개발과 동적 스크립트 구현에 관심이 많다.
						</p>
						<ul class="profile">
							<li>이름 : Lee Kwan Oh</li>
							<li>주소 : 안산시 단원구 초지동</li>
							<li>고용형태 : 프리랜서</li>
							<li>업무분야 : Web Publisher, UI 개발, Front End 개발</li>
						</ul>
					</div>
					<div class="col-4">
						<span class="ico-bicycle"><i class="bi bi-bicycle"></i></span>
					</div>					
				</div>
			</div>
		</div>
		<div class="my-skill">
			<div class="container py-5">
				<h2>My Skill</h2>	

				<div class="row">
					<div class="col-xs-8 col-sm-4 col-md-3">
						<span class="ico-skill"><i class="bi bi-gear-wide-connected"></i></span>
					</div>
					<div class="col-xs-8 col-sm-4 col-md-3 skill-list">
						<h3>Web Publishing</h3>
						<ul>
							<li>웹표준</li>
							<li>웹접근성</li>
							<li>Mobile Web</li>
							<li>Responsive Web</li>
							<li>Pallax Animation</li>				
							<li>CSS3</li>
							<li>HTML5</li>
							<li>SASS</li>
						</ul>
					</div>
					<div class="col-xs-8 col-sm-4 col-md-4 col-lg-4 skill-list">
						<h3>Front End Develpement</h3>
						<ul>
							<li>Vue.js</li>
							<li>Javascript</li>
							<li>Typescript</li>								
							<li>jQuery</li>								
							<li>Bootstrap</li>
							<li>Git</li>
							<li>Gulp</li>
							<li>Webpack</li>
						</ul>
					</div>
					<div class="ico-send"><i class="fa fa-send-o"></i></div>
				</div>				
			</div>
		</div>
		<div class="my-history">
			<div class="container py-5">
				<h3>My History</h3>
				<div class="row lists">
					<div class="col-3"></div>
					<div class="col-9 col-md-8">
						<div class="row" v-for="(card, index) in cardItems" :key="index">
							<WorkItem 
								view="card-default"
								:badge="true"
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
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import WorkItem from '@/components/WorkItem.vue';
import { ref } from '@vue/reactivity';
import { getWorks } from '@/api/posts';
import { useFetch } from '@/composables/fetch';
import { useAxios } from '@/composables/useAxios';

const cardItems = ref([]);

// const { response: cardItems, error, isLoading } = useFetch('/works.json');

const { response, data: items, error, loading } = useAxios(
	'/works.json', 
	{ method:'get'},
	{
		onSuccess: () => { 
			console.log('data success...')
			cardItems.value = items.value.works;
		}
	}
);

</script>

<style scoped></style>
