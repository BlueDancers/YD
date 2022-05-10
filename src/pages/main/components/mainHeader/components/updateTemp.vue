<template>
  <el-dialog v-model="tempShow" title="页面信息" width="766px">
    <div class="update_temp">
      <div class="temp_left">
        <div class="left_imgbox">
          <img class="left_img" src="@/assets/phone.png" />
          <img class="left_img_header" src="@/assets/header.png" />
          <img class="left_img_hair" src="@/assets/hair.png" />
          <iframe class="left_iframe" :src="tempUrl" frameborder="0"></iframe>
        </div>
        <div class="temp_time">更新时间：{{ tempTime }}</div>
      </div>
      <div class="temp_line"></div>
      <div class="temp_right">
        <el-form label-width="80px">
          <el-form-item label="页面名称:">
            <div class="right_name">
              <span>{{ main.pageTitle }}</span>
            </div>
          </el-form-item>
          <el-form-item label="访问地址:">
            <span>{{ tempUrl }}</span>
          </el-form-item>
          <el-form-item label="二维码:">
            <div class="qrcode_box">
              <canvas id="canvas" style="display: none"></canvas>
              <img v-if="tempForm" :src="tempForm" class="qrcode_img" />
              <div class="qrcode_text">扫码直接访问哦</div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import QRCode from 'qrcode'
import { useMain } from '@/store/main'
import { baseUrl } from '@/config'
import { parseTime } from '@/utils'
const main = useMain()

const tempShow = ref(false)

const tempForm = ref('') // 二维码数据
const tempTime = ref('') // 保存时间

// 真实访问地址
const tempUrl = computed(() => {
  return `${baseUrl}/${main.parentPageRouter}/${main.pageRouter}`
})

onMounted(() => {
  init()
})

//生成二维码和时间
function init() {
  let canvas = document.getElementById('canvas')
  QRCode.toCanvas(tempUrl.value, { canvas, width: 180, height: 180, margin: 0 }).then((url) => {
    tempForm.value = url.toDataURL('image/png')
  })
  tempTime.value = parseTime(Date.now(), {})
}

function open() {
  tempShow.value = true
}

function handleClose() {
  tempShow.value = false
}

defineExpose({
  open,
})
</script>

<style lang="less" scoped>
.update_temp {
  z-index: 9999;
  display: flex;
  background: #ffffff;
  border-radius: 19px 19px 19px 19px;
  .temp_left {
    margin-left: 40px;
    width: 40%;
    .left_imgbox {
      position: relative;
      .left_img {
        width: 219px;
        height: 441px;
      }
      .left_img_header {
        position: absolute;
        top: 10px;
        left: 12px;
        width: 194px;
        border-radius: 20px 20px 0 0;
      }
      .left_img_hair {
        position: absolute;
        top: 10px;
        left: 65px;
        width: 85px;
      }
      .left_img_text {
        width: 219px;
        position: absolute;
        color: rgba(0, 0, 0, 0.8);
        top: 34px;
        font-size: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(0.9);
        font-weight: bold;
      }
      .left_iframe {
        position: absolute;
        top: 50px;
        left: 12px;
        width: 194px;
        height: 382px;
        border-radius: 0 0 20px 20px;
      }
    }
    .temp_time {
      text-align: center;
      width: 219px;
      margin-top: 10px;
      color: #99999999;
    }
  }
  .temp_line {
    width: 1px;
    height: 480px;
    background: rgba(128, 128, 128, 0.2);
  }
  .temp_right {
    margin-left: 40px;
    .right_name {
      font-size: 18px;
      font-weight: bold;
    }
    .qrcode_box {
      margin-top: 10px;
      .qrcode_text {
        color: #99999999;
      }
      .qrcode_img {
        width: 180px;
        height: 180px;
      }
    }
  }
}
</style>
