<template>
	<div>
		<div class="my-key-visual">
			<div class="container py-5">
				<div class="col-5 rnd-bx">
					<h2>About Me</h2>	
					<p class="mb20"> 2022년 웹관련 경력 <span class="red">20년차</span>이며,<br>
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
			</div>
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
