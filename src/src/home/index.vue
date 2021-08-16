<template>
  <div>
    <p>登录成功</p>
    <div>
      {{ userData.userData.email }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive } from '@vue/runtime-core'

let userData = reactive({
  userData: {},
})

let app: any = inject('$app')
app
  .auth()
  .getCurrenUser()
  .then((user) => {
    userData.userData = user
  })
</script>

<style scoped></style>
