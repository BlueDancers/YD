import { cssTopx, guid } from '@/utils'

export function baseContList(name, carryLength) {
  const list = [
    {
      id: guid(),
      cssModule: {
        width: 375,
        height: 300,
        position: 'relative',
        top: 0,
        left: 0,
        'background-color': '#ffffff',
        'z-index': 100 - carryLength,
        'margin-top': 0,
        'margin-bottom': 0,
        'margin-left': 0,
        'margin-right': 0,
        'padding-top': 0,
        'padding-bottom': 0,
        'padding-left': 0,
        'padding-right': 0,
        'border-radius': 0,
        boxSizing: 'border-box',
      },
      components: [], // 当前页面数据
    },
  ]
  return list[0]
}

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
        'justify-content': 'center',
        alignItems: 'center',
        'background-color': '#eeeeee',
        'font-size': 14,
        color: '#000000',
        'border-color': '#ffffff',
        'border-width': 0,
        'border-style': 'solid',
        'border-radius': 0,
        width: 50,
        height: 30,
        'z-index': 10 + zIndex,
        top: 10 + zIndex * 5,
        left: 10 + zIndex * 5,
        'margin-top': 0,
        'margin-bottom': 0,
        'margin-left': 0,
        'margin-right': 0,
        'padding-top': 0,
        'padding-bottom': 0,
        'padding-left': 0,
        'padding-right': 0,
        'font-weight': 'normal',
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
        'background-color': '#eeeeee',
        color: '#000000',
        'border-color': '#ffffff',
        'border-width': 0,
        'border-style': 'solid',
        'border-radius': 0,
        width: 100,
        height: 60,
        'z-index': 10 + zIndex,
        top: 10 + zIndex * 5,
        left: 10 + zIndex * 5,
        'margin-top': 0,
        'margin-bottom': 0,
        'margin-left': 0,
        'margin-right': 0,
        'padding-top': 0,
        'padding-bottom': 0,
        'padding-left': 0,
        'padding-right': 0,
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
        'background-color': '#eeeeee',
        'font-size': 14,
        color: '#000000',
        'border-color': '#ffffff',
        'border-width': 0,
        'border-style': 'solid',
        'border-radius': 0,
        width: 100,
        height: 20,
        top: 10 + zIndex * 5,
        left: 10 + zIndex * 5,
        'z-index': 10 + zIndex,
        'margin-top': 0,
        'margin-bottom': 0,
        'margin-left': 0,
        'margin-right': 0,
        'padding-top': 0,
        'padding-bottom': 0,
        'padding-left': 0,
        'padding-right': 0,
        'font-weight': 'normal',
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
        'background-color': '#ffffff',
        'font-size': 14,
        color: '#000000',
        'border-color': '#000000',
        'border-width': 1,
        'border-style': 'solid',
        'border-radius': 0,
        width: 100,
        height: 20,
        zIndex: 10 + zIndex,
        top: 10 + zIndex * 5,
        left: 10 + zIndex * 5,
        'margin-top': 0,
        'margin-bottom': 0,
        'margin-left': 0,
        'margin-right': 0,
        'padding-top': 0,
        'padding-bottom': 0,
        'padding-left': 0,
        'padding-right': 0,
        'font-weight': 'normal',
        'text-aligin': 'center',
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
    // 组件处理 id="${res.id}"
    html = html + `<div class="${pClass}">${parentHtml}</div>`
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
      text = `${text}${key}:${obj[key] * 2}px;`
    } else {
      text = `${text}${key}:${obj[key]};`
    }
  }
  return text
}
/**
 * 根据组件生成h5标签
 * @param child 当前子组件
 * @param cClass 当前组件class名称
 * @returns
 */
function objToH5(child, cClass) {
  let label = child.name.split('-')[1] // 当前标签名称
  let { value, src, placeholder } = child.staticData
  let childHtml = ''
  let commonLabel = `class="${cClass}"` // 公共标签 id="${child.id}"
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
