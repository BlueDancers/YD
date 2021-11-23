import { useDebounce } from '@vueuse/shared'
import { onMounted, onUnmounted, ref } from 'vue-demi'

/**
 * 监听鼠标滚动
 */
export function useMouseWheel(target?) {
  const wheelDelta = ref(0)
  const debounced = useDebounce(wheelDelta, 0)
  const fn = (event) => {
    wheelDelta.value = event.wheelDelta
  }
  let dom
  onMounted(() => {
    if (target.value) {
      dom = target.value
    } else {
      dom = document
    }
    dom.addEventListener('mousewheel', fn, false)
  })
  onUnmounted(() => {
    dom.removeEventListener('mousewheel', fn, false)
  })
  return {
    wheelDelta: debounced,
  }
}
