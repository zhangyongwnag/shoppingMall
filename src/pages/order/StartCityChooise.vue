<template>
  <div class="scrollWrap" v-loading="loading">
    <div class="scrollLeft">
      <div class="menu">
        <div v-waves @click="chooiseClass(item.regionCode,item.regionName,index)" :class="startCityRegionCode == item.regionCode ? 'activeItem' : ''" class="item" v-for="(item,index) in startCityList">
          <p :class="startCityRegionCode == item.regionCode ? 'activeText' : ''">{{item.regionName}}</p>
        </div>
      </div>
    </div>
    <div class="scrollRight">
      <div class="contentInfo">
        <div class="goodsList" v-for="(item,index) in startCityChildrenList" @click="chooiseStartProvince(item.regionCode,item.regionName,index)">
          <div class="goodDetail">
            <div>{{item.regionName}}</div>
            <img src="../../assets/img/shop/shopping_check.png" alt="" v-if="startCityResultRegionCode == item.regionCode">
            <img src="../../assets/img/shop/shopping_checkNormal.png" alt="" v-else>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data () {
      return {
        loading:false,
        startCityList:[],
        startCityRegionCode:'',
        startCityRegionName:'',
        startCityResultRegionCode:'',
      }
    },
    computed:{
      ...mapState({
        'chooiseStartProvinceResult':state => state.tour.chooiseStartProvinceResult
      }),
      startCityChildrenList(){
        if (this.startCityList.length && this.startCityList[0].childList){
          return this.startCityList.find(item => item.regionCode == this.startCityRegionCode).childList
        }
      },
    },
    created(){
      this.loading = true
      this.httpCli({
        url:config.URL_TOURLIST_START_CITY_LIST
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.startCityList = res.data.regionList
            this.startCityRegionCode = res.data.regionList[0].regionCode
            this.startCityRegionName = res.data.regionList[0].regionName
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    methods:{
      chooiseClass(regionCode,regionName,index){
        this.startCityRegionCode = regionCode
        this.startCityRegionName = regionName
      },
      chooiseStartProvince(regionCode,regionName,index){
      this.startCityResultRegionCode = regionCode
       let obj = {}
        /*
         for (let i = 0;i<this.startCityChildrenList.length;i++){
           let item = this.startCityChildrenList[i]
           if (item.regionCode == regionCode){
             item.checkRegion = !item.checkRegion
             if (item.checkRegion){
               nameObj.regionCode = item.regionCode
               nameObj.regionName = item.regionName
               nameObj.pushStatus = true
             }else {
               nameObj.regionCode = item.regionCode
               nameObj.regionName = item.regionName
               nameObj.pushStatus = false
             }
           }
           Vue.set(this.startCityChildrenList,i,item)
         }*/
        obj.regionCodeParent = this.startCityRegionCode
        obj.regionNameParent = this.startCityRegionName
        obj.regionCode = regionCode
        obj.regionName = regionName
        this.$store.dispatch('getStartCity',obj)
          .then(res => {
            this.$router.back()
          })
      },
    }
  }
</script>
<style scoped>
  .scrollWrap{
    display: flex;
    min-height: 100vh;
    background-color: #FFffff;
  }
  .scrollLeft{
    overflow-y: scroll;
    overflow-x: hidden;
    height:calc(100vh - 102px);
  }
  .scrollRight{
    width: 870px;
    overflow-y: scroll;
    overflow-x: hidden;
    height:calc(100vh - 102px);
  }
  .menu{
    width: 230px;
  }
  .menu .item{
    width: 160px;
    height:95px;
    border-top: 1PX #f3f2f1 solid;
    border-bottom: 1PX #f3f2f1 solid;
    background-color: #fff;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu .item p{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(102,102,102);
  }
  .menu .activeItem {
    /*background-color: #f3f2f1;*/
    border-right: 1PX #ffffff solid;
  }
  .menu .activeText {
    font-weight: bold;
    color: rgb(242,24,12)!important;
    border-left: 3PX rgb(242,24,12) solid;
  }
  .contentInfo{
    background-color: #ffffff;
    border-radius: 18px;
    margin-left: 50px;
  }
  .contentInfo .goodsList{
    overflow: hidden;
    padding-bottom: 30px;
  }
  .contentInfo .goodsList .goodDetail{
    height: 40px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
    color: rgb(51,51,51);
    float: left;
    margin:30px 0 0 0px;
  }
  .contentInfo .goodsList .goodDetail img{
    width: 30px;
  }
</style>
