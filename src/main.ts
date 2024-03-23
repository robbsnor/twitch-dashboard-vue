import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueFeather from 'vue-feather';
import App from './App.vue';
import router from './router/router';

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/dark/css-vars.css';

import './assets/styles/main.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(autoAnimatePlugin);
app.use(ElementPlus);

app.component(VueFeather.name, VueFeather);

app.mount('#app');
