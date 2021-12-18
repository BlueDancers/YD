import { useCoreStore } from '@/stores/core';
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue-demi';
import animationOptions from './component/animation/animation';
import animationView from './component/animation/index';
import css from './index.module.scss';

export default defineComponent({
  components: {
    animationView,
    CaretRightOutlined
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
    return () => (
      <div class={css.animation}>
        <a-button type="primary" onClick={addAn}>添加动画</a-button>
        <a-collapse
          class={css.anima_list}
          v-model={[activeKey.value, 'activeKey']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
          {
            core.carryAn.map((item, index) => (
              <a-collapse-panel key={index} header={getAminName(core.carryAn[index].animationName)} show-arrow={false}>
                <a-form label-col={{ style: { width: '80px' } }}>
                  <a-form-item label="选择动画">
                    <a-button onClick={() => toggleAnim(index)} type="primary">{getAminName(core.carryAn[index].animationName)}</a-button>
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
        <animationView showAnima={showAnima} onSetClassName={setAnimationName}></animationView>
      </div>
    )
  }
})