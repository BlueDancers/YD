/**
 * 生成随机id
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 当前css数据是否需要增加单位
 * @param name css属性名称
 * @returns 
 */
export function cssTopx(name) {
  return ['width', 'height', 'x', 'y', 'top', 'left', 'borderWidth', 'fontSize', 'borderRadius'].includes(name)
}

/**
 * 格式化
 */
export function resetCss(data: Object) {
  const cssData = {}
  for (const key in data) {
    if (cssTopx(key)) {
      cssData[key] = `${data[key]}px`
    } else {
      cssData[key] = data[key]
    }
  }
  return cssData
}
