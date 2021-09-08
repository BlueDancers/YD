<template>
  <div class="add_components">
    <div class="add_contains" @click="addCon">
      <svg-icon class="contains_svg" name="bujurongqi"></svg-icon>
      <span class="contains_text">添加容器</span>
    </div>
    <div class="add_div_list">
      <div class="list_item" v-for="item in compList" :key="item.name" @click="addComp(item.name)">
        <svg-icon class="item_svg" :name="item.icon"></svg-icon>
        <span class="item_text">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const addCon = () => {
      store.commit('core/set_containerList')
    }
    const addComp = (name) => {
      store.commit('core/add_components', name)
      // 添加组件到vuex
    }
    const compList = ref([
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
      {
        icon: 'wenben',
        name: 'y-input',
        title: '输入框',
      },
    ])
    return {
      addCon,
      addComp,
      compList,
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
  .add_contains {
    cursor: pointer;
    margin-top: 20px;
    border: 1px solid #eee;
    border-radius: 10px;
    background-color: #fff;
    width: 250px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover {
      border: 1px solid #3a71ee;
    }
    .contains_svg {
      width: 40px;
      height: 40px;
    }
    .contains_text {
      font-size: 14px;
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
      border: 1px solid #eee;
      border-radius: 10px;
      background-color: #fff;
      width: 80px;
      height: 80px;
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
