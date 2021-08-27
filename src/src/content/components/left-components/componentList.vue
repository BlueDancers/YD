<template>
  <div class="add_components">
    <div class="add_contains" @click="addCon">添加容器</div>
    <div class="add_div_list">
      <div @click="addComp('y-button')">按钮</div>
      <div @click="addComp('y-img')">图片</div>
      <div @click="addComp('y-input')">输入框</div>
      <div @click="addComp('y-p')">文字</div>
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
    return {
      addCon,
      addComp,
    }
  },
})
</script>

<style lang="scss" scoped>
.add_components {
  .add_contains {
  }
  .add_dev_list {
  }
}
</style>
