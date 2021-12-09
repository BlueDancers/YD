import { compNameObj } from '@/modules/components';
import { useCoreStore } from '@/stores/core';
import { computed, defineComponent } from 'vue-demi';
import css from './index.module.scss';
import { VueDraggableNext } from 'vue-draggable-next'

export default defineComponent({
  setup() {
    let core = useCoreStore()

    function toggleComp(id) {
      core.activeCompIndex = _reverseIndex(id)
    }
    function mouseOver(evt, id) {
      core.hoverCompIndex = _reverseIndex(id)
      evt.preventDefault()
    }

    // 获取被翻转后的下标
    function _reverseIndex(id) {
      return core.pageData[core.acPageIndex].findIndex(e => e.id == id)
    }

    // 将dom结构进行翻转
    let reverseData = computed(() => {
      return core.pageData[core.acPageIndex].slice().reverse()
    })

    return () => (
      <a-list
        class={css.page_comp_list}
        size="small"
        bordered
        data-source={reverseData.value}
        renderItem={(item) => (
          <a-list-item
            class={[css.list_item, reverseData.value.length - item.index - 1 == core.activeCompIndex ? css.active_list_item : '']}
            onClick={() => toggleComp(item.item.id)}
            onMouseover={evt => mouseOver(evt, item.item.id)}
          >
            {compNameObj(item.item.name)}
          </a-list-item>
        )}
      >
      </a-list>
    )
  }
})