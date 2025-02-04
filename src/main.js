import { createApp } from 'vue';
import App from './App.vue';
import router from './router/route.js';
import i18n from './lang/i18n';
import './assets/style.css';

const app = createApp(App);

app.use(router);
app.use(i18n);

app.mount('#app');
