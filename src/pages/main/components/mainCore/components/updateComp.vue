<template>
  <el-dialog v-model="dialogVisible" title="上传到市场" width="500px" :before-close="close">
    <el-form label-width="80px">
      <el-form-item label="组件名称:">
        <el-input v-model="marketForm.compName" class="p_input"></el-input>
      </el-form-item>
      <el-form-item label="是否公开:">
        <el-radio-group v-model="marketForm.isOpen">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="缩略图:">
        <comp-dom @click.prevent="() => {}" :item="marketForm.compData"></comp-dom>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="saveComp">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useMain } from '@/store/main'
import { deepClone } from '@/utils'
import { useCloud } from '@/utils/request'
import { ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import CompDom from './compDom.vue'

const main = useMain()
const dialogVisible = ref(false)

const marketForm = reactive({
  compName: '',
  isOpen: false,
  compData: {} as any,
})

function open(index) {
  dialogVisible.value = true
  marketForm.compName = deepClone(main.template[index].showTitle)
  marketForm.compData = deepClone(main.template[index])
}

function close() {
  dialogVisible.value = false
}

// 保存到数据库
function saveComp() {
  useCloud('pluginList')
    .add({
      content: marketForm.compData, // 组件实例
      compName: marketForm.compName, // 组件名称
      isOpen: marketForm.isOpen, // 是否公开
      createTime: Date.now(), // 发布地址
      organizeId: main.organizeId, // 来自什么组织
    })
    .then((res) => {
      console.log(res)
      ElMessage.success('保存成功')
      close()
    })
}

defineExpose({
  open,
})
</script>

<style lang="less" scoped></style>
