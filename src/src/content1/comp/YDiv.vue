<template>
  <div :style="props.cssModule" @mousedown="mousedown($event, props.componentId, props.parentId)"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { compProps } from './common/config'
import useCommonFun from './common/commonFun'
import { useMouseFun } from './common/mouseFun'
import auxiliaryPoint from '@/components/auxiliaryPoint.vue'
export default defineComponent({
  components: {
    auxiliaryPoint,
  },
  props: compProps,
  setup(props) {
    const common = useCommonFun(props)
    const mouse = useMouseFun()
    return { ...common, ...mouse }
  },
})
</script>

<style lang="scss" scoped></style>
