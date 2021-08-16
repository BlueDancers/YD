<template>
  <div>
    <div v-if="userData">
      <p>登录成功</p>
      {{ userData.email }}
    </div>
    <div v-else>未登录</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
const store = useStore()
const userData = computed(() => store.state.app.userData)
</script>

<style scoped></style>
