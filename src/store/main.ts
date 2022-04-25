import { baseComList, baseComponent } from '@/modules/component'
import { useCloud } from '@/utils/request'
import { defineStore } from 'pinia'

export const useMain = defineStore('main', {
  state: () => {
    return {
      pageId: '', // 页面id
      pageHeight: 650, // 页面高度
      template: [] as baseComponent[], // 组件数组
      moveIndex: 0, // 当前拖动类型 1-8 坐标点 9 底部高度条 10 按住元素
      hoverCompIndex: -1, //
      activeCompIndex: -1, //
      lockCompId: [] as any[],

      domOffsetX: 0, // 元素距离左上角距离
      domOffsetY: 0,
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
    addComp(name, data?) {
      let dom = baseComList(name, this.template.length + 1)
      if (dom) {
        if (data) {
          dom.cssModule.top = data.top - dom.cssModule.height / 2
          dom.cssModule.left = data.left - dom.cssModule.width / 2
        }
        this.template.push({ ...dom })
      }
    },
    toggleComp(index: number) {
      this.activeCompIndex = index
      // 判断是否被锁
      let id = this.template[index].id
      if (!this.lockCompId.includes(id)) {
        this.changeMoveIndex(10)
      } else {
        console.log('被锁住')
      }
    },
    changeMoveIndex(index: number) {
      if (this.moveIndex == 0) {
        this.moveIndex = index
      }
      if (index == 0) {
        this.moveIndex = 0
      }
    },
  },
})
