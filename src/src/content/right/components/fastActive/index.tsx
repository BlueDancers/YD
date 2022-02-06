import { useBoardStore } from '@/store/board';
import { useCoreStore } from '@/store/core';
import { useOtherStore } from '@/store/other';
import { numberFun } from '@/utils/index';
import { defineComponent, reactive, ref } from 'vue-demi';
import css from './index.module.scss';
import pluginModal from '@/src/content/components/pluginModal/index';
import templateModal from '@/src/content/components/templateModal';
import { message } from 'ant-design-vue';

export default defineComponent({
  components: {
    pluginModal,
    templateModal
  },
  setup() {
    const core = useCoreStore()
    const other = useOtherStore()
    const board = useBoardStore()

    const pluginVisible = ref(false) // 插件市场
    const tempVisible = ref(false) // 模板市场

    const activeList = reactive([
      {
        icon: 'chexiao',
        labelValue: '撤销上一步',
        fun: () => core.revoke()
      },
      {
        icon: 'bianzu1',
        labelValue: '恢复撤销',
        fun: () => core.recovery()
      },
      {
        icon: 'shanchu3',
        labelValue: '删除组件',
        fun: () => core.deleteComp(core.activeCompIndex)
      },
      {
        icon: 'fuzhi1',
        labelValue: '复制组件',
        fun: () => other.pushData()
      },
      {
        icon: 'niantie1',
        labelValue: '粘贴组件',
        fun: () => other.pasteComp()
      },
      {
        icon: 'shangchuan',
        labelValue: '上传选中组件到组件市场',
        fun: () => openPlugin()
      },
      {
        icon: 'shangchuan',
        labelValue: '上传当前页面到模板市场',
        fun: () => openTemp()
      },
    ])

    /**
     * 打开组件市场弹窗
     */
    function openPlugin() {
      console.log(core.activeCompIndex);
      if (core.activeCompIndex == -1) {
        message.warn('请选择组件')
        return
      }
      pluginVisible.value = true
    }
    /**
    * 打开组件市场弹窗
    */
    function openTemp() {
      tempVisible.value = true
    }

    return () => (
      <div class={css.fast_active}>
        {/* 撤销 */}
        {/* 恢复 */}
        {/* 删除 */}
        {/* 复制 */}
        {/* 粘贴 */}
        {/* 显示比例 */}
        {
          activeList.map(res => (
            <a-popover
              title=""
              trigger="hover"
              placement="left"
              content={<>
                <span>{res.labelValue}</span>
              </>}>
              <div class={css.action_active} onClick={() => res.fun()}>
                <svg-icon class={css.svg_icon} name={res.icon} />
              </div>
            </a-popover>
          ))
        }
        <div class={css.zoom}>
          <svg-icon class={css.svg_icon} name={'xinjianshujutianjia'} onClick={() => board.zoomScale('+')} />
          <span class={css.zoom_num}>{numberFun(board.scale * 100, 0)}%</span>
          <svg-icon class={css.svg_icon} name={'jianquwubiankuang'} onClick={() => board.zoomScale('-')} />
        </div>

        {/* 上传到模板市场 */}
        <template-modal tempVisible={tempVisible.value} onChangeVisible={(params) => tempVisible.value = params}></template-modal>
        {/* 保存组件到组件市场 */}
        <plugin-modal pluginVisible={pluginVisible.value} onChangeVisible={(params) => pluginVisible.value = params}></plugin-modal>
      </div>
    )
  }
})