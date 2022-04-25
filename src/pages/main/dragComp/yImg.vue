<template>
  <img :style="compResetCss(props.compData.cssModule)" :src="props.compData.staticData.imglUrl" />
</template>

<script setup lang="ts">
import { compResetCss } from '@/utils'
const props = defineProps({
  compData: {},
})
</script>

<style scoped></style>
