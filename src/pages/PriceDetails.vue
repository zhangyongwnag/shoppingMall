<template>
  <div style="min-height: 100vh;background-color: #f3f3f3" v-if="!loading">
    <div class="wrap" v-if="list.gridModel && list.gridModel.length">
      <div class="infoList" v-for="(item,index) in list.gridModel">
        <div class="infoContent">
          <div class="infoTitle">
            <span>{{item.bonusName}}</span>
            <span>{{item.bonusStatusDesc}}</span>
          </div>
          <p>奖金金额：123123</p>
          <p>扶持金额：！23</p>
          <div class="infoMata">
            <span>备注：</span>
            <span>订单ad阿斯达所多啊实打实大傻蛋阿达湿哒哒阿萨德啊实打实阿萨德</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <img src="../assets/img/noPrice.png" alt="">
      <p>暂时还没有奖金记录</p>
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
        list:{}
      }
    },
    created(){
      this.loading = true
      let data = {
        currentPage:'1',
        pageRow:'10000'
      }
      this.httpCli({
        url:config.URL_BONUS_DETAIL_LIST,
        data:data
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.list = res.data.list
          }
        })
        .catch(err => {
          this.loading = false
        })
    }
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
    border-bottom: 1pX #c8c9cc solid;
    padding-bottom: 30px;
  }
  .infoContent {
    width: 95%;
    background-color: #fff;
    border-radius: 10px;
    padding: 30px 40px 30px 40px;
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
  .infoMata{
    display: flex;
    justify-content: flex-start;
    margin-top: 40px;
  }
  .infoMata span:nth-child(1){
    white-space: nowrap;
  }
  .infoMata span:nth-child(2){
    line-height: 45px;
    margin-left: 30px;
  }
</style>
