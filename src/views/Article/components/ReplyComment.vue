<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$emit('closePopup')"
      fixed
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comments" class="comments"></CommentItem>
    <van-cell title="全部回复"></van-cell>
    <CommentItem
      :item="item"
      v-for="(item, index) in replyCommentList"
      :key="index"
    ></CommentItem>
    <div class="nullBottom"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>
    <!-- 底部弹出层 -->
    <van-popup v-model="isAddCommentShow" position="bottom">
      <AddComment
        :target="comments.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @addComment="
          replyCommentList.unshift($event);
          isAddCommentShow = false;
          comments.reply_count++;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    comments: {
      type: Object,
      // 默认是一个空对象，如果外面不包裹(),vscode自动解析为一个函数,当然,这里只是复习知识,也可以直接用required:true代替
      default: () => ({})
    }
  },
  created () { this.getCommentListFn() },
  data () {
    return {
      offset: null,
      limit: 10,
      replyCommentList: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentListFn () {
      try {
        const res = await getCommentList({ type: 'c', source: this.comments.com_id, offset: this.offset, limit: this.limit })
        this.replyCommentList = res.data.data.results
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comments.reply_count
      if (this.comments.reply_count === 0) {
        return '暂无回复'
      } else {
        return `${count}条回复`
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comments {
  // 配合固定定位，实现往下刷新评论的时候，不会把顶部刷过去
  margin-top: 92px;
}
.nullBottom{
  margin-bottom: 110px;
}
.bottom {
  width: 750px;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
 color:red;
 padding:10px 30px
  // background-color: pink;
}
</style>
