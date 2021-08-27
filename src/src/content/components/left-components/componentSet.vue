<template>
  <a-tree :show-line="true" :show-icon="true" :default-expanded-keys="defaultExpandedKeys" @select="onSelect">
    <template #icon> <carry-out-outlined /></template>
    <a-tree-node key="0-0">
      <template #icon><carry-out-outlined /></template>
      <template #title>
        <span>页面组件</span>
      </template>
      <a-tree-node v-for="item in containerList" title="容器" :key="item.id">
        <template #icon><carry-out-outlined /></template>
        <a-tree-node v-for="child in item.components" title="组件" :key="child.id"> </a-tree-node>
        <!-- <a-dropdown :trigger="['contextmenu']">
          <template #overlay>
            <a-menu>
              <a-menu-item>删除</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown> -->
      </a-tree-node>
    </a-tree-node>
  </a-tree>
</template>

<script lang="ts">
import store from '@/store'
import { computed, defineComponent } from 'vue'
import { CarryOutOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    CarryOutOutlined,
  },
  setup() {
    let containerList = computed(() => store.state.core.containerList)
    let defaultExpandedKeys = containerList.value.reduce((data, item) => {
      return data.concat(item.id)
    }, [])
    const onSelect = () => {}
    return {
      defaultExpandedKeys,
      containerList,
      onSelect,
    }
  },
})
</script>

<style scoped></style>
