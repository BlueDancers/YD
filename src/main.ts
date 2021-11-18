/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-08-31 10:56:39
 * @Editors: lgldlk
 * @LastEditTime: 2021-09-01 09:54:06
 */
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'

import store from './store/index'
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

import cloudbase from '@cloudbase/js-sdk'
import { $APP } from './PROVIDE_KEY'

import SvgIcon from './components/SvgIcon.vue'

import './iconfont'

const $app = cloudbase.init({
  env: 'mall-2gdgzk540aab98cd',
})
const app = createApp(App)

app.provide($APP, $app)

app.use(router)
app.use(store)
app.use(createPinia())
app.use(Antd)
app.mount('#app')
app.component('SvgIcon', SvgIcon)
