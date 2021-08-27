<template>
  <div class="form_con">
    <a-form v-if="contCss != null" :label-col="{ style: { width: '80px' } }">
      <a-form-item label="定位方式">
        <a-select v-model:value="contCss.position" style="width: 120px">
          <a-select-option v-for="item in positionSelect" :key="item.key" :value="item.key">
            {{ item.value }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="宽高">
        <div class="right_wh">
          <a-input-number class="default_input" v-model:value="contCss.width" />
          x
          <a-input-number class="default_input" v-model:value="contCss.height" />
        </div>
      </a-form-item>
      <a-form-item label="背景色">
        <input type="color" v-model="contCss.backgroundColor" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { positionSelect } from '../common/selectData'
export default defineComponent({
  setup() {
    const store = useStore()
    const containerList = computed(() => store.state.core.containerList)
    const activeCont = computed(() => store.state.core.activeCont)
    const contCss = computed({
      get: () => {
        console.log(activeCont.value, containerList.value)

        if (activeCont.value) {
          let carry = containerList.value.find((e) => e.id == activeCont.value).cssModule
          console.log(carry)

          if (carry) {
            return carry
          } else {
            return null
          }
        } else {
          return null
        }
      },
      set: (value) => {
        console.log(value)
      },
    })
    return {
      contCss,
      positionSelect,
    }
  },
})
</script>

<style lang="scss" scoped>
.default_input {
  width: 80px;
}
</style>
