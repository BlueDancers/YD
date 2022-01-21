<template>
  <div class="x_line_cont">
    <div v-for="item in line.showX" :key="item" class="x_line" :style="{ top: item + 'px' }"></div>
  </div>
</template>

<script lang="ts">
import { useLineStore } from '@/store/line'
import { computed, defineComponent, watch, watchEffect } from 'vue'

export default defineComponent({
  setup() {
    const line = useLineStore()
    return {
      line: line,
    }
  },
})
</script>
<style lang="scss" scoped>
.x_line {
  position: absolute;
  width: 100%;
  z-index: 1;
  height: 1px;
  background-color: rgba(41, 113, 246, 0.8);
  left: 0px;
}
</style>
