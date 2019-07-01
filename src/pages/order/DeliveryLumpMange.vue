<template>
  <div>
    <van-tabs v-model="active" swipeable :line-width="12" :swipe-threshold="6" :offset-top="0" :sticky="true" :lazy-render="true">
      <van-tab title="待发货">
        <div v-loading="loading" style="min-height: 100vh">
          <div class="shopListWrap" v-if="besendList.length">
            <div class="product" v-for="(item,index) in besendList">
              <div class="productStatus">
                <span>{{item.memberName}}</span>
                <span>{{item.memberPhone}}</span>
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
                  <p class="detailDescription" v-else>{{dataItem.goodsSubtitle}}</p>
                  <div>
                    <span class="hotSaleCount">￥{{dataItem.goodsMarketPrice}}</span>
                  </div>
                </div>
                <div class="shopNumber">x{{dataItem.goodsNum}}</div>
              </div>
              <div class="detailCount detailCountAll">
                <span>创建时间：{{item.packageCreateTime}}</span>
                <div>
                  <!--<p @click="giveupOrder(item.packageId,item.memberName,index)" v-waves>取消订单</p>-->
                  <p @click="confirm(item.packageId,item.memberName,index)" v-waves>确认发货</p>
                </div>
              </div>
            </div>
          </div>
          <div class="empty" v-else>
            <img src="../../assets/img/empty_order.png" alt="">
            <p>暂时没有订单</p>
          </div>
        </div>
      </van-tab>
      <van-tab title="已完成">
        <div v-loading="loading" style="min-height: 100vh">
          <div class="shopListWrap"  v-if="completeList.length">
            <div class="product" v-for="(item,index) in completeList">
              <div class="productStatus">
                <span>{{item.memberName}}</span>
                <span>{{item.memberPhone}}</span>
              </div>
              <div class="shopInfo" @click.stop v-for="(dataItem,dataIndex) in item.orderAbstractList">
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
                  <p class="detailDescription" v-else>{{dataItem.goodsSubtitle}}</p>
                  <div>
                    <span class="hotSaleCount">￥{{dataItem.goodsMarketPrice}}</span>
                  </div>
                </div>
                <div class="shopNumber">x{{dataItem.goodsNum}}</div>
              </div>
              <div class="detailCount detailCountAll">
                <span>创建时间：{{item.packageCreateTime}}</span>
              </div>
            </div>
          </div>
          <div class="empty" v-else>
            <img src="../../assets/img/empty_order.png" alt="">
            <p>暂时没有订单</p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data () {
      return {
        active:0,
        loading:false,
        besendList:[],
        completeList:[]
      }
    },
    watch:{
      active:{
        handler(v){
          switch (v){
            case 0:
              this._getBesendList()
              break;
            case 1:
              this._getComplete()
              break;
          }
        },
        immediate:true
      }
    },
    created(){

    },
    methods:{
      giveupOrder(packageId,memberName,index){
        this.$dialog.confirm({
          title: '提示',
          message: `确定要取消${memberName}的订单吗？`
        })
          .then(res => {
            let data = {
              packageId: packageId
            }
            this.httpCli({
              url: config.URL_TOURLIST_ORDER_CANCEL,
              data: data
            })
              .then(res => {
                if (res.errorCode == 100) {
                  this.besendList.splice(index, 1)
                }
              })
          })
          .catch(err => {

          })
      },
      confirm(packageId,memberName,index){
        this.$dialog.confirm({
          title: '提示',
          message: `确定要结束${memberName}的订单吗？`
        })
          .then(res => {
            let data = {
              packageId: packageId
            }
            this.httpCli({
              url: config.URL_TOURLIST_ORDER_COMPLETE,
              data: data
            })
              .then(res => {
                if (res.errorCode == 100) {
                  this.besendList.splice(index, 1)
                }
              })
          })
          .catch(err => {

          })
      },
      _getBesendList(){
        this.loading = true
        let data = {
          currentPage:'1',
          pageRow:'10000',
        }
        this.httpCli({
          url:config.URL_TOURLIST_ORDER_BESEND_LIST,
          data:data
        })
          .then(res => {
            this.loading = false
            if (res.errorCode == 100){
              this.besendList = res.data.packageList.gridModel
//              this.besendList.map(item => item.packageCreateTime = common.dateResult(Number(item.packageCreateTime), 'yyyy-MM-dd hh:mm'))
            }
          })
          .catch(err => {
            this.loading = false
          })
      },
      _getComplete(){
        this.loading = true
        let data = {
          currentPage:'1',
          pageRow:'10000',
        }
        this.httpCli({
          url:config.URL_TOURLIST_ORDER_COMPLETE_LIST,
          data:data
        })
          .then(res => {
            this.loading = false
            if (res.errorCode == 100){
              this.completeList = res.data.packageList.gridModel
//              this.completeList.map(item => item.packageCreateTime = common.dateResult(Number(item.packageCreateTime), 'yyyy-MM-dd hh:mm'))
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
  .shopListWrap{
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 50px;
  }
  .product{
    width: 93%;
    border: 1PX #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    padding: 10px 32px 0px 30px;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #ffffff;
    margin: 0 auto;
    margin-top: 28px;
  }
  .productStatus{
    padding-bottom: 0px;
    font-size: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .productStatus span:nth-child(1){
    color: rgb(51,51,51);
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .productStatus span:nth-child(1) div{
    font-size: 22px;
    padding: 1px 15px;
    background-color: #F2180C;
    color: #ffffff;
    font-weight: normal;
    border-radius: 10px;
    margin-right: 12px;
  }
  .productStatus span:nth-child(2){
    color: #F2180C;
  }
  .shopInfo{
    width: 100%;
    display: flex;
    height:200px;
    margin-top: 30px;
  }
  .imgWrap{
    width: 200px;
    height:200px;
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
  .imgWrap img{
    width:100%;
  }
  .shopDetail{
    width: 350px;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 10px;
  }
  .shopNumber{
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    font-size: 22px;
    color: #666;
    margin-left: 25px;
  }
  .detailTitle{
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
  .detailDescription{
    font-size: 22px;
    margin-top:-20px;
    color: rgb(153,153,153);
    text-align: justify;
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
  }
  .hotSaleCount{
    font-size: 32px;
    color: #F2180C;
  }
  .detailCount{
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
  }
  .detailCount div{
    display: flex;
    align-items: center;
  }
  .detailCount div p{
    width: 120px;
    height:44px;
    line-height: 44px;
    text-align: center;
    border: 1Px rgb(102,102,102) solid;
    border-radius: 22px;
    font-size: 24px;
    color: rgb(102,102,102);
    margin-left: 30px;
  }
  .detailCount div p:nth-child(2){
    border: 1Px #F2180C solid;
    color: #F2180C;
  }

  .detailCountAll span{
    font-size: 22px;
    color: #666;
    line-height: 88px;
  }
  .spanCount{
    height:40px;
    line-height: 40px;
    font-size: 30px;
  }
  .buttonSummitAssist{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height:96px;
    border-radius: 0;
    font-size: 32px;
    background-color: #F2180C;
    color: #ffffff;
  }
  .emptyOther{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
  }
  .emptyOther img{
    width: 150px;
  }
  .emptyOther p{
    font-size: 32px;
    color: #999;
    margin-top: 30px;
  }
</style>
