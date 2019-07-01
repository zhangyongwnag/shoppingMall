<template>
  <div class="wrap">
    <div class="contentWrap">
      <div class="general" v-waves style="position: relative">
        <span class="generalName">姓名：{{userInfo.memberName}}<span style="font-size: 0.3rem;color: #ff8704;">只能提现到钻石会员本人银行卡</span></span>
      </div>
      <div class="general" v-waves style="position: relative" @click="$router.push({path:'/BankCardManage',query:{status:'2'}})">
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
        <p class="payMount">提现金额 <span class="withService">（含￥{{serviceMount/100}}手续费）</span></p>
        <div class="payInput">
          <span>￥</span><input type="number" v-model="mount">
        </div>
        <p class="myMount">我的余额&nbsp;<span style="color: #F2180C;margin-left: 0px;">{{withdrawInfo.balance}}</span>&nbsp;元<span @click="drawwithAll">全部提现</span></p>
        <div class="payButton">
          <van-button disabled round type="danger" @click="paySubmit" v-if="!withdrawInfo.balance || withdrawInfo.balance == '0' || !mount">提交申请<span style="font-size: 0.32rem">&nbsp;(&nbsp;预计3-5个工作日到账&nbsp;)</span></van-button>
          <van-button v-waves round type="danger" @click="paySubmit" v-else>提交申请<span style="font-size: 0.32rem">&nbsp;(&nbsp;预计3-5个工作日到账&nbsp;)</span></van-button>
        </div>
      </div>
    </div>

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
    <van-popup v-model="showResultPopup" position="top" :overlay="true" style="width: 100%;height: 100%;">
      <div class="withDrawSuccessWrap">
        <img src="../../assets/img/finance/finance_applySuccess.png" alt="">
        <div>提现已申请</div>
        <div>预计3-5个工作日到账</div>
        <div class="withDrawSuccessInfo">
          <div class="withDrawSuccessInfoCell">
            <div>银行卡</div>
            <div v-if="defaultBankList.bankName">{{defaultBankList.bankName}}&nbsp;&nbsp;尾号{{defaultBankList.bankTail}}</div>
            <div v-else-if="withdrawInfo.bankcard && withdrawInfo.bankcard.bankName">{{withdrawInfo.bankcard.bankName}}&nbsp;&nbsp;尾号{{withdrawInfo.bankcard.bankTail}}</div>
          </div>
          <div class="withDrawSuccessInfoCell">
            <div>金额</div>
            <div>￥{{mount}}<span>(含手续费{{serviceMount/100}}元)</span></div>
          </div>
        </div>
        <div class="footer">
          <van-button v-waves round @click="finish">完成</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  import m from '../../utils/md5.min'
  export default {
    data() {
      return {
        mount:sessionStorage.getItem('withDrawMount') || '',
        serviceMount:0,
        withdrawInfo:{},
        show:false,
        password:'',
        showKeyboard:true,
        showResultPopup:false,
        userInfo:{}
      }
    },
    watch:{
      mount(v){
        this.withdrawInfo.withdrawRate ? this.serviceMount = Math.floor(v*this.withdrawInfo.withdrawRate*100) : ''
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
                sessionStorage.removeItem('sessionRecordsList')
                sessionStorage.removeItem('sessionCurrentPage')
                sessionStorage.removeItem('sessionTotalPage')
                setTimeout(() => {
                  this.showResultPopup = true
                },100)
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

      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    beforeRouteLeave(from,to,next){
      from.name == 'BankCardManage' ? sessionStorage.setItem('withDrawMount',this.mount) : sessionStorage.removeItem('withDrawMount')
      next()
    },
    methods:{
      drawwithAll(){
        if (!this.withdrawInfo.balance || this.withdrawInfo.balance == '0'){
          return
        }
        this.mount = this.withdrawInfo.balance
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
        if (this.defaultBankList && !this.defaultBankList.bankcardId && this.withdrawInfo && !this.withdrawInfo.bankcard){
          common.toast('请添加银行卡')
          return
        }
        if (!this.mount){
          common.toast('请输入提现金额')
          return
        }
        if (this.mount < Number(this.withdrawInfo.withdrawMin)){
          common.toast(`最小提现金额${this.withdrawInfo.withdrawMin}元`)
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
      finish(){
        this.$router.back()
        this.showResultPopup = false
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
    padding: 25px 15px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .contentWrap{
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.08);
  }
  .general{
    /*margin-top: 25px;*/
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
  .generalName{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .generalName span:nth-child(1){
    letter-spacing: 1PX;
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
    padding: 40px 30px 70px;
    box-sizing: border-box;
  }
  .payMount{
    margin: 0 0 60px 0;
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
    margin-top: 90px;
  }
  .payButton button{
    border: 0px;
    width: 90%;
    margin-left: 5%;
    height:80px;
    line-height: 80px;
    background: -webkit-gradient(linear, left top, right top, from(rgb(255,88,76)) , to(rgb(255,41,28)));
    background: linear-gradient(to right, rgb(255,88,76) , rgb(255,41,28));
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
  .withDrawSuccessWrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 72px;
  }
  .withDrawSuccessWrap img{
    width: 105px;
  }
  .withDrawSuccessWrap div:nth-child(2){
    margin-top: 38px;
    font-size: 30px;
  }
  .withDrawSuccessWrap div:nth-child(3){
    margin-top: 32px;
    font-size: 26px;
    color: #666;
  }
  .withDrawSuccessWrap .withDrawSuccessInfo{
    width: 90%;
    border-top: 1PX #eee solid;
    border-bottom: 1PX #eee solid;
    padding: 15px 10px 30px;
    margin-top: 54px;
  }
  .withDrawSuccessWrap .withDrawSuccessInfo .withDrawSuccessInfoCell{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px !important;
  }
  .withDrawSuccessWrap .withDrawSuccessInfo .withDrawSuccessInfoCell div:nth-child(1){
    font-size: 30px !important;
    color: #666666;
  }
  .withDrawSuccessWrap .withDrawSuccessInfo .withDrawSuccessInfoCell div:nth-child(2){
    font-size: 26px !important;
    color: #333;
    margin-top: 0px;
  }
  .withDrawSuccessWrap .footer{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    width: 85%;
  }
  .withDrawSuccessWrap .footer button {
    width: 100%;
    border-radius: 51px;
    background-color: #F2180C;
    font-size: 30px;
    color: rgb(248,248,248);
  }
</style>
