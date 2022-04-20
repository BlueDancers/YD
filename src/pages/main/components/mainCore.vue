<template>
  <div class="main_core">
    <div class="core_temp" ref="coreRef">1</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useListen from '../fun/listen'

onMounted(() => {
  useListen(coreRef.value)
})

const coreRef = ref(null)
</script>

<style lang="less" scoped>
.main_core {
  flex: 1;
  display: flex;
  margin-top: 40px;
  justify-content: center;
  .core_temp {
    background-color: #fff;
    width: 325px;
    height: 650px;
    box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.2);
  }
}
</style>
