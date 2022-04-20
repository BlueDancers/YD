<template>
  <div class="main_page">
    <div class="page_title">全部页面({{ mainList.length }})</div>
    <div class="page_cont">
      <div class="page_box" v-for="(item, index) in mainList" :key="index">
        <div class="box_top flex_center">
          <div class="top_img"></div>
        </div>
        <div class="box_mid">
          <div class="mid_cont">
            <div class="mid_name">{{ item.title }}</div>
            <div class="mid_time">{{ item.createTime }}更新</div>
          </div>
          <div class="mid_select">
            <div class="select_itme">
              <svg-icon class="item_icon" name="bianji"> </svg-icon>
              <div class="item_text">编辑</div>
            </div>
            <div class="select_itme">
              <svg-icon class="item_icon" name="zhexiantu"> </svg-icon>
              <div class="item_text">数据</div>
            </div>
            <div class="select_itme">
              <el-dropdown class="item_dropdown">
                <svg-icon class="item_icon" name="gengduo"> </svg-icon>
                <div class="item_text">更多</div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="box_bottom">
          <div class="box_left">
            <text>14</text>
            <text class="left_color">浏览</text>
            <text>3</text>
            <text class="left_color">访客</text>
          </div>

          <svg-icon name="xiala" class="box_right"> </svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
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
    flex-wrap: wrap;
    .page_box {
      min-width: 170px;
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
        padding: 15px 8px 13px 8px;
        box-sizing: border-box;
        height: 60px;
        background: #ffffff;
        .mid_cont {
          display: block;
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
        .mid_select {
          display: none;
          align-items: center;
          justify-content: space-between;
          .select_itme {
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 40px;
            height: 40px;
            background: #f3f3f3;
            border-radius: 3px 3px 3px 3px;
            .item_icon {
              fill: #666;
              margin-top: 4px;
              width: 17px;
              height: 17px;
            }
            .item_text {
              margin-top: 2px;
              font-size: 8px;
              color: #3d3d3d;
              line-height: 8px;
            }
            .item_dropdown {
              width: 100%;
              height: 100%;
              line-height: 0;
              display: flex;
              align-items: center;
              flex-direction: column;
              .item_icon {
                fill: #666;
                margin-left: 2px;
                width: 17px;
                height: 17px;
              }
              .item_text {
                font-size: 8px;
                color: #3d3d3d;
                line-height: 8px;
              }
            }
          }
        }
        &:hover {
          .mid_cont {
            display: none;
          }
          .mid_select {
            display: flex;
          }
        }
      }
      .box_bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 7px;
        font-size: 10px;
        line-height: 10px;
        box-sizing: border-box;
        border-top: 1px solid #ededed80;
        background: #ffffff;
        .box_left {
          color: #409eff;
          .left_color {
            color: #666666;
          }
        }
        .box_right {
          fill: #666;
          transform: rotate(270deg);
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}
</style>
