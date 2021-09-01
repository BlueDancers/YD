<template>
  <div class="login_con">
    <a-form class="login_form" ref="formRef" :rules="rules" :model="userData">
      <a-form-item>
        <div class="login_title">后台管理系统</div>
      </a-form-item>
      <a-form-item name="username">
        <a-input placeholder="请输入邮箱" v-model:value="userData.username">
          <template #prefix>
            <AppleFilled />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
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

<script lang="ts">
import { AppleFilled, LockOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from '@vue/reactivity'
import { defineComponent, inject, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { $APP } from "@/PROVIDE_KEY";
import { isEmail } from '@/utils/index'
export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const formRef = ref()
    const userData = reactive({
      username: '2467230789@qq.com',
      password: '79715712242a',
    })

    const rules = {
      username: [{
        required: true, message: '请输入邮箱'
        , trigger: 'blur'
      },
      {
        message: '邮箱格式错误', validator: (rule, value) =>
          isEmail(value) ? Promise.resolve() : Promise.reject()
        , trigger: 'change'
      }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    }

    let app: any = inject($APP)

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
    const gotoHome = () => {
      formRef.value
        .validate()
        .then(() => {
          auth
            .signInWithEmailAndPassword(userData.username, userData.password)
            .then((res) => {
              localStorage.setItem('loginStatus', 'true')
              store.dispatch('app/getUserData', app)
              router.replace({
                name: 'home',
              })
            })
            .catch((err) => {
              console.log('错误', err)
              message.error('账号密码存在错误')
            })
        })
        .catch((error) => {
          message.error(error.errorFields[0].errors[0])
          console.log('error', error)
        })
    }
    return {
      formRef,
      userData,
      rules,
      gotoRegistory,
      gotoHome,
    }
  },
})
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
