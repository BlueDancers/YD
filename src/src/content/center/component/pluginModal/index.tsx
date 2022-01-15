import { useCoreStore } from 'src/store/core';
import { useCloud } from '@/utils/Hook/useRequest';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue-demi';
import domtoimage from 'dom-to-image'
import { deepClone, imgToStorage } from '@/utils/index';
export default defineComponent({
  props: ['pluginVisible'],
  setup(props, { emit }) {
    const core = useCoreStore()
    const pluginName = ref('')

    async function handleOk(e) {
      let dataUrl = await domtoimage.toJpeg(document.querySelector(`.comp_${core.carryComp.id}`), {
        cacheBust: true,
        height: core.carryCss.height,
        width: core.carryCss.width,
        style: {
          left: '0',
          right: '0',
          bottom: '0',
          top: '0',
          transform: 'translate(0%, 0%) scale(1)',
        },
      })
      console.log(dataUrl);
      let url = await imgToStorage(dataUrl, `${core.carryComp.id}_${Date.now()}`, 'pluginImg')
      console.log(url);
      let content = deepClone(core.carryPageComp.dom[core.activeCompIndex])

      delete content.id
      delete content.cssModule.top
      delete content.cssModule.left
      delete content.cssModule['z-index']
      
      await useCloud('pluginList').add({
        pluginName: pluginName.value,
        content,
        thmbImg: url.tempFileURL,
        fileID: url.fileID
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