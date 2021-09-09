<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useStore } from 'vuex'
import { $APP } from '@/PROVIDE_KEY'
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const store = useStore()
    let $app: any = inject($APP)
    store.dispatch('app/getUserData', $app)
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
html {
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 0px;
  height: 2px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 8px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: rgba(187, 187, 187);
}
/* 非激活窗口 */
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(0, 255, 0, 0.4);
}

.padd {
  padding: 10px;
  background-color: #fff;
}
.marg {
  margin: 10px;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

@font-face {
  font-family: mFont;
  src: url('../src/assets/common/DIN-MEDIUM.OTF');
}
</style>
