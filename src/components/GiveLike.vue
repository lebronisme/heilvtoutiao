<template>
  <van-icon
    color="#777"
    :name="this.attitude === 1 ? 'good-job' : 'good-job-o'"
    @click="onClick"
  />
</template>
<script>
import { giveLike, removeLike } from '@/api/article'
export default {
  name: 'GiveLike',
  props: {
    attitude: { type: Number, required: true }
  },
  created () { },
  data () {
    return {}
  },
  methods: {
    async onClick () {
      const target = this.$route.params.article_id
      if (this.attitude === 0) {
        await giveLike(target)
        this.$emit('update:attitude', this.attitude + 1)
      } else if (this.attitude === 1) {
        await removeLike(target)
        this.$emit('update:attitude', this.attitude - 1)
      } else {
        this.$emit('update:attitude', 0)
      }
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
