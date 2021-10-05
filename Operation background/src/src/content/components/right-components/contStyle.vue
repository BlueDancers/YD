<template>
  <div class="form_con">
    <a-form v-if="activeCont.cssModule != null" :label-col="{ style: { width: '60px' } }">
      <a-form-item label="开发模式" :label-col="{ style: { width: '80px' } }">
        <a-radio-group v-model:value="toggleModal">
          <a-radio-button value="1">快捷模式</a-radio-button>
          <a-radio-button value="2">源码模式</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <template v-if="toggleModal == '1'">
        <a-collapse v-model:activeKey="activeKey">
          <a-collapse-panel :key="1" header="布局设置" :show-arrow="false">
            <a-form-item label="尺寸">
              <a-input class="default_input" addon-before="宽" v-model:value="activeCont.cssModule.width" />
              <a-input class="default_input" addon-before="高" v-model:value="activeCont.cssModule.height" />
            </a-form-item>
            <a-form-item label="外边距">
              <a-input class="default_input" addon-before="上" v-model:value="activeCont.cssModule['margin-top']" />
              <a-input class="default_input" addon-before="下" v-model:value="activeCont.cssModule['margin-bottom']" />
              <a-input class="default_input" addon-before="左" v-model:value="activeCont.cssModule['margin-left']" />
              <a-input class="default_input" addon-before="右" v-model:value="activeCont.cssModule['margin-right']" />
            </a-form-item>
            <a-form-item label="内边距">
              <a-input class="default_input" addon-before="上" v-model:value="activeCont.cssModule['padding-top']" />
              <a-input class="default_input" addon-before="下" v-model:value="activeCont.cssModule['padding-bottom']" />
              <a-input class="default_input" addon-before="左" v-model:value="activeCont.cssModule['padding-left']" />
              <a-input class="default_input" addon-before="右" v-model:value="activeCont.cssModule['padding-right']" />
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel :key="2" header="样式设置" :show-arrow="false">
            <a-form-item label="背景色">
              <input type="color" v-model="activeCont.cssModule['background-color']" />
            </a-form-item>
            <a-form-item label="边框" v-if="activeCont.cssModule['border-width'] != null">
              <a-input class="mini_input" v-model:value="activeCont.cssModule['border-width']" />
              <a-select v-model:value="activeCont.cssModule['border-style']" style="width: 80px">
                <a-select-option v-for="item in borderStyleList" :key="item.key" :value="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
              <input class="mini_input" type="color" v-model="activeCont.cssModule['border-color']" />
            </a-form-item>
            <a-form-item label="圆角1">
              <a-input-number class="big_input" v-model:value="activeCont.cssModule['border-radius']" />
            </a-form-item>
            <a-form-item label="阴影">
              <a-input class="big_plus_input" v-model:value="activeCont.cssModule['box-shadow']" />
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel
            :key="3"
            header="flex容器设置"
            :show-arrow="false"
            v-show="activeCont.cssModule.display == 'flex'"
          >
            <a-form-item label="主轴方向" v-if="activeCont.cssModule['flex-direction'] != null">
              <a-select v-model:value="activeCont.cssModule['flex-direction']" style="width: 120px">
                <a-select-option v-for="item in flexDirectionList" :key="item.key" :value="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="主轴方向" v-if="activeCont.cssModule['flex-wrap'] != null">
              <a-select v-model:value="activeCont.cssModule['flex-wrap']" style="width: 120px">
                <a-select-option v-for="item in flexWrapList" :key="item.key" :value="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="上下排列" v-if="activeCont.cssModule['align-items'] != null">
              <a-select v-model:value="activeCont.cssModule['align-items']" style="width: 120px">
                <a-select-option v-for="item in alignItemsList" :key="item.key" :value="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="左右排列" v-if="activeCont.cssModule['justify-content'] != null">
              <a-select v-model:value="activeCont.cssModule['justify-content']" style="width: 120px">
                <a-select-option v-for="item in justifyContentList" :key="item.key" :value="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel
            :key="4"
            header="网格容器设置"
            :show-arrow="false"
            v-show="activeCont.cssModule.display == 'grid'"
          >
            <a-form-item label="行布局" v-if="activeCont.cssModule['grid-template-columns'] != null">
              <a-input class="big_input" v-model:value="activeCont.cssModule['grid-template-columns']" />
            </a-form-item>
            <a-form-item label="列布局" v-if="activeCont.cssModule['grid-template-rows'] != null">
              <a-input class="big_input" v-model:value="activeCont.cssModule['grid-template-rows']" />
            </a-form-item>
            <a-form-item label="行间距" v-if="activeCont.cssModule['grid-column-gap'] != null">
              <a-input class="big_input" v-model:value="activeCont.cssModule['grid-column-gap']" />
            </a-form-item>
            <a-form-item label="列间距" v-if="activeCont.cssModule['grid-row-gap'] != null">
              <a-input class="big_input" v-model:value="activeCont.cssModule['grid-row-gap']" />
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </template>
      <json-editor
        v-if="toggleModal == '2'"
        :modelValue="JSON.stringify(activeCont.cssModule)"
        @changeData="changeContData"
      ></json-editor>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  positionSelect,
  flexDirectionList,
  justifyContentList,
  alignItemsList,
  flexWrapList,
  borderStyleList,
} from '../common/selectData'
import useRightData from './common/commonData'
import JsonEditor from '@/components/JsonEditor.vue'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
export default defineComponent({
  components: { JsonEditor },
  setup() {
    const store = useStore()
    const rightData = useRightData()
    const toggleModal = ref('1')
    const activeKey = ref(1)
    const changeContData = (value) => {
      try {
        console.log(JSON.parse(value))
        let cssData = JSON.parse(value)
        store.commit('core/setCarryContData', cssData)
      } catch (error) {
        message.error('请输入正常的json语法')
      }
    }
    return {
      ...rightData,
      positionSelect,
      flexDirectionList,
      justifyContentList,
      alignItemsList,
      flexWrapList,
      borderStyleList,
      toggleModal,
      activeKey,
      changeContData,
    }
  },
})
</script>

<style lang="scss" scoped>
.form_con {
  margin: 0 4px;
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
</style>

<style>
.form_con .ant-form-item {
  margin-bottom: 10px;
}
</style>
