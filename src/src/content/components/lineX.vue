<template>
  <div class="x_line_cont">
    <div v-for="item in line" :key="item" class="x_line" :style="{ top: item + 'px' }"></div>
  </div>
</template>

<script lang="ts">
import { useLineStore } from '@/stores/line'
import { computed, defineComponent, watch } from 'vue'

export default defineComponent({
  setup() {
    const line = useLineStore()
    let carrentList = computed(() => {
      let duplicates: number[] = []
      const tempArray: number[] = [...line.lineXList, ...line.calineX].sort()
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i + 1] === tempArray[i]) {
          duplicates.push(tempArray[i])
        }
      }
      return duplicates
    })
    return {
      line: carrentList,
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
