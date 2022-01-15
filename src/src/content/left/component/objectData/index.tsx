import { defineComponent, ref } from 'vue';
import { ElColorPicker } from 'element-plus'
import css from './index.module.scss';
import { useBoardStore } from '@/store/board';
import { message } from 'ant-design-vue';
import { useCloud } from '@/utils/Hook/useRequest';

export default defineComponent({
  components: {
    ElColorPicker
  },
  setup() {
    let board = useBoardStore()
    let pageRef = ref()
    let { pageDetail } = board

    const pageRules = {
      router: [{ required: true, message: '请输入路由路径', trigger: 'change' }],
      routerName: [{ required: true, message: '请输入路由名称', trigger: 'change' }],
      disp: [{ required: true, message: '请输入路由描述', trigger: 'change' }],
    }

    function submitpageForm() {
      pageRef.value
        .validate()
        .then(() => {
          // 更新页面数据
          useCloud('pageList').doc(pageDetail._id).update({
            router: pageDetail.router,
            routerName: pageDetail.routerName,
            disp: pageDetail.disp,
            backColor: pageDetail.backColor,
          }).then(res => {
            console.log(res);
            message.success('数据更新成功')
          })
        })
        .catch((error) => {
          console.log(error);
          message.error('请完善页面信息', error)
        })

    }
    return () => (
      <div class={css.object_data}>
        <a-form ref={(ref) => { pageRef.value = ref }} model={[pageDetail]} rules={pageRules} label-col={{ style: { width: '80px' } }}>
          <a-form-item label="页面名称" name={pageRules.routerName}>
            <a-input class={css.page_set_input} v-model={[pageDetail.routerName, 'value',['trim']]} />
          </a-form-item>
          <a-form-item label="页面路由" name={pageRules.router}>
            <a-input addon-before="/" class={css.page_set_input} v-model={[pageDetail.router, 'value']} />
          </a-form-item>
          <a-form-item label="背景颜色">
            <el-color-picker show-alpha v-model={[pageDetail.backColor]} />
          </a-form-item>
          <a-form-item label="页面描述" name={pageRules.disp}>
            <a-textarea class={css.page_set_input} v-model:value={[pageDetail.disp, 'value']} />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" onClick={submitpageForm}>提交</a-button>
          </a-form-item>
        </a-form >
      </div >
    )
  }
})