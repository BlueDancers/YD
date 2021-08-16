<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const store = useStore()
    store.dispatch('app/getUserData')
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
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
