import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './page'
import cfg from '@/config'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  //应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"
  //也就是说默认情况下我们的路由地址是在localhost:8080/home，'/'根路径后面切换得，如果在跟路径后面加了内容，因为项目部署在服务器的某个文件夹中
  //一个服务器部署多个前端项目，为了做区分而划分，所以我们的前端路由也要按照规则，所以需要加上base，这样我们的路由地址就会在base之后动态切换
  base: cfg.routerBase,
  fallback: false,
  //scrollBehavior就是页面的滚动行为，也就是说，当我们浏览页面的时候，一直往下滑动，然后又点击跳转到另外一个路由组件中去了，
  //这时候我想用户点击返回键返回上一个离开的页面的时候还是展示上一次离开的位置，而不是跑到页面的顶部，一般结合keep-alive使用
  scrollBehavior: (to, from, savedPostion) => {
    //console.log(savedPostion)//{x: 0, y: 1458}, (通过浏览器的 前进/后退 按钮触发) 时才可用。
    if (savedPostion && to.meta.keepAlive) {//我们想要哪个组件在返回之后回到离开的位置，直接在meta中加一个keepAlive为true就可以了
      return savedPostion
    }
    return new Promise((resolve) => {//异步滚动
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 0)
    })
  },
  routes
})

export default router
