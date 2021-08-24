function baseComList(name: string, zIndex) {
  const list = [
    {
      name: 'v-button',
      cssModlue: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10 + zIndex,
        backGroundColor: '',
        fontSize: '',
        width: 100,
        height: 100,
        top: 10,
        left: 10,
      }, // 样式
      configuration: {}, // 行为
      function: {}, // 方法
    },
    {
      name: 'v-img',
      cssModlue: {
        position: 'absolute',
        zIndex: 10 + zIndex,
        backGroundColor: '',
        fontSize: '',
        width: 100,
        height: 100,
        top: 10,
        left: 10,
      }, // 样式
      configuration: {}, // 行为
      function: {}, // 方法
    },
    {
      name: 'v-input',
      cssModlue: {
        position: 'absolute',
        zIndex: 10 + zIndex,
        backGroundColor: '',
        fontSize: '',
        width: 100,
        height: 100,
        top: 10,
        left: 10,
      }, // 样式
      configuration: {}, // 行为
      function: {}, // 方法
    },
    {
      name: 'v-span',
      cssModlue: {
        position: 'absolute',
        zIndex: 10 + zIndex,
        backGroundColor: '',
        fontSize: '',
        top: 10,
        left: 10,
      }, // 样式
      configuration: {}, // 行为
      function: {}, // 方法
    },
  ]
  return list.find((e) => (e.name = name))
}

export { baseComList }
