<template>
  <a-row class="content_header">
    <a-col class="header_left" :span="5" @click="gotoHome">
      <img class="left_img" src="https://6d61-mall-2gdgzk540aab98cd-1257324019.tcb.qcloud.la/base/logo.png?sign=1d3f62f4b382ac6a77868e47f709c089&t=1641199933" alt="" />
      <span>易动</span>
    </a-col>
    <a-col class="header_centent" :span="10">
      <div class="content_item" @click="core.revoke">
        <svg-icon class="content_item_icon" name="chexiao2" />
        <span class="content_item_title">撤销</span>
      </div>
      <div class="content_item" @click="core.recovery()">
        <svg-icon class="content_item_icon flip" name="chexiao2" />
        <span class="content_item_title">恢复</span>
      </div>
      <div class="content_line"></div>
      <!-- <div class="content_zoom">
        <svg-icon :style="{ width: '20px', height: '20px' }" name="jianquwubiankuang" />
        <span class="zoom_num">{{ 1 }}</span>
        <svg-icon :style="{ width: '20px', height: '20px' }" name="xinjianshujutianjia" />
      </div> -->
    </a-col>
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
import 'ant-design-vue/es/message/style/index'
import { useCloud } from '@/utils/Hook/useRequest'
import { useBoardStore } from '@/stores/board'
import { useCoreStore } from '@/stores/core'
import { deepClone, imgToFile, imgToStorage } from '@/utils'
export default defineComponent({
  components: {
    QrcodeOutlined,
    ReadOutlined,
    GithubOutlined,
  },
  setup() {
    const router = useRouter()
    let board = useBoardStore()
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
      let thmbImg
      if (board.pageDetail.pageType == 1) {
        // 单页面动态生成当前页面
        thmbImg = [(await getThumbnail()).tempFileURL]
      } else {
        // 多页面动态生成当前下标页面
        // let oldIndex = deepClone(core.acPageIndex)
        // let url = await getManyThmb()
        // board.pageDetail.tumbUrl[oldIndex] = url
        // console.log(board.pageDetail.tumbUrl);
        // thmbImg = board.pageDetail.tumbUrl
        thmbImg = [(await getThumbnail()).tempFileURL]
      }

      let updateDetail = useCloud('pageDetails').doc(board.pageDataId).update({
        content: core.pageData,
      })

      let updatePageData = useCloud('pageList').doc(board.pageDetail._id).update({
        tumbUrl: thmbImg,
        height: board.pageDetail.height,
        router: board.pageDetail.router,
        routerName: board.pageDetail.routerName,
        disp: board.pageDetail.disp,
        backColor: board.pageDetail.backColor,
      })
      Promise.all([updateDetail, updatePageData]).then((res) => {
        console.log(res)
        message.success('保存成功')
      })
    }
    async function getThumbnail() {
      let file = await imgToFile(board)
      let url = await imgToStorage(file, board.pageDataId, 'pagePhoto')
      return url
    }
    async function getManyThmb() {
      let file = await imgToFile(board)
      let url = await imgToStorage(file, `${board.pageDataId}_thmb&${core.carryPageComp.id}&`, 'thmbImg')
      return url
    }
    return { gotoHome, gotoDoc, gotoGithub, gotoIM, jsonProcessor, saveCarryPage, core }
  },
})
</script>

<style lang="scss" scoped>
.content_header {
  position: relative;
  z-index: 10;
  box-shadow: 0 2px 13px 0 rgb(0 0 0 / 10%);
  background-color: #f8f9fa;
  height: 56px;
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
    span {
    }
  }
  .header_centent {
    display: flex;
    align-items: center;
    justify-content: center;
    .content_item {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      padding: 0 10px;
      height: 100%;
      cursor: pointer;
      &:hover {
        background-color: #2970f6;
        .content_item_icon {
          color: #fff !important;
        }
        .content_item_title {
          color: #fff;
        }
      }
      .content_item_icon {
        text-align: center;
        color: rgb(41, 112, 246);
        width: 18px;
        height: 18px;
      }
      .flip {
        transform: rotateY(180deg);
      }
      .content_item_title {
        margin-top: 4px;
        font-size: 13px;
        line-height: 13px;
        height: 13px;
      }
    }
    .content_line {
      width: 1px;
      height: 36px;
      background-color: rgb(219, 219, 219);
      margin: 0 10px;
    }
    .content_zoom {
      display: flex;
      align-items: center;
      .zoom_num {
        font-size: 14px;
      }
    }
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
    .right_item {
      .right_item_text {
      }
    }
    .right_item {
      .right_item_text {
      }
    }
    .right_btn {
      margin: 0 10px;
    }
  }
}
</style>