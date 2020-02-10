// 配置路由
// 先导入vue 再倒入router 然后在use
import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
// 再实例化router
const router = new VueRouter({
  routes: [
    // routes里写的是路由规则
  ]
})
// 这里定义router但是在main使用不到 所以把它导出
export default router
