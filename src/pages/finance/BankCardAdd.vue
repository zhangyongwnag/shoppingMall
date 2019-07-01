<template>
  <div style="background-color: #f3f3f3;min-height: 100vh">
    <div class="wrap">
      <div class="general" v-waves>
        <span>银行卡号</span>
        <div class="groupAssist spcetil">
          {{bankInfo.cardNum}}&nbsp;&nbsp;{{bankInfo.cardType == '1' ? '借记卡' : '信用卡'}}
        </div>
      </div>
      <div class="general" v-waves>
        <span>所属银行</span>
        <div class="groupAssist spcetil">
          <img :src="bankInfo.bankIcon" alt="">
          &nbsp;{{bankInfo.bankName}}
        </div>
      </div>
      <!--<div class="general">-->
        <!--<span>银行卡类型</span>-->
        <!--<div class="groupAssist spcetil">-->
          <!--{{bankInfo.cardType == '1' ? '借记卡' : '信用卡'}}-->
        <!--</div>-->
      <!--</div>-->
      <div class="general">
        <span>持卡人</span>
        <van-cell-group class="groupAssist">
          <van-field disabled v-model="proxyNo" placeholder="请输入持卡人" />
        </van-cell-group>
      </div>
      <div class="general">
        <span>身份证号</span>
        <van-cell-group class="groupAssist">
          <van-field type="tel" v-model="cardNum" placeholder="请输入持卡人身份证号" />
        </van-cell-group>
      </div>
      <div class="general">
        <span>预留手机号</span>
        <van-cell-group class="groupAssist">
          <van-field type="tel" maxLength="11" v-model="phone" placeholder="请输入手机号码" />
        </van-cell-group>
      </div>
    </div>

    <van-button v-waves class="buttonSummitAssist" type="default" @click="submit">下一步</van-button>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data() {
      return {
        proxyNo:'',
        cardNum:'',
        phone:'',
        bankInfo:{},
      }
    },
    computed:{
      ...mapState({

      })
    },
    created(){
      this.bankInfo = this.$route.query.bankInfo
      this.proxyNo = this.$route.query.memberName
    },
    mounted(){

    },
    methods:{
      sendCode(){
        if (!common.isphone(this.phone)){
          common.toast('请输入正确的手机号')
          return
        }
        let time = 60
        let data = {
          memberPhone:this.phone
        }
        this.httpCli({
          url:config.URL_MEMBER_ASSIST_REGISTER_CODE,
          data:data,
        })
          .then(res =>{
            if (res.errorCode == 100){
              this.disabledStatus = true
              this.scanMsg = `剩余${time}秒`
              let timeOver = setInterval(()=>{
                time--
                this.scanMsg = `剩余${time}秒`
                if (time == 0){
                  this.scanMsg = '获取验证码'
                  clearInterval(timeOver)
                  this.disabledStatus = false
                }
              },1000)
            }
          })
      },
      submit(){
        if (!this.proxyNo){
          common.toast('请输入持卡人')
          return
        }
        if (!this.cardNum){
          common.toast('请输入持卡人身份证号')
          return
        }
        if (!common.isphone(this.phone)){
          common.toast('请输入正确的手机号')
          return
        }

        this.$toast.loading({
          mask: true,
          message: '提交中...',
          loadingType:'spinner',
          duration:0
        });
        let data = {
          bankcardNo:this.bankInfo.cardNum,
          bankcardUsername:this.proxyNo,
          bankcardIdcard:this.cardNum,
          bankcardPhone:this.phone
        }
        this.httpCli({
          url:config.URL_BANKCARD_ADD,
          data:data
        })
          .then(res => {
            this.$toast.clear()
            if (res.errorCode == 100){
              this.$toast.success('添加成功')
              this.$router.back()
            }
          })
          .catch(err => {
            this.$toast.clear()
          })
      }
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
    width: 90px;
    white-space: nowrap;
  }
  .groupAssist{
    /*height:85%;*/
    margin-left: 80px;
    overflow: hidden;
  }
  .spcetil{
    margin-left: 108px;
    display: flex;
    align-items: center;
  }
  .spcetil img{
    width:48px;
  }
  .van-hairline--top-bottom::after{
    border:0px;
  }
  .buttonAssist{
    padding: 0 30px;
    font-size: 24px;
    color: #ffffff;
    border-radius: 30px;
    background-color: #F2180C;
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
    background-color: #F2180C;
    color: #ffffff;
    margin: 80px 0 0 5%;
    box-shadow: 0px 5px 20px 0px rgba(255,41,28,0.2);
  }
</style>
