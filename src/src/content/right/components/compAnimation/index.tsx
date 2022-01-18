import { useCoreStore } from '@/store/core';
import { deepClone } from '@/utils/index';
import { CaretRightOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue-demi';
import animationOptions from './component/animation/animation';
import animationView from './component/animation/index';
import { animationFillModeFun, animationTimingFunctionFun } from '../../common/selectData';
import css from './index.module.scss';

export default defineComponent({
  components: {
    animationView,
    CaretRightOutlined,
  },
  setup() {
    const core = useCoreStore()
    const activeKey = ref([])
    const showAnima = ref(false) // 动画组件弹窗
    const activeItem = ref(0) // 当前选中什么动画

    /**
     * 打开动画开关
     */
    function addAn() {
      showAnima.value = true
      activeItem.value = core.carryAn.length
    }

    /**
     * 设置当前动画类型
     * @param value 
     */
    function setAnimationName(value) {
      // 等于的情况下为新增加
      if (core.carryAn.length == activeItem.value) {
        core.addAnimation()
      }
      core.carryAn[activeItem.value].animationName = value
      // 实时打开当前动画
      // activeKey.value = core.carryAn.length
      showAnima.value = false
    }

    /**
     * 获取动画名称
     * @param value 
     * @returns 
     */
    function getAminName(value) {
      let parentValue = animationOptions.find(e => e.value == value.split('_')[0])
      let childValue
      if (parentValue) {
        childValue = parentValue.children.find(c => {
          return c.value == value
        })
      }
      if (childValue) {
        return childValue.label
      }
    }

    /**
     * 已有动画切换
     */
    function toggleAnim(index) {
      console.log(index);
      activeItem.value = index
      showAnima.value = true
    }
    /**
     * 演示动画
     */
    function resetAnima() {
      let carryAn = deepClone(core.carryAn)
      core.pageData[core.acPageIndex].dom[core.activeCompIndex].animation = []
      setTimeout(() => {
        core.pageData[core.acPageIndex].dom[core.activeCompIndex].animation = carryAn
      }, 0);
    }

    /**
     * 删除动画
     * @param index 
     */
    function deleteAnima(event, index) {
      core.pageData[core.acPageIndex].dom[core.activeCompIndex].animation.splice(index, 1)
      event.stopPropagation()
    }
    return () => (
      <div class={css.animation}>
        <div class={css.anima_btn_cont}>
          <a-button class={css.anima_btn} type="primary" onClick={addAn}>添加动画</a-button>
          {
            core.carryAn.length > 0 && <a-button class={css.anima_btn} type="primary" onClick={resetAnima}>演示动画</a-button>
          }
        </div>
        <a-collapse
          class={css.anima_list}
          v-model={[activeKey.value, 'activeKey']}
        >
          {
            core.carryAn.map((item, index) => (
              <a-collapse-panel
                key={index}
                header={getAminName(core.carryAn[index].animationName)}
                extra={<svg-icon onClick={(evt) => deleteAnima(evt, index)} name={'shanchu1'} style={{ width: '16px', height: '16px' }} />}
              >
                <a-form label-col={{ style: { width: '80px' } }}>
                  <a-form-item label="选择动画">
                    <a-button onClick={() => toggleAnim(index)} type="primary">{getAminName(core.carryAn[index].animationName)}</a-button>
                  </a-form-item>
                  <a-form-item label="动画时间">
                    <a-input
                      class='default_input'
                      v-model={[core.carryAn[index].animationDuration, 'value']}
                      suffix={'ms'}
                    />
                  </a-form-item>
                  <a-form-item label="延迟时间">
                    <a-input
                      class='default_input'
                      v-model={[core.carryAn[index].animationDelay, 'value']}
                      suffix={'ms'}
                    />
                  </a-form-item>

                  <a-form-item label="动画次数" extra="无限可以设置为99999">
                    <a-input-number v-model={[core.carryAn[index].animationIterationCount, 'value']} />
                  </a-form-item>

                  <a-form-item label="动画模式">
                    <a-select v-model={[core.carryAn[index].animationFillMode, 'value']} style="width: 120px">
                      {
                        animationFillModeFun.map(item => (
                          <a-select-option key={item.key} value={item.key}>
                            {item.value}
                          </a-select-option>
                        ))
                      }
                    </a-select>
                  </a-form-item>
                  <a-form-item label="运行速度">
                    <a-select v-model={[core.carryAn[index].animationTimingFunction, 'value']} style="width: 120px">
                      {
                        animationTimingFunctionFun.map(item => (
                          <a-select-option key={item.key} value={item.key}>
                            {item.value}
                          </a-select-option>
                        ))
                      }
                    </a-select>
                  </a-form-item>
                </a-form>
              </a-collapse-panel>
            ))
          }
        </a-collapse>
        <animationView showAnima={showAnima} onSetClassName={setAnimationName}></animationView>
      </div>
    )
  }
})