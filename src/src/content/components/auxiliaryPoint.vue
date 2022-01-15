<template>
  <div class="auxiliary_point" :class="pointStyle">
    <template v-if="props.index == props.activeCompIndex && !lockCompId.includes(props.id)">
      <div class="point_item point_left_top" @mousedown="potintActive(1)"></div>
      <div class="point_item point_left_center" @mousedown="potintActive(2)"></div>
      <div class="point_item point_left_buttom" @mousedown="potintActive(3)"></div>

      <div class="point_item point_center_top" @mousedown="potintActive(4)"></div>
      <div class="point_item point_center_buttom" @mousedown="potintActive(5)"></div>

      <div class="point_item point_right_top" @mousedown="potintActive(6)"></div>
      <div class="point_item point_right_center" @mousedown="potintActive(7)"></div>
      <div class="point_item point_right_buttom" @mousedown="potintActive(8)"></div>
    </template>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { useCoreStore } from '@/store/core'
import { computed, defineComponent } from 'vue'
// 辅助点
export default defineComponent({
  props: ['index', 'activeCompIndex', 'hoverCompIndex', 'id'],
  setup(props) {
    let core = useCoreStore()
    const potintActive = (type: number) => {
      console.log('类型', type)
      core.changeMoveIndex(type)
    }
    const pointStyle = computed(() => {
      if (props.index == props.hoverCompIndex || props.index == props.activeCompIndex) {
        if (core.lockCompId.includes(props.id)) {
          return 'point_active_lock'
        } else {
          return 'point_active'
        }
      }
    })
    return {
      potintActive,
      props,
      lockCompId: core.lockCompId,
      pointStyle,
    }
  },
})
</script>

<style lang="scss" scoped>
.auxiliary_point {
  /* .core_item {
    filter: invert(20%);
  } */
}
.point_active {
  cursor: grab;
  &::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border: 1px solid #2970f6;
  }
  &:active {
    cursor: grabbing;
  }
}
.point_active_lock {
  cursor: not-allowed;
  &::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border: 1px solid red;
  }
}
.point_item {
  width: 6px;
  height: 6px;
  border: 1px solid #2970f6;
  background-color: #fff;
  position: absolute;
  z-index: 1000;
  margin-left: -3px;
  margin-top: -3px;
}
.point_left_top {
  cursor: nw-resize;
  top: 0%;
  left: 0%;
}
.point_left_center {
  cursor: w-resize;
  top: 50%;
  left: 0%;
}
.point_left_buttom {
  cursor: sw-resize;
  top: 100%;
  left: 0%;
}
.point_center_top {
  cursor: n-resize;
  top: 0%;
  left: 50%;
}
.point_center_buttom {
  cursor: s-resize;
  top: 100%;
  left: 50%;
}
.point_right_top {
  cursor: ne-resize;
  top: 0%;
  left: 100%;
}
.point_right_center {
  cursor: e-resize;
  top: 50%;
  left: 100%;
}
.point_right_buttom {
  cursor: se-resize;
  top: 100%;
  left: 100%;
}
</style>
