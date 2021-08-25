<template>
  <button
    class="ybutton"
    :class="activechild == props.componentId ? 'aaa' : ''"
    :style="resetCss(props.cssModule)"
    @click="activeCompId"
  >
    {{ props.staticData.value }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { compProps } from './common/config'
import useCommonFun from './common/commonFun'
export default defineComponent({
  props: compProps,
  setup(props) {
    const common = useCommonFun(props)
    return { ...common }
  },
})
</script>

<style lang="scss" scoped>
.ybutton {
  position: relative;
}
</style>
