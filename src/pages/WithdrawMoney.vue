<template>
  <div class="wrap">
    <div>
      <div class="general" style="position: relative" @click="$router.push({path:'/BankCardManage',query:{status:'2'}})">
        <span>提现到</span>
        <div v-if="defaultBankList && defaultBankList.bankcardId">
          <div class="chooiseBank">
            <img :src="defaultBankList.bankIcon" alt="">
            <span>{{defaultBankList.bankName + '（' + defaultBankList.bankTail + '）'}}</span>
          </div>
        </div>
        <div v-else>
          <div class="chooiseBank" v-if="withdrawInfo.bankcard && withdrawInfo.bankcard.bankcardId">
            <img :src="withdrawInfo.bankcard.bankIcon" alt="">
            <span>{{withdrawInfo.bankcard.bankName + '（' + withdrawInfo.bankcard.bankTail + '）'}}</span>
          </div>
          <div class="chooiseBank" v-else>
            <span>请选择银行卡</span>
          </div>
        </div>
        <div class="translate">
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="content">
        <p class="payMount">提现金额 <span class="withService">（含￥{{serviceMount.toFixed(2)}}手续费）</span></p>
        <div class="payInput">
          <span>￥</span><input type="number" v-model="mount">
        </div>
        <p class="myMount">我的余额&nbsp;<span style="color: #f82a59;margin-left: 0px;">{{balance || '0' }}</span>&nbsp;元<span @click="drawwithAll">全部提现</span></p>
        <div class="payButton">
          <van-button disabled round type="danger" @click="paySubmit" v-if="!balance || balance == '0' || !mount">提交申请</van-button>
          <van-button round type="danger" @click="paySubmit" v-else>提交申请</van-button>
        </div>
      </div>
    </div>

    <p class="payRecords" @click="$router.push({path:'/WithdrawMoneyRecords'})">提现记录</p>

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
  import { mapState , mapActions} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  import m from '../md5.min'
  export default {
    data() {
      return {
        mount:'',
        serviceMount:0,
        withdrawInfo:{},
        balance:'',
        show:false,
        password:'',
        showKeyboard:true,
      }
    },
    watch:{
      mount(v){
        this.withdrawInfo.serviceChargeRate ? this.serviceMount = v*this.withdrawInfo.serviceChargeRate : ''
      },
      password(v){
        if (v.length == '6'){
          this.$toast.loading({
            mask: true,
            message: '提交中...',
            loadingType:'spinner',
            duration:0
          });
          let data = {
            bankcardId:this.defaultBankList.bankcardId ? this.defaultBankList.bankcardId : this.withdrawInfo.bankcard.bankcardId,
            withdrawAmount:this.mount,
            payPasswd:m.md5(v)
          }
          this.httpCli({
            url:config.URL_WALLET_WITHDRAW_SUBMIT,
            data:data
          })
            .then(res => {
              this.$toast.clear()
              if (res.errorCode == 100){
                this.show = false
                this.mount = ''
                this.$toast.success('提交成功')
                this._getBalance()
              }
            })
            .catch(err => {
              this.$toast.clear()
            })
        }
      },
      show(v){
        v ? this.password = '' : ''
      }
    },
    computed:{
      ...mapState({
        'defaultBankList':state => state.funding.defaultBankList
      })
    },
    created(){
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        loadingType:'spinner',
        duration:0
      });
      this.httpCli({
        url:config.URL_BANKCARD_DEFAULT_WIYHDRAW_BASIC
      })
        .then(res => {
          this.$toast.clear()
          if (res.errorCode == 100){
            this.withdrawInfo = res.data
          }
        })
        .catch(err => {
          this.$toast.clear()
        })

      this._getBalance()
    },
    methods:{
      drawwithAll(){
        if (!this.balance || this.balance == '0'){
          return
        }
        this.mount = this.balance
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
      paySubmit(){
        if (!this.mount){
          common.toast('请输入提现金额')
          return
        }
        if (this.mount < 500 || this.mount == 500){
          common.toast('最小提现金额500元')
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
      onSelect(v){

      },
      _getBalance(){
        this.httpCli({
          url:config.URL_WALLET_BALANCE
        })
          .then(res => {
            if (res.errorCode = 100){
              this.balance	= res.data.balance
            }
          })
      }
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
  .general{
    margin-top: 30px;
    height:100px;
    box-sizing: border-box;
    border-bottom: 1Px #eee solid;
    display: flex;
    align-items: center;
    font-size: 28px;
    background-color: #ffffff;
    padding: 0 30px;
    color: #333;
  }
  .general::before{
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    border-color: #000;
    background-color: #000;
    border-radius: inherit;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .general:active::before {
    opacity: 0.2;
  }
  .chooiseBank{
    margin-left: 80px;
    display: flex;
    align-items: center;
  }
  .chooiseBank img{
    margin-right: 10px;
    width: 45px;
  }
  .translate{
    width: 90%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: 20px;
    top: 0;
    background-color: rgba(0,0,0,0);
  }
  .content{
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.08);
    padding: 40px 30px 70px;
    box-sizing: border-box;
  }
  .payMount{
    margin: 0 0 50px 0;
    font-size: 28px;
    color: #333333;
  }
  .payInput{
    font-size: 60px;
    display: flex;
    border-bottom: 1Px #ddd solid;
    padding-bottom: 10px;
    overflow: hidden;
  }
  .payInput span{
    margin-right: 20px;
  }
  .payInput input{
    border: 0px;
  }
  .myMount{
    font-size: 24px;
    margin-top: 30px;
    color: #666;
  }
  .myMount span{
    margin-left: 40px;
    color: #398bfa;
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
  .withService{
    font-size: 24px;
    color: #666;
  }
</style>
