<template>
  <div class="comp_data">
    <a-form v-if="contCss != null" :label-col="{ style: { width: '80px' } }">
      <a-form-item label="修改模式">
        <a-radio-group v-model:value="toggleModal">
          <a-radio-button value="1">快捷模式</a-radio-button>
          <a-radio-button value="2">源码模式</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="快捷布局">
        <div class="fast_layout">
          <AlignLeftOutlined class="layout_item" @click="fastLayout('left')" />
          <AlignCenterOutlined class="layout_item" @click="fastLayout('center')" />
          <AlignRightOutlined class="layout_item" @click="fastLayout('right')" />
        </div>
      </a-form-item>
      <template v-if="toggleModal == '1'">
        <a-form-item label="宽高">
          <div>
            <a-input-number type="number" :min="0" class="default_input" v-model:value="contCss.width"></a-input-number>
            x
            <a-input-number
              type="number"
              :min="0"
              class="default_input"
              v-model:value="contCss.height"
            ></a-input-number>
          </div>
        </a-form-item>
        <a-form-item label="坐标">
          <div>
            <a-input-number type="number" :min="0" class="default_input" v-model:value="contCss.left"></a-input-number>
            x
            <a-input-number type="number" class="default_input" v-model:value="contCss.top"></a-input-number>
          </div>
        </a-form-item>
        <a-form-item label="背景颜色">
          <input class="default_input" type="color" v-model="contCss['background-color']" />
        </a-form-item>
        <a-form-item label="字体颜色" v-if="contCss.color">
          <input class="default_input" type="color" v-model="contCss.color" />
        </a-form-item>
        <a-form-item label="层级">
          <a-input-number class="default_input" :min="0" v-model:value="contCss['z-index']" />
        </a-form-item>
        <a-form-item label="字号" v-if="contCss['font-size']">
          <a-input-number class="default_input" :min="0" v-model:value="contCss['font-size']" />
        </a-form-item>
        <a-form-item label="边框宽度" v-if="contCss['border-width']">
          <a-input-number class="default_input" :min="0" v-model:value="contCss['border-width']" />
        </a-form-item>
        <a-form-item label="边框颜色" v-if="contCss['border-color']">
          <input class="default_input" type="color" v-model="contCss['border-color']" />
        </a-form-item>
        <a-form-item label="边框样式" v-if="contCss['border-style']">
          <a-select v-model:value="contCss['border-style']" style="width: 120px">
            <a-select-option v-for="item in borderStyleList" :key="item.key" :value="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="圆角">
          <a-input-number class="default_input" :min="0" v-model:value="contCss['border-radius']" />
        </a-form-item>
        <a-form-item label="字重" v-if="contCss['font-weight']">
          <a-select v-model:value="contCss['font-weight']" style="width: 120px">
            <a-select-option v-for="item in fontWeightList" :key="item.key" :value="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="文字居中" v-if="contCss['text-align']">
          <a-select v-model:value="contCss['text-align']" style="width: 120px">
            <a-select-option v-for="item in fontAlignList" :key="item.key" :value="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <!-- <a-form-item label="圆角">
          <a-input class="default_input" v-model="contCss['font-weight']" />
        </a-form-item> -->
      </template>
      <template v-if="toggleModal == '2'"> </template>
    </a-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { borderStyleList, fontWeightList, fontAlignList } from '../common/selectData'
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
  },
  setup() {
    const toggleModal = ref('1')
    const store = useStore()
    let coordinate = computed(() => store.state.core.coordinate)
    let containerList = computed(() => store.state.core.containerList)
    const contCss = computed({
      get: () => {
        if (coordinate.value.length == 2) {
          return containerList.value[coordinate.value[0]].components[coordinate.value[1]].cssModule
        } else {
          return null
        }
      },
      set: (value) => {},
    })
    const fastLayout = (type) => {
      store.commit('core/fastCompLayout', type)
    }
    return {
      toggleModal,
      contCss,
      borderStyleList,
      fontWeightList,
      fontAlignList,
      fastLayout,
    }
  },
})
</script>

<style lang="scss" scoped>
.comp_data {
  padding-left: 20px;
  .fast_layout {
    display: flex;
    .layout_item {
      margin: 0 2px;
      padding: 6px;
      font-size: 110%;
      &:hover {
        background-color: #eee;
      }
    }
  }
  .default_input {
    width: 80px;
  }
}
</style>
