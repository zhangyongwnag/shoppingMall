<template>
  <div class="page">
    <div class="wrap">
      <div class="phone" @click="clickFocus">
        <div class="phoneHeader">
          <img src="../../assets/img/user/user_upload_name.png" alt="">
          <span>姓名</span>
        </div>
        <div class="phoneContent">
          <van-cell-group>
            <van-field
              type="text"
              clearable
              placeholder="输入姓名"
              maxLength="6"
              v-model.trim="name"
              ref="name"
            />
          </van-cell-group>
        </div>
      </div>
      <div class="inputInfo" v-if="name">提现需要核对您的真实姓名，请确保无误。</div>
      <div class="validate" @click="clickFocusOther">
        <div class="phoneHeader">
          <img src="../../assets/img/phone.png" alt="">
          <span>手机号</span>
        </div>
        <div class="phoneContent">
          <van-cell-group>
            <van-field
              label="+86"
              type="tel"
              clearable
              placeholder="输入手机号"
              maxLength="11"
              v-model.trim="phone"
              ref="tel"
            >
              <van-button v-if="!disabledStatus" slot="button" size="small" type="primary" class="button"
                          @click="sendCode">{{scanMsg}}
              </van-button>
              <van-button v-else slot="button" size="small" type="primary" class="buttonCodeStatus">{{scanMsg}}
              </van-button>
            </van-field>
          </van-cell-group>
        </div>
      </div>
      <div class="validate">
        <div>
          <van-cell-group>
            <van-field
              type="tel"
              clearable
              placeholder="输入验证码"
              v-model.trim="validate"
              maxLength="4"
              @keyup.13="loginByCode"
            >
            </van-field>
          </van-cell-group>
        </div>
      </div>
      <div class="login">
        <van-button v-if="name && phone && validate" v-waves round type="danger" class="normalButton"
                    @click="loginByCode">{{loadingText}}
        </van-button>
        <van-button class="disabledButton" v-else round>支付988元成为钻石会员</van-button>
      </div>
    </div>

    <p class="text">
      登录注册表示同意 <span @click="$router.push({path:'/SLA'})">《蝶库服务协议》</span>
    </p>

    <div v-if="$route.query.iStoken" @click="animationVipWrapHidden" class="modelWrap" style="transform: scale(0)" id="shareWrapVip">
      <img src="../../assets/img/invite/invite_become_vipModel.png" alt="">
    </div>
    <div v-else @click="animationHighVipWrapHidden" class="modelWrap" style="transform: scale(0)" id="shareWrapHighVip">
      <img src="../../assets/img/invite/invite_become_highVipModel.png" alt="">
    </div>
  </div>
