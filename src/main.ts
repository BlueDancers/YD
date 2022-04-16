import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from 'pinia'

import SvgIcon from './components/SvgIcon.vue'

import { router } from './router/index'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.mount('#app')
app.component('SvgIcon', SvgIcon)
