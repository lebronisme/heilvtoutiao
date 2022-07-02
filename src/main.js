import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import '@/styles/index.less'

import HeilvIcon from '@/components/HeilvIcon.vue'
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
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
