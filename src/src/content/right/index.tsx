
import { defineComponent, ref, reactive } from 'vue'
import css from './index.module.scss';
import compStyle from './components/compStyle/index';
import compAction from './components/compAction';
import compAnimation from './components/compAnimation';
import fastActive from './components/fastActive';
import { useCoreStore } from 'src/store/core';
import { useOtherStore } from 'src/store/other';

export default defineComponent({
  components: {
    compStyle,
    compAction,
    compAnimation,
    fastActive
  },
  setup() {
    const core = useCoreStore()
    const other = useOtherStore()
    return () => (
      <div class={css.right}>
        <fastActive></fastActive>
        {
          (core.pageData.length && core.activeCompIndex != -1) &&
          <a-tabs v-model={[other.rightKey, 'activeKey']} type="card" class={css.right_header}>
            <a-tab-pane key={1} tab="样式">
              {/* 样式管理 */}
              <compStyle></compStyle>
            </a-tab-pane>
            <a-tab-pane key={2} tab="事件">
              {/* 行为管理 */}
              <compAction></compAction>
            </a-tab-pane>
            <a-tab-pane key={3} tab="动画">
              {/* 动画管理 */}
              <compAnimation></compAnimation>
            </a-tab-pane>
          </a-tabs>
        }
      </div>
    )
  },
})