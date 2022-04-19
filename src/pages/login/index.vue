<template>
  <div class="yd_login">
    <div class="yd_name">易动v3</div>
    <el-input class="login_input login_name" v-model="username" placeholder="请输入用户名"></el-input>
    <el-input class="login_input login_pass" v-model="password" placeholder="请输入密码" type="password">
    </el-input>
    <el-button class="login_input login_lgbtn" type="primary" @click="login" :disabled="!isDisabled"
      >登录</el-button
    >
    <el-button class="login_input login_resbtn" @click="registory">注册</el-button>
  </div>
</template>

<script setup lang="ts">
import { auth, cloud } from '@/utils/request'
import { ElMessage } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import { isEmail } from '@/utils/index'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const store = useUserStore()
const router = useRouter()
const username = ref('2467230789@qq.com')
const password = ref('79715712242aA')

onMounted(() => {
  const loginState = auth.hasLoginState()
  if (loginState) {
    router.replace({
      name: 'home',
    })
    console.log('当前已经登录')
  } else {
    console.log('当前未登录')
  }
})

//登录是否可用
const isDisabled = computed(() => {
  if (username.value == '') {
    return false
  }
  if (password.value == '') {
    return false
  }
  return true
})

function login() {
  if (!isEmail(username.value)) {
    ElMessage.error('邮箱格式错误')
    return false
  }
  auth
    .signInWithEmailAndPassword(username.value, password.value)
    .then((res) => {
      console.log(res)
      store.updateUserData().then(() => {
        router.replace({
          name: 'home',
        })
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

<style scoped lang="less">
.yd_login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .yd_name {
    font-size: 28px;
    color: #3d3d3d;
    line-height: 39px;
  }
  .login_name {
    margin-top: 43px;
  }
  .login_pass {
    margin-top: 15px;
  }
  .login_lgbtn {
    margin-top: 15px;
    color: #fff;
  }
  .login_resbtn {
    margin-left: 0px;
    margin-top: 15px;
    color: #409eff;
  }
  .login_input {
    width: 308px;
    height: 33px;
  }
}
</style>
