<template>
	<div class="container py-5">
		<div class="work-lists col-xl-12 col-xxl-11">
			<h2>Portfolio</h2>			
			<div class="d-flex">
				<div class="ms-auto">
					<div class="btn-group">
						<button type="button" 
							ref="anchor1"
							class="btn btn-outline-secondary ico-tooltip" 
							:class="{'active' : !isActive}" 
							@click="viewType = 'card-list'"
							@mouseenter="showTooltip($refs['anchor1'], { direction: 'top', msg: '리스트로 보기' })" 
							@mouseout="hideTooltip">
							<i class="bi bi-card-list"></i>
							<span class="visually-hidden">리스트</span>
						</button>
						<button type="button" 
							ref="anchor2"
							class="btn btn-outline-secondary ico-tooltip" 
							:class="{'active' : isActive}" 
							@click="viewType = 'card-thumb'"
							@mouseenter="showTooltip($refs['anchor2'], { direction: 'bottom', msg: '썸네일로 보기' })" 
							@mouseout="hideTooltip">
							<i class="bi bi-card-image"></i>
							<span class="visually-hidden">썸네일</span>
						</button>
					</div>
				</div>
			</div>
			<div v-if="error" class="error-msg">
				<span class="text-muted">{{ error.message }}</span>
			</div>
			<div v-else-if="cardItems" class="row g-3 g-xl-4 my-2" :class="viewClass">
				<div class="col col-xs-10" v-for="(card, index) in cardItems" :key="index">		
					<WorkItem 
						v-bind="workItems(card)"
						@click="viewType === 'card-thumb' && goDetail(index, $event)">
						<template #card-image>
							<div class="card-img">
								<img v-if="card.thumbnail" :src="card.thumbnail" @click="viewType === 'card-list' && goDetail(index)" class="card-img-top" alt="">
								<img v-else src="/assets/images/img_no.png" class="card-img-top no-img" alt="">
							</div>
						</template>
					</WorkItem>
				</div>
			</div>
      <div v-else class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
		</div>
		<Transition name="slide">
			<div v-if="isAlert" class="alert alert-danger v-alert" role="alert">
				상세 이미지가 없습니다.
			</div>
		</Transition>

		<Teleport to="body">
			<AppTooltip :isHover="isHover" :position="tooltipStyle" :direction="tooltipDirection" :message="tooltipTxt" />
		</Teleport>
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useAxios } from '@/composables/useAxios';
import WorkItem from '@/components/WorkItem.vue';
import AppTooltip from '@/components/app/AppTooltip.vue';
import { useTooltip } from '@/composables/useTooltip';

const cardItems = ref(null);
const isAlert = ref(false);
const isActive = ref(null);
const defaultType = ref(null);
const thumbClass = ref(['row-cols-xs-1', 'row-cols-sm-2', 'row-cols-md-3', 'row-cols-lg-4']);
const listClass = ref(['row-cols-1', 'row-cols-lg-2']);
const route = useRoute();

const routeInfo = computed(() => {
	return route.query.type ?? 'card-thumb';
});

// console.log(route.query);

// console.log('routeInfo', routeInfo.value);

const { response, data: items, error, loading } = useAxios(
	'/works.json', 
	{ method:'get'},
	{
		onSuccess: () => { 
			console.log('data success...');
			cardItems.value = items.value.works;
			defaultType.value = routeInfo.value ? routeInfo.value : 'card-thumb';
			isActive.value = routeInfo.value === 'card-list' ? false : true;
		}
	}
);

const viewType = computed({
	get() {
		return defaultType.value;
	},

	set(newType) {
		defaultType.value = newType;
		isActive.value = !isActive.value;
	}
});

const viewClass = computed(() => {
	return defaultType.value === 'card-thumb' ? thumbClass.value : listClass.value;
});

const workItems = (work) => {
	return defaultType.value == 'card-thumb' ?
	{
		view: 'card-thumb',  
		project: work.project, 
		date: work.date
	} : {
		view: 'card-list',  
		badge: true,
		project: work.project,
		client: work.client,
		url: work.url,
		date: work.date
	}
}

// const { hover, direction, position, message } = useTooltip();

const isHover = ref(false);
const anchor1 = ref(null);
const anchor2 = ref(null);
const calcPos = ref({top:0, left:0});

const tooltipTxt = ref('썸네일로 보기');
const tooltipDirection = ref(null);
const tooltipStyle = computed(() => {
	return { top: '-9999px', left: 0 }
});
// const tooltipValue = ref({ top:'-9999px', left:0 })
// const tooltipStyle = computed({
// 	get(){
// 		return {
// 			top: tooltipValue.value.top,
// 			left: tooltipValue.value.left
// 		}
// 	},
// 	set(x, y){
// 		console.log('x', x);
// 		console.log('y', y);
// 		tooltipValue.value.left = x;
// 		tooltipValue.value.top = y;
// 	}
// });

const showTooltip = (el, params) => {
	const { msg, direction } = params;
	const clientRect = el.getBoundingClientRect();
	const { top, left } = calcPosition(params.direction, clientRect);
	
	isHover.value = true;
	tooltipStyle.value.top = top+'px';
	tooltipStyle.value.left = left+'px';
	tooltipTxt.value = msg;
	tooltipDirection.value = direction;
	console.log(tooltipStyle.value)
}
const hideTooltip = () => {
	isHover.value = false;
	tooltipStyle.value.top = '-9999px';
}

const calcPosition = (direction, clientRect) => {
	const { top, left, height, width } = clientRect;
	const absTop = window.pageYOffset + top;
	const absLeft = window.pageXOffset + left;

	if(direction === 'top'){
		calcPos.value.top = absTop - height;
		calcPos.value.left = absLeft+(width/2);
	}else if(direction === 'bottom'){
		calcPos.value.top = absTop + height;
		calcPos.value.left = absLeft+(width/2);
	}else if(direction === 'left'){
		calcPos.value.top = absTop + (height/8);
		calcPos.value.left = absLeft;
	}else if(direction === 'right'){
		calcPos.value.top = absTop + (height/8);
		calcPos.value.left = absLeft + width;
	}

	return {
		top: calcPos.value.top,
		left: calcPos.value.left
	}
}

const router = useRouter();
const goDetail = (id, $event) => {
	if(!cardItems.value[id].images.length){
		isAlert.value = true;
		setTimeout(() => {
			isAlert.value = false;
		}, 2000)
		return false;
	} 
	router.push({ name:  'PortfolioDetailView', params: { id }, query:{ type: viewType.value } });
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
