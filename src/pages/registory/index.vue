<template>
  <div class="yd_registory">
    <div class="yd_reg_name">注册成为用户</div>
    <el-input class="reg_input reg_name" v-model="username" placeholder="请输入用户名"></el-input>
    <el-input class="reg_input reg_password" v-model="password" placeholder="请输入密码" type="password">
    </el-input>
    <el-input
      class="reg_input reg_verify"
      v-model="verifyPassword"
      placeholder="请再次输入密码"
      type="password"
    >
    </el-input>
    <el-button class="reg_input reg_btn" @click="registory" type="primary" :disabled="!isDisabled"
      >注册</el-button
    >
    <el-button class="reg_input reg_login" @click="login">回到登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { auth, cloud } from '@/utils/request'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { isEmail } from '@/utils/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const verifyPassword = ref('') // 再次输入密码

const isDisabled = computed(() => {
  if (username.value == '') {
    return false
  }
  if (password.value == '') {
    return false
  }
  if (verifyPassword.value == '') {
    return false
  }
  return true
})

function registory() {
  if (!isEmail(username.value)) {
    ElMessage.error('邮箱格式错误')
    return false
  }
  if (password.value != verifyPassword.value) {
    ElMessage.error('两次输入的密码不一致')
    return false
  }
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

<style scoped lang="less">
.yd_registory {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .yd_reg_name {
    font-size: 28px;
    color: #3d3d3d;
    line-height: 39px;
  }
  .reg_name {
    margin-top: 30px;
  }
  .reg_password {
    margin-top: 16px;
  }
  .reg_verify {
    margin-top: 16px;
  }
  .reg_btn {
    margin-top: 16px;
  }
  .reg_login {
    margin-top: 16px;
    margin-left: 0;
  }
  .reg_input {
    width: 308px;
    height: 33px;
  }
}
</style>
