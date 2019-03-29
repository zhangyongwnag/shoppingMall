<template>
  <div style="background-color: #f3f3f3;min-height: 100vh">
    <div class="wrap">
      <div class="general" v-if="userInfo.memberLogonPasswordStatus  == '1'">
        <span>原密码</span>
        <van-cell-group class="groupAssist">
          <van-field
            :type="type"
            clearable
            placeholder="填写原密码"
            v-model.trim="oldPassword"
          >
            <van-icon v-if="type == 'password'" @click="changeStatusOpen" name="eye-o" slot="right-icon" />
            <van-icon v-else @click="changeStatusClose" name="closed-eye" slot="right-icon" />
          </van-field>
        </van-cell-group>
    </div>
      <div class="general">
        <span>新密码</span>
        <van-cell-group class="groupAssist">
          <van-field
            :type="type"
            clearable
            placeholder="填写新密码"
            v-model.trim="newPassword"
          >
            <van-icon v-if="type == 'password'" @click="changeStatusOpen" name="eye-o" slot="right-icon" />
            <van-icon v-else @click="changeStatusClose" name="closed-eye" slot="right-icon" />
          </van-field>
        </van-cell-group>
    </div>
      <div class="general">
        <span>确认密码</span>
        <van-cell-group class="groupAssist">
          <van-field
            :type="type"
            clearable
            placeholder="再次填写确认"
            v-model.trim="newPasswordPwd"
          >
            <van-icon v-if="type == 'password'" @click="changeStatusOpen" name="eye-o" slot="right-icon" />
            <van-icon v-else @click="changeStatusClose" name="closed-eye" slot="right-icon" />
          </van-field>
        </van-cell-group>
    </div>
    </div>

    <!--<p class="text">-->
      <!--密码必须是8-16位数字、字母组合（不能是纯数字） <span @click="$router.replace({path:'/ForgotPassword'})">忘记原密码？</span>-->
    <!--</p>-->

    <div class="register">
      <van-button round type="danger" class="login" @click="submit" >{{userInfo.memberLogonPasswordStatus  == '1' ? '修改密码' : '设置密码'}}</van-button>
    </div>
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
        oldPassword:'',
        newPassword:'',
        newPasswordPwd:'',
        type:'password',
      }
    },
    computed:{
      ...mapState({
        'userInfo':state => state.userInfo
      })
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
      submit(){
        if (this.userInfo.memberLogonPasswordStatus  == '1' && !this.oldPassword){
          common.toast('请输入旧密码')
          return
        }
        if (!this.newPassword || !this.newPasswordPwd){
          common.toast('请输入新密码')
          return
        }
        if (this.newPassword != this.newPasswordPwd){
          common.toast('俩次密码输入不一致')
          return
        }
        let data = {
          oriPasswd:m.md5(this.oldPassword),
          firstPasswd:m.md5(this.newPassword),
          secondPasswd:m.md5(this.newPasswordPwd)
        }
        this.httpCli({
          url:config.URL_SET_LOGIN_PASSWORD,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              this.userInfo.memberLogonPasswordStatus  == '1' ? this.$toast.success('修改成功') : this.$toast.success('设置成功')
              let memberLogonPasswordStatus = '1'
              this.$store.dispatch('fixCommitUserInfo',memberLogonPasswordStatus)
              this.$router.back()
            }
          })
      }
    }
  }
</script>
<style scoped>
  .register{
    width: 100%;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    margin-top: 50px;
  }
  .register button{
    border: 0px;
    width: 70%;
    margin-left: 15%;
    /*background: -webkit-linear-gradient(left top, #67c8b7 , #3577cd); !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(bottom right, #67c8b7, #3577cd); !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(bottom right, #67c8b7, #3577cd); !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(to bottom right, #67c8b7 , #3577cd); !* 标准的语法（必须放在最后） *!*/
    background-color: #f82a59;
    box-shadow: 0px 4px 15px 1px #999;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  }
  /*.register button span:nth-child(1){*/
    /*margin:-5px 0 0 -30px;*/
  /*}*/
  .text{
    margin-top: 30px;
    text-align: center;
    white-space: nowrap;
    color: #999;
  }
  .text span{
    color: dodgerblue;
  }
  .wrap{
    width: 100%;
  }
  .general{
    height:100px;
    padding-left: 20px;
    box-sizing: border-box;
    border: 1px #eee solid;
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #666;
    background-color: #ffffff;
  }
  .spctil{
    height: 650px;
    align-items: flex-start;
    padding-top: 20px;
  }
  .general span{
    width: 90px;
    white-space: nowrap;
  }
  .groupAssist{
    /*height:85%;*/
    margin-left: 100px;
    overflow: hidden;
  }
  .van-hairline--top-bottom::after{
    border:0px;
  }
</style>
