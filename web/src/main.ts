import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import { createApp } from 'vue'
import App from './App.vue'
import Router from './routes'
import mitt from 'mitt'
const emitter = mitt();
export default emitter;
const app = createApp(App)
app.config.globalProperties.emitter = emitter;

app.use(Router).mount('#app')
