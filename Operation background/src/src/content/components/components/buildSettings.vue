<template>
  <a-drawer
    class="code_drawer"
    title="生成代码"
    placement="right"
    :closable="false"
    v-model:visible="visible"
    width="720"
    @close="handleCancel"
  >
    <a-form layout="inline">
      <a-form-item label="页面宽度">
        <a-input class="build_input" v-model:value="buildForm.pageWidth"></a-input>
      </a-form-item>
      <a-form-item label="样式单位">
        <a-input class="build_input" v-model:value="buildForm.pageUnit"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="buildCode">生成</a-button>
      </a-form-item>
    </a-form>
    <!-- 代码区域 -->
    <json-editor
      class="editor"
      v-if="code && visible"
      :modelValue="code"
      :codeType="'html'"
      :format="true"
    ></json-editor>
    <div v-show="code != ''">
      <a-button @click="downCode('html')" type="primary">下载HTML</a-button>
    </div>
  </a-drawer>
</template>

<script lang="ts">
import { downFile, jsonToCode } from '@/modules/components/jsonToHtml'
import { computed, defineComponent, reactive, ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import JsonEditor from '@/components/JsonEditor.vue'
export default defineComponent({
  components: {
    JsonEditor,
  },
  setup() {
    let visible = ref<boolean>(false)
    const store = useStore()
    let containerList = computed(() => store.state.core.containerList)
    let buildForm = reactive({
      pageWidth: 750,
      pageUnit: 'px',
    })
    let code = ref('') // 生成的代码
    const handleOk = (e) => {
      visible.value = true
    }
    let handleCancel = () => {
      console.log('环比')
      visible.value = false
      code.value = ''
    }
    // 生成代码
    function buildCode() {
      let html = jsonToCode(toRaw(containerList.value), buildForm.pageWidth, buildForm.pageUnit)
      code.value = html
      console.log(code.value)
    }
    // 下载代码
    function downCode(type) {
      if (type == 'html') {
        downFile(code.value, 'index.html')
      }
    }
    return {
      visible,
      handleOk,
      buildForm,
      handleCancel,
      buildCode,
      code,
      downCode,
    }
  },
})
</script>

<style lang="scss" scoped>
.code_drawer {
  .build_input {
    width: 100px;
  }
  .editor {
    margin: 10px 0;
    height: 700px;
  }
}
</style>
