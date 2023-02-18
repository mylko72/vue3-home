<template>
	<div class="container py-5">
		<div class="col-xl-12 col-xxl-11 mx-auto">
			<h2 class="mb-4">Bookmark</h2>			
			<div class="row ps-3">
				<div class="col-md-1 col-lg-2 css-shapes-preview" ref="el" :class="{ 'fixed' : isFixed }" :style="{'left': isFixed ? absLeft+'px' : 'unset' }">
					<ul class="bookmark-menu">
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
import { computed, onMounted, onUnmounted } from '@vue/runtime-core';
import { useScroll } from '@/composables/useScroll';

const bookmarkLists = ref([]);
const bookmarkKeys = ref([]);

const { response, data: items, error, loading } = useAxios(
	'/src/api/bookmark.json', 
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

const el = ref(null);
const { pageYOffset, absTop, absLeft } = useScroll({ target: el });

const isFixed = computed(() => {
	return pageYOffset.value > absTop.value;
});

const winWidth = ref(0);

onMounted(() => {
	window.addEventListener('load', () => winWidth.value = window.innerWidth);
	window.addEventListener('resize', () => winWidth.value = window.innerWidth);
})

onUnmounted(() => {
	window.removeEventListener('load', () => winWidth.value = window.innerWidth);
	window.removeEventListener('resize', () => winWidth.value = window.innerWidth);
})

</script>

<style scoped></style>
