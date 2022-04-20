<template>
  <div class="page_layout">
    <div class="layout_left">
      <el-button class="page_aside_btn" type="primary" @click="openCreatepage"> 创建页面 </el-button>
      <el-menu default-active="1" class="page_menu">
        <el-menu-item index="1">
          <template #title>页面管理</template>
        </el-menu-item>
        <el-menu-item index="2">
          <template #title>组件管理</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="layout_right">
      <div class="right_header">
        <search-page @searchVal="searchVal"></search-page>
      </div>
      <div class="right_container">
        <main-page :mainList="mainList" @init="init"></main-page>
      </div>
    </div>
    <create-page ref="establishPage" @pageInit="init"></create-page>
  </div>
</template>

<script setup lang="ts">
import { useCloud } from '@/utils/request'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import createPage from './components/createPage.vue'
import mainPage from './components/mainPage.vue'
import searchPage from './components/searchPage.vue'
import { parseTime } from '../../utils/index'

const route = useRoute()

const organizeId = ref('')
const mainList = ref<any[]>([]) //页面数组列表
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
      res.data.forEach((item) => {
        item.createTime = parseTime(Number(item.createTime), { cFormat: '{y}-{m}-{d}' })
      })
      mainList.value = res.data
      console.log(mainList.value)
    })
}

//打开创建页面组件
function openCreatepage() {
  establishPage.value.open()
}

//搜索事件
function searchVal(e) {
  console.log(e)
}
</script>

<style lang="less" scoped>
.page_layout {
  display: flex;
  height: calc(100vh - 50px);
  .layout_left {
    padding: 0 12px;
    box-sizing: border-box;
    width: 240px;
    min-height: 850px;
    height: 100%;
    background: #ffffff;
    .page_aside_btn {
      box-sizing: border-box;
      width: 146px;
      margin: 20px;
    }
    .page_menu {
      border: none;
    }
  }
  .layout_right {
    .right_header {
      min-width: 600px;
      margin: 7px 36px 0 7px;
      width: calc(100vw - 276px);
      height: 56px;
      background: #ffffff;
    }
    .right_container {
      margin: 7px 36px 0 7px;
      min-width: 600px;
      width: calc(100vw - 276px);
      height: 768px;
      background: #ffffff;
    }
  }
}
</style>
