import { deepClone } from '@/utils'
import { defineStore } from 'pinia'
import { Vue } from 'vue-demi'
import { useCoreStore } from './core'

let core = useCoreStore()
export const useLineStore = defineStore('line', {
  state: () => {
    return {
      lineXList: [0] as number[], // 所有X轴被标注点
      lineYList: [0, 160, 320] as number[], // 所有Y轴被标注点
      calineX: [] as number[],
      calineY: [] as number[],
    }
  },
  actions: {
    getLineList() {
      // 获取全部元素(去除自己)
      let list: any[] = deepClone(core.carryPageComp)
      list.splice(core.activeCompIndex, 1)
      let lineXList: number[] = []
      let lineYList: number[] = []
      list.map((res) => {
        lineXList.push(res.cssModule.top)
        lineXList.push(res.cssModule.top + res.cssModule.height)
        lineXList.push(res.cssModule.top + res.cssModule.height / 2)
        lineYList.push(res.cssModule.left)
        lineYList.push(res.cssModule.left + res.cssModule.width)
        lineYList.push(res.cssModule.left + res.cssModule.width / 2)
      })
      this.lineXList = Array.from(new Set([...this.lineXList, ...lineXList]))
      this.lineYList = Array.from(new Set([...this.lineYList, ...lineYList]))
    },
    // 实时刷新自己的坐标点
    listenEvent(css) {
      this.calineX = [css.top, css.top + css.height / 2, css.top + css.height]
      this.calineY = [css.left, css.left + css.width / 2, css.left + css.width]
    },
    resetLine() {
      this.$reset()
    },
  },
})
