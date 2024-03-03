import { createApp } from 'vue';
import App from './App.vue';

import pinia from './store';
import 'normalize.css';
import './assets/css/index.css';

const app = createApp(App);
app.use(pinia);
app.mount('#app');
