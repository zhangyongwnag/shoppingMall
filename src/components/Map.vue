<template>
  <div>
    <div class="amap-wrapper">
      <el-amap class="amap-box" vid="map"
               :zoom="zoom"
               :center="center"
               :plugin="plugin">
        <el-amap-marker vid="marker"
                        :position="center"
                        :label="label"
        >
        </el-amap-marker>
        <el-amap-circle vid="circle"
                        :center="center"
                        :radius="radius"
                        fill-opacity="0.2"
                        strokeColor="#38f"
                        strokeOpacity="0.8"
                        strokeWeight="1"
                        fillColor="#38f"
        >
        </el-amap-circle>
      </el-amap>
    </div>
    <div class="back" v-active @click="$emit('closeMap')">返回</div>
    <div class="footer">
      <!--<div class="append" v-active @click="addRadius">增加精度</div>-->
      <!--<div class="start" v-active @click="back">返回起点</div>-->
      <div class="amap-geolocation-con" @click="back" v-active>
        <div class="amap-geo"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['positionData'],
    data () {
      let vm = this
      return {
        zoom: 16,
        center: vm.positionData.center,
        label: vm.positionData.label,
        radius: 100,
        plugin: [
          {
            pName: 'ToolBar',//工具条插件
            position: 'LB',
          },
          {
            pName: 'MapType',//卫星与地图切换
            defaultType: 0,
            showTraffic: true,//实时交通图层
          },
          {
            pName: 'OverView',
            isOpen:true//鹰眼是否打开
          },
          {
            pName: 'Scale'
          },
 /*         {
            pName: 'Geolocation',//定位插件
            buttonPosition: 'RB',
            showMarker: false,
            events: {
              init (o) {
                //定位成功 自动将marker和circle移到定位点
                o.getCurrentPosition((status, result) => {
                  console.log(result)
                  vm.center = [result.position.lng, result.position.lat]
                  vm.label.content = result.formattedAddress
                })
              }
            }
          }*/
        ],
      }
    },
    watch:{
      positionData(v){
        this.center = v.center
        this.label = v.label
      }
    },
    mounted () {

    },
    methods: {
      back () {
        this.center = this.positionData.center
      }
    }
  }
</script>
<style scoped>
  .amap-wrapper {
    width: 100%;
    height: 100vh
  }

  .back {
    position: fixed;
    left: 30px;
    top: 30px;
    width: 120px;
    height: 55px;
    background-color: #04be02;
    color: #FFF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /*.footer div {*/
    /*width: 140px;*/
    /*height: 60px;*/
    /*background-color: #fff;*/
    /*color: #666;*/
    /*border-radius: 5px;*/
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);*/
    /*position: relative;*/
  /*}*/

  .footer .append {
    margin-right: 20px;
  }
  .amap-geolocation-con{
    /*position: fixed;*/
    z-index: 9999;
    /*right: 10px;*/
    /*bottom: 20px;*/
    position: relative;
  }
  .amap-geolocation-con .amap-geo {
    background: #fff url(https://webapi.amap.com/theme/v1.3/markers/b/loc_gray.png) 50% 50% no-repeat;
    width: 35px;
    height: 35px;
    border: 1px solid #ccc;
    border-radius: 3px;
    right: 4px
  }
</style>
