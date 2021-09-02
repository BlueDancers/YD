<template>
  <div v-for="item in line" :key="item" v-show="item != 0" class="y_line" :style="{ left: item + 'px' }"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const line = computed(() => store.state.auxiliary.showlineY)
    return {
      line,
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
  background-color: #2970f6;
  top: 0px;
}
</style>
