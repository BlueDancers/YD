import { useCloud } from '@/utils/request'
import { defineStore } from 'pinia'

export const useMain = defineStore('main', {
  state: () => {
    return {
      pageId: '', // 页面id
      pageHeight: 650, // 页面高度
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
          console.log(res.data)
          if (res.data.length == 1) {
            let { template, height } = res.data[0]
            this.template = template
            this.pageHeight = height
          } else {
            console.log('数据异常')
          }
          console.log(this.template)
        })
    },
  },
})
