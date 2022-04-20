<template>
  <div class="main_right">
    <div class="right_active">
      <div
        class="active_item flex_center"
        :class="hoverMenu == index ? 'item_active' : ''"
        v-for="(item, index) in activeMenu"
        :key="item.icon"
        @click="activeItem(item.type)"
      >
        <svg-icon class="item_icon" :name="item.icon"></svg-icon>
      </div>
    </div>
    <div class="right_cont"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const hoverMenu = ref(0)
const activeMenu = reactive([
  {
    icon: 'chehui',
    type: '',
  },
  {
    icon: 'fanchexiao-copy-copy',
    type: '',
  },
  {
    icon: 'shanchu2',
    type: '',
  },
  {
    icon: 'fuzhi1',
    type: '',
  },
  {
    icon: 'niantie1',
    type: '',
  },
])

function activeItem(type) {}
</script>

<style lang="less" scoped>
.main_right {
  display: flex;
  .right_active {
    height: calc(100vh - 50px);
    width: 45px;
    background-color: #fff;
    border-right: 1px solid #e2e2e2;
    .active_item {
      cursor: pointer;
      width: 45px;
      height: 45px;
      &:hover {
        background-color: #409eff;
        .item_icon {
          fill: #fff;
        }
      }
      .item_icon {
        width: 20px;
        height: 20px;
        fill: #000;
      }
    }
    .item_active {
    }
  }
  .right_cont {
    height: calc(100vh - 50px);
    width: 347px;
    background-color: #fff;
  }
}
</style>
