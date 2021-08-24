<template>
  <div class="content_right">
    <a-tabs v-model:activeKey="activeKey" v-if="activeCont">
      <a-tab-pane key="1">
        <template #tab>容器设置</template>
        <!-- 设置容器数据 -->
        <div class="form_con">
          <a-form>
            <a-form-item label="宽高">
              <div class="right_wh">
                <a-input class="right_w" v-model:value="activeContCss.width"></a-input>
                x
                <a-input class="right_h" v-model:value="activeContCss.height"></a-input>
              </div>
            </a-form-item>
            <a-form-item label="背景色">
              <input type="color" v-model="activeContCss.backgroundColor" />
            </a-form-item>
          </a-form>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>组件设置</template>
        <!-- 设置容器数据 -->
        <div class="form_con"></div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
export default defineComponent({
  components: {
    ColorPicker,
  },
  setup() {
    const activeKey = ref('1')
    const store = useStore()
    const activeCont = computed(() => store.state.core.activeCont)
    const activechild = computed(() => store.state.core.activechild)
    const containerList = computed(() => store.state.core.containerList)

    const activeContCss = computed({
      get: () => {
        let carry = containerList.value.find((e) => e.id == activeCont.value)
        if (carry) {
          return carry.cssModule
        } else {
          return {}
        }
      },
      set: (value) => {
        console.log(value)
      },
    })
    return {
      activeCont,
      activechild,
      activeContCss,
      activeKey,
    }
  },
})
</script>

<style lang="scss" scoped>
.content_right {

  background-color: #f8f9fa;
  width: 340px;
  height: calc(100vh - 50px);
  .form_con {
    padding-left: 20px;
    .right_wh {
      .right_w {
        width: 60px;
      }
      .right_h {
        width: 60px;
      }
    }
  }
}
</style>
