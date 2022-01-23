import { debounce, deepClone } from '@/utils/index'
import { defineStore } from 'pinia'
import { useCoreStore } from './core'

let core = useCoreStore()
const baseXpoint: number[] = [] // 默认X轴的标注点
const baseYpoint: number[] = [0, 160, 320] // 默认Y轴的标注点

export const useLineStore = defineStore('line', {
  state: () => {
    return {
      lineXList: new Set() as Set<number>, // 当前X轴选中坐标
      lineYList: new Set() as Set<number>, // 当前Y轴选中坐标

      calineX: new Set() as Set<number>, // 页面当前可匹配X轴坐标
      calineY: new Set() as Set<number>, // 页面当前可匹配Y轴坐标

      offestY: 0, // 父级元素边界距离
      offestX: 0, // 父级元素边界距离

      showX: [] as any[], // X轴上显示的坐标(x,0)
      showY: [] as any[], // Y轴上显示的坐标(0,y)
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

      let lineXList: Set<number> = new Set()
      let lineYList: Set<number> = new Set()
      list.dom.map((res) => {
        lineXList.add(Math.round(res.cssModule.top + top))
        lineXList.add(Math.round(res.cssModule.top + res.cssModule.height + top))
        lineXList.add(Math.round(res.cssModule.top + res.cssModule.height / 2 + top))

        lineYList.add(Math.round(res.cssModule.left + left))
        lineYList.add(Math.round(res.cssModule.left + res.cssModule.width + left))
        lineYList.add(Math.round(res.cssModule.left + res.cssModule.width / 2 + left))
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
          Math.round(css.top + this.offestX),
          Math.round(css.top + this.offestX + css.height / 2),
          Math.round(css.top + this.offestX + css.height),
        ])
        let calineYMap = new Set([
          Math.round(css.left + this.offestY),
          Math.round(css.left + this.offestY + css.width / 2),
          Math.round(css.left + this.offestY + css.width),
        ])
        this.calineX = calineXMap
        this.calineY = calineYMap

        // 将set数据(3条),进行数据拓展
        this.showX = []
        let calineX = expandSet(this.calineX)
        for (const [key, value] of calineX) {
          if (this.lineXList.has(key)) {
            // value值为当前移动值的位置 如果匹配到了,就直接将线标出来
            this.showX.push(key)
            // 理想坐标
            let cX = value - this.offestX
            // 真实坐标
            let cXkey = key - this.offestX
            let { top, height } = core.carryCss
            if (cX == top) {
              console.log('底部')
              core.carryCss.top = cXkey
            } else if (cX == top + height) {
              console.log('顶部')
              core.carryCss.top = cXkey - height
            } else if (cX == top + height / 2) {
              console.log('中部')
              core.carryCss.top = cXkey - height / 2
            }
            return
          }
        }

        this.showY = []
        let calineY = expandSet(this.calineY)

        this.showY = []
        for (const [key, value] of calineY) {
          if (this.lineYList.has(key)) {
            // value值为当前移动值的位置 如果匹配到了,就直接将线标出来
            this.showY.push(key)
            // 理想坐标
            let cY = value - this.offestY
            // 真实坐标
            let cYkey = key - this.offestY
            let { left, width } = core.carryCss
            if (cY == left) {
              console.log('左边')
              core.carryCss.left = cYkey
            } else if (cY == left + width) {
              console.log('右边')
              core.carryCss.left = cYkey - width
            } else if (cY == left + width / 2) {
              console.log('中部')
              core.carryCss.left = cYkey - width / 2
            }
            return
          }
        }
      }, 0)
    },
    resetLine() {
      this.$reset()
    },
  },
})

/**
 * 判断是否包含
 * @param allSet
 * @param activeSet
 */
function expandSet(activeSet) {
  let setPlus = new Map()
  for (const ite of activeSet) {
    for (let i = -2; i <= 2; i++) {
      setPlus.set(ite + i, ite)
    }
  }
  return setPlus
}
