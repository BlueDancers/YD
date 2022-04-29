import { useMain } from '@/store/main'
import { numberFun } from '@/utils'
import { onClickOutside, useMagicKeys, useMouseInElement, useMousePressed } from '@vueuse/core'
import { computed, watch, watchEffect } from 'vue'

/**
 * 页面移动监听函数
 */
export default function useListen(coreRef) {
  const main = useMain()
  let initX = 0 // 保存操作前的坐标
  let initY = 0
  const { ctrl, c, v, z, Delete, ControlLeft } = useMagicKeys()
  watchEffect(() => {
    if (ctrl.value && c.value) {
      console.log('复制')
    } else if (ctrl.value && v.value) {
      console.log('粘贴')
    } else if (ctrl.value && z.value) {
      main.revoke()
    } else if (Delete.value) {
      main.deleteComp(main.acIdx)
    }
  })

  // 监听ctrl键
  watch(ControlLeft, (value) => {
    main.isCtrl = value
  })

  // 监听鼠标松开
  const { pressed } = useMousePressed(coreRef)
  watch(pressed, (value) => {
    if (!value) {
      main.moveIndex = 0
    }
  })

  /**
   * 与主页面相关的元素位置反应
   */
  const { elementX, elementY } = useMouseInElement(coreRef)
  const acDom = computed(() => {
    if (main.acIdx.length == 1) {
      return main.template[main.acIdx[0]].cssModule
    } else {
      return {}
    }
  })
  watchEffect(() => {
    switch (main.moveIndex) {
      case 1:
        top()
        left()
        break
      case 2:
        left()
        break
      case 3:
        bottom()
        left()
        break
      case 4:
        top()
        break
      case 5:
        bottom()
        break
      case 6:
        top()
        right()
        break
      case 7:
        right()
        break
      case 8:
        bottom()
        right()
        break
      case 9:
        if (numberFun(elementY.value, 0) > 3000) {
          main.pageHeight = 3000
        } else if (numberFun(elementY.value, 0) < 650) {
          main.pageHeight = 650
        } else {
          main.pageHeight = numberFun(elementY.value, 0)
        }
        break
      case 10:
        moveDom()
        break
      case 0:
        // 保存操作前坐标
        initX = elementX.value
        initY = elementY.value
        break
      default:
        break
    }
  })

  // 单个坐标点事件
  function top() {
    acDom.value.top = numberFun(elementY.value, 0)
    acDom.value.height = numberFun(acDom.value.height - (elementY.value - initY), 0)
    // 刷新操作前坐
    initY = elementY.value
  }
  function left() {
    acDom.value.left = numberFun(elementX.value, 0)
    acDom.value.width = numberFun(acDom.value.width - (elementX.value - initX), 0)
    // 刷新操作前坐标
    initX = elementX.value
  }
  function right() {
    acDom.value.width = numberFun(elementX.value - acDom.value.left, 0)
  }

  function bottom() {
    acDom.value.height = numberFun(elementY.value - acDom.value.top, 0)
  }

  function moveDom() {
    main.acIdx.map((e) => {
      main.template[e].cssModule.top = numberFun(main.template[e].cssModule.top + (elementY.value - initY), 0)
      main.template[e].cssModule.left = numberFun(main.template[e].cssModule.left + (elementX.value - initX), 0)
    })
    // 移动距离为相对于页面左上角减去抓手距离元素左上角位置
    initX = elementX.value
    initY = elementY.value
  }
}
