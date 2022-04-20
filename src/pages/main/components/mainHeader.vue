<template>
  <div class="main_header">
    <div class="header_left" @click="gotoHome">易动</div>
    <div class="header_right">
      <div class="header_menu">
        <div class="menu_item">
          <svg-icon class="item_icon" name="github"></svg-icon>
          <span class="item_text">github</span>
        </div>
        <div class="menu_item">
          <svg-icon class="item_icon" name="shiyongwendang"></svg-icon>
          <span class="item_text">文档</span>
        </div>
        <div class="menu_item">
          <svg-icon class="item_icon" name="erweima"></svg-icon>
          <span class="item_text">交流群</span>
        </div>
      </div>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function gotoHome() {
  router.replace({
    name: 'home',
  })
}
</script>

<style lang="less" scoped>
.main_header {
  height: 49px;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  padding: 0 20px;
  .header_left {
    cursor: pointer;
  }
  .header_right {
    display: flex;
    .header_menu {
      margin-right: 48px;
      display: flex;
      .menu_item {
        cursor: pointer;
        margin-left: 18px;
        display: flex;
        align-items: center;
        .item_icon {
          width: 24px;
          height: 24px;
        }
        .item_text {
          margin-left: 5px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
