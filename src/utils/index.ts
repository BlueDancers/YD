/**
 * 生成随机id
 */
export function guid() {
  return Number(Math.random().toString().substr(2, 0) + Date.now()).toString(36)
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
 * 容器用
 * @param data
 * @returns
 */
export function contResetCss(data: Object) {
  let newCss = resetCss(data)
  return {
    position: newCss.position,
    'z-index': newCss['z-index'],
    top: newCss.top,
    left: newCss.left,
    width: newCss.width,
    height: newCss.height,
  }
}

export function compResetCss(data: Object) {
  let newCss = resetCss(data)
  delete newCss.position
  delete newCss['z-index']
  delete newCss.top
  delete newCss.left
  return newCss
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
 * 生成指定随机数
 * @param min
 * @param max
 * @returns
 */
export function getRandom(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值
}

export function getBase64Image(img) {
  let canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  let ctx: any = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  let dataURL = canvas.toDataURL('image/png') // 可选其他值 image/jpeg
  return dataURL
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
 * base64转blob文件
 * @param dataURI
 * @returns
 */
export function dataURItoBlob(dataURI) {
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0] // mime类型
  var byteString = atob(dataURI.split(',')[1]) //base64 解码
  var arrayBuffer = new ArrayBuffer(byteString.length) //创建缓冲数组
  var intArray = new Uint8Array(arrayBuffer) //创建视图

  for (var i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([intArray], { type: mimeString })
}

/**
 * blob 转 url
 * @param base64
 * @param contentType
 * @returns
 */
export function translateBase64ImgToBlob(base64, contentType) {
  var arr = base64.split(',') //去掉base64格式图片的头部
  var bstr = atob(arr[1]) //atob()方法将数据解码
  var leng = bstr.length
  var u8arr = new Uint8Array(leng)
  while (leng--) {
    u8arr[leng] = bstr.charCodeAt(leng) //返回指定位置的字符的 Unicode 编码
  }
  var blob = new Blob([u8arr], { type: contentType })
  var blobImg: any = {}
  blobImg.url = URL.createObjectURL(blob) //创建URL
  blobImg.name = new Date().getTime() + '.png'
  return blobImg
}