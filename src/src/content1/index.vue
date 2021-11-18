<template>
  <div class="page_content">
    <a-row class="content_header">
      <a-col class="header_left" :span="5" @click="gotoHome">
        <img class="left_img" src="@/assets/logo.png" alt="" />
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
        <a-button class="right_btn" @click="jsonProcessor" type="primary">生成代码</a-button>
        <a-button class="right_btn" @click="saveCarryPage" type="primary">保存</a-button>
      </a-col>
    </a-row>
    <!-- 操作台 -->
    <div class="content_main">
      <page-left></page-left>
      <page-center></page-center>
      <page-right></page-right>
    </div>
    <!-- 生成代码设置 -->
    <build-settings ref="buildSettings"></build-settings>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue'
import html2canvas from 'html2canvas'
import PageLeft from './components/left.vue'
import PageRight from './components/right.vue'
import PageCenter from './components/center.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { cloud, uploadFile } from '@/modules/request'
import { dataURLtoFile } from '@/utils'
import { message } from 'ant-design-vue'
import BuildSettings from './components/components/buildSettings.vue'
import { QrcodeOutlined, ReadOutlined, GithubOutlined } from '@ant-design/icons-vue'
import backMouseEvent from '../../modules/mouseEvent/index'
export default defineComponent({
  components: {
    PageLeft,
    PageRight,
    PageCenter,
    BuildSettings,
    QrcodeOutlined,
    ReadOutlined,
    GithubOutlined,
  },
  setup() {
    const db = cloud.database()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const buildSettings = ref()
    onMounted(() => {
      let id: string = String(route.query.id)
      // 获取页面数据
      db.collection('pageList')
        .doc(id)
        .get()
        .then((res) => {
          if (res.data.length == 1) {
            store.commit('core/change_Template', res.data[0])
            store.commit('core/change_Temp_other', res.data[0])
          } else {
            console.log('获取页面数据失败')
          }
        })
      // 键盘监听事件
      backMouseEvent()
    })
    let containerList = computed(() => store.state.core.containerList)
    let _id = computed(() => store.state.core._id)
    const saveCarryPage = async () => {
      console.log(containerList.value)
      // 生成缩略图
      let thub = await getThumbnail()
      db.collection('pageList')
        .where({
          _id: route.query.id,
        })
        .update({
          content: containerList.value,
          tumbUrl: thub,
        })
        .then((res) => {
          console.log(res)
          message.success('页面保存成功')
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const jsonProcessor = () => {
      // 打开弹窗
      buildSettings.value.handleOk()
    }
    const gotoHome = () => {
      router.replace({
        name: 'home',
      })
    }
    const getThumbnail = async () => {
      let core: any = document.querySelector('.main_iframe')
      let photo = await html2canvas(core, {
        useCORS: true,
        scale: 1,
        width: 375,
        height: 700,
      })

      let file: any = dataURLtoFile(photo.toDataURL('image/jpeg'), `${_id.value}.jpg`)
      let url = await uploadFile(`pagePhoto/${file.name}`, file)
      return url
    }
    const gotoDoc = () => {
      message.info('开发中,敬请期待👨‍💻🧑‍💻👩‍💻')
    }
    const gotoGithub = () => {
      location.href = 'https://github.com/vkcyan/H5-YD.v2'
    }
    const gotoIM = () => {
      message.info('开发中,敬请期待👨‍💻🧑‍💻👩‍💻')
    }

    return {
      saveCarryPage,
      gotoHome,
      jsonProcessor,
      buildSettings,
      gotoDoc,
      gotoGithub,
      gotoIM,
    }
  },
})
</script>

<style lang="scss" scoped>
.page_content {
  .content_header {
    position: relative;
    z-index: 10;
    box-shadow: 0 2px 13px 0 rgb(0 0 0 / 10%);
    background-color: #f8f9fa;
    height: 50px;
    padding: 0 20px;
    .header_left {
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
  .content_main {
    height: calc(100vh - 50px);
    display: flex;
    justify-content: space-between;
  }
}
</style>
