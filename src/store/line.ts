import { deepClone } from '@/utils/index'
import { defineStore } from 'pinia'
import { Vue } from 'vue-demi'
import { useCoreStore } from './core'

let core = useCoreStore()
export const useLineStore = defineStore('line', {
  state: () => {
    return {
      baseXpoint: [0] as number[], // 默认X轴的标注点
      baseYpoint: [0, 160, 320] as number[], // 默认Y轴的标注点
      lineXList: [] as number[], // 所有X轴被标注点
      lineYList: [] as number[], // 所有Y轴被标注点
      calineX: [] as number[], // 当前选中元素的动态坐标
      calineY: [] as number[],
      offestY: 0, // 父级元素边界距离
      offestX: 0,
    }
  },
  actions: {
    getLineList({ left, top }) {
      this.offestY = left
      this.offestX = top
      // 获取全部元素(去除自己)
      let list: any = deepClone(core.carryPageComp)
      list.dom.splice(core.activeCompIndex, 1)
      let lineXList: number[] = []
      let lineYList: number[] = []
      list.dom.map((res) => {
        lineXList.push(res.cssModule.top)
        lineXList.push(res.cssModule.top + res.cssModule.height)
        lineXList.push(res.cssModule.top + res.cssModule.height / 2)
        lineYList.push(res.cssModule.left + left)
        lineYList.push(res.cssModule.left + res.cssModule.width + left)
        lineYList.push(res.cssModule.left + res.cssModule.width / 2 + left)
      })
      this.baseYpoint.map((e) => lineYList.push(left + e))
      this.baseXpoint.map((e) => lineXList.push(top + e))

      this.lineXList = Array.from(new Set([...lineXList]))
      this.lineYList = Array.from(new Set([...lineYList]))
    },
    // 实时刷新自己的坐标点
    listenEvent(css) {
      this.calineX = [
        css.top + this.offestX,
        css.top + css.height / 2 + this.offestX,
        css.top + css.height + this.offestX,
      ]
      this.calineY = [
        css.left + this.offestY,
        css.left + css.width / 2 + this.offestY,
        css.left + css.width + this.offestY,
      ]
    },
    resetLine() {
      this.$reset()
    },
  },
})
