export function parseTime(
  time,
  config: { cFormat?; isZero? } = {
    cFormat: '{y}-{m}-{d} {h}:{i}:{s}',
    isZero: true,
  }
) {
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