import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { vuetify } from './vuetify.config';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router/router';
import ToastPlugin from 'vue-toast-notification';
import VueFeather from 'vue-feather';
import 'vue-toast-notification/dist/theme-default.css';
import './assets/styles/main.scss';

// shared components
import ArrowList from './app/shared/components/ArrowList.vue';
import Button from './app/shared/components/Button.vue';
import ButtonGroup from './app/shared/components/ButtonGroup.vue';
import Dialog from './app/shared/components/Dialog.vue';
import Divider from './app/shared/components/Divider.vue';
import Empty from './app/shared/components/Empty.vue';
import Logo from './app/shared/components/Logo.vue';
import PageTabs from './app/shared/components/PageTabs.vue';
import Section from './app/shared/components/Section.vue';
import Spinner from './app/shared/components/Spinner.vue';
import Swirl from './app/shared/components/Swirl.vue';
// import Tab from './app/shared/components/Tab.vue';
import ZigZag from './app/shared/components/ZigZag.vue';

// directives
import { fadeStagger } from './app/base/directives/fade-stagger.directive';

const app = createApp(App);
const pinia = createPinia();

// shared components
app.component(VueFeather.name!, VueFeather);
app.component('ArrowList', ArrowList);
app.component('Button', Button);
app.component('ButtonGroup', ButtonGroup);
app.component('Dialog', Dialog);
app.component('Divider', Divider);
app.component('Empty', Empty);
app.component('Logo', Logo);
app.component('PageTabs', PageTabs);
app.component('Section', Section);
app.component('Spinner', Spinner);
app.component('Swirl', Swirl);
// app.component('Tab', Tab);
app.component('ZigZag', ZigZag);

// directives
app.directive('fadeStagger', fadeStagger);

// plugins
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(autoAnimatePlugin);
app.use(ToastPlugin);

// pinia plugins
pinia.use(piniaPluginPersistedstate);

app.mount('#app');
