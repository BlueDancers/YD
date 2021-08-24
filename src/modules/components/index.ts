import { guid } from '@/utils'

export interface baseComponent {
  id: String
  name: string
  cssModule: any
  staticData: any
  configuration: any
  function: any
}

function baseComList(name: string, zIndex) {
  const list: baseComponent[] = [
    {
      id: guid(),
      name: 'v-button',
      cssModule: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10 + zIndex,
        backGroundColor: '',
        fontSize: '',
        width: 50,
        height: 30,
        top: 10 + zIndex * 5,
        left: 10 + zIndex * 5,
      }, // 样式
      staticData: {
        value: '按钮',
      }, // 展示文字
      configuration: {}, // 行为
      function: {}, // 方法
    },
    {
      id: guid(),
      name: 'v-img',
      cssModule: {
        position: 'absolute',
        zIndex: 10 + zIndex,
        backGroundColor: '',
        fontSize: '',
        width: 100,
        height: 100,
        top: 10,
        left: 10,
      }, // 样式
      staticData: {}, // 展示文字
      configuration: {}, // 行为
      function: {}, // 方法
    },
    {
      id: guid(),
      name: 'v-input',
      cssModule: {
        position: 'absolute',
        zIndex: 10 + zIndex,
        backGroundColor: '',
        fontSize: '',
        width: 100,
        height: 100,
        top: 10,
        left: 10,
      }, // 样式
      staticData: {}, // 展示文字
      configuration: {}, // 行为
      function: {}, // 方法
    },
    {
      id: guid(),
      name: 'v-span',
      cssModule: {
        position: 'absolute',
        zIndex: 10 + zIndex,
        backGroundColor: '',
        fontSize: '',
        top: 10,
        left: 10,
      }, // 样式
      staticData: {}, // 展示文字
      configuration: {}, // 行为
      function: {}, // 方法
    },
  ]
  return list.find((e) => (e.name = name))
}

export { baseComList }
