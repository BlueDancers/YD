<template>
  <div v-for="item in line.showX" :key="item" class="x_line" :style="{ top: item + 'px' }" />
  <div v-for="item in line.showY" :key="item" class="y_line" :style="{ left: item + 'px' }" />
</template>

<script setup lang="ts">
import { useLine } from '@/store/line'
// 存在多条XY轴
const line = useLine()
</script>

<style lang="less" scoped>
.x_line {
  position: absolute;
  width: 100%;
  z-index: 100;
  height: 1px;
  background-color: #ff0000;
  left: 0px;
}
.y_line {
  position: absolute;
  height: 100%;
  z-index: 100;
  width: 1px;
  background-color: #ff0000;
  top: 0px;
}
</style>
