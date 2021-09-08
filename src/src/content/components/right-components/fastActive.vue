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
export default defineComponent({
  components: {
    LockOutlined,
  },
  setup() {
    const store = useStore()
    const moveLock = computed(() => store.state.core.moveLock)
    const toggleActive = (type) => {
      if (type == 'moveLock') {
        store.commit('core/toggleMoveLock')
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
    background-color: #fff;
    &:hover {
      background-color: #eee;
    }
  }
}
</style>
