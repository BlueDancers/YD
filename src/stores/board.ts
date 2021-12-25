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
      width: 320, // 页面宽度
      pageDetail: {
        // 非静态数据
        backColor: '#ffffff', // 背景色
        height: 700, // 页面高度
        disp: '', // 描述
        organizeId: '', // 组织id
        pageType: 1, // 1 长列表 2 多页面
        router: '11', // 客户端路由
        routerName: '11', // 网页名称
        tumbUrl: [] as string[], // 缩略图
        _id: '', // 当前页面合计id 合计中不包含数据
        _openid: '', // 用户openid
      },
      pageDataId: '', // 页面数据id
    }
  },
  actions: {
    /**
     * 获取页面数据
     * @param id
     */
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
          console.log(res.data)
          this.pageDataId = res.data[0]._id
          core.pageData = res.data[0].content
          // 如果当前无页面,则增加页面
          if (res.data[0].content.length == 0) {
            core.addPage()
          }
        })
    },
  },
})
