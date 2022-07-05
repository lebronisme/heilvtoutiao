<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">hello</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | dateformat }}</span>
        <van-button size="mini" type="default">回复</van-button>
      </p>
    </div>
    <van-loading v-if="this.isLoading" />
    <van-icon
      v-else
      slot="right-icon"
      :name="item.is_liking ? 'like' : 'like-o'"
      :color="item.is_liking ? 'red' : ''"
      @click="onClick"
    >
      <!-- 没有点击的时候，显示 点，如果点击了，显示点击的数量 -->
      {{ item.like_count > 0 ? item.like_count : "点" }}
    </van-icon>
  </van-cell>
</template>

<script>
import { addCommentLike, delCommentLike } from '@/api/comment'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      if (this.item.is_liking) {
        // 已经点赞，取消点赞
        try {
          this.item.like_count--
          this.item.is_liking = false
          await delCommentLike(this.item.com_id)
        } catch (err) {
          console.log(err)
        }
      } else {
        // 没有点赞，进行点赞
        try {
          this.item.like_count++
          this.item.is_liking = true
          await addCommentLike(this.item.com_id)
        } catch (err) {
          console.log(err)
        }
      }
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
