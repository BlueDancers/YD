<template>
  <div>
    <el-input v-model="username" placeholder="请输入用户名"></el-input>
    <el-input v-model="password" placeholder="请输入密码"></el-input>
    <el-input v-model="verifyPassword" placeholder="请再次输入密码"></el-input>
    <el-button @click="registory">注册</el-button>
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { auth, cloud } from '@/utils/request'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const verifyPassword = ref('') // 再次输入密码

function registory() {
  auth
    .signUpWithEmailAndPassword(username.value, password.value)
    .then((res: any) => {
      console.log(res)

      ElMessage.success('邮箱验证码发送成功,请前往邮箱完成注册')
      // 发送验证邮件成功
    })
    .catch((err) => {
      ElMessage.error(err.message)
    })
}
function login() {
  router.push({
    name: 'login',
  })
}
</script>

<style scoped lang="less"></style>
