<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
    <TabBar />
  </div>
</template>

<script>

import TabBar from "@/commons/template/TabBar"


export default {
  data() {
    return {
      transitionName: "slide-left",
    };
  },
  components: {
    TabBar
  },
};
</script>
<!-- 之前出现的滚动条问题是因为viewport，加上就ok了，所以说在开发移动端网站的时候一定要注意加上viewport -->
<!-- <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"> -->
<style lang="scss" scoped>
#app {
  width: 100vw;
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 5000ms;
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

