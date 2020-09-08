<template>
  <van-tabbar v-model="active" @change='onchange'>
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="search">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
    data(){
        return{
            active:0
        }
    },
    methods:{
        onchange(){
            console.log(this.active)
            if(this.active===0){
                this.$router.push('/home')
            }else{
                this.$router.push('/user')
            }
        }
    }
}
</script>