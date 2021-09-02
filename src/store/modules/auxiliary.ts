import { Module } from 'vuex'

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
      console.log(data)
      state.showlineX = []
      state.showlineY = []
      let topList: any[] = []
      let leftList: any[] = []
      data.map((res) => {
        if (topList.includes(res.cssModule.top)) {
          state.showlineX.push(res.cssModule.top)
        }
        if (leftList.includes(res.cssModule.left)) {
          state.showlineY.push(res.cssModule.left)
        }
        if (topList.includes(res.cssModule.top + res.cssModule.height)) {
          state.showlineX.push(res.cssModule.top + res.cssModule.height)
        }
        if (leftList.includes(res.cssModule.left + res.cssModule.width)) {
          state.showlineY.push(res.cssModule.left + res.cssModule.width)
        }

        topList.push(res.cssModule.top, res.cssModule.top + res.cssModule.height)
        leftList.push(res.cssModule.left, res.cssModule.left + res.cssModule.width)
      })

      console.log(state.showline)
      console.log(topList)
      console.log(leftList)
    },
  },
  actions: {},
}

export default app
