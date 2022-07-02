import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setSearchHistoryList (state, payload) {
      // 大致逻辑：先用一个arr存储原来的searchHistoryList数据，然后存储的arr前面添加刚刚获取的str，从前面添加进去，然后去重，最后赋值给searchHistoryList
      let arr = state.searchHistoryList
      arr.unshift(payload)
      // new Set()是数组去重方法，得到的是个集合，然后...解构，用[]接收
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
    },
    delOneHistory (state, index) {
      state.searchHistoryList.splice(index, 1)
    },
    delAllHistory (state) {
      state.searchHistoryList = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
