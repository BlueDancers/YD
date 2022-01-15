import { useBoardStore } from 'src/store/board';
import { useCoreStore } from 'src/store/core';
import { useOtherStore } from 'src/store/other';
import { numberFun } from '@/utils/index';
import { defineComponent, reactive, ref } from 'vue-demi';
import css from './index.module.scss';

export default defineComponent({
  setup() {
    const core = useCoreStore()
    const other = useOtherStore()
    const board = useBoardStore()
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
        icon: 'shanchu2',
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
    ])
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
      </div>
    )
  }
})