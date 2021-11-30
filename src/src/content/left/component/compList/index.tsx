import { defineComponent, ref, reactive } from 'vue'
import css from './index.module.scss';

export default defineComponent({
  setup() {
    const activeKey = ref([1, 2])
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
      // {
      //   icon: 'button',
      //   name: 'y-grid',
      //   title: '网格组件',
      // },
    ])
    function addCon(type) {
      console.log(type);
    }
    function addComp(name) { }
    function dragstart(event, name) {
      event.dataTransfer.setData('compIndex', name)
    }
    return () => (
      <div class={css}>
        <a-collapse v-model={[activeKey.value,'activeKey']} bordered={false}>
          <a-collapse-panel key={1} header="容器列表">
            <div class="contains">
              <div class="add_contains" onClick={() => addCon('default')}>
                <svg-icon class="contains_svg" name="kuaisubuju"></svg-icon>
                <span class="contains_text">通用容器</span>
              </div>
              <div class="add_contains" onClick={() => addCon('flex')}>
                <svg-icon class="contains_svg" name="bianzu"></svg-icon>
                <span class="contains_text">flex容器</span>
              </div>
              <div class="add_contains" onClick={() => addCon('grid')} >
                <svg-icon class="contains_svg" name="grid-wangge"></svg-icon>
                <span class="contains_text">网格容器</span>
              </div >
            </div >
          </a-collapse-panel>
          <a-collapse-panel key="2" header="基础组件">
            <div class="add_div_list">
              {
                compList.value.map((item) => (
                  <div
                    class="list_item"
                    key={item.name}
                    onClick={() => addComp(item.name)}
                    draggable={true}
                    onDragstart={(event) => dragstart(event, item.name)}
                  >
                    <svg-icon class="item_svg" name={item.icon}></svg-icon>
                    <span class="item_text">{item.title}</span>
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