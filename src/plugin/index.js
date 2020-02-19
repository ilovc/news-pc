import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'

// 基于Vue扩展功能(全局组件,全局的原型方法|属性,自定义指令,过滤器)
export default {
  install: (Vue) => {
    // Vue的构造函数
    // 当main.js使用use的时候传入参数
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
  }
}
