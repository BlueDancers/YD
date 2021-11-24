import { defineStore } from 'pinia'

export const useBoardStore = defineStore('board', {
  state: () => {
    return {
      top: 60, //
      left: 50,
      scale: 0.9, // 缩放
      height: 800, // 页面高度
      isMeta: false, // 是否按住command
      lock: {
        heightLink: false,
      },
    }
  },
  actions: {},
})
