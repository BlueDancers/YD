import { useBoardStore } from '@/stores/board'
import { useMouseMove } from '@/utils/Hook/useMouseMove'
import { useMouseWheel } from '@/utils/Hook/useMouseWheel'
import { useKeyModifier } from '@vueuse/core'
import { watch } from 'vue'

export default function useListen(target) {
  const board = useBoardStore()
  // 滚轮监听 指定范围
  const { wheelDelta } = useMouseWheel(target)
  watch(wheelDelta, (value) => {
    if (board.isMeta) {
      if (board.scale > 0.1) {
        board.scale = board.scale + value * 0.001
      } else {
        board.scale = 0.11
      }
      return
    }
    board.top = board.top + value / 100
  })

  // 鼠标监听 指定范围
  const { moveData } = useMouseMove(target)
  watch(moveData, (value) => {
    // console.log(value)
  })

  // Meta 按键监听 全局
  const metaState = useKeyModifier('Meta')
  watch(metaState, (value) => {
    console.log('变化')
    board.isMeta = value || false
  })
  // 空格 按键监听 (未做)
}
