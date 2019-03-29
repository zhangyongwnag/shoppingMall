<template>
  <div style="background-color: #F3f3f3;height: 100vh;">
    <div class="wrap">
      <div class="info">
        <p>付款金额</p>
        <p>￥{{payOrder.order.totalActualAmount}}</p>
        <div class="payInfo">
          <div class="payInfoPayee">
            <span>收款方</span>
            <span>深圳贝雅生物科技有限公司</span>
          </div>
          <div class="payInfoPayee">
            <span>订单编号</span>
            <span>{{payOrder.order.orderNo}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="generalWrap">
      <div class="general">
      <span v-if="defaultBankList.bankcardId">
              {{defaultBankList.bankName}}（尾号{{defaultBankList.bankTail}}）{{defaultBankList.bankcardType == '1' ? '借记卡' : '信用卡'}}
      </span>
        <span v-else>
    {{`${payOrder.bankcard.bankName}（尾号${payOrder.bankcard.bankTail})`}}&emsp;{{payOrder.bankcard.bankcardIsDefault == '1' ? '借记卡' : '信用卡'}}
        </span>
      </div>
      <div class="general">
        <span>验证码</span>
        <van-cell-group class="groupAssist">
          <van-field type="tel" maxLength="4" v-model="validate" placeholder="请输入验证码">
            <van-button v-if="!disabledStatus" slot="button" size="small" type="primary" class="buttonAssist" @click="sendCode">{{scanMsg}}</van-button>
            <van-button v-else slot="button" size="small" type="primary" class="buttonCodeStatus">{{scanMsg}}</van-button>
          </van-field>
        </van-cell-group>
      </div>
    </div>

    <div class="footer">
      <div class="paySafe">
        <img src="../assets/img/paySave.png" alt="">
        <span>您正在安全支付环境中，请放心支付</span>
      </div>
      <div class="payButton">
        <van-button round type="danger" @click="paySubmit">确认支付</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  export default {
    data() {
      return {
        radio:'1',
        validate:'',
        disabledStatus:false,
        scanMsg:'点击获取',
      }
    },
    computed:{
      ...mapState({
        'payOrder':state => state.calculate.payOrder,
        'defaultBankList':state => state.funding.defaultBankList
      })
    },
    mounted(){

    },
    methods:{
      sendCode(){
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
      paySubmit(){

      }
    }
  }
</script>
<style scoped>
  .wrap{
    padding: 0px 30px 30px;
    background-color: #fff;
  }
  .generalWrap{
    /*padding: 0 10px;*/
    margin-top: 20px;
  }
  .general{
    height:100px;
    padding:0 30px;
    box-sizing: border-box;
    border: 1PX #eee solid;
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #666;
    background-color: #ffffff;
  }
  .spctil{
    height: 650px;
    align-items: flex-start;
    padding-top: 20px;
  }
  .general span{
    width: 90px;
    white-space: nowrap;
  }
  .groupAssist{
    /*height:85%;*/
    margin-left: 100px;
    overflow: hidden;
  }
  .translate{
    width: 90%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: 20px;
    top: 0;
    background-color: rgba(0,0,0,0);
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
    border: 1PX #dddddd solid;
    background-color: #ffffff;
  }
  .info{
    padding-top: 20px;
  }
  .info p:nth-child(1){
    font-size: 25px;
    text-align: center;
    color: #333333;
  }
  .info p:nth-child(2){
    margin-top: -10px;
    font-size: 50px;
    color: #f82a59;
    text-align: center;
  }
  .bankInfo{
    padding: 10px 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .bankIcon{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .bankIcon img{
    width: 40px;
    margin-right: 10px;
  }
  .bankInfoButton{
    padding: 5px 10px;
    font-size: 20px;
    border: 1PX #398bfa solid;
    color:#398bfa;
  }
  .payInfo{
    padding-top: 20px;
  }
  .payInfoPayee{
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    color: #999999;
  }
  .van-cell{
    padding: 20px 0;
  }
  .van-cell__value{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .van-hairline--top-bottom::after{
    border-bottom: 1Px #ddd solid;
  }
  .PayMoneyCell{
    padding-right: 30px;
    margin-top: 20px;
  }
  .cellDev{
    padding: 0 0px 0 30px;
    display: flex;
    align-items: center;
  }
  .cellDev img{
    margin-right: 30px;
    width: 40px;
  }
  .cellDev span{
    font-size: 28px;
    color: #666;
  }
  .payButton{
    width: 100%;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    margin-top: 20px;
  }
  .payButton button{
    border: 0px;
    width: 90%;
    margin-left: 5%;
    height:80px;
    line-height: 80px;
    background: -webkit-linear-gradient(left, #f82a59 , #f86b8b); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to right, #f82a59 , #f86b8b); /* 标准的语法（必须放在最后） */
    box-shadow: 0px 3px 20px 1PX #999;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    border-radius: 10px;
    font-size: 30px;
  }
  .payRecords{
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    color: #398bfa;
    font-size: 24px;
  }
  .paySafe{
    display: flex;
    justify-content: center;
    align-content: center;
    color: #69b7fe;
    margin-top: 50px;
  }
  .paySafe img{
    margin-right: 10px;
    height:30px;
  }
</style>
