import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import './assets/styles/main.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import VueFeather from 'vue-feather';
import App from './App.vue';
import router from './router/router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(autoAnimatePlugin);

app.component(VueFeather.name, VueFeather);

app.mount('#app');
