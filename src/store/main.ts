import { useCloud } from '@/utils/request'
import { defineStore } from 'pinia'

export const useMain = defineStore('main', {
  state: () => {
    return {
      pageId: '', // 页面id
      template: [], // 组件数组
    }
  },
  actions: {
    // 获取页面数据
    getTempData() {
      useCloud('pageDetails')
        .where({
          pageId: this.pageId,
        })
        .get()
        .then((res) => {
          this.template = res.data[0].content[0].dom
          console.log(this.template)
        })
    },
  },
})
