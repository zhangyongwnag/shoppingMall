<template>
  <div style="background-color: #F3f3f3;height: 100vh;">
    <div class="wrap">
      <div class="info">
        <p>付款金额</p>
        <p>￥{{orderInfo.totalActualAmount || '0.00'}}</p>
        <div class="payInfo">
          <div class="payInfoPayee">
            <span>收款方</span>
            <span>杭州蝶库贸易有限公司</span>
          </div>
          <div class="payInfoPayee">
            <span>订单编号</span>
            <span>{{orderInfo.orderNo || '暂无'}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="payButton">
      <van-button v-waves round type="danger" @click="next">下一步</van-button>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'

  export default {
    data () {
      return {}
    },
    watch: {},
    computed: {},
    created () {
      this.orderInfo = this.$route.query.orderInfo
    },
    mounted () {

    },
    methods: {
      next(){
        this.$router.replace({path:'/CaseGift',query:{status:'new'}})
      }
    }
  }
</script>
<style scoped>
  .wrap {
    padding: 0px 30px 30px;
    background-color: #fff;
  }

  .info {
    padding-top: 20px;
  }

  .info p:nth-child(1) {
    font-size: 28px;
    text-align: center;
    color: #333333;
  }

  .info p:nth-child(2) {
    margin-top: -10px;
    font-size: 50px;
    color: #F2180C;
    text-align: center;
  }

  .bankInfo {
    padding: 20px 50px 0 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .bankIcon {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .bankIcon img {
    width: 40px;
    margin-right: 10px;
  }

  .bankInfoButton {
    padding: 5px 10px;
    font-size: 24px;
    border: 1PX #398bfa solid;
    color: #398bfa;
  }

  .payInfo {
    padding-top: 20px;
  }

  .payInfoPayee {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    color: #999999;
  }

  .van-cell {
    padding: 20px 0;
  }

  .van-cell__value {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .van-hairline--top-bottom::after {
    border-bottom: 1Px #ddd solid;
  }

  .PayMoneyCell {
    padding-right: 30px;
    margin-top: 20px;
  }

  .cellDev {
    padding: 0 0px 0 30px;
    display: flex;
    align-items: center;
  }

  .cellDev img {
    margin-right: 30px;
    width: 40px;
  }

  .cellDev span {
    font-size: 28px;
    color: #666;
  }

  .payButton {
    width: 100%;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    margin-top: 70px;
  }

  .payButton button {
    border: 0px;
    width: 80%;
    margin-left: 10%;
    height: 80px;
    line-height: 80px;
    background: -webkit-linear-gradient(left, #F2180C, #ff291c); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to right, #F2180C, #ff291c); /* 标准的语法（必须放在最后） */
    box-shadow: 0px 3px 20px 1PX #999;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    border-radius: 10px;
    font-size: 30px;
  }

  .payRecords {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    color: #398bfa;
    font-size: 24px;
  }

  .paySafe {
    display: flex;
    justify-content: center;
    align-content: center;
    color: #69b7fe;
    margin-top: 50px;
  }

  .paySafe img {
    margin-right: 10px;
    height: 30px;
  }
</style>
