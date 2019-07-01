<template>
  <div v-loading="loading">
    <div>
      <div class="wrap">
        <header v-if="orderDetails.order">
          <p>{{orderDetails.order.orderStatusDesc}}</p>
          <p v-if="orderDetails.order.payKeepTime">还剩 {{day + hour + minute + second}} 取消订单</p>
          <p v-if="orderDetails.order.orderTips">{{orderDetails.order.orderTips}}</p>
        </header>
        <div class="address" v-if="orderDetails.address">
          <div class="addressContent">
            <img src="../../assets/img/order/order_addressPosition.png" alt="">
            <div class="addressList" v-if="orderDetails.address">
              <span>{{orderDetails.address.addressRealname}} <span>{{orderDetails.address.addressMobile}}</span></span>
              <span>{{(orderDetails.address.addressProvince || '') + (orderDetails.address.addressCity || '') + (orderDetails.address.addressArea || '') + orderDetails.address.addressDetail}}</span>
            </div>
            <!--<div class="addressList"><span style="color: #666;">添加收货地址</span></div>-->
          </div>
        </div>
        <img src="../../assets/img/order/order_addressLine.png" alt="" class="addressPart" v-if="orderDetails.address">
        <div class="shopListWrap" style="padding-bottom: 0px;">
          <div class="product" v-if="orderDetails.order">
            <!--<div class="productStatus">{{orderDetails.order.orderStatusDesc}}</div>-->
            <div class="shopInfo" @click.stop v-for="(item,index) in orderDetails.goodsList">
              <div class="imgWrap" style="position: relative;overflow: hidden">
                <img :src="item.goodsThumb" alt="">
                <div class="giftFree" v-if="item.goodsEt == '2'">
                  <span>现场</span>
                </div>
                <div class="giftSend" v-if="item.goodsIsGift == '1'">
                  <span>赠</span>
                </div>
              </div>
              <div class="shopDetail">
                <p class="detailTitle">{{item.goodsTitle.substring(0, 25) + '...'}}</p>
                <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
                <p class="detailDescription" v-else>{{item.goodsSubtitle}}</p>
              </div>
              <div class="shopNumber">x{{item.goodsNum}}</div>
            </div>
            <div class="shopPrice">
              <div>
                <span>商品总价</span>
                <span>￥{{orderDetails.order.payActualAmount}}</span>
              </div>
              <!--<div v-if="orderDetails.order.payProfitAmount">-->
                <!--<span>获得收益</span>-->
                <!--<span>￥{{orderDetails.order.payProfitAmount}}</span>-->
              <!--</div>-->
              <div>
                <span>运费(快递)</span>
                <span>{{orderDetails.order.expressFee > 0 ? '￥' + orderDetails.order.expressFee : '免运费'}}</span>
              </div>
              <div>
                <span>优惠券</span>
                <span>-￥{{0.00}}</span>
              </div>
              <div>
                <span>总计</span>
                <span>￥{{orderDetails.order.payActualAmount}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="shopListWrap">
          <div class="product" v-if="orderDetails.order">
            <p>订单编号：{{orderDetails.order.orderNo}}
              <ClipboardText :text="orderDetails.order.orderNo"></ClipboardText>
            </p>
            <p>下单时间：{{orderDetails.order.orderCreateTime}}</p>
            <p v-if="orderDetails.order.orderCancelTime">取消时间：{{orderDetails.order.orderCancelTime}}</p>
            <p v-if="orderDetails.order.payTime">付款时间：{{orderDetails.order.payTime}}</p>
            <p v-if="orderDetails.order.expressSendTime">发货时间：{{orderDetails.order.expressSendTime}}</p>
            <p v-if="orderDetails.order.expressReceiveTime">收货时间：{{orderDetails.order.expressReceiveTime}}</p>
            <p v-if="orderDetails.order.payType">支付方式：{{orderDetails.order.payType}}</p>
          </div>
        </div>
      </div>

      <div class="footerWrap">
        <div class="footer" v-if="orderDetails.order">
          <!--<p v-if="orderDetails.order.btnViewProcessEnable == '1'"-->
             <!--@click="checkProgress(orderDetails.order.orderId)">查看进度</p>-->
          <!--<p v-if="orderDetails.order.btnDrawbackEnable == '1'"-->
             <!--@click="applyDrawBack(orderDetails.order.orderId)">申请退款</p>-->
          <!--<p v-if="orderDetails.order.btnApplyProtectionEnable == '1'"-->
             <!--@click="applyAftersale(orderDetails.order.orderId)">申请售后</p>-->
          <p style="color: #f82a59;border-color: #f82a59" v-if="orderDetails.order.btnPayEnable == '1'"
             @click="payOrder(orderDetails.order.orderNo)">支付订单</p>
          <p @click="giveupOrder(orderDetails.order.orderNo)" v-if="orderDetails.order.btnCancelEnable == '1'">取消订单</p>
          <!--<p v-if="orderDetails.order.btnExpressEnable == '1'"-->
             <!--@click="logistic(orderDetails.order.expressType,orderDetails.order.orderId,orderDetails.order.expressSn)">-->
            <!--查看物流</p>-->
          <p @click="confirm(orderDetails.order.orderNo)" style="color: #f82a59;border-color: #f82a59"
             v-if="orderDetails.order.btnConfirmEnable == '1'">确认收货</p>
        </div>
      </div>
    </div>

    <van-popup v-model="showPayPopup" position="bottom" overlay>
      <div class="payPopup">
        <div @click="wxPay">
          <img src="../../assets/img/finance/finance_pay_wx.png" alt="">
          微信支付
        </div>
        <div @click="mountPay">
          <img src="../../assets/img/finance/finance_pay_mount.png" alt="">
          余额支付&nbsp;
          <span v-if="userInfo.memberPayPasswordStatus == '0'">(未设置支付密码，点击设置)</span>
          <span v-else><span style="font-size: 0.3rem;color: #F2180C;">(&nbsp;余额:&nbsp;￥{{orderInfo.balance}}&nbsp;)</span></span>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="show" position="bottom" :overlay="true" style="width: 100%;height: 100%;background-color: #fff">
      <!-- 密码输入框 -->
      <van-password-input
        :value="password"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
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
  import {mapState, mapGetters} from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  import ClipboardText from '../../components/ClipboardText.vue'
  import * as wx from '../../utils/weixin'
  import * as m from '../../utils/md5.min'
  export default {
    data() {
      return {
        loading: false,
        day: '',
        hour: '',
        minute: '',
        second: '',
        showPayPopup:false,
        show:false,
        password:'',
        showKeyboard:true,
        userInfo:{},
        orderInfo:{}
      }
    },
    computed: {
      ...mapState({
        'orderDetails': state => state.details.orderDetails
      })
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
            orderNo:this.orderInfo.order.orderNo,
            payPasswd:m.md5(v)
          }
          this.httpCli({
            url:config.URL_PAY_BALANCE,
            data:data
          })
            .then(res => {
              this.$toast.clear()
              if (res.errorCode == 100){
                this.show = false
                this.showPayPopup = false
                this.password = ''
                this.$store.dispatch('getOrderDetails', this.$route.query.orderNo)
                this.$toast.success('支付成功')
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
    created() {
      this.loading = true
      this.$store.dispatch('getOrderDetails', this.$route.query.orderNo)
        .then(res => {
          this.loading = false
          if (res.order && res.order.payKeepTime) {
            var val = res.order.payKeepTime
            var m = 60;
            var h = 60 * 60;
            var day = 60 * 60 * 24;
            let timeOver = setInterval(() => {
              val--
              var lday = parseInt(val / day)
              if (lday <= 0) {
                lday = '00';
              } else if (lday < 9) {
                lday = '0' + lday;
              }
              var lh = parseInt(val % day / h)
              if (lh <= 0) {
                lh = '00';
              } else if (lh < 9) {
                lh = '0' + lh;
              }
              var lm = parseInt(val % h / m)
              if (lm <= 0) {
                lm = '00';
              } else if (lm < 9) {
                lm = '0' + lm;
              }
              var ls = parseInt(val % m)
              if (ls <= 0) {
                ls = '00';
              } else if (ls < 9) {
                ls = '0' + ls;
              }
              this.day = lday != '00' ? lday + ':' : ''
              this.hour = lh != '00' ? lh + ':' : ''
              this.minute = lm != '00' ? lm + ':' : ''
              this.second = ls != '00' ? ls : ''
              if (val == '0') {
                this.$router.back()
                clearInterval(timeOver)
              }
            }, 1000)
          }
        })
        .catch(err => {
          this.loading = false
        })
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    methods: {
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
      payOrder(orderNo){
        this.$toast.loading({
          mask: true,
          message: '结算中...',
          loadingType:'spinner',
          duration:0
        });
        this.$store.dispatch('getOrderInfoByOrderId',orderNo)
          .then(res => {
            this.orderInfo = res
            if (this.userInfo.memberType == '2' && this.orderInfo.balance != '0'){
              this.showPayPopup = true
              this.$toast.clear()
            }else {
              this.wxPay()
            }
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      giveupOrder(orderNo) {
        this.$dialog.confirm({
          title: '提示',
          message: '确定要取消订单吗？'
        }).then(() => {
          this.$toast.loading({
            mask: true,
            message: '取消中...',
            loadingType: 'spinner',
            duration: 0
          })
          let data = {
            orderNo: orderNo
          }
          this.httpCli({
            url: config.URL_ORDER_CANCEL,
            data: data
          })
            .then(res => {
              this.$toast.clear()
              if (res.errorCode == 100) {
                this.$router.back()
              }
            })
            .catch(err => {
              this.$toast.clear()
            })
        }).catch(() => {

        });
      },
      logistic(expressType, orderId, expressSn) {
        expressType == '2' ? this.$router.push({
          path: '/LogisticsList',
          query: {orderId: orderId}
        }) : this.$router.push({path: '/LogisticsInfo', query: {expressSn: expressSn}})
      },
      confirm(orderNo) {
        this.$dialog.confirm({
          title: '提示',
          message: '确定要确认收货吗？'
        }).then(() => {
          this.$toast.loading({
            mask: true,
            message: '确认中...',
            loadingType: 'spinner',
            duration: 0
          })
          let data = {
            orderNo: orderNo
          }
          this.httpCli({
            url: config.URL_ORDER_CONFIRM,
            data: data
          })
            .then(res => {
              this.$toast.clear()
              if (res.errorCode == 100) {
                this.$store.dispatch('getOrderDetails', this.$route.query.orderNo)
              }
            })
            .catch(err => {
              this.$toast.clear()
            })
        }).catch(() => {

        });
      },
      wxPay(){
        wx._onBridgeReady(this.orderInfo.order.orderNo)
          .then(res => {
            if (res == 'ok'){
              this.showPayPopup = false
              this.$toast.success('支付成功')
              this.status == '1' ? this.allList.gridModel.splice(this.index,1) : this.bepayedList.gridModel.splice(this.index,1)
            }else {
              this.$toast.fail('取消支付')
              this.loadingText = '支付988元成为钻石会员'
            }
          })
          .catch(err => {
            this.$toast.fail('支付失败')
            this.loadingText = '支付988元成为钻石会员'
          })
      },
      mountPay(){
        if (this.userInfo.memberPayPasswordStatus == '0'){
          this.$router.push({path:'/SetPaypwd',query:{status:false}})
        }else {
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
        }
      },
      checkProgress(orderId){
        this.$router.push({path:'/ApplicationDetail',query:{orderId:orderId}})
      },
      applyDrawBack(orderId){
        this.$router.push({path:'/ApplyDrawBack',query:{orderId:orderId,drawBackMethodId:'1'}})
      },
      applyAftersale(orderId){
        this.$router.push({path:'/ApplyDrawBack',query:{orderId:orderId}})
      }
    },
    components: {
      ClipboardText
    }
  }
</script>
<style scoped>
  .wrap {
    padding-bottom: 80px;
    background-color: #FFffff;
  }

  header {
    width: 100%;
    background-image: url("../../assets/img/main/person_headerBj.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    min-height: 170px;
  }

  header p:nth-child(1) {
    font-size: 28px;
    color: #fff;
    margin: 0 0 15px 108px;
    padding-top: 64px;
  }

  header p:nth-child(2) {
    font-size: 20px;
    color: #fff;
    margin: 0 0 0px 108px;
    padding-bottom: 70px;
  }

  .anavter {
    display: flex;
    align-items: center;
  }

  .userAnavter {
    border-radius: 50%;
    width: 130px;
    height: 130px;
    background-color: #FFffff;
    border: 1PX #eeeeee solid;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .userAnavter .userAnavterImg {
    width: 130px;
  }

  .anavter p {
    /*margin: 0 20px 0 30px;*/
    /*font-size: 36px;*/
    /*color: #fff;*/
  }

  .userSubInfo {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width: 500px;
  }

  .userClass {
    margin-left: 20px;
    font-size: 30px;
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .userAddress {
    font-size: 30px !important;
    color: #666;
    margin-left: 20px;
    margin-top: 6px;
  }

  .classImg {
    height: 22px !important;
    margin-left: 35px;
  }

  .address {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px 10px;
    background-color: #Fff;
  }

  .address img {
    width: 15px;
  }

  .addressContent {
    display: flex;
    align-items: center;
  }

  .addressContent img {
    width: 40px;
    margin-right: 30px;
  }

  .addressList {
    display: flex;
    flex-direction: column;
  }

  .addressList span {
    font-size: 30px;
    color: #333333;
    margin-right: 98px;
  }

  .addressList span:nth-child(2) {
    display: block;
    width: 500px;
    margin-top: 20px;
    font-size: 24px;
    color: #666;
  }

  .addressList span span {
    font-size: 24px;
    color: #666;
    margin-left: 50px;
  }

  .addressPart {
    height: 7px;
    width: 100%;
    margin-top: -40px;
  }

  .shopListWrap {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 50px;
  }

  .product {
    width: 95%;
    border: 1Px #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    padding: 20px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top: 20px;
    margin-left: 2.5%;
  }

  .productStatus {
    padding-bottom: 20px;
    font-size: 24px;
    color: #f82a59;
  }

  .product:nth-child(1) {
    margin-top: 30px;
  }

  .checkbox img {
    width: 36px;
    height: 36px;
  }

  .shopInfo {
    width: 100%;
    display: flex;
    height: 200px;
    margin-top: 30px;
  }

  .shopInfo:nth-child(1) {
    margin-top: 0;
  }

  .shopPrice {
    border-top: 1Px #eeeeee solid;
    padding: 20px 0 24px;
    margin-top: 40px;
  }

  .shopPrice div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 28px;
    color: #333333;
  }

  .shopPrice div:nth-child(4) {
    margin-top: 30px;
  }

  .shopPrice div:nth-child(4) span:nth-child(2) {
    color: #f82a59;
  }

  .imgWrap {
    width: 200px;
    height: 200px;
    border: 1Px #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }

  .imgWrap img {
    width: 100%;
  }

  .shopDetail {
    max-width: 380px;
    width: 100% !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 20px;
  }

  .shopNumber {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #666;
    margin-left: 25px;
  }

  .detailTitle {
    margin-top: 0px;
    text-align: justify;
    font-size: 24px;
    color: #333;
    /*word-break: break-all;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box; !** 对象作为伸缩盒子模型显示 **!*/
    /*-webkit-box-orient: vertical; !** 设置或检索伸缩盒对象的子元素的排列方式 **!*/
    /*-webkit-line-clamp: 2; !** 显示的行数 **!*/
    /*overflow: hidden;  !** 隐藏超出的内容 **!*/
  }

  .detailDescription {
    font-size: 20px;
    margin-top: 0px;
    color: #999;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 100px;
  }

  .detailCount {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 100%;
    margin-top: 40px;
  }

  .detailCount div {
    display: flex;
    align-items: center;
  }

  .detailCount div p {
    width: 110px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1Px #999999 solid;
    border-radius: 22px;
    font-size: 20px;
    color: #666;
  }

  .detailCount div p:nth-child(1) {
    border: 1Px #f82a59 solid;
    color: #f82a59;
    margin-right: 15px;
  }

  /*.detailCount div p:nth-child(2){*/
  /*margin-right: 15px;*/
  /*}*/
  .detailCountAll {
    margin-top: 0px;
    justify-content: space-between;
  }

  .detailCountAll span {
    font-size: 20px;
    color: #666;
    line-height: 88px;
  }

  .spanCount {
    height: 40px;
    line-height: 40px;
    font-size: 28px;
  }

  .buttonSummitAssist {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 96px;
    border-radius: 0;
    font-size: 30px;
    background-color: #f82a59;
    color: #ffffff;
  }

  .footerWrap {
    width: 100%;
    right: 0;
    bottom: 0;
    position: fixed;
    background-color: #fff;
    box-sizing: border-box;
  }

  .footer {
    padding: 0px 0px 0 20px;
    border-top: 1PX #eeeeee solid;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
  }

  .footer p {
    width: 140px;
    height: 58px;
    border-radius: 29px;
    line-height: 58px;
    text-align: center;
    font-size: 24px;
    color: #666;
    border: 2px #999 solid;
    position: relative;
    margin-right: 20px;
  }

  .footer p::before {
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

  .footer p:active::before {
    opacity: 0.3;
  }

  .payPopup {
    padding: 40px 46px;
    box-sizing: border-box;
    font-size: 30px;
  }

  .payPopup div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .payPopup div img {
    width: 80px;
    margin-right: 20px;
  }

  .payPopup div:nth-child(1) {
    margin-bottom: 46px;
  }
</style>
