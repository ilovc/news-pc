import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// 导入router
// @是用来找绝对路径的 .是用来找相对路径的
import router from '@/router'
// 日志的详细与否 生产环境 开发环境
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  // 挂载router
  router,
  render: h => h(App)
}).$mount('#app')

// main是入口文件
// 做全局范围内的依赖和配置
// 创建一个根vue实例
