import { useCoreStore } from '@/store/core';
import { useCloud } from '@/utils/Hook/useRequest';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue-demi';
import { deepClone, imgToFile, imgToStorage } from '@/utils/index';
import { useBoardStore } from '@/store/board';
import { useAppStore } from '@/store/app';

export default defineComponent({
  props: ['tempVisible'],
  setup(props, { emit }) {
    const app = useAppStore()
    const core = useCoreStore()
    const board = useBoardStore()
    const templateName = ref('')

    async function handleOk(e) {
      core.resetCompActive()
      let dataUrl = await imgToFile(board)
      let url = await imgToStorage(dataUrl, `templateImg_${Date.now()}`, 'templateImg')
      let content = deepClone(core.carryPageComp)
      console.log(content);
      await useCloud('templateList').add({
        pluginName: templateName.value,
        content: content.dom,
        thmbImg: url.tempFileURL,
        fileID: url.fileID,
        author: app.userData.email
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
        v-model={[props.tempVisible, 'visible']}
        width={"400px"}
        title={"上传到模板市场"}
        onOk={(evt) => handleOk(evt)}
        onCancel={(evt) => handleCancel(evt)}
      >
        <a-input v-model={[templateName.value, 'value']} placeholder={'请输入页面名称'}></a-input>
      </a-modal>
    )
  }
})