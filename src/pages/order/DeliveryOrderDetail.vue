<template>
  <div class="wrap" v-loading="loading">
    <van-collapse style="width: 95%;margin-left: 2.5%;border-radius: 15px;overflow: hidden" v-model="activeNames" accordion>
      <van-collapse-item name="1" v-if="tourDetail.tourist">
        <div slot="title">
          <div class="title">
            <div style="color: #F2180C;">
              {{tourDetail.tourist.processStatusDesc}}
            </div>
          </div>
        </div>
        <div class="content">
          <div class="cell" v-if="tourDetail.tourist.touristNo">
            <div class="cellTitle">行程单号：{{tourDetail.tourist.touristNo}}<ClipboardText :text="tourDetail.tourist.touristNo"></ClipboardText></div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.touristStartProvinceName">
            <div class="cellTitle">出发城市：{{tourDetail.tourist.touristStartProvinceName + tourDetail.tourist.touristStartCityName}}</div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.touristArriveProvinceName">
            <div class="cellTitle">到达省份：{{tourDetail.tourist.touristArriveProvinceName}}</div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.touristPeopleNum">
            <div class="cellTitle">旅行团人数：{{tourDetail.tourist.touristPeopleNum}}人</div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.touristCarLicense">
            <div class="cellTitle">车牌号：{{tourDetail.tourist.touristCarLicense}}<ClipboardText :text="tourDetail.tourist.touristCarLicense"></ClipboardText></div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.touristAgencyName">
            <div class="cellTitle">旅行社名称：{{tourDetail.tourist.touristAgencyName}}</div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.startTime">
            <div class="cellTitle">出发时间：{{tourDetail.tourist.startTime}}</div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.startPlace">
            <div class="cellTitle">出发地点：{{tourDetail.tourist.startPlace}}</div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.startContactPhone">
            <div class="cellTitle">出发联系电话：<a :href="`tel:${tourDetail.tourist.startContactPhone}`" style="color: rgb(153,153,153);">{{tourDetail.tourist.startContactPhone}}</a></div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.startShopperName">
            <div class="cellTitle">出发配送员：{{tourDetail.tourist.startShopperName}}</div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.startShopperPhone">
            <div class="cellTitle">出发配送员联系方式：<a :href="`tel:${tourDetail.tourist.startShopperPhone}`" style="color: rgb(153,153,153);">{{tourDetail.tourist.startShopperPhone}}</a></div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.backTime">
            <div class="cellTitle">返程抵达时间：{{tourDetail.tourist.backTime}}</div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.backPlace">
            <div class="cellTitle">返程抵达地点：{{tourDetail.tourist.backPlace}}</div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.backContactPhone">
            <div class="cellTitle">返程抵达联系电话：<a :href="`tel:${tourDetail.tourist.backContactPhone}`" style="color: rgb(153,153,153);">{{tourDetail.tourist.backContactPhone}}</a></div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.backShopperName">
            <div class="cellTitle">返程配送员：{{tourDetail.tourist.backShopperName}}</div>
          </div>
          <div class="cell" v-if="tourDetail.tourist.backShopperPhone">
            <div class="cellTitle">返程配送员联系方式：<a :href="`tel:${tourDetail.tourist.backShopperPhone}`" style="color: rgb(153,153,153);">{{tourDetail.tourist.backShopperPhone}}</a></div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <div class="shopListWrap">
      <div class="product" v-for="(item,index) in tourDetail.goodsList">
        <div class="shopInfo">
          <div class="imgWrap">
            <img :src="item.goodsThumb" alt="">
            <div class="giftFree" v-if="item.goodsIsGift == '1'">
              <span>赠品</span>
            </div>
          </div>
          <div class="shopDetail">
            <div class="detailTitle">{{item.goodsTitle}}</div>
            <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
            <div class="detailDescription" v-else>{{item.goodsSubtitle}}</div>
            <div class="detailCount" @click.stop>
              <div>
                现货：{{item.goodsStockNum}}件&emsp;总计：{{item.goodsNum}}件
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ClipboardText from '../../components/ClipboardText.vue'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data () {
      return {
        loading:false,
        activeNames:'1',
        tourDetail:{}
      }
    },
    created(){
      this.loading = true
      let data = {
        touristId:this.$route.query.touristId
      }
      this.httpCli({
        url:config.URL_TOURLIST_DETAIL,
        data:data
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.tourDetail = res.data
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
    box-sizing: border-box;
    background-color: #f3f2f1;
    min-height: 100vh;
    padding:20px 0;
  }
  .couponWrap{
    width: 90%;
    margin: 0 5%;
  }
  section{
    width: 90%;
    margin-left: 5%;
    padding: 28px 50px 5px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 15px;
    border: 1PX #eee solid;
  }

  .title{
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title span{
    font-size: 26px;
  }
  .content{
    padding-bottom: 10px;
  }
  .content .cell{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26px;
    color: #999;
    height:50px;
  }
  .content .action{
    display: flex;
    justify-content: flex-end;
  }
  section .content .action p{
    padding: 12px 40px;
    background-color: #F2180C;
    color: #fff;
    border-radius: 30px;
    margin-left: 20px;
  }
  .content .action p:nth-child(1){
    border: 1PX #999 solid;
    background-color: #fff;
    color: rgb(51,51,51);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .activeButton{
    color: #fff !important;
    background-color: #fff !important;
    border: 0px !important;
  }
  .shopListWrap{
    background-color: #fff;
    width: 95%;
    margin:20px 2.5% 0;
    border-radius: 15PX;
  }
  .product {
    width: 100%;
    border-bottom: 5PX #f3f2f1 solid;
    /*box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);*/
    display: flex;
    padding: 30px;
    box-sizing: border-box;
  }
  .productFail{
    opacity: 0.4;
  }

  .product:last-of-type {
    border-bottom: 0px;
  }

  .checkboxFail{
    opacity: 0.5;
    margin-right: 5px;
  }
  .checkboxFail div{
    background-color: #666;
    font-size: 20px;
    color: #fff;
    padding: 4px 12px;
    border-radius: 35px;
    white-space: nowrap;
  }

  .checkbox {
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .checkbox img {
    width: 36px;
    height: 36px;
  }

  .shopInfo {
    width: 100%;
    display: flex;
    height: 200px;
  }

  .imgWrap {
    width: 200px;
    height: 200px;
    min-width: 200px;
    min-height: 200px;
    border: 1Px #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
    position: relative;
    overflow: hidden;
  }

  .imgWrap img {
    width: 100%;
  }

  .shopDetail {
    max-width: 410px;
    width: 100% !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .detailTitle {
    margin-top: 15px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 24px;
    color: #333;
    font-weight: bold;
  }

  .detailDescription {
    font-size: 20px;
    margin-top: -20px;
    color: #999;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .detailCount {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
    font-size: 24px;
  }

  .spanCount {
    height: 40px;
    line-height: 40px;
    font-size: 28px;
  }

  .footer {

  }

  .checkboxFinal {
    margin-left: 30px;
  }

  .van-submit-barShoppingCart {
    bottom: 0px;
    z-index: 0;
    border: 1PX #f3f2f1 solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
  }

  .van-submit-barShoppingCart button {
    background-color: #F2180C;
  }

  .van-submit-barShoppingCartRemove {
    bottom: 0px;
    z-index: 0;
    position: fixed;
    border: 1PX #f3f2f1 solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
  }

  .van-submit-barShoppingCartRemove button {
    background-color: #333333;
    border: 0px;
  }

  .van-submit-barShoppingCartNum {
    position: absolute;
    left: 170px;
    top: 31px;
  }

  .van-submit-barShoppingCartNum span {
    font-size: 30px;
    color: #F2180C;
  }
  .footer{
    position: fixed;
    bottom: 40px;
    left: 7.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85%;
  }
  .footer button {
    height:90px;
    width: 100%;
    border-radius: 51px;
    background-color: #F2180C;
    font-size: 30px;
    color: rgb(248,248,248);
    transition: all 0.2s;
  }
</style>
