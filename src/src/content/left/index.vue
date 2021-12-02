<template>
  <div class="content_left">
    <div class="left_menu">
      <div
        v-for="(item, index) in leftMenu"
        :key="item.text"
        class="left_menu_item"
        :class="selectedKeys == index ? 'left_menu_item_active' : ''"
        @click="toggleType(index)"
      >
        <svg-icon class="svg_content" :color="selectedKeys == index ? '#fff' : '#262626'" :name="item.icon"></svg-icon>
        <span class="svg_text">{{ item.text }}</span>
      </div>
    </div>
    <!-- 页面管理数据 -->
    <page-list v-if="selectedKeys == 0"></page-list>
    <!-- 组件数据 -->
    <comp-list v-if="selectedKeys == 1"></comp-list>
    <!-- 项目设置 -->
    <!-- 模板市场 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import compList from './component/compList/index'
import pageList from './component/pageList/index'
export default defineComponent({
  components: {
    compList,
    pageList,
  },
  setup() {
    const selectedKeys = ref(0)
    const leftMenu = [
      {
        text: '页面管理',
        icon: 'luoji',
      },
      {
        text: '组件',
        icon: 'zujian',
      },
      {
        text: '项目设置',
        icon: 'shezhi',
      },
      {
        text: '模板',
        icon: 'fabuweimoban',
      },
    ]
    const toggleType = (index) => {
      selectedKeys.value = index
    }

    return { selectedKeys, leftMenu, toggleType }
  },
})
</script>

<style lang="scss" scoped>
.content_left {
  box-shadow: 0 2px 13px 0 rgb(0 0 0 / 10%);
  display: flex;
  background-color: #f8f9fa;
  width: 340px;
  height: calc(100vh - 50px);

  .left_menu {
    height: 100%;
    border-right: 1px solid #eee;
    .left_menu_item {
      width: 60px;
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .svg_content {
        width: 20px;
        height: 20px;
      }
      .svg_text {
        font-size: 13px;
      }
    }
    .left_menu_item_active {
      background-color: #2970f6;
      color: #fff;
    }
  }
}
</style>