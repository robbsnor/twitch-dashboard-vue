import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import VueFeather from 'vue-feather';
import App from './App.vue';
import router from './router/router';

// prime
import 'primevue/resources/themes/aura-dark-lime/theme.css';
import 'primeicons/primeicons.css';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Slider from 'primevue/slider';
import Sidebar from 'primevue/sidebar';

import './assets/styles/main.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(autoAnimatePlugin);

// prime
app.use(PrimeVue);
app.component('Button', Button);
app.component('Card', Card);
app.component('Checkbox', Checkbox);
app.component('InputText', InputText);
app.component('MultiSelect', MultiSelect);
app.component('Slider', Slider);
app.component('Sidebar', Sidebar);

app.component(VueFeather.name, VueFeather);

app.mount('#app');
