import { uploadFile } from '@/modules/request';
import { useCoreStore } from '@/store/core';
import { message } from 'ant-design-vue';
import { defineComponent } from 'vue-demi';
import { linkDataFun } from '../../common/selectData';

import swiperAction from './component/swiperAction';

import css from './index.module.scss';

export default defineComponent({
  components: {
    swiperAction
  },
  setup() {
    const core = useCoreStore()

    /**
     * 更新显示的图片
     */
    async function changeImg(event) {
      const hideMessage = message.loading('上传中...', 0);
      let file = event.target.files[0]
      let url = await uploadFile(`imgPhoto/${file.name}_${Date.now()}`, file)
      core.pageData[core.acPageIndex].dom[core.activeCompIndex].staticData.imglUrl = url
      hideMessage()
    }
    return () => (
      <div>
        {/*基础组件配置  */}
        {
          ['y-button', 'y-img', 'y-p', 'y-div', 'y-input'].includes(core.carryComp.name) &&
          <a-form class={css.comp_active} label-col={{ style: { width: '80px' } }}>
            {/* 按钮独有 */}
            {
              core.carryComp.name == 'y-button' && <a-form-item label="按钮文字">
                <a-input placeholder="请输入按钮文字" class="lang_input" v-model={[core.carryConfig.btnValue, 'value']} />
              </a-form-item>
            }
            {/* 图片独有 */}
            {
              core.carryComp.name == 'y-img' && <a-form-item label="图片链接">
                <div class={css.img_cont}>
                  <a-image
                    width={100}
                    src={core.carryConfig.imglUrl}
                  />
                  <div class={css.img_change}>修改</div>
                  <input class={css.img_upload} type={"file"} accept={"image/*"} onChange={(e) => changeImg(e)}></input>
                </div>
              </a-form-item>
            }
            {/* 文本独有 */}
            {
              core.carryComp.name == 'y-p' && <a-form-item label="文字">
                <a-textarea
                  style="width: 240px"
                  v-model={[core.carryConfig.text, 'value']}
                  placeholder={"请输入文字"}
                  rows={"4"} />
              </a-form-item>
            }
            {/* 不存在链接则不显示 */}
            {
              core.carryConfig.linkType != null && <a-form-item label="链接方式">
                <a-select v-model={[core.carryConfig.linkType, 'value']} style="width: 120px">
                  {
                    linkDataFun.map(item => (
                      <a-select-option key={item.key} value={item.key}>
                        {item.value}
                      </a-select-option>
                    ))
                  }
                </a-select>
              </a-form-item>
            }
            {
              core.carryConfig.linkType == '1' && <a-form-item label="链接地址">
                <a-input placeholder="请输入链接地址" class="lang_input" v-model={[core.carryConfig.link, 'value']} />
              </a-form-item>
            }
            {
              core.carryConfig.linkType == '2' && <a-form-item label="电话号码">
                <a-input placeholder="请输入电话号码" class="lang_input" v-model={[core.carryConfig.phone, 'value']} />
              </a-form-item>
            }
          </a-form>
        }

        {/* 轮播图组件配置 */}
        {
          core.carryComp.name == 'y-swiper' && <swiperAction></swiperAction>
        }
      </div >
    )
  }
})