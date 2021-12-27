import { guid } from '@/utils'
import { defineStore } from 'pinia'
import { useCoreStore } from './core'

let core = useCoreStore()
export const useOtherStore = defineStore('other', {
  state: () => {
    return {
      rightKey: 1,
      copyData: [], // 粘贴板内数据
    }
  },
  actions: {
    pushData(comp) {
      this.copyData = JSON.parse(JSON.stringify(comp))
      this.copyData.map((e: any) => {
        console.log(e)
        e.id = guid()
        e.animation = []
        e.cssModule.left += 10
        e.cssModule.top += 10
      })
    },
    // 粘贴组件
    pasteComp() {
      console.log('粘贴逻辑')
      this.copyData.map((e) => {
        core.carryPageComp.dom.push(e)
      })
      // 粘贴逻辑之后存在卡顿问题,目前未找到原因
    },
  },
})
