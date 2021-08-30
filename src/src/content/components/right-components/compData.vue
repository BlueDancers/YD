<template>
  <div class="comp_data">
    <a-form v-if="activeComp != null" :label-col="{ style: { width: '80px' } }">
      <a-form-item label="按钮文字" v-if="activeComp.name == 'y-button'">
        <a-input class="long_input" v-model:value="activeComp.staticData.value" />
      </a-form-item>
      <a-form-item label="图片" v-if="activeComp.name == 'y-img'">
        <upload-img v-model:value="activeComp.staticData.src"></upload-img>
      </a-form-item>
      <a-form-item label="提示文字" v-if="activeComp.name == 'y-input'">
        <a-input class="long_input" v-model:value="activeComp.staticData.placeholder" />
      </a-form-item>
      <a-form-item label="输入文字" v-if="activeComp.name == 'y-p'">
        <a-textarea auto-size class="long_input" v-model:value="activeComp.staticData.value" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import uploadImg from '@/components/uploadImg.vue'
import { defineComponent } from 'vue'
import { useRightData } from './common/commonData'

export default defineComponent({
  components: { uploadImg },
  setup() {
    const rightData = useRightData()
    return {
      ...rightData,
    }
  },
})
</script>

<style lang="scss" scoped>
.comp_data {
  .long_input {
    width: 180px;
  }
}
</style>
