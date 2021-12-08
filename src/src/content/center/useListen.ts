import { useBoardStore } from '@/stores/board'
import { useCoreStore } from '@/stores/core'
import { useMouseMove } from '@/utils/Hook/useMouseMove'
import { useMouseWheel } from '@/utils/Hook/useMouseWheel'
import { useKeyModifier, useMousePressed } from '@vueuse/core'
import { watch } from 'vue'

export default function useListen({ mainTarget, heightTarget }) {
  const board = useBoardStore()
  const core = useCoreStore()
  // 滚轮监听 指定范围
  const { wheelDelta } = useMouseWheel(mainTarget)
  watch(wheelDelta, (value) => {
    if (core.isMeta) {
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

  // 鼠标移动监听
  const { moveData } = useMouseMove(mainTarget)
  watch(moveData, (value) => {
    console.log(core.moveIndex)

    switch (core.moveIndex) {
      case 1:
        console.log('坐标点')
        break
      case 8:
        console.log('大小变化')
        core.pageData[core.acPageIndex][core.activeCompIndex].cssModule.width += value.x
        core.pageData[core.acPageIndex][core.activeCompIndex].cssModule.height += value.y
        break
      case 9:
        // 修改页面高度
        board.height = board.height + value.y
        break
      case 10:
        // 移动元素
        core.pageData[core.acPageIndex][core.activeCompIndex].cssModule.top += value.y
        core.pageData[core.acPageIndex][core.activeCompIndex].cssModule.left += value.x
        break

      default:
        break
    }
    if (core.downState) {
      console.log('组件/坐标点,开始移动')
    }
  })

  // Meta 按键监听 全局
  const metaState = useKeyModifier('Meta')
  watch(metaState, (value) => {
    core.isMeta = value || false
  })
  // 空格 按键监听 (未做)

  // 监听 改变页面长度div
  const heightState = useMousePressed({ target: heightTarget })
  watch(heightState.pressed, (value) => {
    core.moveIndex = value ? 9 : 0
  })
  // 监听 模板点击
  const coreState = useMousePressed({ target: mainTarget })
  watch(coreState.pressed, (value) => {
    core.downState = value
    // 放开鼠标,清除鼠标事件
    if (!value) {
      console.log('清除事件')
      core.moveIndex = 0
    }
  })
}
