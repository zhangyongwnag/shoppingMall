<template>
  <div>
    <van-list
      v-model="pageLoading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div class="wrap">
        <div class="recordsList" v-for="(item,index) in withdrawList">
          <div>
            <span>余额提现 <span class="withService">(含￥{{item.withdrawServiceAmount}}手续费)</span></span>
            <span>￥{{item.withdrawActualAmount}}</span>
          </div>
          <div>
            <span>{{item.withdrawApplyTime}}</span>
            <!--<span>提现失败</span>-->
            <span>{{item.withdrawStatusDesc}}</span>
          </div>
        </div>
      </div>
      <div class="empty" v-if="!pageLoading && !withdrawList.length">
        <img src="../assets/img/noPrice.png" alt="">
        <p>暂无提现记录</p>
      </div>
      <div class="spinner" slot="loading" style="margin: 30px auto;">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </van-list>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  export default {
    data() {
      return {
        pageLoading:false,
        finished: false,
        error:false,
        currentPage:'1',
        totalPage:'1',
        withdrawList:[]
      }
    },
    created(){

    },
    methods:{
      onLoad(){
        setTimeout(() => {
          this._getWithdrawList()
        })
      },
      _getWithdrawList(){
        if (this.currentPage > this.totalPage){
          this.pageLoading = false
          this.finished = true
          return
        }
        let data = {
          currentPage:this.currentPage++,
          pageRow:20
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
                this.withdrawList = this.withdrawList.concat(res.data.withdrawList.gridModel)
                this.totalPage = res.data.withdrawList.totalPage
              },1000)
            }else {
              this.error = true
            }
          })
          .catch(err =>{
            this.error = true
          })
      }
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
  .recordsList div:nth-child(1) span:nth-child(2){
    color: #f82a59;
  }
  .recordsList div:nth-child(2) span:nth-child(1){
    color: #999999;
  }
  .recordsList div:nth-child(2) span:nth-child(2){
    color: #999999;
  }
  .withService{
    font-size: 24px;
    color: #666;
  }
</style>
