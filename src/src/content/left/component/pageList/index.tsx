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
        <div class={css.add_page_cont}>
          <a-button class={css.add_page} onClick={addPage}>增加页面</a-button>
        </div>

        <div class={css.page_main}>
          {
            core.pageData.map((item, index) => (
              <div class={[css.page_item, index == core.acPageIndex ? css.active_item : '']} onClick={() => changePageIndex(index)}>
                {/* {index == core.acPageIndex && <div class={css.page_item_active}></div>} */}
                <div class={css.item_index}>{index + 1}</div>
                <div class={[css.item_core, index == core.acPageIndex ? css.active_core : '']} > </div>
                {
                  index == core.acPageIndex && (
                    <div class={css.item_action}>
                      <div class={css.action_active}>1</div>
                      <div class={css.action_active}>1</div>
                      <div class={css.action_active}>1</div>
                      <div class={css.action_active}>1</div>
                      <div class={css.action_active}>1</div>
                    </div>
                  )
                }

              </div>
            ))
          }
        </div>
      </div>
    )
  }
})
