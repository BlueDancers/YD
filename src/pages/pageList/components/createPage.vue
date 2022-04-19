<template>
  <el-dialog v-model="isDialog" title="创建组织" width="500px">
    <el-form class="team_form" :model="formPage" :rules="rules" label-width="120px" ref="createPageRef">
      <el-form-item label="组织名称" prop="title">
        <el-input v-model="formPage.title" placeholder="请输入网页名称" />
      </el-form-item>
      <el-form-item label="路由名称" prop="router">
        <el-input v-model="formPage.router" placeholder="请输入路由名称">
          <template #prepend>/</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { useCloud } from '@/utils/request'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits(['pageInit'])

const isDialog = ref(false)
const createPageRef = ref()
const route = useRoute()
const rules = reactive({
  title: [{ required: true, message: '请输入网页名称', trigger: ['blur', 'change'] }],
  router: [{ required: true, message: '请输入路由名称', trigger: ['blur', 'change'] }],
})

const formPage = ref({
  img: '', // 缩略图
  router: '', // 路由
  title: '', // 网页名称
  organizeId: '', // 组织id
  createTime: '', // 创建时间
})

function onSubmit() {
  createPageRef.value.validate((valid) => {
    if (valid) {
      useCloud('pageList')
        .add({
          img: formPage.value.img,
          router: formPage.value.router,
          title: formPage.value.title,
          organizeId: String(route.params.groupId),
          createTime: new Date().getTime(),
        })
        .then((res) => {
          ElMessage.success('创建成功~')
          emit('pageInit')
          createPageRef.value.resetFields()
          close()
        })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

function open() {
  isDialog.value = true
}

function close() {
  createPageRef.value.resetFields()
  isDialog.value = false
}
defineExpose({
  open,
  close,
})
</script>

<style lang="less" scoped>
.create_page {
}
</style>
