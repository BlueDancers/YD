import { baseComList, baseComponent } from '@/modules/components'
import { defineStore } from 'pinia'

export const useCoreStore = defineStore('core', {
  state: () => {
    return {
      acPageIndex: 0, // 当前选中的页面
      activeCompIndex: 0, // 当前选中的组件下标
      hoverCompIndex: 0, // 当前hover的组件下标
      pageData: [] as any[][],
      isMeta: false, // 是否按住command
      moveIndex: 0, // 当前拖动类型 1-8 坐标点 9 底部高度条 10 按住元素
      downState: false, // 当前是否按住了鼠标
      lockCompId: [] as string[], // 被锁定的组件(id)
    }
  },
  actions: {
    addPage() {
      this.pageData.push([])
    },
    addComp(name: string, css?) {
      let comp = baseComList(name, this.pageData[0].length + 1)
      if (comp && css) {
        comp.cssModule.top = css.top - comp.cssModule.height / 2
        comp.cssModule.left = css.left - comp.cssModule.width / 2
      }
      this.pageData[0].push(comp)
      // 默认选中新添加的组件
      this.activeCompIndex = this.pageData[0].length - 1
    },
    deleteComp(index) {
      this.pageData[this.acPageIndex].splice(index, 1)
    },
    lockComp(id: string, type) {
      if (type) {
        this.lockCompId.push(id)
      } else {
        let index = this.lockCompId.findIndex((e) => e == id)
        this.lockCompId.splice(index, 1)
      }
    },
    switchShowComp(index: number, type: boolean) {
      this.pageData[this.acPageIndex][index].show = type
    },
    toggleComp(index: number) {
      this.activeCompIndex = index
      // 判断是否被锁
      let id = this.pageData[this.acPageIndex][index].id
      if (!this.lockCompId.includes(id)) {
        this.changeMoveIndex(10)
      } else {
        console.log('被锁住')
      }
    },
    // 切换拖动类型
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
