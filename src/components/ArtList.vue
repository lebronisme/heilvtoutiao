<template>
  <div>
    <van-cell-group>
      <!-- 实现下拉刷新的效果 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <!-- list加载更多组件 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 首页的十条渲染数据 -->
          <van-cell
            :title="item.title"
            value="内容"
            :label="item.pubdate"
            v-for="(item, index) in artList"
            :key="index"
          >
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </van-cell-group>
  </div>
</template>

<script>
import { getArtList } from '@/api/home'
export default {
  props: {
    id: {
      type: Number,
      requried: true
    }
  },
  created () {
    this.getArtListFn()
  },
  data () {
    return {
      // 时间戳，初始状态为当前最新时间，调用这个时间戳得到的数据就是最新的
      timestamp: Date.now(),
      artList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArtListFn () {
      if (this.refreshing) {
        this.artList = []
        this.refreshing = false
      }
      try {
        const res = await getArtList({ channel_id: this.id, timestamp: this.timestamp })
        console.log('getArtList', res)
        this.timestamp = res.data.data.pre_timestamp

        // 若数据已全部加载完毕，则直接将 finished 设置成 true 即可
        if (this.timestamp === null) {
          this.finished = true
        }
        this.artList.push(...res.data.data.results)
        // 划到底部时，loading状态切换为true，加载状态出现。不写这步，加载状态就一直存在
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    // 异步更新数据,为 ajax 请求，每次滑到底部的时候，都会调用这个函数
    onLoad () {
      this.getArtListFn()
      // console.log('到底了')
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.timestamp = Date.now()
      this.getArtListFn()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 178px;
}
</style>
