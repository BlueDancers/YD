<template>
  <svg class="icon" aria-hidden="true" :style="{ color: color }">
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
    color: {
      type: String,
      default: '#ffffff',
    },
  },
})
</script>

<style lang="scss" scoped></style>
