import { useCoreStore } from '@/stores/core';
import { useCloud } from '@/utils/Hook/useRequest';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue-demi';

export default defineComponent({
  props: ['pluginVisible'],
  setup(props, { emit }) {
    const core = useCoreStore()
    const pluginName = ref('')

    function handleOk(e) {
      useCloud('pluginList').add({
        pluginName: pluginName.value,
        content: core.carryPageComp.dom[core.activeCompIndex]
      }).then(() => {
        message.success('上传成功')
        emit('changeVisible', false)
      })
    }

    function handleCancel(e) {
      emit('changeVisible', false)
    }

    return () => (
      <a-modal
        v-model={[props.pluginVisible, 'visible']}
        width={"400px"}
        title={"设置组件名称"}
        onOk={(evt) => handleOk(evt)}
        onCancel={(evt) => handleCancel(evt)}
      >
        <a-input v-model={[pluginName.value, 'value']} placeholder={'请输入组件名称'}></a-input>
      </a-modal>
    )
  }
})