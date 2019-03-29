<template>
  <div>
    <div class="wrap" v-if="personlInfo.member && personlInfo.member.memberType == '1'">
      <header>
        <div class="userInfo">
          <keep-alive>
            <img class="userInfoBj" src="https://timgsa.oss-cn-beijing.aliyuncs.com/micro/mallwxchat/personBJ.png" alt="">
          </keep-alive>
          <div class="userInfoContent" @click="$router.push({path:'/Userinfo'})" v-if="personlInfo.member">
            <div class="anavter">
              <div class="userAnavter">
                <img :src="personlInfo.member.memberAvatar" alt="">
              </div>
              <p>{{personlInfo.member.memberName}}</p>
            </div>
            <div class="userArrow">
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="userBalance">
            <div class="userBalanceContent">
              <div class="userMount">
                <span>{{personlInfo.availableAmount ? personlInfo.availableAmount : '0.00'}}</span>
                <span>余额</span>
              </div>
              <div class="userCoupon" @click="$router.push({path:'/CouponList'})">
                <span>{{personlInfo.couponNum ? personlInfo.couponNum : '0'}}</span>
                <span>优惠券</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section class="sectionSpec">
        <div class="orderHeader" @click="$router.push({path:'/AllOrders',query:{status:'all'}})">
          <span>我的订单</span>
          <van-icon name="arrow"/>
        </div>
        <div class="orderContent">
          <div class="orderList" @click="$router.push({path:'/AllOrders',query:{activeStatus:1}})">
            <img src="../assets/img/05/dfk.png" alt="">
            <span>待付款</span>
            <span class="orderListInfo" v-if="personlInfo.orderOrdinaryTip && personlInfo.orderOrdinaryTip.bePayedNum != '0'">{{personlInfo.orderOrdinaryTip.bePayedNum > 99 ? '99+' : personlInfo.orderOrdinaryTip.bePayedNum}}</span>
          </div>
          <div class="orderList" @click="$router.push({path:'/AllOrders',query:{activeStatus:2}})">
            <img src="../assets/img/05/dfh.png" alt="">
            <span>待发货</span>
            <span class="orderListInfo" v-if="personlInfo.orderOrdinaryTip && personlInfo.orderOrdinaryTip.beSendNum != '0'">{{personlInfo.orderOrdinaryTip.beSendNum > 99 ? '99+' : personlInfo.orderOrdinaryTip.beSendNum}}</span>
          </div>
          <div class="orderList" @click="$router.push({path:'/AllOrders',query:{activeStatus:3}})">
            <img src="../assets/img/05/dsh.png" alt="">
            <span>待收货</span>
            <span class="orderListInfo" v-if="personlInfo.orderOrdinaryTip && personlInfo.orderOrdinaryTip.beReceiveNum != '0'">{{personlInfo.orderOrdinaryTip.beReceiveNum > 99 ? '99+' : personlInfo.orderOrdinaryTip.beReceiveNum}}</span>
          </div>
          <div class="orderList" @click="$router.push({path:'/AftersaleList'})">
            <img src="../assets/img/05/dpj.png" alt="">
            <span>退换货</span>
            <span class="orderListInfo" v-if="personlInfo.orderOrdinaryTip && personlInfo.orderOrdinaryTip.beAfterSalesNum != '0'">{{personlInfo.orderOrdinaryTip.beAfterSalesNum > 99 ? '99+' : personlInfo.orderOrdinaryTip.beAfterSalesNum}}</span>
          </div>
        </div>
      </section>
      <section>
        <div class="toolHeader">
          我的工具
        </div>
        <div class="toolContent">
          <div class="toolList" @click="$router.push({path:'/MyCollection'})">
            <img src="../assets/img/05/scFalse.png" alt="">
            <span>我的收藏</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/AddressList',query:{from:''}})">
            <img src="../assets/img/05/shdz.png" alt="">
            <span>收货地址</span>
          </div>
          <!--<div class="toolList" @click="$router.push({path:'/CommentList'})">-->
            <!--<img src="../assets/img/05/qbpj.png" alt="">-->
            <!--<span>我的评价</span>-->
          <!--</div>-->
          <div class="toolList" @click="$router.push({path:'/PayMoney'})">
            <img src="../assets/img/05/chongzhi.png" alt="">
            <span>余额充值</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/WithdrawMoney'})">
            <img src="../assets/img/05/tx.png" alt="">
            <span>余额提现</span>
          </div>
        </div>
        <div class="toolContent next" style="width: 47.5%">
          <div class="toolList" @click="$router.push({path:'/BankCardManage',query:{status:'1'}})">
            <img src="../assets/img/05/yhkgl.png" alt="">
            <span>银行卡管理</span>
          </div>
          <!--<div class="toolList">-->
            <!--<img src="../assets/img/05/yjfk.png" alt="">-->
            <!--<span>意见反馈</span>-->
          <!--</div>-->
          <!--<div class="toolList">-->
            <!--<img src="../assets/img/05/help.png" alt="">-->
            <!--<span>帮助中心</span>-->
          <!--</div>-->
          <div class="toolList" @click="$router.push({path:'/Setinfo'})">
            <img src="../assets/img/05/shezhi2.png" alt="">
            <span>设置</span>
          </div>
        </div>
      </section>
    </div>

    <div class="wrapVip" v-else-if="personlInfo.member && personlInfo.member.memberType == '2'">
      <header>
        <div class="userInfo">
          <keep-alive>
            <img class="userInfoBj" src="https://timgsa.oss-cn-beijing.aliyuncs.com/micro/mallwxchat/personBJ.png" alt="">
          </keep-alive>
          <div class="userInfoContent" @click="$router.push({path:'/Userinfo'})" v-if="personlInfo.member">
            <div class="anavter">
              <div class="userAnavter">
                <img :src="personlInfo.member.memberAvatar" alt="">
              </div>
              <p>{{personlInfo.member.memberName ? personlInfo.member.memberName : '用户名'}}</p>
              <!--<div v-if="personlInfo.member.memberLevelCode == '0'">-->
                <!--<span>{{personlInfo.member.memberLevelName}}</span>-->
              <!--</div>-->
              <div v-if="personlInfo.member.memberLevelCode == '1'">
                <img src="../assets/img/05/VIP1.png" alt="" class="userClass">
              </div>
              <div v-if="personlInfo.member.memberLevelCode == '2'">
                <img src="../assets/img/05/VIP2.png" alt="" class="userClass">
              </div>
              <div v-if="personlInfo.member.memberLevelCode == '3'">
                <img src="../assets/img/05/VIP3.png" alt="" class="userClass">
              </div>
              <div v-if="personlInfo.member.memberLevelCode == '4'">
                <img src="../assets/img/05/VIP4.png" alt="" class="userClass">
              </div>
              <div v-if="personlInfo.member.memberLevelCode == '5'">
                <img src="../assets/img/05/VIP5.png" alt="" class="userClass">
              </div>
            </div>
            <div class="userArrow">
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="userBalance">
            <div class="userBalanceContent">
              <div class="userMountVpi">
                <span>{{personlInfo.availableAmount ? personlInfo.availableAmount : '0.00'}}</span>
                <span>余额</span>
              </div>
              <div class="userMountUDBVpi">
                <span>{{personlInfo.UDBAmount ? personlInfo.UDBAmount : '0.00'}}</span>
                <span>MGF余额</span>
              </div>
              <div class="userMountAllVpi">
                <span>{{personlInfo.totalAmount ? personlInfo.totalAmount : '0.00'}}</span>
                <span>总资产</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section class="sectionSpec stockVip" @click="$router.push({path:'/ServiceInfo'})">
        <img src="../assets/img/05/tz.png" alt="">
        <div class="stockNoiaty" v-if="personlInfo.msgList">
          <div class="stockNoiatyList" v-for="(item,index) in personlInfo.msgList">
            <span>{{item.msgTitle}}</span>
            <span>{{item.msgSendTime}}</span>
          </div>
        </div>
      </section>
      <section>
        <div class="toolHeader">
          订单管理
        </div>
        <div class="toolContent" style="width: 71%">
          <div class="toolList" @click="$router.push({path:'/AllOrders',query:{status:'to'}})">
            <img src="../assets/img/05/jhdd.png" alt="">
            <span>进货订单</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/DeliveryOrders'})">
            <img src="../assets/img/05/thdd.png" alt="">
            <span>提货订单</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/JuniorOrders'})">
            <img src="../assets/img/05/xjdd.png" alt="">
            <span>下级订单</span>
          </div>
        </div>
      </section>
      <section>
        <div class="toolHeader">
          仓库管理
        </div>
        <div class="toolContent" style="width: 48%">
          <div class="toolList" @click="$router.push({path:'/MyStorage'})">
            <img src="../assets/img/05/wdck.png" alt="">
            <span>我的仓库</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/ToRestoking'})">
            <img src="../assets/img/05/wyjh.png" alt="">
            <span>我要进货</span>
          </div>
        </div>
      </section>
      <section>
        <div class="toolHeader">
          推荐管理
        </div>
        <div class="toolContent">
          <div class="toolList" @click="$router.push({path:'/UpgradeManage'})">
            <img src="../assets/img/05/wysj.png" alt="">
            <span>我要升级</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/DirectUsers'})">
            <img src="../assets/img/05/ztyh.png" alt="">
            <span>直推经销商</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/AssistRegister'})">
            <img src="../assets/img/05/zchy.png" alt="">
            <span>注册经销商</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/MyPoster'})">
            <img src="../assets/img/05/wdhb.png" alt="">
            <span>我的海报</span>
          </div>
        </div>
      </section>
      <section>
        <div class="toolHeader">
          我的系列
        </div>
        <div class="toolContent" style="width: 73%">
          <!--<div class="toolList" @click="$router.push({path:'/CommentList'})">-->
            <!--<img src="../assets/img/05/qbpj.png" alt="">-->
            <!--<span>全部评价</span>-->
          <!--</div>-->
          <div class="toolList" @click="$router.push({path:'/CouponList'})">
            <img src="../assets/img/05/yhj.png" alt="">
            <span>我的优惠券</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/MyCollection'})">
            <img src="../assets/img/05/scFalse.png" alt="">
            <span>我的收藏</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/AddressList',query:{from:''}})">
            <img src="../assets/img/05/shdz.png" alt="">
            <span>收货地址</span>
          </div>
        </div>
      </section>
      <section>
        <div class="toolHeader">
          财务管理
        </div>
        <div class="toolContent">
          <div class="toolList" @click="$router.push({path:'/WithdrawMoney'})">
            <img src="../assets/img/05/tx.png" alt="">
            <span>余额提现</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/PayMoney'})">
            <img src="../assets/img/05/chongzhi.png" alt="">
            <span>余额充值</span>
          </div>
          <div class="toolList"  @click="$router.push({path:'/BankCardManage',query:{status:'1'}})">
            <img src="../assets/img/05/yhkgl.png" alt="">
            <span>银行卡管理</span>
          </div>
          <div class="toolList" @click="$router.push({path:'/PriceDetails'})">
            <img src="../assets/img/05/jjmx.png" alt="">
            <span>奖金明细</span>
          </div>
        </div>
        <div class="toolContent next" style="width: 25%" @click="$router.push({path:'/SupportList'})">
          <div class="toolList toolListSpec">
            <img src="../assets/img/05/fcj.png" alt="">
            <span>扶持金</span>
          </div>
        </div>
      </section>
      <section>
        <div class="toolHeader">
          其他
        </div>
        <div class="toolContent" style="width: 75%">
          <!--<div class="toolList">-->
            <!--<img src="../assets/img/05/yjfk.png" alt="">-->
            <!--<span>意见反馈</span>-->
          <!--</div>-->
          <!--<div class="toolList">-->
            <!--<img src="../assets/img/05/help.png" alt="">-->
            <!--<span>帮助中心</span>-->
          <!--</div>-->
          <div class="toolList" @click="$router.push({path:'/Setinfo'})">
            <img src="../assets/img/05/shezhi2.png" alt="">
            <span>设置</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  export default {
    data() {
      return {
        personlInfo:{}
      }
    },
    computed:{
      ...mapState({
        'userInfo':state => state.userInfo
      })
    },
    created(){
      if (localStorage.getItem('personal')){
        let localStorageData = JSON.parse(localStorage.getItem('personal'))
        this.personlInfo = localStorageData
      }
      this.httpCli({
        url:config.URL_MEMBER_CENTER
      })
        .then(res => {
          if (res.errorCode == 100){
            this.personlInfo = res.data
            if (this.personlInfo.msgList){
              this.personlInfo.msgList.map(item => item.msgSendTime = common.date(item.msgSendTime*1000))
            }
            localStorage.setItem('personal',JSON.stringify(res.data))
          }
        })
    }
  }
