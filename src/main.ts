import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueFeather from 'vue-feather';
import App from './App.vue';
import router from './router/router';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/dark/css-vars.css';

import Button from './app/shared/components/Button.vue';
import ButtonGroup from './app/shared/components/ButtonGroup.vue';
import Logo from './app/shared/components/Logo.vue';
import Section from './app/shared/components/Section.vue';
import Spinner from './app/shared/components/Spinner.vue';
import Swirl from './app/shared/components/Swirl.vue';
import ZigZag from './app/shared/components/ZigZag.vue';
import './assets/styles/main.scss';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
    },
    components,
    directives,
});

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(autoAnimatePlugin);
app.use(ElementPlus);

// shared components
app.component(VueFeather.name, VueFeather);
app.component('Button', Button);
app.component('ButtonGroup', ButtonGroup);
app.component('Logo', Logo);
app.component('Section', Section);
app.component('Spinner', Spinner);
app.component('Swirl', Swirl);
app.component('ZigZag', ZigZag);

app.mount('#app');
