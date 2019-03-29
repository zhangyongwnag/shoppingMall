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
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell clickable @click="radio = '1'" class="PayMoneyCell">
          <div class="cellDev">
            <img src="../assets/img/03/ldys.png" alt="">
            <span>银行卡支付</span>
          </div>
          <van-radio name="1" />
        </van-cell>
        <div v-if="radio == '1'" @click="$router.push({path:'/BankCardManage',query:{status:'3'}})">
          <div v-if="payOrder.bankcard && payOrder.bankcard.bankcardId && !defaultBankList.bankcardId">
            <div class="bankInfo">
              <div class="bankIcon">
                <img :src="payOrder.bankcard.bankIcon" alt="">
                {{`${payOrder.bankcard.bankName}（尾号${payOrder.bankcard.bankTail})`}}&emsp;{{payOrder.bankcard.bankcardIsDefault == '1' ? '借记卡' : '信用卡'}}
              </div>
              <span class="bankInfoButton">更换</span>
            </div>
          </div>
          <div v-else-if="defaultBankList.bankcardId">
            <div class="bankInfo">
              <div class="bankIcon">
                <img :src="defaultBankList.bankIcon" alt="">
                {{defaultBankList.bankName}}（尾号{{defaultBankList.bankTail}}）{{defaultBankList.bankcardType == '1' ? '借记卡' : '信用卡'}}
              </div>
              <span class="bankInfoButton">更换</span>
            </div>
          </div>
          <div v-else>
            <div class="bankInfo">
              <span class="bankInfoButton">选择银行卡</span>
            </div>
          </div>
        </div>
        <van-cell clickable @click="radio = '2'" class="PayMoneyCell">
          <div class="cellDev">
            <img src="../assets/img/03/zhifubaoicon.png" alt="">
            <span>支付宝支付</span>
          </div>
          <van-radio name="2" />
        </van-cell>
        <van-cell clickable @click="radio = '3'" class="PayMoneyCell">
          <div class="cellDev">
            <img src="../assets/img/03/weixin.png" alt="">
            <span>微信支付</span>
          </div>
          <van-radio name="3" />
        </van-cell>
        <van-cell clickable @click="radio = '4'" class="PayMoneyCell" v-if="status">
          <div class="cellDev">
            <img src="../assets/img/yezf.png" alt="">
            <span>余额支付&nbsp;(余额:￥{{payOrder.balance}})</span>
          </div>
          <van-radio name="4" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <div class="footer">
      <div class="paySafe">
        <img src="../assets/img/paySave.png" alt="">
        <span>您正在安全支付环境中，请放心支付</span>
      </div>
      <div class="payButton">
        <van-button round type="danger" @click="paySubmit">确认支付</van-button>
      </div>
    </div>

    <van-popup v-model="show" position="bottom" :overlay="true" style="width: 100%;height: 100%">
      <!-- 密码输入框 -->
      <van-password-input
        :value="password"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
        style="margin-top: 100px;"
      />

      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
        extra-key="返回"
      />
    </van-popup>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  import m from '../md5.min'
  import axios from 'axios'
  export default {
    data() {
      return {
        radio:'1',
        show:false,
        password:'',
        showKeyboard:true,
        status:''
      }
    },
    watch:{
      password(v){
        if (v.length == '6'){
          this.$toast.loading({
            mask: true,
            message: '提交中...',
            loadingType:'spinner',
            duration:0
          });
          let data = {
            orderNo:this.payOrder.order.orderNo,
            payPasswd:m.md5(v)
          }
          this.httpCli({
            url:config.URL_PAY_BALANCE,
            data:data
          })
            .then(res => {
              this.$toast.clear()
              if (res.errorCode == 100){
                this.$router.replace({path:'/PaySuccess'})
              }else {
                this.password = ''
                this.showKeyboard = true
              }
            })
            .catch(err => {
              this.$toast.clear()
              this.password = ''
              this.showKeyboard = true
            })
        }
      }
    },
    computed:{
      ...mapState({
        'payOrder':state => state.calculate.payOrder,
        'defaultBankList':state => state.funding.defaultBankList
      })
    },
    created(){
      this.status = this.$route.query.status
    },
    mounted(){

    },
    methods:{
      onInput(key) {
        if (key != '返回'){
          this.password = (this.password + key).slice(0, 6);
        }else {
          this.show = false
        }
      },
      onDelete() {
        this.password = this.password.slice(0, this.password.length - 1);
      },
      paySubmit(){
        switch (this.radio){
          case '1':
            if (!this.payOrder.bankcard && !this.defaultBankList.bankcardId){
              common.toast('请去添加银行卡')
              return
            }
            this.$router.push({path:'/PaymentMethodOfBank'})
            break;
          case '2':
            break;
          case '3':
            if (typeof WeixinJSBridge == "undefined"){
              if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', this._onBridgeReady(), false);
              }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', this._onBridgeReady());
                document.attachEvent('onWeixinJSBridgeReady', this._onBridgeReady());
              }
            }else{
              this._onBridgeReady();
            }
            break;
          case '4':
            if (this.payOrder.balance*100 < this.payOrder.order.totalActualAmount*100){
              common.toast('您的余额不足')
              return
            }
            this.$toast.loading({
              mask: true,
              message: '提交中...',
              loadingType:'spinner',
              duration:0
            });
            setTimeout(()=>{
              this.$toast.clear()
              this.show = true
              this.showKeyboard = true
            },500)
            break;
        }
      },
      _onBridgeReady(){
        this.$toast.loading({
          mask: true,
          message: '加载中...',
          loadingType:'spinner',
          duration:0
        });
        this._getPayData()
          .then(res => {
            console.log(res)
            this.$toast.clear()
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId":res.appId,     //公众号名称，由商户传入
                "timeStamp":res.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr":res.nonceStr, //随机串
                "package":res.package,
                "signType":res.signType,         //微信签名方式：
                "paySign":res.paySign //微信签名
              },
              res => {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                  this.$router.replace({path:'/PaySuccess'})
                } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                  this.$toast.fail('取消支付')
                } else {
                  this.$toast.fail('支付失败')
                }
              });
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      _getPayData(){
        return new Promise((resolve,reject) => {
          this._getPrePayId()
            .then(res => {
              let signData = {
                appId:'wx0c21963f12da1c55',
                timeStamp:String(new Date().getTime()),
                nonceStr:String(parseInt(Math.random()*100000000000000)),
                package:`prepay_id=${res}`,
                signType:"MD5",
              }
              return signData
            })
            .then(reply => {
              let keys = []
              for (let i in reply) {
                keys.push(i);
              }
              keys.sort();
              let signStr = ''
              for(let key = 0;key<keys.length;key++){
                signStr += keys[key] + "=" + reply[keys[key]] + '&'
              }
              let plainData = {
                plaintext:signStr.substring(0,signStr.length - 1)
              }
              this.httpCli({
                url:config.URL_WX_PAY_SIGNATURE,
                data:plainData
              })
                .then(res => {
                  if (res.errorCode == 100){
                    reply['paySign'] = res.data.signature
                    resolve(reply)
                  }else {
                    reject(res)
                  }
                })
                .catch(err => {
                  reject(err)
                })
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      _getPrePayId(){
        return new Promise((resolve,reject) => {
          let data = {
            orderNo:this.payOrder.order.orderNo,
            openid:sessionStorage.getItem('openId')
//            openid:'oFlnD01-mYk7JAxuY9tVKR2O839E'
          }
          this.httpCli({
            url:config.URL_PAY_WX_PREPAY,
            data:data,
          })
            .then(res => {
              if (res.errorCode == 100){
                resolve(res.data.order.thirdpartyPrepayId)
              }else {
                reject(res)
              }
            })
            .catch(err => {
              reject(err)
            })
        })
      },
    }
  }
</script>
<style scoped>
  .wrap{
    padding: 0px 30px 30px;
    background-color: #fff;
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
    padding: 20px 50px 0 50px;
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
