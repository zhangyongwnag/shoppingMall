<template>
  <div>
    <van-tabs v-model="active" swipeable :line-width="12" :swipe-threshold="6" :offset-top="0" :sticky="true"
              :lazy-render="true">
      <van-tab title="全部">
        <div v-loading="loading" style="min-height: 100vh">
          <div class="shopListWrap" v-if="allList.gridModel && allList.gridModel.length">
            <div class="product" v-for="(item,index) in allList.gridModel">
              <div class="productStatus">
            <span>
              <div class="productStatusIcon">
                <div style="background-color: #ffdf32" v-if="item.orderType == 'travel'" @click="checkTravel">旅<span></span></div>
                <div :style="item.orderType == 'buy' ? {backgroundColor:'#F2180C'} : {backgroundColor:'#ff8704'}" v-else>{{item.orderType == 'buy' ? '买' : '卖'}}</div>
                <div v-if="item.orderBuyerMemberType == '2' && item.orderType != 'buy'">钻</div>
              </div>
              {{item.orderNo}}
            </span>
                <span>{{item.orderStatusDesc}}</span>
              </div>
              <div class="shopInfo" v-for="(dataItem,dataIndex) in item.orderAbstractList"
                   @click="$router.push({path:'/OrderDetails',query:{orderNo:item.orderNo}})">
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
                      <span style="font-size: 0.31rem" v-if="dataItem.goodsStatus == '1' && dataItem.goodsProfitStatus">{{item.orderType == 'buy' ? '省' : '赚'}}<span style="font-size: 0.31rem;color: #333;">&nbsp;{{dataItem.goodsProfitStatus == '0' ? '？' : dataItem.goodsTotalMarketProfit}}</span></span>
                    </span>
                  </div>
                </div>
                <div class="shopNumber">x{{dataItem.goodsNum}}</div>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-top: 0.1rem">
                <span>共计{{item.orderGoodsTotalNum}}件商品&nbsp;合计：￥{{item.payActualAmount}}&emsp;<span>{{item.expressFee > 0 ? `运费：￥${item.expressFee}` : '免运费'}}</span></span>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-bottom:0.1rem" v-if="item.btnPayEnable == '1' || item.btnCancelEnable == '1' || item.btnConfirmEnable == '1'">
                <div>
                  <p v-if="item.btnPayEnable == '1'" @click="payOrder(item.orderNo,index,2)">付款</p>
                  <p v-if="item.btnCancelEnable == '1'" @click="giveupOrder(item.orderNo,index,2)">取消订单</p>
                  <!--<p v-if="item.btnExpressEnable == '1'" @click="logistic(item.expressType,item.orderId,item.expressSn,index)">查看物流</p>-->
                  <p v-if="item.btnConfirmEnable == '1'" @click="confirm(item.orderNo,index,2)">确认收货</p>
                </div>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-bottom: 0.1rem" v-if="item.payAdvStatus && item.payAdvStatus != 0">
                <div class="gitCount" v-if="item.payAdvStatus == '1'">
                  已获得宣传费￥？
                </div>
                <div class="gitCount" v-else-if="item.payAdvStatus == '2' && item.payAdvAmount > 0">
                  已获得宣传费{{item.payAdvAmount}}
                </div>
                <div class="gitCount" v-else-if="item.payAdvStatus == '2' && item.payAdvAmount == 0">
                  未获得宣传费
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
      <van-tab title="待付款">
        <div v-loading="loading" style="min-height: 100vh">
          <div class="shopListWrap" v-if="bepayedList.gridModel && bepayedList.gridModel.length">
            <div class="product" v-for="(item,index) in bepayedList.gridModel">
              <div class="productStatus">
            <span>
          <div class="productStatusIcon">
                <div style="background-color: #ffdf32" v-if="item.orderType == 'travel'" @click="checkTravel">旅<span></span></div>
                <div :style="item.orderType == 'buy' ? {backgroundColor:'#F2180C'} : {backgroundColor:'#ff8704'}" v-else>{{item.orderType == 'buy' ? '买' : '卖'}}</div>
                <div v-if="item.orderBuyerMemberType == '2' && item.orderType != 'buy'">钻</div>
              </div>
              {{item.orderNo}}
            </span>
                <span>{{item.orderStatusDesc}}</span>
              </div>
              <div class="shopInfo" v-for="(dataItem,dataIndex) in item.orderAbstractList"
                   @click="$router.push({path:'/OrderDetails',query:{orderNo:item.orderNo}})">
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
                      <span style="font-size: 0.31rem" v-if="dataItem.goodsStatus == '1' && dataItem.goodsProfitStatus">{{item.orderType == 'buy' ? '省' : '赚'}}<span style="font-size: 0.31rem;color: #333;">&nbsp;{{dataItem.goodsProfitStatus == '0' ? '？' : dataItem.goodsTotalMarketProfit}}</span></span>
                    </span>
                  </div>
                </div>
                <div class="shopNumber">x{{dataItem.goodsNum}}</div>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-top: 0.1rem">
                <span>共计{{item.orderGoodsTotalNum}}件商品&nbsp;合计：￥{{item.payActualAmount}}&emsp;<span>{{item.expressFee > 0 ? `运费：￥${item.expressFee}` : '免运费'}}</span></span>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-bottom:0.1rem" v-if="item.btnPayEnable == '1' || item.btnCancelEnable == '1' || item.btnConfirmEnable == '1'">
                <div>
                  <p v-if="item.btnPayEnable == '1'" @click="payOrder(item.orderNo,index,2)">付款</p>
                  <p v-if="item.btnCancelEnable == '1'" @click="giveupOrder(item.orderNo,index,2)">取消订单</p>
                  <!--<p v-if="item.btnExpressEnable == '1'" @click="logistic(item.expressType,item.orderId,item.expressSn,index)">查看物流</p>-->
                  <p v-if="item.btnConfirmEnable == '1'" @click="confirm(item.orderNo,index,2)">确认收货</p>
                </div>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-bottom: 0.1rem" v-if="item.payAdvStatus && item.payAdvStatus != 0">
                <div class="gitCount" v-if="item.payAdvStatus == '1'">
                  已获得宣传费￥？
                </div>
                <div class="gitCount" v-else-if="item.payAdvStatus == '2' && item.payAdvAmount > 0">
                  已获得宣传费{{item.payAdvAmount}}
                </div>
                <div class="gitCount" v-else-if="item.payAdvStatus == '2' && item.payAdvAmount == 0">
                  未获得宣传费
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
      <van-tab title="待发货">
        <div v-loading="loading" style="min-height: 100vh">
          <div class="shopListWrap" v-if="besendList.gridModel && besendList.gridModel.length">
            <div class="product" v-for="(item,index) in besendList.gridModel">
              <div class="productStatus">
            <span>
            <div class="productStatusIcon">
                <div style="background-color: #ffdf32" v-if="item.orderType == 'travel'" @click="checkTravel">旅<span></span></div>
                <div :style="item.orderType == 'buy' ? {backgroundColor:'#F2180C'} : {backgroundColor:'#ff8704'}" v-else>{{item.orderType == 'buy' ? '买' : '卖'}}</div>
                <div v-if="item.orderBuyerMemberType == '2' && item.orderType != 'buy'">钻</div>
              </div>
              {{item.orderNo}}
            </span>
                <span>{{item.orderStatusDesc}}</span>
              </div>
              <div class="shopInfo" v-for="(dataItem,dataIndex) in item.orderAbstractList"
                   @click="$router.push({path:'/OrderDetails',query:{orderNo:item.orderNo}})">
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
                      <span style="font-size: 0.31rem" v-if="dataItem.goodsStatus == '1' && dataItem.goodsProfitStatus">{{item.orderType == 'buy' ? '省' : '赚'}}<span style="font-size: 0.31rem;color: #333;">&nbsp;{{dataItem.goodsProfitStatus == '0' ? '？' : dataItem.goodsTotalMarketProfit}}</span></span>
                    </span>
                  </div>
                </div>
                <div class="shopNumber">x{{dataItem.goodsNum}}</div>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-top: 0.1rem">
                <span>共计{{item.orderGoodsTotalNum}}件商品&nbsp;合计：￥{{item.payActualAmount}}&emsp;<span>{{item.expressFee > 0 ? `运费：￥${item.expressFee}` : '免运费'}}</span></span>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-bottom:0.1rem" v-if="item.btnPayEnable == '1' || item.btnCancelEnable == '1' || item.btnConfirmEnable == '1'">
                <div>
                  <p v-if="item.btnPayEnable == '1'" @click="payOrder(item.orderNo,index,2)">付款</p>
                  <p v-if="item.btnCancelEnable == '1'" @click="giveupOrder(item.orderNo,index,2)">取消订单</p>
                  <!--<p v-if="item.btnExpressEnable == '1'" @click="logistic(item.expressType,item.orderId,item.expressSn,index)">查看物流</p>-->
                  <p v-if="item.btnConfirmEnable == '1'" @click="confirm(item.orderNo,index,2)">确认收货</p>
                </div>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-bottom: 0.1rem" v-if="item.payAdvStatus && item.payAdvStatus != 0">
                <div class="gitCount" v-if="item.payAdvStatus == '1'">
                  已获得宣传费￥？
                </div>
                <div class="gitCount" v-else-if="item.payAdvStatus == '2' && item.payAdvAmount > 0">
                  已获得宣传费{{item.payAdvAmount}}
                </div>
                <div class="gitCount" v-else-if="item.payAdvStatus == '2' && item.payAdvAmount == 0">
                  未获得宣传费
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
      <van-tab title="待收货">
        <div v-loading="loading" style="min-height: 100vh">
          <div class="shopListWrap" v-if="bereceivedList.gridModel && bereceivedList.gridModel.length">
            <div class="product" v-for="(item,index) in bereceivedList.gridModel">
              <div class="productStatus">
            <span>
        <div class="productStatusIcon">
                <div style="background-color: #ffdf32" v-if="item.orderType == 'travel'" @click="checkTravel">旅<span></span></div>
                <div :style="item.orderType == 'buy' ? {backgroundColor:'#F2180C'} : {backgroundColor:'#ff8704'}" v-else>{{item.orderType == 'buy' ? '买' : '卖'}}</div>
                <div v-if="item.orderBuyerMemberType == '2' && item.orderType != 'buy'">钻</div>
              </div>
              {{item.orderNo}}
            </span>
                <span>{{item.orderStatusDesc}}</span>
              </div>
              <div class="shopInfo" v-for="(dataItem,dataIndex) in item.orderAbstractList"
                   @click="$router.push({path:'/OrderDetails',query:{orderNo:item.orderNo}})">
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
                      <span style="font-size: 0.31rem" v-if="dataItem.goodsStatus == '1' && dataItem.goodsProfitStatus">{{item.orderType == 'buy' ? '省' : '赚'}}<span style="font-size: 0.31rem;color: #333;">&nbsp;{{dataItem.goodsProfitStatus == '0' ? '？' : dataItem.goodsTotalMarketProfit}}</span></span>
                    </span>
                  </div>
                </div>
                <div class="shopNumber">x{{dataItem.goodsNum}}</div>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-top: 0.1rem">
                <span>共计{{item.orderGoodsTotalNum}}件商品&nbsp;合计：￥{{item.payActualAmount}}&emsp;<span>{{item.expressFee > 0 ? `运费：￥${item.expressFee}` : '免运费'}}</span></span>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-bottom:0.1rem" v-if="item.btnPayEnable == '1' || item.btnCancelEnable == '1' || item.btnConfirmEnable == '1'">
                <div>
                  <p v-if="item.btnPayEnable == '1'" @click="payOrder(item.orderNo,index,2)">付款</p>
                  <p v-if="item.btnCancelEnable == '1'" @click="giveupOrder(item.orderNo,index,2)">取消订单</p>
                  <!--<p v-if="item.btnExpressEnable == '1'" @click="logistic(item.expressType,item.orderId,item.expressSn,index)">查看物流</p>-->
                  <p v-if="item.btnConfirmEnable == '1'" @click="confirm(item.orderNo,index,2)">确认收货</p>
                </div>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-bottom: 0.1rem" v-if="item.payAdvStatus && item.payAdvStatus != 0">
                <div class="gitCount" v-if="item.payAdvStatus == '1'">
                  已获得宣传费￥？
                </div>
                <div class="gitCount" v-else-if="item.payAdvStatus == '2' && item.payAdvAmount > 0">
                  已获得宣传费{{item.payAdvAmount}}
                </div>
                <div class="gitCount" v-else-if="item.payAdvStatus == '2' && item.payAdvAmount == 0">
                  未获得宣传费
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
          <div class="shopListWrap" v-if="completeList.gridModel && completeList.gridModel.length">
            <div class="product" v-for="(item,index) in completeList.gridModel">
              <div class="productStatus">
            <span>
     <div class="productStatusIcon">
                <div style="background-color: #ffdf32" v-if="item.orderType == 'travel'" @click="checkTravel">旅<span></span></div>
                <div :style="item.orderType == 'buy' ? {backgroundColor:'#F2180C'} : {backgroundColor:'#ff8704'}" v-else>{{item.orderType == 'buy' ? '买' : '卖'}}</div>
                <div v-if="item.orderBuyerMemberType == '2' && item.orderType != 'buy'">钻</div>
              </div>
              {{item.orderNo}}
            </span>
                <span>{{item.orderStatusDesc}}</span>
              </div>
              <div class="shopInfo" v-for="(dataItem,dataIndex) in item.orderAbstractList"
                   @click="$router.push({path:'/OrderDetails',query:{orderNo:item.orderNo}})">
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
                      <span style="font-size: 0.31rem" v-if="dataItem.goodsStatus == '1' && dataItem.goodsProfitStatus">{{item.orderType == 'buy' ? '省' : '赚'}}<span style="font-size: 0.31rem;color: #333;">&nbsp;{{dataItem.goodsProfitStatus == '0' ? '？' : dataItem.goodsTotalMarketProfit}}</span></span>
                    </span>
                  </div>
                </div>
                <div class="shopNumber">x{{dataItem.goodsNum}}</div>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-top: 0.1rem">
                <span>共计{{item.orderGoodsTotalNum}}件商品&nbsp;合计：￥{{item.payActualAmount}}&emsp;<span>{{item.expressFee > 0 ? `运费：￥${item.expressFee}` : '免运费'}}</span></span>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-bottom:0.1rem" v-if="item.btnPayEnable == '1' || item.btnCancelEnable == '1' || item.btnConfirmEnable == '1'">
                <div>
                  <p v-if="item.btnPayEnable == '1'" @click="payOrder(item.orderNo,index,2)">付款</p>
                  <p v-if="item.btnCancelEnable == '1'" @click="giveupOrder(item.orderNo,index,2)">取消订单</p>
                  <!--<p v-if="item.btnExpressEnable == '1'" @click="logistic(item.expressType,item.orderId,item.expressSn,index)">查看物流</p>-->
                  <p v-if="item.btnConfirmEnable == '1'" @click="confirm(item.orderNo,index,2)">确认收货</p>
                </div>
              </div>
              <div class="detailCount detailCountAll" @click.stpo style="margin-bottom: 0.1rem" v-if="item.payAdvStatus && item.payAdvStatus != 0">
                <div class="gitCount" v-if="item.payAdvStatus == '1'">
                  已获得宣传费￥？
                </div>
                <div class="gitCount" v-else-if="item.payAdvStatus == '2' && item.payAdvAmount > 0">
                  已获得宣传费{{item.payAdvAmount}}
                </div>
                <div class="gitCount" v-else-if="item.payAdvStatus == '2' && item.payAdvAmount == 0">
                  未获得宣传费
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
    </van-tabs>

    <van-popup v-model="showPayPopup" position="bottom" overlay>
      <div class="payPopup">
        <div @click="wxPay">
          <img src="../../assets/img/finance/finance_pay_wx.png" alt="">
          微信支付
        </div>
        <div @click="mountPay">
          <img src="../../assets/img/finance/finance_pay_mount.png" alt="">
          余额支付&nbsp;
          <span v-if="userInfo.memberPayPasswordStatus == '0'">(未设置支付密码，点击设置)</span>
          <span v-else><span style="font-size: 0.31rem;color: #F2180C;">(&nbsp;余额:&nbsp;￥{{orderInfo.balance}}&nbsp;)</span></span>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="show" position="bottom" :overlay="true" style="width: 100%;height: 100%;background-color: #fff">
      <!-- 密码输入框 -->
      <van-password-input
        :value="password"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
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
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  import * as wx from '../../utils/weixin'
  import * as m from '../../utils/md5.min'

  export default {
    data () {
      return {
        loading: false,
        active: sessionStorage.getItem('activeTab') || 0,
        userInfo: {},
        allList: {},
        bepayedList: {},
        besendList: {},
        bereceivedList: {},
        completeList: {},
        showPayPopup: false,
        show: false,
        password: '',
        showKeyboard: true,
        status: '',
        index: '',
        orderInfo:{}
      }
    },
    watch: {
      active: {
        handler (v) {
          switch (v) {
            case 0:
              sessionStorage.setItem('activeTab', 0)
              this.loading = true
              let dataOne = {
                currentPage: '1',
                pageRow: '10000'
              }
              this.httpCli({
                url: config.URL_ORDER_ALL_LIST,
                data: dataOne
              })
                .then(res => {
                  this.loading = false
                  if (res.errorCode == 100) {
                    this.allList = res.data.orderList
                  }
                })
                .catch(err => {
                  this.loading = false
                })
              break
            case 1:
              sessionStorage.setItem('activeTab', 1)
              this.loading = true
              let dataTwo = {
                currentPage: '1',
                pageRow: '10000'
              }
              this.httpCli({
                url: config.URL_ORDER_BEPAYED_LIST,
                data: dataTwo
              })
                .then(res => {
                  this.loading = false
                  if (res.errorCode == 100) {
                    this.bepayedList = res.data.orderList
                  }
                })
                .catch(err => {
                  this.loading = false
                })
              break
            case 2:
              sessionStorage.setItem('activeTab', 2)
              this.loading = true
              let dataThree = {
                currentPage: '1',
                pageRow: '10000'
              }
              this.httpCli({
                url: config.URL_ORDRR_BESEND_LIST,
                data: dataThree
              })
                .then(res => {
                  this.loading = false
                  if (res.errorCode == 100) {
                    this.besendList = res.data.orderList
                  }
                })
                .catch(err => {
                  this.loading = false
                })
              break
            case 3:
              sessionStorage.setItem('activeTab', 3)
              this.loading = true
              let dataFour = {
                currentPage: '1',
                pageRow: '10000'
              }
              this.httpCli({
                url: config.URL_ORDER_BERECEIVED_LIST,
                data: dataFour
              })
                .then(res => {
                  this.loading = false
                  if (res.errorCode == 100) {
                    this.bereceivedList = res.data.orderList
                  }
                })
                .catch(err => {
                  this.loading = false
                })
              break
            case 4:
              sessionStorage.setItem('activeTab', 4)
              this.loading = true
              let dataFive = {
                currentPage: '1',
                pageRow: '10000'
              }
              this.httpCli({
                url: config.URL_ORDER_COMPLETE_LIST,
                data: dataFive
              })
                .then(res => {
                  this.loading = false
                  if (res.errorCode == 100) {
                    this.completeList = res.data.orderList
                  }
                })
                .catch(err => {
                  this.loading = false
                })
              break
          }
        },
        immediate: true
      },
      password (v) {
        if (v.length == '6') {
          this.$toast.loading({
            mask: true,
            message: '提交中...',
            loadingType: 'spinner',
            duration: 0
          })
          let data = {
            orderNo: this.orderInfo.order.orderNo,
            payPasswd: m.md5(v)
          }
          this.httpCli({
            url: config.URL_PAY_BALANCE,
            data: data
          })
            .then(res => {
              this.$toast.clear()
              if (res.errorCode == 100) {
                this.show = false
                this.showPayPopup = false
                this.password = ''
                this.status == '1' ? this.allList.gridModel.splice(this.index, 1) : this.bepayedList.gridModel.splice(this.index, 1)
                this.$toast.success('支付成功')
              } else {
                this.password = ''
                this.showKeyboard = true
              }
            })
            .catch(err => {
              this.$toast.clear()
              this.password = ''
              this.showKeyboard = true
            })
        }
      }
    },
    created () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    beforeRouteLeave (to, from, next) {
      if (to.name == 'PersonCenter') {
        sessionStorage.removeItem('activeTab')
      }
      next()
    },
    methods: {
      onInput (key) {
        if (key != '返回') {
          this.password = (this.password + key).slice(0, 6)
        } else {
          this.show = false
        }
      },
      onDelete () {
        this.password = this.password.slice(0, this.password.length - 1)
      },
      checkTravel(){
        this.$dialog.alert({
          message: '行程中的订单',
          confirmButtonText:'我知道了'
        }).then(() => {

        });
      },
      payOrder (orderNo, index, status) {
        this.status = status
        this.index = index
        this.$toast.loading({
          mask: true,
          message: '结算中...',
          loadingType: 'spinner',
          duration: 0
        })
        this.$store.dispatch('getOrderInfoByOrderId', orderNo)
          .then(res => {
            this.orderInfo = res
            if (this.userInfo.memberType == '2' && this.orderInfo.balance != '0' && this.orderInfo.balance != '0.00') {
              this.showPayPopup = true
              this.$toast.clear()
            } else {
              this.wxPay()
            }
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      giveupOrder (orderNo, index, status) {
        this.$dialog.confirm({
          title: '提示',
          message: '确定要取消订单吗？'
        }).then(() => {
          this.$toast.loading({
            mask: true,
            message: '取消中...',
            loadingType: 'spinner',
            duration: 0
          })
          let data = {
            orderNo: orderNo
          }
          this.httpCli({
            url: config.URL_ORDER_CANCEL,
            data: data
          })
            .then(res => {
              this.$toast.clear()
              if (res.errorCode == 100) {
                status == '1' ? this.allList.gridModel.splice(index, 1) : this.bepayedList.gridModel.splice(index, 1)
              }
            })
            .catch(err => {
              this.$toast.clear()
            })
        }).catch(() => {

        })
      },
      logistic (expressType, orderId, expressSn, index) {
        expressType == '2' ? this.$router.push({
          path: '/LogisticsList',
          query: {orderId: orderId}
        }) : this.$router.push({path: '/LogisticsInfo', query: {expressSn: expressSn}})
      },
      confirm (orderNo, index, status) {
        this.$dialog.confirm({
          title: '提示',
          message: '确定要确认收货吗？'
        }).then(() => {
          this.$toast.loading({
            mask: true,
            message: '确认中...',
            loadingType: 'spinner',
            duration: 0
          })
          let data = {
            orderNo: orderNo
          }
          this.httpCli({
            url: config.URL_ORDER_CONFIRM,
            data: data
          })
            .then(res => {
              this.$toast.clear()
              if (res.errorCode == 100) {
                status == '1' ? this.allList.gridModel.splice(index, 1) : this.bereceivedList.gridModel.splice(index, 1)
              }
            })
            .catch(err => {
              this.$toast.clear()
            })
        }).catch(() => {

        })
      },
      wxPay () {
        wx._onBridgeReady(this.orderInfo.order.orderNo)
          .then(res => {
            if (res == 'ok') {
              this.showPayPopup = false
              this.$toast.success('支付成功')
              this.status == '1' ? this.allList.gridModel.splice(this.index, 1) : this.bepayedList.gridModel.splice(this.index, 1)
            } else {
              this.$toast.fail('取消支付')
              this.loadingText = '支付988元成为钻石会员'
            }
          })
          .catch(err => {
            this.$toast.fail('支付失败')
            this.loadingText = '支付988元成为钻石会员'
          })
      },
      mountPay () {
        if (this.userInfo.memberPayPasswordStatus == '0') {
          this.$router.push({path: '/SetPaypwd', query: {status: false}})
        } else {
          this.$toast.loading({
            mask: true,
            message: '提交中...',
            loadingType: 'spinner',
            duration: 0
          })
          setTimeout(() => {
            this.$toast.clear()
            this.show = true
            this.showKeyboard = true
          }, 500)
        }
      },
    }
  }
</script>
<style scoped>
  .shopListWrap {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 50px;
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
    margin-top: 28px;
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
    justify-content: flex-end;
    min-width: 100%;
    height: 60px;
  }

  .detailCount div {
    display: flex;
    align-items: center;
  }

  .detailCount div p {
    width: 140px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border: 1Px rgb(102, 102, 102) solid;
    border-radius: 24px;
    font-size: 24px;
    color: rgb(102, 102, 102);
    position: relative;
    margin-left: 30px;
  }

  .detailCount div p:nth-child(1) {
    border: 1Px #F2180C solid;
    color: #F2180C;
    margin-left: 0;
  }

  .detailCountAll span {
    font-size: 22px;
    color: #666;
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

  .payPopup {
    padding: 40px 46px;
    box-sizing: border-box;
    font-size: 32px;
  }

  .payPopup div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .payPopup div img {
    width: 80px;
    margin-right: 20px;
  }

  .payPopup div:nth-child(1) {
    margin-bottom: 46px;
  }
</style>
