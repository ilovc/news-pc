// 配置路由
// 先导入vue 再倒入router 然后在use
import VueRouter from 'vue-router'
import Vue from 'vue'
// 导入需要在use之前导入
import Login from '@/views/login'
Vue.use(VueRouter)
// 再实例化router
const router = new VueRouter({
  routes: [
    // routes里写的是路由规则
    // 登录
    { path: '/login', component: Login }
  ]
})
// 这里定义router但是在main使用不到 所以把它导出
export default router
