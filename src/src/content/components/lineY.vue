<template>
  <div class="y_line_cont">
    <div v-for="item in line.showY" :key="item" class="y_line" :style="{ left: item + 'px' }"></div>
  </div>
</template>

<script lang="ts">
import { useLineStore } from '@/store/line'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const line = useLineStore()
    return {
      line: line    }
  },
})
</script>
<style lang="scss" scoped>
.y_line {
  position: absolute;
  height: 100%;
  z-index: 1;
  width: 1px;
  background-color: rgba(41, 113, 246, 0.8);
  top: 0px;
}
</style>
