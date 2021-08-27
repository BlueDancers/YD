import { ref } from 'vue'
import { useStore } from 'vuex'

export function useMouseFun() {
  const store = useStore()
  // 组件鼠标移动事件
  const mousedown = (e, cid, pid) => {
    if (e.button == 0) {
      store.commit('core/set_activechild', {
        pid,
        cid,
      })
      store.commit('core/toggle_mouseType', 2)
    }
    // console.log('组件被点击')store
  }
  const mouseup = (e) => {}
  const mouseleave = (e) => {}
  return {
    mousedown,
    mouseup,
    mouseleave,
  }
}
