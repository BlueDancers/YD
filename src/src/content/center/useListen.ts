import { useBoardStore } from '@/stores/board'
import { useMouseMove } from '@/utils/Hook/useMouseMove'
import { useMouseWheel } from '@/utils/Hook/useMouseWheel'
import { useKeyModifier, useMousePressed } from '@vueuse/core'
import { watch } from 'vue'

export default function useListen({ mainTarget, heightTarget }) {
  const board = useBoardStore()
  // 滚轮监听 指定范围
  const { wheelDelta } = useMouseWheel(mainTarget)
  watch(wheelDelta, (value) => {
    if (board.isMeta) {
      if (board.scale > 0.1) {
        board.scale = board.scale + value * 0.001
      } else {
        board.scale = 0.11
      }
      return
    } else {
      board.top = board.top + value / 20
    }
  })

  // 鼠标监听 指定范围
  const { moveData } = useMouseMove(mainTarget)
  watch(moveData, (value) => {
    // console.log(value)
    if (board.lock.heightLink) {
      board.height = board.height + value.y
    }
  })

  // Meta 按键监听 全局
  const metaState = useKeyModifier('Meta')
  watch(metaState, (value) => {
    board.isMeta = value || false
  })
  // 空格 按键监听 (未做)

  // 监听 按住改变页面长度
  const heughtState = useMousePressed({ target: heightTarget })
  watch(heughtState.pressed, (value) => {
    board.lock.heightLink = value
  })
}
