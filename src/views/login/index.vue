<template>
  <div class="login">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <!-- :model 是组件提供的 是要上传的对象数据 -->
      <!-- rules是校验规则 -->
      <el-form ref="loginForm" :rules="loginRules" :model="loginForm">
        <!-- prop="mobile" 设置校验规则用的 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:238px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已经阅读和同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    // 自定义的校验规则需要卸载return之前 校验手机号的函数
    // 自定义校验规则需要三个参数 当前字段的校验规则  该字段定义的值 回调函数
    const checkMobile = (rule, value, callback) => {
      // 自己的校验逻辑 1开头 第二位3-9之间 最后9个数字结尾
      // 先如果失败
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不对'))
      }
      // 否则就成功
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 定义校验规则
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 自定义校验规则
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    login () {
      // 先整体表单校验
      // 回调函数的第一个参数是校验是否成功的
      this.$refs.loginForm.validate(async valid => {
        // 为true时是校验成功 如果为false是校验失败
        if (valid) {
          // 如果为真就需要进行登录
          // 参数是url + body传参

          // // 这是promise写法
          // this.$http.post(
          //   'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
          //   this.loginForm
          // ).then(res => {
          //   // 登陆成功
          //   // res 是响应对象(响应状态行 响应头 响应主体)
          //   // res.data 是响应主体

          //   // 登陆成功了 开始存储用户信息
          //   store.setUser(res.data.data)
          //   // 直接跳转到首页
          //   this.$router.push('/')
          // }).catch(e => {
          //   // 登陆失败
          //   // e是错误对象(错误状态行,错误的信息)

          //   // 进行简单的提示
          //   this.$message.error('手机号或者验证码错误')
          // })

          // 使用axios同步写法
          // 使用try catch 可以捕获和处理异常
          // 当有一段代码不能保证一定成功是使用
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            // 先存在本地
            store.setUser(res.data.data)
            // 直接跳转到首页
            this.$router.push('/')
          } catch (error) {
            this.$message.error('手机号或者验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 这样直接设置不行因为login的父容器是app
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg.jpg") no-repeat center/cover;
  // 加上定位就行了
  position: absolute;
  left: 0;
  top: 0;
}
.my-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  img {
    display: block;
    width: 200px;
    margin: 0 auto 20px;
  }
}
</style>
