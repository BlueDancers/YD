import { baseComList } from '@/modules/components'
import { guid } from '@/utils'
import { message } from 'ant-design-vue'
import { Module } from 'vuex'

const core: Module<any, any> = {
  namespaced: true,
  state() {
    return {
      activeCont: '', // 当前选中的父级组件
      activechild: '', // 当前选中的子类组件
      containerList: [],
    }
  },
  mutations: {
    // 添加容器
    set_containerList(state) {
      state.containerList.push({
        id: guid(),
        cssModule: {
          width: 375,
          height: 200,
          position: 'relative',
          backgroundColor: '#59c7f9',
        },
        components: [], // 当前页面数据
      })
    },
    // 添加组件
    add_components(state, name) {
      if (state.activeCont) {
        // 寻找父级下标
        let index = state.containerList.findIndex((e) => e.id == state.activeCont)
        // 设定层级
        let zIndex = state.containerList[index].components.length
        // 获取dom数据
        let comp = baseComList(name, zIndex + 1)
        // 插入数据
        state.containerList[index].components.push(comp)
      } else {
        message.warn('请选择父级组件')
      }
    },
    changeContList(state, data) {
      state.containerList = data
    },
    toggleActive(state, id) {
      state.activeCont = id
    },
  },
  actions: {},
}

export default core
