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
  return ['width', 'height', 'x', 'y', 'top', 'left', 'borderWidth', 'fontSize', 'borderRadius','marginTop'].includes(name)
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
