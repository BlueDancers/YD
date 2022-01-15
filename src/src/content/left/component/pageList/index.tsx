import { pageDataItem, useCoreStore } from '@/store/core';
import { defineComponent, onMounted, ref } from 'vue'
import css from './index.module.scss';
import { VueDraggableNext } from 'vue-draggable-next'
import { useBoardStore } from '@/store/board';

import templateModal from './components/templateModal';
import { deepClone, imgToFile, imgToStorage } from '@/utils/index';

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
    templateModal
  },
  setup() {
    const board = useBoardStore()
    const core = useCoreStore()
    const tempVisible = ref(false)
    onMounted(() => {
      console.log(core.pageData);
    })
    function addPage() {
      core.addPage()
    }
    /**
     * 切换页面
     * @param index 
     */
    async function changePageIndex(item, index) {
      console.log('触发了切换页面?', item);
      if (core.acPageIndex != index) {
        // 存储当前要生成缩略图的下标(本方案不太好用)
        // let oldIndex = deepClone(core.acPageIndex)
        // core.resetCompActive()
        // let file = await imgToFile(board)
        // core.acPageIndex = index
        // let url = await imgToStorage(file, `${board.pageDataId}_thmb&${item.id}&`, 'thmbImg')
        // board.pageDetail.tumbUrl[oldIndex] = url.tempFileURL
        // console.log(board.pageDetail.tumbUrl);


        core.resetCompActive()
        core.acPageIndex = index
      }
    }
    function dragStart(evt) {
      core.resetCompActive()
    }
    function dragEnd(evt) {
      if (core.acPageIndex == evt.oldIndex) {
        core.acPageIndex = evt.newIndex
      } else if (core.acPageIndex == evt.newIndex) {
        core.acPageIndex = evt.oldIndex
      }
    }

    // 删除页面
    function deletePage(index) {
      core.pageData.splice(index, 1)
      if (index == core.pageData.length) {
        core.acPageIndex -= 1
      }
    }

    // 增加页面
    function insertPage(index) {
      core.pageData.splice(index + 1, 0, core.pageDataItem())
    }

    // 保存到模板市场
    function saveToTempLate(index) {
      tempVisible.value = true
    }
    return () => (
      <div class={css.page_list}>
        {
          board.pageDetail.pageType == 2 && (<div class={css.add_page_cont}>
            <a-button class={css.add_page} onClick={addPage} type="primary">增加页面</a-button>
          </div>)
        }
        <draggable class={css.page_main} v-model={[core.pageData]} animation={300} onStart={dragStart} onEnd={dragEnd}>
          {
            core.pageData.map((item, index) => (
              <div
                class={[css.page_item, index == core.acPageIndex ? css.active_item : '']}
                onClick={() => changePageIndex(item, index)}
              >
                <a-input class={css.item_input} v-model={[item.name, 'value']} placeholder={'请输入页面名称'}></a-input>
                {/* <div class={css.item_index}>{item.name}</div> */}
                {/* {
                  board.pageDetail.tumbUrl.filter(e => e.split('&')[1] == item.id).length > 0 ? (
                    <img class={css.item_core} src={board.pageDetail.tumbUrl[index]} />
                  ) : (
                    <div class={[css.item_core, index == core.acPageIndex ? css.active_core : '']} > </div>
                  )
                } */}
                <div class={css.item_action}>
                  <a-popconfirm
                    title="确定删除该页面吗?"
                    ok-text="确认"
                    cancel-text="取消"
                    onConfirm={() => deletePage(index)}
                  >
                    <div class={css.action_active}>
                      <svg-icon class={css.svg_icon} name="shanchu1" />
                    </div>
                  </a-popconfirm>

                  <a-popconfirm
                    title="在当前页面下方增加空白页面"
                    ok-text="确认"
                    cancel-text="取消"
                    onConfirm={() => insertPage(index)}
                  >
                    <div class={css.action_active}>
                      <svg-icon class={css.svg_icon} name="plus" />
                    </div>
                  </a-popconfirm>
                  <a-popover
                    title=""
                    trigger="hover"
                    placement="right"
                    content={
                      <>
                        <span>上传到模板市场</span>
                      </>
                    }>
                    <div class={css.action_active} onClick={() => saveToTempLate(index)}>
                      <svg-icon class={css.svg_icon} name="yunshangchuan" />
                    </div>
                  </a-popover>
                </div>
              </div>
            ))
          }
        </draggable>
        {/* 上传到模板市场 */}
        <template-modal tempVisible={tempVisible.value} onChangeVisible={(params) => tempVisible.value = params}></template-modal>
      </div>
    )
  }
})
