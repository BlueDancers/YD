<template>
  <div class="main_core" @click="handleCore">
    <div
      class="core_temp"
      @drop="drop"
      @dragover="(evt) => evt.preventDefault()"
      @dragend="(evt) => evt.preventDefault()"
      @dragleave="(evt) => evt.preventDefault()"
      :style="{ height: `${main.pageHeight + 1000}px` }"
      ref="coreRef"
    >
      <!-- <component v-for="item in main.template" :key="item.id" :is="item.name" :compData="item" /> -->
      <template v-for="(item, index) in main.template" :key="item.id">
        <point
          :index="index"
          :style="{ ...contResetCss(item.cssModule) }"
          @mouseover="mouseOver($event, index)"
          @mouseout="mouseOut"
          @mousedown="mouseDown($event, index)"
        >
          <y-button v-if="item.name == 'y-button'" :compData="item"></y-button>
          <y-div v-else-if="item.name == 'y-div'" :compData="item"></y-div>
          <y-img v-else-if="item.name == 'y-img'" :compData="item"></y-img>
          <y-edit v-else-if="item.name == 'y-edit'" :compData="item"></y-edit>
        </point>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useListen from '../../fun/listen'
import { useMain } from '@/store/main'
import yButton from '@/pages/main/dragComp/yButton.vue'
import Point from './components/point.vue'
import { contResetCss } from '@/utils/index'
import YDiv from '../../dragComp/yDiv.vue'
import YImg from '../../dragComp/yImg.vue'
import YEdit from '../../dragComp/yEdit.vue'

const main = useMain()

onMounted(() => {
  useListen(coreRef.value)
})

const coreRef = ref(null)

function drop(evt) {
  console.log(evt)

  let offsetX
  let offsetY

  if (evt.target.className.includes('core_temp')) {
    offsetY = evt.offsetY
    offsetX = evt.offsetX
  } else {
    // 如果不是画板,则寻找最近可选元素,获取其left与top + 相对元素偏移量
    let index = evt.path.findIndex((e) => e.className.includes('auxiliary_point'))
    offsetY = Number(evt.path[index].style.top.split('px')[0]) + evt.offsetY
    offsetX = Number(evt.path[index].style.left.split('px')[0]) + evt.offsetX
  }
  let name = evt.dataTransfer.getData('compIndex')
  if (name) {
    main.addComp(name, {
      top: offsetY,
      left: offsetX,
    })
  }
  evt.preventDefault()
}

// 鼠标进入
function mouseOver(evt, index) {
  main.hoverCompIndex = index
  evt.preventDefault()
}

// 鼠标离开
function mouseOut(evt) {
  main.hoverCompIndex = -1
  evt.preventDefault()
}

// 按下鼠标
function mouseDown(evt, index) {
  // console.log(evt)
  main.domOffsetX = evt.offsetX
  main.domOffsetY = evt.offsetY
  main.toggleComp(index)
  // line.getLineList({
  //   left: mainCore.value.offsetLeft - mainCore.value.offsetWidth / 2,
  //   top: mainCore.value.offsetTop,
  // }) // 全局按键松开初初始化辅助线信息
  evt.preventDefault()
}

// 取消选中
function handleCore(evt) {
  if (evt.target.className.includes('core_temp') || evt.target.className.includes('main_core')) {
    main.activeCompIndex = -1
    main.hoverCompIndex = -1
  }
}
</script>

<style lang="less" scoped>
.main_core {
  flex: 1;
  display: flex;

  justify-content: center;
  overflow-y: scroll;
  height: calc(100vh - 50px);

  .core_temp {
    position: relative;
    background-color: #fff;
    width: 325px;
    height: 650px;
    box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.2);
    margin-top: 40px;
    margin-bottom: 100px;
  }
}
</style>
