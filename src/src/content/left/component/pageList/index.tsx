import { useCoreStore } from '@/stores/core';
import { defineComponent, onMounted } from 'vue'
import css from './index.module.scss';
import { VueDraggableNext } from 'vue-draggable-next'
export default defineComponent({
  components: {
    draggable: VueDraggableNext,
  },
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
    function dragStart(evt) {

    }
    function dragEnd(evt) {
      core.acPageIndex = evt.newIndex
    }
    function deletePage(index) {
      core.pageData.splice(index, 1)
    }
    function insertPage(index) {
      core.pageData.splice(index, 0, [])
    }
    return () => (
      <div class={css.page_list}>
        <div class={css.add_page_cont}>
          <a-button class={css.add_page} onClick={addPage}>增加页面</a-button>
        </div>

        <div class={css.page_main}>
          <draggable v-model={[core.pageData]} animation={300} onStart={dragStart} onEnd={dragEnd}>
            {
              core.pageData.map((item, index) => (
                <div class={[css.page_item, index == core.acPageIndex ? css.active_item : '']} onClick={() => changePageIndex(index)}>
                  <div class={css.item_index}>{index + 1}</div>
                  <div class={[css.item_core, index == core.acPageIndex ? css.active_core : '']} > </div>
                  {
                    index == core.acPageIndex && (
                      <div class={css.item_action}>
                        {/* <div class={css.action_active}>1</div>
                        <div class={css.action_active}>1</div>
                        <div class={css.action_active}>1</div> */}
                        <div class={css.action_active} onClick={() => deletePage(index)}>
                          <svg-icon class={css.svg_icon} color={'#2970f6'} name="shanchu" />
                        </div>
                        <div class={css.action_active} onClick={() => insertPage(index)}>
                          <svg-icon class={css.svg_icon} color={'#2970f6'} name="plus" />
                        </div>
                      </div>
                    )
                  }
                </div>
              ))
            }
          </draggable>
        </div>
      </div>
    )
  }
})
