<template>
  <div class="wrap" v-loading="loading">
    <div class="contentInfo">
        <div class="goodsList" v-for="(item,index) in toProvinceList" @click="chooiseToProvince(item.regionCode,item.regionName,index)">
          <div class="goodDetail">
            <div>{{item.regionName}}</div>
            <img src="../../assets/img/shop/shopping_check.png" alt="" v-if="toProvinceRegionCode == item.regionCode">
            <img src="../../assets/img/shop/shopping_checkNormal.png" alt="" v-else>
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
        toProvinceList:[],
        toProvinceRegionCode:'',
      }
    },
    computed:{

    },
    created(){
      this.loading = true
      this.httpCli({
        url:config.URL_TOURLIST_TO_PROVINCE_LIST
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.toProvinceList = res.data.regionList
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    methods:{
      chooiseToProvince(regionCode,regionName,index){
        this.toProvinceRegionCode = regionCode
        let obj = {
          regionCode:regionCode,
          regionName:regionName
        }
        this.$store.dispatch('getToProvince',obj)
          .then(res => {
            this.$router.back()
          })
      },
    }
  }
</script>
<style scoped>
  .wrap{
    min-height: 100vh;
    background-color: #FFffff;
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
    padding: 30px;
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
