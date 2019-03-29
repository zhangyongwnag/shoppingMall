<template>
  <div class="wrap">
    <div class="classify" v-if="classifyList.activityList && classifyList.activityList.length">
        <p>热门活动</p>
        <div class="chassifyList">
          <div class="classifyContent" v-for="(item,index) in classifyList.activityList" @click="activity(item.categoryId,index)">
            <img :src="item.categoryThumbImage" alt="">
            <span>{{item.categoryName}}</span>
          </div>
        </div>
      </div>
    <div class="classify">
      <p>特色系列</p>
      <div class="chassifyList">
        <div class="classifyContent" v-for="(item,index) in classifyList.categoryList" @click="$router.push({path:'/ClassifyShopping',query:{categoryId:item.categoryId,categoryName:item.categoryName}})">
          <img :src="item.categoryThumbImage" alt="">
          <span>{{item.categoryName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as config from '../config'
  import * as common from '../common'
  export default {
    data() {
      return {
        classifyList:[],
      }
    },
    created(){
      if (localStorage.getItem('classify')){
        let localStorageData = JSON.parse(localStorage.getItem('classify'))
        this.classifyList = localStorageData
      }
      this.httpCli({
        url:config.URL_GOODS_CATEGORY_LIST
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.classifyList = res.data
            localStorage.setItem('classify',JSON.stringify(res.data))
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    methods:{
      activity(id,index){
        id == 'gift' ? this.$router.push({path:'/NewPeopleDetails',query:{packageId:'a01'}}) : this.$router.push({path:'/MarketPackgeList'})
      }
    }
  }
</script>
<style scoped>
  .wrap{
    width: 100%;
    overflow: hidden;
    padding-bottom: 120px;
  }
  .classify{
    width: 100%;
    padding: 20px 20px;
    border-top: 1PX #f3f3f3 solid;
  }
  .classify:nth-child(1){
    border: 0px;
  }
  .classify p{
    font-size: 30px;
    color: #333;
  }
  .chassifyList{
    overflow: hidden;
    padding-right: 20px;
  }
  .classifyContent{
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    float: left;
  }
  .classifyContent img{
    width: 200px;
    height:200px;
  }
  .classifyContent span{
    display: inline-block;
    font-size: 24px;
    color: #999999;
    margin: 20px 0 30px 0;
  }
</style>
