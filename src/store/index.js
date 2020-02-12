// 放存信息的
// 提供操作本地用户信息的工具函数

// 1. 设置用户信息
// 2. 获取用户信息
// 3. 删除用户信息

// 以后会用  示例 sessionStorage.setItem('数据名称','具体的数据')
// 所以提前把数据名称提前定义
const KEY = 'hm-toutiao-pc-91-user'
export default {
  setUser (user) {
    // 具体的数据只能是字符串
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    // 取数据需要返回
    // 得到的是json格式的字符串 无法出去直接使用
    // 所以转换成对象
    // 第一次登陆可能没有 为了防止报错写一个或空对象
    // null.token会报错
    // {}.token会得到undefined
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
