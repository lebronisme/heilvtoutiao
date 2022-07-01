// 为了方便项目中使用本地存储的时候 简化操作 封装 设置 获取等操作
// 封装的获取函数
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    // 如果JSON解析错误，就直接输出
    return res
  }
}
// 封装的设置函数
export function setItem (key, value) {
  if (typeof value === 'object') {
    // 如果传入的数据是对象格式的，先转换成字符串再传入
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.removeItem(value)
  }
}
// 封装的删除函数

export function removeItem (key) {
  window.localStorage.removeItem(key)
}
// 封装的删除所有本地存储函数
export function clearItem (key) {
  window.localStorage.clearItem(key)
}
