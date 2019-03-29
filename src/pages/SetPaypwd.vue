<template>
  <div style="padding-top: 100px;">
    <van-password-input
      v-model="password"
      info="密码为 6 位数字"
      autofocus
      @focus="showKeyboard = true"
      style="margin-top: 80px;"
      v-if="paypwdStatus"
    />
    <van-password-input
      v-model="rePassword"
      info="请再次确认密码"
      autofocus
      @focus="showKeyboard = true"
      style="margin-top: 80px;"
      v-if="!paypwdStatus"
    />
    <van-button class="buttonSet" type="danger" @click="afreshEntry" v-if="!paypwdStatus">重新输入</van-button>
    <van-button class="buttonSet next" type="danger" @click="next" v-if="!paypwdStatus" :disabled="disabledStatus">{{status ? '确认修改' : '下一步'}}</van-button>
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />


    <van-popup  v-model="show" position="bottom" style="position: relative" :overlay="true" :close-on-click-overlay="false"/>
    <van-icon v-if="show" @click="$router.back()" class="closeICon" name="cross" />
    <div class="content" v-if="show">
      <div class="cell" style="border-radius: 5px;" @click="foucsInput">
        <p>请输入<span>&nbsp;{{userInfo.memberPhone}}&nbsp;</span>收到的短信验证码</p>
        <!--<van-cell-group style="border-radius: 20px">-->
        <!--<van-field-->
        <!--type="tel"-->
        <!--v-model="validate"-->
        <!--maxLength="4"-->
        <!--center-->
        <!--clearable-->
        <!--left-icon="edit"-->
        <!--placeholder="请输入短信验证码"-->
        <!--style="border-radius: 10px"-->
        <!--autofocus-->
        <!--&gt;-->
        <!--<van-button slot="button" size="small" type="primary" class="button" @click="sendCode" :disabled="disabledStatus">{{scanMsg}}</van-button>-->
        <!--</van-field>-->
        <!--</van-cell-group>-->
        <div class="model">
          <div class="van-field__left-icon"><img src="../assets/img/01/password.png" alt=""></div>
          <div class="van-cell__value van-cell__value--alone">
            <div class="van-field__body">
              <input id="SetPaypwd" ref="input" autofocus="autofocus" v-model="validate" type="text" maxlength="4" placeholder="请输入短信验证码"  class="van-field__control">
              <van-button v-if="!disabledStatusSend" slot="button" size="small" type="primary" class="button" @click="sendCode">{{scanMsg}}</van-button>
              <van-button v-else slot="button" size="small" type="primary" class="buttonCodeStatus">{{scanMsg}}</van-button>
            <!--</div>-->
            </div>
          </div>
        </div>
      </div>
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
        show:true,
        status:false,
        paypwdStatus:true,
        password: '',
        rePassword:'',
        showKeyboard: true,
        disabledStatus:true,
        disabledStatusSend:false,
        scanMsg:'点击获取',
        validate:'',
        bizCode:'',
      };
    },
    computed:{
      ...mapState({
        'userInfo':state => state.userInfo
      })
    },
    watch:{
      paypwdStatus(v){
        if (v){
          this.showKeyboard = true
        }
      },
      password(v){
        if (v.length == 6){
          this.showKeyboard = false
          this.$toast.loading({
            mask: true,
            message: '设置中...',
            loadingType:'spinner',
            duration:0
          });
          setTimeout(()=>{
            this.$toast.clear()
            this.paypwdStatus = false
            this.showKeyboard = true
          },2000)
        }
      },
      rePassword(v){
        if (v.length == 6){
          if (v === this.password){
            this.$toast.success('密码一致');
            this.showKeyboard = false
            this.disabledStatus = false
          }else {
            this.$toast.fail('密码不一致');
            this.showKeyboard = true
          }
        }else {
          this.disabledStatus = true
        }
      },
      validate(v){
        if (v.length == '4'){
          let data = {
            code:this.validate
          }
          this.httpCli({
            url:config.URL_GET_PAY_VALIDATE_CODE,
            data:data
          })
            .then(res => {
              if (res.errorCode == 100){
                this.$toast.success('校验成功')
                this.show = false
                this.bizCode = res.data.bizCode
                this.showKeyboard = true
              }
            })
        }
      }
    },
    created(){
      this.show = this.$route.query.status
      this.status = this.show

      this.show ? this.$route.meta.title = '修改支付密码' : this.$route.meta.title = '设置支付密码'
    },
    mounted(){
      document.getElementById('SetPaypwd') ? document.getElementById('SetPaypwd').focus() : ''

//      this.show ? this.sendCode() : ''
    },
