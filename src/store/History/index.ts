import { debounce, deepClone } from '@/utils'
import { Ref, ref } from 'vue'

/**
 * 记录每次模板最终动作
 * 维护好历史行为栈
 * 使用游标实现撤销反撤销
 */
export function stateHistory() {
  const hisList: Ref<any[]> = ref([])
  const hisIdx = ref(0) // 下标

  function addHis(item) {
    debounce(() => {
      // 防止爆栈
      if (hisList.value.length > 10) {
        hisList.value.shift()
      }
      // 如果不是指向最后一位,则干掉当前下标后面的所有数据
      if (hisIdx.value < hisList.value.length - 1) {
        // hisList.value = hisList.value.slice(0, hisIdx.value + 1)
        hisList.value.splice(hisIdx.value + 1, hisList.value.length - 1)
      }
      hisList.value.push(deepClone(item))
      hisIdx.value = hisList.value.length - 1
    }, 200)
  }
  // 撤销
  function revokeHis() {
    if (hisIdx.value == 0) {
      throw new Error('已经撤回到底')
    }
    hisIdx.value--
    return deepClone(hisList.value[hisIdx.value])
  }
  // 反撤销
  function backRevokeHis() {
    if (hisIdx.value == hisList.value.length - 1) {
      throw new Error('已经反撤回到最新代码')
    }
    hisIdx.value++
    return deepClone(hisList.value[hisIdx.value])
  }
  return {
    addHis,
    revokeHis,
    backRevokeHis,
  }
}
