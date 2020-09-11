<template>
  <div class="preference-page2">
    <p class="tips">平台主要根据您选择的常住地址给您推单，请您务必选择真实常住地址</p>
    <div class="searchBox">
      <div class="mapText">请输入常住地址</div>
    </div>
    <iframe
      class="map"
      frameborder="0"
      scrolling='no'
      :src="`https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${mapConfig.key}&referer=${mapConfig.referer}&mapdraggable=1${(map.latitude && map.longitude)?`&coord=${map.latitude},${map.longitude}`:''}&zoom=${map.scale}`"
    ></iframe>
    <div class="btnBox">
      <button class="btn">下一步</button>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {LgetItem} from '@/utils/storage'
export default {
    data(){
        return{
            mapConfig:{
                referer:'工蚁众服',
                key: '2JWBZ-4CTWF-F34JL-NEWOB-PRDJH-AXBI7', // 使用在腾讯位置服务申请的key
            },
            map:{
                latitude:40.022964,
                longitude:116.319723,
                scale:16,
                markers:[{
                    id:1,
                    latitude:0.0,
                    longitude:0.0,
                    width:50,
                    height:50
                }]
            },
            site:false
        }
    },
    computed:{
        ...mapGetters(['preference'])
    },
    created(){
        this.site=JSON.parse(this.$route.query.site)
        this.setPpreference()
        console.log(this.preference)
        window.addEventListener('message', (event)=>{
            console.log('执行了没')
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            const data = event.data;
            if (data && data.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                this.$store.commit('user/SET_MAP',{
                    address:data.poiaddress,
                    city:data.cityname,
                    district:'',
                    latitude:data.latlng.lat,
                    longitude:data.latlng.lng,
                    name:data.poiname,
                    province:''
                })
                console.log(this.preference)
            }
        }, false);
        if(this.site){
            console.log('已经选过了')
        }else if(this.preference.map.address === ''){
            this.$nextTick(()=>{
                 this.$wx.$wxInit().then(()=>{
                    this.$wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: (res)=>{
                           const latitude=parseFloat(res.latitude)
                           const longitude=parseFloat(res.longitude)
                           this.map.latitude=latitude
                           this.map.longitude=longitude
                           this.$store.commit('user/SET_MAP',{
                               address:'',
                                city:'',
                                district:'',
                                latitude,
                                longitude,
                                name:'',
                                province:''
                           })
                        }
                    })
                 })
            })
        }
    },
    methods:{
        setPpreference(){
            const preference=LgetItem('preference')
            // if(preference){

            // }
            this.$store.commit('user/SET_PREFERENCE',preference)
        }
    }
};
</script>
<style lang="scss" scoped>
.preference-page2 {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #f5f5f5;
  overflow: hidden;
  padding-bottom: contant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  .tips {
    padding: 10px 15px;
    line-height: 20px;
    font-size: 14px;
    color: #ff5a5a;
    box-sizing: border-box;
  }
  .searchBox {
    position: relative;
    .mapText {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 40px;
      font-size: 16px;
      padding: 0 35px 0 15px;
      display: block;
      box-sizing: border-box;
      color: #333;
      line-height: 40px;
      background: #fff;
    }
  }
  .map{
      flex: 1;
      width: 100vw;
      overflow: hidden;
  }
}
</style>