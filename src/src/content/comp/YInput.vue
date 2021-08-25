<template>
  <input
    class="yinput"
    :class="activechild == props.componentId ? 'aaa' : ''"
    :style="resetCss(props.cssModule)"
    :type="props.staticData.type"
    :placeholder="props.staticData.placeholder"
    @mousedown="mousedown($event, props.componentId, props.parentId)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useCommonFun from './common/commonFun'
import { compProps } from './common/config'
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
