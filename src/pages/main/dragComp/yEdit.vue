<template>
  <div
    :style="{ ...compResetCss(props.compData.cssModule), 'word-wrap': 'break-word' }"
    v-html="props.compData.staticData.html"
  ></div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { compResetCss } from '@/utils'
const props = defineProps({
  compData: {},
})
</script>

<style scoped></style>
