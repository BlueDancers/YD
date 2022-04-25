<template>
  <div :style="compResetCss(props.compData.cssModule)"></div>
</template>

<script setup lang="ts">
import { compResetCss } from '@/utils'
const props = defineProps({
  compData: {},
})
</script>

<style scoped></style>
