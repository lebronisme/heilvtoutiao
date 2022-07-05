<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="80"
    placeholder="请输入评论"
    show-word-limit
    center
    ref="field"
  >
    <template #extra
      ><van-button :disabled="message === ''" type="default" @click="onClick"
        >发布</van-button
      ></template
    >
  </van-field>
</template>

<script>
import { addCommentList } from '@/api/comment'
export default {
  props: {
    target: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addCommentList({
          target: this.target,
          content: this.message
        })
        this.$emit('addComment', res.data.data.new_obj)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  mounted () {
    // mouted是在页面挂载完毕之后，再执行的操作，这样可以防止FOUCS时间触发时，页面还没加载完，$el是将组件转换成dom根标签元素
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-button {
  border: none;
}
</style>
