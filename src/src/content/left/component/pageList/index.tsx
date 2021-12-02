import { useCoreStore } from '@/stores/core';
import { defineComponent, onMounted } from 'vue'
import css from './index.module.scss';

export default defineComponent({
  setup() {
    const core = useCoreStore()
    onMounted(() => {
      console.log(core.pageData);
    })
    function addPage() {
      core.addPage()
    }
    function changePageIndex(index) {
      core.acPageIndex = index
    }
    return () => (
      <div class={css.page_list}>
        <a-button class={css.add_page} onClick={addPage}>增加页面</a-button>
        <div class={css.page_main}>
          {
            core.pageData.map((item, index) => (
              <div class={css.page_item} onClick={() => changePageIndex(index)}>
                {index == core.acPageIndex && <div class={css.page_item_active}></div>}
                <div class={css.item_index}>{index + 1}.</div>
                <div class={css.item_core}> </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
})
