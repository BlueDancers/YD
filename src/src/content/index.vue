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
      <div class="main_page" @click="clearActive">
        <div class="main_iframe">
          <draggable v-model="containerList" :animation="300" handle=".active_handle">
            <div
              @click.stop="toggleActive(item)"
              class="contains_item"
              :class="activeCont == item.id ? 'active_cont' : ''"
              :style="resetCss(item.cssModule)"
              v-for="item in containerList"
              :key="item.id"
            >
              <InsertRowLeftOutlined class="active_handle"></InsertRowLeftOutlined>
              <div v-if="item.components.length == 0" class="no_components">
                <button class="test">{{ item.id }}</button>
              </div>
              <template v-else>
                <template v-for="comp in item.components" :key="comp.id">
                  <component
                    :is="comp.name"
                    :cssModule="comp.cssModule"
                    :staticData="comp.staticData"
                    :configuration="comp.configuration"
                    :componentId="comp.id"
                    :activeCont="activeCont"
                  ></component>
                </template>
              </template>
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
import { InsertRowLeftOutlined } from '@ant-design/icons-vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { useStore } from 'vuex'
import { resetCss } from '@/utils/index'
import YButton from './comp/YButton.vue'

export default defineComponent({
  components: {
    PageLeft,
    PageRight,
    draggable: VueDraggableNext,
    InsertRowLeftOutlined,
    YButton,
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

    const toggleActive = (data) => {
      store.commit('core/toggleActive', data.id)
    }
    const clearActive = () => {
      console.log('触发')

      store.commit('core/toggleActive', null)
    }
    return {
      containerList,
      activeCont,
      resetCss,
      toggleActive,
      clearActive,
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
  }
  .no_components {
    position: absolute;
    .test {
      position: absolute;
      z-index: 10;
      top: 0px;
      left: 0px;
    }
  }
}
</style>
