<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

onMounted(() => {})
</script>

<style>
html {
  background-color: #f7f8fa;
}
.flex_center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* @font-face {
  font-family: mFont;
  src: url('../src/assets/DIN-MEDIUM.OTF');
} */
</style>
