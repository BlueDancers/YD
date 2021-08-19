<template>
  <div class="content_left">
    <div>
      <a-menu mode="inline" :inline-collapsed="true" v-model:selectedKeys="selectedKeys" @click="toggleType">
        <a-menu-item key="1">
          <template #icon>
            <AppstoreAddOutlined />
          </template>
          <span>组件列表</span>
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <ProfileOutlined />
          </template>
          <span>页面设置</span>
        </a-menu-item>
        <a-menu-item key="3">
          <template #icon>
            <LaptopOutlined />
          </template>
          <span>页面模板</span>
        </a-menu-item>
      </a-menu>
    </div>
    <div v-if="selectedKeys[0] == '1'">组件列表</div>
    <div v-if="selectedKeys[0] == '2'">页面设置</div>
    <div v-if="selectedKeys[0] == '3'">页面模板</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AppstoreAddOutlined, ProfileOutlined, LaptopOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    AppstoreAddOutlined,
    ProfileOutlined,
    LaptopOutlined,
  },
  setup() {
    const selectedKeys = ref(['1'])
    const toggleType = (event) => {
      selectedKeys.value = event.keyPath
    }
    return {
      selectedKeys,
      toggleType,
    }
  },
})
</script>

<style lang="scss">
.content_left {
  .ant-menu.ant-menu-inline-collapsed {
    width: 60px;
  }
  .ant-menu {
    background-color: #f8f9fa;
  }
}
</style>

<style lang="scss" scoped>
.content_left {
  display: flex;
  background-color: #f8f9fa;
  width: 340px;
  height: calc(100vh - 50px);
}
</style>
