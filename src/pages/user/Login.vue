<template>
  <div class="page">
    <div class="wrap">
      <div class="phone" @click="clickFocus">
        <div class="phoneHeader">
          <img src="../../assets/img/phone.png" alt="">
          <span>手机</span>
        </div>
        <div class="phoneContent">
          <van-cell-group>
            <van-field
              label="+86"
              type="tel"
              clearableKKKKIKKKK
              placeholder="输入手机号"
              maxLength="11"
              v-model.trim="userPhone"
              ref="tel"
            />
          </van-cell-group>
        </div>
      </div>
      <div class="validate" @click="clickFocusOther">
        <div class="validateHeader">
          <img src="../../assets/img/password.png" alt="">
          <span>密码</span>
        </div>
        <div>
          <van-cell-group>
          <van-field
            type="password"
            clearable
            placeholder="输入登录密码"
            v-model.trim="password"
            ref="val"
            @keyup.13="loginByPassword"
          >
          </van-field>
          </van-cell-group>
        </div>
      </div>
      <div class="loginBysms">
        <p @click="$router.replace({path:'/LoginQuick',query:{phone:userPhone ? userPhone : ''}})">手机号码登录</p>
        <p @click="$router.push({path:'/ForgotPassword'})">忘记密码？</p>
      </div>
      <div class="login">
        <van-button v-if="userPhone && password" v-waves round type="danger" class="normalButton" @click="loginByPassword">{{loadingText}}</van-button>
        <van-button class="disabledButton" v-else round v-waves>确认登录</van-button>
      </div>
    </div>

    <p class="text">
      登录注册表示同意 <span @click="$router.push({path:'/SLA'})">《蝶库服务协议》</span>
    </p>
  </div>
</template>
<script>
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  import m from '../../utils/md5.min'
  export default {
    data() {
      return {
        userPhone:this.$route.query.phone || '',
        password:'',
        loadingText:'确认登录',
      }
    },
    watch:{
    },
    created(){
      if (localStorage.getItem('userInfo')){
        localStorage.removeItem('userInfo')
      }
      this.userPhone = this.$route.query.phone || ''
    },
    methods:{
      clickFocus(){
        this.$refs.tel.focus()
      },
      clickFocusOther(){
        this.$refs.val.focus()
      },
      loginByPassword(){
        if (!common.isphone(this.userPhone)){
          common.toast('请输入正确的手机号')
          return
        }
        if (!this.password) {
          common.toast('请输入登录密码')
          return
        }
        this.loadingText = '登录中...'
        let data = {
          memberPhone:this.userPhone,
          memberLoginPassword:m.md5(this.password)
        }
        this.httpCli({
          url:config.URL_GET_LOGIN_BY_PASSWORD,
          data:data
        })
          .then(res => {
            setTimeout(()=>{
              if (res.errorCode == 100){
                localStorage.setItem('userInfo',JSON.stringify(res.data.member))
                this.$router.replace({path:'/Main/Home'})
              }else {
                this.loadingText = '确认登录'
              }
            },50)
          })
          .catch(err => {
            setTimeout(()=>{
              this.loadingText = '确认登录'
            },50)
          })
      }
    }
  }
</script>
<style scoped>
  .page{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    background-color: #ffffff;
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
    font-size: 24px;
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
  .loginBysms{
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    color: #398bfa;
    margin-left: 8px;
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
    border-radius: 40px;
    font-size: 30px;
  }
  .login .normalButton{
    background: -webkit-gradient(linear, left top, right top, from(rgb(255,88,76)) , to(rgb(255,41,28)));
    background: linear-gradient(to right, rgb(255,88,76) , rgb(255,41,28));
    box-shadow: 0px 5px 20px 0px rgba(255,41,28,0.2);
  }
  .login .disabledButton{
    color: rgb(153,153,153);
    background-color: rgb(221,221,221);
    box-shadow: 0px 5px 20px 0px rgba(1, 1, 1, 0.2);
  }
  .login button:active::before{
    opacity: 0;
  }
  .text{
    width: 100%;
    margin-bottom:50px;
    text-align: center;
    font-size: 24px;
    color: #666;
  }
  .text span{
    color: #f82a59;
  }
</style>
