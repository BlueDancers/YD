import { useCoreStore } from '@/stores/core';
import { defineComponent, ref } from 'vue-demi';
import { QrcodeOutlined, ReadOutlined, GithubOutlined } from '@ant-design/icons-vue'
import css from './index.module.scss';
import { message } from 'ant-design-vue';
import { useBoardStore } from '@/stores/board';
import { imgToFile, imgToStorage } from '@/utils';
import { useCloud } from '@/utils/Hook/useRequest';

export default defineComponent({
  components: {
    QrcodeOutlined, ReadOutlined, GithubOutlined
  },
  setup() {
    const core = useCoreStore()
    let board = useBoardStore()
    const showSave = ref(false) // 显示保存后弹窗
    const saveLoading = ref(false) // 保存loading
    // 
    function gotoHome() {

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
    // 保存逻辑
    async function saveCarryPage() {
      saveLoading.value = true
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
        saveLoading.value = false
        showSave.value = true
      })
    }
    // 弹窗点击保存 
    function handleSave() {
      showSave.value = false
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
    return () => (
      <a-row class={css.content_header}>
        <a-col class={css.header_left} span={5} onClick={gotoHome}>
          <img class={css.left_img} src={"https://6d61-mall-2gdgzk540aab98cd-1257324019.tcb.qcloud.la/base/logo.png?sign=1d3f62f4b382ac6a77868e47f709c089&t=1641199933"} alt="" />
          <span>易动</span>
        </a-col>
        <a-col class={css.header_centent} span={10}>
          {/* <div class={css.content_item} onClick={core.revoke}>
            <svg-icon class={css.content_item_icon} name="chexiao2" />
            <span class={css.content_item_title}>撤销</span>
          </div>
          <div class={css.content_item} onClick={core.recovery}>
            <svg-icon class={[css.content_item_icon, css.flip]} name="chexiao2" />
            <span class={css.content_item_title}>恢复</span>
          </div>
          <div class={css.content_line}></div> */}
        </a-col>
        <a-col class={css.header_right} span={9}>
          <div class={css.right_item} onClick={gotoDoc}>
            <ReadOutlined style={{ fontSize: '120%' }} />
            <span class={css.right_item_text}>文档</span>
          </div>
          <div class={css.right_item} onClick={gotoGithub}>
            <GithubOutlined style={{ fontSize: '120%' }} />
            <span class={css.right_item_text}>Github</span>
          </div>
          <div class={css.right_item} onClick={gotoIM}>
            <QrcodeOutlined style={{ fontSize: '120%' }} />
            <span class={css.right_item_text}>交流群</span>
          </div>
          {/* <a-button class={css.right_btn} onClick={jsonProcessor} type={"primary"}>生成代码</a-button> */}
          <a-button class={css.right_btn} onClick={saveCarryPage} type={"primary"} loading={saveLoading.value}>保存</a-button>


        </a-col>
        {/* 保存弹窗 */}
        <a-modal v-model={[showSave.value, 'visible']} width={"1000px"} title={"发布成功"} onOk={handleSave}>
          <div class={css.save_modal}>
            <div class={css.modal_left}>1</div>
            <div class={css.modal_right}>1</div>
          </div>
        </a-modal>
      </a-row>
    )
  }
})