<template>
  <el-form class="style_data" label-width="90px">
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

const main = useMain()
</script>

<style lang="less" scoped>
.style_data {
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
