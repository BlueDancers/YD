import { useBoardStore } from '@/stores/board'
import { useCoreStore } from '@/stores/core'
import { useLineStore } from '@/stores/line'
import { useMouseMove } from '@/utils/Hook/useMouseMove'
import { useMouseWheel } from '@/utils/Hook/useMouseWheel'
import { useKeyModifier, useMousePressed, onClickOutside } from '@vueuse/core'
import { watch } from 'vue'

export default function useListen({ boardTarget, mainTarget, heightTarget }) {
  function _carrentCss() {
    return core.pageData[core.acPageIndex][core.activeCompIndex].cssModule
  }

  const board = useBoardStore()
  const core = useCoreStore()
  const line = useLineStore()
  // 滚轮监听 指定范围
  const { wheelDelta } = useMouseWheel(boardTarget)
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
  const { moveData } = useMouseMove(boardTarget)
  watch(moveData, (value) => {
    switch (core.moveIndex) {
      case 1:
        _carrentCss().left += value.x
        _carrentCss().top += value.y
        _carrentCss().width -= value.x
        _carrentCss().height -= value.y
        break
      case 2:
        _carrentCss().left += value.x
        _carrentCss().width -= value.x
        break
      case 3:
        _carrentCss().left += value.x
        _carrentCss().width -= value.x
        _carrentCss().height += value.y
        break
      case 4:
        _carrentCss().top += value.y
        _carrentCss().height -= value.y
        break
      case 5:
        _carrentCss().height += value.y
        break
      case 6:
        _carrentCss().top += value.y
        _carrentCss().width += value.x
        _carrentCss().height -= value.y
        break
      case 7:
        _carrentCss().width += value.x
        break
      case 8:
        _carrentCss().width += value.x
        _carrentCss().height += value.y
        break
      case 9:
        // 修改页面高度
        board.pageDetail.height = board.pageDetail.height + value.y
        break
      case 10:
        // 移动元素
        _carrentCss().top += value.y
        _carrentCss().left += value.x
        // 获取选中元素的辅助线点
        line.listenEvent(_carrentCss())
        break

      default:
        break
    }
    if (core.downState) {
    }
  })

  // Meta 按键监听 全局
  const metaState = useKeyModifier('Meta')
  watch(metaState, (value) => {
    core.isMeta = value || false
  })
  // 空格 按键监听 (未做)
  document.addEventListener('keyup', (event) => {
    // 快捷键删除元素
    if (event.code == 'Delete' && core.activeCompIndex >= 0) {
      core.pageData[core.acPageIndex].splice(core.activeCompIndex, 1)
      core.activeCompIndex = -1
    }
  })

  // 监听 改变页面长度div
  const heightState = useMousePressed({ target: heightTarget })
  watch(heightState.pressed, (value) => {
    if (heightTarget.value) {
      core.changeMoveIndex(value ? 9 : 0)
    }
  })
  // 监听 模板鼠标按下
  const coreState = useMousePressed({ target: boardTarget })
  watch(coreState.pressed, (value) => {
    core.downState = value
    // 放开鼠标,清除鼠标事件
    if (!value) {
      console.log('清除事件')
      line.resetLine()
      core.changeMoveIndex(0)
    }
  })
  // 点击空白,取消选中
  onClickOutside(mainTarget, (event) => {
    if ((event.target as Element).className == 'board_center') {
      core.activeCompIndex = -1
      core.hoverCompIndex = -1
    }
  })
}
