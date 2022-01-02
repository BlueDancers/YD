<template>
  <div class="content_left">
    <div class="left_menu">
      <div
        v-for="item in leftMenu"
        :key="item.text"
        class="left_menu_item"
        :class="selectedKeys == item.key ? 'left_menu_item_active' : ''"
        @click="toggleType(item.key)"
      >
        <svg-icon
          class="svg_content"
          :color="selectedKeys == item.key ? '#fff' : '#262626'"
          :name="item.icon"
        ></svg-icon>
        <span class="svg_text">{{ item.text }}</span>
      </div>
    </div>
    <!-- 可用组件 -->
    <comp-list v-if="selectedKeys == 0"></comp-list>
    <!-- 页面管理数据 -->
    <page-list v-if="selectedKeys == 1"></page-list>
    <!-- 组件层级 -->
    <page-comp-list v-if="selectedKeys == 2"></page-comp-list>
    <!-- 项目设置 -->
    <object-data v-if="selectedKeys == 3"></object-data>
    <!-- 插件市场 -->
    <plugin-list v-if="selectedKeys == 4"></plugin-list>
    <!-- 模板市场 -->
    <template-list v-if="selectedKeys == 5"></template-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { ref } from 'vue'
import compList from './component/compList/index'
import pageList from './component/pageList/index'
import objectData from './component/objectData/index'
import pageCompList from './component/pagecompList/index'
import pluginList from './component/pluginList/index'
import templateList from './component/templateList/index'
import { useBoardStore } from '@/stores/board'
export default defineComponent({
  components: {
    compList,
    pageList,
    objectData,
    pageCompList,
    pluginList,
    templateList,
  },
  setup() {
    let board = useBoardStore()
    watch(
      () => board.pageDetail.pageType,
      () => {
        if (board.pageDetail.pageType == 2) {
          leftMenu.splice(1, 0, {
            key: 1,
            text: '页面管理',
            icon: 'luoji',
          })
          selectedKeys.value = 1
        }
      }
    )
    const selectedKeys = ref(0)
    const leftMenu = reactive([
      {
        key: 0,
        text: '可用组件',
        icon: 'zujian',
      },
      {
        key: 2,
        text: '组件层级',
        icon: 'shezhi',
      },
      {
        key: 3,
        text: '项目设置',
        icon: 'shezhi',
      },
      {
        key: 4,
        text: '组件市场',
        icon: 'fabuweimoban',
      },
      {
        key: 5,
        text: '模板市场',
        icon: 'fabuweimoban',
      },
    ])
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