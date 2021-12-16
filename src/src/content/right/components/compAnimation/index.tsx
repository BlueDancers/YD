import { useCoreStore } from '@/stores/core';
import { defineComponent, ref } from 'vue-demi';
import animationView from './component/animation/index';
import css from './index.module.scss';

export default defineComponent({
  components: {
    animationView,
  },
  setup() {
    const core = useCoreStore()
    const showAnima = ref(false)
    function addAn() {
      showAnima.value = true
      // core.addAnimation()
      console.log(core.carryAn);
    }
    return () => (
      <div class={css.animation}>
        <a-button type="primary" onClick={addAn}>添加动画</a-button>
        <a-collapse class={css.anima_list}>
          {
            core.carryAn.map((item, index) => (
              <a-collapse-panel key={index} header={'动画' + (index + 1)} show-arrow={false}>
                <a-form label-col={{ style: { width: '80px' } }}>
                  <a-form-item label="选择动画">
                  </a-form-item>
                  <a-form-item label="动画时间">
                    <a-input-number v-model={[core.carryAn[index].animationDuration, 'value']} />
                  </a-form-item>
                  <a-form-item label="延迟时间">
                    <a-input-number v-model={[core.carryAn[index].animationDelay, 'value']} />
                  </a-form-item>
                  <a-form-item label="动画结果">
                    <a-input-number v-model={[core.carryAn[index].animationIterationCount, 'value']} />
                  </a-form-item>

                </a-form>
              </a-collapse-panel>
            ))
          }
        </a-collapse>
        <animationView showAnima={showAnima}></animationView>
      </div>
    )
  }
})