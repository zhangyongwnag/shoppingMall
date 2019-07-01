<template>
  <div class="wrapChangeOrder">
    <img src="../../assets/img/finance/finance_order_change_success.png" alt="" class="changeOrder">
    <p class="changeOrderText">{{!status ? '您已换购成功' : '您已支付成功'}}</p>
    <p class="changeOrderMount">￥{{$route.query.totalAmount}}</p>
    <p class="changeOrderDescription">仓库正在为您备货中</p>
    <div class="changeOrderButton">
      <p @click="finish">返回主页</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        status:''
      }
    },
    created(){
      this.status = this.$route.query.status
    },
    beforeRouteEnter(to, from, next) {
      to.meta.title = to.query.title
      next()
    },
    methods:{
      finish(){
        this.$router.replace({path:'/Main/PersonCenter'})
      }
    }
  }
</script>
<style scoped>
.wrap{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
}
.wrapChangeOrder{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
}
.wrapChangeOrder .changeOrder{
  width: 300px;
}
.changeOrderText{
  font-size: 34px;
}
.changeOrderMount{
  font-weight: bold;
  font-size: 40px;
  margin-top: -10px;
}
.changeOrderDescription{
  font-size: 26px;
  color: #999999;
  margin-top: -20px;
}
.changeOrderButton{
  display: flex;
  align-items: center;
}
.changeOrderButton p{
  width: 230px;
  height:65px;
  border-radius: 5px;
  border: 2px #999 solid;
  font-size: 24px;
  color: #333;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
}
  .successText{
    font-size: 30px;
    color: #f82a59;
    margin-top: 20px;
  }
  .button{
    display: flex;
    align-items: center;
  }
  .button p {
    width: 500px;
    height:70px;
    border-radius: 35px;
    border: 2px #999 solid;
    font-size: 28px;
    color: #999999;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
  }
.button p::before{
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
.button p:active::before {
  opacity: 0.3;
}
/*.button p:nth-child(2){*/
  /*margin-left: 70px;*/
/*}*/
</style>
