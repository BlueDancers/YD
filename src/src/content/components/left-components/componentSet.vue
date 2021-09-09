<template>
  <a-tree
    class="components_set"
    :show-line="true"
    :show-icon="true"
    :tree-data="containerList"
    v-model:expandedKeys="defaultExpandedKeys"
    :replaceFields="{ children: 'components', title: 'id', key: 'id' }"
    :selectedKeys="activechild ? [activechild] : [activeCont]"
    @select="onSelect"
  >
    <template #title="{ id, components, name,staticData }">
      <a-dropdown :trigger="['contextmenu']">
        <span v-if="components">容器</span>
        <span v-else>{{ name.split('-')[1] }}</span>
        <template #overlay>
          <a-menu @click="({ key }) => onContextMenuClick(id, staticData, key)">
            <a-menu-item key="delete">删除</a-menu-item>
            <a-menu-item key="zIndexUp">置于顶部</a-menu-item>
            <a-menu-item key="zIndexDown">置于底部</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
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
    let activeCont = computed(() => store.state.core.activeCont)
    let activechild = computed(() => store.state.core.activechild)

    let defaultExpandedKeys = containerList.value.reduce((data, item) => {
      return data.concat(item.id)
    }, [])
    const onSelect = (a, b) => {
      let pos: string[] = b.node.pos.split('-')
      // 点击父级
      if (pos.length == 2) {
        store.commit('core/toggleActive', containerList.value[pos[1]].id)
      }
      // 点击子类
      if (pos.length == 3) {
        store.commit('core/set_activechild', {
          pid: containerList.value[pos[1]].id,
          cid: containerList.value[pos[1]].components[pos[2]].id,
        })
      }
    }
    const onContextMenuClick = (id, staticData, key) => {
      if (key == 'delete') {
        // 父级没有 staticData
        if (staticData) {
          store.commit('core/deleteChildComp', id)
        } else {
          console.log('shanchu',id);
          
          store.commit('core/deleteParentCont', id)
        }
      } else if (key == 'zIndexUp') {
      } else if (key == 'zIndexDown') {
      }
    }

    return {
      defaultExpandedKeys,
      containerList,
      onSelect,
      onContextMenuClick,
      activechild,
      activeCont,
    }
  },
})
</script>

<style lang="scss" scoped>
.components_set {
  height: 100%;
  overflow-y: scroll;
}
</style>
