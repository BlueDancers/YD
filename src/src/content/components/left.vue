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
    <div class="add_components" v-if="selectedKeys[0] == '1'">
      <div class="add_contains" @click="addCon">添加容器</div>
      <div class="add_div_list">
        <div @click="addComp('y-button')">按钮</div>
        <div @click="addComp('y-img')">图片</div>
        <div @click="addComp('y-input')">输入框</div>
        <div @click="addComp('y-span')">文字</div>
      </div>
    </div>
    <div v-if="selectedKeys[0] == '2'">页面设置</div>
    <div v-if="selectedKeys[0] == '3'">页面模板</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AppstoreAddOutlined, ProfileOutlined, LaptopOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    AppstoreAddOutlined,
    ProfileOutlined,
    LaptopOutlined,
  },
  setup() {
    const store = useStore()
    const selectedKeys = ref(['1'])
    const toggleType = (event) => {
      selectedKeys.value = event.keyPath
    }
    const addCon = () => {
      store.commit('core/set_containerList')
    }
    const addComp = (name) => {
      console.log(name)
      // 添加组件到vuex
    }
    return {
      selectedKeys,
      toggleType,
      addCon,
      addComp
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
  .add_components {
    .add_contains {
    }
    .add_dev_list {
    }
  }
  div {
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
