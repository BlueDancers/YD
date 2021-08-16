<template>
  <div class="login_con">
    <a-form class="login_form">
      <a-form-item>
        <div class="login_title">后台管理系统</div>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="请输入邮箱" v-model:value="userData.username">
          <template #prefix>
            <AppleFilled />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="请输入密码" v-model:value="userData.password">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button class="login_btn" type="primary" @click="gotoHome">登录</a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="login_btn" @click="gotoRegistory">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { AppleFilled, LockOutlined } from '@ant-design/icons-vue'
import { reactive } from '@vue/reactivity'
import { inject, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userData = reactive({
  username: '',
  password: '',
})

let app: any = inject('$app')

const auth: any = app.auth({
  persistence: 'local',
})
const loginState = app.auth().hasLoginState()
if (loginState) {
  router.replace({
    name: 'home',
  })
  console.log('当前已经登录')
} else {
  console.log('当前未登录')
}

function gotoRegistory() {
  router.push({
    name: 'registory',
  })
}
function gotoHome() {
  console.log(userData)
  if (userData.username == '') {
    message.error('请输入邮箱')
    return false
  }
  if (userData.password == '') {
    message.error('请输入密码')
    return false
  }

  auth
    .signInWithEmailAndPassword(userData.username, userData.password)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log('错误', err)
      message.error('账号密码存在错误')
    })
}
</script>

<style lang="scss" scoped>
.login_con {
  background-color: #f0f2f5;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  .login_form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    .login_title {
      font-size: 26px;
      color: #303a4a;
      text-align: center;
      font-weight: bold;
    }
    .login_btn {
      width: 400px;
    }
  }
}
</style>
