<template>
  <div class="container-comment">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 评论显示的列表 -->
      <el-table :data="comments">
        <!-- 评论列 -->
        <!-- 普通的数据渲染就用prop -->
        <!-- 复杂的渲染就用插槽 -->
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- scope.row即包含文章id也包含文章现在的状态 -->
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="scope.row.comment_status"
              type="danger"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="success">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:8px"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 分页的请求参数
      reqParams: {
        page: 1,
        per_page: 20,
        // 获取文章列表中的评论列表
        response_type: 'comment'
      },
      // 评论列表
      comments: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    toggleStatus (row) {
      let text = ''
      if (row.comment_status) {
        // 关闭
        text =
          '亲，您是否要关闭当前文章评论功能，如果关闭读者将无法对这篇文章进行评论。'
      } else {
        // 打开
        text = '亲，您是否要打开当前文章评论功能。'
      }
      this.$confirm(text, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            const {
              data: { data }
            } = await this.$http.put(`comments/status?article_id=${row.id}`, {
              allow_comment: !row.comment_status
            })
            this.$message.success(
              data.allow_comment ? '打开评论成功' : '关闭评论成功'
            )
            // 修改row才能更新列表数据
            row.comment_status = data.allow_comment
          } catch (e) {
            this.$message.error('操作失败')
          }
        })
        .catch(() => {})
    },
    // 获取评论列表
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // console.log(data)
      // 拿数据
      this.comments = data.results
      this.total = data.total_count
    }, // 改变分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
