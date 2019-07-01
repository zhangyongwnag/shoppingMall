<template>
  <div style="background-color: #f8f8f8;min-height: 100vh" v-loading="loading">
    <div class="shopListWrap" v-if="itemList.gridModel && itemList.gridModel.length">
      <div class="product" v-for="(item,index) in itemList.gridModel">
        <div class="productStatus">
            <span>
              <div class="productStatusIcon">
                <div style="background-color: #ffdf32" v-if="item.orderType == 'travel'">旅<span></span></div>
                <div :style="item.orderType == 'buy' ? {backgroundColor:'#F2180C'} : {backgroundColor:'#ff8704'}" v-else>{{item.orderType == 'buy' ? '买' : '卖'}}</div>
              </div>
              {{item.orderNo}}
            </span>
          <span>{{item.orderStatusDesc}}</span>
        </div>
        <div class="shopInfo" @click.stop v-for="(dataItem,dataIndex) in item.orderAbstractList" @click="$router.push({path:'/OrderDetails',query:{orderNo:item.orderNo}})">
          <div class="imgWrap" style="position: relative;overflow: hidden">
            <img :src="dataItem.goodsThumb" alt="">
            <div class="giftFree" v-if="dataItem.goodsEt == '2'">
              <span>现场</span>
            </div>
            <div class="giftSend" v-if="dataItem.goodsIsGift == '1'">
              <span>赠</span>
            </div>
          </div>
          <div class="shopDetail">
            <div class="detailTitle">{{dataItem.goodsTitle}}</div>
            <p class="detailDescription" v-if="dataItem.goodsOptionName">{{dataItem.goodsOptionName}}</p>
            <div class="detailDescription" v-else>{{dataItem.goodsSubtitle}}</div>
            <div style="width: 5.28rem">
                    <span class="hotSaleCount">
                      ￥{{dataItem.goodsMarketPrice}}
                      <span style="font-size: 0.31rem" v-if="dataItem.goodsStatus == '1' && dataItem.goodsProfitStatus">省<span style="font-size: 0.31rem;color: #333;">&nbsp;{{dataItem.goodsProfitStatus == '0' ? '？' : dataItem.goodsTotalMarketProfit}}</span></span>
                    </span>
            </div>
          </div>
          <div class="shopNumber">x{{dataItem.goodsNum}}</div>
        </div>
        <div class="detailCount detailCountAll">
          <span>共计{{item.orderGoodsTotalNum}}件商品&nbsp;合计：￥{{item.payActualAmount}}&emsp;<span>{{item.expressFee > 0 ? `运费：￥${item.expressFee}` : '免运费'}}</span></span>
          <div class="gitCount" v-if="item.payAdvStatus == '1'">
            已获得宣传费￥？
          </div>
          <div class="gitCount" v-else-if="item.payAdvStatus == '2' && item.payAdvAmount > 0">
            已获得宣传费{{item.payAdvAmount}}
          </div>
        </div>
      </div>
    </div>
    <div class="empty" style="padding-bottom: 2rem" v-else>
      <img src="../../assets/img/empty_finance.png" alt="">
      <p>暂无未到账余额</p>
    </div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  export default {
    data () {
      return {
        loading:false,
        itemList:[]
      }
    },
    watch: {

    },
    created(){
      this.loading = true
      let data = {
        currentPage:'1',
        pageRow:'10000'
      }
      this.httpCli({
        url:config.URL_WALLET_STANDBY_LIST,
        data:data
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.itemList = res.data.itemList
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
  }
</script>
<style scoped>
  .shopListWrap {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 50px;
    padding-top: 30px;
  }

  .product {
    width: 93%;
    border: 1PX #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    padding: 30px 32px 0px 30px;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #ffffff;
    margin: 0 auto;
    margin-top: 30px;
  }

  .product:nth-child(1) {
    margin-top: 0;
  }

  .productStatus {
    padding-bottom: 0px;
    font-size: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .productStatus span:nth-child(1) {
    color: rgb(51, 51, 51);
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .productStatus span:nth-child(1) .productStatusIcon{
    display: flex;
    align-items: center;
  }

  .productStatus span:nth-child(1) .productStatusIcon div:nth-child(1) {
    font-size: 22px;
    padding: 1px 10px;
    background-color: #F2180C;
    color: #ffffff;
    font-weight: normal;
    border-radius: 10px;
    margin-right: 8px;
    position: relative;
  }
  .productStatus span:nth-child(1) .productStatusIcon div:nth-child(1) span{
    position: absolute;
    right: -1PX;
    top:0PX;
    display: inline-block;
    width: 8px;
    height:8px;
    background-color: #F2180C;
    border-radius: 50%;
  }
  .productStatus span:nth-child(1) .productStatusIcon div:nth-child(2) {
    font-size: 22px;
    padding: 1px 5px;
    background: -webkit-gradient(linear, left top, right top, from(#fdcb79) , to(#f9b13c));
    background: linear-gradient(to right, #fdcb79 , #f9b13c);
    color: #ffffff;
    font-weight: normal;
    border-radius: 6px;
    margin-right: 12px;
  }

  .productStatus span:nth-child(2) {
    color: #F2180C;
  }

  .shopInfo {
    width: 100%;
    display: flex;
    height: 200px;
    margin-top: 30px;
  }

  .scroll {
    width: 100%;
    overflow-x: auto;
    height: 205px;
  }

  .wrap {
    display: flex;
  }

  .imgWrap {
    width: 200px;
    height: 200px;
    min-width: 200px;
    min-height: 200px;
    border: 1PX #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    overflow: hidden;
  }

  .imgWrap img {
    width: 100%;
  }

  .shopDetail {
    width: 350px;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 10px;
  }

  .shopNumber {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    font-size: 22px;
    color: #666;
    margin-left: 25px;
  }

  .detailTitle {
    margin-top: 0px;
    text-align: justify;
    font-size: 26px;
    color: #333;
    /*word-break: break-all;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box; !** 对象作为伸缩盒子模型显示 **!*/
    /*-webkit-box-orient: vertical; !** 设置或检索伸缩盒对象的子元素的排列方式 **!*/
    /*-webkit-line-clamp: 2; !** 显示的行数 **!*/
    /*overflow: hidden;  !** 隐藏超出的内容 **!*/
  }

  .detailDescription {
    font-size: 22px;
    margin-top: -20px;
    color: rgb(153, 153, 153);
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hotSaleCount {
    font-size: 32px;
    color: #F2180C;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .detailCount {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
  }

  .detailCount div {
    display: flex;
    align-items: center;
  }

  .detailCount div p {
    width: 130px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    border: 1Px rgb(102, 102, 102) solid;
    border-radius: 24px;
    font-size: 24px;
    color: rgb(102, 102, 102);
    margin-left: 30px;
  }
  .detailCount .gitCount{
    font-size: 22px;
    background-color: #f3f2f1;
    color: #F2180C;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 15px;
    box-sizing: border-box;
    border-radius: 5px;
    letter-spacing: 2px;
  }

  .detailCountAll span {
    font-size: 22px;
    color: #666;
    line-height: 88px;
  }

  .spanCount {
    height: 40px;
    line-height: 40px;
    font-size: 30px;
  }

  .buttonSummitAssist {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 96px;
    border-radius: 0;
    font-size: 32px;
    background-color: #F2180C;
    color: #ffffff;
  }

  .emptyOther {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
  }

  .emptyOther img {
    width: 150px;
  }

  .emptyOther p {
    font-size: 32px;
    color: #999;
    margin-top: 30px;
  }
</style>
