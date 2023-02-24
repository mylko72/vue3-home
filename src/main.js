import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/base.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import viewport from './plugins/viewport';
import util from './plugins/util';

const app = createApp(App);
app.use(router);
app.use(viewport);
app.use(util);
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
