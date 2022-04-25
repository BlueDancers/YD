import { uploadFile } from './request'

/**
 * 格式化时间
 * @param time
 * @param config
 * @returns
 */
export function parseTime(time, config: { cFormat?; isZero? }) {
  config.isZero = config.isZero == undefined ? true : config.isZero
  config.cFormat = config.cFormat == undefined ? '{y}-{m}-{d} {h}:{i}:{s}' : config.cFormat
  if (arguments.length === 0) {
    return null
  }
  const format = config.cFormat
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10 && config.isZero) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 生成随机id
 */
export function guid() {
  return Number(Math.random().toString().substr(2, 0) + Date.now()).toString(36)
}

/**
 * 是否是邮箱格式
 * @param {str} 判断的字符串
 */
export const isEmail = (str: string) => {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
}

let _debounceTimeout: any = undefined,
  _throttleRunning = false

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const debounce = (fn, delay = 500) => {
  clearTimeout(_debounceTimeout)
  _debounceTimeout = setTimeout(() => {
    fn()
  }, delay)
}
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const throttle = (fn, delay = 500) => {
  if (_throttleRunning) {
    return
  }
  _throttleRunning = true
  fn()
  setTimeout(() => {
    _throttleRunning = false
  }, delay)
}

/**
 * clone对象
 * @param obj
 * @returns
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * base64转file文件
 * @param dataurl
 * @param filename
 * @returns
 */
export function dataURLtoFile(dataurl: string, filename: string) {
  // 获取到base64编码
  const arr = dataurl.split(',')
  // 将base64编码转为字符串
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n) // 创建初始化为0的，包含length个元素的无符号整型数组
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {
    type: 'image/jpeg',
  })
}

/**
 * 上传图片到服务端
 * @param dataUrl 图片base64
 * @param fileName 文件名称
 * @param fileDir 文件存在文件夹
 * @returns
 */
export async function imgToStorage(dataUrl, fileName, fileDir) {
  let file: any = dataURLtoFile(dataUrl, `${fileName}.jpg`)
  let url = await uploadFile(`${fileDir}/${file.name}`, file)
  return url
}

/**
 * 格式化数组
 * @param price 未格式化文字
 * @param minNum 小数位数
 */
export function numberFun(price, minNum) {
  if (price > 0) {
    if (String(price).includes('.')) {
      return Number(price.toFixed(minNum))
    } else {
      return price
    }
  } else {
    return 0
  }
}

/**
 * 容器用
 * @param data
 * @returns
 */
export function contResetCss(data: Object) {
  let css = resetCss(data)
  return {
    position: css.position,
    'z-index': css['z-index'],
    top: css.top,
    left: css.left,
    width: css.width,
    height: css.height,
    // padding: `${css['padding-top']} ${css['padding-left']} ${css['padding-bottom']} ${css['padding-right']}`,
  }
}

/**
 * 元素本体样式
 * @param data
 * @returns
 */
export function compResetCss(data: Object) {
  let newCss = resetCss(data)
  delete newCss.position
  delete newCss['z-index']
  delete newCss.top
  delete newCss.left
  return newCss
}

/**
 * 格式化
 */
export function resetCss(data: Object): any {
  const cssData = {}
  for (const key in data) {
    if (cssTopx(key) && !String(data[key]).includes('%')) {
      cssData[key] = `${data[key]}px`
    } else {
      cssData[key] = data[key]
    }
  }
  return cssData
}

/**
 * 当前css数据是否需要增加单位
 * @param name css属性名称
 * @returns
 */
export function cssTopx(name) {
  return [
    'width',
    'height',
    'x',
    'y',
    'top',
    'left',
    'border-width',
    'font-size',
    'border-radius',
    'margin-top',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'padding-top',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'grid-row-gap',
    'grid-column-gap',
  ].includes(name)
}
