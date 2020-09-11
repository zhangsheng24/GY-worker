import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import role from './modules/role'

Vue.use(Vuex)


//关于不同模块之间命名重复的问题解决方案，因为之前我一直在纠结一个问题，this.$store.commit('xxx')，如果2个模块中的xxx一样，怎么办
// https://blog.csdn.net/qq_40816649/article/details/88113606

const store=new Vuex.Store({
  modules:{
    user,
    role
  },
  getters
})

export default store
