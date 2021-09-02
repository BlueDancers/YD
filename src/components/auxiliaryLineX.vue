<template>
  <div v-for="item in line" :key="item" v-show="item != 0" class="x_line" :style="{ top: item + 'px' }"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const line = computed(() => store.state.auxiliary.showlineX)
    return {
      line,
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
  background-color: #2970f6;
  left: 0px;
}
</style>
