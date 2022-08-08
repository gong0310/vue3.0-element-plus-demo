import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from "./i18n/index";
import router from "./router";

const app = createApp(App);



app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.mount('#app')
