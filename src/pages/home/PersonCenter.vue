<template>
  <div v-loading="loading">
    <div class="wrap" v-if="personInfo.member && personInfo.member.memberType == '1'">
      <header>
        <div class="userInfo">
          <img class="userInfoBj" src="../../assets/img/main/person_headerBj.png" alt="">
          <div class="userInfoContent" @click="$router.push({path:'/Userinfo'})">
            <div class="anavter">
              <div class="userAnavter">
                <img :src="personInfo.member.memberAvatar" alt="" v-if="personInfo.member && personInfo.member.memberAvatar">
                <img src="../../assets/img/avatar.png" alt="" v-else>
              </div>
              <p v-if="personInfo.member">{{personInfo.member.memberNickname}}</p>
              <p v-else>蝶库会员</p>
              <img src="../../assets/img/main/prson_vip.png" alt="" class="userClass">
            </div>
            <div class="userArrow">
              <van-icon name="arrow"/>
            </div>
          </div>
          <div class="userBalance">
            <div class="orderHeader" @click="$router.push({path:'/OrderManage'})">
              <span>我的订单</span>
              <van-icon name="arrow"/>
            </div>
            <div class="orderContent">
              <div class="orderList" @click="toOrder(1)">
                <img src="../../assets/img/main/person_depayed.png" alt="">
                <span>待付款</span>
                <span class="orderListInfo" v-if="personInfo.order && personInfo.order.bePayedNum > 0">{{personInfo.order.bePayedNum < 99 || '99+'}}</span>
              </div>
              <div class="orderList" @click="toOrder(2)">
                <img src="../../assets/img/main/person_desend.png" alt="">
                <span>待发货</span>
                <span class="orderListInfo" v-if="personInfo.order && personInfo.order.beSendNum > 0">{{personInfo.order.beSendNum < 99 || '99+'}}</span>
              </div>
              <div class="orderList" @click="toOrder(3)">
                <img src="../../assets/img/main/person_deseve.png" alt="">
                <span>待收货</span>
                <span class="orderListInfo" v-if="personInfo.order && personInfo.order.beReceiveNum > 0">{{personInfo.order.beReceiveNum < 99 || '99+'}}</span>
              </div>
              <div class="orderList" @click="$router.push({path:'/AfterSaleList'})">
                <img src="../../assets/img/main/person_drawback.png" alt="">
                <span>退换货</span>
                <span class="orderListInfo" v-if="personInfo.order && personInfo.order.beAfterSalesNum > 0">{{personInfo.order.beAfterSalesNum < 99 || '99+'}}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="joinVip" @click="$router.push({path:'/BecomeHighVip'})">
        <img src="../../assets/img/main/person_becomeVip.png" alt="">
      </div>
      <section>
        <div class="toolHeader">
          我的工具
        </div>
        <div class="toolContent">
          <div class="toolList" @click="$router.push({path:'/MyCollation'})">
            <img src="../../assets/img/main/person_collection.png" alt="">
            <span>我的收藏</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/AddressList'})">
            <img src="../../assets/img/main/person_address.png" alt="">
            <span>收货地址</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/FAQ'})">
            <img src="../../assets/img/main/person_help.png" alt="">
            <span>帮助中心</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/setting'})">
            <img src="../../assets/img/main/person_set.png" alt="">
            <span>设置</span>
          </div>
        </div>
      </section>
    </div>

    <div class="wrapVip" v-if="personInfo.member && personInfo.member.memberType == '2'">
      <header>
        <div class="userInfo">
          <img class="userInfoBj" src="../../assets/img/main/person_headerBj.png" alt="">
          <div class="userInfoContent" @click="$router.push({path:'/Userinfo'})">
            <div class="anavter">
              <div class="userAnavter">
                <img :src="personInfo.member.memberAvatar" alt="" v-if="personInfo.member && personInfo.member.memberAvatar">
                <img src="../../assets/img/avatar.png" alt="" v-else>
              </div>
              <p v-if="personInfo.member">{{personInfo.member.memberNickname}}</p>
              <p v-else>蝶库会员</p>
              <img src="../../assets/img/main/person_highVip.png" alt="" class="userClass">
            </div>
            <div class="userArrow">
              <van-icon name="arrow"/>
            </div>
          </div>
          <div class="userBalance">
            <div class="userBalanceContent">
              <div class="userMountVpi" @click="$router.push({path:'/MyBalance'})">
                <span>{{personInfo.availableAmount || '0.00'}}</span>
                <span>余额</span>
              </div>
              <div class="userMountUDBVpi" @click="$router.push({path:'/NotAccountBalance'})">
                <span>{{personInfo.standbyAmount || '0.00'}}</span>
                <span>未到账余额</span>
              </div>
              <div class="userMountAllVpi" @click="$router.push({path:'/MyCoupon'})">
                <span>{{personInfo.couponNum || '0'}}</span>
                <span>优惠券</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!--<section class="sectionSpec stockVip" v-waves>-->
        <!--<div class="stockVipWrap">-->
          <!--<img src="../../assets/img/main/person_news.png" alt="">-->
          <!--<div class="stockNoiaty">-->
            <!--<div class="stockNoiatyList">-->
              <!--<div>我的推荐</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<span>查看</span>-->
      <!--</section>-->
      <section class="sectionSpec">
        <div class="orderHeader" @click="$router.push({path:'/OrderManage'})">
          <span>我的订单</span>
          <van-icon name="arrow"/>
        </div>
        <div class="orderContent">
          <div class="orderList" @click="toOrder(1)">
            <img src="../../assets/img/main/person_depayed.png" alt="">
            <span>待付款</span>
            <span class="orderListInfo" v-if="personInfo.order && personInfo.order.bePayedNum > 0">{{personInfo.order.bePayedNum < 99 ? personInfo.order.bePayedNum : '99+'}}</span>
          </div>
          <div class="orderList" @click="toOrder(2)">
            <img src="../../assets/img/main/person_desend.png" alt="">
            <span>待发货</span>
            <span class="orderListInfo" v-if="personInfo.order && personInfo.order.beSendNum > 0">{{personInfo.order.beSendNum < 99 ? personInfo.order.beSendNum : '99+'}}</span>
          </div>
          <div class="orderList" @click="toOrder(3)">
            <img src="../../assets/img/main/person_deseve.png" alt="">
            <span>待收货</span>
            <span class="orderListInfo" v-if="personInfo.order && personInfo.order.beReceiveNum > 0">{{personInfo.order.beReceiveNum < 99 ? personInfo.order.beReceiveNum : '99+'}}</span>
          </div>
          <div class="orderList" @click="$router.push({path:'/AfterSaleList'})">
            <img src="../../assets/img/main/person_drawback.png" alt="">
            <span>退换货</span>
            <span class="orderListInfo" v-if="personInfo.order && personInfo.order.beAfterSalesNum > 0">{{personInfo.order.beAfterSalesNum < 99 ? personInfo.order.beAfterSalesNum : '99+'}}</span>
          </div>
        </div>
      </section>
      <div class="inviteInfo">
        <img src="../../assets/img/main/person_inviteVip.png" alt="" @click="$router.push({path:'/InviteVipMiddlePage'})">
        <img src="../../assets/img/main/person_inviteHighVip.png" alt="" @click="$router.push({path:'/InviteHighVipMiddlePage'})">
      </div>
      <section v-if="personInfo.member.memberFuncType == '1' || personInfo.member.memberFuncType == '2'">
        <div class="toolHeader">
          导游中心
        </div>
        <div class="toolContent" :style="personInfo.member.memberFuncType == '2' ? {width:'74.3%'} : {width:'100%'}">
          <div class="toolList" @click="$router.push({path:'/DeliveryOrderMange'})">
            <img src="../../assets/img/main/person_localTeam.png" alt="">
            <span>行程管理</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/DeliveryLumpMange'})">
            <img src="../../assets/img/main/person_localSend.png" alt="">
            <span>现场发货</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/BecomeHighVip',query:{status:'up'}})" v-if="personInfo.member.memberFuncType == '1'">
            <img src="../../assets/img/main/person_becomeHighVip.png" alt="">
            <span>升级收益</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/MyInviteQRcode'})">
            <img src="../../assets/img/main/person_qrCode.png" alt="">
            <span>专属二维码</span>
          </div>
        </div>
      </section>
      <section>
        <div class="toolHeader">
          我的工具
        </div>
        <div class="toolContent">
          <div class="toolList" @click="$router.push({path:'/BankCardManage'})">
            <img src="../../assets/img/main/person_bankCardManage.png" alt="">
            <span>银行卡管理</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/MyCollation'})">
            <img src="../../assets/img/main/person_collection.png" alt="">
            <span>我的收藏</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/AddressList'})">
            <img src="../../assets/img/main/person_address.png" alt="">
            <span>收货地址</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/FAQ'})">
            <img src="../../assets/img/main/person_help.png" alt="">
            <span>帮助中心</span>
          </div>
        </div>
        <div class="toolContent next">
          <div class="toolList" @click="$router.push({path:'/setting'})">
            <img src="../../assets/img/main/person_set.png" alt="">
            <span>设置</span>
          </div>
        </div>
      </section>
      <div class="gitToast" v-if="personInfo.diamondsCoupon == '1'" @click="$router.push({path:'/CaseGift'})">
        <div>{{personInfo.diamondsCouponWarning}}</div>
        <div v-active>去兑换&nbsp;<van-icon name="arrow"/></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'

  export default {
    data () {
      return {

      }
    },
    computed: {
      ...mapState({
        'personInfo':state => state.person.personInfo,
        'loading':state => state.person.loading,
      })
    },
    created () {
      this._getPersonCenterData()
    },
    methods:{
      toOrder(id){
        this.$router.push({path:'/OrderManage'})
        sessionStorage.setItem('activeTab',id)
      },
      _getPersonCenterData(){
        this.$store.dispatch('getPersonInfo')
      }
    }
  }
