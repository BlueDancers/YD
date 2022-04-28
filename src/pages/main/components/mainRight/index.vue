<template>
  <div class="main_right">
    <left-menu></left-menu>
    <div class="right_cont">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="样式" :name="1">
          <style-data v-if="main.acIdx.length == 1"></style-data>
        </el-tab-pane>
        <el-tab-pane label="配置" :name="2">
          <config-data v-if="main.acIdx.length == 1"></config-data>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMain } from '@/store/main'
import { reactive, ref } from 'vue'
import LeftMenu from './components/leftMenu.vue'
import StyleData from './components/styleData.vue'
import ConfigData from './components/configData.vue'
const main = useMain()

const activeName = ref(1)

function handleClick() {}
</script>

<style lang="less" scoped>
.main_right {
  display: flex;

  .right_cont {
    height: calc(100vh - 50px);
    width: 347px;
    background-color: #fff;
  }
}
</style>
