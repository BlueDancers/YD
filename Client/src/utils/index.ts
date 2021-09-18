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
