<template>
  <div id="app">
    <!--主要用于保留组件状态或避免重新渲染。-->
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
     <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <TabBar />
  </div>
</template>

<script>
import TabBar from "@/commons/template/TabBar";
import {LgetItem} from '@/utils/storage'
import {isIos} from '@/utils/index'
import api from '@/api'
export default {
  data() {
    return {
      transitionName: "slide-left",
    };
  },
  components: {
    TabBar,
  },
  watch:{
    $route(to,from){
      if(LgetItem('jwtToken')){
        this.$wx.$wxInit=this.wxInit
        //如果是从根路径加载，也就是说在ios环境下，需要且只能在网站第一次打开的时候初始化config配置。
        //如果在需要的地方配置config，然后在其他页面进入到这个页面的时候使用wx的jssdk就会报错
        //但如果在Android环境下，就不需要在根路径去配置config，而是哪个页面需要就在哪个页面配置
        if(from.path === '/' && isIos()){
          this.$wx.$wxInit()
        }
      }
    }
  },
  methods:{
    wxInit(){
      return new Promise((resolve,reject)=>{
        //如果是ios环境，并且已经权限验证成功就不用再去通过config接口注入权限验证配置
        if(isIos() && this.$wx.readySucc){
          resolve()
          return
        }
        api('getWxSign',{
          url:encodeURIComponent(window.location.href.split('#')[0])
        }).then(res=>{
          this.$wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature,// 必填，签名
            jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
          })
          this.$wx.ready(_=>{
            this.$wx.readySucc=true
            resolve()
            console.log(_)
          })
          this.$wx.error(_=>{
            reject()
            console.log(_)
          })
        }).catch(err=>{
          reject()
          console.log(err)
        })
      })
    }
  }
};
</script>
<!-- 之前出现的滚动条问题是因为viewport，加上就ok了，所以说在开发移动端网站的时候一定要注意加上viewport -->
<!-- <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"> -->
<style src='@/commons/css/reset.css'></style>
<style lang="scss" scoped>
#app {
  width: 100vw;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
  }
  .slide-left-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    position: absolute;
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
</style>

