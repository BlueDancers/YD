import { deepClone, guid } from '@/utils/index'
import { message } from 'ant-design-vue'
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
    pushData() {
      if (core.activeCompIndex == -1) {
        message.error('请选中组件')
        return false
      }
      let comp = core.carryPageComp.dom.filter((e, i) => i == core.activeCompIndex)
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
      if (this.copyData.length == 0) {
        message.error('粘贴板内无数据')
        return
      }
      core.carryPageComp.dom = deepClone(core.carryPageComp.dom.concat(this.copyData))
    },
  },
})
