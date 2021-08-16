<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    // const app = cloudbase.init({
    //   env: 'mall-2gdgzk540aab98cd',
    // })
    // const auth = app.auth()
    // await auth.anonymousAuthProvider().signIn()
    // // 匿名登录成功检测登录状态isAnonymous字段为true
    // const loginState: any = await auth.getLoginState()
    // console.log(loginState.isAnonymousAuth) // true
    // const auth: any = app.auth({
    //   persistence: 'local',
    // })
    // await auth.anonymousAuthProvider().signIn()
   
    // auth.signInWithEmailAndPassword('2467230789@qq.com', '79715712242a').then((loginState: any) => {
    //   console.log(loginState)
    //   // 登录成功
    // })
    // await auth.currentUser.updatePassword('111111111aa').then(() => {
    //   // 设置密码成功
    // })
    // await auth.currentUser.updateEmail('2467230789@qq.com').then(() => {
    //   // 发送验证邮件成功
    // })
    // // 匿名登录成功检测登录状态isAnonymous字段为true
    // const loginState: any = await auth.getLoginState()
    // console.log(loginState.isAnonymousAuth) // true
    // app
    //   .callFunction({
    //     name: 'hello-word',
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
