import { useCoreStore } from '@/stores/core';
import { defineComponent, ref } from 'vue-demi';
import { ElColorPicker } from 'element-plus'
import css from './index.module.scss';
import { borderStyleList, fontWeightList, fontAlignList } from '../../common/selectData';
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined } from '@ant-design/icons-vue'
import { useBoardStore } from '@/stores/board';
export default defineComponent({
  components: {
    ElColorPicker,
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined
  },
  setup() {
    const core = useCoreStore()
    const board = useBoardStore()
    const activeKey = ref([1, 2, 3])

    function fastLayout(type: string) {
      if (type == 'left') {
        core.carryCss.left = 0
      } else if (type == 'center') {
        core.carryCss.left = (board.width - core.carryCss.width) / 2
      } else if (type == 'right') {
        core.carryCss.left = board.width - core.carryCss.width
      }
    }
    return () => (
      <a-form class={css.comp_style} label-col={{ style: { width: '80px' } }}>
        <a-form-item label="快捷布局">
          <div class="fast_layout">
            <AlignLeftOutlined class={css.layout_item} onClick={() => fastLayout('left')} />
            <AlignCenterOutlined class={css.layout_item} onClick={() => fastLayout('center')} />
            <AlignRightOutlined class={css.layout_item} onClick={() => fastLayout('right')} />
          </div>
        </a-form-item>
        <a-collapse v-model={[activeKey.value, 'activeKey']}>
          <a-collapse-panel key={1} header="布局设置">
            <a-form-item label="尺寸">
              <a-input-number min={0} class="default_input" addon-before="宽" v-model={[core.carryCss.width, 'value']} />
              <a-input-number min={0} class="default_input" addon-before="高" v-model={[core.carryCss.height, 'value']} />
            </a-form-item>
            {/* <a-form-item label="外边距">
              <a-input-number min={0} class="default_input" addon-before="上" v-model={[core.carryCss['margin-top'], 'value']} />
              <a-input-number min={0} class="default_input" addon-before="下" v-model={[core.carryCss['margin-bottom'], 'value']} />
              <a-input-number min={0} class="default_input" addon-before="左" v-model={[core.carryCss['margin-left'], 'value']} />
              <a-input-number min={0} class="default_input" addon-before="右" v-model={[core.carryCss['margin-right'], 'value']} />
            </a-form-item>
            <a-form-item label="内边距">
              <a-input-number min={0} class="default_input" addon-before="上" v-model={[core.carryCss['padding-top'], 'value']} />
              <a-input-number min={0} class="default_input" addon-before="下" v-model={[core.carryCss['padding-bottom'], 'value']} />
              <a-input-number min={0} class="default_input" addon-before="左" v-model={[core.carryCss['padding-left'], 'value']} />
              <a-input-number min={0} class="default_input" addon-before="右" v-model={[core.carryCss['padding-right'], 'value']} />
            </a-form-item> */}
          </a-collapse-panel>
          <a-collapse-panel key={2} header="样式设置">
            {
              core.carryCss['background-color'] != null && <a-form-item label="背景颜色">
                <el-color-picker show-alpha v-model={core.carryCss['background-color']} />
              </a-form-item>
            }
            {
              core.carryCss['border-width'] != null && <a-form-item label="边框">
                <div class={css.border_cont}>
                  <a-input-number class="mini_input" v-model={[core.carryCss['border-width'], 'value']} />
                  <a-select v-model={[core.carryCss['border-style'], 'value']} style="width: 80px">
                    {
                      borderStyleList.map(item => (
                        <a-select-option key={item.key} value={item.key}>
                          {item.value}
                        </a-select-option>
                      ))
                    }
                  </a-select>
                  <el-color-picker show-alpha class="color_picker" v-model={core.carryCss['border-color']} />
                </div>
              </a-form-item>
            }
            {
              core.carryCss['border-radius'] != null && <a-form-item label="圆角">
                <a-input-number class="default_input" min={0} v-model={[core.carryCss['border-radius'], 'value']} />
              </a-form-item>
            }
          </a-collapse-panel>
          {
            core.carryCss.color != null && <a-collapse-panel key={3} header="文字设置">
              <a-form-item label="字体颜色">
                <el-color-picker show-alpha v-model={[core.carryCss.color]} />
              </a-form-item>
              <a-form-item label="字号">
                <a-input-number class="default_input" min={0} v-model={[core.carryCss['font-size'], 'value']} />
              </a-form-item>
              <a-form-item label="字重">
                <a-select v-model={[core.carryCss['font-weight'], 'value']} style="width: 120px">
                  {
                    fontWeightList.map(item => (
                      <a-select-option key={item.key} value={item.key}>
                        {item.value}
                      </a-select-option>
                    ))
                  }

                </a-select>
              </a-form-item>
              <a-form-item label="字重">
                <a-select v-model={[core.carryCss['font-weight'], 'value']} style="width: 120px">
                  {
                    fontWeightList.map(item => (
                      <a-select-option key={item.key} value={item.key}>
                        {item.value}
                      </a-select-option>
                    ))
                  }

                </a-select>
              </a-form-item>
              <a-form-item label="文字居中">
                <a-select v-model={[core.carryCss['text-align'], 'value']} style="width: 120px">
                  {
                    fontAlignList.map(item => (
                      <a-select-option key={item.key} value={item.key}>
                        {item.value}
                      </a-select-option>
                    ))
                  }
                </a-select>
              </a-form-item>

            </a-collapse-panel>
          }
        </a-collapse>
      </a-form >
    )
  }
})