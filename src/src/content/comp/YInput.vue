<template>
  <input
    class="yinput"
    :class="activechild == props.componentId ? 'aaa' : ''"
    :style="resetCss(props.cssModule)"
    @click="activeCompId"
    :type="props.staticData.type"
    :placeholder="props.staticData.placeholder"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useCommonFun from './common/commonFun'
import { compProps } from './common/config'
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
