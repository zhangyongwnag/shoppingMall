<template>
  <div style="min-height: 100vh;background-color: #f3f3f3" v-if="!loading">
    <div class="wrap" v-if="marketListDetailList.gridModel && marketListDetailList.gridModel.length">
      <div class="infoList" v-for="(item,index) in marketListDetailList.gridModel">
        <div class="infoContent">
          <div class="infoTitle">
            <span>{{item.bonusName}}</span>
            <span>{{item.bonusStatusDesc}}</span>
          </div>
          <p>周数：{{100}}</p>
          <p>扶持金额：！23</p>
          <p>{{item.bonusReleaseTime}}</p>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <img src="../assets/img/noPrice.png" alt="">
      <p>暂无发放记录</p>
    </div>
  </div>
  <div class="spinner" style="margin-top: 3rem" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import * as common from '../common'
  import * as config from '../config'
  export default {
    data() {
      return {
        loading:false,
        marketListDetailList:{}
      }
    },
    created(){
      this.loading = true
      let data = {
        currentPage:'1',
        pageRow:'10000',
        orderNo:this.$route.query.orderNo
      }
      this.httpCli({
        url:config.URL_BONUS_MARKET_LIST_DETAIL,
        data:data
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.marketListDetailList = res.data.list
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    methods:{
      toDetails(marketId,index){
        this.$router.push({path:'/SupportListDetails',query:{marketId:marketId}})
      }
    },
  }
</script>
<style scoped>
  .wrap{

  }
  .infoList{
    padding-top: 30px;
  }
  .infoContent::before{
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    border-color: #000;
    background-color: #000;
    border-radius: inherit;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .infoContent:active::before {
    opacity: 0.3;
  }
  .infoTitle{
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    border-bottom: 1PX #c8c9cc solid;
    padding-bottom: 30px;
  }
  .infoContent {
    width: 95%;
    background-color: #fff;
    border-radius: 10px;
    padding: 30px 40px 0px 40px;
    box-sizing: border-box;
    margin: 0 auto;
    font-size: 28px;
    position: relative;
  }
  .infoContent p{
    margin-top: 40px;
  }
  .infoContent p:nth-child(2){
    margin-top: 30px;
  }
  .infoContent p:nth-child(4){
    margin-top: 40px;
    border-top: 1PX #c8c9cc solid;
    padding: 30px 0;
    color: #999999;
  }
</style>
