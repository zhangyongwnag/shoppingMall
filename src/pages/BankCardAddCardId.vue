<template>
  <div style="background-color: #f3f3f3;min-height: 100vh">
    <div class="wrap">
      <div class="general">
        <span>卡号</span>
        <van-cell-group class="groupAssist">
          <van-field type="tel" v-model="cardNum" placeholder="请输入银行卡号" />
        </van-cell-group>
      </div>
      <p class="text">若您的银行卡不支持，查看&nbsp;<span @click="show = true">支持的银行卡列表</span></p>
    </div>

    <van-button class="buttonSummitAssist" type="default" @click="submit">下一步</van-button>

    <van-popup v-model="show" position="right" :overlay="true" style="width: 100%;height: 100%;">
      <p class="text">借记卡列表</p>
      <div class="supportBankList" v-for="(item,index) in supportBackList.debitList">
        <p>{{item.bankName + '（' + item.bankCode + '）'}}</p>
        <img :src="item.bankIcon" alt="">
      </div>
      <p class="text spectail">信用卡列表</p>
      <div class="supportBankList" v-for="(item,index) in supportBackList.creditList">
        <p>{{item.bankName + '（' + item.bankCode + '）'}}</p>
        <img :src="item.bankIcon" alt="">
      </div>
      <van-button class="buttonSummitAssist" type="default" @click="show = false">确定</van-button>
    </van-popup>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  export default {
    data() {
      return {
        cardNum:'',
        show:false,
        supportBackList:[]
      }
    },
    computed:{
      ...mapState({

      })
    },
    created(){
      this.httpCli({
        url:config.URL_BANKCARD_SUPPORT_LIST
      })
        .then(res => {
          if (res.errorCode == 100){
            this.supportBackList = res.data
          }
        })
    },
    mounted(){

    },
    methods:{
      submit(){
        if (!this.cardNum){
          common.toast('请输入卡号')
          return
        }
        this.$toast.loading({
          mask: true,
          message: '提交中...',
          loadingType:'spinner',
          duration:0
        });
        let data = {
          bankcardNo:this.cardNum
        }
        this.httpCli({
          url:config.URL_BANKCARD_RECOGNISE,
          data:data
        })
          .then(res => {
            this.$toast.clear()
            if (res.errorCode == 100){
              this.$router.replace({path:'/BankCardAdd',query:{bankInfo:res.data.recognise}})
            }
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
    }
  }
</script>
<style scoped>
  .wrap{
    width: 100%;
  }
  .general{
    height:100px;
    padding-left: 20px;
    box-sizing: border-box;
    border: 1Px #eee solid;
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #666;
    background-color: #ffffff;
  }
  .general span{
    width: 10px;
    white-space: nowrap;
  }
  .groupAssist{
    /*height:85%;*/
    margin-left: 100px;
    overflow: hidden;
  }
  .van-hairline--top-bottom::after{
    border:0px;
  }
  .buttonAssist{
    padding: 0 30px;
    font-size: 24px;
    color: #ffffff;
    border-radius: 30px;
    background-color: #f82a59;
  }
  .buttonCodeStatus{
    padding: 0 30px;
    font-size: 24px;
    color: #999;
    border-radius: 30px;
    border: 1Px #dddddd solid;
    background-color: #ffffff;
  }
  .buttonSummitAssist{
    width: 90%;
    height:96px;
    border-radius: 50px;
    font-size: 30px;
    background-color: #f82a59;
    color: #ffffff;
    margin: 80px 0 50px 5%;
  }
  .text{
    margin: 20px 0 0 20px;
    color: #999999;
  }
  .text span{
    color: dodgerblue;
  }
  .supportBankList{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    border-bottom: 1Px #c8c9cc solid;
  }
  .supportBankList p {
    font-size: 30px;
  }
  .spectail{
    margin-top: 40px;
  }
  .supportBankList img{
    width: 50px;
    height:50px;
  }
</style>
