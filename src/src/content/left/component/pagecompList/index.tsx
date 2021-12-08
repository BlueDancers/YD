import { compNameObj } from '@/modules/components';
import { useCoreStore } from '@/stores/core';
import { defineComponent } from 'vue-demi';
import css from './index.module.scss';
export default defineComponent({
  setup() {
    let core = useCoreStore()
    function toggleComp(index) {
      core.activeCompIndex = index
    }
    function mouseOver(evt, idx) {
      core.hoverCompIndex = idx
      evt.preventDefault()
    }
    return () => (
      <a-list
        class={css.page_comp_list}
        size="small"
        bordered
        data-source={core.pageData[core.acPageIndex]}
        renderItem={(item) => (
          <a-list-item
            class={[css.list_item, item.index == core.activeCompIndex ? css.active_list_item : '']}
            onClick={() => toggleComp(item.index)}
            onMouseover={evt => mouseOver(evt, item.index)}
          >
            {compNameObj(item.item.name)}
          </a-list-item>
        )}
      >
      </a-list>
    )
  }
})