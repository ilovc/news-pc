<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮区域 -->
      <div class="btn_box">
        <el-radio-group @change="changeCollect" v-model="filterParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialo" style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option" v-if="!filterParams.collect">
            <!-- 这里直接传一个item 因为后台需要选中的id 也需要是否被选中 -->
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页区域 -->
      <!-- :page-size 每页多少条数据 -->
      <!-- :current-page 动态绑定当前页 -->
      <!-- @current-change 事件不带括号拿默认参数 带括号需要自己传参 -->
      <!-- hide-on-single-page 是否只有一页的时候隐藏分页-->
      <el-pagination
        style="margin-top:20px;text-align:right"
        background
        layout="prev, pager, next"
        :hide-on-single-page="true"
        @current-change="changePager"
        :total="total"
        :current-page="filterParams.page"
        :page-size="filterParams.per_page"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="上传素材" :visible.sync="dialogVisible" width="300px">
      <!-- 上传组件 -->
      <!-- class="avatar-uploader"  不能删除  而且样式需要使用  -->
      <!-- action="完整上传地址"  组件自己来发送上传请求 -->
      <!-- 在请求头中携带token  在 headers 属性追加token -->
      <!-- :show-file-list="false" 不显示文件列表 -->
      <!-- :on-success="handleAvatarSuccess" 上传成功回调函数 -->
      <!-- name是上传文件的字段名 默认是file -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="uploadSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 筛选参数
      filterParams: {
        // false 全部 true 收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      // 分页用的总条数
      total: 0,
      // 对话框的显示隐藏
      dialogVisible: false,
      // 预览图
      imageUrl: null,
      // headers是在请求中加token
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 上传成功回调函数 有默认参数
    uploadSuccess (res) {
      // 1.预览图片
      this.imageUrl = res.data.url
      // 2.2s关闭对话框
      window.setTimeout(() => {
        // 成功提示
        this.$message.success('添加成功')
        // 关闭对话框
        this.dialogVisible = false
        // 更新列表
        this.getImages()
      }, 2000)
    },
    // 打开对话框
    openDialo () {
      this.dialogVisible = true
    },
    // 删除图片
    async delImage (id) {
      try {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getImages()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    // 切换全部与收藏
    changeCollect () {
      // 把页码切回1
      this.filterParams.page = 1
      this.getImages()
    },
    // get传参{params:参数}
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.filterParams })
      this.images = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.filterParams.page = newPage
      this.getImages()
    },
    // 添加收藏和取消收藏
    // put和post传参  在地址后{}
    async toggleStatus (item) {
      try {
        const {
          data: { data }
        } = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        })
        this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
        // 修改星星的颜色 is_collected的值改成后台返回的值
        item.is_collected = data.collect
      } catch (error) {
        this.$message.error('操作失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.btn_box {
  margin-bottom: 20px;
}
.img_list {
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin: 0 30px 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      height: 30px;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      line-height: 30px;
      span {
        color: #fff;
        margin: 0 20px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
