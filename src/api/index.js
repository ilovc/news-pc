// 提供一个配置好的axios 然后导出 在main.js使用
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 1. 默认配置 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置头部的代码不能再此处定义
// 这里的代码只会在刷新页面后只会执行一次 以后就不执行
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

// 解决方案 在每一次请求前 都会带上token设置在头部

// 请求拦截器  在每次发送请求前 可以处理一些业务逻辑
axios.interceptors.request.use(config => {
  // 每次发送请求前 都会执行该函数
  // config配置
  // 在发送请求之前做些什么
  // 在头部追加token
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  // 返回配置好的config 给发请求的时候使用
  return config
}, err =>
  // 当拦截成功的函数中处理逻辑发生异常 会触发第二个错误函数
  // 对错误请求做些什么
  // new Promise() 可能成功可能失败
  // Promise.resolve()一定成功的Promise
  // Promise.reject()一定失败的Promise
  // 把错误封装成一个错误promise对象 提供给axios使用
  // 写法是固定的基本不变
  Promise.reject(err)
)

// token在服务端有2小时有效期 当用户的token超过2小时 再次发请求 此时的token是无效token
// 当发过请求后 后端判断token是否失效  后端会在响应中告诉前端 此时的token失效了 跳转到登录页面 让用户重新登陆获取新的token
// 如果响应状态码是401 代表(token失效|未登录)
// 则跳转到登录页面让用户重新登陆即可
// 响应拦截器  作用 在每次相应之前可以处理一些业务逻辑
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 响应成功 触发该函数
  // response就是相应对象(响应状态行 | 响应头 | 响应主体)
  // 对响应数据做点什么
  // 将来then(res)就是这个response
  // 写法是固定的基本不变
  return response
}, function (error) {
  // 响应失败就会茶法这个函数
  // 判断状态码是不是401
  // 如果是就跳转带登录页
  // .reject(error)将来就是catch(err)就是此时返回的错误对象
  // 对响应错误做点什么
  // error对象包含了错误响应对象 error.response
  // 状态码 err.response.status 就是
  if (error.response.status === 401) {
    // 如果是vue组件中 : 可以用this.$router.push('/login')  $router是路由实例 提供了push函数
    // 这里是js模块  ：  导入创建好的router实例对象调用push函数
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
