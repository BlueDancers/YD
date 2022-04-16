<template>
  <div>
    <el-input v-model="username"></el-input>
    <el-input v-model="password"></el-input>
    <el-button @click="login">登录</el-button>
    <el-button @click="registory">注册</el-button>
  </div>
</template>

<script setup lang="ts">
import { cloud } from '@/utils/request'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const store = useUserStore()
const router = useRouter()
const username = ref('')
const password = ref('')

onMounted(() => {
  const loginState = (cloud as any).auth().hasLoginState()

  if (loginState) {
    router.replace({
      name: 'home',
    })
    console.log('当前已经登录')
  } else {
    console.log('当前未登录')
  }
})

function login() {
  const auth = cloud.auth({
    persistence: 'local',
  })
  auth
    .signInWithEmailAndPassword(username.value, password.value)
    .then((res) => {
      console.log(res)

      localStorage.setItem('loginStatus', 'true')
      store.updateUserData(cloud)
      router.replace({
        name: 'home',
      })
    })
    .catch((err) => {
      ElMessage(err.message)
    })
}

function registory() {
  router.push({
    name: 'registory',
  })
}
</script>

<style scoped lang="less"></style>
