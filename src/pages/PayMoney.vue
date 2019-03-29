<template>
  <div class="wrap">
    <div class="content">
      <p class="payMount">充值金额</p>
      <div class="payInput">
        <span>￥</span><input type="number" v-model="mount">
      </div>
      <p class="myMount">我的余额&nbsp;<span style="color: #f82a59;margin-left: 0px;">{{balance}}</span>&nbsp;元<span @click="$router.push({path:'/OffinePayMoney'})">线下充值</span></p>
      <div class="payButton">
        <van-button round type="danger" @click="paySubmit" v-if="mount">充值</van-button>
        <van-button disabled round type="danger" @click="paySubmit" v-else>充值</van-button>
      </div>
    </div>

    <p class="payRecords" @click="$router.push({path:'/PayMoneyRecords'})">充值记录</p>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  import m from '../md5.min'
  export default {
    data() {
      return {
        mount:'',
        balance:'',
      }
    },
    watch:{

    },
    created(){
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        loadingType:'spinner',
        duration:0
      });
      this.httpCli({
        url:config.URL_WALLET_BALANCE
      })
        .then(res => {
          this.$toast.clear()
          if (res.errorCode = 100){
            this.balance	= res.data.balance
          }
        })
        .catch(err => {
          this.$toast.clear()
        })
    },
    methods:{
      paySubmit(){
        if (!this.mount){
          common.toast('请输入充值金额')
          return
        }
        this.$toast.loading({
          mask: true,
          message: '提交中...',
          loadingType:'spinner',
          duration:0
        });
        let data = {
          rechargeAmount:this.mount
        }
        this.$store.dispatch('getAmountPayOrder',data)
          .then(res => {
            this.$toast.clear()
            this.$router.push({path:'/PaymentMethods',query:{status:false}})
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
  }
.content{
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.08);
  padding: 40px 30px 70px;
  box-sizing: border-box;
}
  .payMount{
    margin: 0 0 50px 0;
    font-size: 28px;
    color: #333333;
  }
  .payInput{
    font-size: 60px;
    display: flex;
    border-bottom: 1Px #ddd solid;
    padding-bottom: 10px;
    overflow: hidden;
  }
  .payInput span{
    margin-right: 20px;
  }
  .payInput input{
    border: 0px;
  }
  .myMount{
    font-size: 24px;
    margin-top: 30px;
    color: #666;
  }
  .myMount span{
    margin-left: 40px;
    color: #398bfa;
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
  .cellDev{
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
  margin-top: 70px;
}
.payButton button{
  border: 0px;
  width: 90%;
  margin-left: 5%;
  height:80px;
  line-height: 80px;
  background: -webkit-linear-gradient(left, #f82a59 , #f86b8b); /* Safari 5.1 - 6.0 */
  background: linear-gradient(to right, #f82a59 , #f86b8b); /* 标准的语法（必须放在最后） */
  box-shadow: 0px 3px 20px 1Px #999;
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  border-radius: 40px;
  font-size: 30px;
}
  .payRecords{
    margin-bottom: 50px;
    width: 100%;
    text-align: center;
    color: #398bfa;
    font-size: 24px;
  }
</style>