</template>
<script>
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  import * as wx from '../../utils/weixin'
  export default {
    data () {
      return {
        name: '',
        phone: '',
        validate: '',
        disabledStatus: false,
        scanMsg: '获取验证码',
        loadingText: '支付988元成为钻石会员',
        wxUserInfo:{},
        orderInfo:{},
        userInfo:{}
      }
    },
    created () {
      if (this.$route.query.iStoken){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.phone = this.userInfo.memberPhone
      }else {
        this.wxUserInfo = this.$route.query.wxUserInfo
      }
    },
    mounted(){

    },
    methods: {
      sendCode () {
        if (this.$route.query.iStoken){
          let time = 60
          this.httpCli({
            url: config.URL_UPGRADE_DIAMONDS_CODE_GET,
          })
            .then(res => {
              if (res.errorCode == 100) {
                this.disabledStatus = true
                this.scanMsg = `剩余${time}秒`
                let timeOver = setInterval(() => {
                  time--
                  this.scanMsg = `剩余${time}秒`
                  if (time == 0) {
                    this.scanMsg = '获取验证码'
                    clearInterval(timeOver)
                    this.disabledStatus = false
                  }
                }, 1000)
              }
            })
        }else {
          if (!common.isphone(this.phone)) {
            common.toast('请输入正确的手机号')
            return
          }
          let time = 60
          let data = {
            memberPhone: this.phone
          }
          this.httpCli({
            url: config.URL_INVITED_DIAMONDS_CODE_GET,
            data: data,
          })
            .then(res => {
              if (res.errorCode == 100) {
                this.disabledStatus = true
                this.scanMsg = `剩余${time}秒`
                let timeOver = setInterval(() => {
                  time--
                  this.scanMsg = `剩余${time}秒`
                  if (time == 0) {
                    this.scanMsg = '获取验证码'
                    clearInterval(timeOver)
                    this.disabledStatus = false
                  }
                }, 1000)
              }
            })
        }
      },
      clickFocus () {
        this.$refs.name.focus()
      },
      clickFocusOther () {
        this.$refs.tel.focus()
      },
      loginByCode () {
        if (!this.name) {
          common.toast('请输入姓名')
          return
        }
        if (this.$route.query.iStoken){
          if (!this.validate) {
            common.toast('请输入验证码')
            return
          }
          this.loadingText = '支付中...'
          let apply = {
            memberName:this.name,
            code: this.validate,
          }
          this.httpCli({
            url: config.URL_UPGRADE_DIAMONDS_ORDER,
            data: apply
          })
            .then(res => {
              if (res.errorCode == 100) {
                this.orderInfo = res.data.order
                wx._onBridgeReady(this.orderInfo.orderNo)
                  .then(res => {
                    if (res == 'ok'){
                      setTimeout(() => {
                        document.getElementById('shareWrapVip').style.transform = 'scale(1)'
                      },1000)
                    }else {
                      this.$toast.fail('取消支付')
                      this.loadingText = '支付988元成为钻石会员'
                    }
                  })
                  .catch(err => {
                    this.$toast.fail('支付失败')
                    this.loadingText = '支付988元成为钻石会员'
                  })
              } else {
                this.loadingText = '支付988元成为钻石会员'
              }
            })
            .catch(err => {
              this.loadingText = '支付988元成为钻石会员'
            })
        }else {
          if (!common.isphone(this.phone)) {
            common.toast('请输入正确的手机号')
            return
          }
          if (!this.validate) {
            common.toast('请输入验证码')
            return
          }
          this.loadingText = '支付中...'
          let data = {
            invite:this.$route.query.invite,
            memberName:this.name,
            memberPhone: this.phone,
            code: this.validate,
            wechatNickName:this.wxUserInfo.nickname || '',
            wehcatHeadUrl:this.wxUserInfo.headimgurl || '',
          }
          this.httpCli({
            url: config.URL_INVITED_DIAMONDS_ORDER,
            data: data
          })
            .then(res => {
              if (res.errorCode == 100) {
                this.orderInfo = res.data.order
                wx._onBridgeReady(this.orderInfo.orderNo)
                  .then(res => {
                    if (res == 'ok'){
                      setTimeout(() => {
                        document.getElementById('shareWrapHighVip').style.transform = 'scale(1)'
                      },1000)
                    }else {
                      this.$toast.fail('取消支付')
                      this.loadingText = '支付988元成为钻石会员'
                    }
                  })
                  .catch(err => {
                    this.$toast.fail('支付失败')
                    this.loadingText = '支付988元成为钻石会员'
                  })
              } else {
                this.loadingText = '支付988元成为钻石会员'
              }
            })
            .catch(err => {
              this.loadingText = '支付988元成为钻石会员'
            })
        }
      },
      animationHighVipWrapHidden(){
        localStorage.setItem('caseGifShow',true)
        this.$router.replace({path:'/LoginQuick',query:{phone:this.phone}})
      },
      animationVipWrapHidden(){
        this.$toast.loading({
          mask: true,
          message: '加载中...',
          loadingType:'spinner',
          duration:0
        });
        this.httpCli({
          url:config.URL_MEMBER_INFO
        })
          .then(res => {
            this.$toast.clear()
            if (res.errorCode == 100){
              localStorage.setItem('userInfo',JSON.stringify(Object.assign(this.userInfo,{},res.data.member)))
              this.$router.replace({path:'/CaseGift',query:{status:'new'}})
            }
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
    }
  }
</script>
<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    background-color: #fff
  }

  .wrap {
    width: 80%;
    margin: 0 auto;
    padding: 40px;
  }

  .phone {

  }

  .phoneHeader {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .phoneHeader img {
    width: 7%;
  }

  .phoneHeader span {
    margin-left: 20px;
    font-size: 24x;
    color: #333;
  }

  .phoneContent {

  }

  .inputInfo {
    margin: 5px 0 0 5px;
    font-size: 22px;
    color: rgb(153, 153, 153);
  }

  .van-cell-group {
    margin-left: -25px;
  }

  .van-hairline--top-bottom::after {
    border-top: 0px;
  }

  .validate {
    margin-top: 52px;
  }

  .validateHeader {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .validateHeader img {
    width: 7%;
  }

  .validateHeader span {
    margin-left: 20px;
    font-size: 24x;
    color: #333;
  }

  .button {
    padding: 0 30px;
    font-size: 24px;
    color: #ffffff;
    border-radius: 30px;
    background: -webkit-gradient(linear, left top, right top, from(rgb(255, 88, 76)), to(rgb(255, 41, 28)));
    background: linear-gradient(to right, rgb(255, 88, 76), rgb(255, 41, 28));
  }

  .buttonCodeStatus {
    padding: 0 30px;
    font-size: 24px;
    color: #999;
    border-radius: 30px;
    border: 1PX #dddddd solid;
    background-color: #ffffff;
  }

  .loginBysms {
    font-size: 24px;
    color: #398bfa;
    margin-left: 8px;
    display: flex;
    justify-content: space-between;
  }

  .login {
    width: 100%;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    margin-top: 200px;
  }

  .login button {
    border: 0px;
    width: 75%;
    margin-left: 12.5%;
    height: 80px;
    line-height: 80px;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    border-radius: 40px;
    font-size: 30px;
  }

  .login .normalButton {
    background: -webkit-gradient(linear, left top, right top, from(rgb(255, 88, 76)), to(rgb(255, 41, 28)));
    background: linear-gradient(to right, rgb(255, 88, 76), rgb(255, 41, 28));
    box-shadow: 0px 5px 20px 0px rgba(255, 41, 28, 0.2);
  }

  .login .disabledButton {
    color: rgb(153, 153, 153);
    background-color: rgb(221, 221, 221);
    box-shadow: 0px 5px 20px 0px rgba(1, 1, 1, 0.2);
  }

  .login button:active::before {
    opacity: 0;
  }

  .text {
    width: 100%;
    margin-bottom: 50px;
    text-align: center;
    font-size: 24px;
    color: #666;
  }

  .text span {
    color: #f82a59;

  }
  .modelWrap{
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modelWrap img{
    width: 70%;
  }
</style>
