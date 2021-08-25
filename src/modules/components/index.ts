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
      name: 'y-button',
      cssModule: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backGroundColor: '',
        fontSize: '',
        width: 50,
        height: 30,
        zIndex: 10 + zIndex,
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
      name: 'y-img',
      cssModule: {
        position: 'absolute',
        backGroundColor: '',
        fontSize: '',
        width: 100,
        height: 60,
        zIndex: 10 + zIndex,
        top: 10 + zIndex * 5,
        left: 10 + zIndex * 5,
      }, // 样式
      staticData: {
        src: 'https://images.591wsh.com/2021/08/03/thumb_1627959419101.png',
      }, // 展示文字
      configuration: {}, // 行为
      function: {}, // 方法
    },
    {
      id: guid(),
      name: 'y-input',
      cssModule: {
        position: 'absolute',
        backGroundColor: '',
        fontSize: '',
        width: 100,
        height: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        zIndex: 10 + zIndex,
        top: 10 + zIndex * 5,
        left: 10 + zIndex * 5,
      }, // 样式
      staticData: {
        type: 'text',
        placeholder: '请输入文字',
      }, // 展示文字
      configuration: {}, // 行为
      function: {}, // 方法
    },
    {
      id: guid(),
      name: 'y-p',
      cssModule: {
        position: 'absolute',
        backGroundColor: '',
        fontSize: '',
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        width: 100,
        height: 20,
        zIndex: 10 + zIndex,
        top: 10 + zIndex * 5,
        left: 10 + zIndex * 5,
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

export { baseComList }
