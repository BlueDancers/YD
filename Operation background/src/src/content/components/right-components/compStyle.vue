<template>
  <div class="comp_style">
    <a-form v-if="contCss != null" :label-col="{ style: { width: '80px' } }">
      <a-form-item label="开发模式">
        <a-radio-group v-model:value="toggleModal">
          <a-radio-button value="1">快捷模式</a-radio-button>
          <a-radio-button value="2">源码模式</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <template v-if="toggleModal == '1'">
        <a-form-item label="快捷布局" v-if="activeCont.cssModule.display == 'block'">
          <div class="fast_layout">
            <AlignLeftOutlined class="layout_item" @click="fastLayout('left')" />
            <AlignCenterOutlined class="layout_item" @click="fastLayout('center')" />
            <AlignRightOutlined class="layout_item" @click="fastLayout('right')" />
          </div>
        </a-form-item>
        <a-collapse v-model:activeKey="activeKey">
          <a-collapse-panel :key="1" header="布局设置" :show-arrow="false">
            <a-form-item label="尺寸">
              <a-input class="default_input" addon-before="宽" v-model:value="contCss.width" />
              <a-input class="default_input" addon-before="高" v-model:value="contCss.height" />
            </a-form-item>
            <a-form-item label="外边距">
              <a-input class="default_input" addon-before="上" v-model:value="contCss['margin-top']" />
              <a-input class="default_input" addon-before="下" v-model:value="contCss['margin-bottom']" />
              <a-input class="default_input" addon-before="左" v-model:value="contCss['margin-left']" />
              <a-input class="default_input" addon-before="右" v-model:value="contCss['margin-right']" />
            </a-form-item>
            <a-form-item label="内边距">
              <a-input class="default_input" addon-before="上" v-model:value="contCss['padding-top']" />
              <a-input class="default_input" addon-before="下" v-model:value="contCss['padding-bottom']" />
              <a-input class="default_input" addon-before="左" v-model:value="contCss['padding-left']" />
              <a-input class="default_input" addon-before="右" v-model:value="contCss['padding-right']" />
            </a-form-item>
            <a-form-item label="层级" v-if="contCss['z-index'] != null">
              <a-input-number class="default_input" :min="0" v-model:value="contCss['z-index']" />
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel :key="2" header="样式设置" :show-arrow="false">
            <a-form-item label="背景颜色" v-if="contCss['background-color'] != null">
              <el-color-picker v-model="contCss['background-color']" />
            </a-form-item>
            <a-form-item label="边框" v-if="contCss['border-width'] != null">
              <div class="border_cont">
                <a-input class="mini_input" v-model:value="contCss['border-width']" />
                <a-select v-model:value="contCss['border-style']" style="width: 80px">
                  <a-select-option v-for="item in borderStyleList" :key="item.key" :value="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
                <el-color-picker class="color_picker" v-model="contCss['border-color']" />
              </div>
            </a-form-item>
            <a-form-item label="圆角" v-if="contCss['border-radius'] != null">
              <a-input-number class="default_input" :min="0" v-model:value="contCss['border-radius']" />
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel :key="3" header="文字设置" :show-arrow="false">
            <a-form-item label="字体颜色" v-if="contCss.color != null">
              <el-color-picker v-model="contCss.color" />
            </a-form-item>
            <a-form-item label="字号" v-if="contCss['font-size'] != null">
              <a-input-number class="default_input" :min="0" v-model:value="contCss['font-size']" />
            </a-form-item>
            <a-form-item label="字重" v-if="contCss['font-weight'] != null">
              <a-select v-model:value="contCss['font-weight']" style="width: 120px">
                <a-select-option v-for="item in fontWeightList" :key="item.key" :value="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="文字居中" v-if="contCss['text-align'] != null">
              <a-select v-model:value="contCss['text-align']" style="width: 120px">
                <a-select-option v-for="item in fontAlignList" :key="item.key" :value="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>

        <!-- <a-form-item label="网格-行设置" v-if="contCss['grid-template-columns'] != null">
          <a-input class="big_input" v-model:value="contCss['grid-template-columns']" />
        </a-form-item>
        <a-form-item label="网格-列设置" v-if="contCss['grid-template-rows'] != null">
          <a-input class="big_input" v-model:value="contCss['grid-template-rows']" />
        </a-form-item>
        <a-form-item label="网格-行间距" v-if="contCss['grid-column-gap'] != null">
          <a-input class="big_input" v-model:value="contCss['grid-column-gap']" />
        </a-form-item>
        <a-form-item label="网格-列间距" v-if="contCss['grid-row-gap'] != null">
          <a-input class="big_input" v-model:value="contCss['grid-row-gap']" />
        </a-form-item> -->
      </template>
      <json-editor
        v-if="toggleModal == '2'"
        :modelValue="JSON.stringify(contCss)"
        @changeData="changeCompData"
      ></json-editor>
    </a-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { borderStyleList, fontWeightList, fontAlignList } from '../common/selectData'
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined } from '@ant-design/icons-vue'
import JsonEditor from '@/components/JsonEditor.vue'
import { message } from 'ant-design-vue'
import useRightData from './common/commonData'
import { ElColorPicker } from 'element-plus'
export default defineComponent({
  components: {
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
    JsonEditor,
    ElColorPicker,
  },
  setup() {
    const toggleModal = ref('1')
    const activeKey = ref(1)
    const store = useStore()
    const rightData = useRightData()
    let coordinate = computed(() => store.state.core.coordinate)
    let containerList = computed(() => store.state.core.containerList)
    const contCss = computed({
      get: () => {
        if (coordinate.value.length == 2) {
          return containerList.value[coordinate.value[0]].components[coordinate.value[1]].cssModule
        } else {
          return null
        }
      },
      set: (value) => {},
    })
    watch(
      () => coordinate.value,
      () => {
        toggleModal.value = '1'
      }
    )
    const fastLayout = (type) => {
      store.commit('core/fastCompLayout', type)
    }
    const changeCompData = (value) => {
      try {
        let cssData = JSON.parse(value)
        store.commit('core/setCarryCompData', cssData)
      } catch (error) {
        message.error('请输入正常的json语法')
      }
    }
    return {
      toggleModal,
      activeKey,
      contCss,
      borderStyleList,
      fontWeightList,
      fontAlignList,
      fastLayout,
      changeCompData,
      ...rightData,
    }
  },
})
</script>

<style lang="scss">
.comp_style {
  padding: 0 4px;
  .fast_layout {
    display: flex;
    .layout_item {
      margin: 0 2px;
      padding: 6px;
      font-size: 110%;
      &:hover {
        background-color: #eee;
      }
    }
  }
  .border_cont {
    display: flex;
    align-items: center;
    .color_picker {
      margin-left: 5px;
    }
  }

  .big_input {
    width: 120px;
    margin: 0 2px;
  }
  .big_plus_input {
    width: 200px;
    margin: 0 2px;
  }
  .d_input {
    width: 140px;
    margin: 2px;
  }
  .default_input {
    width: 100px;
    margin: 0 2px;
  }
  .mini_input {
    width: 50px;
    margin: 0 2px;
  }
}
</style>

<style>
.comp_data .ant-form-item {
  margin-bottom: 10px;
}
</style>
