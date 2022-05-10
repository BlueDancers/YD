<template>
  <div class="z_index_data">
    <!--   -->
    <div
      class="data_item"
      :class="main.acIdx.find((e) => realIdx(e) == index) != null ? 'active_item' : ''"
      v-for="(item, index) in template"
      @click="acElement(index)"
    >
      <el-input size="small" class="item_left" v-model="item.showTitle"></el-input>
      <div class="item_rigth">
        <svg-icon
          class="right_icon fast_icon"
          name="zhiding"
          @click.stop="changeZ(index, 0)"
          v-if="index != 0"
        ></svg-icon>
        <svg-icon
          class="right_icon fast_icon"
          name="zhidi-copy"
          @click.stop="changeZ(index, template.length - 1)"
          v-if="index != template.length - 1"
        ></svg-icon>
        <svg-icon
          class="right_icon"
          name="xiangshang"
          @click.stop="changeZ(index, index - 1)"
          v-if="index != 0"
        ></svg-icon>
        <svg-icon
          class="right_icon"
          name="xiangxia"
          @click.stop="changeZ(index, index + 1)"
          v-if="index != template.length - 1"
        ></svg-icon>
        <svg-icon
          class="right_icon"
          name="shanchu2"
          @click.stop="main.deleteComp([realIdx(index)])"
        ></svg-icon>
      </div>
    </div>
    <el-empty v-if="template.length == 0" description="请添加组件" />
  </div>
</template>

<script setup lang="ts">
import { useMain } from '@/store/main'
import { deepClone } from '@/utils'
import { computed } from 'vue'

const main = useMain()

// 倒叙输出
const template = computed(() => {
  return deepClone(main.template).reverse()
  //   return main.template
})

// 选择元素
function acElement(index) {
  main.hoverCompIndex = realIdx(index)
  main.acIdx = [realIdx(index)]
}

// 层级移动
function changeZ(oldIndex, newIndex) {
  // 第一位 禁止上移
  // 最后一位 禁止下移
  let oldI = realIdx(oldIndex)
  let newI = realIdx(newIndex)
  main.exchangeComp(oldI, newI)
}

function realIdx(index) {
  return template.value.length - index - 1
}
</script>

<style lang="less" scoped>
.z_index_data {
  .data_item {
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-bottom: 1px solid #eee;
    .item_left {
      width: 100px;
    }
    .item_rigth {
      display: flex;
      &:hover {
        .fast_icon {
          display: block;
        }
      }
      .right_icon {
        width: 14px;
        height: 14px;
        margin: 0 1px;
        padding: 4px;
        cursor: pointer;
        &:hover {
          background-color: var(--primary);
          fill: #fff;
          border-radius: 100%;
        }
      }
      .fast_icon {
        display: none;
      }
    }
  }
  .active_item {
    border: 1px solid var(--primary);
  }
}
</style>
