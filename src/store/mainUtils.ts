import { defineStore } from 'pinia'
import { cloud } from '@/utils/request'
import { setStorageSync } from '@/modules/storage'
import { baseComponent } from '@/modules/component'
import { useMain } from './main'
import { deepClone } from '@/utils'

// 装修中的工具方法
const main = useMain()

export const useMainUtils = defineStore('mainUtils', {
  state: () => {
    return {
      copyData: [] as baseComponent[],
      initCoordinates: [0, 0], // 选中框初始坐标
      endCoordinates: [0, 0], // 选中框结束坐标
      coreLeft: 0,
      coreTop: 0,
    }
  },
  actions: {
    setCopyData() {
      this.copyData.splice(0) // 清除数据
      main.acIdx.forEach((e) => {
        this.copyData.push(deepClone(main.template[e]))
      })
      console.log('数据', this.copyData)
      this.pasteData()
    },
    pasteData() {
      this.copyData.forEach((e) => {
        e.cssModule.top += 20
        e.cssModule.left += 20
        console.log(deepClone(e))
        main.template.push(deepClone(e))
      })
    },
  },
})
