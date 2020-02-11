<template>
  <div class="login">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt="">
      <!-- 表单 -->
      <!-- :model 是组件提供的 是要上传的对象数据 -->
      <el-form :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:238px;margin-right:10px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已经阅读和同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 这样直接设置不行因为login的父容器是app
.login{
  width: 100%;
  height: 100%;
  background: url('../../assets/images/login_bg.jpg') no-repeat center/cover;
  // 加上定位就行了
  position: absolute;
  left: 0;
  top: 0;
}
.my-card{
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-60%);
  img{
    display: block;
    width: 200px;
     margin: 0 auto 20px;
  }
}
</style>
