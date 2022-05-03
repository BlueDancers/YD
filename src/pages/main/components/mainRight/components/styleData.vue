<template>
  <el-form class="style_data" label-width="90px">
    <el-form-item label="对齐：">
      <svg-icon class="align_item_icon" @click="alignFun('left')" name="fuhao-zuoduiqi"></svg-icon>
      <svg-icon class="align_item_icon" @click="alignFun('center')" name="fuhao-juzhongduiqi"></svg-icon>
      <svg-icon class="align_item_icon" @click="alignFun('right')" name="fuhao-youduiqi"></svg-icon>
    </el-form-item>
    <el-form-item label="快捷操作：">
      <svg-icon class="align_item_icon" @click="alignFun('fullWidth')" name="kuandupumanFullWidth"></svg-icon>
      <svg-icon class="align_item_icon" @click="alignFun('top')" name="zhiding"></svg-icon>
    </el-form-item>
    <el-form-item label="宽高：">
      <el-input-number class="mini_input" v-model="main.acTempCss.width" :controls-position="'right'" />
      &nbsp &nbsp
      <el-input-number class="mini_input" v-model="main.acTempCss.height" :controls-position="'right'" />
    </el-form-item>
    <el-form-item label="坐标：">
      <el-input-number class="mini_input" v-model="main.acTempCss.left" :controls-position="'right'" />
      &nbsp &nbsp
      <el-input-number class="mini_input" v-model="main.acTempCss.top" :controls-position="'right'" />
    </el-form-item>
    <el-form-item label="背景色：">
      <el-color-picker v-model="main.acTempCss['background-color']"></el-color-picker>
    </el-form-item>
    <el-form-item label="圆角：">
      <el-input-number
        class="mini_input"
        v-model="main.acTempCss['border-radius']"
        :controls-position="'right'"
      />
    </el-form-item>
    <el-form-item label="边框：">
      <el-input-number
        :min="0"
        class="mini_input"
        v-model="main.acTempCss['border-width']"
        :controls-position="'right'"
      />
      &nbsp &nbsp
      <el-select :style="{ width: '80px' }" v-model="main.acTempCss['border-style']">
        <el-option v-for="item in borderStyleList" :key="item.key" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
      &nbsp &nbsp
      <el-color-picker v-model="main.acTempCss['border-color']"></el-color-picker>
    </el-form-item>

    <el-form-item label="文字大小：" v-if="main.acTempCss['font-size']">
      <el-input-number
        class="mini_input"
        v-model="main.acTempCss['font-size']"
        :controls-position="'right'"
      />
    </el-form-item>
    <el-form-item label="文字色：" v-if="main.acTempCss['color']">
      <el-color-picker v-model="main.acTempCss['color']"></el-color-picker>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { useMain } from '@/store/main'
import { borderStyleList } from '@/utils/styleData'
import SvgIcon from '@/components/SvgIcon.vue'

const main = useMain()

// 快速定位
function alignFun(type) {
  if (type == 'left') {
    main.acIdx.map((e) => (main.template[e].cssModule.left = 0))
  } else if (type == 'center') {
    main.acIdx.map((e) => (main.template[e].cssModule.left = (325 - main.template[e].cssModule.width) / 2))
  } else if (type == 'right') {
    main.acIdx.map((e) => (main.template[e].cssModule.left = 325 - main.template[e].cssModule.width))
  } else if (type == 'fullWidth') {
    main.acIdx.map((e) => {
      main.template[e].cssModule.width = 325
      main.template[e].cssModule.left = 0
    })
  } else if (type == 'top') {
    main.acIdx.map((e) => {
      main.template[e].cssModule.top = 0
    })
  }
}
</script>

<style lang="less" scoped>
.style_data {
  .align_item_icon {
    cursor: pointer;
    margin: 0 5px;
    padding: 2px;
    width: 18px;
    height: 18px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .mini_input {
    width: 80px;
  }
}
</style>

<style lang="less">
.style_data {
  .el-input-number .el-input__inner {
    text-align: left;
  }
}
</style>
