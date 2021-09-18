<template>
  <div class="fast_active_list">
    <a-tooltip placement="left">
      <template #title>
        <span>锁定画布:{{ moveLock ? '开启' : '未开启' }}</span>
      </template>
      <div class="active_item" :class="moveLock ? 'active' : 'unactive'" @click="toggleActive('moveLock')">
        <svg-icon class="item_svg" :color="moveLock ? '#fff' : '#262626'" name="suoding"></svg-icon>
      </div>
    </a-tooltip>
    <a-tooltip placement="left">
      <template #title>
        <span>撤销</span>
      </template>
      <div class="active_item unactive" @click="toggleActive('revoke')">
        <svg-icon class="item_svg" name="chexiao1"></svg-icon>
      </div>
    </a-tooltip>
    <a-tooltip placement="left">
      <template #title>
        <span>反撤销</span>
      </template>
      <div class="active_item unactive" @click="toggleActive('antiRevoke')">
        <svg-icon class="item_svg" name="huifu"></svg-icon>
      </div>
    </a-tooltip>
    <a-tooltip placement="left">
      <template #title>
        <span>复制</span>
      </template>
      <div class="active_item unactive" @click="toggleActive('copy')">
        <svg-icon class="item_svg" name="fuzhi"></svg-icon>
      </div>
    </a-tooltip>
    <a-tooltip placement="left">
      <template #title>
        <span>粘贴</span>
      </template>
      <div class="active_item unactive" @click="toggleActive('paste')">
        <svg-icon class="item_svg" name="niantie"></svg-icon>
      </div>
    </a-tooltip>
    <a-tooltip placement="left">
      <template #title>
        <span>删除</span>
      </template>
      <div class="active_item unactive" @click="toggleActive('delete')">
        <svg-icon class="item_svg" name="shanchu"></svg-icon>
      </div>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
export default defineComponent({
  components: {
    LockOutlined,
  },
  setup() {
    const store = useStore()
    const moveLock = computed(() => store.state.core.moveLock)
    const containerList = computed(() => store.state.core.containerList)
    const coordinate = computed(() => store.state.core.coordinate)
    const toggleActive = (type) => {
      if (type == 'moveLock') {
        store.commit('core/toggleMoveLock')
      }
      if (type == 'revoke') {
        message.info('开发中,敬请期待👨‍💻🧑‍💻👩‍💻')
      }
      if (type == 'antiRevoke') {
        message.info('开发中,敬请期待👨‍💻🧑‍💻👩‍💻')
      }
      if (type == 'copy') {
        store.commit('coreAssist/copyCurrentComp')
      }
      if (type == 'paste') {
        store.commit('coreAssist/pasteComp')
      }
      if (type == 'delete') {
        // 判断是否选中
        if (coordinate.value.length == 0) {
          message.warn('请选择需要删除的组件')
        } else if (coordinate.value.length == 1) {
          // 删除父类
          let pid = containerList.value[coordinate.value[0]].id
          store.commit('core/deleteParentCont', pid)
        } else if (coordinate.value.length == 2) {
          // 删除子类
          let cid = containerList.value[coordinate.value[0]].components[coordinate.value[1]].id
          store.commit('core/deleteChildComp', cid)
        }
      }
    }
    return {
      moveLock,
      toggleActive,
    }
  },
})
</script>

<style lang="scss" scoped>
.fast_active_list {
  height: 100%;
  width: 48px;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  .active_item {
    padding: 14px;
    .item_svg {
      width: 22px;
      height: 22px;
    }
  }
  .active {
    background-color: #2970f6;
  }
  .unactive {
    &:hover {
      background-color: #eee;
    }
  }
}
</style>
