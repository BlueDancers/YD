import { cssTopx, guid } from '@/utils'

export function baseContList(name, carryLength) {
  const list = [
    {
      id: guid(),
      name: 'default',
      cssModule: {
        width: 375,
        height: 300,
        position: 'relative',
        top: 0,
        left: 0,
        'background-color': '#ffffff',
        'z-index': 100 - carryLength,
        ...borderData(),
        ...padAndMar(),
        'box-shadow': '0px 0px 0px #333',
        display: 'block',
      },
      components: [], // 当前页面数据
    },
    {
      id: guid(),
      name: 'grid',
      cssModule: {
        width: 375,
        height: '100%',
        position: 'relative',
        top: 0,
        left: 0,
        'background-color': '#ffffff',
        'z-index': 100 - carryLength,
        ...borderData(),
        ...padAndMar(),
        'box-shadow': '0px 0px 0px #333',
        display: 'grid',
        'grid-template-columns': '1fr 1fr 1fr', // 行
        'grid-template-rows': '1fr 1fr 1fr', // 列
        'grid-row-gap': 10, // 列之间间距
        'grid-column-gap': 10, // 行之间间距
      },
      components: [], // 当前页面数据
    },
    {
      id: guid(),
      name: 'flex',
      cssModule: {
        width: 375,
        height: 300,
        position: 'relative',
        top: 0,
        left: 0,
        'background-color': '#ffffff',
        'z-index': 100 - carryLength,
        ...borderData(),
        ...padAndMar(),
        'box-shadow': '0px 0px 0px #333',
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'wrap',
        'align-items': 'center',
        'justify-content': 'center',
      },
      components: [], // 当前页面数据
    },
  ]
  return list.find((e) => e.name == name)
}

export interface baseComponent {
  id: String
  name: string
  cssModule: any
  staticData: any
  configuration: any
  function: any
}

/**
 *
 * @param name 组件名称
 * @param zIndex 本次层级
 * @returns
 */
function baseComList(name: string, zIndex) {
  const list: baseComponent[] = [
    {
      id: guid(),
      name: 'y-div',
      cssModule: {
        ...absolute(zIndex),
        ...borderData(),
        ...padAndMar(),
        ...compSize(50, 30),
        color: '#000000',
        'background-color': '#eeeeee',
      }, // 样式
      staticData: {},
      configuration: {
        externalUrl: '',
      }, // 行为
      function: {}, // 方法
    },
    {
      id: guid(),
      name: 'y-button',
      cssModule: {
        ...absolute(zIndex),
        ...borderData(),
        ...padAndMar(),
        ...compSize(50, 30),
        color: '#000000',
        'font-weight': 'normal',
        'background-color': '#eeeeee',
        'font-size': 14,
      }, // 样式
      staticData: {
        value: '按钮',
      }, // 展示文字
      configuration: {
        externalUrl: '',
      }, // 行为
      function: {}, // 方法
    },
    {
      id: guid(),
      name: 'y-img',
      cssModule: {
        ...absolute(zIndex),
        ...borderData(),
        ...padAndMar(),
        ...compSize(100, 60),
        'background-color': '#ffffff00',
      }, // 样式
      staticData: {
        src: 'https://6d61-mall-2gdgzk540aab98cd-1257324019.tcb.qcloud.la/staticImg/2467230789@qq.com_1630595086742.png',
      }, // 展示文字
      configuration: {
        externalUrl: '',
      }, // 行为
      function: {}, // 方法
    },
    // {
    //   id: guid(),
    //   name: 'y-input',
    //   cssModule: {
    //     ...absolute(contName, zIndex),
    //     ...borderData(),
    //     ...padAndMar(),
    //     ...compSize(contName, 100, 20),
    //     'background-color': '#eeeeee',
    //     'font-size': 14,
    //     color: '#000000',
    //     'font-weight': 'normal',
    //   }, // 样式
    //   staticData: {
    //     type: 'text',
    //     placeholder: '请输入文字',
    //   }, // 展示文字
    //   configuration: {}, // 行为
    //   function: {}, // 方法
    // },
    {
      id: guid(),
      name: 'y-p',
      cssModule: {
        ...absolute(zIndex),
        ...borderData(),
        ...padAndMar(),
        ...compSize(100, 20),
        'font-weight': 'normal',
        'text-align': 'center',
        'background-color': '#ffffff',
        'font-size': 14,
        color: '#000000',
      }, // 样式
      staticData: {
        value: '点击点击文字',
      }, // 展示文字
      configuration: {}, // 行为
      function: {}, // 方法
    },
  ]
  return list.find((e) => e.name == name)
}

/**
 * 统一内外边距封装
 * @returns
 */
function padAndMar() {
  return {
    'margin-top': 0,
    'margin-bottom': 0,
    'margin-left': 0,
    'margin-right': 0,
    'padding-top': 0,
    'padding-bottom': 0,
    'padding-left': 0,
    'padding-right': 0,
    'box-sizing': 'border-box',
  }
}
/**
 * 边框封装
 * @returns
 */
function borderData() {
  return {
    'border-color': '#000000',
    'border-width': 0,
    'border-style': 'solid',
    'border-radius': 0,
  }
}

/**
 * 子组件根据容器修改定义状态
 * @param contName
 * @param zIndex
 * @returns
 */
function absolute(zIndex) {
  return {
    position: 'absolute',
    'z-index': 10 + zIndex,
    top: 10 + zIndex * 5,
    left: 10 + zIndex * 5,
  }
}

function compSize(width, height) {
  return {
    width,
    height,
  }
}

function compNameObj(name) {
  let nameObj = {
    'y-div': '模块',
  }
  return nameObj[name]
}

export { baseComList, compNameObj }
