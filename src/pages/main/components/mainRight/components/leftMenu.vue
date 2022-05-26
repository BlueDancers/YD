<template>
  <div class="right_active">
    <el-tooltip
      class="box-item"
      effect="dark"
      :content="item.text"
      placement="left"
      v-for="(item, index) in activeMenu"
      :key="item.icon"
    >
      <div
        class="active_item flex_center"
        :class="hoverMenu == index ? 'item_active' : ''"
        @click="activeItem(item.fun)"
      >
        <svg-icon class="item_icon" :name="item.icon"></svg-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { useMain } from '@/store/main'
import { useMainUtils } from '@/store/mainUtils'
import { reactive, ref } from 'vue'
const main = useMain()
const mainUtils = useMainUtils()

const hoverMenu = ref(0)
const activeMenu = reactive([
  // {
  //   icon: 'chehui',
  //   fun: () => main.revoke(),
  //   text: '撤销',
  // },
  // {
  //   icon: 'fanchexiao-copy-copy',
  //   fun: () => main.backRevoke(),
  //   text: '反撤销',
  // },
  {
    icon: 'shanchu2',
    fun: () => main.deleteComp(main.acIdx),
    text: '删除',
  },
  {
    icon: 'fuzhi1',
    fun: () => mainUtils.setCopyData(),
    text: '复制',
  },
  // {
  //   icon: 'niantie1',
  //   fun: () => mainUtils.pasteData(),
  //   text: '粘贴',
  // },
])

function activeItem(fun) {
  fun()
}
</script>

<style lang="less" scoped>
.right_active {
  height: calc(100vh - 50px);
  width: 40px;
  background-color: #fff;
  border-right: 1px solid #e2e2e2;
  .active_item {
    cursor: pointer;
    width: 40px;
    height: 40px;
    &:hover {
      background-color: var(--el-color-primary);
      .item_icon {
        fill: #fff;
      }
    }
    .item_icon {
      width: 18px;
      height: 18px;
      fill: #000;
    }
  }
  .item_active {
  }
}
</style>
