import { debounce, deepClone } from '@/utils/index'
import { defineStore } from 'pinia'
import { useCoreStore } from './core'

let core = useCoreStore()
const baseXpoint: number[] = [] // 默认X轴的标注点
const baseYpoint: number[] = [0, 160, 320] // 默认Y轴的标注点

export const useLineStore = defineStore('line', {
  state: () => {
    return {
      lineXList: new Set(), // 当前X轴选中坐标
      lineYList: new Set(), // 当前Y轴选中坐标

      calineX: new Set(), // 页面当前可匹配X轴坐标
      calineY: new Set(), // 页面当前可匹配Y轴坐标

      offestY: 0, // 父级元素边界距离
      offestX: 0, // 父级元素边界距离

      showX: [] as any[], // X轴上显示的辅助做标签
      showY: [] as any[], // Y轴上显示的辅助做标签
    }
  },
  actions: {
    getLineList({ left, top }) {
      console.log('触发')
      this.offestY = left
      this.offestX = top
      // 获取全部元素(去除自己)
      let list: any = deepClone(core.carryPageComp)
      list.dom.splice(core.activeCompIndex, 1)
      console.log('生成辅助线的', list.dom)

      let lineXList = new Set()
      let lineYList = new Set()
      list.dom.map((res) => {
        lineXList.add(res.cssModule.top + top)
        lineXList.add(res.cssModule.top + res.cssModule.height + top)
        lineXList.add(res.cssModule.top + res.cssModule.height / 2 + top)

        lineYList.add(res.cssModule.left + left)
        lineYList.add(res.cssModule.left + res.cssModule.width + left)
        lineYList.add(res.cssModule.left + res.cssModule.width / 2 + left)
      })

      baseXpoint.map((e) => lineXList.add(top + e))
      baseYpoint.map((e) => lineYList.add(left + e))

      this.lineXList = lineXList
      this.lineYList = lineYList
    },
    // 保存当前拖动元素的左中右 上中下 坐标
    listenEvent(css) {
      debounce(() => {
        let calineXMap = new Set([
          css.top + this.offestX,
          css.top + css.height / 2 + this.offestX,
          css.top + css.height + this.offestX,
        ])
        let calineYMap = new Set([
          css.left + this.offestY,
          css.left + css.width / 2 + this.offestY,
          css.left + css.width + this.offestY,
        ])
        this.calineX = calineXMap
        this.calineY = calineYMap

        this.showX = []
        for (const key of this.calineX) {
          if (this.lineXList.has(key)) {
            this.showX.push(key)
          }
        }

        this.showY = []
        for (const key of this.calineY) {
          if (this.lineYList.has(key)) {
            this.showY.push(key)
          }
        }

        // console.log(this.showX, this.showY)
      }, 0)
    },
    resetLine() {
      this.$reset()
    },
  },
})
