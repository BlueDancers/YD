import { Module } from 'vuex'
import store from '../index'

const app: Module<any, any> = {
  namespaced: true,
  state() {
    return {
      showlineX: [],
      showlineY: [],
    }
  },
  mutations: {
    updateShowLine(state, data) {
      state.showlineX = []
      state.showlineY = []
      let topList: any[] = []
      let leftList: any[] = []
      let activeComp = store.state.core.activechild[store.state.core.coordinate[1]]
      data.map((res) => {
        let { top, left, height, width } = res.cssModule
        let showX = [top, top + height, top + height / 2]
        let showY = [left, left + width, left + width / 2]
        showX.map((i) => {
          if (topList.includes(i)) {
            state.showlineX.push(i)
          }
        })
        showY.map((i) => {
          if (leftList.includes(i)) {
            state.showlineY.push(i)
          }
        })
        topList.push(top, top + height, top + height / 2)
        leftList.push(left, left + width, left + width / 2)
      })
    },
    clearShowLine(state) {
      state.showlineX = []
      state.showlineY = []
    },
  },
  actions: {},
}

export default app
