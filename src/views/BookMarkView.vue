<template>
	<div class="container py-5" :class="viewPort.mode">
		<div class="col-xl-12 col-xxl-11 mx-auto">
			<h2 class="mb-4">Bookmark</h2>			
			<div class="row ps-3" :style="{'padding-top': fixedSelect ? '150px' : '0' }">
				<div class="col-md-1 col-lg-2 css-shapes-preview" ref="el" :class="{ 'fixed' : isFixed }" :style="{'left': leftSty, 'right': viewPort.mode === 'mobile' && leftSty }">
					<select v-if="fixedSelect" class="form-select" aria-label="Default select example" @change="changeScroll($event)">
						<option selected>Open this select menu</option>
						<template v-for="(name, index) in bookmarkKeys" :key="index">
							<option :value="name">{{ name }}</option>
						</template>
					</select>
					<ul v-else class="bookmark-menu">
						<li v-for="(name, index) in bookmarkKeys" :key="index">
							<a href="#" @click.prevent="goScroll(name)">{{ name }}</a>
						</li>
					</ul>
				</div>
				<div class="col-sm-11 col-md-8 col-lg-9 bookmark-list ms-auto">
					<div class="col" v-for="(value, key, index) in bookmarkLists" :key="index">
						<h3 :id="key.split('.')[0].toLowerCase()"><i class="bi bi-bookmark me-1"></i> <em>{{ key }}</em></h3>
						<ul class="lists">
							<li v-for="(list, index) in value" :key="index">
								<h4><em>{{ list.site }}</em></h4>
								<div class="info">
									<a :href="list.url" target="_blank">{{ list.url }}</a>
									<p class="explain">{{ list.explain }}</p>
									<p class="tags">
										<span v-for="(tag, index2) in list.tags" :key="index2"><i class="bi bi-tags"></i> <a href="#">{{ tag }}</a></span>
									</p>
								</div>
							</li>
						</ul>						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useAxios } from '@/composables/useAxios';
import { computed, inject, onMounted, onUnmounted } from '@vue/runtime-core';
import { useScroll } from '@/composables/useScroll';

const bookmarkLists = ref([]);
const bookmarkKeys = ref([]);

const { response, data: items, error, loading } = useAxios(
	'/bookmark.json', 
	{ method:'get'},
	{
		onSuccess: () => { 
			console.log('data success...');
			bookmarkLists.value = items.value;
			bookmarkKeys.value = Object.keys(items.value);
		}
	}
);

const goScroll = (target) => {
	const targetId = target.split('.')[0].toLowerCase();
	console.log('target', targetId);
	const elem = document.querySelector('#'+targetId);
	elem.scrollIntoView({behavior: 'smooth'});
}

const changeScroll = (event) => {
	const target = event.target.value;
	const targetId = target.split('.')[0].toLowerCase();
	const elem = document.querySelector('#'+targetId);
	const absTop = elem.getBoundingClientRect().top + window.pageYOffset - 150;
	window.scrollTo(0, absTop);
}

const el = ref(null);
const { pageYOffset, absTop, absLeft } = useScroll({ target: el });

const isFixed = computed(() => {
	return pageYOffset.value > absTop.value;
});

const leftSty = computed(() => {
	return isFixed.value ? absLeft.value+'px' : '0'
});

const fixedSelect = computed(() => {
	return isFixed.value && viewPort.value.mode === 'mobile';
})

const viewPort = computed(() => {
	const { mode, size } = inject('viewport');
	return { mode, size };
});

</script>

<style scoped></style>
