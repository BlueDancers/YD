import { useCloud } from '@/utils/Hook/useRequest'
import { defineStore } from 'pinia'
import { useCoreStore } from './core'

let core = useCoreStore()
export const useBoardStore = defineStore('board', {
  state: () => {
    return {
      top: 60, // 具体顶部高度
      left: 50, // 具体左边距离
      scale: 1, // 缩放比例
      height: 800, // 页面高度
      isMeta: false, // 是否按住command
      lock: {
        heightLink: false, // 当前是否在拖动高度
      },
      pageDetail: {
        backColor: '#ffffff', // 背景色
        disp: '', // 描述
        organizeId: '', // 组织id
        pageType: 1, // 1 长列表 2 多页面
        router: '11', // 客户端路由
        routerName: '11', // 网页名称
        tumbUrl: '', // 缩略图
        _id: '', // 当前页面id
        _openid: '', // 用户openid
      },
      pageDataId: '',
    }
  },
  actions: {
    getPageData(id) {
      useCloud('pageList')
        .doc(id)
        .get()
        .then((res) => {
          this.pageDetail = res.data[0]
          console.log(this.pageDetail)
        })
      // 根据id 获取装修数据
      useCloud('pageDetails')
        .where({
          pageId: id,
        })
        .get()
        .then((res) => {
          if (res.data.length) {
            this.pageDataId = res.data[0]._id
            core.pageData = res.data[0].content
          }
        })
    },
  },
})
