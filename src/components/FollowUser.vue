<template>
  <van-button
    :disabled="isAjax"
    :loading="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :plain="is_followed"
    :icon="is_followed ? '' : 'plus'"
    @click="onclick"
    >{{ is_followed ? "已关注" : "关注" }}</van-button
  >
</template>

<script>
import { addFollow, unFollow } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    target: {
      type: [String, Number],
      required: true
    }
  },
  created () { },
  data () {
    return {
      // ajax是否发送了,用来控制loading和button是否禁用的状态,
      isAjax: false
    }
  },
  methods: {
    async onclick () {
      this.isAjax = true
      if (this.is_followed) {
        try {
          // 数据持久化
          await unFollow(this.target)
          this.$emit('update:is_followed', !this.is_followed)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          // 数据持久化
          await addFollow(this.target)
          this.$emit('update:is_followed', !this.is_followed)
        } catch (err) {
          console.log(err)
        }
      }
      this.isAjax = false
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
