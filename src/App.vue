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
.padd {
  padding: 10px;
  background-color: #fff;
}
.marg {
  margin: 10px;
}
#app {
  position: relative;
  /* padding: 10px; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #f0f2f5;
  min-height: 100vh;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
