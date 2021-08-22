import { createStore } from 'vuex'
import app from './modules/app'
import core from './modules/core'
// 创建一个新的 store 实例
const store = createStore({
  modules: {
    app,
    core,
  },
})

export default store
