import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './page'

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
  base: process.env.BASE_URL,
  fallback: false,
  scrollBehavior: to => {
    console.log(to)
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return {
        y: 0
      }
    }
  },
  routes
})

export default router
