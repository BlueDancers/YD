<template>
  <div class="component_data">
    <el-collapse v-model="activeLeft">
      <el-collapse-item title="Consistency" :name="1">
        <template #title>
          <span class="collapse_title">基础组件</span>
        </template>
        <div class="component_list">
          <div class="list_item flex_center" v-for="item in baseComp" :key="item.icon">
            <svg-icon class="item_icon" :name="item.icon"></svg-icon>
            <span class="item_span">{{ item.text }}</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Feedback" :name="2">
        <template #title>
          <span class="collapse_title">业务组件</span>
        </template>
        <div>暂无</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const activeLeft = ref(1) //

const baseComp = reactive([
  {
    icon: 'tupian1',
    text: '图片',
  },
  {
    icon: 'wenben1',
    text: '富文本',
  },
  {
    icon: 'moban',
    text: '模块',
  },
  {
    icon: 'anniu',
    text: '按钮',
  },
])
</script>

<style lang="less" scoped>
.component_data {
  .collapse_title {
  }
  .component_list {
    margin: 10px;
    display: grid;
    grid-template-columns: 76px 76px 76px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    .list_item {
      cursor: pointer;
      user-select: none;
      flex-direction: column;
      border: 1px solid #d4d4d4;
      border-radius: 8px;
      height: 70px;
      &:hover {
        border: 1px solid #2970f6;
        .item_icon {
          fill: #2970f6;
        }
        .item_span {
          color: #2970f6;
        }
      }
      .item_icon {
        width: 36px;
        height: 36px;
      }
      .item_span {
        margin-top: 4px;
        line-height: 14px;
        font-size: 14px;
        color: #000000;
      }
    }
  }
  div {
  }
}
</style>
