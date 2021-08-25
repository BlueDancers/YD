<template>
  <p
    class="yp"
    :class="activechild == props.componentId ? 'active_child' : ''"
    :style="resetCss(props.cssModule)"
    :value="props.staticData.value"
    @mousedown="mousedown($event, props.componentId, props.parentId)"
  ></p>
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
.yp {
  position: relative;
}
</style>
