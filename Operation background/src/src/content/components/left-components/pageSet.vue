<template>
  <div class="page_set">
    <a-form ref="pageRef" :model="pageForm" :rules="pageRules" :label-col="{ style: { width: '80px' } }">
      <a-form-item label="页面名称" name="routerName">
        <a-input class="page_set_input" v-model:value="pageForm.routerName" />
      </a-form-item>
      <a-form-item label="页面路由" name="router">
        <a-input addon-before="/" class="page_set_input" v-model:value="pageForm.router" />
      </a-form-item>
      <a-form-item label="背景颜色">
        <el-color-picker v-model="pageForm.backColor" />
      </a-form-item>
      <a-form-item label="页面描述" name="disp">
        <a-textarea class="page_set_input" v-model:value="pageForm.disp" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="submitpageForm"> 提交 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { computed, defineComponent, reactive, ref, toRaw } from 'vue'
import { cloud } from '@/modules/request'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElColorPicker } from 'element-plus'
export default defineComponent({
  components: {
    ElColorPicker,
  },
  setup() {
    // 统一依赖
    const db = cloud.database()
    const route = useRoute()
    const store = useStore()
    const pageRef = ref()
    let routerName = computed(() => store.state.core.routerName)
    let router = computed(() => store.state.core.router)
    let pageDisp = computed(() => store.state.core.pageDisp)
    let backColor = computed(() => store.state.core.backColor)
    console.log(routerName.value, router.value, pageDisp.value)

    const pageForm = reactive({
      routerName: toRaw(routerName.value),
      router: toRaw(router.value),
      disp: toRaw(pageDisp.value),
      backColor: toRaw(backColor.value),
    })
    const pageRules = {
      router: [{ required: true, message: '请输入路由路径', trigger: 'change' }],
      routerName: [{ required: true, message: '请输入路由名称', trigger: 'change' }],
      disp: [{ required: true, message: '请输入路由描述', trigger: 'change' }],
    }
    // 提交路由信息的表单
    const submitpageForm = () => {
      // toRaw 将响应式对象转化为一个普通JavaScript对象
      pageRef.value
        .validate()
        .then(async () => {
          await db
            .collection('pageList')
            .where({
              _id: route.query.id,
            })
            .update({ ...pageForm })
            .then((res: any) => {
              store.commit('core/change_Temp_other', toRaw(pageForm))
              message.success('修改成功~')
            })
        })
        .catch((error) => {
          console.log('error', error)
          message.error('请完善页面信息')
        })
    }
    return {
      pageRef,
      pageForm,
      pageRules,
      submitpageForm,
    }
  },
})
</script>

<style lang="scss" scoped>
.page_set {
  margin-top: 30px;
  margin-left: 20px;
  .page_set_input {
    width: 140px;
  }
}
</style>
