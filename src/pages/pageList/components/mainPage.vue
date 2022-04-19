<template>
  <div class="main_page">
    <div class="page_title">全部页面(4)</div>
    <div class="page_box">
      <div class="box_top"></div>
      <div class="box_mid"></div>
      <div class="box_bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.main_page {
  .page_title {
    font-size: 14px;
    font-weight: 400;
    color: #409eff;
    line-height: 24px;
  }
  .page_box {
    margin-top: 20px;
    .box_top {
      width: 170px;
      height: 162px;
      background: rgba(226, 226, 226, 0.5);
      border-radius: 5px 5px 0px 0px;
    }
    .box_mid {
    }
    .box_bottom {
    }
  }
}
</style>
