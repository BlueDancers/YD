<template>
  <a-row class="content_header">
    <a-col class="header_left" :span="5" @click="gotoHome">
      <img class="left_img" src="@/assets/logo.png" alt="" />
      <span>易动</span>
    </a-col>
    <a-col class="header_centent" :span="10"> </a-col>
    <a-col class="header_right" :span="9">
      <div class="right_item" @click="gotoDoc">
        <ReadOutlined :style="{ fontSize: '120%' }" />
        <span class="right_item_text">文档</span>
      </div>
      <div class="right_item" @click="gotoGithub">
        <GithubOutlined :style="{ fontSize: '120%' }" />
        <span class="right_item_text">Github</span>
      </div>
      <div class="right_item" @click="gotoIM">
        <QrcodeOutlined :style="{ fontSize: '120%' }" />
        <span class="right_item_text">交流群</span>
      </div>
      <!-- <a-button class="right_btn" @click="jsonProcessor" type="primary">生成代码</a-button> -->
      <a-button class="right_btn" @click="saveCarryPage" type="primary">保存</a-button>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { QrcodeOutlined, ReadOutlined, GithubOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useCloud } from '@/utils/Hook/useRequest'
import { useBoardStore } from '@/stores/board'
import { useCoreStore } from '@/stores/core'
import html2canvas from 'html2canvas'
import domtoimage from 'dom-to-image'
import { dataURLtoFile, getRandom } from '@/utils'
import { uploadFile } from '@/modules/request'
export default defineComponent({
  components: {
    QrcodeOutlined,
    ReadOutlined,
    GithubOutlined,
  },
  setup() {
    const router = useRouter()
    let borad = useBoardStore()
    let core = useCoreStore()
    function gotoHome() {
      router.replace({
        name: 'home',
      })
    }
    function gotoDoc() {
      message.info('开发中,敬请期待👨‍💻🧑‍💻👩‍💻')
    }
    function gotoGithub() {
      location.href = 'https://github.com/vkcyan/H5-YD.v2'
    }
    function gotoIM() {
      message.info('开发中,敬请期待👨‍💻🧑‍💻👩‍💻')
    }
    function jsonProcessor() {}
    // 保存页面组件数据
    async function saveCarryPage() {
      let thmbImg = await getThumbnail()
      let updateDetail = useCloud('pageDetails').doc(borad.pageDataId).update({
        content: core.pageData,
      })
      let updatePageData = useCloud('pageList').doc(borad.pageDetail._id).update({
        tumbUrl: thmbImg,
      })
      Promise.all([updateDetail, updatePageData]).then((res) => {
        console.log('保存成功', res)
      })
    }
    async function getThumbnail() {
      let boardCenterCore: any = document.querySelector('.board_center_core')
      console.log(boardCenterCore)

      let dataUrl = await domtoimage.toJpeg(document.querySelector('.board_center_core'), {
        cacheBust: true,
        height: borad.height >= 560 ? 560 : borad.height,
        width: 320,
        style: {
          left: '0',
          right: '0',
          bottom: '0',
          top: '0',
          transform: 'translate(0%, 0%) scale(1)',
        },
      })
      let file: any = dataURLtoFile(dataUrl, `${borad.pageDataId}_${getRandom(1000, 1000000)}.jpg`)
      let url = await uploadFile(`pagePhoto/${file.name}`, file)
      console.log(url)

      return url
    }
    return { gotoHome, gotoDoc, gotoGithub, gotoIM, jsonProcessor, saveCarryPage }
  },
})
</script>

<style lang="scss" scoped>
.content_header {
  position: relative;
  z-index: 10;
  box-shadow: 0 2px 13px 0 rgb(0 0 0 / 10%);
  background-color: #f8f9fa;
  height: 50px;
  padding: 0 20px;
  .header_left {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .left_img {
      width: 35px;
      height: 35px;
    }
  }
  .header_centent {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header_right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .right_item {
      cursor: pointer;
      width: 80px;
      display: flex;
      align-items: center;
      .right_item_text {
        margin-left: 6px;
        margin-right: 10px;
      }
    }
    .right_btn {
      margin: 0 10px;
    }
  }
}
</style>