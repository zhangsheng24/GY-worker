<template>
  <div class="home">
    <ul>
      <li v-for="(item,index) in 100" :key="index">{{item}}</li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100vw;
}
</style>