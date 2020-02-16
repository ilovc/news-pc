<template>
  <div class="container-article">
    <!-- 筛选条件区域 -->
    <el-card class="box-card">
      <!-- 头部区域(标题) 这里要放面包屑 -->
      <div slot="header">
        <!-- 使用面包屑组件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 内容区域  表单-->
      <el-form size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="filterParams.status">
            <!-- 这里的:label就是选中的值 -->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- clearable是否可以清空选项 默认是false -->
        <el-form-item label="频道：">
          <!-- 封装自己的频道组件 -->
          <!-- 这里父给子传值 这是父组件-->
          <!-- 通过自定义事件来接受子组件给父组件传递的值  $event就是子给父穿的值-->
          <!-- 触发自定义事件 传递数据$event -->
          <!-- 触发dom事件 事件对象$event -->
          <!-- <my-channel :value="filterParams.channel_id" @input="filterParams.channel_id=$event"></my-channel> -->
          <!-- v-model和上边是等价的 -->
          <my-channel v-model="filterParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <!-- change是组件的事件  不带括号能拿到默认参数 -->
          <!-- 这个组件可受value-format控制 能改变格式 -->
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 使用表格 -->
      <!-- :data指定列表数据 他是数组 必须声明 -->
      <el-table :data="articles">
        <!-- 列容器 -->
        <!-- label 列标题 -->
        <!-- prop="date" 指定行使用的数据(数据字段名称) -->
        <!-- 一般的数据可以使用prop展示 但是图片、组件等需要插槽 -->
        <el-table-column label="封面">
          <!-- 这里使用了作用域插槽 可以吧scope.row 相当于循环中的item -->
          <template slot-scope="scope">
            <!-- 图片组件 -->
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <!-- 这是处理没有图片的情况 -->
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width:150px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <!-- 通过路由传参有两种方式
            1. query ?之后传参
            2. params 路径后传参
          -->
          <template slot-scope="scope">
            <el-button
              @click="toEdit(scope.row.id)"
              plain
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              @click="delArticle(scope.row.id)"
              plain
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- :page-size 每页多少条数据 -->
      <!-- :current-page 动态绑定当前页 -->
      <!-- @current-change 事件不带括号拿默认参数 带括号需要自己传参 -->
      <!-- hide-on-single-page 是否只有一页的时候隐藏-->
      <el-pagination
        style="margin-top:20px;text-align:right"
        background
        layout="prev, pager, next"
        @current-change="changePager"
        :total="total"
        :current-page="filterParams.page"
        :page-size="filterParams.per_page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选条件对象
      filterParams: {
        // 如果接口有不传的时候 写null才是不传 ''是空字符串
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 默认是在第一页
        page: 1,
        // 默认一页20条数据
        per_page: 20
      },
      // 接收频道的
      // channelOptions: [],
      // dateArr不能直接声明在filterParams 因为后台需要begin_pubdate和end_pubdate
      // 日期选择后的数组[起始日期,结束日期]
      // 再把dateArr的其实日期和结束日期赋值给filterParams里的begin和end
      dateArr: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // 编辑文章
    toEdit (articleId) {
      this.$router.push(`publish?id=${articleId}`)
    },
    // 删除文章
    async delArticle (articleId) {
      // 发送删除请求
      try {
        await this.$http.delete(`articles/${articleId}`)
        this.$message.success('删除成功')
        this.getArticles()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    // // 获取频道的选项数据
    // async getChannelOptions () {
    //   // 原始数据结构 res = {data:{message:'',data:{channels:[]}}}
    //   // 这里是进行了结构
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    // 根据默认的筛选条件 去获取数据
    async getArticles () {
      // 如果是post传参 参数放到请求主体提也就是body axios.post(url,请求体传参)
      // 如果是get传参 参数放到请求的地址? 后面 axios.get(url,{params:传参对象})
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.filterParams })
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    },
    // 改变分页 newPage就是默认参数
    changePager (newPage) {
      this.filterParams.page = newPage
      // console.log(newPage)
      console.log(this.filterParams.page)
      // 数据驱动视图更新
      this.getArticles()
    },
    // 搜索
    search () {
      // 每次进行搜索的时候 页码应该为1
      this.filterParams.page = 1
      this.getArticles()
    },
    // 日期选择处理函数
    // 事件不带参数能拿到默认参数
    // value是默认参数
    changeDate (value) {
      // console.log(value)
      // 这一步是点击清除的时候会报错
      // 意思是value没有值的时候就用空
      if (!value) value = [null, null]
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
