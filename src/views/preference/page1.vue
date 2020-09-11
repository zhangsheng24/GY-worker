<template>
  <div class="preference-page1">
    <p class="tips">系统会根据您选择的类目和类型来推送订单，请谨慎选择（可以多选）。</p>
    <div class="content">
      <div class="left">
        <div
          :class="classIndex === index ? 'active':''"
          class="item"
          v-for="(item,index) in classArr"
          :key="index"
          @click="classClick(index)"
        >{{item.title}}</div>
      </div>
      <div class="right">
        <div class="item" v-for="(item1,index1) in hasArr" :key="index1">
          <div class="work">
            <label :for="item1.id">
              <div class="title">
                <span
                  class="icon"
                  :style="{background:iconArr[index1%4].bg,borderColor:iconArr[index1%4].bd}"
                ></span>
                {{item1.title}}
              </div>
              <van-checkbox @change="workChange(item1.check,classIndex,index1)" v-if="item1.children === 0" v-model="item1.check" icon-size="18" checked-color="#20b7b6"></van-checkbox>
            </label>
          </div>
          <div class="typeBox" v-if="item1.children.length>0">
            <div class="type" :class="checkAll(index1)?'checkAll':''" @click="allChange(index1)">全部</div>
            <div class="type" :class="item2.check?'check':''" v-for="(item2,index2) in item1.children" :key="index2" @click="changeClick(classIndex,index1,index2)">{{item2.title}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btnBox">
      <button @click="goTo" class="btn">下一步</button>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import { LgetItem,LsetItem } from "@/utils/storage";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      site: false,
      checked: true,
      classIndex: 0,
      iconArr: [
        {
          bg: "#FABE4C",
          bd: "#FFE7BA",
        },
        {
          bg: "#5EB7FB",
          bd: "#C4E6FF",
        },
        {
          bg: "#54CC96",
          bd: "#C5F0DC",
        },
        {
          bg: "#FF726D",
          bd: "#FFC8C6",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["classArr",'preference']),
    hasArr() {
      return this.classArr[this.classIndex]
        ? this.classArr[this.classIndex].children
        : [];
    },
    checkAll(){
        return (index)=>(this.classArr[this.classIndex].children[index].children.every(item=>item.check === true))
    }
  },
  created() {
    api("preference.treeList").then((res) => {
      this.site = JSON.parse(this.$route.query.site);
      if (this.site) {
        this.$store.commit("user/SET_CLASSARR", res);
        this.classArr.forEach((e1,i1)=>{
          e1.forEach((e2,i2)=>{
            if(e2.check){
              this.workChange(e2.check,i1,i2)
            }
            e2.children.forEach((e3,i3)=>{
              if(e3.check){
                this.addContent(i1,i2,i3)
              }
            })

          })
        })
      } else {
        this.setClassArr(res);
        this.setPpreference()
      }
    });
  },
  methods: {
    //获取工人偏好分类
    setClassArr(arr = null) {
      const classArr = LgetItem("classArr");
      this.$store.commit("user/SET_CLASSARR", classArr || arr);
    },
    setPpreference(obj=null){
      const preference=LgetItem('preference')
      this.$store.commit('user/SET_PREFERENCE',preference || obj)
    },
    classClick(index){
        this.classIndex=index
    },
    //单个选中和不选
    changeClick(classIndex,index1,index2){
      this.classArr[classIndex].children[index1].children[index2].check=!this.classArr[classIndex].children[index1].children[index2].check
      this.classArr[classIndex].children[index1].check=this.classArr[classIndex].children[index1].children.some(s=>s.check === true)
      this.classArr[classIndex].check=this.classArr[classIndex].children.some(s=>s.check === true)
      this.addContent(classIndex,index1,index2)
    },
    addContent(classIndex,index1,index2){
      if(this.classArr[classIndex].children[index1].children[index2].check){
        this.$store.commit('user/ADD_PREFERENCE_CONTENT',{
            key:`${this.classArr[classIndex].id}-${this.classArr[classIndex].children[index1].id}-${this.classArr[classIndex].children[index1].children[index2].id}`,
            value:`${this.classArr[classIndex].title}-${this.classArr[classIndex].children[index1].title}-${this.classArr[classIndex].children[index1].children[index2].title}`
        })
      }else{
        this.$store.commit('user/REMOVE_PREFERENCE_CONTENT',{
            key:`${this.classArr[classIndex].id}-${this.classArr[classIndex].children[index1].id}-${this.classArr[classIndex].children[index1].children[index2].id}`,
            value:`${this.classArr[classIndex].title}-${this.classArr[classIndex].children[index1].title}-${this.classArr[classIndex].children[index1].children[index2].title}`
        })
      }
    },
    workChange(val,classIndex,index1){
      if(val){
        this.$store('user/ADD_PREFERENCE_CONTENT',{
          key:`${this.classArr[classIndex].id}-${this.classArr[classIndex].children[index1].id}`,
          value:`${this.classArr[classIndex].title}-${this.classArr[classIndex].children[index1].title}`
        })
      }else{
        this.$store('user/REMOVE_PREFERENCE_CONTENT',{
          key:`${this.classArr[classIndex].id}-${this.classArr[classIndex].children[index1].id}`,
          value:`${this.classArr[classIndex].title}-${this.classArr[classIndex].children[index1].title}`
        })
      }
    },

    //全选和全不选操作
    allChange(index1){
        const flag=this.checkAll(index1)
        console.log(flag)
        if(!flag){//如果类目并没有被全选，则flag为false，然后移除掉那些被选中的item，下面再重新全部设定为true
          this.classArr[this.classIndex].children[index1].children.forEach((item,i)=>{
            if(this.classArr[this.classIndex].children[index1].children[i].check){
              this.$store.commit('user/REMOVE_PREFERENCE_CONTENT',{
                key:`${this.classArr[this.classIndex].id}-${this.classArr[this.classIndex].children[index1].id}-${this.classArr[this.classIndex].children[index1].children[i].id}`,
                value:`${this.classArr[this.classIndex].title}-${this.classArr[this.classIndex].children[index1].title}-${this.classArr[this.classIndex].children[index1].children[i].title}`
              })
            }
          })
        }
        //如果flag为false，代表当前的三级并没有被全选，当点击全选之后，所有的三级check为true，如果是true，点击全选都有的三级check为false
        this.classArr[this.classIndex].children[index1].children.forEach((item,i)=>{
          this.classArr[this.classIndex].children[index1].children[i].check=!flag
          if(this.classArr[this.classIndex].children[index1].children[i].check){
            this.$store.commit('user/ADD_PREFERENCE_CONTENT',{
              key:`${this.classArr[this.classIndex].id}-${this.classArr[this.classIndex].children[index1].id}-${this.classArr[this.classIndex].children[index1].children[i].id}`,
              value:`${this.classArr[this.classIndex].title}-${this.classArr[this.classIndex].children[index1].title}-${this.classArr[this.classIndex].children[index1].children[i].title}`
            })
          }else{//如果是全选，点击全部就变成非全选，并且还要删除vuex中preference.content保存的数据
            this.$store.commit('user/REMOVE_PREFERENCE_CONTENT',{
                key:`${this.classArr[this.classIndex].id}-${this.classArr[this.classIndex].children[index1].id}-${this.classArr[this.classIndex].children[index1].children[i].id}`,
                value:`${this.classArr[this.classIndex].title}-${this.classArr[this.classIndex].children[index1].title}-${this.classArr[this.classIndex].children[index1].children[i].title}`
              })
          }
        })
        this.classArr[this.classIndex].children[index1].check=this.classArr[this.classIndex].children[index1].children.some(s=>s.checke===true)
        this.classArr[this.classIndex].check=this.classArr[this.classIndex].children.some(s=>s.check===true)
    },
    goTo(){
      console.log(this.preference)
      if(this.preference.content.length>0){
        LsetItem('preference',this.preference)
        LsetItem('classArr',this.classArr)
        this.$router.push({
          path:'/preference/page2',
          query:{site:this.site}
        })
      }else{
         this.$notify({
           type:'primary',
           duration:1000,
           message:'请选择服务内容'
         });
      }

    }
  },
};
</script>
<style lang="scss" scoped>
.preference-page1 {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: contant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  .tips {
    padding: 10px 15px;
    line-height: 20px;
    font-size: 14px;
    color: #ff5a5a;
    max-height: 60px;
    box-sizing: border-box;
  }
  .content {
    height: calc(100vh - 110px - constant(safe-area-inset-bottom));
    height: calc(100vh - 110px - env(safe-area-inset-bottom));
    flex: 1;
    display: flex;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    .left {
      height: 100%;
      width: 82px;
      flex: 0 0 82px;
      background: #f1f2f6;
      /**-webkit-overflow-scrolling 属性控制元素在移动设备上是否使用滚动回弹效果. */
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
      .item {
        font-size: 14px;
        color: #333;
        padding: 17px 8px 17px 10px;
        text-align: left;
        &.active {
          font-family: PingFangSC-Medium;
          background: #fff;
          color: $btnColor;
          font-weight: bold;
        }
      }
    }
    .right {
      height: 100%;
      flex: 1;
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
      padding: 0 15px;
      box-sizing: border-box;
      background: #fff;
      .item {
        padding-bottom: 15px;
        position: relative;
        padding-top: 15px;
        &:after {
          content: " ";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
          transform: scaleY(0.5);
          border-top: 1px solid #e5e5e5;
        }
        .work {
          height: 24px;
          label {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
              font-family: PingFangSC-Medium;
              font-size: 17px;
              color: #333;
              font-weight: bold;
              display: flex;
              align-items: center;
              .icon {
                border: 1.5px solid #fff;
                width: 5px;
                height: 5px;
                box-sizing: border-box;
                display: inline-block;
                border-radius: 50%;
                margin-right: 8px;
              }
            }
          }
        }
        .typeBox {
          padding-top: 5px;
          margin-left: -17px;
          .type {
            padding: 5px 8px;
            border-radius: 4px;
            background-color: #f4f5f6;
            font-size: 15px;
            color: #666;
            display: inline-block;
            margin-left: 17px;
            &.checkAll{
                background-color: $btnColor;
                color: #fff;
            }
            &.check{
              background-color: $btnColor;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .btnBox {
    background: #fff;
    height: 50px;
    .btn {
      width: 100%;
      height: 50px;
      color: #fff;
      font-size: 17px;
      font-weight: bold;
      background: $btnColor;
      text-align: center;
      border: none;
      line-height: 50px;
      outline: none;
    }
  }
}
</style>
