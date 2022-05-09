import { baseComList, baseComponent } from '@/modules/component'
import { useCloud } from '@/utils/request'
import { ElMessage, ElNotification } from 'element-plus'
import { watch } from 'vue'
import { defineStore } from 'pinia'
import { stateHistory } from './History'

let stateHis = stateHistory()

export const useMain = defineStore('main', {
  state: () => {
    return {
      organizeId: '', // 组织id
      pageId: '', // 页面id
      thmbImgFileId: '', // 页面缩略图id
      pageTitle: '', // 网页名称
      pageRouter: '', // 网页地址
      backColor: '#fff', // 页面背景颜色
      pageHeight: 650, // 页面高度
      template: [] as baseComponent[], // 组件数组
      moveIndex: 0, // 当前拖动类型 1-8 坐标点 9 底部高度条 10 按住元素
      hoverCompIndex: -1, //
      acIdx: [] as number[], //
      lockCompId: [] as string[], // 锁住的元素id
      isCtrl: false, // 当前是否按下ctrl键
    }
  },
  getters: {
    acTEmpName(state) {
      return state.acIdx.length == 1 ? state.template[state.acIdx[0]].name : ''
    },
    acTempCss(state) {
      return state.acIdx.length == 1 ? state.template[state.acIdx[0]].cssModule : {}
    },
    acTempData(state) {
      return state.acIdx.length == 1 ? state.template[state.acIdx[0]].staticData : {}
    },
  },
  actions: {
    getTempData() {
      // 获取页面大致数据
      useCloud('pageList')
        .doc(this.pageId)
        .get()
        .then((res) => {
          console.log(res)
          if (res.data.length == 1) {
            this.organizeId = res.data[0].organizeId
            this.pageTitle = res.data[0].title
            this.pageRouter = res.data[0].router
            this.thmbImgFileId = res.data[0].thmbImgFileId
          }
        })
      // 获取页面装修数据信息
      useCloud('pageDetails')
        .where({
          pageId: this.pageId,
        })
        .get()
        .then((res) => {
          console.log('详细数据', res.data)
          if (res.data.length == 1) {
            let { template, height, backColor } = res.data[0]
            this.template = template
            this.pageHeight = height
            this.backColor = backColor
            // 历史记录进行保存
            stateHis.addHis(this.template)
          } else {
            console.log('数据异常')
          }
          console.log(this.template)
        })
    },
    addComp(name, data?) {
      let dom = baseComList(name, this.template.length + 1)
      if (dom) {
        if (data) {
          dom.cssModule.top = data.top - dom.cssModule.height / 2
          dom.cssModule.left = data.left - dom.cssModule.width / 2
        }
        this.template.push({ ...dom })
      }
    },
    deleteComp(index) {
      // if (this.acIdx.length == 0) {
      //   ElMessage.warning('请选择元素')
      // } else if (this.acIdx.length != 1) {
      //   ElNotification.warning('该操作暂不支持多选')
      // } else {
      // }
      this.template.splice(index, 1)
      this.acIdx = []
      this.hoverCompIndex = -1
      stateHis.addHis(this.template) // 删除元素记录历史
    },
    updateLockComp(id) {
      let idx = this.lockCompId.findIndex((e) => e == id)
      if (idx == -1) {
        this.lockCompId.push(id)
      } else {
        this.lockCompId.splice(idx, 1)
      }
    },
    toggleComp(index: number) {
      let id = this.template[index].id
      // 按住ctrl就是多选
      if (this.isCtrl) {
        if (!this.acIdx.includes(index)) {
          this.acIdx.push(index)
        }
      } else {
        if (this.acIdx.length <= 1) {
          this.acIdx = [index]
        } else {
          if (!this.acIdx.includes(index)) {
            this.acIdx = [index]
          }
        }
      }
      // 判断是否被锁
      if (!this.lockCompId.includes(id)) {
        this.changeMoveIndex(10)
      }
    },
    // 切换拖拽标识
    changeMoveIndex(index: number) {
      if (this.moveIndex == 0) {
        this.moveIndex = index
      }
      if (index == 0) {
        this.moveIndex = 0
      }
    },
    // 层级互换逻辑
    exchangeComp(oldIdx, newIdx) {
      this.template[oldIdx] = this.template.splice(newIdx, 1, this.template[oldIdx])[0]
      this.hoverCompIndex = newIdx
      this.acIdx = [newIdx]
    },
    // 撤回
    revoke() {
      try {
        this.template = stateHis.revokeHis()
      } catch (err) {
        ElNotification.error(String(err))
      }
    },
    // 反撤回
    backRevoke() {
      try {
        this.template = stateHis.backRevokeHis()
      } catch (err) {
        ElNotification.error(String(err))
      }
    },
    savePage(thmbImg, fileID) {
      // 更新页面信息
      let updatePageList = useCloud('pageList').doc(this.pageId).update({
        title: this.pageTitle,
        thmbImg: thmbImg,
        thmbImgFileId: fileID,
      })
      // 保存模板信息
      let updatePageDetails = useCloud('pageDetails')
        .where({
          pageId: this.pageId,
        })
        .update({
          height: this.pageHeight,
          backColor: this.backColor,
          template: this.template,
        })

      return Promise.all([updatePageList, updatePageDetails])
    },
  },
})

// 启动时间旅行功能
useMain().$subscribe((mutation, state) => {
  // 只有元素相关改动才会被记录到时间旅行
  if ((mutation.events as any).target.position == 'absolute') {
    stateHis.addHis(state.template)
  }
})

const main = useMain()
