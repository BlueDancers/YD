<template>
  <div class="y_line_cont">
    <div v-for="item in line" :key="item" class="y_line" :style="{ left: item + 'px' }"></div>
  </div>
</template>

<script lang="ts">
import { useLineStore } from '@/stores/line'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const line = useLineStore()
    let carrentList = computed(() => {
      let duplicates: any[] = []
      const tempArray: any = [...line.lineYList, ...line.calineY].sort()
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
.y_line {
  position: absolute;
  height: 100%;
  z-index: 0;
  width: 1px;
  background-color: rgba(41, 113, 246, 0.3);
  top: 0px;
}
</style>
