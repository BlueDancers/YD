<template>
  <a-modal v-model:visible="visible" title="生成代码设置" @ok="handleOk">
    <a-form>
      <a-form-item label="页面宽度">
        <a-input v-model:value="buildForm.pageWidth"></a-input>
      </a-form-item>
      <a-form-item label="样式单位">
        <a-input v-model:value="buildForm.pageUnit"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { jsonToVue } from '@/modules/components'
import { computed, defineComponent, reactive, ref, toRaw } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    let visible = ref<boolean>(false)
    const store = useStore()
    let containerList = computed(() => store.state.core.containerList)
    let buildForm = reactive({
      pageWidth: 750,
      pageUnit: 'px',
    })
    const handleOk = (e) => {
      visible.value = false
      jsonToVue(toRaw(containerList.value), buildForm.pageWidth, buildForm.pageUnit)
    }
    let toggleVisble = () => {
      visible.value = !visible.value
    }
    return {
      visible,
      handleOk,
      buildForm,
      toggleVisble,
    }
  },
})
</script>

<style scoped></style>
