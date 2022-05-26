<template>
  <el-dialog v-model="isDialog" title="创建组织" width="500px">
    <el-form class="team_form" :model="formState" :rules="rules" label-width="120px" ref="ruleFormRef">
      <el-form-item label="组织名称" prop="name">
        <el-input v-model="formState.name" placeholder="请输入组织名称" />
      </el-form-item>
      <el-form-item label="路由前缀" prop="routerCode">
        <el-input v-model="formState.routerCode" placeholder="请输入路由前缀">
          <template #prepend>/</template>
        </el-input>
      </el-form-item>
      <el-form-item label="组织密码" prop="password">
        <el-input v-model="formState.password" placeholder="其他成员需要密码才能加入" />
      </el-form-item>
      <el-form-item label="组织描述" prop="disp">
        <el-input type="textarea" v-model="formState.disp" placeholder="请输入组织描述" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button @click="close">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElDialog, ElForm, ElMessage, ElInput } from 'element-plus'
import { useCloud } from '@/utils/request'
import { getStorageSync } from '@/modules/storage'

const emit = defineEmits(['createInit'])
let userData = getStorageSync('userData') //拿取uid和email

const ruleFormRef = ref<any>()
const rules = reactive({
  name: [{ required: true, message: '请输入组织名称', trigger: ['blur', 'change'] }],
  disp: [{ required: true, message: '请输入组织描述', trigger: ['blur', 'change'] }],
  password: [{ required: true, message: '其他成员需要密码才能加入', trigger: ['blur', 'change'] }],
  routerCode: [{ required: true, message: '请输入路由前缀', trigger: ['blur', 'change'] }],
})

//表单数据
const formState = ref({
  name: '',
  disp: '',
  password: '',
  routerCode: '',
})

//弹框是否打开
const isDialog = ref(false)

//提交
function onSubmit() {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      useCloud('organize')
        .add({
          founderName: userData.email,
          founderUser: [],
          organizeName: formState.value.name,
          organizeDisp: formState.value.disp,
          routerCode: formState.value.routerCode,
          password: formState.value.password,
        })
        .then((res) => {
          ElMessage.success('创建成功~')
          emit('createInit')
          ruleFormRef.value.resetFields()
          close()
        })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

//打开
function open() {
  isDialog.value = true
}

//关闭
function close() {
  ruleFormRef.value.resetFields()
  isDialog.value = false
}

defineExpose({
  open,
  close,
})
</script>

<style lang="less">
.team_form {
  .el-input {
    width: 300px;
  }
}
</style>
