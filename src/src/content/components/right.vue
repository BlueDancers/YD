<template>
  <div class="content_right">
    <a-tabs v-model:activeKey="activeKey" v-if="activeCont">
      <a-tab-pane key="1">
        <template #tab>容器设置</template>
        <cont-style></cont-style>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>组件设置</template>
        <comp-style></comp-style>
      </a-tab-pane>
      <a-tab-pane key="3">
        <template #tab>数据设置</template>
        <comp-data></comp-data>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, effect, ref } from 'vue'
import { useStore } from 'vuex'
import compStyle from './right-components/compStyle.vue'
import contStyle from './right-components/contStyle.vue'
import compData from './right-components/compData.vue'
import CompData from './right-components/compData.vue'

export default defineComponent({
  components: {
    compStyle,
    contStyle,
    compData,
  },
  setup() {
    const activeKey = ref('1')
    const store = useStore()
    const coordinate = computed(() => store.state.core.coordinate)
    const activeCont = computed(() => store.state.core.activeCont)
    effect(() => {
      if (coordinate.value.length == 2) {
        activeKey.value = '2'
      }
      if (coordinate.value.length == 1) {
        activeKey.value = '1'
      }
    })
    return {
      activeCont,
      activeKey,
    }
  },
})
</script>

<style lang="scss" scoped>
.content_right {
  background-color: #f8f9fa;
  width: 340px;
  height: calc(100vh - 50px);
  box-shadow: -2px 0 13px 0 rgb(0 0 0 / 10%);
  .form_con {
    padding-left: 20px;
    .right_wh {
      .right_w {
        width: 60px;
      }
      .right_h {
        width: 60px;
      }
    }
  }
}
</style>
