import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
// import cfg from '@/config'
import store from './store'
import router from './router'
import Vant from 'vant'
import 'amfe-flexible'
import 'vant/lib/index.css'
// import './permission'
// const wx = require('weixin-js-sdk')

Vue.config.productionTip = false
// Vue.prototype.$wx = wx

Vue.use(Vant)
// Vue.use(Lazyload)

// if (cfg.type === 'development' || cfg.type === 'test') {
//   require('eruda').init()
// }

sync(store, router)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
