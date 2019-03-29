<template>
  <div v-if="status == '1'">
    <div class="wrap">
      <header v-if="orderDetails.order">
        <p>{{orderDetails.order.orderStatusDesc}}</p>
        <p v-if="orderDetails.order.payKeepTime">还剩 {{day + hour + minute + second}} 取消订单</p>
      </header>
      <div class="address">
        <div class="addressContent">
          <img src="../assets/img/03/shouhuoPosition.png" alt="">
          <div class="addressList" v-if="orderDetails.address">
            <span>{{orderDetails.address.addressRealname}} <span>{{orderDetails.address.addressMobile}}</span></span>
            <span>{{(orderDetails.address.addressProvince || '') + (orderDetails.address.addressCity || '') + (orderDetails.address.addressArea || '') + orderDetails.address.addressDetail}}</span>
          </div>
          <!--<div class="addressList"><span style="color: #666;">添加收货地址</span></div>-->
        </div>
      </div>
      <img src="../assets/img/03/adressFenge.png" alt="" class="addressPart">
      <div class="shopListWrap" style="padding-bottom: 0px;">
        <div class="product" v-if="orderDetails.order">
          <div class="productStatus">{{orderDetails.order.orderStatusDesc}}</div>
          <div class="shopInfo" @click.stop v-for="(item,index) in orderDetails.goodsList">
            <div class="imgWrap">
              <img :src="item.goodsThumb" alt="">
            </div>
            <div class="shopDetail">
              <p class="detailTitle">{{item.goodsTitle.substring(0,25) + '...'}}</p>
              <p class="detailDescription">{{item.goodsSubtitle}}</p>
            </div>
            <div class="shopNumber">x{{item.goodsNum}}</div>
          </div>
          <div class="shopPrice">
            <div>
              <span>商品总价</span>
              <span>￥{{orderDetails.order.payActualAmount}}</span>
            </div>
            <div>
              <span>运费(快递)</span>
              <span>￥{{orderDetails.order.expressFee}}</span>
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
          <p>订单编号：{{orderDetails.order.orderNo}}<ClipboardText :text="orderDetails.order.orderNo"></ClipboardText></p>
          <p>下单时间：{{orderDetails.order.orderCreateTime}}</p>
          <p v-if="orderDetails.order.payTime">付款时间：{{orderDetails.order.payTime}}</p>
          <p v-if="orderDetails.order.expressSendTime">发货时间：{{orderDetails.order.expressSendTime}}</p>
          <p v-if="orderDetails.order.expressReceiveTime">收货时间：{{orderDetails.order.expressReceiveTime}}</p>
          <p v-if="orderDetails.order.payType">支付方式：{{orderDetails.order.payType}}</p>
        </div>
      </div>
    </div>

    <div class="footerWrap">
      <div class="footer" v-if="orderDetails.order">
          <p style="color: #f82a59;border-color: #f82a59" v-if="orderDetails.order.btnPayEnable == '1'" @click="payOrder(orderDetails.order.orderNo)">支付订单</p>
          <p @click="giveupOrder(orderDetails.order.orderId)" v-if="orderDetails.order.btnCancelEnable == '1'">取消订单</p>
          <p v-if="orderDetails.order.btnExpressEnable == '1'" @click="logistic(orderDetails.order.expressType,orderDetails.order.orderId,orderDetails.order.expressSn)">查看物流</p>
          <p @click="confirm(orderDetails.order.orderId)" style="color: #f82a59;border-color: #f82a59" v-if="orderDetails.order.btnConfirmEnable == '1'">确认收货</p>
      </div>
    </div>
  </div>
  <div v-else-if="status == '2'">
    <div class="wrap">
      <header v-if="orderDetails.order">
        <p>{{orderDetails.order.orderStatusDesc}}</p>
        <p v-if="orderDetails.order.payKeepTime">还剩 {{day + hour + minute + second}} 取消订单</p>
      </header>
      <div class="address">
        <div class="addressContent">
          <img src="../assets/img/03/shouhuoPosition.png" alt="">
          <div class="addressList" v-if="orderDetails.address">
            <span>{{orderDetails.address.addressRealname}} <span>{{orderDetails.address.addressMobile}}</span></span>
            <span>{{(orderDetails.address.addressProvince || '') + (orderDetails.address.addressCity || '') + (orderDetails.address.addressArea || '') + orderDetails.address.addressDetail}}</span>
          </div>
          <!--<div class="addressList"><span style="color: #666;">添加收货地址</span></div>-->
        </div>
      </div>
      <img src="../assets/img/03/adressFenge.png" alt="" class="addressPart">
      <div class="shopListWrap" style="padding-bottom: 0px;">
        <div class="product" v-if="orderDetails.order">
          <div class="productStatus">{{orderDetails.order.orderStatusDesc}}</div>
          <div class="shopInfo" @click.stop v-for="(item,index) in orderDetails.goodsList">
            <div class="imgWrap">
              <img :src="item.goodsThumb" alt="">
            </div>
            <div class="shopDetail">
              <p class="detailTitle">{{item.goodsTitle.substring(0,25) + '...'}}</p>
              <p class="detailDescription">{{item.goodsSubtitle}}</p>
            </div>
            <div class="shopNumber">x{{item.goodsNum}}</div>
          </div>
        </div>
      </div>
      <div class="shopListWrap">
        <div class="product" v-if="orderDetails.order">
          <p>订单编号：{{orderDetails.order.orderNo}}<ClipboardText :text="orderDetails.order.orderNo"></ClipboardText></p>
          <p>下单时间：{{orderDetails.order.orderCreateTime}}</p>
          <!--<p v-if="orderDetails.order.payTime">付款时间：{{orderDetails.order.payTime}}</p>-->
          <!--<p v-if="orderDetails.order.expressSendTime">发货时间：{{orderDetails.order.expressSendTime}}</p>-->
          <!--<p v-if="orderDetails.order.expressReceiveTime">收货时间：{{orderDetails.order.expressReceiveTime}}</p>-->
          <!--<p v-if="orderDetails.order.payType">支付方式：{{orderDetails.order.payType}}</p>-->
        </div>
      </div>
    </div>

    <div class="footerWrap">
      <div class="footer" v-if="orderDetails.order">
        <p style="color: #f82a59;border-color: #f82a59" v-if="orderDetails.order.btnPayEnable == '1'">去支付</p>
        <p v-if="orderDetails.order.btnCancelEnable == '1'">取消订单</p>
        <p v-if="orderDetails.order.btnExpressEnable == '1'" @click="logistic(orderDetails.order.expressType,orderDetails.order.orderId,orderDetails.order.expressSn)">查看物流</p>
        <p @click="confirm(orderDetails.order.orderId)" style="color: #f82a59;border-color: #f82a59" v-if="orderDetails.order.btnConfirmEnable == '1'">确认收货</p>
      </div>
    </div>
  </div>
  <div v-else-if="status == '3'">
    <div class="wrap">
      <header v-if="orderDetails.order">
        <p>{{orderDetails.order.orderStatusDesc}}</p>
        <p v-if="orderDetails.order.orderKeepTime">还剩 {{day + hour + minute + second}} 确认收货</p>
      </header>
      <div class="address">
        <div class="addressContent">
          <div class="addressList" v-if="orderDetails.sub">
            <div class="anavter">
              <div class="userAnavter">
                <img :src="orderDetails.sub.memberAvatar" alt="" class="userAnavterImg">
              </div>
              <div class="userSubInfo">
                <div class="userClass">
                  {{orderDetails.sub.memberName}}&emsp;
                  {{orderDetails.sub.memberPhone}}
                  <div v-if="orderDetails.sub.memberLevelCode == '1'">
                    <img src="../assets/img/05/VIP1.png" alt="" class="classImg">
                  </div>
                  <div v-if="orderDetails.sub.memberLevelCode == '2'">
                    <img src="../assets/img/05/VIP2.png" alt="" class="classImg">
                  </div>
                  <div v-if="orderDetails.sub.memberLevelCode == '3'">
                    <img src="../assets/img/05/VIP3.png" alt="" class="classImg">
                  </div>
                  <div v-if="orderDetails.sub.memberLevelCode == '4'">
                    <img src="../assets/img/05/VIP4.png" alt="" class="classImg">
                  </div>
                  <div v-if="orderDetails.sub.memberLevelCode == '5'">
                    <img src="../assets/img/05/VIP5.png" alt="" class="classImg">
                  </div>
                </div>
                <p style="color: #000;" class="userAddress">
                  {{orderDetails.sub.memberProvince + orderDetails.sub.memberCity + orderDetails.sub.memberArea}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="../assets/img/03/adressFenge.png" alt="" class="addressPart">
      <div class="shopListWrap" style="padding-bottom: 0px;">
        <div class="product" v-if="orderDetails.order">
          <div class="productStatus">{{orderDetails.order.orderStatusDesc}}</div>
          <div class="shopInfo" @click.stop v-for="(item,index) in orderDetails.goodsList">
            <div class="imgWrap">
              <img :src="item.goodsThumb" alt="">
            </div>
            <div class="shopDetail">
              <p class="detailTitle">{{item.goodsTitle.substring(0,25) + '...'}}</p>
              <p class="detailDescription">{{item.goodsSubtitle}}</p>
            </div>
            <div class="shopNumber">x{{item.goodsNum}}</div>
          </div>
          <div class="shopPrice">
            <div style="height: 0px;margin-top: 0px;">
              <!--<span>商品总价</span>-->
              <!--<span>￥{{orderDetails.order.payActualAmount}}</span>-->
            </div>
            <div style="height: 0px;margin-top: 0px;">
              <!--<span>运费(快递)</span>-->
              <!--<span>￥{{orderDetails.order.expressFee}}</span>-->
            </div>
            <div style="height: 0px;margin-top: 0px;">
              <!--<span>优惠券</span>-->
              <!--<span>-￥{{0.00}}</span>-->
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
          <p>订单编号：{{orderDetails.order.orderNo}}<ClipboardText :text="orderDetails.order.orderNo"></ClipboardText></p>
          <p>下单时间：{{orderDetails.order.orderCreateTime}}</p>
          <p v-if="orderDetails.order.payTime">付款时间：{{orderDetails.order.payTime}}</p>
          <p v-if="orderDetails.order.expressSendTime">发货时间：{{orderDetails.order.expressSendTime}}</p>
          <p v-if="orderDetails.order.expressReceiveTime">收货时间：{{orderDetails.order.expressReceiveTime}}</p>
          <p v-if="orderDetails.order.payType">支付方式：{{orderDetails.order.payType}}</p>
        </div>
      </div>
    </div>

    <div class="footerWrap">
      <div class="footer" v-if="orderDetails.order">
        <p style="color: #f82a59;border-color: #f82a59" v-if="orderDetails.order.btnPayEnable == '1'">去支付</p>
        <p v-if="orderDetails.order.btnCancelEnable == '1'">取消订单</p>
        <p v-if="orderDetails.order.btnExpressEnable == '1'" @click="logistic(orderDetails.order.expressType,orderDetails.order.orderId,orderDetails.order.expressSn)">查看物流</p>
        <p style="color: #f82a59;border-color: #f82a59" v-if="orderDetails.order.btnConfirmEnable == '1'">确认收货</p>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState,mapGetters} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  import ClipboardText from '../components/ClipboardText.vue'
  export default {
    data() {
      return {
        loading:false,
        day:'',
        hour:'',
        minute:'',
        second:'',
        status:'1'
      }
    },
    computed:{
      ...mapState({
        'orderDetails':state => state.details.orderDetails
      })
    },
    created(){
      this.status = this.$route.query.status
      switch (this.$route.query.status){
        case '1':
          this.$store.dispatch('getOrderDetails',this.$route.query.orderId)
            .then(res => {
              if (res.order && res.order.payKeepTime){
                var val = res.order.payKeepTime
                var m = 60;
                var h = 60 * 60;
                var day = 60 * 60 * 24;
                let timeOver = setInterval(() => {
                  val --
                  var lday = parseInt(val/day)
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
                  if (val == '0'){
                    this.$router.back()
                    clearInterval(timeOver)
                  }
                },1000)
              }
            })
            .catch(err => {

            })
          break;
        case '2':
          this.$store.dispatch('getDeliveryOrderDetails',this.$route.query.orderId)
            .then(res => {
            })
            .catch(err => {

            })
          break;
        case '3':
          this.$store.dispatch('getSubOrderDetails',this.$route.query.orderId)
            .then(res => {
              if (res.order && res.order.orderKeepTime){
                var val = res.order.orderKeepTime
                var m = 60;
                var h = 60 * 60;
                var day = 60 * 60 * 24;
                let timeOver = setInterval(() => {
                  val --
                  var lday = parseInt(val/day)
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
                  if (val == '0'){
                    this.$router.back()
                    clearInterval(timeOver)
                  }
                },1000)
              }
            })
            .catch(err => {

            })
          break;
      }

    },
    methods:{
      payOrder(orderNo){
        this.$toast.loading({
          mask: true,
          message: '结算中...',
          loadingType:'spinner',
          duration:0
        });
        this.$store.dispatch('getOrderInfoByOrderId',orderNo)
          .then(res => {
            this.$toast.clear()
            this.$router.push({path:'/PaymentMethods',query:{status:true}})
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      giveupOrder(orderId){
        this.$dialog.confirm({
          title: '提示',
          message: '确定要取消订单吗？'
        }).then(() => {          this.$store.dispatch('getOrderDetails',this.$route.query.orderId)
          .then(res => {
            if (res.order && res.order.payKeepTime){
              var val = res.order.payKeepTime
              var m = 60;
              var h = 60 * 60;
              var day = 60 * 60 * 24;
              let timeOver = setInterval(() => {
                val --
                var lday = parseInt(val/day)
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
                if (val == '0'){
                  this.$router.back()
                  clearInterval(timeOver)
                }
              },1000)
            }
          })
          .catch(err => {

          })
          let data = {
            orderId:orderId
          }
          this.httpCli({
            url:config.URL_ORDER_CANCEL,
            data:data
          })
            .then(res => {
              if (res.errorCode == 100){
                this.$router.back()
              }
            })
        }).catch(() => {

        });
      },
      logistic(expressType,orderId,expressSn){
        expressType == '2' ? this.$router.push({path:'/LogisticsList',query:{orderId:orderId}}) : this.$router.push({path:'/LogisticsInfo',query:{expressSn:expressSn}})
      },
      confirm(orderId){
        this.$dialog.confirm({
          title: '提示',
          message: '确定要确认收货吗？'
        }).then(() => {
          if (this.$route.query.status == '1'){
            let data = {
              orderId:orderId
            }
            this.httpCli({
              url:config.URL_ORDER_CONFIRM,
              data:data
            })
              .then(res => {
                if (res.errorCode == 100){
                  this.$store.dispatch('getOrderDetails',this.$route.query.orderId)
                }
              })
          }else {
            let data = {
              orderId:orderId
            }
            this.httpCli({
              url:config.URL_DELIVERY_CONFIRM,
              data:data
            })
              .then(res => {
                if (res.errorCode == 100){
                  this.$store.dispatch('getDeliveryOrderDetails',this.$route.query.orderId)
                }
              })
          }

        }).catch(() => {

        });
      }
    },
    components:{
      ClipboardText
    }
  }
</script>
<style scoped>
.wrap{
  padding-bottom: 80px
}
  header{
    width: 100%;
    background-image: url("../assets/img/05/personBJ.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    min-height: 170px;
  }
header p:nth-child(1){
  font-size: 28px;
  color: #fff;
  margin: 0 0 15px 108px;
  padding-top: 64px;
}
header p:nth-child(2){
  font-size: 20px;
  color: #fff;
  margin: 0 0 0px 108px;
  padding-bottom: 70px;
}
.anavter{
  display: flex;
  align-items: center;
}
.userAnavter{
  border-radius: 50%;
  width: 130px;
  height:130px;
  background-color: #FFffff;
  border: 1PX #eeeeee solid;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.userAnavter .userAnavterImg{
  width: 130px;
}
.anavter p{
  /*margin: 0 20px 0 30px;*/
  /*font-size: 36px;*/
  /*color: #fff;*/
}
.userSubInfo{
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 500px;
}
.userClass{
  margin-left: 20px;
  font-size: 30px;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.userAddress{
  font-size: 30px !important;
  color: #666;
  margin-left: 20px;
  margin-top: 6px;
}
.classImg{
  height: 22px!important;
  margin-left: 35px;
}
.address{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px 10px;
  background-color: #Fff;
}
.address img{
  width: 15px;
}
.addressContent{
  display: flex;
  align-items: center;
}
.addressContent img{
  width: 40px;
  margin-right: 50px;
}
.addressList{
  display: flex;
  flex-direction: column;
}
.addressList span{
  font-size: 30px;
  color: #333333;
  margin-right: 98px;
}
.addressList span:nth-child(2){
  display: block;
  width: 500px;
  margin-top: 20px;
  font-size: 24px;
  color: #666;
}
.addressList span span{
  font-size: 24px;
  color: #666;
  margin-left: 50px;
}
.addressPart{
  height:10px;
  width: 100%;
  margin-top: -40px;
}
.shopListWrap{
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 50px;
}
.product{
  width: 95%;
  border: 1Px #eee solid;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
  padding: 20px 20px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 2.5%;
}
.productStatus{
  padding-bottom: 20px;
  font-size: 24px;
  color: #f82a59;
}
.product:nth-child(1){
  margin-top: 30px;
}
.checkbox img {
  width: 36px;
  height:36px;
}
.shopInfo{
  width: 100%;
  display: flex;
  height:200px;
  margin-top: 30px;
}
.shopInfo:nth-child(2){
  margin-top: 0;
}
.shopPrice{
  border-top: 1Px #eeeeee solid;
  padding: 20px 0 24px;
  margin-top: 40px;
}
.shopPrice div{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 28px;
  color: #333333;
}
.shopPrice div:nth-child(4){
  margin-top: 30px;
}
.shopPrice div:nth-child(4) span:nth-child(2){
  color: #f82a59;
}
.imgWrap{
  width: 200px;
  height:200px;
  border: 1Px #ddd solid;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
}
.imgWrap img{
  height:100%;
}
.imgWrap img{
  height:100%;
}
.shopDetail{
  max-width: 380px;
  width: 100% !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
}
.shopNumber{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #666;
  margin-left: 25px;
}
.detailTitle{
  margin-top: 0px;
  text-align: justify;
  font-size: 28px;
  color: #333;
  /*word-break: break-all;*/
  /*text-overflow: ellipsis;*/
  /*display: -webkit-box; !** 对象作为伸缩盒子模型显示 **!*/
  /*-webkit-box-orient: vertical; !** 设置或检索伸缩盒对象的子元素的排列方式 **!*/
  /*-webkit-line-clamp: 2; !** 显示的行数 **!*/
  /*overflow: hidden;  !** 隐藏超出的内容 **!*/
}
.detailDescription{
  font-size: 20px;
  margin-top:0px;
  color: #999;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height:100px;
}
.detailCount{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 100%;
  margin-top: 40px;
}
.detailCount div{
  display: flex;
  align-items: center;
}
.detailCount div p{
  width: 110px;
  height:44px;
  line-height: 44px;
  text-align: center;
  border: 1Px #999999 solid;
  border-radius: 22px;
  font-size: 20px;
  color: #666;
  position: relative;
}
.detailCount div p::before{
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
.detailCount div p:active::before {
  opacity: 0.3;
}
.detailCount div p:nth-child(1){
  border: 1Px #f82a59 solid;
  color: #f82a59;
  margin-right: 15px;
}
/*.detailCount div p:nth-child(2){*/
/*margin-right: 15px;*/
/*}*/
.detailCountAll{
  margin-top: 0px;
  justify-content: space-between;
}
.detailCountAll span{
  font-size: 20px;
  color: #666;
  line-height: 88px;
}
.spanCount{
  height:40px;
  line-height: 40px;
  font-size: 28px;
}
.buttonSummitAssist{
  position: fixed;
  bottom: 0;
  left:0;
  width: 100%;
  height:96px;
  border-radius: 0;
  font-size: 30px;
  background-color: #f82a59;
  color: #ffffff;
}

.footerWrap{
  width: 100%;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: #fff;
  box-sizing: border-box;
}

  .footer{
    padding: 0px 0px 0 20px;
    border-top: 1PX #eeeeee solid;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
  }
.footer p{
  width: 140px;
  height:58px;
  border-radius: 29px;
  line-height: 58px;
  text-align: center;
  font-size: 24px;
  color: #666;
  border: 2px #999 solid;
  position: relative;
  margin-right: 20px;
}
.footer p::before{
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
</style>
