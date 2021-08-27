<template>
  <div class="yp" :style="{ ...resetCss(props.cssModule), border: 'none' }">
    <auxiliary-point v-if="activechild == props.componentId"></auxiliary-point>
    <p
      :style="{ ...resetCss(props.cssModule), top: '0px', left: '0px' }"
      @mousedown="mousedown($event, props.componentId, props.parentId)"
      :value="props.staticData.value"
    ></p>
  </div>
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

<style lang="scss" scoped>
.yp {
  position: relative;
}
</style>
