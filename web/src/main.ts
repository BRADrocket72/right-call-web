import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import { createApp } from 'vue'
import App from './App.vue'
import Router from './routes'
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(Router);
app.use(createPinia());
app.mount('#app');


