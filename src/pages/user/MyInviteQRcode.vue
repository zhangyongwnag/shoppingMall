<template>
  <div class="wrap">
    <div class="contentWrap">
      <div class="contentTop">
        <div>扫码可直接进入商城</div>
      </div>
      <img src="../../assets/img/user/user_upload_middle.png" alt="">
      <div class="contentMiddle">
        <img :src="qrcode" alt="">
      </div>
    </div>
    <div class="contentWrapText">当您提交行程申请后，游客扫码再次进入商城，也可购买行程期间的现场自提商品</div>
  </div>
</template>
<script>
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  export default {
    data() {
      return {
        loading:false,
        qrcode:''
      }
    },
    created(){
      this._getData()
    },
    activated(){
      if (!this.QRcode){
        this._getData()
      }
    },
    methods:{
      _getData(){
        this.loading = true
        this.httpCli({
          url:config.URL_GUIDE_QRCODE_GET
        })
          .then(res => {
            this.loading = false
            if (res.errorCode == 100){
              this.qrcode = res.data.guideQrcode
            }
          })
          .catch(err => {
            this.loading = false
          })
      }
    },
  }
</script>
<style scoped>
  .wrap{
    height: 100vh;
    background-image: url(../../assets/img/user/user_tour_qrcode.png);
    background-repeat: no-repeat;
    background-size: 100%;
    overflow: hidden;
    /*display: flex;*/
    /*align-items: flex-end;*/
    background-color: #FFDF32;
  }
  .contentWrap{
    width: 73%;
    background-color: rgba(0,0,0,0);
    margin: 0 auto;
    border-radius: 18px 18px 0 0;
    overflow: hidden;
    padding-bottom: 80px;
    margin-top: 270px;
    font-size: 0;
  }
  .contentWrapText{
    width: 73%;
    margin: -65px auto 0 auto;
    padding-left: 15px;
    box-sizing: border-box;
    /*color: #F2180C;*/
    color: #fff;
    font-size: 23px;
  }
  .contentTop{
    background-color: white;
    padding:30px 0 15px 0;
    box-sizing: border-box;
    border-radius: 0 0 3PX 3PX;
    position: relative;
  }
  .contentTop div:nth-child(1){
    font-size: 40px;
    color: rgb(51,51,51);
    text-align: center;
    font-weight: bold;
  }
  .contentTop div:nth-child(2){
    font-size: 28px;
    color: rgb(51,51,51);
    text-align: center;
    margin-top: 15px;
  }
  .contentWrap img{
    width: 100%;
    margin-top: -1Px;
  }
  .contentMiddle{
    background-color: white;
    padding: 20px 50px 30px;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: -1PX;
    border-radius:3PX 3PX 18px 18px;
  }
  .contentMiddle img{
    width: 100%;
  }
</style>
