<template>
  <!-- @click="clearActive" -->
  <div class="main_page" @mousemove="mousemove" @mouseleave="mouseleave" @mousedown="mousedown" @mouseup="mouseup">
    <div class="main_header">
      <div class="header_time">15:06</div>
      <div class="header_icon_list">
        <img class="header_icon" src="@/assets/common/xinhao.png" alt="" />
        <img class="header_icon" src="@/assets/common/wifi.png" alt="" />
        <img class="header_icon_dc" src="@/assets/common/dianchi.png" alt="" />
      </div>
    </div>
    <div class="main_iframe">
      <!-- 辅助线 -->
      <draggable v-model="containerList" :animation="300" handle=".active_handle" @start="dragStart" @end="dragEnd">
        <div
          @click.self="toggleActive(item)"
          class="contains_item"
          :class="activeCont == item.id ? 'active_cont' : ''"
          :style="resetCss(item.cssModule)"
          v-for="item in containerList"
          :key="item.id"
        >
          <auxiliary-line-x v-if="activeCont == item.id"></auxiliary-line-x>
          <auxiliary-line-y v-if="activeCont == item.id"></auxiliary-line-y>
          <!-- 拖拽 -->
          <AppstoreOutlined class="active_handle" :style="{ color: '#fff' }" />
          <!-- 未选择组件 -->
          <div v-if="item.components.length == 0">
            <span>选中组件,点击左侧添加元素</span>
          </div>
          <!-- 容器内租金 -->
          <template v-else>
            <template v-for="comp in item.components" :key="comp.id">
              <component
                :is="comp.name"
                :cssModule="comp.cssModule"
                :staticData="comp.staticData"
                :configuration="comp.configuration"
                :componentId="comp.id"
                :parentId="item.id"
              ></component>
            </template>
          </template>
          <!-- 下方拖拽 -->
          <div v-show="activeCont == item.id" class="max_cont" @mousedown="contHeightAddDown">
            <EllipsisOutlined width="1em" height="1em" :style="{ color: '#fff' }" />
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, effect, ref } from 'vue'
import { useStore } from 'vuex'
import { resetCss } from '@/utils/index'
import { AppstoreOutlined, TableOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
import { VueDraggableNext } from 'vue-draggable-next'
import auxiliaryLineX from '../../../components/auxiliaryLineX.vue'
import auxiliaryLineY from '../../../components/auxiliaryLineY.vue'
import YButton from '../comp/YButton.vue'
import YImg from '../comp/YImg.vue'
import YInput from '../comp/YInput.vue'
import YP from '../comp/YP.vue'

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
    AppstoreOutlined,
    TableOutlined,
    EllipsisOutlined,
    auxiliaryLineX,
    auxiliaryLineY,
    YButton,
    YImg,
    YInput,
    YP,
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
    // 当前设定点锁
    let mouseLock = computed(() => store.state.core.mouseLock)
    let mouseType = computed(() => store.state.core.mouseType)
    let moveLock = computed(() => store.state.core.moveLock)

    // 选中父级
    const toggleActive = (data) => {
      // 切换父级的时候去除缓存数据
      if (activeCont.value != data.id) {
        store.commit('core/clearContList')
      }
      store.commit('core/toggleActive', data.id)
    }
    const clearActive = () => {
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
    return {
      containerList,
      activeCont,
      resetCss,
      toggleActive,
      clearActive,
      dragStart,
      dragEnd,
      mousedown,
      mouseup,
      mousemove,
      mouseleave,
      contHeightAddDown,
    }
  },
})
</script>

<style lang="scss" scoped>
.main_page {
  position: relative;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 13px 0 rgb(0 0 0 / 10%);
  .main_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    background-color: white;
    width: 375px;
    height: 40px;
    padding: 0 6px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 1px solid #eee;
    .header_time {
    }
    .header_icon_list {
      .header_icon {
        margin: 0 2px;
        width: 14px;
      }
      .header_icon_dc {
        margin: 0 2px;
        width: 22px;
      }
    }
  }
  .main_iframe {
    position: relative;
    background-color: white;
    width: 375px;
    height: 700px;
    overflow-x: hidden;
    overflow-y: auto;
    .contains_item {
      .active_handle {
        position: absolute;
        z-index: 100;
        right: 0px;
        top: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        background-color: #2970f6;
        cursor: pointer;
      }
      .max_cont {
        width: 30px;
        border-radius: 4px;
        height: 12px;
        background-color: #2970f6;
        position: absolute;
        z-index: 1000;
        left: 50%;
        bottom: -6px;
        transform: translate(-50%, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: row-resize;
      }
    }
    .active_cont {
      &::after {
        content: '';
        z-index: 0;
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        border: 1px solid #2970f6;
      }
    }
  }
}
</style>
