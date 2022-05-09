<template>
  <div
    class="coordinates"
    :style="{
      top: `${mainUtils.initCoordinates[1]}px`,
      left: `${mainUtils.initCoordinates[0]}px`,
      width: `${mainUtils.endCoordinates[0]}px`,
      height: `${mainUtils.endCoordinates[1]}px`,
    }"
  ></div>
</template>

<script setup lang="ts">
import { useMainUtils } from '@/store/mainUtils'

const mainUtils = useMainUtils()
</script>

<style lang="less" scoped>
.coordinates {
  position: absolute;
  z-index: 100;
  border: 3px solid #000;
}
</style>
