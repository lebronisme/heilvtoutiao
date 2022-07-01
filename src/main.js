import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import '@/styles/index.less'
// 把filter文件中的所有按需导出一次性导出，作为obj的属性
import * as obj from '@/filter/index'
import HeilvIcon from '@/components/HeilvIcon.vue'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.component('HeilvIcon', HeilvIcon)
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
