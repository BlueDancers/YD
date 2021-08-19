<template>
  <div class="page_header">
    <div class="header_left">logo</div>
    <div class="header_right">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          {{ userData.email }}
          <DownOutlined color="" />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <span>设置</span>
            </a-menu-item>
            <a-menu-item>
              <span>退出</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { computed, defineComponent } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    DownOutlined,
  },
  setup() {
    const userData = computed(() => store.state.app.userData)
    return { userData }
  },
})
</script>

<style lang="scss" scoped>
.page_header {
  color: #fff;
  background-color: #041527;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .header_left {
  }
  .header_right {
  }
}
</style>
