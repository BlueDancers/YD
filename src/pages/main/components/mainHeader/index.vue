<template>
  <div class="main_header">
    <div class="header_left" @click="gotoHome">易动</div>
    <div class="header_right">
      <div class="header_menu">
        <div class="menu_item" @click="gotoLink('https://github.com/vkcyan/YD')">
          <svg-icon class="item_icon" name="github"></svg-icon>
          <span class="item_text">github</span>
        </div>
        <div class="menu_item">
          <svg-icon class="item_icon" name="shiyongwendang"></svg-icon>
          <span class="item_text">文档</span>
        </div>
        <div class="menu_item">
          <svg-icon class="item_icon" name="erweima"></svg-icon>
          <span class="item_text">交流群</span>
        </div>
      </div>
      <el-button type="primary" @click="savePage">保存</el-button>
    </div>
    <update-temp ref="updateTemp"></update-temp>
  </div>
</template>

<script setup lang="ts">
import { useMain } from '@/store/main'
import { useRouter } from 'vue-router'
import domtoimage from 'dom-to-image'
import { imgToStorage } from '@/utils/index'
import { deleteFile } from '@/utils/request'
import { ElLoading, ElMessage } from 'element-plus'
import UpdateTemp from './components/updateTemp.vue'
import { onMounted, ref } from 'vue'
import { Loading } from 'element-plus/lib/components/loading/src/service'

const router = useRouter()
const main = useMain()
const updateTemp = ref()

function gotoHome() {
  router.replace({
    path: '/',
  })
}

// 外链
function gotoLink(url) {
  location.href = url
}

/**
 * 将装修操作太转化为base64图片
 */
async function imgToFile() {
  let boardCenterCore: any = document.querySelector('.core_temp')
  let dataUrl = await domtoimage.toPng(boardCenterCore, {
    cacheBust: true,
    height: main.pageHeight >= 650 ? 650 : main.pageHeight,
    width: 325,
    style: {
      left: '0',
      right: '0',
      bottom: '0',
      top: '-100px', // 去除头部状态栏
      transform: 'translate(0%, 0%) scale(1)',
    },
  })
  return dataUrl
}

// 保存页面
async function savePage() {
  const loading = ElLoading.service({
    lock: true,
    text: '保存中...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  main.hoverCompIndex = -1
  main.acIdx = []

  // 删除原本缩略图
  let deleteF
  if (main.thmbImgFileId) {
    deleteF = () => deleteFile([main.thmbImgFileId])
  } else {
    deleteF = () => Promise.resolve()
  }
  await deleteF()
  // 开始保存逻辑
  let img = await imgToFile()
  let url = await imgToStorage(img, `${main.pageId}_${new Date().getTime()}.png`, 'pagePhoto')
  const res = await main.savePage(url.tempFileURL, url.fileID)
  console.log(res)
  loading.close()
  setTimeout(() => {
    updateTemp.value.open()
  }, 200)
}
</script>

<style lang="less" scoped>
.main_header {
  position: relative;
  height: 49px;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  padding: 0 20px;
  .header_left {
    cursor: pointer;
  }
  .header_right {
    display: flex;
    .header_menu {
      margin-right: 48px;
      display: flex;
      .menu_item {
        cursor: pointer;
        margin-left: 18px;
        display: flex;
        align-items: center;
        .item_icon {
          width: 24px;
          height: 24px;
        }
        .item_text {
          margin-left: 5px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
