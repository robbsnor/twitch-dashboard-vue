import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { vuetify } from './vuetify.config';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueFeather from 'vue-feather';
import App from './App.vue';
import router from './router/router';
import './assets/styles/main.scss';

// shared components
import Button from './app/shared/components/Button.vue';
import ButtonGroup from './app/shared/components/ButtonGroup.vue';
import DialogBase from './app/shared/components/DialogBase.vue';
import Logo from './app/shared/components/Logo.vue';
import PageTabs from './app/shared/components/PageTabs.vue';
import Section from './app/shared/components/Section.vue';
import Spinner from './app/shared/components/Spinner.vue';
import Swirl from './app/shared/components/Swirl.vue';
import ZigZag from './app/shared/components/ZigZag.vue';

const app = createApp(App);
const pinia = createPinia();

// shared components
app.component(VueFeather.name!, VueFeather);
app.component('Button', Button);
app.component('ButtonGroup', ButtonGroup);
app.component('DialogBase', DialogBase);
app.component('Logo', Logo);
app.component('PageTabs', PageTabs);
app.component('Section', Section);
app.component('Spinner', Spinner);
app.component('Swirl', Swirl);
app.component('ZigZag', ZigZag);

// plugins
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(autoAnimatePlugin);

// pinia
pinia.use(piniaPluginPersistedstate);

app.mount('#app');
