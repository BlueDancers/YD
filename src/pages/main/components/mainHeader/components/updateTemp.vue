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
        <div class="right_name">
          <span>页面名称：</span>
          <span class="right_name_text">{{ main.pageTitle }}</span>
        </div>
        <div class="right_url">
          <span>访问地址：</span>
          <span>{{ `${baseUrl}/${main.pageRouter}` }}</span>
        </div>
        <div class="right_qrcode">
          <span>二维码：</span>
          <div class="qrcode_box">
            <img v-if="tempQrimg" :src="tempQrimg" class="qrcode_img" />
            <div class="qrcode_text">扫码直接访问哦</div>
          </div>
        </div>
      </div>
      <!-- <div @click="init">点击</div> -->
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QRCode from 'qrcode'
import { useMain } from '@/store/main'
import { baseUrl } from '@/config'
import { parseTime } from '@/utils'

const tempShow = ref(false)
const tempTime = ref('2021-10-21 13:59:59')
const tempUrl = ref('http://lt.591wsh.com/')
const tempQrimg = ref('')

const main = useMain()

onMounted(() => {
  init()
})

function handleClose() {
  tempShow.value = false
}

function init() {
  QRCode.toDataURL(tempUrl.value)
    .then((url) => {
      tempQrimg.value = url
    })
    .catch((err) => {
      console.error(err)
    })
  tempTime.value = parseTime(Date.now(), {})
}

function open() {
  tempShow.value = true
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
    width: 45%;
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
        width: 90px;
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
    background: rgba(128, 128, 128, 0.6);
  }
  .temp_right {
    margin-left: 20px;
    .right_name {
      margin-top: 50px;
      .right_name_text {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .right_url {
      margin-top: 20px;
    }
    .right_qrcode {
      display: flex;
      margin-top: 20px;
      .qrcode_box {
        .qrcode_text {
          margin-left: 20px;
          color: #99999999;
        }
        .qrcode_img {
          width: 200px;
          height: 200px;
        }
      }
    }
  }
}
</style>
