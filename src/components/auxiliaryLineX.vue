<template>
  <div
    v-for="item in line"
    :key="item"
    v-show="item != 0 && coordinate.length == 2 && mouseLock"
    class="x_line"
    :style="{ top: item + 'px' }"
  ></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const line = computed(() => store.state.auxiliary.showlineX)
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
.x_line {
  position: absolute;
  width: 100%;
  z-index: 99999;
  height: 1px;
  background-color: rgba(41, 113, 246, 0.3);
  left: 0px;
}
</style>
