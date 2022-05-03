<template>
  <p :style="compResetCss(props.compData.cssModule)">{{ props.compData.staticData.text }}</p>
</template>

<script setup lang="ts">
import { compResetCss } from '@/utils'
const props = defineProps({
  compData: {},
})
</script>

<style scoped></style>
