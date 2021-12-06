import { baseComList, baseComponent } from '@/modules/components'
import { defineStore } from 'pinia'

export const useCoreStore = defineStore('core', {
  state: () => {
    return {
      acPageIndex: 0, // 当前选中的页面
      pageData: [] as any[],
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
    },
  },
})
