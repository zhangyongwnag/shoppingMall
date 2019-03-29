<template>
  <div class="page">
    <div class="wrap">
      <div class="phone" @click="clickFocus">
        <div class="phoneHeader">
          <img src="../assets/img/01/phone.png" alt="">
          <span>手机</span>
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
            />
          </van-cell-group>
        </div>
      </div>
      <div class="validate" @click="clickFocusOther">
        <div class="validateHeader">
          <img src="../assets/img/01/password.png" alt="">
          <span>验证码</span>
        </div>
        <div>
          <van-cell-group>
            <van-field
              type="tel"
              clearable
              placeholder="输入验证码"
              v-model.trim="validate"
              maxLength="4"
              ref="val"
            >
              <van-button v-if="!disabledStatus" slot="button" size="small" type="primary" class="button" @click="sendCode">{{scanMsg}}</van-button>
              <van-button v-else slot="button" size="small" type="primary" class="buttonCodeStatus">{{scanMsg}}</van-button>
            </van-field>
          </van-cell-group>
        </div>
      </div>
      <p class="loginBysms" >
        <span @click="$router.push({path:'/Login',query:{phone:phone ? phone : ''}})">账号密码登录</span>
      </p>
      <div class="login">
        <van-button round type="danger" class="login" @click="loginByCode">{{loadingText}}</van-button>
      </div>
    </div>

    <p class="text">
      登录即表示同意 <span @click="$router.push({path:'/SLA'})">《芭莎贝雅协议》</span>
    </p>
  </div>
</template>
<script>
  import * as common from '../common'
  import * as config from '../config'
  export default {
    data() {
      return {
        phone:this.$route.query.phone || '',
        validate:'',
        disabledStatus:false,
        scanMsg:'获取验证码',
        loadingText:'验证并登录',
      }
    },
    created(){
      if (localStorage.getItem('userInfo')){
        localStorage.removeItem('userInfo')
      }
    },
    methods:{
      sendCode(){
        if (!common.isphone(this.phone)){
          common.toast('请输入正确的手机号')
          return
        }
        let time = 60
        let data = {
          memberPhone:this.phone
        }
        this.httpCli({
          url:config.URL_GET_LOGIN_CODE,
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
      clickFocus(){
        this.$refs.tel.focus()
      },
      clickFocusOther(){
        this.$refs.val.focus()
      },
      loginByCode(){
        if (!common.isphone(this.phone)){
          common.toast('请输入正确的手机号')
          return
        }
        if (!this.validate){
          common.toast('请输入验证码')
          return
        }
        this.loadingText = '登录中...'
        let data = {
          memberPhone:this.phone,
          code:this.validate
        }
        this.httpCli({
          url:config.URL_GET_LOGIN_BY_PHONE,
          data:data
        })
          .then(res => {
            setTimeout(()=>{
              if (res.errorCode == 100){
                localStorage.setItem('userInfo',JSON.stringify(res.data.member))
                if (res.data.member.memberPayPasswordStatus == '0'){
                  this.$router.push({path:'/SetPaypwd'})
                }else {
                  this.$router.replace({path:'/Main/Home'})
                }
              }else {
                this.loadingText = '验证并登录'
              }
            },1000)
          })
          .catch(err => {
            setTimeout(()=>{
              this.loadingText = '验证并登录'
            },1000)
          })
      },
    }
  }
</script>
<style scoped>
  .page{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }
  .wrap{
    width: 80%;
    margin: 0 auto;
    padding: 40px;
  }
  .phone{

  }
  .phoneHeader{
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .phoneHeader img{
    width: 7%;
  }
  .phoneHeader span{
    margin-left: 20px;
    font-size: 24x;
    color: #333;
  }
  .phoneContent{

  }
  .van-cell-group{
    margin-left: -25px;
  }
  .van-hairline--top-bottom::after{
    border-top: 0px;
  }
  .validate{
    margin-top: 50px;
  }
  .validateHeader{
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .validateHeader img{
    width: 7%;
  }
  .validateHeader span{
    margin-left: 20px;
    font-size: 24x;
    color: #333;
  }
  .button{
    padding: 0 30px;
    font-size: 24px;
    color: #ffffff;
    border-radius: 30px;
    background: -webkit-linear-gradient(left, #f82a59 , #f86b8b); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to right, #f82a59 , #f86b8b); /* 标准的语法（必须放在最后） */
  }
  .buttonCodeStatus{
    padding: 0 30px;
    font-size: 24px;
    color: #999;
    border-radius: 30px;
    border: 1PX #dddddd solid;
    background-color: #ffffff;
  }
  .loginBysms{
    font-size: 24px;
    color: #398bfa;
    margin-left: 8px;
    display: flex;
    justify-content: space-between;
  }
  .login{
    width: 100%;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    margin-top: 30px;
  }
  .login button{
    border: 0px;
    width: 75%;
    margin-left: 12.5%;
    height:80px;
    line-height: 80px;
    background: -webkit-linear-gradient(left, #f82a59 , #f86b8b); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to right, #f82a59 , #f86b8b); /* 标准的语法（必须放在最后） */
    box-shadow: 0px 3px 20px 1PX #999;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    border-radius: 40px;
    font-size: 30px;
  }
  .text{
    width: 100%;
    margin-bottom: 50px;
    text-align: center;
    font-size: 24px;
    color: #666;
  }
  .text span{
    color: #f82a59;

  }
</style>
