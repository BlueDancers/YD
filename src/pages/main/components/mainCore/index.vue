<template>
  <div class="main_core" @click="handleCore">
    <div class="main_core_header flex_center">
      <div class="header_title">{{ main.pageTitle }}</div>
    </div>
    <div
      class="core_temp"
      @drop="drop"
      @dragover="(evt) => evt.preventDefault()"
      @dragend="(evt) => evt.preventDefault()"
      @dragleave="(evt) => evt.preventDefault()"
      :style="{ height: `${main.pageHeight}px`, backgroundColor: main.backColor }"
      ref="coreRef"
    >
      <!-- <component v-for="item in main.template" :key="item.id" :is="item.name" :compData="item" /> -->
      <template v-for="(item, index) in main.template" :key="item.id">
        <point
          :index="index"
          :id="item.id"
          :style="{ ...contResetCss(item.cssModule), 'z-index': index }"
          @mouseover="mouseOver($event, index)"
          @mouseout="mouseOut"
          @mousedown="mouseDown($event, index)"
          @contextmenu="contextmenu($event, index)"
        >
          <comp-dom :item="item"></comp-dom>
        </point>
      </template>
      <div class="main_add_height" @mousedown="changeHeight">
        <span v-if="main.moveIndex == 9">页面高度：{{ main.pageHeight }}px</span>
        <span v-else>↕</span>
      </div>
    </div>
  </div>
  <right-menu ref="rightMenuRef"></right-menu>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useListen from '../../fun/listen'
import { useMain } from '@/store/main'
import Point from './components/point.vue'
import { contResetCss } from '@/utils/index'
import rightMenu from './components/rightMenu.vue'
import RightMenu from './components/rightMenu.vue'
import CompDom from './components/compDom.vue'

const main = useMain()

onMounted(() => {
  useListen(coreRef.value)
})

const coreRef = ref()
const rightMenuRef = ref()

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
    main.acIdx = []
    main.hoverCompIndex = -1
  }
}

// 右击事件
function contextmenu(evt, index) {
  // 获取xy轴
  // 打开组件 传入xy轴
  rightMenuRef.value.open(evt.clientX, evt.clientY, index)
  evt.preventDefault()
}

// 修改页面高度
function changeHeight() {
  main.changeMoveIndex(9)
}
</script>

<style lang="less" scoped>
.main_core {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  height: calc(100vh - 50px);

  .main_core_header {
    position: absolute;
    top: 64px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 325px;
    height: 70px;
    background-size: 100% 100%;
    background-image: url('@/assets/header.png');
    .header_title {
      position: relative;
      top: 17px;
      font-size: 15px;
    }
  }
  .core_temp {
    position: relative;
    box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    width: 325px;
    height: 650px;
    margin-top: 100px;
    margin-bottom: 200px;

    .main_add_height {
      border-top: 1px solid #eee;
      background-color: #fff;
      position: absolute;
      height: 20px;
      width: 325px;
      bottom: -20px;
      left: 50%;
      transform: translate(-50%, 0%);
      cursor: ns-resize;
      user-select: none;
      text-align: center;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>
