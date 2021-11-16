<template>
  <div
    v-for="item in line"
    :key="item"
    v-show="item != 0 && coordinate.length == 2 && mouseLock"
    class="y_line"
    :style="{ left: item + 'px' }"
  ></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const line = computed(() => store.state.auxiliary.showlineY)
    const coordinate = computed(() => store.state.core.coordinate)
    const mouseLock = computed(() => store.state.core.mouseLock)
    return {
      line,
      mouseLock,
      coordinate,
    }
  },
})
</script>
<style lang="scss" scoped>
.y_line {
  position: absolute;
  height: 100%;
  z-index: 99999;
  width: 1px;
  background-color: rgba(41, 113, 246, 0.3);
  top: 0px;
}
</style>
