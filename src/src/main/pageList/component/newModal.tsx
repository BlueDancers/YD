import { useCloud } from '@/utils/Hook/useRequest'
import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  props: ['showNewModal'],
  setup(props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const newPageRef = ref()
    const newPageState = reactive({
      routerName: '', // 自定义网页名称
      router: '', // 自定义路由名称
      pageType: '1', // 1 长单页模式 2 滑动页模式
      disp: '', // 描述字段
    })
    const rules = {
      routerName: [{ required: true, message: '请输入页面名称', trigger: 'blur' }],
      router: [{ required: true, message: '请输入页面路径', trigger: 'blur' }],
      pageType: [{ required: true, message: '请选择页面类型', trigger: 'blur' }],
      disp: [{ required: true, message: '请输入页面详情', trigger: 'blur' }],
    }
    /**
    * 新建页面
    */
    const newPage = async () => {
      newPageRef.value
        .validate()
        .then(async () => {
          let listRes: any = await useCloud('pageList').add({
            organizeId: route.query.id, // 群组id
            tumbUrl: [], // 缩略图(存在多个)
            backColor: '#ffffff',
            height: 570,
            ...newPageState,
          })
          console.log('页面数据填充完成')
          await useCloud('pageDetails').add({
            pageId: listRes.id,
            content: [],
          })
          console.log('装修数据填充完成')
          router.push({
            name: 'content',
            query: {
              id: listRes.id,
            },
          })
        })
        .catch((error) => {
          console.log('error', error)
        })

    }
    // 关闭弹窗
    function closeModal() {
      emit('closeModal')
    }
    return () => (
      <a-modal
        v-model={[props.showNewModal, 'visible']}
        title={"新建页面"}
        onOk={newPage}
        onCancel={closeModal}
      >
        <a-form ref={newPageRef} model={newPageState}>
          <a-form-item label={"页面名称"} name={'routerName'} rules={rules.routerName}>
            <a-input placeholder={"请输入页面名称"} v-model={[newPageState.routerName, 'value']} />
          </a-form-item>
          <a-form-item label="页面路径" name="router" rules={rules.router}>
            <a-input addon-before="/" placeholder="请输入页面路径" v-model={[newPageState.router, 'value']} />
          </a-form-item>
          <a-form-item label="页面类型" name="pageType" rules={rules.pageType}>
            <a-radio-group v-model={[newPageState.pageType, 'value']}>
              <a-radio value={'1'}>长页面</a-radio>
              <a-radio value={'2'}>滚动页</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="页面描述" name="disp" rules={rules.disp}>
            <a-textarea placeholder="请输入页面描述" v-model={[newPageState.disp, 'value']} />
          </a-form-item>
        </a-form>
      </a-modal>
    )
  }
})