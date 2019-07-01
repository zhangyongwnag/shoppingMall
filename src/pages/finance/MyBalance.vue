<template>
  <div class="wrap">
    <div class="banalceInfo">
      <div>￥{{balanceData.balance || '0.00'}}</div>
      <van-button class="withDrawButton" v-waves @click="$router.push({path:'/WithdrawMoney'})" round>去提现</van-button>
    </div>
    <div class="withDrawRecords">
      <div>&emsp;提现记录</div>
      <van-list
        v-model="pageLoading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div v-if="recordsList.length">
          <div class="recordList" v-waves v-for="(item,index) in recordsList">
            <div class="infoTitle">
              <span>银行卡提现</span>
              <span v-if="item.withdrawStatus == '3'" class="infoWithDrawFailActive">{{item.withdrawStatusDesc}}</span>
              <span v-else :class="item.withdrawStatus != '1' ? 'infoWithDrawActive' : ''">{{item.withdrawStatusDesc}}</span>
            </div>
            <div class="bankInfo">
              <div>
                <div>建设银行：尾号{{item.withdrawBankcardTail}}</div>
                <div>申请时间：{{item.withdrawApplyTime}}</div>
                <div v-if="item.withdrawStatus == '3'">失败原因：{{item.withdrawRefuseRemark}}</div>
              </div>
              <div>￥{{item.withdrawActualAmount}}</div>
            </div>
          </div>
        </div>
        <div v-else-if="!pageLoading && !recordsList.length" class="empty" style="padding-bottom: 2rem">
          <img src="../../assets/img/empty_finance.png" alt="">
          <p>暂无提现记录</p>
        </div>
        <div class="spinner" slot="loading" style="margin-top: 0;padding: 0.35rem 0">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data () {
      return {
        pageLoading:false,
        finished: false,
        error:false,
        currentPage:sessionStorage.getItem('sessionCurrentPage') || '1',
        totalPage:sessionStorage.getItem('sessionTotalPage') || '1',
        balanceData:{},
        recordsList:[],
      }
    },
    created(){
      this.httpCli({
        url:config.URL_WALLET_BALANCE,
      })
        .then(res => {
          if (res.errorCode == 100){
            this.balanceData = res.data
          }
        })

      if (sessionStorage.getItem('sessionRecordsList')){
        this.recordsList = JSON.parse(sessionStorage.getItem('sessionRecordsList'))
      }
    },
//    beforeRouteLeave(to,from,next){
//      if (to.name == 'PersonCenter'){
//        sessionStorage.removeItem('sessionRecordsList')
//        sessionStorage.removeItem('sessionCurrentPage')
//        sessionStorage.removeItem('sessionTotalPage')
//      }
//      next()
//    },
    methods:{
      onLoad(){
        this._getWithdrawRecords()
      },
      _getWithdrawRecords(){
        if (Number(this.currentPage) > Number(this.totalPage)){
          this.pageLoading = false
          this.finished = true
          return
        }
        let data = {
          currentPage:this.currentPage++,
          pageRow:10
        }
        this.pageLoading = true
        this.httpCli({
          url:config.URL_WALLET_WITHDRAW_LIST,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              setTimeout(() => {
                this.pageLoading = false
                this.recordsList = this.recordsList.concat(res.data.withdrawList.gridModel)
                this.totalPage = res.data.withdrawList.totalPage
                sessionStorage.setItem('sessionRecordsList',JSON.stringify(this.recordsList))
                sessionStorage.setItem('sessionCurrentPage',this.currentPage)
                sessionStorage.setItem('sessionTotalPage',this.totalPage)
              },500)
            }
          })
          .catch(err => {
            this.pageLoading = false
          })
      }
    }
  }
</script>
<style scoped>
.wrap{
  background-color: #f3f2f1;
  min-height: 100vh;
  padding: 25px 15px;
  box-sizing: border-box;
}
  .banalceInfo{
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0 30px 0;
    box-sizing: border-box;
    border-radius: 15px;
  }
.banalceInfo div:nth-child(1){
  font-size: 64px;
  color: #F2180C;
}
  .withDrawButton{
    font-size: 24px;
    height:60px;
    line-height: 60px;
    width: 150px;
    border-radius: 50px;
    background-color: #F2180C;
    color: #ffffff !important;
    margin-top: 45px;
  }
  .withDrawRecords{
    background-color: #ffffff;
    border-radius: 15px;
    margin-top: 25px;
    padding-top: 24px;
  }
.withDrawRecords div:nth-child(1){
  font-size: 24px;
}
  .recordList{
    padding: 25px 0;
    border-bottom: 1Px #eeeeee solid;
  }
  .recordList:last-of-type{
    border-radius: 0 0 10px 10px;
  }
  .infoTitle{
    padding:0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .infoTitle span:nth-child(1){
    font-size: 28px;
  }
.infoTitle span:nth-child(2){
  padding: 5px 10px;
  border: 1PX #000 solid;
  font-size: 22px;
  border-radius: 5px;
}
.infoWithDrawActive{
  color: #999999;
  border: 1PX #999999 solid !important;
}
.infoWithDrawFailActive{
  color: red;
  border:1PX red solid !important;
}
  .bankInfo{
    padding:0 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
.bankInfo div:nth-child(1){
  font-size: 24px;
  color: #999999;
}
.bankInfo div:nth-child(1) div:nth-child(1){
  margin-top: 10px;
  font-size: 24px !important;
  color: #999999 !important;
}
.bankInfo div:nth-child(1) div:nth-child(2){
  margin-top: 5px;
  font-size: 24px !important;
  color: #999999 !important;
}
.bankInfo div:nth-child(2){
  font-size: 28px;
  color: #F2180C;
}
  .failInfo{
    margin-top: 5px;
    font-size: 24px;
    color: #999999;
  }
</style>
