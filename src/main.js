import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import '@/styles/index.less'
import FollowUser from '@/components/FollowUser.vue'

import HeilvIcon from '@/components/HeilvIcon.vue'
// 引入包含全局组件的js文件
import '@/components'
// 把filter文件中的所有按需导出一次性导，作为obj的属性
import * as obj from '@/filter/index'
// 批量封装过滤器  Object.keys(obj)就是把obj的键拿过来，解析为数组
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
  // console.log(key)
  // console.log(obj[key])
  // key为obj的键，这里可以封装成过滤器的函数名
  // obj[key]为obj的值,这里封装成过滤器函数
})
Vue.component('HeilvIcon', HeilvIcon)
// 直接将组件的名字命名好，用组件内部的name属性，不需要用户再起名字
Vue.component(FollowUser.name, FollowUser)

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
