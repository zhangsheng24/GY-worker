<template>
  <van-tabbar
    class="tabBar"
    v-if="isTabUrl"
    v-model="activeIndex"
    active-color="#000"
    inactive-color="#7F8389"
    @change="onchange"
  >
    <van-tabbar-item v-for="(item,index) in navs" :key="index">
      <template #icon>
        <img class="icon" :src="index === activeIndex ? item.activeImgUrl : item.baseImgUrl" />
      </template>
      {{item.title}}
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      navs: [
        {
          title: "首页",
          link: "/home",
          baseImgUrl: require("@/assets/image/ic_home2.png"),
          activeImgUrl: require("@/assets/image/ic_home1.png"),
        },
        {
          title: "订单",
          link: "/order",
          baseImgUrl: require("@/assets/image/ic_order2.png"),
          activeImgUrl: require("@/assets/image/ic_order1.png"),
        },
        //   {title:'售后',link:'/afterSales',baseImgUrl:require('@/assets/image/ic_After sale2.png'),activeImgUrl:require('@/assets/image/ic_After sale1.png')},
        {
          title: "我的",
          link: "/user",
          baseImgUrl: require("@/assets/image/ic_me2.png"),
          activeImgUrl: require("@/assets/image/ic_me1.png"),
        },
      ],
      linkArr: ["/home", "/order", "/user"],
    };
  },
  computed: {
    //计算属性是基于它们的响应式依赖进行缓存的,只在相关响应式依赖发生改变时它们才会重新求值
    activeIndex: {
      //计算属性默认只有 getter，不过在需要时你也可以提供一个 setter
      get() {
        return this.linkArr.findIndex((res) => res === this.$route.path);
      },
      set(val) {
        //   console.log('执行了吗')
        return val;
      },
    },
    isTabUrl() {
      return this.linkArr.indexOf(this.$route.path) !== -1;
    },
  },
  created() {
    //默认进来是根路径，重定向到home页面的，所以刚开始activeIndex是-1
    //从根路径跳转到home页面会触发响应式依赖this.$route，所以会触发计算属性中的activeIndex的get和set
    // console.log(this.$route)
    // console.log(this.activeIndex)
  },
  methods: {
    onchange(index) {
      //index,当前选中标签的名称或索引值
      this.$router.push(this.navs[index].link);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/commons/css/mixin.scss";
.tabBar {
  @include border-1px(rgba(0, 0, 0, 0.1), top, 0, solid);
  ::v-deep .van-tabbar-item {
    .van-tabbar-item__icon {
      margin-bottom: 3px;
      .icon {
        width: 27px;
        height: 27px;
      }
    }
    .van-tabbar-item__text{
        font-size: 10px;
        line-height: 14px;
        letter-spacing: 1px;
    }
  }
}
</style>