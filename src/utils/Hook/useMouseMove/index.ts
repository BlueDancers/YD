import { onMounted, onUnmounted, reactive } from 'vue-demi'

/**
 * 监听鼠标滚动
 */
export function useMouseMove(target?) {
  const moveData = reactive({
    x: 0,
    y: 0,
  })
  const fn = (event) => {
    moveData.x = event.movementX
    moveData.y = event.movementY
  }
  let dom
  onMounted(() => {
    if (target.value) {
      dom = target.value
    } else {
      dom = document
    }
    dom.addEventListener('mousemove', fn, false)
  })
  onUnmounted(() => {
    dom.removeEventListener('mousemove', fn, false)
  })
  return {
    moveData,
  }
}
