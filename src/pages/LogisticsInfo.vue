<template>
  <div v-if="!loading">
    <div class="wrap" v-if="info.expressSn">
      <div class="goodDetails">
        <div class="shopListWrap">
          <div class="product">
            <div class="shopInfo">
              <!--<div class="imgWrap">-->
                <!--&lt;!&ndash;<img :src="" alt="">&ndash;&gt;-->
              <!--</div>-->
              <div class="shopDetail">
                <p class="detailTitle">已完成</p>
                <p class="detailDescription">{{info.expressName}} <br>{{info.expressSn}}<ClipboardText :text="info.expressSn"></ClipboardText></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shopListWrap">
        <div class="product" v-if="info.expressList && info.expressList.length">
          <van-steps direction="vertical" :active="0" active-color="#f82a59">
            <van-step v-for="(item,index) in info.expressList" :key="index">
              <h3>{{item.status}}</h3>
              <p>{{item.time}}</p>
            </van-step>
          </van-steps>
        </div>
        <div class="product" v-else>
          未查询到物流信息，请稍后再试！
        </div>
      </div>
    </div>
    <div v-else style="margin-top: 150px;text-align: center">
      查询物流信息失败
    </div>
  </div>
  <div class="spinner" style="margin-top: 3rem" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  import ClipboardText from '../components/ClipboardText.vue'
  export default {
    data() {
      return {
        info:{},
        loading:false,
      }
    },
    created(){
      this.loading = true
      let data = {
        expressSn:this.$route.query.expressSn
      }
      this.httpCli({
        url:config.URL_ORDER_EXPRESS_INFO,
        data:data
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            if (res.data.express && res.data.express.expressReqStatus == '0'){
              this.info = res.data.express
            }else {
              common.toast(res.data.express.expressReqMsg)
            }
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    components:{
      ClipboardText
    }
  }
</script>
<style scoped>
  .wrap{
    padding:20px 0;
  }
  h3 {
    font-weight: normal;
  }
  .van-step--vertical{
    padding: 1px 0 0 0;
    font-size: 20px;
  }
  .van-step__title{
    margin-top: 2px!important;
  }
  .van-step .van-step__circle{
    margin-top: 0px !important;
  }
  .shopListWrap{
    width: 95%;
    box-sizing: border-box;
    margin-left: 2.5%;
  }
  .shopListWrap:nth-child(2){
    margin-top: 30px;
  }
  .product{
    width: 100%;
    border: 1px #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    padding: 40px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top: 30px;
  }
  .product:nth-child(1){
    margin-top: 15px;
  }
  .checkbox img {
    width: 36px;
    height:36px;
  }
  .shopInfo{
    width: 100%;
    display: flex;
    height:110px;
  }
  .imgWrap{
    width: 110px;
    height:110px;
    border: 1px #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }
  .imgWrap img{
    height:100%;
  }
  .shopDetail{
    max-width: 410px;
    width: 100% !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 40px;
  }
  .detailTitle{
    margin-top: 0px;
    text-align: justify;
    font-size: 28px;
    color: #333;
  }
  .detailDescription{
    font-size: 24px;
    margin-top: -20px;
    color: #333;
  }
  .detailCount{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 100%;
    font-size: 28px;
  }
  .spanCount{
    height:40px;
    line-height: 40px;
    font-size: 28px;
  }
</style>
