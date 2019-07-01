<template>
  <div class="wrap">
    <div class="successTitle">
      <img src="../../assets/img/order/order_paySuccess.png" alt="">订单支付成功
    </div>
    <div class="successInfo">
      <div class="successInfoTitle">支付信息</div>
      <div class="successInfoContent">
        <div>付款金额：<span style="color: #F2180C;">￥{{200}}</span></div>
        <div>订单编号：123123123</div>
        <div>支付方式：微信支付</div>
      </div>
    </div>
    <div class="footer">
      <van-button v-waves round @click="$router.push({path:'/OrderManage'})">完成</van-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data () {
      return {}
    }
  }
</script>
<style scoped>
.wrap{
  min-height: 100vh;
  background-color: #f3f2f1;
  color: rgb(51,51,51);
}
  .successTitle{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    box-sizing: border-box;
    font-size: 28px;
  }
.successTitle img{
  width: 36px;
  margin-right: 10px;
}
  .successInfo{
    width:95%;
    margin: 0 auto;
    border-radius: 15px;
    background-color: #fff;
    font-size: 28px;
    padding: 0 30px;
    box-sizing: border-box;
  }
  .successInfo .successInfoTitle{
    padding: 32px 0;
    box-sizing: border-box;
    border-bottom: 1PX #eee solid;
  }
  .successInfo .successInfoContent{
    padding: 18px 0 36px 0;
  }
.successInfo .successInfoContent div{
  margin-top: 20px;
}
.footer{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  margin: 0 auto;
  margin-top: 80px;
}
.footer button {
  width: 100%;
  border-radius: 51px;
  background-color: #F2180C;
  font-size: 30px;
  color: rgb(248,248,248);
}
</style>
