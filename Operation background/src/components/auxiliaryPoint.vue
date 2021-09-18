<template>
  <div class="point_item point_left_top" @mousedown="potintActive(1)"></div>
  <div class="point_item point_left_center" @mousedown="potintActive(2)"></div>
  <div class="point_item point_left_buttom" @mousedown="potintActive(3)"></div>

  <div class="point_item point_center_top" @mousedown="potintActive(4)"></div>
  <div class="point_item point_center_buttom" @mousedown="potintActive(5)"></div>

  <div class="point_item point_right_top" @mousedown="potintActive(6)"></div>
  <div class="point_item point_right_center" @mousedown="potintActive(7)"></div>
  <div class="point_item point_right_buttom" @mousedown="potintActive(8)"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
// 辅助点
export default defineComponent({
  setup() {
    const store = useStore()
    const potintActive = (type) => {
      store.commit('core/pointDataUpdate', type)
      store.commit('core/toggle_mouseType', 3)
    }
    return {
      potintActive,
    }
  },
})
</script>

<style lang="scss" scoped>
.point_item {
  width: 6px;
  height: 6px;
  border: 1px solid #2970f6;
  border-radius: 100%;
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
