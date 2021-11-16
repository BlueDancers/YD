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
    <component-list v-if="selectedKeys == 0"></component-list>
    <component-set v-if="selectedKeys == 1"></component-set>
    <page-set v-if="selectedKeys == 2"></page-set>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { AppstoreAddOutlined, ProfileOutlined, LaptopOutlined, SettingOutlined } from '@ant-design/icons-vue'
import componentList from './left-components/componentList.vue'
import ComponentSet from './left-components/componentSet.vue'
import PageSet from './left-components/pageSet.vue'
export default defineComponent({
  components: {
    AppstoreAddOutlined,
    ProfileOutlined,
    LaptopOutlined,
    SettingOutlined,
    componentList,
    ComponentSet,
    PageSet,
  },
  setup() {
    const selectedKeys = ref(0)
    const leftMenu = [
      {
        text: '组件',
        icon: 'zujian',
      },
      {
        text: '组件树',
        icon: 'luoji',
      },
      {
        text: '设置',
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
    onMounted(() => {})
    return {
      leftMenu,
      toggleType,
      selectedKeys,
    }
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
.menu_icon {
  height: 100px;
}
</style>

<style>
.content_left .ant-menu.ant-menu-inline-collapsed {
  width: 60px;
}
.content_left .ant-menu {
  background-color: #f8f9fa;
}
</style>
