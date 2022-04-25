<template>
  <div :style="compResetCss(props.compData.cssModule)" v-html="props.compData.staticData.html"></div>
</template>

<script setup lang="ts">
import { compResetCss } from '@/utils'
const props = defineProps({
  compData: {},
})
</script>

<style scoped></style>
