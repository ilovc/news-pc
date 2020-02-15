<template>
  <!-- v-model是双向绑定的 能修改  value有只读属性  所以用value 这个value是用来展示值的 change是传递给父组件修改值的 -->
  <el-select :value="value" @change="changeChannel" clearable placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  // 父给子传值  这是子组件
  props: ['value'],
  data () {
    return {
      // 选择后的频道ID
      // 频道的下拉选项
      channelOptions: []
    }
  },
  methods: {
    // 频道选择处理函数
    // change事件会携带默认参数
    changeChannel (channelId) {
      if (channelId === '') channelId = null
      // 把选择的频道传递给父组件  让父组件修改数据

      // 触发父组件的自定义事件 把子组件的值给父组件
      this.$emit('input', channelId)
    },
    // 获取频道的选项数据
    async getChannelOptions () {
      // 原始数据结构 res = {data:{message:'',data:{channels:[]}}}
      // 这里是进行了结构
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  },
  created () {
    this.getChannelOptions()
  }
}
</script>

<style lang="less" scoped>
</style>
