<template>
  <div class="search_page">
    <div class="search_title">页面名称:</div>
    <el-input class="search_input" v-model="searchValue" placeholder="请输入页面名称" />
    <el-button type="primary" class="search_btn" @click="subSearch">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['searchVal'])

const searchValue = ref('')

function subSearch() {
  emit('searchVal', searchValue.value)
  searchValue.value = ''
}
</script>

<style lang="less" scoped>
.search_page {
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .search_title {
    margin-left: 22px;
    font-size: 12px;
    color: #3d3d3d;
    line-height: 20px;
  }
  .search_input {
    border-radius: 4px;
    margin-left: 7px;
    width: 200px;
  }
  .search_btn {
    margin-left: 13px;
  }
}
</style>
