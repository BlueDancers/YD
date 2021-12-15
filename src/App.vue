<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useAppStore } from '@/stores/app'
import { cloud } from './modules/request'
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const store = useAppStore()
    store.updateUserData(cloud)
  },
})
</script>

<style>
.none_cont {
  background-color: #fff;
  box-sizing: border-box;
  width: calc(100% - 20px);
  height: 500px;
  padding: 20px 0 !important;
  margin: 10px !important;
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
* {
  user-select: none;
}

.default_input {
  width: 100px !important;
  margin: 0 2px !important;
}
.mini_input {
  width: 50px !important;
  margin: 0 2px !important;
}
</style>
