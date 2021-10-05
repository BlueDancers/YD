<template>
  <div class="comp_data">
    <a-form v-if="activeComp != null" :label-col="{ style: { width: '80px' } }">
      <a-form-item label="开发模式">
        <a-radio-group v-model:value="toggleModal">
          <a-radio-button value="1">快捷模式</a-radio-button>
          <a-radio-button value="2">源码模式</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <template v-if="toggleModal == '1'">
        <a-form-item label="按钮文字" v-if="activeComp.name == 'y-button'">
          <a-input class="long_input" v-model:value="activeComp.staticData.value" />
        </a-form-item>
        <a-form-item label="图片" v-if="activeComp.name == 'y-img'">
          <upload-img v-model:value="activeComp.staticData.src"></upload-img>
        </a-form-item>
        <a-form-item label="提示文字" v-if="activeComp.name == 'y-input'">
          <a-input class="long_input" v-model:value="activeComp.staticData.placeholder" />
        </a-form-item>
        <a-form-item label="输入类型" v-if="activeComp.name == 'y-input'">
          <a-select v-model:value="activeComp.staticData.type" style="width: 120px">
            <a-select-option v-for="item in inputTypeSelect" :key="item.key" :value="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="输入文字" v-if="activeComp.name == 'y-p'">
          <a-textarea auto-size class="long_input" v-model:value="activeComp.staticData.value" />
        </a-form-item>
        <a-form-item label="点击跳转" v-if="activeComp.staticData.configuration != null">
          <a-input
            placeholder="https://www.baidu.com"
            class="long_input"
            v-model:value="activeComp.staticData.configuration"
          />
        </a-form-item>
      </template>
      <json-editor
        v-if="toggleModal == '2'"
        :modelValue="JSON.stringify(activeComp.staticData)"
        @changeData="changeContData"
      ></json-editor>
    </a-form>
  </div>
</template>

<script lang="ts">
import uploadImg from '@/components/uploadImg.vue'
import { defineComponent, ref } from 'vue'
import useRightData from './common/commonData'
import { inputTypeSelect } from '../common/selectData'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import JsonEditor from '@/components/JsonEditor.vue'
export default defineComponent({
  components: { uploadImg, JsonEditor },
  setup() {
    const store = useStore()
    const rightData = useRightData()
    const toggleModal = ref('1')
    const changeContData = (value) => {
      try {
        console.log(JSON.parse(value))
        let staticData = JSON.parse(value)
        store.commit('core/setCarryStaticData', staticData)
      } catch (error) {
        message.error('请输入正常的json语法')
      }
    }
    return {
      ...rightData,
      inputTypeSelect,
      toggleModal,
      changeContData,
    }
  },
})
</script>

<style lang="scss" scoped>
.comp_data {
  .long_input {
    width: 180px;
  }
}
</style>
