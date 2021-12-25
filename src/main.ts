import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'
import store from './store/index'
import { createPinia } from 'pinia'
import SvgIcon from './components/SvgIcon.vue'
import 'animate.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(createPinia())
app.mount('#app')
app.component('SvgIcon', SvgIcon)
