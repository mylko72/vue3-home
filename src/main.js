import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/base.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import viewport from './plugins/viewport';

const app = createApp(App);
app.use(router);
app.use(viewport);
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
