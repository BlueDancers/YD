import { defineStore } from 'pinia'

export const useCoreStore = defineStore('core', {
  state: () => {
    return {
      acPageIndex:0, // 当前选中的页面
      pageData: [] as any[],
    }
  },
  actions: {
    addPage() {
      this.pageData.push([])
    },
  },
})
