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
      mouseType: 0, // 当前鼠标按下的单位 1 容器 2 组件 3 缩放点 4 容器增加点
      potinLock: 0, // 当前是否存在按下的设定点
    }
  },
  mutations: {
    // 鼠标按下
    down_mouseLock(state) {
      state.mouseLock = true
    },
    up_mouseLock(state) {
      state.mouseLock = false
      state.potinLock = 0
      state.mouseType = 0
    },
    toggle_mouseType(state, type) {
      state.mouseType = type
    },
    // 添加容器
    set_containerList(state) {
      state.containerList.push({
        id: guid(),
        cssModule: {
          width: 375,
          height: 200,
          position: 'relative',
          top: 0,
          left: 0,
          backgroundColor: '#59c7f9',
        },
        components: [], // 当前页面数据
      })
    },
    // 设置父级
    toggleActive(state, id) {
      state.activeCont = id
      let index = state.containerList.findIndex((e) => e.id == state.activeCont)
      if (index != null) {
        state.coordinate = [index]
      } else {
        state.coordinate = []
      }
    },
    // 设置父子 以及下标(缓存) id 子组件id
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
    // 删除父级
    deleteParentCont(state, id) {
      let index = state.containerList.findIndex((e) => e.id == state.activeCont)
      state.containerList.splice(index, 1)
      // 对当前选中需要进行处理
      if (id == state.activeCont) {
        state.coordinate = []
        state.activeCont = ''
        state.activechild = ''
      }
    },
    // 删除子级
    deleteChildComp(state, id) {
      parentFor: for (let i = 0; i < state.containerList.length; i++) {
        const e = state.containerList[i]
        for (let j = 0; j < e.components.length; j++) {
          const c = e.components[j]
          if (c.id == id) {
            e.components.splice(j, 1)
            // 跳出父级循环
            break parentFor
          }
        }
      }
    },
    // 更新下标点,拖拽完成后重新计算
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
      state.activechild = ''
    },

    // 更新选中组件的x,y
    updateCarryXY(state, data) {
      if (state.coordinate.length == 2) {
        let parcssModule = getParentCssModule(state)
        let childcssModule = getChildCssModule(state)
        let { width, height } = parcssModule
        let { top, left, width: cwidth, height: cheight } = childcssModule
        let newtop = top + data.y
        let mewleft = left + data.x
        if (newtop >= 0 && newtop + cheight <= height) {
          childcssModule.top = newtop
        }
        if (mewleft >= 0 && mewleft + cwidth <= width) {
          childcssModule.left = mewleft
        }
      }
    },
    updateCarryPoint(state, data) {
      let parcssModule = getParentCssModule(state)
      let childcssModule = getChildCssModule(state)
      let { width, height } = parcssModule
      let { top, left, width: cwidth, height: cheight } = childcssModule
      childcssModule.width = cwidth + data.x
      childcssModule.height = cheight + data.y
    },
    updateCarryHeight(state, data) {
      let parcssModule = getParentCssModule(state)
      parcssModule.height = parcssModule.height + data.y
    },
    // 设定当前准备设置元素的点
    pointDataUpdate(state, type) {
      state.potinLock = type
    },
  },
  actions: {},
}

function getParentCssModule(state) {
  return state.containerList[state.coordinate[0]].cssModule
}

function getChildCssModule(state) {
  return state.containerList[state.coordinate[0]].components[state.coordinate[1]].cssModule
}

export default core
