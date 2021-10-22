<template>
  <div
    class="main_page"
    @click.self="clearActive"
    @mousemove="mousemove"
    @mouseleave="mouseleave"
    @mousedown="mousedown"
    @mouseup="mouseup"
  >
    <div class="main_iframe">
      <!-- 苹果状态栏 -->
      <div class="main_header">
        <div class="main_header_bar">
          <div class="header_time">15:06</div>
          <div class="header_icon_list">
            <svg-icon :style="{ width: '18px', height: '18px' }" class="header_icon" name="ios-cellular" />
            <svg-icon :style="{ width: '26px', height: '26px' }" class="header_icon" name="ios-battery-charging" />
          </div>
        </div>
        <!-- 网页标题 -->
        <div class="main_header_title">{{ routerName || '网页名称' }}</div>
      </div>
      <!-- 辅助线 -->
      <draggable v-model="containerList" :animation="300" handle=".active_handle" @start="dragStart" @end="dragEnd">
        <div
          @mousedown.self="toggleActive(item)"
          class="contains_item"
          :class="activeCont == item.id ? 'active_cont' : 'unactive_cont'"
          :style="resetCss(item.cssModule)"
          v-for="item in containerList"
          :key="item.id"
          @drop="drop($event, item)"
          @dragover="dragover"
        >
          <auxiliary-line-x v-if="activeCont == item.id"></auxiliary-line-x>
          <auxiliary-line-y v-if="activeCont == item.id"></auxiliary-line-y>
          <!-- 容器说明 -->
          <view v-show="activeCont == item.id" class="contains_name">{{ item.name }}</view>
          <!-- 拖拽换位 -->
          <svg-icon
            v-show="activeCont == item.id"
            :color="'#2970f6'"
            class="active_handle"
            name="tuozhuaicaidandaohang"
          />
          <!-- 未选择组件 -->
          <div v-if="item.components.length == 0">
            <span>选中组件,点击左侧添加元素</span>
          </div>
          <!-- 容器内组件 -->
          <template v-else>
            <div
              class="component_item"
              :style="{ ...contResetCss(comp.cssModule) }"
              v-for="comp in item.components"
              :key="comp.id"
            >
              <!-- 组件的六个点 -->
              <auxiliary-point v-if="activechild == comp.id && item.name == 'default'"></auxiliary-point>
              <component
                :class="activechild == comp.id ? 'active_comp' : 'comp_default'"
                :is="comp.name"
                :cssModule="{ ...compResetCss(comp.cssModule) }"
                :staticData="comp.staticData"
                :configuration="comp.configuration"
                :componentId="comp.id"
                :parentId="item.id"
              ></component>
            </div>
          </template>
          <!-- 下方拖拽 -->
          <div
            v-show="activeCont == item.id && ['default', 'flex'].includes(item.name)"
            class="max_cont"
            @mousedown="contHeightAddDown"
          >
            <!-- <EllipsisOutlined :style="{ color: '#fff' }" /> -->
          </div>
        </div>
      </draggable>
      <div class="no_component_data" :style="{ backgroundColor: backColor }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, effect, ref } from 'vue'