</script>
<style scoped>
.wrap{
  width: 100%;
  margin-bottom: 190px;
}
  header{

  }
  .userInfo{
    position: relative;
  }
  .userInfoBj{
    height:315px;
    width: 100%;
  }
  .userInfoContent{
    position: absolute;
    left: 20px;
    right: 20px;
    top:60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
.userAnavter img{
  width: 130px;
}
  .anavter p{
    margin: 0 20px 0 30px;
    font-size: 36px;
    color: #fff;
  }
  .userClass{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65px;
  }
  .userClass img{
    width: 65px;
  }
  .userArrow{
    font-size: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .userBalance{
    padding: 32px 0 24px 0;
    background-color: #fff;
    width: calc(100% - 40px);
    border-radius: 10px;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
    position: absolute;
    left:20px;
    top:240px;
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
  .userBalanceContent{
    width: 100%;
    display: flex;
  }
  .userMount{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1Px #c8c9cc solid;
  }
.userMount span:nth-child(1){
  font-size: 36px;
  color: #f82a59;
  display: block;
}
.userMount span:nth-child(2){
  font-size: 28px;
  color: #333333;
  margin-top: 15px;
  display: block;
}
  .userCoupon{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
.userCoupon span:nth-child(1){
  font-size: 36px;
  color: #f82a59;
  display: block;
}
.userCoupon span:nth-child(2){
  font-size: 28px;
  color: #333333;
  margin-top: 15px;
  display: block;
}

section{
  width: calc(100% - 44px);
  margin: 30px auto 0;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 24px;
  padding: 30px;
  box-sizing: border-box;
}
  .sectionSpec{
    margin-top: 90px;
  }
  .orderHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28px;
    color: #333;
  }
  .orderContent{
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .orderList{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
.orderList img{
  width: 50px;
}
.orderList span{
  margin-top: 20px;
  font-size: 24px;
  color: #333;
}
  .orderListInfo{
    position: absolute;
    top:-30px;
    right: 0px;
    min-width: 20px;
    height:20px;
    line-height: 20px;
    text-align: center;
    background-color: #f82a59;
    color: #fff !important;
    border-radius: 50%;
    font-size: 17px !important;
    padding: 3px;
  }
  .toolHeader{
    display: flex;
    align-content: center;
    justify-content: flex-start;
  }
  .toolContent{
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .next{
    margin-top: 50px;
  }
  .toolList{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 120px;
    height:95px;
  }
.toolList img{
  width: 45px;
}
.toolList span{
  font-size: 24px;
  color: #666;
  margin-top: 20px;
  white-space: nowrap;
 }
</style>
<style scoped>
  .wrapVip{
    width: 100%;
    margin-bottom: 120px;
  }
  .userMountVpi{
    width: 33.3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1Px #c8c9cc solid;
  }
  .userMountVpi span:nth-child(1){
    font-size: 36px;
    color: #f82a59;
    display: block;
  }
  .userMountVpi span:nth-child(2){
    font-size: 28px;
    color: #333333;
    margin-top: 15px;
    display: block;
  }
  .userMountUDBVpi{
    width: 33.3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1Px #c8c9cc solid;
  }
  .userMountUDBVpi span:nth-child(1){
    font-size: 36px;
    color: #f82a59;
    display: block;
  }
  .userMountUDBVpi span:nth-child(2){
    font-size: 28px;
    color: #333333;
    margin-top: 15px;
    display: block;
  }
  .userMountAllVpi{
    width: 33.3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .userMountAllVpi span:nth-child(1){
    font-size: 36px;
    color: #f82a59;
    display: block;
  }
  .userMountAllVpi span:nth-child(2){
    font-size: 28px;
    color: #333333;
    margin-top: 15px;
    display: block;
  }
  .stockVip{
    display: flex;
    align-items: center;
  }
  .stockVip img{
    width: 35px;
    height:40px;
    margin-right: 40px;
  }
  .stockNoiaty{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .stockNoiatyList{
    font-size: 24px;
    color: #666;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .stockNoiatyList:nth-child(1){
    margin-top: 0px;
  }
</style>
