import { compNameObj } from '@/modules/components';
import { useCoreStore } from '@/stores/core';
import { computed, defineComponent, Ref } from 'vue-demi';
import css from './index.module.scss';
import { VueDraggableNext } from 'vue-draggable-next'

export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  setup() {
    let core = useCoreStore()

    function toggleComp(id) {
      core.activeCompIndex = _reverseIndex(id)
    }
    // 设定浮动元素id
    function mouseOver(evt, id) {
      core.hoverCompIndex = _reverseIndex(id)
      evt.preventDefault()
    }
    // 去除浮动元素
    function mouseOut(evt) {
      core.hoverCompIndex = -1
      evt.preventDefault()
    }

    // 获取被翻转后的下标
    function _reverseIndex(id) {
      return core.pageData[core.acPageIndex].findIndex(e => e.id == id)
    }

    // 将dom结构进行翻转
    let reverseData: Ref<any[]> = computed({
      get: () => core.pageData[core.acPageIndex],
      set: val => core.pageData[core.acPageIndex] = val
    })

    function dragStart(evt) {
      // 首先获取
    }
    // 排序层级
    function dragEnd(evt) {
      let carrentComp = core.pageData[core.acPageIndex]
      let afterzIndex = carrentComp[evt.oldIndex].cssModule['z-index']
      let berforzIndex = carrentComp[evt.newIndex].cssModule['z-index']
      carrentComp[evt.oldIndex].cssModule['z-index'] = berforzIndex
      carrentComp[evt.newIndex].cssModule['z-index'] = afterzIndex
    }

    return () => (
      <div class={css.page_comp_list}>
        <div class={css.page_comp}>
          <draggable v-model={[reverseData.value]} animation={300} onStart={dragStart} onEnd={dragEnd}>
            {
              reverseData.value.map((item, i) => (
                <div
                  class={[css.age_comp_item, i == core.activeCompIndex ? css.active_list_item : '']}
                  onClick={() => toggleComp(item.id)}
                  onMouseover={evt => mouseOver(evt, item.id)}
                  onMouseout={evt => mouseOut(evt)}
                >
                  <a-input class={css.item_left} v-model={[item.showTitle, 'value']}></a-input>
                  <div class={css.item_right}>
                    <div onClick={() => core.deleteComp(i)}>删除</div>
                    <div onClick={() => core.lockComp(item.id)}>锁定</div>
                    <div>
                      {item.show && <div onClick={() => core.switchShowComp(i, false)}>显示</div>}
                      {!item.show && <div onClick={() => core.switchShowComp(i, true)}>不显示</div>}
                    </div>
                  </div>
                </div>
              ))
            }
          </draggable>

        </div>
      </div>
    )
  }
})