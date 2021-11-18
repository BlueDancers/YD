<template>
  <div class="page_header">
    <div class="header_left">
      <img class="left_img" src="@/assets/logo.png" />
    </div>
    <div class="header_right">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          {{ userData.email }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <span>设置</span>
            </a-menu-item>
            <a-menu-item @click="loginOut">
              <span>退出</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useAppStore } from "@/stores/app";
export default defineComponent({
  components: {
    DownOutlined,
  },
  setup() {
    const route = useRouter()
    const store = useAppStore()
    const userData = store.userData
    function loginOut() {
      localStorage.clear()
      route.replace({
        name: 'login',
      })
    }
    return { userData, loginOut }
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
    .left_img {
      width: 35px;
      height: 35px;
    }
  }
  .header_right {
  }
}
</style>
