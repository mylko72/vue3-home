import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/MainView.vue';
import AboutView from '@/views/AboutView.vue';
import PortfolioView from '@/views/PortfolioView.vue';
import LabView from '@/views/LabView.vue';
import BookMarkView from '@/views/BookMarkView.vue';

const routes = [
	{
		path: '/',
		name: 'MainView',
		component: MainView,
	},
	{
		path: '/about',
		name: 'AboutView',
		component: AboutView,
	},
	{
		path: '/portfolio',
		name: 'PortfolioView',
		component: PortfolioView,
	},
	{
		path: '/lab',
		name: 'LabView',
		component: LabView,
	},
	{
		path: '/bookmark',
		name: 'BookMarkView',
		component: BookMarkView,
	},
];

const router = createRouter({
	history: createWebHistory('/'),
	routes,
});

export default router;
