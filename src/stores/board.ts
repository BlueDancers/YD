import { defineStore } from 'pinia'

export const useBoardStore = defineStore('board', {
  state: () => {
    return {
      top: 60, // 具体顶部高度
      left: 50, // 具体左边距离
      scale: 1, // 缩放比例
      height: 800, // 页面高度
      isMeta: false, // 是否按住command
      lock: {
        heightLink: false, // 当前是否在拖动高度
      },
    }
  },
  actions: {},
})
