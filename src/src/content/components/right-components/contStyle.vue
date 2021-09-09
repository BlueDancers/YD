<template>
  <div class="form_con">
    <a-form v-if="activeCont.cssModule != null" :label-col="{ style: { width: '80px' } }">
      <a-form-item label="开发模式">
        <a-radio-group v-model:value="toggleModal">
          <a-radio-button value="1">快捷模式</a-radio-button>
          <a-radio-button value="2">源码模式</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <template v-if="toggleModal == '1'">
        <a-form-item label="宽高">
          <div class="right_wh">
            <a-input-number class="default_input" v-model:value="activeCont.cssModule.width" />
            x
            <a-input-number class="default_input" v-model:value="activeCont.cssModule.height" />
          </div>
        </a-form-item>
        <a-form-item label="背景色">
          <input type="color" v-model="activeCont.cssModule['background-color']" />
        </a-form-item>
        <a-form-item label="外边距">
          <a-input-number class="mini_input" v-model:value="activeCont.cssModule['margin-top']" />
          <a-input-number class="mini_input" v-model:value="activeCont.cssModule['margin-bottom']" />
          <a-input-number class="mini_input" v-model:value="activeCont.cssModule['margin-left']" />
          <a-input-number class="mini_input" v-model:value="activeCont.cssModule['margin-right']" />
        </a-form-item>
        <a-form-item label="内边距">
          <a-input-number class="mini_input" v-model:value="activeCont.cssModule['padding-top']" />
          <a-input-number class="mini_input" v-model:value="activeCont.cssModule['padding-bottom']" />
          <a-input-number class="mini_input" v-model:value="activeCont.cssModule['padding-left']" />
          <a-input-number class="mini_input" v-model:value="activeCont.cssModule['padding-right']" />
        </a-form-item>
        <a-form-item label="圆角">
          <a-input-number class="default_input" :min="0" v-model:value="activeCont.cssModule['border-radius']" />
        </a-form-item>
        <a-form-item label="网格-行设置" v-if="activeCont.cssModule['grid-template-columns'] != null">
          <a-input class="big_input" v-model:value="activeCont.cssModule['grid-template-columns']" />
        </a-form-item>
        <a-form-item label="网格-列设置" v-if="activeCont.cssModule['grid-template-rows'] != null">
          <a-input class="big_input" v-model:value="activeCont.cssModule['grid-template-rows']" />
        </a-form-item>
        <a-form-item label="网格-行间距" v-if="activeCont.cssModule['grid-column-gap'] != null">
          <a-input class="big_input" v-model:value="activeCont.cssModule['grid-column-gap']" />
        </a-form-item>
        <a-form-item label="网格-列间距" v-if="activeCont.cssModule['grid-row-gap'] != null">
          <a-input class="big_input" v-model:value="activeCont.cssModule['grid-row-gap']" />
        </a-form-item>
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
import { positionSelect } from '../common/selectData'
import { useRightData } from './common/commonData'
import JsonEditor from '@/components/JsonEditor.vue'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
export default defineComponent({
  components: { JsonEditor },
  setup() {
    const store = useStore()
    const rightData = useRightData()
    const toggleModal = ref('1')
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
      toggleModal,
      changeContData,
    }
  },
})
</script>

<style lang="scss" scoped>
.default_input {
  width: 80px;
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
