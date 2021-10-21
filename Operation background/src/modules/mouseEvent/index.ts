import store from '@/store/index'
import { computed } from 'vue'
import { message } from 'ant-design-vue'

export default function mouseEvent() {
  document.onkeydown = (event) => {
    console.log(event)
    if (event.ctrlKey && event.code == 'KeyC') {
      store.commit('coreAssist/copyCurrentComp')
    }
    if (event.ctrlKey && event.code == 'KeyV') {
      store.commit('coreAssist/pasteComp')
    }
    if (event.ctrlKey && event.code == 'KeyZ') {
      console.log('撤销')
    }
    if (event.code == 'Delete') {
      deleteActive()
    }
  }
}

/**
 * 删除选中
 */
export function deleteActive() {
  const coordinate = computed(() => store.state.core.coordinate)
  const containerList = computed(() => store.state.core.containerList)
  // 判断是否选中
  if (coordinate.value.length == 0) {
    message.warn('请选择需要删除的组件')
  } else if (coordinate.value.length == 1) {
    // 删除父类
    let pid = containerList.value[coordinate.value[0]].id
    store.commit('core/deleteParentCont', pid)
  } else if (coordinate.value.length == 2) {
    // 删除子类
    let cid = containerList.value[coordinate.value[0]].components[coordinate.value[1]].id
    store.commit('core/deleteChildComp', cid)
  }
}
