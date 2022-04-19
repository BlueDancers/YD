import { useMain } from '@/store/main'
import { useMagicKeys, useMouseInElement } from '@vueuse/core'
import { watch, watchEffect } from 'vue'

/**
 * 页面移动监听函数
 */
export default function useListen(coreRef) {
  const main = useMain()
  const { ctrl, c, v, z } = useMagicKeys()
  watchEffect(() => {
    if (ctrl.value && c.value) {
      console.log('复制')
    } else if (ctrl.value && v.value) {
      console.log('粘贴')
    } else if (ctrl.value && z.value) {
      console.log('撤回')
    }
  })

  /**
   * 与主页面相关的元素位置反应
   */
  const { elementX, elementY, isOutside } = useMouseInElement(coreRef)
  console.log('监听对象', coreRef)
  watch(elementX, (value) => {
    // console.log(value)
  })
  watch(elementY, (value) => {
    // console.log(value)
  })
}
