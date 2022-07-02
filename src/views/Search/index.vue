<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @cancel="$router.go(-1)"
        @search="onsearch"
        autofocus
        @focus="isSearching = false"
      />
    </form>
    <!-- 当搜索框未输入或者为空的时候，显示搜索历史，搜索的时候，触发search事件，显示搜索建议，-->
    <SearchHistory v-if="searchText === ''" @search="onsearch"></SearchHistory>
    <template v-else>
      <SearchResult v-if="isSearching" :searchText="searchText"></SearchResult>
      <SearchSuggest
        v-else
        :searchText="searchText"
        @search="onsearch"
      ></SearchSuggest>
    </template>
  </div>
</template>
<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggest from './components/SearchSuggest.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearching: false
    }
  },
  methods: {
    // suggest组件中的onsearch函数
    onsearch (str) {
      // 搜索出结果时，点击搜索的结果，输入框的内容与点击的内容一致
      this.searchText = str
      this.isSearching = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {

  },
  filters: {},
  components: { SearchHistory, SearchSuggest, SearchResult }
}
</script>

<style scoped lang='less'>
</style>
