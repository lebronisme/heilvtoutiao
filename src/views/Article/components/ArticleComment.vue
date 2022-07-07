<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <CommentItem
      v-for="(item, index) in commentList"
      :key="index"
      :item="item"
      @reply-show="$emit('reply-show', $event)"
    ></CommentItem>
  </van-list>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  props: {
    source: {
      type: [Number, String],
      Rrequired: true
    },
    type: {
      type: String,
      Rrequired: true,
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentListFn()
  },
  data () {
    return {
      paramsObj: {
        source: this.source,
        type: this.type,
        offset: null,
        limit: 5
      },
      // 进行数据提升，这个数据放在父组件那里，让父亲的其他子组件用
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentListFn () {
      try {
        const res = await getCommentList(this.paramsObj)
        // 如果请求的数据没有了，就把结束状态设为true，
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // 每次请求回来的数据，结构之后添加到原有数据中，可以保证每页的数据不会被刷新
        this.commentList.push(...res.data.data.results)
        this.$emit('setCount', res.data.data.total_count)
        // 本次返回结果的最后一个评论，作为请求下一页数据的offset参数，如果请求无数据，则值为null
        this.paramsObj.offset = res.data.data.last_id
        // 页面数据拿回来之后，加载状态结束
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentListFn()// 划到底部时，再次获取数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
