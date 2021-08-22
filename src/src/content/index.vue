<template>
  <div class="page_content">
    <a-row class="content_header">
      <a-col class="header_left" :span="5">开发工具</a-col>
      <a-col class="header_centent" :span="14">页面设置按钮</a-col>
      <a-col class="header_right" :span="5">
        <a-button>保存</a-button>
      </a-col>
    </a-row>
    <!-- 操作台 -->
    <div class="content_main">
      <page-left></page-left>
      <div class="main_page">
        <div class="main_iframe">
          <draggable v-model="containerList" :animation="300">
            <div
              @click="toggleActive(item)"
              class="contains_item"
              :class="activeCont == item.id ? 'active_cont' : ''"
              :style="resetCss(item.cssModule)"
              v-for="item in containerList"
              :key="item.id"
            >
              <div v-if="item.components.length == 0" class="no_components">点击左侧组件进行添加</div>
              <div v-else>
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <page-right></page-right>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import PageLeft from './components/left.vue'
import PageRight from './components/right.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    PageLeft,
    PageRight,
    draggable: VueDraggableNext,
  },
  setup() {
    const store = useStore()
    let containerList = computed({
      get: () => {
        return store.state.core.containerList
      },
      set: (value) => {
        console.log(value)
        store.commit('core/changeContList', value)
      },
    })
    let activeCont = computed(() => store.state.core.activeCont)
    const resetCss = (data) => {
      const cssData = {}
      for (const key in data) {
        if (['width', 'height'].includes(key)) {
          cssData[key] = `${data[key]}px`
        } else {
          cssData[key] = data[key]
        }
      }
      return cssData
    }
    const toggleActive = (data) => {
      console.log(data.id)
      store.commit('core/toggleActive', data.id)
    }
    return {
      containerList,
      activeCont,
      resetCss,
      toggleActive,
    }
  },
})
</script>

<style lang="scss" scoped>
.page_content {
  .content_header {
    background-color: #f8f9fa;
    height: 50px;
    padding: 0 20px;
    .header_left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .header_centent {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .header_right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .content_main {
    height: calc(100vh - 50px);
    display: flex;
    justify-content: space-between;
    .main_page {
      .main_iframe {
        margin-top: 20px;
        background-color: white;
        width: 375px;
        height: 700px;
        overflow-x: hidden;
        overflow-y: auto;
        .contains_item {
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
  }
}
</style>
