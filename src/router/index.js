import { createRouter, createWebHashHistory } from 'vue-router';
import MainView from '@/views/MainView.vue';
import AboutView from '@/views/AboutView.vue';
import PortfolioListView from '@/views/PortfolioListView.vue';
import PortfolioDetailView from '@/views/PortfolioDetailView.vue';
import LabView from '@/views/LabView.vue';
import BookMarkView from '@/views/BookMarkView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

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
		name: 'PortfolioListView',
		component: PortfolioListView,
	},
	{
		path: '/portfolio/:id',
		name: 'PortfolioDetailView',
		component: PortfolioDetailView,
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
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior() {
		return { left: 0, top: 0 };
	},
});

export default router;
