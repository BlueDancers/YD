<template>
  <div class="editr" ref="dom"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick } from 'vue'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'

export default defineComponent({
  props: {
    modelValue: {
      default: '',
      type: String,
    },
  },
  setup(props, { emit }) {
    let dom = ref()
    let instance: any = ''
    ;(self as any).MonacoEnvironment = {
      getWorker(workerId, label) {
        if (label === 'json') {
          return new JsonWorker()
        }
        return new EditorWorker()
      },
    }
    onMounted(() => {
      const jsonModel = monaco.editor.createModel(
        props.modelValue,
        'json',
        monaco.Uri.parse('json://grid/settings.json')
      )
      console.log(jsonModel, props.modelValue)

      instance = monaco.editor.create(dom.value, {
        model: jsonModel,
        tabSize: 2,
        automaticLayout: true,
        scrollBeyondLastLine: true,
        minimap: {
          enabled: false,
        },
        lineNumbers: 'off',
      })
      instance.onDidChangeModelContent(() => {
        const value = instance.getValue()
        emit('changeData', value)
      })
      nextTick(() => {
        instance.getAction(['editor.action.formatDocument'])
      })
    })

    return {
      dom,
    }
  },
})
</script>

<style lang="scss" scoped>
.editr {
  height: 500px;
}
</style>
