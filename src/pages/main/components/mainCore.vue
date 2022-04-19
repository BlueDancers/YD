<template>
  <div class="main_core">
    <div class="core_temp" ref="coreRef">1</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useListen from '../fun/listen'

onMounted(() => {
  console.log(coreRef.value)

  useListen(coreRef.value)
})

const coreRef = ref(null)
</script>

<style lang="less" scoped>
.main_core {
  .core_temp {
    background-color: #fff;
    width: 325px;
    height: 650px;
  }
}
</style>
