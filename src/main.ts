import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./assets/style/app.scss"
// import "./security/index.ts";

import App from './App.vue'
import router from './router/route.ts'
import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
