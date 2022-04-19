<template>
  <div class="page_layout">
    <el-container>
      <el-aside class="page_aside">
        <el-button class="page_aside_btn" type="primary" @click="openCreatepage"> 创建页面 </el-button>
        <el-menu :default-openeds="['1']" default-active="1-1" class="page_menu">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>内容管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">页面</el-menu-item>
              <el-menu-item index="1-2">素材</el-menu-item>
              <el-menu-item index="1-3">模板</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="page_cont">
        <el-header class="page_header">Header</el-header>
        <el-main class="page_main">
          <main-page></main-page>
        </el-main>
      </el-container>
    </el-container>
    <create-page ref="establishPage" @pageInit="init"></create-page>
  </div>
</template>

<script setup lang="ts">
import { useCloud } from '@/utils/request'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElContainer } from 'element-plus'
import createPage from './components/createPage.vue'
import mainPage from './components/mainPage.vue'

const route = useRoute()

const organizeId = ref('')
const establishPage = ref() //ref 创建页面参数

onMounted(() => {
  init()
})

function init() {
  organizeId.value = String(route.params.groupId)
  useCloud('pageList')
    .where({
      organizeId: route.params.groupId,
    })
    .get()
    .then((res) => {
      console.log(res)
    })
}

//打开创建页面组件
function openCreatepage() {
  establishPage.value.open()
}
</script>

<style lang="less" scoped>
.page_layout {
  display: flex;
  .page_aside {
    padding: 0 12px;
    box-sizing: border-box;
    width: 186px;
    min-height: calc(100vh - 50px);
    background: #ffffff;
    .page_aside_btn {
      margin-top: 20px;
      width: 100%;
    }
    .page_menu {
      margin-top: 20px;
      border: none;
    }
  }
  .page_header {
    margin: 7px 36px 0 7px;
    height: 56px;
    background: #ffffff;
  }
  .page_main {
    margin: 7px 36px 0 7px;
    height: 768px;
    flex: none;
    background: #ffffff;
  }
}
</style>
