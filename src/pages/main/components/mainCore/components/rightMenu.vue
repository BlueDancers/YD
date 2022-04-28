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
import { computed, onMounted, ref } from 'vue'

const main = useMain()

const showMenu = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const acTeIdx = ref(0) // 当前选中元素
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
    key: 4,
    value: '删除',
  },
  {
    key: 5,
    value: '锁定/解锁',
  },
])

onMounted(() => {
  // 点击弹窗以外区域 触发关闭
  onClickOutside(rightMenu, () => {
    showMenu.value = false
  })
})

// 点击单个
function changeItem(index) {
  switch (index) {
    case 1:
      // 获取当前元素最大层级 在此基础上+1
      main.exchangeComp(acTeIdx.value, main.template.length - 1)
      break
    case 2:
      main.exchangeComp(acTeIdx.value, 0)
      break
    case 4:
      main.deleteComp(acTeIdx.value)
      break
    case 5:
      main.updateLockComp(main.template[acTeIdx.value].id)
      break
    default:
      break
  }
}

function open(x, y, index) {
  menuX.value = x
  menuY.value = y
  acTeIdx.value = index
  showMenu.value = true
}

function close() {
  showMenu.value = false
  acTeIdx.value = 0
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
