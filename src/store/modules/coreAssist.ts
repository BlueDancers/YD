import { guid } from '@/utils'
import { message } from 'ant-design-vue'
import { toRaw } from 'vue'
import { Module } from 'vuex'
import store from '../index'

/**
 * core的一些非核心数据
 */
const coreAssist: Module<any, any> = {
  namespaced: true,
  state() {
    return {
      copyData: null, // 当前被复制的对象
    }
  },
  mutations: {
    copyCurrentComp(state) {
      // 获取当前选择的组件
      let { containerList, coordinate } = store.state.core
      if (coordinate.length == 2) {
        let current = JSON.parse(JSON.stringify(containerList[coordinate[0]].components[coordinate[1]]))
        state.copyData = current
        message.success('复制成功~')
      } else {
        message.warn('请选择需要复制的组件')
      }
    },
    pasteComp(state) {
      let coordinate = store.state.core.coordinate
      if (coordinate.length == 0) {
        message.warn('请选择容器')
      } else if (state.copyData == null) {
        message.warn('粘贴板上无数据哦~')
      } else {
        let { top, left } = state.copyData.cssModule
        state.copyData.cssModule.top = top + 2
        state.copyData.cssModule.left = left + 2
        let compData = JSON.parse(JSON.stringify(state.copyData))
        compData.id = guid()
        store.commit('core/set_toPaste_cont', compData)
      }
    },
  },
  actions: {},
}

export default coreAssist
