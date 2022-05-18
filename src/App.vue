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
.mini_input {
  width: 100px !important;
}
.default_input {
  width: 140px !important;
}
.p_input {
  width: 180px !important;
}
</style>
