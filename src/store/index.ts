import { createStore } from 'vuex'
import app from './modules/app'
import core from './modules/core'
import auxiliary from './modules/auxiliary'
import coreAssist from './modules/coreAssist'
// 创建一个新的 store 实例
const store = createStore({
  modules: {
    app,
    core,
    auxiliary,
    coreAssist,
  },
})

export default store
