import { cssTopx, guid } from '@/utils'

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
        backgroundColor: '#eeeeee',
        fontSize: 14,
        color: '#000000',
        borderColor: '#ffffff',
        borderWidth: 0,
        borderStyle: 'solid',
        borderRadius: 0,
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
        backgroundColor: '#eeeeee',
        color: '#000000',
        borderColor: '#ffffff',
        borderWidth: 0,
        borderStyle: 'solid',
        borderRadius: 0,
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
        backgroundColor: '#eeeeee',
        fontSize: 14,
        color: '#000000',
        borderColor: '#ffffff',
        borderWidth: 0,
        borderStyle: 'solid',
        borderRadius: 0,
        width: 100,
        height: 20,
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
        backgroundColor: '#ffffff',
        fontSize: 14,
        color: '#000000',
        borderColor: '#000000',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 0,
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

/**
 * json转vue代码
 * @param components
 */
function jsonToVue(components: any[]) {
  console.log(components)
  let html = ''
  let css = ''

  components.map((res) => {
    let pClass = getClass()
    // 开始组装代码
    let parentHtml = ''
    // 全局样式处理
    let classItem = ''
    res.components.map((child) => {
      let cClass = getClass() // 当前class名称
      // 解析html
      parentHtml = `${parentHtml}${objToH5(child, cClass)}`
      // 解析css
      classItem = `${classItem}.${pClass} .${cClass}{${objToClass(child.cssModule)}}`
    })
    // 组件处理
    html = html + `<div id="${1 || res.id}" class="${pClass}">${parentHtml}</div>`
    css = css + `.${pClass}{${objToClass(res.cssModule)}}${classItem}`
  })
  html = `<template><div>${html}</div></template>`
  css = `<style>${css}</style>`
  downFile(`${html}${css}`)
}

/**
 * 获取随机class名称
 * @returns
 */
function getClass() {
  return Math.random().toString(36).slice(-8)
}

/**
 * 将对象转为css
 * @param obj
 * @returns
 */
function objToClass(obj) {
  let text = ''
  for (const key in obj) {
    if (cssTopx(key)) {
      text = `${text}${key}:${obj[key]}px;`
    } else {
      text = `${text}${key}:${obj[key]};`
    }
  }
  return text
}

function objToH5(child, cClass) {
  let label = child.name.split('-')[1] // 当前标签名称
  let { value, src, placeholder } = child.staticData
  let childHtml = ''
  let commonLabel = `id="${1 || child.id}" class="${cClass}"` // 公共标签
  switch (label) {
    case 'button':
      childHtml = `<${label} ${commonLabel}>${value}</${label}>`
      break
    case 'img':
      childHtml = `<${label} ${commonLabel} src="${src}"/>`
      break
    case 'p':
      childHtml = `<${label} ${commonLabel}>${value}</${label}>`
      break
    case 'input':
      childHtml = `<${label} ${commonLabel} placeholder="${placeholder}"></${label}>`
      break
    default:
      break
  }
  return childHtml
}

/**
 * 下载代码文件
 */
function downFile(text: string) {
  const blob = new Blob([text], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'index.vue'
  document.documentElement.appendChild(a)
  a.click()
  document.documentElement.removeChild(a)
}

export { baseComList, jsonToVue }
