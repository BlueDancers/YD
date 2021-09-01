<template>
  <div class="fast_active_list">
    <template v-for="item in fastActive" :key="item.icon">
      <a-popover placement="left">
        <template #content>
          <p>状态:{{ item.status ? '开启' : '未开启' }}</p>
        </template>
        <template #title>
          <span>锁定画布</span>
        </template>
        <component
          class="active_item"
          :class="item.status ? 'type_active' : ''"
          @click="toggleActive(item.type)"
          :is="item.icon"
        ></component>
      </a-popover>
    </template>
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
    const fastActive = ref([
      {
        icon: 'LockOutlined',
        type: 'moveLock',
        status: computed(() => store.state.core.moveLock),
      },
    ])
    const toggleActive = (type) => {
      console.log('点击事件', type)

      if (type == 'moveLock') {
        store.commit('core/toggleMoveLock')
      }
    }
    return {
      fastActive,
      toggleActive,
    }
  },
})
</script>

<style lang="scss" scoped>
.fast_active_list {
  height: 100%;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  .active_item {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: '130%';
    &:hover {
      // background-color: #2970f6;
    }
  }
  .type_active {
    background-color: #2970f6;
    color: #ffffff;
  }
}
</style>
