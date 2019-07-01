<template>
  <div class="wrap">
    <div class="logo">
      <img src="../../assets/img/logo.png" alt="">
      <div>旅游特惠精选</div>
    </div>
    <div class="contentWrap" v-if="invitedInfo.beInviteMember && invitedInfo.beInviteMember.memberNickname">
      <div class="contentTop">
        <div class="avatarWrap">
          <img :src="invitedInfo.beInviteMember.memberAvatar" alt="" class="avatarImg" v-if="invitedInfo.beInviteMember.memberAvatar">
          <img src="../../assets/img/avatar.png" alt="" class="avatarImg" v-else>
        </div>
        <div>亲爱的{{invitedInfo.beInviteMember.memberNickname}}</div>
        <div style="color: #A8313B;">恭喜您&nbsp;!</div>
        <div>您已经是蝶库会员啦</div>
        <div class="submit">
          <van-button type="primary" v-waves @click="$router.replace({path:'/Main/Home'})">进店逛逛</van-button>
        </div>
      </div>
    </div>
    <div class="contentWrap" v-else-if="invitedInfo.inviteMember && invitedInfo.inviteMember.memberNickname">
      <div class="contentTop">
        <div class="avatarWrap">
          <img :src="invitedInfo.inviteMember.memberAvatar" alt="" class="avatarImg" v-if="invitedInfo.inviteMember.memberAvatar">
          <img src="../../assets/img/avatar.png" alt="" class="avatarImg" v-else>
        </div>
        <div>{{invitedInfo.inviteMember.memberNickname}} <br> 邀请您</div>
        <div>成为TA的蝶库VIP会员</div>
      </div>
      <img src="../../assets/img/invite/invite_middle.png" alt="">
      <div class="contentMiddle">
        <div class="inputWrap">
          <input maxlength="11" v-model="phone" type="tel" placeholder="请输入手机号" class="van-field__control">
        </div>
        <div class="inputWrap">
          <input maxlength="4" v-model="sms" type="tel" placeholder="请输入验证码" class="van-field__control">
          <van-button v-if="!disabledStatus" type="default" @click="getCode">{{scanMsg}}</van-button>
          <van-button type="default" v-else>{{scanMsg}}</van-button>
        </div>
        <div class="submit">
          <van-button type="primary" v-waves @click="submit">立即注册</van-button>
        </div>
        <div class="footer">
          <img src="../../assets/img/invite/invite_checktrue.png" alt="" v-if="checkStatus" @click="checkStatus = !checkStatus">
          <img src="../../assets/img/user/checkFalse.png" alt="" v-else @click="checkStatus = !checkStatus">
          <span @click="checkStatus = !checkStatus" style="color: rgb(195,195,195);text-decoration: none">注册代表您已同意<span @click.stop="$router.push({path:'/SLA'})">蝶库服务协议</span></span>
        </div>
      </div>
    </div>
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
        invitedInfo:{},
        wxUserInfo:{}
      }
    },
    created(){
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        loadingType:'spinner',
        duration:0
      });
      this.inviteId = this._getParam('invite')
      let data = {
        invite:this.inviteId
      }
      this.httpCli({
        url:config.URL_INVITED_VIP,
        data:data
      })
        .then(res => {
          this.$toast.clear()
          if (res.errorCode == 100){
            this.invitedInfo = res.data
          }
        })
        .catch(err => {
          this.$toast.clear()
        })
    },
    mounted(){
      common.getOpenId()
        .then(res => {
          this.wxUserInfo = res
        })
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
          url:config.URL_INVITED_VIP_CODE_GET,
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
        let data = {
          memberPhone:this.phone,
          code:this.sms,
          invite:this.inviteId,
          wechatNickName:this.wxUserInfo.nickname,
          wehcatHeadUrl:this.wxUserInfo.headimgurl,
        }
        this.httpCli({
          url:config.URL_INVITED_VIP_SUBMIT,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              this.$toast.success('注册成功')
              localStorage.setItem('userInfo',JSON.stringify(res.data.member))
              setTimeout(() => {
                this.$router.replace({path:'/Main/Home'})
              },1000)
            }
          })
          .catch(err => {

          })
      },
      _getParam (key) {
          let results = new RegExp('[\?&]' + key + '=([^&#]*)').exec(window.location.href)
          if (results) {
            return results[1]
          } else {
            return ''
          }
        }
    }
  }
</script>
<style scoped>
  .wrap{
    height: 100vh;
    background-image: url(../../assets/img/invite/invite_bj.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .logo{
    position: fixed;
    left: 51.5%;
    top:30px;
    transform: translateX(-50%);
  }
  .logo img{
    width: 190px;
  }
  .logo div{
    font-size: 28px;
    letter-spacing: 10px;
    color: #fff;
    margin:5px 0 0 -14px;
  }
  .contentWrap{
    width: 73%;
    background-color: rgba(0,0,0,0);
    margin: 0 auto;
    border-radius: 18px 18px 0 0;
    /*overflow: hidden;*/
    /*padding-bottom: 80px;*/
    margin-top: 50px;
  }
  .contentTop{
    background-color: white;
    padding:30px 0 8px 0;
    box-sizing: border-box;
    border-radius: 18px 18px 3PX 3PX;
  }
  .contentTop .avatarWrap{
    width: 130px;
    height:130px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:-100px 0 0 50%;
    transform: translateX(-50%);
  }
  .contentTop .avatarWrap .avatarImg{
    max-width: 130px;
  }
  .contentTop div:nth-child(2){
    margin-top: 5px;
    font-size: 28px;
    color: rgb(51,51,51);
    text-align: center;
    line-height:45px;
  }
  .contentTop div:nth-child(3){
    font-size: 40px;
    color: rgb(51,51,51);
    text-align: center;
    /*margin-top: 5px;*/
    font-weight: bold;
  }
  .contentTop div:nth-child(4){
    margin-top: 5px;
    font-size: 28px;
    color: rgb(51,51,51);
    text-align: center;
    line-height: 45px;
  }
  .contentTop .submit{
    width: 90%;
    margin: 32px auto 10px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1PX #666 dashed;
    padding-top: 32px;
  }
  .contentTop .submit button {
    width: 100%;
    border-radius: 13px;
    background-color: #A8313B;
    font-weight: bold;
    font-size: 30px;
  }
  .contentMiddle .submit button:active::before{
    opacity: 0;
  }
  .contentWrap img{
    width: 100%;
    margin-top: -1Px;
  }
  .contentMiddle{
    background-color: white;
    padding: 10px 50px 0px;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: -7px;
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
    margin-top: 30px;
    border-radius: 13px;
    background-color: #A8313B;
    font-weight: bold;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .contentMiddle .submit button{
    background-color: #A8313B;
  }
  .contentMiddle .submit:active::before{
    opacity: 0;
  }
  .contentMiddle .footer{
    padding: 30px 0;
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
</style>
