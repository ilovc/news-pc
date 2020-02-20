// 配置路由
// 先导入vue 再倒入router 然后在use
import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '@/store'
// 导入需要在use之前导入
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'
Vue.use(VueRouter)
// 再实例化router
const router = new VueRouter({
  routes: [
    // routes里写的是路由规则
    // 登录
    { path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome },
        { path: '/article', component: Article },
        { path: '/image', component: Image },
        { path: '/publish', component: Publish },
        { path: '/comment', component: Comment },
        { path: '/setting', component: Setting },
        { path: '/fans', component: Fans }
      ]
    },
    // 通配以上规则没有的地址
    { path: '*', component: NotFound }
  ]
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // to 去哪里
  // from 来自哪里
  // next 放行或指定跳转的路由
  // 判断如果是除了登陆页面外  其他的路由如果没有登陆token，拦截到登录
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  // 其他情况都是放行
  next()
})
// 这里定义router但是在main使用不到 所以把它导出
export default router
