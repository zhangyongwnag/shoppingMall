<template>
  <div class="wrap">
    <div class="contentWrap">
      <div class="contentTop">
        <van-icon @click="showPopup = true" name="info-o"/>
        <div>认证导游身份</div>
        <div>立即升级钻石会员</div>
      </div>
      <img src="../../assets/img/user/user_upload_middle.png" alt="">
      <div class="contentMiddle">
        <div class="inputWrap">
          <input maxlength="11" v-model="phone" type="tel" placeholder="请输入手机号" class="van-field__control">
        </div>
        <div class="inputWrap">
          <input maxlength="4" v-model="sms" type="tel" placeholder="请输入验证码" class="van-field__control">
          <van-button v-if="!disabledStatus" type="default" @click="getCode">{{scanMsg}}</van-button>
          <van-button type="default" v-else>{{scanMsg}}</van-button>
        </div>
        <van-button type="primary" class="submit" v-waves @click="submit">资格认证</van-button>
        <div class="footer">
          <img src="../../assets/img/user/checkTrue.png" alt="" v-if="checkStatus" @click="checkStatus = !checkStatus">
          <img src="../../assets/img/user/checkFalse.png" alt="" v-else @click="checkStatus = !checkStatus">
          <span @click="checkStatus = !checkStatus" style="color: rgb(195,195,195);text-decoration: none">注册代表您已同意<span @click.stop="$router.push({path:'/SLA'})">蝶库服务协议</span></span>
        </div>
      </div>
    </div>

    <van-popup v-model="showPopup" :overlay="true" style="background-color: transparent;width: 74%">
      <div class="popupWrap">
        <div class="info">
          <van-icon @click="showPopup = false" name="close" />
          <p>认证导游身份的好处：</p>
          <div>1、升级钻石会员并拥有属于自己的店铺；</div>
          <div>2、与平台合作优化车购商品；</div>
          <div>3、在团期间，获得丰厚的车购利润；</div>
          <div>4、分享商品售卖可赚到利润；</div>
          <div>5、自己购买商品可节省成本；</div>
          <p>提示：</p>
          <div>非付费钻石会员，您的“蝶库VIP会员”10天内在蝶库购物，您可获得利润；</div>
          <div>付费钻石会员，您的“蝶库VIP会员”购物商品，您都享有利润。</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data () {
      return {
        phone:'',
        sms:'',
        disabledStatus:false,
        scanMsg:'获取验证码',
        checkStatus:true,
        showPopup:false
      }
    },
    created(){

    },
    methods:{
      getCode(){
        if (!common.isphone(this.phone)){
          common.toast('请输入正确的手机号')
          return
        }
        let time = 60
        let data = {
          memberPhone:this.phone
        }
        this.httpCli({
          url:config.URL_GUIDE_CERT_CODE_GET,
          data:data,
        })
          .then(res =>{
            if (res.errorCode == 100){
              this.disabledStatus = true
              this.scanMsg = `剩余${time}秒`
              let timeOver = setInterval(()=>{
                time--
                this.scanMsg = `剩余${time}秒`
                if (time == 0){
                  this.scanMsg = '获取验证码'
                  clearInterval(timeOver)
                  this.disabledStatus = false
                }
              },1000)
            }
          })
      },
      submit(){
        if (!this.checkStatus){
          common.toast('请先同意服务协议')
          return
        }
        if (!common.isphone(this.phone)){
          common.toast('请输入正确的手机号')
          return
        }
        if (!this.sms){
          common.toast('请输入验证码')
          return
        }
        this.$toast.loading({
          mask: true,
          message: '注册中...',
          loadingType:'spinner',
          duration:0
        });
        let data = {
          memberPhone:this.phone,
          code:this.sms
        }
        this.httpCli({
          url:config.URL_GUIDE_CERT_START,
          data:data
        })
          .then(res => {
            this.$toast.clear()
            if (res.errorCode == 100){
              localStorage.removeItem('TourGuideUsername')
              localStorage.removeItem('TourGuideIdcard')
              localStorage.removeItem('TourGuideTourcard')
              localStorage.removeItem('TourGuideTravelName')
              localStorage.removeItem('TourGuideMemberIdcardPicFront')
              localStorage.setItem('userInfo',JSON.stringify(res.data.member))
              this.$router.replace({path:'/TourGuideMange'})
            }
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
    height: 100vh;
    background-image: url(../../assets/img/user/user_upload_bj.png);
    background-repeat: no-repeat;
    background-size: 100%;
    overflow: hidden;
    /*display: flex;*/
    /*align-items: flex-end;*/
    /*background-color: #FFDF32;*/
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
  .contentTop{
    background-color: white;
    padding:30px 0 15px 0;
    box-sizing: border-box;
    border-radius: 0 0 3PX 3PX;
    position: relative;
  }
  .contentTop i{
    position: absolute;
    right:20px;
    top: 20px;
    font-size: 40px;
    color: #F2180C;
  }
  .contentTop div:nth-child(2){
    font-size: 40px;
    color: rgb(51,51,51);
    text-align: center;
    font-weight: bold;
  }
  .contentTop div:nth-child(3){
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
    padding: 20px 50px 0px;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: -1PX;
    border-radius:3PX 3PX 18px 18px;
  }
  .contentMiddle .inputWrap{
    border-radius: 13px;
    padding: 10px;
    border: 2px rgb(226,226,226) solid;
    margin-top: 10px;
  }
  .contentMiddle .inputWrap:nth-child(2){
    margin-top: 20px;
  }
  .contentMiddle .inputWrap input{
    padding: 15px 10px;
  }
  .contentMiddle .inputWrap input::-webkit-input-placeholder {
    color: rgb(217,217,217);
  }
  .contentMiddle .inputWrap input::placeholder {
    color: rgb(217,217,217);
  }
  .contentMiddle .inputWrap{
    display: flex;
    align-items: center;
  }
  .contentMiddle .inputWrap button{
    white-space: nowrap;
    border: 0px;
    border-left: 1Px rgb(226,226,226) solid;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    color: rgb(217,217,217);
  }
  .contentMiddle .inputWrap button:active::before{
    opacity: 0;
  }
  .contentMiddle .submit{
    width: 100%;
    margin-top: 46px;
    border-radius: 13px;
    background-color: rgb(255,223,50);
    font-weight: bold;
    font-size: 30px;
  }
  .contentMiddle .submit:active::before{
    opacity: 0;
  }
  .contentMiddle .footer{
    padding: 46px 0;
    display: flex;
    align-items: center;
    font-size: 22px;
    color: rgb(195,195,195);
  }
  .contentMiddle .footer img{
    width: 30px;
    margin-right: 16px;
  }
  .contentMiddle .footer span{
    color: rgb(153,153,153);
    text-decoration: underline;
  }
  .popupWrap{
    background-color: #ffffff;
    padding: 20px 50px 50px;
    border-radius: 15px;
  }
  .info{
    font-size: 24px;
    color: rgb(213,104,6);
    position: relative;
  }
  .info i{
    position: absolute;
    right: -25px;
    top:-25px;
    font-size: 30px;
  }
  .info p{
    margin: 35px 0 25px;
    font-size: 28px;
  }
  .info div{
    margin-top: 20px;
  }
</style>
