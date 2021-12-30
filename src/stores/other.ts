import { deepClone, guid } from '@/utils'
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
      if (this.copyData.length == 0) {
        return
      }
      core.carryPageComp.dom = deepClone(core.carryPageComp.dom.concat(this.copyData))
    },
  },
})
