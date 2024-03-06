import './assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VueFeather from 'vue-feather';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.component(VueFeather.name, VueFeather);

app.mount('#app');
