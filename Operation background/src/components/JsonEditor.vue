<template>
  <div class="editr" ref="dom"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick, onBeforeUnmount } from 'vue'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'

export default defineComponent({
  props: {
    modelValue: {
      default: '',
      type: String,
    },
    codeType: {
      default: 'json',
      type: String,
    },
    format: {
      default: true,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    let dom = ref()
    let instance: any = ref('')
    ;(self as any).MonacoEnvironment = {
      getWorker(workerId, label) {
        if (label === 'json') {
          return new JsonWorker()
        } else if (label === 'html') {
          return new HtmlWorker()
        } else if (label === 'css') {
          return new CssWorker()
        }
        return new EditorWorker()
      },
    }
    onMounted(() => {
      const jsonModel = monaco.editor.createModel(
        props.modelValue,
        props.codeType
        // monaco.Uri.parse('json://grid/settings.json')
      )
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
        if (props.format) {
          setTimeout(() => {
            instance.getAction(['editor.action.formatDocument']).run()
          }, 200)
        }
      })
    })
    onBeforeUnmount(() => {
      console.log('卸载函数')
      instance.dispose()
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
