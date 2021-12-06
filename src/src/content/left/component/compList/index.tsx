import { baseComList } from '@/modules/components';
import { useCoreStore } from '@/stores/core';
import { defineComponent, ref, reactive } from 'vue'
import css from './index.module.scss';

export default defineComponent({
  setup() {
    let core = useCoreStore()
    const activeKey = ref([2])
    const compList = ref([
      {
        icon: 'wenben',
        name: 'y-div',
        title: '模块',
      },
      {
        icon: 'button',
        name: 'y-button',
        title: '按钮',
      },
      {
        icon: 'tupian',
        name: 'y-img',
        title: '图片',
      },
      {
        icon: 'wenben',
        name: 'y-p',
        title: '文字',
      },
    ])
    /**
     * 增加元素
     * @param name 组件名称
     */
    function addComp(name: string) {
      core.addComp(name)
    }
    /**
     * 拖拽增加组件
     * @param event 
     * @param name 
     */
    function dragstart(event, name) {
      event.dataTransfer.setData('compIndex', name)
    }
    return () => (
      <div class={css.add_components}>
        <a-collapse class={css['ant-collapse']} v-model={[activeKey.value, 'activeKey']} bordered={false}>
          <a-collapse-panel key={2} header="基础组件">
            <div class={css.add_div_list}>
              {
                compList.value.map((item) => (
                  <div
                    class={css.list_item}
                    key={item.name}
                    onClick={() => addComp(item.name)}
                    draggable={true}
                    onDragstart={(event) => dragstart(event, item.name)}
                  >
                    <svg-icon class={css.item_svg} name={item.icon}></svg-icon>
                    <span class={css.item_text}>{item.title}</span>
                  </div>
                ))
              }
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div >
    )
  },
})