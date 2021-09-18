/**
 * 存储缓存数据
 * @param key Storage键
 * @param data Storage值
 */
function setStorageSync(key, data) {
  if (!key) {
    return new Error('请传入缓存键')
  }
  if (!data) {
    return new Error('请传入缓存值')
  }
  const type = typeof data
  const value = type === 'string' ? data : JSON.stringify({ type, data })
  localStorage.setItem(key, value)
}

/**
 * 获取缓存数据
 * @param key
 */
function getStorageSync(key) {
  if (!key) {
    return new Error('请传入缓存键')
  }

  let typeOrigin = localStorage.getItem(key) || ''
  try {
    let data = JSON.parse(typeOrigin)
    if (typeof data == 'number') {
      return data
    } else {
      return data.data
    }
  } catch (error) {
    return typeOrigin
  }
}

/**
 * 删除缓存数据
 * @param key
 * @returns
 */
function removeStorageSync(key) {
  if (!key) {
    return new Error('请传入缓存键')
  }
  localStorage.removeItem(key)
}

export { setStorageSync, getStorageSync, removeStorageSync }
