<template>
  <div class="content_left">
    <div class="left_menu">
      <a-menu mode="inline" :inline-collapsed="true" v-model:selectedKeys="selectedKeys" @click="toggleType">
        <a-menu-item key="1">
          <template #icon>
            <AppstoreAddOutlined />
          </template>
          <span>组件列表</span>
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <SettingOutlined />
          </template>
          <span>组件设置</span>
        </a-menu-item>
        <a-menu-item key="3">
          <template #icon>
            <ProfileOutlined />
          </template>
          <span>页面设置</span>
        </a-menu-item>
        <a-menu-item key="4">
          <template #icon>
            <LaptopOutlined />
          </template>
          <span>页面模板</span>
        </a-menu-item>
      </a-menu>
    </div>
    <component-list v-if="selectedKeys[0] == '1'"></component-list>
    <component-set v-if="selectedKeys[0] == '2'"></component-set>
    <page-set v-if="selectedKeys[0] == '3'"></page-set>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    const selectedKeys = ref(['1'])
    const toggleType = (event) => {
      selectedKeys.value = event.keyPath
    }
    return {
      toggleType,
      selectedKeys,
    }
  },
})
</script>

<style lang="scss" scoped>
.content_left {
  display: flex;
  background-color: #f8f9fa;
  width: 340px;
  height: calc(100vh - 50px);

  .left_menu {
    span {
    }
  }
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
