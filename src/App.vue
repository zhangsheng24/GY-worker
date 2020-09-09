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

export default {
  data() {
    return {
      transitionName: "slide-left",
    };
  },
  components: {
    TabBar,
  },
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

