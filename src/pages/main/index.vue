<template>
  <div class="main_cont">
    <main-header></main-header>
    <div class="main_board">
      <main-left></main-left>
      <main-core></main-core>
      <main-right></main-right>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMain } from '@/store/main'

import mainHeader from './components/mainHeader.vue'
import mainLeft from './components/mainLeft/index.vue'
import mainRight from './components/mainRight.vue'
import mainCore from './components/mainCore/index.vue'

const router = useRouter()
const route = useRoute()
const main = useMain()

onMounted(() => {
  main.pageId = String(route.params.id)
  main.getTempData()
})
</script>

<style lang="less" scoped>
.main_cont {
  .main_board {
    display: flex;
  }
}
</style>

<style lang="less">
.main_cont {
  .collapse_title {
    margin-left: 10px;
    font-weight: bold;
  }
  .el-collapse-item__content {
    padding: 0px 10px;
  }
}
</style>
