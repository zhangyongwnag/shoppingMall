<template>
  <div style="min-height: 100vh;background-color: #f3f3f3">
    <div class="content">
      <div class="wrap">
        <div class="address" v-if="calculateList.addressRequired == '1'"
             @click="$router.push({path:'/AddressList',query:{status:true}})" v-waves>
          <div class="addressContent" v-if="!address.addressId">
            <img src="../../assets/img/order/order_addressPosition.png" alt="">
            <div class="addressList" v-if="calculateList.address && calculateList.address.addressId">
              <span>{{calculateList.address.addressRealname}} <span>{{calculateList.address.addressMobile}}</span></span>
              <span>{{(calculateList.address.addressProvince || '') + (calculateList.address.addressCity || '') + (calculateList.address.addressArea || '') + calculateList.address.addressDetail}}</span>
            </div>
            <div class="addressList" v-else><span style="color: #666;">添加收货地址</span></div>
          </div>
          <div class="addressContent" v-else>
            <img src="../../assets/img/order/order_addressPosition.png" alt="">
            <div class="addressList" v-if="address.addressId">
              <span>{{address.addressRealname}} <span>{{address.addressMobile}}</span></span>
              <span>{{(address.addressProvince || '') + (address.addressCity || '') + (address.addressArea || '') + address.addressDetail}}</span>
            </div>
          </div>
          <img src="../../assets/img/order/order_addressChooiseIcon.png" alt="">
        </div>
        <img src="../../assets/img/order/order_addressLine.png" alt="" class="addressPart" v-if="calculateList.addressRequired == '1'">
        <div class="noticeAssist" v-if="calculateList.orderMsg">
          {{calculateList.orderMsg}}
        </div>
      </div>
      <div class="shopListWrap">
        <div class="product" v-for="(item,index) in calculateList.goodsList">
          <div class="shopInfo" @click.stop>
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
              <p class="detailTitle">{{item.goodsTitle}}</p>
              <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
              <p class="detailDescription" v-else>{{item.goodsSubtitle}}</p>
              <div class="detailCount">
                <div>
                  <span style="color: #F2180C;">￥{{item.goodsMarketPrice}} <span v-if="item.goodsMarketProfit" style="font-size: 0.3rem">&nbsp;/&nbsp;省￥{{item.goodsTotalMarketProfit}}</span></span>
                </div>
                x{{item.goodsNum}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-cell title="运费" :value="calculateList.expressFee > 0 ? '￥' + calculateList.expressFee : '免运费'" v-waves/>
      <van-cell title="赠送" :value="'已选：' + chooiseGiftGoodsTitle.substring(0,5) + '...'" style="margin:0.2rem 0 0 0"
                v-waves v-if="calculateList.giftGoodsList && calculateList.giftGoodsList.length"
                @click="showGiftPopup = !showGiftPopup"/>
      <div v-if="showGiftPopup">
        <div class="shopListWrap" style="margin: 0;padding-bottom: 15px;margin-top: -20px;">
          <div class="productWrap">
            <div class="product" @click.stop="chooiseGift(item.goodsId,index)"
                 style="border-radius: 0px;box-shadow: 0px 0px 0px 0px #fff;"
                 v-for="(item,index) in calculateList.giftGoodsList">
              <div class="checkbox">
                <img src="../../assets/img/shop/shopping_check.png" alt="" v-if="chooiseGiftGoodsId == item.goodsId">
                <img src="../../assets/img/shop/shopping_checkNormal.png" alt="" v-else>
              </div>
              <div class="shopInfo">
                <div class="imgWrap">
                  <img :src="item.goodsThumb" alt="">
                  <div class="giftSend">
                    <span>赠</span>
                  </div>
                </div>
                <div class="shopDetail" style="max-width: 5.333rem" @click.stop="$router.push({path:'/GoodDetails',query:{goodsId
:item.goodsId}})">
                  <div class="detailTitle">{{item.goodsTitle}}</div>
                  <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
                  <div class="detailDescription" v-else>{{item.goodsSubtitle}}</div>
                  <div class="detailCount">
                    <div>
                      <span style="color: #F2180C;">￥{{item.goodsMarketPrice}}</span>
                    </div>
                    <div class="spanCount">
                      <span>x{{1}}&nbsp;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="profitAmountInfo" v-if="calculateList.profitAmount && calculateList.profitAmount != '0'"><van-icon name="info-o" />下单可省:￥{{calculateList.profitAmount}}</div>
      <p><span>共{{calculateList.totalNum}}件商品</span>&nbsp;&nbsp;合计:<span
        style="color: #F2180C;">￥{{calculateList.totalAmount}}</span></p>
      <div @click="submitPay" class="footerButton" v-active>
        在线支付
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
  <!--  <div style="height: 100vh;background-color: #f3f3f3" v-else-if="status == '2'">
      <div class="content">
        <div class="wrap">
          <div class="address" @click="$router.push({path:'/AddressList',query:{status:true,from:from}})">
            <div class="addressContent" v-if="!address.addressId">
              <img src="../../assets/img/order/order_addressPosition.png" alt="">
              <div class="addressList" v-if="deliverCalculateList.address && deliverCalculateList.address.addressId">
                <span>{{deliverCalculateList.address.addressRealname}} <span>{{deliverCalculateList.address.addressMobile}}</span></span>
                <span>{{(deliverCalculateList.address.addressProvince || '') + (deliverCalculateList.address.addressCity || '') + (deliverCalculateList.address.addressArea || '') + deliverCalculateList.address.addressDetail}}</span>
              </div>
              <div class="addressList" v-else><span style="color: #666;">添加收货地址</span></div>
            </div>
            <div class="addressContent" v-else>
              <img src="../../assets/img/order/order_addressPosition.png" alt="">
              <div class="addressList" v-if="address.addressId">
                <span>{{address.addressRealname}} <span>{{address.addressMobile}}</span></span>
                <span>{{(address.addressProvince || '') + (address.addressCity || '') + (address.addressArea || '') + address.addressDetail}}</span>
              </div>
            </div>
            <img src="../../assets/img/order/order_addressChooiseIcon.png" alt="">
          </div>
          <img src="../../assets/img/order/order_addressLine.png" alt="" class="addressPart">
        </div>
        <div class="shopListWrap">
          <div class="product" v-for="(item,index) in deliverCalculateList.goodsList">
            <div class="shopInfo" @click.stop>
              <div class="imgWrap" style="position: relative;overflow: hidden">
                <img :src="item.goodsThumb" alt="">
                <div class="giftFree" v-if="item.goodsIsGift == '1'">
                  <span>赠品</span>
                </div>
              </div>
              <div class="shopDetail">
                <p class="detailTitle">{{item.goodsTitle}}</p>
                <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
                <p class="detailDescription" v-else>{{item.goodsSubtitle}}</p>
                <div class="detailCount">
                  <div v-if="userInfo.memberType == '1'">
                    &lt;!&ndash;<span style="color: #F2180C;">￥{{item.goodsMarketPrice}}</span>&ndash;&gt;
                  </div>
                  <div v-else>
                    &lt;!&ndash;<span style="color: #F2180C;">￥{{item.goodsVipPrice}}</span>&ndash;&gt;
                  </div>
                  x{{item.goodsNum}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer" style="width: 100%">
        <div @click="submit" style="width: 100%">
          确认
        </div>
      </div>
    </div>-->
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  import * as wx from '../../utils/weixin'
  import * as m from '../../utils/md5.min'
  export default {
    data () {
      return {
        showGiftPopup: true,
        showPayPopup: false,
        userInfo:{},
        show:false,
        password:'',
        showKeyboard:true,
      }
    },
    computed: {
      ...mapState({
        'address': state => state.funding.address,
        'calculateList': state => state.calculate.calculateList,
        'chooiseGiftGoodsId': state => state.calculate.chooiseGiftGoodsId,
        'chooiseGiftGoodsTitle': state => state.calculate.chooiseGiftGoodsTitle,
        'orderInfo': state => state.calculate.orderInfo,
      })
    },
    watch: {
      password(v){
        if (v.length == '6'){
          this._payByMount(v)
        }
      }
    },
    created () {
      if (sessionStorage.getItem('showGiftPopupStatus')){
        sessionStorage.getItem('showGiftPopupStatus') === 'true' ? this.showGiftPopup = true : this.showGiftPopup = false
      }
      sessionStorage.getItem('showPayPopupStatus') === 'true' ? this.showPayPopup = true : this.showPayPopup = false
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    mounted(){

    },
    beforeRouteLeave (to, from, next) {
      if (to.name == 'ShoppingCart') {
        sessionStorage.removeItem('showGiftPopupStatus',this.showGiftPopup)
      }else {
        sessionStorage.setItem('showGiftPopupStatus',this.showGiftPopup)
      }
      if (to.name == 'SetPaypwd'){
        sessionStorage.setItem('showPayPopupStatus',this.showPayPopup)
      }else {
        sessionStorage.removeItem('showPayPopupStatus',this.showPayPopup)
      }
      next()
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
      chooiseGift (goodsId) {
        let data = {
          goodsId: goodsId
        }
        this.$store.commit('setChooiseGift', data)
      },
      submitPay () {
        if (this.calculateList.addressRequired == '1' && !this.address.addressId && !this.calculateList.address){
          common.toast('请选择收货地址')
          return
        }
        this.$toast.loading({
          mask: true,
          message: '订单生成中...',
          loadingType:'spinner',
          duration:0
        });
        this.$store.dispatch('getOrderInfoByGoodsList',this.address)
          .then(res => {
            this.$toast.clear()
            if (this.userInfo.memberType == '2' && this.orderInfo.balance != '0' && this.orderInfo.balance != '0.00'){
              this.showPayPopup = true
            }else {
              this.wxPay()
            }
          })
          .catch(err =>{
            this.$toast.clear()
          })
      },
      wxPay(){
        wx._onBridgeReady(this.orderInfo.order.orderNo)
          .then(res => {
            if (res == 'ok'){
              this.showPayPopup = false
              this.$router.replace({path:'/PaySuccess',query:{totalAmount:this.orderInfo.order.totalActualAmount,status:true,title:'支付成功'}})
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
          this.$router.push({path:'/SetPaypwd',query:{status:false,setSessionPassword:true,title:'设置支付密码'}})
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
      _payByMount(password){
        this.$toast.loading({
          mask: true,
          message: '提交中...',
          loadingType:'spinner',
          duration:0
        });
        let data = {
          orderNo:this.orderInfo.order.orderNo,
          payPasswd:m.md5(password)
        }
        this.httpCli({
          url:config.URL_PAY_BALANCE,
          data:data
        })
          .then(res => {
            this.$toast.clear()
            if (res.errorCode == 100){
              this.showPayPopup = false
              this.$router.replace({path:'/PaySuccess',query:{totalAmount:this.orderInfo.order.totalActualAmount,status:true,title:'支付成功'}})
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
    },
  }
</script>
<style scoped>
  .content {
    padding-bottom: 160px;
  }

  .wrap {
    background-color: #FFffff;
    margin-bottom: 10px;
  }

  .address {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 20px 30px;
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
    margin-right: 50px;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .addressList span span {
    font-size: 24px;
    color: #666;
    margin-left: 50px;
  }

  .addressPart {
    height: 7px;
    width: 100%;
    /*margin-top: 0px;*/
  }

  .noticeAssist {
    background-color: #fff7cc;
    color: #f56723;
    width: 100%;
    font-size: 22px;
    box-sizing: border-box;
    height: 68px;
    line-height: 68px;
    padding-left: 10px;
    letter-spacing: 2px;
  }

  .shopListWrap {
    width: 100%;
    box-sizing: border-box;
    margin: -18px 0 15px 0;
  }

  .product {
    width: 100%;
    border: 1Px #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    padding: 40px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top: 15px;
    background-color: #fff;
  }

  .product:nth-child(1) {
    margin-top: 15px;
  }

  .checkbox {
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .checkbox img {
    width: 36px;
    height: 36px;
  }

  .shopInfo {
    width: 100%;
    display: flex;
    height: 200px;
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
    position: relative;
    overflow: hidden;
  }

  .imgWrap img {
    width: 100%;
  }

  .imgWrap img {
    width: 100%;
  }

  .shopDetail {
    max-width: 460px;
    width: 100% !important;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .detailTitle {
    margin-top: 10px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 24px;
    color: #333;
  }

  .detailDescription {
    font-size: 20px;
    margin-top: -20px;
    color: #999;
    text-align: justify;
  }

  .detailCount {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
    font-size: 28px;
  }

  .profitAmountInfo{
    width: 100%;
    height:60px;
    position: fixed;
    bottom: 100px;
    background-color: #fff7cc;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #f56723;
    padding-left: 20px;
    box-sizing: border-box;
    font-size: 20px;
  }
  .profitAmountInfo i{
    margin-right: 10px;
    font-size: 24px !important;
  }

  .footer {
    height: 100px;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer p {
    margin-left: 20px;
    font-size: 30px;
  }

  .footer p span {
    font-size: 28px;
  }

  .footer .footerButton {
    height: 100%;
    background-color: #F2180C;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    font-size: 30px;
    color: #fff;
    position: relative;
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
