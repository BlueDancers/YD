<template>
  <div class="page_data">
    <el-form label-width="80px">
      <el-form-item label="网页地址:">
        <el-input
          :value="main.pageRouter"
          disabled
          class="base_input"
          placeholder="请填写网页地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="网页名称:">
        <el-input
          :maxlength="14"
          show-word-limit
          v-model="main.pageTitle"
          class="base_input"
          placeholder="请填写网页名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="背景颜色:">
        <el-color-picker v-model="main.backColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="页面高度:">
        <el-input v-model="main.pageHeight" class="base_input" placeholder="请填写页面高度"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useMain } from '@/store/main'

const main = useMain()
</script>

<style lang="less" scoped>
.page_data {
  margin-top: 20px;
  .base_input {
    width: 180px;
  }
}
</style>
