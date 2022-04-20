<template>
  <div class="main_left">
    <div class="main_left_menu">
      <div
        class="left_menu_item"
        :class="activeMenu == index ? 'item_active' : ''"
        v-for="(item, index) in menu"
        :key="item.icon"
        @click="changeItem(index)"
      >
        <svg-icon class="item_icon" :name="item.icon"></svg-icon>
        <span class="item_text">{{ item.text }}</span>
      </div>
    </div>
    <div class="main_left_cont"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menu = [
  {
    icon: 'yuanshuju',
    text: '可用组件',
  },
  {
    icon: 'fuhao-tuceng',
    text: '组件层级',
  },
  {
    icon: 'moban',
    text: '组件市场',
  },
]

const activeMenu = ref(1)

function changeItem(index) {
  activeMenu.value = index
}
</script>

<style lang="less" scoped>
.main_left {
  display: flex;
  .main_left_menu {
    height: calc(100vh - 50px);
    width: 65px;
    background-color: #f8f9fa;
    border-right: 1px solid #e2e2e2;
    .left_menu_item {
      cursor: pointer;
      height: 65px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .item_icon {
        width: 26px;
        height: 26px;
      }
      .item_text {
        margin-top: 8px;
        font-size: 13px;
        fill: #3d3d3d;
      }
    }
    .item_active {
      background-color: #409eff;
      .item_icon {
        fill: #fff;
      }
      .item_text {
        color: #fff;
      }
    }
  }
  .main_left_cont {
    height: calc(100vh - 50px);
    width: 347px;
    background-color: #fff;
  }
}
</style>
