<template>
  <div class="yd_header">
    <div class="header_left" @click="gotoHome">易动3</div>
    <div class="header_right">
      <el-dropdown trigger="click">
        <span class="right_text"> {{ userData.email }} </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { getStorageSync, removeStorageSync } from '@/modules/storage'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let userData = getStorageSync('userData')

onMounted(() => {})

function logout() {
  removeStorageSync('userData')
  removeStorageSync('loginStatus')
  router.replace({
    path: 'login',
  })
}

function gotoHome() {
  router.push({
    name: 'home',
  })
}
</script>

<style lang="less" scoped>
.yd_header {
  color: #fff;
  background-color: #041527;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .header_left {
    cursor: pointer;
  }
  .header_right {
    .right_text {
      color: #fff;
    }
  }
}
</style>
