import { useAppStore } from '@/stores/app';
import { useCoreStore } from '@/stores/core';
import { defineComponent, onMounted, ref } from 'vue-demi';
import css from './index.module.scss';

export default defineComponent({
  setup() {
    const core = useCoreStore()
    const app = useAppStore()
    const activeKey = ref(1)
    const tempList = ref([]) // 列表数据
    const isMore = ref(false) // 是否更多
    onMounted(() => {
      // 获取组件市场数据
    })
    // 切换tab
    function changeTab() {

    }
    // 删除单个
    function deleteItem() {

    }

    return () => (
      <div class={css.template_list}>
        <a-tabs v-model={[activeKey.value, 'activeKey']} onChange={changeTab}>
          <a-tab-pane key={1} tab={"全部页面"}>
            {pluginItem({ tempList, core, isMore, isMy: false }, { deleteItem })}
          </a-tab-pane>
          <a-tab-pane key={2} tab={"我的页面"}>
            {pluginItem({ tempList, core, isMore, isMy: true }, { deleteItem })}
          </a-tab-pane>
        </a-tabs>

      </div>
    )
  }
})

// 列表数据
function pluginItem({ }, { deleteItem }) {
  return (
    <div class={css.plugin_list_cont}>未做</div>
  )
}