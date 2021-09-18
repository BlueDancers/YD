<template>
  <div class="login_con">
    <a-form class="login_form">
      <a-form-item>
        <div class="login_title">注册成为用户</div>
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
        <a-input placeholder="再次输入密码" v-model:value="userData.aspassword">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" class="login_btn" @click="gotoRegistory">注册</a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="login_btn" @click="gotoBack">返回登录</a-button>
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
import { $APP } from "@/PROVIDE_KEY";
import { isEmail } from '@/utils/index'
const router = useRouter()
const userData = reactive({
  username: '',
  password: '',
  aspassword: '',
})

let app: any = inject($APP)
function gotoRegistory() {
  if (userData.username == '') {
    message.error('请输入邮箱')
    return false
  }
  if (!isEmail(userData.username)) {
    message.error("邮箱格式错误")
    return false;
  }
  if (userData.password == '') {
    message.error('请输入密码')
    return false
  }
  if (userData.aspassword == '') {
    message.error('请再次密码')
    return false
  }
  const auth: any = app.auth({
    persistence: 'local',
  })
  auth
    .signUpWithEmailAndPassword(userData.username, userData.password)
    .then((res: any) => {
      message.success('邮箱验证码发送成功,请前往邮箱完成登录')
      // 发送验证邮件成功
    })
    .catch((err) => {
      message.error('注册失败,请检查邮箱信息')
    })
}
function gotoBack() {
  router.back()
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
