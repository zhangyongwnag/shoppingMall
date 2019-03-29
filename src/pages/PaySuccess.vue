<template>
  <div class="wrap">
    <img src="../assets/img/03/zhifuSuccess.png" alt="">
    <p class="successText" v-if="status">提货成功</p>
    <p class="successText" v-else>支付成功</p>
    <div class="button">
      <p @click="$router.replace({path:'/Main/Personal'})">返回主页</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        status:this.$route.query.status
      }
    },
    created(){

    }
  }
</script>
<style scoped>
.wrap{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 135px;
}
.wrap img{
  width: 70px;
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
