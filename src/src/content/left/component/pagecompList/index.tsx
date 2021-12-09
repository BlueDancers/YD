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
      let addZindex = 0
      if (evt.oldIndex > evt.newIndex) {
        addZindex = -(evt.newIndex + 1)
      } else {
        addZindex = (evt.newIndex + 1)
      }
      core.pageData[core.acPageIndex][evt.newIndex].cssModule['z-index'] += addZindex
      // 更新到最新的下标
      core.activeCompIndex = evt.newIndex
    }

    function svgStyle(index) {
      return { width: '18px', height: '18px', color: index == core.activeCompIndex ? '#2970f6' : '' }
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
                    <svg-icon class={css.svg_icon} onClick={() => core.deleteComp(i)} style={svgStyle(i)} name="shanchu1" />
                    <>
                      {!core.lockCompId.includes(item.id) && <svg-icon class={css.svg_icon} onClick={() => core.lockComp(item.id, true)} style={svgStyle(i)} name="unlock" />}
                      {core.lockCompId.includes(item.id) && <svg-icon class={css.svg_icon} onClick={() => core.lockComp(item.id, false)} style={svgStyle(i)} name="lock" />}
                    </>
                    <>
                      {!item.show && <svg-icon class={css.svg_icon} onClick={() => core.switchShowComp(i, true)} style={svgStyle(i)} name="yincang" />}
                      {item.show && <svg-icon class={css.svg_icon} onClick={() => core.switchShowComp(i, false)} style={svgStyle(i)} name="xianshi" />}
                    </>
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