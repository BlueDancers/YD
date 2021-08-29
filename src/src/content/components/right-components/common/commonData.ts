import { useStore } from 'vuex'
import { computed, ref, toRefs } from 'vue'

export function useRightData() {
  const store = useStore()
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
