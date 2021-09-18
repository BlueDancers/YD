<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cloud } from './modules/request'

export default defineComponent({
  setup() {
    var auth: any = cloud.auth({
      persistence: 'local',
    })
    onMounted(async () => {
      const loginState = await auth.getLoginState()
      if (!loginState || !loginState.isAnonymousAuth) {
        await auth.anonymousAuthProvider().signIn()
      }
    })
  },
})
</script>

<style>
html,body {
  padding: 0px;
  margin: 0px;
}
</style>
