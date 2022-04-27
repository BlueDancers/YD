<template>
  <div class="config_data">
    <el-form label-width="90px">
      <!-- 富文本独有 -->
      <el-form-item label="富文本：" v-if="main.acTEmpName == 'y-edit'"> 富文本 </el-form-item>
      <!-- 图片独有 -->
      <el-form-item label="图片：" v-if="main.acTEmpName == 'y-img'">
        <div class="upload_img">
          <input class="upload_core" type="file" @change="uploadImg" />
          <img class="img_cont" :src="main.acTempData.imglUrl" />
        </div>
      </el-form-item>
      <!-- 按钮独有 -->
      <el-form-item label="按钮文字：" v-if="main.acTEmpName == 'y-button'">
        <el-input
          class="mini_input"
          v-model="main.acTempData.btnValue"
          placeholder="请输入按钮文字"
        ></el-input>
      </el-form-item>
      <!-- 公共部分 -->
      <el-form-item label="事件：" v-if="main.acTempData.linkType != undefined">
        <el-select v-model="main.acTempData.linkType" class="mini_input">
          <el-option
            v-for="item in linkDataFun"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="链接地址：" v-if="main.acTempData.linkType == 1">
        <el-input class="mini_input" v-model="main.acTempData.link" placeholder="请输入链接地址"></el-input>
      </el-form-item>
      <el-form-item label="电话号码：" v-if="main.acTempData.linkType == 2">
        <el-input class="mini_input" v-model="main.acTempData.phone" placeholder="请输入电话号码"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useMain } from '@/store/main'
import { imgToStorage } from '@/utils'
import { uploadFile } from '@/utils/request'
import { linkDataFun } from '@/utils/styleData'

const main = useMain()

function uploadImg(evt) {
  let file = evt.target.files[0]
  uploadFile(`imgPhoto/${file.name}`, file).then((res) => {
    main.acTempData.imglUrl = res.tempFileURL
  })
}
</script>

<style lang="less" scoped>
.config_data {
  .upload_img {
    position: relative;
    height: 100px;
    width: 140px;
    .upload_core {
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
    .img_cont {
      max-height: 100%;
      max-width: 100%;
    }
  }

  .mini_input {
    width: 140px;
  }
}
</style>