</script>
<style scoped>
  .wrap {
    width: 100%;
    margin-bottom: 290px;
    background-color: #ffffff;
  }

  header {

  }

  .userInfo {
    position: relative;
  }

  .userInfoBj {
    height: 315px;
    width: 100%;
  }

  .userInfoContent {
    position: absolute;
    left: 20px;
    right: 20px;
    top: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .userAnavter img {
    max-width: 130px;
  }

  .anavter p {
    margin: 0 20px 0 38px;
    font-size: 36px;
    color: #fff;
  }

  .userClass {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95px;
    /*margin-top: 6px;*/
  }

  .userClass img {
    width: 95px;
  }

  .userArrow {
    font-size: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .userBalance {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 20px;
    top: 240px;
    width: calc(100% - 44px);
    padding: 30px;
    box-sizing: border-box;
  }

  .joinVip {
    margin: 150px 0 0px 0;
    padding: 30px 30px 0 30px;
    box-sizing: border-box;
  }
  .joinVip img{
    width: 100%;
  }

  /*.userBalance::before{*/
  /*content: " ";*/
  /*position: absolute;*/
  /*top: 50%;*/
  /*left: 50%;*/
  /*opacity: 0;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*border: inherit;*/
  /*border-color: #000;*/
  /*background-color: #000;*/
  /*border-radius: inherit;*/
  /*-webkit-transform: translate(-50%, -50%);*/
  /*transform: translate(-50%, -50%);*/
  /*}*/
  /*.userBalance:active::before {*/
  /*opacity: 0.3;*/
  /*}*/
  .userBalanceContent {
    width: 100%;
    display: flex;
  }

  .userMount {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1Px #c8c9cc solid;
  }

  .userMount span:nth-child(1) {
    font-size: 36px;
    color: #F2180C;
    display: block;
  }

  .userMount span:nth-child(2) {
    font-size: 28px;
    color: #333333;
    margin-top: 15px;
    display: block;
  }

  .userCoupon {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .userCoupon span:nth-child(1) {
    font-size: 36px;
    color: #F2180C;
    display: block;
  }

  .userCoupon span:nth-child(2) {
    font-size: 28px;
    color: #333333;
    margin-top: 15px;
    display: block;
  }

  section {
    width: calc(100% - 44px);
    margin: 30px auto 0;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 24px;
    padding: 30px;
    box-sizing: border-box;
  }

  .sectionSpec {
    margin-top: 100px;
  }

  .orderHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    font-weight: bold;
    font-size: 30px;
  }

  .orderHeader i {
    color: #999999 !important;
  }

  .orderContent {
    margin-top: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 39px;
    box-sizing: border-box;
  }

  .orderList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .orderList img {
    width: 48px;
  }

  .orderList span {
    margin-top: 20px;
    font-size: 24px;
    color: #333;
  }

  .orderListInfo {
    position: absolute;
    top: -30px;
    right: 0px;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #F2180C;
    color: #fff !important;
    border-radius: 50%;
    font-size: 17px !important;
    padding: 3px;
  }

  .toolHeader {
    display: flex;
    align-content: center;
    justify-content: flex-start;
    font-weight: bold;
    font-size: 30px;
  }

  .toolContent {
    width: 100%;
    margin-top: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
  }

  .next {
    margin-top: 50px;
  }

  .toolList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 120px;
    height: 95px;
  }

  .toolList img {
    width: 48px;
  }

  .toolList span {
    font-size: 24px;
    color: #666;
    margin-top: 20px;
    white-space: nowrap;
  }
</style>
<style scoped>
  .wrapVip {
    width: 100%;
    margin-bottom: 220px;
    background-color: #ffffff;
  }

  .userMountVpi {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1Px #c8c9cc solid;
  }

  .userMountVpi span:nth-child(1) {
    font-size: 36px;
    color: #F2180C;
    display: block;
  }

  .userMountVpi span:nth-child(2) {
    font-size: 28px;
    color: #333333;
    margin-top: 15px;
    display: block;
  }

  .userMountUDBVpi {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1Px #c8c9cc solid;
  }

  .userMountUDBVpi span:nth-child(1) {
    font-size: 36px;
    color: #F2180C;
    display: block;
  }

  .userMountUDBVpi span:nth-child(2) {
    font-size: 28px;
    color: #333333;
    margin-top: 15px;
    display: block;
  }

  .userMountAllVpi {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .userMountAllVpi span:nth-child(1) {
    font-size: 36px;
    color: #F2180C;
    display: block;
  }

  .userMountAllVpi span:nth-child(2) {
    font-size: 28px;
    color: #333333;
    margin-top: 15px;
    display: block;
  }

  .stockVip {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stockVipWrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 24px;
  }

  .stockVip span {
    font-size: 22px;
    color: rgb(153, 153, 153);
  }

  .stockVip img {
    width: 25px;
    margin-right: 35px;
  }

  .stockNoiaty {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .stockNoiatyList {
    font-size: 24px;
    color: #FF5A5F;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .stockNoiatyList:nth-child(1) {
    margin-top: 0px;
  }

  .inviteInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0;
    margin-top: 28px;
  }

  .inviteInfo img {
    width: 360px;
  }

  .inviteInfo img:nth-child(1) {
    margin-right: -14px;
  }
  .gitToast{
    position: fixed;
    left: 0;
    bottom:100px;
    z-index: 2;
    background-color: rgba(0,0,0,0.45);
    width: 100%;
    height:110px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .gitToast div:nth-child(1){
    font-size: 26px;
    color: #ffffff;
  }
  .gitToast div:nth-child(1) span{
    color: #d3d3d3;
    font-size: 24px;
  }
  .gitToast div:nth-child(2){
    font-size: 24px;
    padding: 10px 18px 10px 20px;
    background-color: #ffffff;
    color: #666;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .gitToast div:nth-child(2) i{
    color: #000 !important;
    font-size: 18px;
  }
</style>
