import { useCoreStore } from '@/store/core';
import { linkDataFun } from '@/src/content/right/common/selectData';
import { defineComponent, ref } from 'vue-demi';
import css from './index.module.scss';

import uploadImg from '@/components/uploadImg.vue';
import { baseSwiper } from '@/modules/components';

export default defineComponent({
  components: {
    uploadImg
  },
  setup() {
    const core = useCoreStore()
    const activeKey = ref([])

    function addSwiper() {
      console.log('增加轮播图');
      core.carryConfig.data.push(baseSwiper())

    }
    function deleteSwiperItem(evt, index) {
      core.carryConfig.data.splice(index, 1)
      evt.stopPropagation()
    }

    function changeImg(url, index) {
      core.carryConfig.data[index].imglUrl = url.tempFileURL
    }

    return () => (
      <div class={css.swiper_cont}>
        <a-button class={css.add_swiper_btn} type="primary" onClick={addSwiper}>添加轮播图</a-button>
        <a-collapse
          class={css.swiper_list}
          v-model={[activeKey.value, 'activeKey']}
        >
          {
            core.carryConfig.data.map((item, index) => (
              <a-collapse-panel
                key={index}
                header={'轮播图'}
                extra={<svg-icon onClick={(evt) => deleteSwiperItem(evt, index)} name={'shanchu1'} style={{ width: '16px', height: '16px' }} />}
              >
                <a-form label-col={{ style: { width: '80px' } }}>
                  <a-form-item label="图片">
                    <uploadImg imglUrl={item.imglUrl} width={150} index={index} onChangeImg={(url, index) => changeImg(url, index)}></uploadImg>
                  </a-form-item>
                  <a-form-item label="链接方式">
                    <a-select v-model={[item.linkType, 'value']} style="width: 120px">
                      {
                        linkDataFun.map(item => (
                          <a-select-option key={item.key} value={item.key}>
                            {item.value}
                          </a-select-option>
                        ))
                      }
                    </a-select>
                  </a-form-item>
                  {
                    item.linkType == '1' && <a-form-item label="链接地址">
                      <a-input placeholder="请输入链接地址" class="lang_input" v-model={[item.link, 'value']} />
                    </a-form-item>
                  }
                  {
                    item.linkType == '2' && <a-form-item label="电话号码">
                      <a-input placeholder="请输入电话号码" class="lang_input" v-model={[item.phone, 'value']} />
                    </a-form-item>
                  }
                </a-form>
              </a-collapse-panel>
            ))
          }
        </a-collapse>
      </div>
    )
  }
})