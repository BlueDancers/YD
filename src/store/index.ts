import { createStore } from 'vuex'
import app from './modules/app'
import core from './modules/core'
import auxiliary from './modules/auxiliary'
// 创建一个新的 store 实例
const store = createStore({
  modules: {
    app,
    core,
    auxiliary,
  },
})

export default store
