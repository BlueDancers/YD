import { useStore } from 'vuex'
import { computed, ref, toRefs } from 'vue'

/**
 * 父级容器的当前选中数据
 * @returns 
 */
function useRightData() {
  const store = useStore()
  console.log('当前',store);
  
  const containerList = computed(() => store.state.core.containerList)
  const coordinate = computed(() => store.state.core.coordinate)
  const activeCont = computed({
    get: () => {
      if (coordinate.value.length != 0) {
        let carry = containerList.value[coordinate.value[0]]
        if (carry) {
          return carry
        } else {
          return null
        }
      } else {
        return null
      }
    },
    set: (value) => {},
  })
  const activeComp = computed({
    get: () => {
      if (coordinate.value.length == 2) {
        return containerList.value[coordinate.value[0]].components[coordinate.value[1]]
      } else {
        return null
      }
    },
    set: (value) => {},
  })
  return {
    activeCont,
    activeComp,
  }
}

export default useRightData
