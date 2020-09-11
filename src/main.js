import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import store from './store'
import router from './router'
import Vant from 'vant'
import 'amfe-flexible'
import 'vant/lib/index.css'
import './permission'
const wx = require('weixin-js-sdk');

Vue.config.productionTip = false
Vue.prototype.$wx=wx

Vue.use(Vant)

sync(store, router)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

//网页默认不添加扩展的表现是 viewport-fit=contain，需要适配 iPhoneX 必须设置 viewport-fit=cover，这是适配的关键步骤。https://blog.csdn.net/qq_42354773/article/details/81018615

//主要就是因为iphonex
//iOS11 新增特性，Webkit 的一个 CSS 函数，用于设定安全区域与边界的距离，有四个预定义的变量：
//safe-area-inset-left：安全区域距离左边边界距离
//safe-area-inset-right：安全区域距离右边边界距离
//safe-area-inset-top：安全区域距离顶部边界距离
//safe-area-inset-bottom：安全区域距离底部边界距离
//这里我们只需要关注 safe-area-inset-bottom 这个变量，因为它对应的就是小黑条的高度
//padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
//padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
// env() 跟 constant() 需要同时存在，而且顺序不能换。




//关于解决history刷新404的问题
//刷新404，为什么，因为本地路径中没有这个真实资源存在，这些访问资源都是在js里渲染的。
//在nginx捕获，返回到 index.html 页面，这个页面就是你 app 依赖的页面。
//然后前端就会根据路由拦截，然后跳转到我们当前刷新的这个页面路径