<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in searchResult"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String, required: true
    }
  },
  created () { this.getSearchResultFn() },
  data () {
    return {
      page: 1,
      per_page: 20,
      searchResult: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResultFn () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        // 如果数据请求没了，返回值为空了，就结束请求，把finished状态改true，
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.searchResult.push(...res.data.data.results)
        // 加载状态结束
        this.loading = false
        // 下拉刷新执行结束后，将其设置为true
        this.refreshing = false
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      // 每次需要加载下一页的时候，页码值+1，并请求新数据
      this.page++
      this.getSearchResultFn()
    },
    onRefresh () {
      // 清空列表数据
      this.searchResult = []
      this.page = 1
      this.getSearchResultFn()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
