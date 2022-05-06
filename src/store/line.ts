import { defineStore } from 'pinia'

const baseXpoint: number[] = [0] // 默认X轴的标注点
const baseYpoint: number[] = [0, 162, 325] // 默认Y轴的标注点

export const useLine = defineStore('line', {
  state: () => {
    return {
      offestY: 0, // 父级元素边界距离
      offestX: 0, // 父级元素边界距离

      lineX: new Set() as Set<number>, // 当前X轴选中坐标
      lineY: new Set() as Set<number>, // 当前Y轴选中坐标

      calineX: new Set() as Set<number>, // 页面当前可匹配X轴坐标
      calineY: new Set() as Set<number>, // 页面当前可匹配Y轴坐标

      showX: [] as any[], // X轴上显示的坐标(x,0)
      showY: [] as any[], // Y轴上显示的坐标(0,y)
    }
  },
  actions: {
    getLineXY({ top, left, template }, acIdx: any[]) {
      if (acIdx.length != 1) return
      this.offestY = left
      this.offestX = top

      let lineXList: Set<number> = new Set()
      let lineYList: Set<number> = new Set()
      // 加入固定元素
      baseXpoint.map((e) => lineXList.add(top + e))
      baseYpoint.map((e) => lineYList.add(left + e))
      // 加入未选中dom元素
      template.map((res) => {
        lineXList.add(Math.round(res.cssModule.top + top))
        lineXList.add(Math.round(res.cssModule.top + res.cssModule.height + top))
        lineXList.add(Math.round(res.cssModule.top + res.cssModule.height / 2 + top))

        lineYList.add(Math.round(res.cssModule.left + left))
        lineYList.add(Math.round(res.cssModule.left + res.cssModule.width + left))
        lineYList.add(Math.round(res.cssModule.left + res.cssModule.width / 2 + left))
      })
      this.lineX = lineXList
      this.lineY = lineYList
    },
    listenEvent(css, acIdx: any[]) {
      if (acIdx.length != 1) return

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
      this.showX = []
      for (const x of this.calineX) {
        if (this.lineX.has(x)) {
          this.showX.push(x)
        }
      }
      this.showY = []
      for (const y of this.calineY) {
        if (this.lineY.has(y)) {
          this.showY.push(y)
        }
      }
    },
    resetLine() {
      this.$reset()
    },
  },
})
