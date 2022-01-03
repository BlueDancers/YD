<template>
  <div class="page_header">
    <div class="header_left" @click="gotoHome">
      <img
        class="left_img"
        src="https://6d61-mall-2gdgzk540aab98cd-1257324019.tcb.qcloud.la/base/logo.png?sign=69a6a365519b1e9c658ad876aa6997a1&t=1641198047"
      />
    </div>
    <div class="header_right">
      <a-dropdown :trigger="['click']">
        <div class="dropdown_link">
          {{ userData.email }}
          <DownOutlined />
        </div>
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
import { useAppStore } from '@/stores/app'
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
    function gotoHome() {
      route.replace({
        name: 'home',
      })
    }
    return { userData, loginOut, gotoHome }
  },
})
</script>

<style lang="scss" scoped>
.page_header {
  position: fixed;
  z-index: 1000;
  top: 0px;
  left: 0px;
  right: 0px;
  color: #fff;
  background-color: #041527;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .header_left {
    cursor: pointer;
    .left_img {
      width: 35px;
      height: 35px;
    }
  }
  .header_right {
    .dropdown_link {
      color: #3a71ee;
    }
  }
}
</style>