//    beforeDestory(){
//      localStorage.removeItem('token')
//    },
    methods: {
      foucsInput(){
        this.$refs.input.focus()
      },
      onInput(key) {
        this.paypwdStatus ? this.password = (this.password + key).slice(0, 6) : this.rePassword = (this.rePassword + key).slice(0, 6)
      },
      onDelete() {
        this.paypwdStatus ? this.password = this.password.slice(0, this.password.length - 1) : this.rePassword = this.rePassword.slice(0, this.rePassword.length - 1)
      },
//      changePay(){
//        this.paypwdStatus?this.$router.back():this.paypwdStatus = true
//        this.password = ''
//        this.rePassword = ''
//      },
      afreshEntry(){
        this.paypwdStatus = true
        this.password = ''
        this.rePassword = ''
      },
      next(){
        if (this.status){
          let data = {
            firstPasswd:m.md5(this.password).toLowerCase(),
            secondPasswd:m.md5(this.rePassword).toLowerCase(),
            bizCode:this.bizCode
          }
          this.httpCli({
            url:config.URL_UPDATE_PAY,
            data:data
          })
            .then(res => {
              if (res.errorCode == 100){
                common.toast('支付密码修改成功')
                setTimeout(()=>{
                  this.$router.back()
                },1000)
              }
            })
        }else {
          //支付密码提交服务端
          let data = {
            firstPasswd:m.md5(this.password).toLowerCase(),
            secondPasswd:m.md5(this.rePassword).toLowerCase()
          }
          this.$toast.loading({
            mask: true,
            message: '加载中...',
            loadingType:'spinner',
            duration:0
          });
          this.httpCli({
            url:config.URL_SET_PAY_PASSWORD,
            data:data
          })
            .then(res => {
              setTimeout(()=>{
                this.$toast.clear()
                if (res.errorCode == 100){
                  localStorage.setItem('userInfo',JSON.stringify(res.data.member))
                  this.$router.replace({path:'/Main/Home'})
                }
              },1000)
            })
            .catch(err => {
              setTimeout(()=>{
                this.$toast.clear()
              })
            })
        }
      },
      sendCode(){
        let time = 60
        let data = {

        }
        this.httpCli({
          url:config.URL_GET_PAY_CODE,
          data:data,
        })
          .then( res =>{
            if (res.errorCode == 100){
              this.disabledStatusSend = true
              this.scanMsg = `剩余${time}秒`
              let timeOver = setInterval(()=>{
                time--
                this.scanMsg = `剩余${time}秒`
                if (time == 0){
                  this.scanMsg = '获取验证码'
                  clearInterval(timeOver)
                  this.disabledStatusSend = false
                }
              },1000)
            }
          })
      },
    }
  }
</script>
<style scoped>
  .buttonSet{
    display: block;
    background-color: #ffffff;
    border: 1Px #c8c9cc solid;
    transition: all 0.5s;
    margin: 0 auto;
    margin-top: 30px;
    color: #000;
    width: 45%;
    float: left;
    border-radius: 5px 0 0 5px;
    margin-left: 5%;
  }
  .next{
    border-radius: 0 5px 5px 0;
    margin-left: 0;
    border-left: 0px;
  }
  .content{
    position: fixed;
    top:200px;
    left: 0;
    z-index: 99999999999;
    width: 100%;
  }
  .cell{
    margin: 0 auto;
    width: 80%;
    background-color: white;
  }
  .cell p{
    width: 100%;
    border-bottom: 1Px #eee solid;
    padding: 20px;
  }
  .cell p span{
    color: dodgerblue;
  }
/*  .register{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  .register button{
    border: 0px;
    width: 400px;
    background: -webkit-linear-gradient(left top, #67c8b7 , #3577cd); !* Safari 5.1 - 6.0 *!
    background: -o-linear-gradient(bottom right, #67c8b7, #3577cd); !* Opera 11.1 - 12.0 *!
    background: -moz-linear-gradient(bottom right, #67c8b7, #3577cd); !* Firefox 3.6 - 15 *!
    background: linear-gradient(to bottom right, #67c8b7 , #3577cd); !* 标准的语法（必须放在最后） *!
    box-shadow: 0px 4px 15px 1px #999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .register button span:nth-child(1){
    margin:-5px 0 0 -30px;
  }*/
  .model{
    display: flex;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    padding-top: 0;
  }
  .closeICon{
    position: absolute;
    right:40px;
    top:40px;
    z-index: 99999;
    font-size: 40px;
    color: #FFffff;
  }
  .van-field__left-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  .van-field__left-icon img{
    width: 30px;
  }
  .button{
    width: 220px;
    padding: 0 30px;
    font-size: 24px;
    color: #ffffff;
    border-radius: 30px;
    background: -webkit-linear-gradient(left, #f82a59 , #f86b8b); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to right, #f82a59 , #f86b8b); /* 标准的语法（必须放在最后） */
  }
  .buttonCodeStatus{
    width: 220px;
    padding: 0 30px;
    font-size: 24px;
    color: #999;
    border-radius: 30px;
    border: 1PX #dddddd solid;
    background-color: #ffffff;
  }
</style>
