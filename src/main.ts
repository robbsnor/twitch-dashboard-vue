import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
// import './assets/prime/themes/mytheme/theme.scss';
import './assets/prime/themes/aura/aura-dark/pink/theme.scss';
import './assets/styles/main.scss';

import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import VueFeather from 'vue-feather';
import App from './App.vue';
import router from './router/router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(autoAnimatePlugin);
app.use(PrimeVue);

app.component(VueFeather.name, VueFeather);

app.mount('#app');
