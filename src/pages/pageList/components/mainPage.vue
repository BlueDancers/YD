<template>
  <div class="main_page">
    <div class="page_title">全部页面({{ mainList.length }})</div>
    <div class="page_cont">
      <div class="page_box" v-for="(item, index) in mainList" :key="index">
        <div class="box_top flex_center">
          <div class="top_img"></div>
        </div>
        <div class="box_mid">
          <div class="mid_name">{{ item.title }}</div>
          <div class="mid_time">{{ item.createTime }}更新</div>
        </div>
        <div class="box_bottom">
          <div class="box_left">
            <text>14</text>
            <text class="left_color">浏览</text>
            <text>3</text>
            <text class="left_color">访客</text>
          </div>

          <svg-icon name="xiala" class="box_right" :color="'#666'"> </svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  mainList: any[]
}
const props = withDefaults(defineProps<Props>(), {
  mainList: () => [],
})
</script>

<style lang="less" scoped>
.main_page {
  .page_title {
    padding: 20px 0 0 20px;
    font-size: 14px;
    font-weight: 400;
    color: #409eff;
    line-height: 24px;
  }
  .page_cont {
    display: flex;
    .page_box {
      margin-left: 20px;
      margin-top: 20px;
      width: 170px;
      box-shadow: 0px 2px 6px 1px #9292924d;
      border-radius: 5px;
      overflow: hidden;
      .box_top {
        height: 162px;
        display: flex;
        background: #e2e2e280;
        .top_img {
          width: 78px;
          height: 129px;
          background: #ffffff;
          box-shadow: 0px 2px 5px 1px #0000004d;
        }
      }
      .box_mid {
        padding: 15px 0 13px 8px;
        box-sizing: border-box;
        height: 60px;
        background: #ffffff;
        .mid_name {
          font-size: 15px;
          font-weight: bold;
          color: #3d3d3d;
          line-height: 15px;
        }
        .mid_time {
          margin-top: 7px;
          font-size: 10px;
          color: #666666;
          line-height: 10px;
        }
      }
      .box_bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 7px;
        box-sizing: border-box;
        border-top: 1px solid #ededed80;
        background: #ffffff;
        .box_left {
          font-size: 10px;
          color: #409eff;
          line-height: 10px;
          .left_color {
            color: #666666;
          }
        }
        .box_right {
          transform: rotate(270deg);
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}
</style>
