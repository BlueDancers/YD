<template>
  <img
    class="yimg"
    :class="props.activeCont == props.componentId ? 'aaa' : ''"
    :style="resetCss(props.cssModule)"
    @click="activeCompId"
    :src="props.staticData.src"
  />
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
.yimg {
  position: relative;
}
</style>
