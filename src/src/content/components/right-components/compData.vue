<template>
  <div class="comp_data">
    <a-form v-if="contCss != null" :label-col="{ style: { width: '80px' } }">
      <a-form-item label="宽高">
        <div class="right_wh">
          <a-input-number type="number" :min="0" class="default_input" v-model:value="contCss.width"></a-input-number>
          x
          <a-input-number type="number" :min="0" class="default_input" v-model:value="contCss.height"></a-input-number>
        </div>
      </a-form-item>
      <a-form-item label="坐标">
        <div class="right_wh">
          <a-input-number type="number" :min="0" class="default_input" v-model:value="contCss.left"></a-input-number>
          x
          <a-input-number type="number" :min="0" class="default_input" v-model:value="contCss.top"></a-input-number>
        </div>
      </a-form-item>
      <a-form-item label="背景颜色">
        <input class="default_input" type="color" v-model="contCss.backgroundColor" />
      </a-form-item>
      <a-form-item label="字体颜色">
        <input class="default_input" type="color" v-model="contCss.color" />
      </a-form-item>
      <a-form-item label="层级">
        <a-input-number class="default_input" :min="0" v-model:value="contCss.zIndex" />
      </a-form-item>
      <a-form-item label="字号">
        <a-input-number class="default_input" :min="0" v-model:value="contCss.fontSize" />
      </a-form-item>
      <a-form-item label="边框宽度">
        <a-input-number class="default_input" :min="0" v-model:value="contCss.borderWidth" />
      </a-form-item>
      <a-form-item label="边框颜色">
        <input class="default_input" type="color" v-model="contCss.borderColor" />
      </a-form-item>
      <a-form-item label="边框样式">
        <a-input class="default_input" v-model:value="contCss.borderStyle" />
      </a-form-item>
      <a-form-item label="圆角">
        <a-input-number class="default_input" :min="0" v-model:value="contCss.borderRadius" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    let coordinate = computed(() => store.state.core.coordinate)
    let containerList = computed(() => store.state.core.containerList)
    const contCss = computed({
      get: () => {
        try {
          if (coordinate.value.length == 2) {
            return containerList.value[coordinate.value[0]].components[coordinate.value[1]].cssModule
          } else {
            return null
          }
        } catch (error) {
          return null
        }
      },
      set: (value) => {
        console.log(value)
      },
    })
    return {
      contCss,
      coordinate,
    }
  },
})
</script>

<style lang="scss" scoped>
.comp_data {
  padding-left: 20px;

  .right_wh {
  }
  .default_input {
    width: 80px;
  }
}
</style>
