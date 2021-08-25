import { baseComList } from '@/modules/components'
import { guid } from '@/utils'
import { message } from 'ant-design-vue'
import { Module } from 'vuex'
import store from '..'

const core: Module<any, any> = {
  namespaced: true,
  state() {
    return {
      activeCont: '', // 当前选中的父级组件
      activechild: '', // 当前选中的子类组件
      containerList: [],
      coordinate: [], // 当前选中坐标
      mouseLock: false, // 当前是否按下鼠标
      potinLock: 0, // 当前是否存在按下的设定点
    }
  },
  mutations: {
    toggle_mouseLock(state, status) {
      state.mouseLock = status
      if (!status) {
        state.potinLock = 0
      }
    },
    // 添加容器
    set_containerList(state) {
      state.containerList.push({
        id: guid(),
        cssModule: {
          width: 375,
          height: 200,
          position: 'relative',
          backgroundColor: '#59c7f9',
        },
        components: [], // 当前页面数据
      })
    },
    // 获取当前父子下标(缓存) id 子组件id
    set_activechild(state, data) {
      let { pid, cid } = data
      state.activeCont = pid
      state.activechild = cid

      for (let index = 0; index < state.containerList.length; index++) {
        const res = state.containerList[index]
        if (res.id == state.activeCont) {
          for (let cindex = 0; cindex < res.components.length; cindex++) {
            const child = res.components[cindex]
            if (child.id == state.activechild) {
              state.coordinate = [index, cindex]
              break
            }
          }
          break
        }
      }
    },
    update_activechild(state) {
      store.commit('core/set_activechild', {
        pid: state.activeCont,
        cid: state.activechild,
      })
    },
    // 添加组件
    add_components(state, name) {
      if (state.activeCont) {
        // 寻找父级下标
        let index = state.containerList.findIndex((e) => e.id == state.activeCont)
        // 设定层级
        let zIndex = state.containerList[index].components.length
        // 获取dom数据
        let comp = baseComList(name, zIndex + 1)
        // 插入数据
        state.containerList[index].components.push(comp)
      } else {
        message.warn('请选择父级组件')
      }
    },
    changeContList(state, data) {
      state.containerList = data
    },
    clearContList(state) {
      state.coordinate = []
    },
    toggleActive(state, id) {
      state.activeCont = id
    },
    // 更新选中组件的x,y
    updateCarryXY(state, data) {
      if (state.mouseLock) {
        let fast = {
          parcssModule: state.containerList[state.coordinate[0]].cssModule,
          childcssModule: state.containerList[state.coordinate[0]].components[state.coordinate[1]].cssModule,
        }
        let { width, height } = fast.parcssModule
        let { top, left, width: cwidth, height: cheight } = fast.childcssModule
        let newtop = top + data.y
        let mewleft = left + data.x
        if (newtop >= 0 && newtop + cheight <= height) {
          fast.childcssModule.top = newtop
        }
        if (mewleft >= 0 && mewleft + cwidth <= width) {
          fast.childcssModule.left = mewleft
        }
      }
    },
    updateCarryPoint(state, data) {
      let fast = {
        parcssModule: state.containerList[state.coordinate[0]].cssModule,
        childcssModule: state.containerList[state.coordinate[0]].components[state.coordinate[1]].cssModule,
      }
      let { width, height } = fast.parcssModule
      let { top, left, width: cwidth, height: cheight } = fast.childcssModule
      let newtop = cwidth + data.x
      let mewleft = cheight + data.y
      fast.childcssModule.width = newtop
      fast.childcssModule.height = mewleft

      console.log(data)
    },
    // 设定当前准备设置元素的点
    pointDataUpdate(state, type) {
      state.potinLock = type
    },
  },
  actions: {},
}

export default core
