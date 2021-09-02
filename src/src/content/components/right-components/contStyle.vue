<template>
  <div class="form_con">
    <a-form v-if="activeCont.cssModule != null" :label-col="{ style: { width: '80px' } }">
      <!-- <a-form-item label="定位方式">
        <a-select v-model:value="activeCont.cssModule.position" style="width: 120px">
          <a-select-option v-for="item in positionSelect" :key="item.key" :value="item.key">
            {{ item.value }}
          </a-select-option>
        </a-select>
      </a-form-item> -->
      <a-form-item label="宽高">
        <div class="right_wh">
          <a-input-number class="default_input" v-model:value="activeCont.cssModule.width" />
          x
          <a-input-number class="default_input" v-model:value="activeCont.cssModule.height" />
        </div>
      </a-form-item>
      <a-form-item label="背景色">
        <input type="color" v-model="activeCont.cssModule['background-color']" />
      </a-form-item>
      <a-form-item label="外边距">
        <a-input-number class="mini_input" v-model:value="activeCont.cssModule['margin-top']" />
        <a-input-number class="mini_input" v-model:value="activeCont.cssModule['margin-bottom']" />
        <a-input-number class="mini_input" v-model:value="activeCont.cssModule['margin-left']" />
        <a-input-number class="mini_input" v-model:value="activeCont.cssModule['margin-right']" />
      </a-form-item>
      <!-- <a-form-item label="上边距">
        <a-input-number class="default_input" v-model:value="activeCont.cssModule['margin-top']" />
      </a-form-item>
      <a-form-item label="下边距">
        <a-input-number class="default_input" v-model:value="activeCont.cssModule['margin-bottom']" />
      </a-form-item>
      <a-form-item label="左边距">
        <a-input-number class="default_input" v-model:value="activeCont.cssModule['margin-left']" />
      </a-form-item>
      <a-form-item label="右边距">
        <a-input-number class="default_input" v-model:value="activeCont.cssModule['margin-right']" />
      </a-form-item> -->
      <a-form-item label="圆角">
        <a-input-number class="default_input" :min="0" v-model:value="activeCont.cssModule['border-radius']" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { positionSelect } from '../common/selectData'
import { useRightData } from './common/commonData'
export default defineComponent({
  setup() {
    const rightData = useRightData()
    return {
      ...rightData,
      positionSelect,
    }
  },
})
</script>

<style lang="scss" scoped>
.default_input {
  width: 80px;
}
.mini_input {
  width: 50px;
  margin: 0 2px;
}
</style>
