<template>
  <div
    ref="rightMenu"
    class="right_menu"
    :style="{ top: `${menuY}px`, left: `${menuX}px` }"
    v-if="showMenu"
    @contextmenu="(evt) => evt.preventDefault()"
    @click="close"
  >
    <div v-for="item in menu" :key="item.key" class="menu_item" @click="changeItem(item.key)">
      {{ item.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMain } from '@/store/main'
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const main = useMain()

const showMenu = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const rightMenu = ref()

const menu = ref([
  {
    key: 1,
    value: '置于顶层',
  },
  {
    key: 2,
    value: '置于低层',
  },
  {
    key: 3,
    value: '复制',
  },
  {
    key: 4,
    value: '删除',
  },
  {
    key: 5,
    value: '锁定',
  },
])
onMounted(() => {
  // 点击弹窗以外区域 触发关闭
  onClickOutside(rightMenu, (event) => {
    showMenu.value = false
  })
})

// 点击单个
function changeItem(index) {
  switch (index) {
    case 1:
      // 获取当前元素最大层级 在此基础上+1
      // main.template[main.acIdx].cssModule['z-index'] = 10
      break
    case 2:
      // main.template[main.acIdx].cssModule['z-index'] = 1
      break
    case 3:
      console.log('开发中')
      break
    case 4:
      main.deleteComp(main.acIdx)
      break
    case 5:
      if (main.acIdx.length == 1) {
        main.updateLockComp(main.template[main.acIdx[0]].id)
      }
      break
    default:
      break
  }
}

function open(x, y) {
  menuX.value = x
  menuY.value = y
  showMenu.value = true
}

function close() {
  showMenu.value = false
}
defineExpose({
  open,
  close,
})
</script>

<style lang="less" scoped>
.right_menu {
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  box-shadow: rgb(194, 194, 194) 3px 3px 10px;
  border-radius: 5px;
  padding: 8px 0;
  .menu_item {
    padding: 8px 10px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: #ecf5ff;
      color: var(--primary);
    }
  }
}
</style>
