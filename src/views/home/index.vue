<template>
  <el-container class="container-home">
    <el-aside :width="isOpen ? '200px' : '64px'">
      <!-- logo -->
      <div class="logo" :class="{minLogo: !isOpen}"></div>
      <!-- 菜单 -->
      <!-- :collapse=""菜单栏的展开与收起 -->
      <!-- router 开启路由模式 启用该模式后会在激活导航时以index作为path进行路由跳转 -->
      <el-menu
        default-active="1"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文字</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="toggleAside" class="el-icon-s-fold icon"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="my-dropdown" @command="handler">
          <span class="el-dropdown-link">
            <img class="user-icon" :src="photo" alt />
            <span class="user-name">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting" icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由显示位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 表示左侧菜单是展开还是收起 默认是收起的
      isOpen: true,
      // 用户名 和头像
      name: '',
      photo: ''
    }
  },
  created () {
    // 从本都获取用户信息
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    // 切换左侧侧边栏的状态
    // 宽度 logo 导航菜单组件
    toggleAside () {
      this.isOpen = !this.isOpen
    },
    // 使用组件时 绑定原生事件的时候要看组件是否支持这个事件
    // 参考组件的说明文档
    // 但是组件解析后的html元素是支持click事件的
    // 在绑定事件的时候可以绑定事件修饰符 .native 加上后相当于给组件解析后的dom绑定事件
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.delUser()
      this.$router.push('/login')
    },
    // 这里的command是参数
    handler (command) {
      // 如果是setting跳转去个人设置 如果是logout 清除用户信息去登录
      // 如果指令是setting调用的是this.setting()
      // 如果指令是logout调用的就是this.logout()
      // 动态调用的指令
      // 中括号可以传一个变量或者字符串
      this[command]()
    }
  }
}
</script>

<style lang="less" scoped>
.container-home {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // element-ui提供的组件 解析后在容器上最近一个和组件同名css类
  .el-aside {
    background: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      font-size: 16px;
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      .user-icon {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .user-name {
        color: #333;
        font-weight: bold;
        vertical-align: middle;
        padding-left: 5px;
      }
    }
  }
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .minLogo {
      background-image: url("../../assets/images/logo_admin_01.png");
      background-size: 36px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
}
</style>
