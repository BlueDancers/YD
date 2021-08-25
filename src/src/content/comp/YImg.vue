<template>
  <img
    draggable="false"
    class="yimg"
    :class="activechild == props.componentId ? 'aaa' : ''"
    :style="resetCss(props.cssModule)"
    :src="props.staticData.src"
    @mousedown="mousedown($event, props.componentId, props.parentId)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { compProps } from './common/config'
import useCommonFun from './common/commonFun'
import { useMouseFun } from './common/mouseFun'
export default defineComponent({
  props: compProps,
  setup(props) {
    const common = useCommonFun(props)
    const mouse = useMouseFun()
    return { ...common, ...mouse }
  },
})
</script>

<style lang="scss" scoped>
.yimg {
  position: relative;
}
</style>
