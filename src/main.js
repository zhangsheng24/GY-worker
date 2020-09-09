import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import store from './store'
import router from './router'
import Vant from 'vant'
import 'amfe-flexible'
import 'vant/lib/index.css'
import './permission'

Vue.config.productionTip = false

Vue.use(Vant)

sync(store, router)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
