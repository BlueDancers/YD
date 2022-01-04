<template>
  <div>
    <a-modal :visible="visible" title="创建组织" @cancel="handleCancel" @ok="handleOk">
      <a-form ref="formRef" v-model="formState">
        <a-form-item label="组织名称" v-bind="validateInfos.name">
          <a-input v-model:value="formState.name" placeholder="请输入组织名称" />
        </a-form-item>
        <a-form-item label="路由前缀" v-bind="validateInfos.routerCode">
          <a-input addon-before="/" v-model:value="formState.routerCode" placeholder="请输入路由前缀" />
        </a-form-item>
        <a-form-item label="组织描述" v-bind="validateInfos.disp">
          <a-input v-model:value="formState.disp" placeholder="请输入组织描述" />
        </a-form-item>
        <a-form-item label="组织密码" v-bind="validateInfos.password">
          <a-input v-model:value="formState.password" placeholder="其他成员需要密码才能加入" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { message, Form } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/index'
const useForm = Form.useForm
export default {
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    // 新建组织表单
    const formRef = ref()
    const formState = ref({
      name: '',
      disp: '',
      password: '',
      routerCode: '',
    })
    const rules = reactive({
      name: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
      disp: [{ required: true, message: '请输入路由前缀', trigger: 'blur' }],
      password: [{ required: true, message: '请输入组织描述', trigger: 'blur' }],
      routerCode: [{ required: true, message: '其他成员需要密码才能加入', trigger: 'blur' }],
    })
    const { resetFields, validate, validateInfos } = useForm(formState, rules)
    function handleCancel() {
      emit('handleCancel')
    }
    function handleOk() {
      validate()
        .then(() => {
          emit('handleOk', formState.value)
          resetFields()
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
    return { formState, handleCancel, handleOk, formRef, validateInfos, resetFields }
  },
}
</script>

<style lang="scss" scoped>
</style>