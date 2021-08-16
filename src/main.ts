import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'
import store from './store/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import cloudbase from '@cloudbase/js-sdk'

const $app = cloudbase.init({
  env: 'mall-2gdgzk540aab98cd',
})
const app = createApp(App)

app.provide('$app', $app)

app.use(router)
app.use(store)
app.use(Antd)
app.mount('#app')
