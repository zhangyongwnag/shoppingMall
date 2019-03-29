<template>
  <div class="wrap">
    <div class="content">
      <div class="general">
        <span>充值类型</span>
        <van-cell-group class="groupAssist">
          <van-field disabled v-model="proxyNo" placeholder="请输入用户名" />
        </van-cell-group>
      </div>
      <div class="general">
        <span>充值方式</span>
        <van-cell-group class="groupAssist">
          <van-field disabled v-model="phone" placeholder="请输入手机号码" />
        </van-cell-group>
      </div>
      <div class="general">
        <span>当前余额</span>
        <van-cell-group class="groupAssist">
          <van-field disabled v-model="validate" placeholder="请输入手机号码" />
        </van-cell-group>
      </div>
      <div class="general">
        <span>充值金额</span>
        <van-cell-group class="groupAssist">
          <van-field type="tel" v-model="comunt" placeholder="￥" />
        </van-cell-group>
      </div>
      <div class="general">
        <span>填写备注</span>
        <van-cell-group class="groupAssist">
          <van-field type="text" v-model="comment" placeholder="请填写备注" />
        </van-cell-group>
      </div>
      <div class="general spctil">
        <span>上传截图</span>
        <div class="imgUploadWrap">
          <imgUpload :multiple="true" @getImgsBase64="getImgsBase64"></imgUpload>
        </div>
      </div>

      <div class="footer">
        <img src="../assets/img/03/chongzhiToast.png" alt="">
        <span v-if="!publicNum">1.点击<span class="getNumber" @click="getNumber">获取对公账号</span>2.</span>
        <span v-else>1.对公账号：<span class="getNumber" style="color: #f82a59;">{{publicNum}}</span><ClipboardText :text="publicNum"></ClipboardText>&emsp;2.</span>
      </div>
      <div class="payButton">
        <van-button round type="danger" @click="paySubmit" v-if="comunt">提交</van-button>
        <van-button disabled round type="danger" v-else>提交</van-button>
      </div>
    </div>

    <p class="payRecords" @click="$router.push({path:'/PayMoneyRecords'})">充值记录</p>

    <van-popup v-model="show" position="bottom" :overlay="true" style="width: 100%;height: 100%">
      <!-- 密码输入框 -->
      <van-password-input
        :value="password"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
        style="margin-top: 100px;"
      />

      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
        extra-key="返回"
      />
    </van-popup>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  import imgUpload from '../components/ImgUpload.vue'
  import ClipboardText from '../components/ClipboardText.vue'
  import m from '../md5.min'
  export default {
    data() {
      return {
        proxyNo:'余额',
        phone:'线下充值',
        validate:'',
        comunt:'',
        comment:'',
        base64Arr:[],
        publicNum:'',
        show:false,
        password:'',
        showKeyboard:true
      }
    },
    watch:{
      password(v){
        if (v.length == '6'){
          this.$toast.loading({
            mask: true,
            message: '提交中...',
            loadingType:'spinner',
            duration:0
          });
          let data = {
            rechargeAmount:this.comunt,
            payPasswd:m.md5(v),
            rechargeVoucher:this.base64Arr.join(","),
            rechargeRemark:this.comment,
          }
          this.httpCli({
            url:config.URL_WALLET_RECHARGE_UNDERLINE_SUBMIT,
            data:data
          })
            .then(res => {
              this.$toast.clear()
              if (res.errorCode == 100){

              }
            })
            .catch(err => {
              this.$toast.clear()
            })
        }
      }
    },
    computed:{

    },
    created(){
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        loadingType:'spinner',
        duration:0
      });
      this.httpCli({
        url:config.URL_WALLET_BALANCE
      })
        .then(res => {
          this.$toast.clear()
          if (res.errorCode = 100){
            this.validate	= '￥' + res.data.balance
          }
        })
        .catch(err => {
          this.$toast.clear()
        })
    },
    mounted(){

    },
    methods:{
      getImgsBase64(v){
        this.base64Arr = v
      },
      onInput(key) {
        if (key != '返回'){
          this.password = (this.password + key).slice(0, 6);
        }else {
          this.show = false
        }
      },
      onDelete() {
        this.password = this.password.slice(0, this.password.length - 1);
      },
      getNumber(){
        this.httpCli({
          url:config.URL_BANKCARD_PUBLIC_ACCOUT
        })
          .then(res => {
            if (res.errorCode == 100){
              this.publicNum = res.data.bankcardList[0].bankcardNo
            }
          })
      },
      paySubmit(){
        if (!this.comunt){
          common.toast('请输入充值金额')
          return
        }
        if (!this.base64Arr.length){
          common.toast('请上传充值凭证')
          return
        }
        this.$toast.loading({
          mask: true,
          message: '提交中...',
          loadingType:'spinner',
          duration:0
        });
        setTimeout(()=>{
          this.$toast.clear()
          this.show = true
          this.showKeyboard = true
        },500)
      },
    },
    components:{
      imgUpload,
      ClipboardText
    }
  }
</script>
<style scoped>
  .wrap{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
  }
  .van-hairline--top-bottom::after{
    border:0px;
  }
  .noticeAssist{
    background-color: #fedae2;
    margin-top: 20px;
    height:80px;
    width: 100%;
    font-size: 24px;
    color: #ea1c4b;
    line-height: 80px;
    box-sizing: border-box;
  }
  .content{
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.08);
    padding: 0px 20px 70px;
    box-sizing: border-box;
    margin-top: 30px;
  }
  .general{
    height:100px;
    box-sizing: border-box;
    border-bottom: 1Px #eee solid;
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #000;
    background-color: #ffffff;
  }
  .spctil{
    height:310px;
    align-items: flex-start;
    padding-top: 20px;
    border-bottom: 0Px #eee solid;
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
  .footer{
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #999;
  }
  .footer img{
    margin-right: 10px;
    width: 20px;
  }
  .footer .getNumber{
    color: #398bfa;
  }
  .buttonSummitAssist{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height:96px;
    border-radius: 0;
    font-size: 30px;
    background-color: #f82a59;
    color: #ffffff;
  }
  .imgUploadWrap{
    width: 100%;
    display: flex;
    padding:80px 0 0 0;
    overflow: scroll;
    margin:0 0px 0 -85px;
  }

  .payButton{
    width: 100%;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    margin-top: 70px;
  }
  .payButton button{
    border: 0px;
    width: 90%;
    margin-left: 5%;
    height:80px;
    line-height: 80px;
    background: -webkit-linear-gradient(left, #f82a59 , #f86b8b); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to right, #f82a59 , #f86b8b); /* 标准的语法（必须放在最后） */
    box-shadow: 0px 3px 20px 1Px #999;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    border-radius: 40px;
    font-size: 30px;
  }
  .payRecords{
    margin-bottom: 50px;
    width: 100%;
    text-align: center;
    color: #398bfa;
    font-size: 24px;
  }
</style>
