import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import SvgIcon from './components/SvgIcon.vue'

import { router } from './router/index'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
app.component('SvgIcon', SvgIcon)
