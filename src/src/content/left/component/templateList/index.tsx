import { useAppStore } from '@/store/app';
import { useCoreStore } from '@/store/core';
import { useCloud } from '@/utils/Hook/useRequest';
import { defineComponent, onMounted, Ref, ref } from 'vue-demi';
import css from './index.module.scss';

export default defineComponent({
  setup() {
    const core = useCoreStore()
    const app = useAppStore()
    const activeKey = ref(1)
    const currentPage = ref(1)
    const tempList: Ref<any[]> = ref([]) // 列表数据
    const isMore = ref(false) // 是否更多
    onMounted(() => {
      // 获取组件市场数据
      resetInit()
      init()
    })
    function resetInit() {
      currentPage.value = 1
      tempList.value = []
      isMore.value = false
    }
    // 初始化
    function init() {
      let request
      if (activeKey.value == 1) {
        request = useCloud('templateList')
      } else {
        request = useCloud('templateList').where({
          _openid: app.userData.uid
        })
      }
      request.skip((currentPage.value - 1) * 10)
        .limit(10)
        .get()
        .then((res) => {
          console.log('请求完成', res.data);
          tempList.value = tempList.value.concat(res.data)
          isMore.value = res.data.length == 10
        })
    }
    function nextInit() {
      currentPage.value += 1
      init()
    }
    // 切换tab
    function changeTab() {
      resetInit()
      init()
    }
    // 删除单个
    function deleteItem(data, index) {
      useCloud('templateList').doc(data._id).remove().then(res => {
        tempList.value.splice(index, 1)
      })
    }

    return () => (
      <div class={css.template_list}>
        <a-tabs v-model={[activeKey.value, 'activeKey']} onChange={changeTab}>
          <a-tab-pane key={1} tab={"全部页面"}>
            {pluginItem({ tempList, core, isMore, isMy: false }, { deleteItem, nextInit })}
          </a-tab-pane>
          <a-tab-pane key={2} tab={"我的页面"}>
            {pluginItem({ tempList, core, isMore, isMy: true }, { deleteItem, nextInit })}
          </a-tab-pane>
        </a-tabs>

      </div>
    )
  }
})

// 列表数据
function pluginItem({ tempList, core, isMore, isMy }, { deleteItem, nextInit }) {
  return (
    <div class={css.temp_list_cont}>
      <div class={css.temp_list}>
        {
          tempList.value.map((e, index) => (
            <div class={css.cont_item}>
              {
                // 删除
                isMy && <a-popconfirm
                  title="删除该组件后,将会从组件市场消失"
                  ok-text="确认"
                  cancel-text="取消"
                  onConfirm={() => deleteItem(e, index)}
                >
                  <div class={css.delete_item_con}>
                    <svg-icon name="shanchu1" />
                  </div>
                </a-popconfirm>
              }
              <img class={css.item_img} src={e.thmbImg}></img>
              <div class={css.temp_btn} onClick={() => core.useTemplate(e.content)}>
                使用组件
              </div>
            </div>
          ))
        }
      </div>
      {
        isMore.value ?
          <a-button type={"primary"} class={css.more_btn} onClick={nextInit}>加载更多</a-button>
          : <p class={css.more_btn}>没有更多数据了~</p>
      }
    </div>
  )
}