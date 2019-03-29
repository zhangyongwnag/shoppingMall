<template>
  <div style="height: 100vh;background-color: #f3f3f3" v-if="!loading">
    <div v-if="bankcardList.length">
      <div class="wrap">
        <div class="backCardList" :style="{backgroundColor: item.bankColor}" @click="action(item.bankcardId,item.bankIcon,item.bankName,item.bankTail,item.bankcardType,index)" v-for="(item,index) in bankcardList">
          <div class="backHeader">
            <img :src="item.bankIcon" alt="">
            <div>
              <div>{{item.bankName + (item.bankcardIsDefault == '1' ? '（默认）' : '')}}</div>
              <div>{{item.bankcardType == '1' ? '借记卡' : '信用卡'}}</div>
            </div>
          </div>
          <p>{{item.bankcardNo}}</p>
          <span>{{item.bankcardUsername}}</span>
        </div>
      </div>
    </div>

    <div class="quit">
      <van-button  @click="$router.push({path:'/BankCardAddCardId'})">+添加银行卡</van-button>
    </div>
    <van-actionsheet
      v-model="show"
      :actions="active"
      cancel-text="取消"
      @select="chooise"
    />
  </div>
  <div class="spinner" style="margin-top: 3rem;" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  export default {
    data() {
      return {
        show:false,
        active:[
          {
            id:'1',
            name:'设为默认银行卡'
          },
          {
            id:'2',
            name:'解除绑定'
          },
        ],
        loading:false,
        bankcardList:[],
        bankcardId:'',
        status:''
      }
    },
    created(){
      this.status = this.$route.query.status
      if (this.status == '2'){
        this.getDebitBacKList()
      }else{
        this.getBankList()
      }
    },
    methods:{
      action(bankcardId,bankIcon,bankName,bankTail,bankcardType,index){
        if (this.status != '1'){
          let data = {
            bankcardId:bankcardId,
            bankIcon:bankIcon,
            bankName:bankName,
            bankTail:bankTail,
            bankcardType:bankcardType
          }
          this.$store.dispatch('getDefaultBank',data)
          this.$router.back()
        }else {
          this.show = true
          this.bankcardId = bankcardId
        }
      },
      chooise(item){
        if (item.id == '1'){
          let data = {
            bankcardId:this.bankcardId
          }
          this.httpCli({
            url:config.URL_BANKCARD_DEFAULT_SET,
            data:data
          })
            .then(res => {
              if (res.errorCode == 100){
                this.$toast.success('设置成功')
                this.show = false
                this.getBankList()
              }
            })
        }else {
          this.$dialog.confirm({
            title: '提示',
            message: `确定要解绑银行卡吗？`
          }).then(() => {
            let apply = {
              bankcardId:this.bankcardId
            }
            this.httpCli({
              url:config.URL_BANKCARD_DEL,
              data:apply
            })
              .then(res => {
                if (res.errorCode == 100){
                  this.$toast.success('解绑成功')
                  this.show = false
                  this.getBankList()
                }
              })
          }).catch(() => {
            this.show = false
          });
        }
      },
      getBankList(){
        this.loading = true
        this.httpCli({
          url:config.URL_BANKCARD_LIST,
        })
          .then(res => {
            this.loading = false
            if (res.errorCode == 100){
              this.bankcardList = res.data.bankcardList
            }
          })
          .catch(err => {
            this.loading = false
          })
      },
      getDebitBacKList(){
        this.loading = true
        this.httpCli({
          url:config.URL_BANKCARD_DEBIT_LIST
        })
          .then(res => {
            this.loading = false
            if (res.errorCode == 100){
              this.bankcardList = res.data.bankcardList
            }
          })
          .catch(err => {
            this.loading = false
          })
      }
    }
  }
</script>
<style scoped>
.wrap{
  padding: 20px;
}
.backHeader{
  display: flex;
  align-items: center;
  padding: 40px 30px 0 40px;
}
.backHeader div{
  font-size: 30px;
  color: #fff;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
}
.backHeader div div:nth-child(2){
  font-size: 25px;
  margin-top: 5px;
}
  .backCardList{
    margin: 0px auto 0;
    border-radius: 10px;
    color: #fff;
    position: relative;
    width: 100%;
    height:200px;
    /*background-color: #b81c21;*/
    margin-top: 10px;
  }
.backCardList img{
  height:85px;
}
.backCardList span{
  position: absolute;
  right: 40px;
  top:40px;
  font-size: 30px;
}
.backCardList p{
  position: absolute;
  left: 165px;
  bottom: -10px;
  font-size: 36px;
}
.quit{
  width: 80%;
  margin: 40px auto;
  padding-top: 100px;
}
.quit button{
  width: 100%;
  background-color: #fff;
  border-radius: 50px;
  color: #666;
}
</style>
