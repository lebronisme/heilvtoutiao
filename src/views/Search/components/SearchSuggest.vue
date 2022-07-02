<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <!-- 属性绑定不能用过滤器，只有插值表达式可以用，所以这里的过滤器只能定义在methods里面（所以严格来说，这里只是一个普通的函数） -->
        <!-- v-html是渲染的 -->
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  name: 'searchSuggest',
  props: {
    searchText: {
      type: String, required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    highlight (str) {
      // 定义一个正则   全局匹配传入的参数this.searchText   有多少个符合项，就匹配多少个
      const res = new RegExp(this.searchText, 'g')
      // 字符串的替换方法，将正则中匹配到的所有符合项，都替换成后面的模板字符串
      return str.replace(res, `<span style="color: red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        // 防抖函数,并且每次触发前,清除上一次的定时器
        clearTimeout(timer)
        // async和await必须属于同一个函数
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            this.list = res.data.data.options
            console.log('搜索建议', res)
          } catch (err) {
            console.log(err)
          }
        }, 800)
      },
      immediate: true
    }

  },
  filters: {},
  components: {},
  beforeDestroy () {
    // 组件即将销毁的时候，把残留的定时器销毁
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
</style>
