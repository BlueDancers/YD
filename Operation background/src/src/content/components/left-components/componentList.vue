<template>
  <div class="add_components">
    <a-collapse v-model:activeKey="activeKey" :bordered="false">
      <a-collapse-panel :key="1" header="容器列表">
        <div class="contains">
          <div class="add_contains" @click="addCon('default')">
            <svg-icon class="contains_svg" name="kuaisubuju"></svg-icon>
            <span class="contains_text">通用容器</span>
          </div>
          <div class="add_contains" @click="addCon('flex')">
            <svg-icon class="contains_svg" name="bianzu"></svg-icon>
            <span class="contains_text">flex容器</span>
          </div>
          <div class="add_contains" @click="addCon('grid')">
            <svg-icon class="contains_svg" name="grid-wangge"></svg-icon>
            <span class="contains_text">网格容器</span>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel :key="2" header="组件列表">
        <div class="add_div_list">
          <div class="list_item" v-for="item in compList" :key="item.name" @click="addComp(item.name)">
            <svg-icon class="item_svg" :name="item.icon"></svg-icon>
            <span class="item_text">{{ item.title }}</span>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const addCon = (name) => {
      store.commit('core/set_containerList', name)
    }
    const addComp = (name) => {
      store.commit('core/add_components', name)
      // 添加组件到vuex
    }
    const activeKey = ref(1)
    const compList = ref([
      {
        icon: 'wenben',
        name: 'y-div',
        title: '模块',
      },
      {
        icon: 'button',
        name: 'y-button',
        title: '按钮',
      },
      {
        icon: 'tupian',
        name: 'y-img',
        title: '图片',
      },
      {
        icon: 'wenben',
        name: 'y-p',
        title: '文字',
      },
      // {
      //   icon: 'button',
      //   name: 'y-grid',
      //   title: '网格组件',
      // },
    ])
    return {
      addCon,
      addComp,
      compList,
      activeKey,
    }
  },
})
</script>

<style lang="scss" scoped>
.add_components {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .ant-collapse {
    width: 100%;
  }
  .contains {
    display: grid;
    grid-template-columns: 117px 117px;
    grid-template-rows: auto;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    .add_contains {
      cursor: pointer;
      border: 1px solid rgb(206, 206, 206);
      border-radius: 10px;
      background-color: #fff;
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:hover {
        border: 1px solid #3a71ee;
      }
      .contains_svg {
        width: 26px;
        height: 26px;
      }
      .contains_text {
        margin-top: 4px;
        font-size: 14px;
      }
    }
  }

  .add_div_list {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 5px; // 行与行之间的间距
    grid-column-gap: 5px; // 列与列之间的间距
    .list_item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid rgb(206, 206, 206);
      border-radius: 10px;
      background-color: #fff;
      width: 74px;
      height: 74px;
      &:hover {
        border: 1px solid #3a71ee;
      }
      .item_svg {
        width: 30px;
        height: 30px;
      }
      .item_text {
        font-size: 12px;
      }
    }
  }
}
</style>
