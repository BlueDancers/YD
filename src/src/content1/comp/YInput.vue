<template>
  <input
    :style="props.cssModule"
    @mousedown="mousedown($event, props.componentId, props.parentId)"
    :type="props.staticData.type"
    :placeholder="props.staticData.placeholder"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useCommonFun from './common/commonFun'
import { compProps } from './common/config'
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
