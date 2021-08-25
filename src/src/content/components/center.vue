<template>
  <!-- @click="clearActive" -->
  <div class="main_page" @mousemove="mousemove" @mouseleave="mouseleave" @mousedown="mousedown" @mouseup="mouseup">
    <div class="main_iframe">
      <draggable v-model="containerList" :animation="300" handle=".active_handle" @start="dragStart" @end="dragEnd">
        <div
          @click.self="toggleActive(item)"
          class="contains_item"
          :class="activeCont == item.id ? 'active_cont' : ''"
          :style="resetCss(item.cssModule)"
          v-for="item in containerList"
          :key="item.id"
        >
          <InsertRowLeftOutlined class="active_handle"></InsertRowLeftOutlined>
          <div v-if="item.components.length == 0">
            <span>选中组件,点击左侧添加元素</span>
          </div>
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
        </div>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, effect, ref } from 'vue'
import { useStore } from 'vuex'
import { resetCss } from '@/utils/index'
import { InsertRowLeftOutlined } from '@ant-design/icons-vue'
import { VueDraggableNext } from 'vue-draggable-next'
import YButton from '../comp/YButton.vue'
import YImg from '../comp/YImg.vue'
import YInput from '../comp/YInput.vue'
import YP from '../comp/YP.vue'
export default defineComponent({
  components: {
    draggable: VueDraggableNext,
    InsertRowLeftOutlined,
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
    // 当前设定点
    let potinLock = computed(() => store.state.core.potinLock)

    // 选中父级
    const toggleActive = (data) => {
      console.log('父级被点击')

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
      store.commit('core/toggle_mouseLock', true)
      console.log('按下')
    }
    const mouseup = (e) => {
      store.commit('core/toggle_mouseLock', false)
      console.log('松开')
    }
    const mousemove = (e) => {
      let data = {
        x: e.movementX,
        y: e.movementY,
      }
      if (potinLock.value == 0) {
        store.commit('core/updateCarryXY', data)
      } else {
        store.commit('core/updateCarryPoint', data)
      }
      console.log('移动')
    }
    const mouseleave = (e) => {
      console.log('离开')
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
    }
  },
})
</script>

<style lang="scss" scoped>
.main_page {
  .main_iframe {
    margin-top: 20px;
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
        background-color: rgba(255, 255, 255, 0.4);
        cursor: pointer;
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
        border: 1px solid #000;
      }
    }
  }
}
</style>