import { useStore } from 'vuex'
import { resetCss, contResetCss, compResetCss } from '@/utils/index'
import { AppstoreOutlined, TableOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
import { VueDraggableNext } from 'vue-draggable-next'
import auxiliaryLineX from '../../../components/auxiliaryLineX.vue'
import auxiliaryLineY from '../../../components/auxiliaryLineY.vue'
import YDiv from '../comp/YDiv.vue'
import YButton from '../comp/YButton.vue'
import YImg from '../comp/YImg.vue'
import YP from '../comp/YP.vue'
import yGrid from '../comp/yGrid.vue'
import AuxiliaryPoint from '@/components/auxiliaryPoint.vue'
import { message } from 'ant-design-vue'
import { log } from 'console'

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
    AppstoreOutlined,
    TableOutlined,
    EllipsisOutlined,
    auxiliaryLineX,
    auxiliaryLineY,
    YDiv,
    YButton,
    YImg,
    YP,
    yGrid,
    AuxiliaryPoint,
  },
  setup() {
    const store = useStore()
    // 组件数据
    let containerList = computed({
      get: () => {
        return store.state.core.containerList
      },
      set: (value) => {
        store.commit('core/changeContList', value)
      },
    })
    // 当前选中组件
    let activeCont = computed(() => store.state.core.activeCont)
    let activechild = computed(() => store.state.core.activechild)
    // 当前设定点锁
    let mouseLock = computed(() => store.state.core.mouseLock)
    let mouseType = computed(() => store.state.core.mouseType)
    let moveLock = computed(() => store.state.core.moveLock)
    // 背景颜色
    let backColor = computed(() => store.state.core.backColor)
    // 路由名称
    let routerName = computed(() => store.state.core.routerName)
    // 选中父级
    const toggleActive = (data) => {
      // 切换父级的时候去除缓存数据
      if (activeCont.value != data.id) {
        store.commit('core/clearContList')
        store.commit('auxiliary/clearShowLine')
      }
      store.commit('core/toggleActive', data.id)
    }

    const clearActive = () => {
      console.log('触发清除')

      store.commit('core/toggleActive', null)
    }
    const dragStart = () => {
      console.log('开始拖拽')
    }
    const dragEnd = () => {
      // 拖拽完成后 数据下标发生变化 重新计算缓存下标数据
      store.commit('core/update_activechild')
    }
    const mousedown = (e) => {
      if (e.button == 0) {
        store.commit('core/down_mouseLock')
      }
      // console.log('按下')
    }
    const mouseup = (e) => {
      store.commit('core/up_mouseLock')
      // console.log('松开')
    }
    const mousemove = (e) => {
      let data = {
        x: e.movementX,
        y: e.movementY,
      }
      if (mouseLock.value && !moveLock.value) {
        if (mouseType.value == 2) {
          store.commit('core/updateCarryXY', data)
        }
        if (mouseType.value == 3) {
          store.commit('core/updateCarryPoint', data)
        }
        if (mouseType.value == 4) {
          store.commit('core/updateCarryHeight', data)
        }
      }
      // console.log('移动')
    }
    const mouseleave = (e) => {
      // console.log('离开')
    }
    const contHeightAddDown = () => {
      store.commit('core/toggle_mouseType', 4)
    }
    // 拖拽放下
    function drop(event, data) {
      if (event.target.style.display != 'block') {
        message.error('非通用组件,请通过点击进行组件添加')
        return
      }
      if (event.target.className.includes('contains_item')) {
        // 选中组件
        toggleActive(data)
        // 填充拖拽元素
        store.commit('core/add_components', {
          name: event.dataTransfer.getData('compIndex'),
          top: event.layerY,
          left: event.layerX,
        })
      } else {
        message.error('请勿叠加组件~')
      }
      event.preventDefault()
    }
    function dragover(e) {
      e.preventDefault()
    }
    return {
      containerList,
      backColor,
      routerName,
      activeCont,
      activechild,
      resetCss,
      contResetCss,
      compResetCss,
      toggleActive,
      clearActive,
      dragStart,
      dragEnd,
      mousedown,
      mouseup,
      mousemove,
      mouseleave,
      contHeightAddDown,
      drop,
      dragover,
    }
  },
})
</script>

<style lang="scss" scoped>
.main_page {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  .main_iframe {
    padding-top: 20px;
    padding-bottom: 40px;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 13px 0 rgb(0 0 0 / 10%);
    background-color: #f2f2f2;
    overflow-x: hidden;
    overflow-y: scroll;
    .main_header {
      .main_header_bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        width: 375px;
        height: 30px;
        padding: 0 6px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        .header_time {
        }
        .header_icon_list {
          display: flex;
          align-items: center;
          .header_icon {
            margin: 0 4px;
          }
        }
      }
      .main_header_title {
        position: relative;
        z-index: 999;
        width: 375px;
        font-size: 17px;
        padding: 10px 0;
        font-weight: bold;
        text-align: center;
        background-color: #fff;
        // box-shadow: 0 5px 10px -5px #eee;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .contains_item {
      position: relative;
      .contains_name {
        opacity: 1;
        position: absolute;
        left: 0px;
        bottom: -18px;
        z-index: 9999;
        background-color: #2970f6;
        color: #fff;
        font-size: 12px;
        padding: 0 4px;
      }
      .active_handle {
        position: absolute;
        z-index: 100;
        right: 0px;
        top: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        width: 20px;
        height: 20px;
        // background-color: #2970f6;
        cursor: pointer;
      }
      .max_cont {
        width: 100%;
        height: 4px;
        background-color: #1e58c3;
        position: absolute;
        z-index: 1000;
        right: 0px;
        bottom: -4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: row-resize;
      }
      .component_item {
        position: relative;
      }
    }
    .active_cont {
      &::after {
        content: '';
        z-index: 0;
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%; // calc(100% - 2px);
        width: 100%; // calc(100% - 2px);
        border: 1px solid #2970f6;
      }
    }
    .unactive_cont {
      &::after {
        content: '';
        z-index: 0;
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%; // calc(100% - 2px);
        width: 100%; // calc(100% - 2px);
        border: 1px dashed rgb(201, 201, 201);
      }
    }
    .active_comp {
      outline: 1px solid #2970f6;
    }
    .comp_default {
      &:hover {
        outline: 1px dashed #2970f6;
      }
    }
  }
  .no_component_data {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #fff;
    height: calc(100% - 100px);
    width: 375px;
  }
}
</style>
