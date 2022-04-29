<template>
  <el-dialog v-model="dialogVisible" title="上传到市场" width="30%" :before-close="close">
    <el-form>
      <el-form-item label="组件名称:">
        <el-input v-model="marketForm.compName"></el-input>
      </el-form-item>
      <el-form-item label="是否公开组件:">
        <el-radio-group v-model="marketForm.isOpen">
          <el-radio :label="3">是</el-radio>
          <el-radio :label="6">否</el-radio>
          <el-radio :label="9">Option C</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="组件:"></el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="close">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const dialogVisible = ref(false)

const marketForm = reactive({
  compName: '',
  isOpen: false,
  compData: '',
})

function open() {
  dialogVisible.value = true
}

function close() {
  dialogVisible.value = false
}

defineExpose({
  open,
})
</script>

<style scoped></style>
