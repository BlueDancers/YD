<template>
  <button
    class="ybutton"
    :class="props.activeCont == props.componentId ? 'aaa' : ''"
    :style="resetCss(props.cssModule)"
    @click="props.activeCompId"
  >
    {{ props.staticData.value }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { resetCss } from '@/utils/index'
import { useStore } from 'vuex'
export default defineComponent({
  props: ['cssModule', 'configuration', 'staticData', 'activeCont', 'activeCompId', 'componentId'],
  setup(props) {
    const store = useStore()
    const activeCompId = () => {
      store.commit('core/set_activechild', props.componentId)
    }
    return {
      resetCss,
      activeCompId,
      props,
    }
  },
})
</script>

<style lang="scss" scoped>
.ybutton {
  position: relative;
}
</style>
