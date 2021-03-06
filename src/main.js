import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

// 导入router
// @是用来找绝对路径的 .是用来找相对路径的
import router from '@/router'
// 导入axios
// 安装的插件可以直接导入
import axios from '@/api'
// 只有vue插件才能使用Vue.use 原生的不能使用use
// 那么axios怎么才能全局使用
// 在Vue中构造原型属性 将来所有的组件可以使用该方法(因为所有的组件都是vue的实例 实例可以访问原型方法)
// 配置组件 第一个是组件名称 第二个是组件配置对象.

// 如果有很多就需要一个一个导入 所以定义plugin来拓展
// // 注册全局组件 因为它不止一个地方使用
// import MyBread from '@/components/my-bread'
// Vue.component('my-bread', MyBread)

// 面包屑 使用自己的插件
import plugin from '@/plugin'
import '@/styles/index.less'
Vue.use(plugin)
Vue.prototype.$http = axios
Vue.use(ElementUI)
new Vue({
  // 挂载router
  router,
  render: h => h(App)
}).$mount('#app')

// main是入口文件
// 做全局范围内的依赖和配置
// 创建一个根vue实例
