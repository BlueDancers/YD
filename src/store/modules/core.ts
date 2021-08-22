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
    set_containerList(state) {
      state.containerList.push({
        id: guid(),
        cssModule: {
          width: 375,
          height: 200,
          position: 'relative',
        },
        components: [],
      })
    },
    changeContList(state, data) {
      state.containerList = data
    },
    toggleActive(state, id){
      state.activeCont = id
    }
  },
  actions: {},
}

/**
 * 生成随机id
 */
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8

    return v.toString(16)
  })
}

export default core
