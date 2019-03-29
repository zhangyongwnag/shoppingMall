<template>
  <div>
    <van-steps :active="active" active-color="#f82a59" class="steps">
      <van-step>验证手机号</van-step>
      <van-step>设置新密码</van-step>
      <van-step>设置成功</van-step>
    </van-steps>

    <van-cell-group style="margin-top: 50px;" v-if="active == 0">
      <van-field
        type="tel"
        clearable
        placeholder="请输入手机号"
        maxLength="11"
        v-model.trim="phone"
        style="width: 96%"
      >
        <img class="iconImg" slot="left-icon" src="../assets/img/01/phone.png" alt="">
      </van-field>
      <van-field
        type="tel"
        clearable
        placeholder="请输入验证码"
        v-model.trim="validate"
        maxLength="4"
        style="margin-top: 20px;width: 96%"
      >
        <van-button v-if="!disabledStatus" slot="button" size="small" type="primary" class="button" @click="sendCode">{{scanMsg}}</van-button>
        <van-button v-else slot="button" size="small" type="primary" class="buttonCodeStatus">{{scanMsg}}</van-button>
        <img class="iconImg" slot="left-icon" src="../assets/img/01/password.png" alt="">
      </van-field>
    </van-cell-group>

    <van-cell-group v-else style="margin-top: 50px;">
      <van-field
        :type="type"
        clearable
        placeholder="请输入新密码"
        v-model.trim="newPassword"
        style="width: 96%"
      >
        <img class="iconImg" slot="left-icon" src="../assets/img/01/password.png" alt="">
        <van-icon slot="right-icon" v-if="active == 1 && type == 'password'" @click="changeStatusOpen" name="eye-o" />
        <van-icon slot="right-icon" v-else-if="active == 1 && type == 'text'" @click="changeStatusClose" name="closed-eye" />
      </van-field>
      <van-field
        :type="type"
        clearable
        placeholder="请确认新密码"
        v-model.trim="newPasswordPwd"
        style="margin-top: 20px;width: 96%"
      >
        <img class="iconImg" slot="left-icon" src="../assets/img/01/password.png" alt="">
        <van-icon slot="right-icon" v-if="active == 1 && type == 'password'" @click="changeStatusOpen" name="eye-o" />
        <van-icon slot="right-icon" v-else-if="active == 1 && type == 'text'" @click="changeStatusClose" name="closed-eye" />
      </van-field>
    </van-cell-group>

    <div class="login">
      <van-button round type="danger" class="login" @click="submit">下一步</van-button>
    </div>

  </div>
</template>
<script>
  import * as common from '../common'
  import * as config from '../config'
  import m from '../md5.min'
  export default {
    data() {
      return {
        active:0,
        phone:'',
        validate:'',
        disabledStatus:false,
        scanMsg:'发送验证码',
        newPassword:'',
        newPasswordPwd:'',
        type:'password',
        bizCode:'',
      }
    },
    created(){

    },
    watch:{

    },
    mounted(){

    },
    methods:{
      changeStatusOpen(){
        this.type = 'text'
      },
      changeStatusClose(){
        this.type = 'password'
      },
      sendCode(){
        if (!common.isphone(this.phone)){
          common.toast('请输入正确的手机号')
          return
        }
        let time = 60
        let data = {
          memberPhone:this.phone,
        }
        this.httpCli({
          url:config.URL_FORGOT_PARRWORD,
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
                  this.scanMsg = '点击获取'
                  clearInterval(timeOver)
                  this.disabledStatus = false
                }
              },1000)
            }
          })
      },
      submit(){
        switch (this.active){
          case 0:
            if (!common.isphone(this.phone)){
              common.toast('请输入正确的手机号')
              return
            }
            if (!this.validate){
              common.toast('请输入验证码')
              return
            }
            let data = {
              memberPhone:this.phone,
              code:this.validate
            }
            this.httpCli({
              url:config.URL_FORGOT_VALIDATE_CODE,
              data:data
            })
              .then(res => {
                if (res.errorCode == 100){
                  this.$toast.success('校验成功')
                  this.bizCode = res.data.bizCode
                  this.active = 1
                }
              })
            break;
          case 1:
            if (!this.newPassword || !this.newPasswordPwd){
              common.toast('请输入新密码')
              return
            }
            if (this.newPassword != this.newPasswordPwd){
              common.toast('俩次密码输入不一致')
              return
            }
            let apply = {
              memberPhone:this.phone,
              firstPasswd:m.md5(this.newPassword),
              secondPasswd:m.md5(this.newPasswordPwd),
              bizCode:this.bizCode
            }
            this.httpCli({
              url:config.URL_PASSWORD_FORGOT_RESET,
              data:apply
            })
              .then(res => {
                if (res.errorCode == 100){
                  this.active = 2
                  this.$dialog.alert({
                    message: '密码设置成功',
                    confirmButtonText:'好的'
                  }).then(() => {
                    this.$router.replace({path:'/Login',query:{phone:this.phone}})
                  });
                }
              })
            break;
        }
      }
    }
  }
</script>
<style scoped>
  .steps{
    width:80%;
    margin: 30px 0 0 9%;
  }
  .iconImg{
    width: 48px;
    margin: 0px 40px 0 0;
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
  .login{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }
  .login button{
    border: 0px;
    width: 400px;
    height:80px;
    line-height: 80px;
    background: -webkit-linear-gradient(left, #f82a59 , #f86b8b); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to right, #f82a59 , #f86b8b); /* 标准的语法（必须放在最后） */
    box-shadow: 0px 3px 20px 1PX #999;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    font-size: 30px;
  }
</style>
