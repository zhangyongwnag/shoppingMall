<template>
  <div style="height: auto;overflow: hidden" id="AllOrdersWrap">
    <van-tabs v-model="active" animated swipeable :line-width="24" :swipe-threshold="6" :offset-top="0" :sticky="true" :lazy-render="true">
      <van-tab title="全部">
        <div v-if="!loading">
          <div class="shopListWrap" v-if="allList.gridModel && allList.gridModel.length">
            <div class="product" v-for="(item,index) in allList.gridModel">
              <div class="productStatus">{{item.orderStatusDesc}}</div>
              <div class="shopInfo" @click.stop v-for="(dataItem,dataIndex) in item.orderAbstractList" @click="$router.push({path:'/OrderDetails',query:{orderId:item.orderId,status:'1'}})">
                <div class="imgWrap">
                  <img :src="dataItem.goodsThumb" alt="">
                </div>
                <div class="shopDetail">
                  <p class="detailTitle">{{dataItem.goodsTitle.substring(0,25) + '...'}}</p>
                  <p class="detailDescription" v-if="dataItem.goodsOptionName">{{dataItem.goodsOptionName}}</p>
                  <p class="detailDescription" v-else>{{dataItem.goodsSubtitle}}</p>
                  <div>
                    <span class="hotSaleCount" v-if="dataItem.goodsVipPrice">
                      ￥{{dataItem.goodsVipPrice}}
                    </span>
                    <span class="hotSaleCount" v-else>
                      ￥{{dataItem.goodsMarketPrice}}
                    </span>
                  </div>
                </div>
                <div class="shopNumber">x{{dataItem.goodsNum}}</div>
              </div>
              <div class="detailCount detailCountAll">
                <span>共计{{item.orderGoodsTotalNum}}件商品&nbsp;合计：￥{{item.payActualAmount}}</span>
                <div>
                  <p @click="payOrder(item.orderNo,index)" v-if="item.btnPayEnable == '1'">支付订单</p>
                  <p @click="giveupOrder(item.orderId,index,1)" v-if="item.btnCancelEnable == '1'">取消订单</p>
                  <p @click="logistic(item.expressType,item.orderId,item.expressSn,index)" v-if="item.btnExpressEnable == '1'">查看物流</p>
                  <p @click="confirm(item.orderId,index,1)" v-if="item.btnConfirmEnable == '1'">确认收货</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="emptyOther">
            <img src="../assets/img/noOrder.png" alt="">
            <p>暂时还没有订单</p>
          </div>
        </div>
        <div class="spinner" style="margin-top: 3rem;" v-else>
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </van-tab>
      <van-tab title="待付款">
        <div v-if="!loading">
          <div class="shopListWrap" v-if="bepauedList.gridModel && bepauedList.gridModel.length">
            <div class="product" v-for="(item,index) in bepauedList.gridModel">
              <div class="shopInfo" @click.stop v-for="(dataItem,dataIndex) in item.orderAbstractList" @click="$router.push({path:'/OrderDetails',query:{orderId:item.orderId,status:'1'}})">
                <div class="imgWrap">
                  <img :src="dataItem.goodsThumb" alt="">
                </div>
                <div class="shopDetail">
                  <p class="detailTitle">{{dataItem.goodsTitle.substring(0,25) + '...'}}</p>
                  <p class="detailDescription" v-if="dataItem.goodsOptionName">{{dataItem.goodsOptionName}}</p>
                  <p class="detailDescription" v-else>{{dataItem.goodsSubtitle}}</p>
                  <div>
                    <span class="hotSaleCount" v-if="dataItem.goodsVipPrice">
                      ￥{{dataItem.goodsVipPrice}}
                    </span>
                    <span class="hotSaleCount" v-else>
                      ￥{{dataItem.goodsMarketPrice}}
                    </span>
                  </div>
                </div>
                <div class="shopNumber">x{{dataItem.goodsNum}}</div>
              </div>
              <div class="detailCount detailCountAll">
                <span>共计{{item.orderGoodsTotalNum}}件商品&nbsp;合计：￥{{item.payActualAmount}}</span>
                <div>
                  <p @click="payOrder(item.orderNo,index)" v-if="item.btnPayEnable == '1'">支付订单</p>
                  <p @click="giveupOrder(item.orderId,index,2)" v-if="item.btnCancelEnable == '1'">取消订单</p>
                  <p @click="logistic(index)" v-if="item.btnExpressEnable == '1'">查看物流</p>
                  <p @click="confirm(index)" v-if="item.btnConfirmEnable == '1'">确认收货</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="emptyOther">
            <img src="../assets/img/noOrder.png" alt="">
            <p>暂时还没有订单</p>
          </div>
        </div>
        <div class="spinner" style="margin-top: 3rem;" v-else>
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </van-tab>
      <van-tab title="待发货">
        <div v-if="!loading">
          <div class="shopListWrap" v-if="besendList.gridModel && besendList.gridModel.length">
            <div class="product" v-for="(item,index) in besendList.gridModel">
              <div class="shopInfo" @click.stop v-for="(dataItem,dataIndex) in item.orderAbstractList" @click="$router.push({path:'/OrderDetails',query:{orderId:item.orderId,status:'1'}})">
                <div class="imgWrap">
                  <img :src="dataItem.goodsThumb" alt="">
                </div>
                <div class="shopDetail">
                  <p class="detailTitle">{{dataItem.goodsTitle.substring(0,25) + '...'}}</p>
                  <p class="detailDescription" v-if="dataItem.goodsOptionName">{{dataItem.goodsOptionName}}</p>
                  <p class="detailDescription" v-else>{{dataItem.goodsSubtitle}}</p>
                  <div>
                    <span class="hotSaleCount" v-if="dataItem.goodsVipPrice">
                      ￥{{dataItem.goodsVipPrice}}
                    </span>
                    <span class="hotSaleCount" v-else>
                      ￥{{dataItem.goodsMarketPrice}}
                    </span>
                  </div>
                </div>
                <div class="shopNumber">x{{dataItem.goodsNum}}</div>
              </div>
              <div class="detailCount detailCountAll">
                <span>共计{{item.orderGoodsTotalNum}}件商品&nbsp;合计：￥{{item.payActualAmount}}</span>
                <div>
                  <p @click="payOrder(index)" v-if="item.btnPayEnable == '1'">支付订单</p>
                  <p @click="giveupOrder(index)" v-if="item.btnCancelEnable == '1'">取消订单</p>
                  <p @click="logistic(index)" v-if="item.btnExpressEnable == '1'">查看物流</p>
                  <p @click="confirm(index)" v-if="item.btnConfirmEnable == '1'">确认收货</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="emptyOther">
            <img src="../assets/img/noOrder.png" alt="">
            <p>暂时还没有订单</p>
          </div>
        </div>
        <div class="spinner" style="margin-top: 3rem;" v-else>
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </van-tab>
      <van-tab title="待收货">
        <div v-if="!loading">
          <div class="shopListWrap" v-if="bereceivedList.gridModel && bereceivedList.gridModel.length">
            <div class="product" v-for="(item,index) in bereceivedList.gridModel">
              <div class="shopInfo" @click.stop v-for="(dataItem,dataIndex) in item.orderAbstractList" @click="$router.push({path:'/OrderDetails',query:{orderId:item.orderId,status:'1'}})">
                <div class="imgWrap">
                  <img :src="dataItem.goodsThumb" alt="">
                </div>
                <div class="shopDetail">
                  <p class="detailTitle">{{dataItem.goodsTitle.substring(0,25) + '...'}}</p>
                  <p class="detailDescription" v-if="dataItem.goodsOptionName">{{dataItem.goodsOptionName}}</p>
                  <p class="detailDescription" v-else>{{dataItem.goodsSubtitle}}</p>
                  <div>
                    <span class="hotSaleCount" v-if="dataItem.goodsVipPrice">
                      ￥{{dataItem.goodsVipPrice}}
                    </span>
                    <span class="hotSaleCount" v-else>
                      ￥{{dataItem.goodsMarketPrice}}
                    </span>
                  </div>
                </div>
                <div class="shopNumber">x{{dataItem.goodsNum}}</div>
              </div>
              <div class="detailCount detailCountAll">
                <span>共计{{item.orderGoodsTotalNum}}件商品&nbsp;合计：￥{{item.payActualAmount}}</span>
                <div>
                  <p @click="payOrder(index)" v-if="item.btnPayEnable == '1'">支付订单</p>
                  <p @click="giveupOrder(index)" v-if="item.btnCancelEnable == '1'">取消订单</p>
                  <p @click="logistic(item.expressType,item.orderId,item.expressSn,index)" v-if="item.btnExpressEnable == '1'">查看物流</p>
                  <p @click="confirm(item.orderId,index,2)" v-if="item.btnConfirmEnable == '1'">确认收货</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="emptyOther">
            <img src="../assets/img/noOrder.png" alt="">
            <p>暂时还没有订单</p>
          </div>
        </div>
        <div class="spinner" style="margin-top: 3rem;" v-else>
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </van-tab>
      <van-tab title="已完成">
        <div v-if="!loading">
          <div class="shopListWrap" v-if="completeList.gridModel && completeList.gridModel.length">
          <div class="product" v-for="(item,index) in completeList.gridModel">
            <div class="shopInfo" @click.stop v-for="(dataItem,dataIndex) in item.orderAbstractList" @click="$router.push({path:'/OrderDetails',query:{orderId:item.orderId,status:'1'}})">
              <div class="imgWrap">
                <img :src="dataItem.goodsThumb" alt="">
              </div>
              <div class="shopDetail">
                <p class="detailTitle">{{dataItem.goodsTitle.substring(0,25) + '...'}}</p>
                <p class="detailDescription" v-if="dataItem.goodsOptionName">{{dataItem.goodsOptionName}}</p>
                <p class="detailDescription" v-else>{{dataItem.goodsSubtitle}}</p>
                <div>
                    <span class="hotSaleCount" v-if="dataItem.goodsVipPrice">
                      ￥{{dataItem.goodsVipPrice}}
                    </span>
                  <span class="hotSaleCount" v-else>
                      ￥{{dataItem.goodsMarketPrice}}
                    </span>
                </div>
              </div>
              <div class="shopNumber">x{{dataItem.goodsNum}}</div>
            </div>
            <div class="detailCount detailCountAll">
              <span>共计{{item.orderGoodsTotalNum}}件商品&nbsp;合计：￥{{item.payActualAmount}}</span>
              <div>
                <p @click="payOrder(index)" v-if="item.btnPayEnable == '1'">支付订单</p>
                <p @click="giveupOrder(index)" v-if="item.btnCancelEnable == '1'">取消订单</p>
                <p @click="logistic(item.expressType,item.orderId,item.expressSn,index)" v-if="item.btnExpressEnable == '1'">查看物流</p>
                <p @click="confirm(index)" v-if="item.btnConfirmEnable == '1'">确认收货</p>
              </div>
            </div>
          </div>
        </div>
          <div v-else class="emptyOther">
            <img src="../assets/img/noOrder.png" alt="">
            <p>暂时还没有订单</p>
          </div>
        </div>
        <div class="spinner" style="margin-top: 3rem;" v-else>
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  export default {
    data() {
      return {
        active:'',
        current: 0,
        imgList:[],
        chooiseGoodsStatus:false,
        loading:false,
        allList:{},
        bepauedList:{},
        besendList:{},
        bereceivedList:{},
        completeList:{},
      }
    },
    watch:{
      active(v){
        switch (v){
          case 0:
            this.loading = true
            let dataOne = {
              currentPage:'1',
              pageRow:'10000'
            }
            this.httpCli({
              url:config.URL_ORDER_ALL_LIST,
              data:dataOne
            })
              .then(res => {
                this.loading = false
                if (res.errorCode == 100){
                  this.allList = res.data.orderList
                  setTimeout(()=>{
                    let height = document.getElementsByClassName('shopListWrap')[0].clientHeight + 150
                    document.getElementById('AllOrdersWrap').style.height = height.toString() + 'px'
                  })
                }
              })
              .catch(err => {
                this.loading = false
              })
            break;
          case 1:
            this.loading = true
            let dataTwo = {
              currentPage:'1',
              pageRow:'10000'
            }
            this.httpCli({
              url:config.URL_ORDER_BEPAYED_LIST,
              data:dataTwo
            })
              .then(res => {
                this.loading = false
                if (res.errorCode == 100){
                  this.bepauedList = res.data.orderList
                  setTimeout(()=>{
                    let height = document.getElementsByClassName('shopListWrap')[1].clientHeight + 150
                    document.getElementById('AllOrdersWrap').style.height = height.toString() + 'px'
                  })
                }
              })
              .catch(err => {
                this.loading = false
              })
            break;
          case 2:
            this.loading = true
            let dataThree = {
              currentPage:'1',
              pageRow:'10000'
            }
            this.httpCli({
              url:config.URL_ORDRR_BESEND_LIST,
              data:dataThree
            })
              .then(res => {
                this.loading = false
                if (res.errorCode == 100){
                  this.besendList = res.data.orderList
                  setTimeout(()=>{
                    let height = document.getElementsByClassName('shopListWrap')[2].clientHeight + 150
                    document.getElementById('AllOrdersWrap').style.height = height.toString() + 'px'
                  })
                }
              })
              .catch(err => {
                this.loading = false
              })
            break;
          case 3:
            this.loading = true
            let dataFour = {
              currentPage:'1',
              pageRow:'10000'
            }
            this.httpCli({
              url:config.URL_ORDER_BERECEIVED_LIST,
              data:dataFour
            })
              .then(res => {
                this.loading = false
                if (res.errorCode == 100){
                  this.bereceivedList = res.data.orderList
                  setTimeout(()=>{
                    let height = document.getElementsByClassName('shopListWrap')[3].clientHeight + 150
                    document.getElementById('AllOrdersWrap').style.height = height.toString() + 'px'
//                    document.getElementsByClassName('detailTitle').map(item => item.innerHTML = item.innerHTML.substring(0,30) + '...')
                  })
                }
              })
              .catch(err => {
                this.loading = false
              })
            break;
          case 4:
            this.loading = true
            let dataFive = {
              currentPage:'1',
              pageRow:'10000'
            }
            this.httpCli({
              url:config.URL_ORDER_COMPLETE_LIST,
              data:dataFive
            })
              .then(res => {
                this.loading = false
                if (res.errorCode == 100){
                  this.completeList = res.data.orderList
                  setTimeout(()=>{
                    let height = document.getElementsByClassName('shopListWrap')[4].clientHeight + 150
                    document.getElementById('AllOrdersWrap').style.height = height.toString() + 'px'
                  })
                }
              })
              .catch(err => {
                this.loading = false
              })
            break;
        }
      }
    },
    computed:{

    },
    beforeRouteEnter(to, from, next) {
      to.query.status == 'to' ? to.meta.title = '进货订单' : to.meta.title = '全部订单'
      next()
    },
    beforeCreate(){

    },
    created(){

    },
    mounted(){
      if (this.$route.query.activeStatus){
        setTimeout(()=>{
          this.active = '0'
        },1)
        setTimeout(()=>{
          this.active = '1'
        },2)
        setTimeout(()=>{
          this.active = '2'
        },3)
        setTimeout(()=>{
          this.active = '3'
        },4)
        setTimeout(()=>{
          this.active = '4'
        },5)
        setTimeout(()=>{
          this.active = this.$route.query.activeStatus ? this.$route.query.activeStatus : '0'
        },6)
      }
//      window.addEventListener('scroll', this.onLoad)
    },
    destroyed(){
//      window.removeEventListener('scroll', this.onLoad)
    },
    methods:{
      onLoad(){
//        switch (this.active){
//          case 0:
//
//            break;
//          case 1:
//
//            break;
//          case 2:
//
//            break;
//          case 3:
//
//            break;
//          case 4:
//
//            break;
//        }
      },
      payOrder(orderNo,index){
        this.$toast.loading({
          mask: true,
          message: '结算中...',
          loadingType:'spinner',
          duration:0
        });
        this.$store.dispatch('getOrderInfoByOrderId',orderNo)
          .then(res => {
            this.$toast.clear()
            this.$router.push({path:'/PaymentMethods',query:{status:true}})
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      giveupOrder(orderId,index,status){
        this.$dialog.confirm({
          title: '提示',
          message: '确定要取消订单吗？'
        }).then(() => {
          let data = {
            orderId:orderId
          }
          this.httpCli({
            url:config.URL_ORDER_CANCEL,
            data:data
          })
            .then(res => {
              if (res.errorCode == 100){
                status == '1' ? this.allList.gridModel.splice(index,1) : this.bepauedList.gridModel.splice(index,1)
              }
            })
        }).catch(() => {

        });
      },
      logistic(expressType,orderId,expressSn,index){
        expressType == '2' ? this.$router.push({path:'/LogisticsList',query:{orderId:orderId}}) : this.$router.push({path:'/LogisticsInfo',query:{expressSn:expressSn}})
      },
      confirm(orderId,index,status){
        this.$dialog.confirm({
          title: '提示',
          message: '确定要确认收货吗？'
        }).then(() => {
          let data = {
            orderId:orderId
          }
          this.httpCli({
            url:config.URL_ORDER_CONFIRM,
            data:data
          })
            .then(res => {
              if (res.errorCode == 100){
                status == '1' ? this.allList.gridModel.splice(index,1) : this.bereceivedList.gridModel.splice(index,1)
              }
            })
        }).catch(() => {

        });
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
    width: 95%;
    border: 1PX #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    padding: 20px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top: 20px;
    margin-left: 2.5%;
  }
  .productStatus{
    padding-bottom: 20px;
    font-size: 24px;
    color: #f82a59;
  }
  .product:nth-child(1){
    margin-top: 30px;
  }
  .checkbox img {
    width: 36px;
    height:36px;
  }
  .shopInfo{
    width: 100%;
    display: flex;
    height:200px;
    margin-top: 30px;
  }
  .shopInfo:nth-child(1){
    margin-top: 0;
  }
  .imgWrap{
    width: 200px;
    height:200px;
    border: 1PX #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }
  .imgWrap img{
    height:100%;
  }
  .imgWrap img{
    height:100%;
  }
  .shopDetail{
    max-width: 380px;
    width: 100% !important;
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
    font-size: 20px;
    color: #666;
    margin-left: 25px;
  }
  .detailTitle{
    margin-top: 0px;
    text-align: justify;
    font-size: 28px;
    color: #333;
    /*word-break: break-all;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box; !** 对象作为伸缩盒子模型显示 **!*/
    /*-webkit-box-orient: vertical; !** 设置或检索伸缩盒对象的子元素的排列方式 **!*/
    /*-webkit-line-clamp: 2; !** 显示的行数 **!*/
    /*overflow: hidden;  !** 隐藏超出的内容 **!*/
  }
  .detailDescription{
    font-size: 20px;
    margin-top:-8px;
    color: #999;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height:100px;
  }
  .hotSaleCount{
    font-size: 30px;
    color: #f82a59;
  }
  .detailCount{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 100%;
    margin-top: 40px;
  }
  .detailCount div{
    display: flex;
    align-items: center;
  }
  .detailCount div p{
    width: 110px;
    height:44px;
    line-height: 44px;
    text-align: center;
    border: 1Px #999999 solid;
    border-radius: 22px;
    font-size: 20px;
    color: #666;
    position: relative;
  }
  .detailCount div p::before{
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
  .detailCount div p:active::before {
    opacity: 0.3;
  }
  .detailCount div p:nth-child(1){
    border: 1Px #f82a59 solid;
    color: #f82a59;
    margin-right: 15px;
  }
  /*.detailCount div p:nth-child(2){*/
    /*margin-right: 15px;*/
  /*}*/
  .detailCountAll{
    margin-top: 0px;
    justify-content: space-between;
  }
  .detailCountAll span{
    font-size: 20px;
    color: #666;
    line-height: 88px;
  }
  .spanCount{
    height:40px;
    line-height: 40px;
    font-size: 28px;
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
    font-size: 30px;
    color: #999;
    margin-top: 30px;
  }
</style>
