<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="less" scoped>
.icon {
  display: block;
  width: 26px;
  height: 26px;
  overflow: hidden;
}
</style>
