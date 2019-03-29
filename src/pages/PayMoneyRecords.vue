<template>
  <div v-if="!loading">
    <div class="wrap" v-if="rechargeList.gridModel && rechargeList.gridModel.length">
      <div class="recordsList" v-for="(item,index) in rechargeList.gridModel">
        <div>
          <span>{{item.rechargeType}}</span>
          <span>￥{{item.rechargeAmount}}</span>
        </div>
        <div>
          <span>{{item.rechargeTime}}</span>
          <!--<span style="color: #398bfa;">充值失败</span>-->
          <span style="color: #f82a59;">{{item.rechargeStatusDesc}}</span>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <img src="../assets/img/noPrice.png" alt="">
      <p>暂无充值记录</p>
    </div>
  </div>
  <div class="spinner" style="margin-top: 3rem" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  export default {
    data() {
      return {
        loading:false,
        rechargeList:{}
      }
    },
    created(){
      this.loading = true
      let data = {
        currentPage:'1',
        pageRow:'10000'
      }
      this.httpCli({
        url:config.URL_WALLET_RECHARGE_LIST,
        data:data
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.rechargeList = res.data.rechargeList
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
  width: 100%;
  margin-top: 30px;
}
  .recordsList{
    border-bottom: 1PX #ddd solid;
  }
.recordsList div:nth-child(1){
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px 20px;
  font-size: 28px;
}
.recordsList div:nth-child(2){
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 30px;
  font-size: 24px
}
.recordsList div:nth-child(2) span:nth-child(1){
  color: #999999;
}
</style>
