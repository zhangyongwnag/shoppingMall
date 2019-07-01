<template>
  <div v-loading="loading">
    <div class="ShoppingCartWrap" :style="(shopInfo.goodsList && !shopInfo.goodsList.length && !invalidGoodsList.length) ? {paddingTop:'0'} : {paddingTop:'1.227rem'}">
      <van-nav-bar
        :title="$route.meta.title"
        left-text=""
        :right-text="!manageStatus ? '管理' : '完成'"
        @click-right="manage"
        left-arrow
        @click-left="$router.back()"
        fixed
        v-if="shopInfo.goodsList && shopInfo.goodsList.length || invalidGoodsList.length"
      ></van-nav-bar>
      <div v-if="shopInfo.goodsList && shopInfo.goodsList.length">
        <div class="noticeAssist" v-if="shopInfo.orderMsg">
          {{shopInfo.orderMsg}}
        </div>
        <div class="shopListWrap" v-if="!manageStatus">
          <div class="productWrap">
            <!--        <div class="shopType">
                      <div class="typeTitle">
                        <img src="../../assets/img/shop/shopping_check.png" alt="">
                        &lt;!&ndash;<img src="../../assets/img/shop/shopping_checkNormal.png" alt="" v-else>&ndash;&gt;
                        <span>{{item.type}}</span>
                      </div>
                      <div class="gitPayment">
                        <div>
                          <span class="code">满减</span>
                          <span>已满1000元去打折</span>
                        </div>
                        <div>
                          去领取&nbsp;>&nbsp;
                        </div>
                      </div>
                    </div>-->
            <div class="product" v-for="(item,index) in shopInfo.goodsList"
                 @click.stop="changeGoodStatus(item.goodsId,item.goodsEt,index)">
              <div class="checkbox">
                <img src="../../assets/img/shop/shopping_check.png" alt="" v-if="item.goodsChooseStatus">
                <img src="../../assets/img/shop/shopping_checkNormal.png" alt="" v-else>
              </div>
              <div class="shopInfo">
                <div class="imgWrap">
                  <img :src="item.goodsThumb" alt="">
                  <div class="giftFree" v-if="item.goodsEt == '2'">
                    <span>现场</span>
                  </div>
                </div>
                <div class="shopDetail">
                  <div class="detailTitle">{{item.goodsTitle}}</div>
                  <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
                  <div class="detailDescription" v-else>{{item.goodsSubtitle}}</div>
                  <div class="detailCount" @click.stop>
                    <div>
                      <span style="color: #F2180C;">￥{{item.goodsMarketPrice}} <span v-if="item.goodsMarketProfit" style="font-size: 0.3rem">&nbsp;/&nbsp;省￥{{item.goodsMarketProfit * item.goodsNum}}</span></span>
                    </div>
                    <van-stepper
                      :value="item.goodsNum"
                      @plus="add(item.goodsId,index)"
                      @minus="reduce(item.goodsId,index)"
                      :min="1"
                      async-change
                      :disable-input="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="shopListWrap" v-else>
          <div class="productWrap">
            <!--        <div class="shopType">
                      <div class="typeTitle">
                        <img src="../../assets/img/shop/shopping_check_delete.png" alt="">
                        &lt;!&ndash;<img src="../../assets/img/shop/shopping_checkNormal.png" alt="" v-else>&ndash;&gt;
                        <span>{{item.type}}</span>
                      </div>
                      <div class="gitPayment">
                        <div>
                          <span class="code">满减</span>
                          <span>已满1000元去打折</span>
                        </div>
                        <div>
                          去领取&nbsp;>&nbsp;
                        </div>
                      </div>
                    </div>-->
            <div class="product" v-for="(item,index) in shopInfo.goodsList"
                 @click.stop="changeGoodStatus(item.goodsId,item.goodsEt,index)">
              <div class="checkbox">
                <img src="../../assets/img/shop/shopping_check_delete.png" alt="" v-if="item.checkRemoveStatus">
                <img src="../../assets/img/shop/shopping_checkNormal.png" alt="" v-else>
              </div>
              <div class="shopInfo">
                <div class="imgWrap">
                  <img :src="item.goodsThumb" alt="">
                  <div class="giftFree" v-if="item.goodsEt == '2'">
                    <span>现场</span>
                  </div>
                </div>
                <div class="shopDetail">
                  <div class="detailTitle">{{item.goodsTitle}}</div>
                  <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
                  <div class="detailDescription" v-else>{{item.goodsSubtitle}}</div>
                  <div class="detailCount" @click.stop>
                    <div>
                      <span style="color: #F2180C;">￥{{item.goodsMarketPrice}} <span v-if="item.goodsMarketProfit" style="font-size: 0.3rem">&nbsp;/&nbsp;省￥{{item.goodsMarketProfit * item.goodsNum}}</span></span>
                    </div>
                    <div class="spanCount">
                      <span>x{{item.goodsNum}}&nbsp;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="shopListWrap" v-if="invalidGoodsList.length">
        <div class="productWrap">
          <div class="shopType">
            <div class="typeTitle">
              <span>失效商品</span>
              <span style="font-weight: normal" v-if="manageStatus" @click="quickClear">快速清理</span>
            </div>
          </div>
          <div class="product productFail" v-for="(item,index) in invalidGoodsList">
            <div class="checkbox checkboxFail">
              <div>失效</div>
            </div>
            <div class="shopInfo">
              <div class="imgWrap">
                <img :src="item.goodsThumb" alt="">
                <div class="giftFree" v-if="item.goodsEt == '2'">
                  <span>现场</span>
                </div>
              </div>
              <div class="shopDetail" style="max-width: 4.8rem">
                <div class="detailTitle">{{item.goodsTitle}}</div>
                <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
                <div class="detailDescription" v-else>{{item.goodsSubtitle}}</div>
                <div class="detailCount" @click.stop>
                  <div>
                    <span style="color: #F2180C;">￥{{item.goodsMarketPrice}} <span v-if="item.goodsMarketProfit && item.goodsMarketProfit != '0'" style="font-size: 0.3rem">&nbsp;/&nbsp;省￥{{item.goodsMarketProfit}}</span></span>
                  </div>
                  x{{item.goodsNum}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="shopInfo.goodsList && shopInfo.goodsList.length">
        <div class="profitAmountInfo" v-if="resultInfo.profitAmount && resultInfo.profitAmount != '0'"><van-icon name="info-o" />下单可省:￥{{resultInfo.profitAmount}}</div>
        <div class="profitAmountInfo" v-else-if="shopInfo.profitAmount && shopInfo.profitAmount != '0'"><van-icon name="info-o" />下单可省:￥{{shopInfo.profitAmount}}</div>
        <footer v-if="!manageStatus">
          <div class="checkAll" @click="changeAllChooiseStatus">
            <img src="../../assets/img/shop/shopping_check.png" alt="" v-if="!changeAllStatus">
            <img src="../../assets/img/shop/shopping_checkNormal.png" alt="" v-else>
            全选
          </div>
          <div class="price">
            共：<span>￥{{resultInfo.totalAmount || shopInfo.totalAmount}}&nbsp;</span>
            <div v-if="resultInfo.expressFee > '0'">运费:￥{{resultInfo.expressFee}}</div>
            <div v-else-if="shopInfo.expressFee > '0'">运费:￥{{shopInfo.expressFee}}</div>
            <div v-else>免运费</div>
            <p @click="submit">立即结算</p>
          </div>
        </footer>

        <footer v-else>
          <div class="checkAll" @click="changeAllChooiseStatus">
            <img src="../../assets/img/shop/shopping_check_delete.png" alt="" v-if="!changeAllDeleteStatus">
            <img src="../../assets/img/shop/shopping_checkNormal.png" alt="" v-else>
            全选
          </div>
          <div class="price">
            <p @click="deleteGoods" style="background-color: #333333;">删除({{deleteTotal.length || '0'}})</p>
          </div>
        </footer>
      </div>
      <div v-if="shopInfo.goodsList && !shopInfo.goodsList.length && !invalidGoodsList.length" class="emptyOther">
        <img src="../../assets/img/emptyShoppingCart.png" alt="">
        <div>购物车是空的</div>
        <div>再不去抢购，宝贝就消失了</div>
        <div @click="$router.replace({path:'/Main/Home'})" v-waves>去逛逛</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState , mapGetters } from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data () {
      return {
        manageStatus: '',
        checked: false,
        checkedRemove: false,
      }
    },
    computed: {
      ...mapState({
        loading: state => state.shopping.loading,
        shopInfo: state => state.shopping.shopInfo,
        invalidGoodsList:state => state.shopping.invalidGoodsList,
        resultInfo:state => state.shopping.resultInfo,
      }),
      ...mapGetters(['changeAllStatus','changeAllDeleteStatus','deleteTotal'])
    },
    watch:{

    },
    created(){
      this.$store.dispatch('getShopInfo')
        .then(res => {
        })
        .catch(err => {

        })
    },
    destroyed(){
      this.$store.commit('clearResultInfo')
    },
    methods: {
      manage () {
        this.manageStatus = !this.manageStatus
      },
      changeGoodStatus(goodsId,goodsEt,index){
        let data = {
          goodsId:goodsId,
          goodsEt:goodsEt,
          manageStatus:this.manageStatus
        }
        this.$store.dispatch('changeGoodStatus',data)
      },
      changeAllChooiseStatus(){
        let data = {}
        if (!this.manageStatus){
          data = {
            status:this.changeAllStatus ? true : false,
            manageStatus:this.manageStatus
          }
        }else {
          data = {
            status:this.changeAllDeleteStatus ? true : false,
            manageStatus:this.manageStatus
          }
        }
        this.$store.dispatch('getAllChangeChooiseStatus',data)
      },
      add(goodsId,index){
        let data = {
          goodsId:goodsId
        }
        this.$store.dispatch('addCount',data)
      },
      reduce(goodsId,index){
        let data = {
          goodsId:goodsId
        }
        this.$store.dispatch('reduceCount',data)
      },
      quickClear(){
        this.$dialog.confirm({
          title: '提示',
          message: `确认清除失效商品吗？`
        }).then(() => {
          this.$store.dispatch('getClearInvalid')
        }).catch(() => {

        });
      },
      submit(){
        if (this.changeAllStatus == this.shopInfo.goodsList.length){
          common.toast('您还没有选择商品')
        }else {
          this.$toast.loading({
            mask: true,
            message: '结算中...',
            loadingType:'spinner',
            duration:0
          });
          let goodsList = []
          let chekcList = this.shopInfo.goodsList.filter(item => item.goodsChooseStatus == true)
          chekcList.map((item,index) => {
            let obj = {}
            obj.goodsId = item.goodsId
            obj.goodsNum = item.goodsNum
            obj.goodsEt = item.goodsEt
            goodsList.push(obj)
          })
          let data = {
            goodsList:JSON.stringify(goodsList),
            from:'cart',
          }
          this.$store.dispatch('getPayCalculate',data)
            .then(res => {
              this.$router.push({path:'/ConfirmOrders'})
              this.$toast.clear()
            })
            .catch(err => {
              this.$toast.clear()
            })
        }
      },
      deleteGoods(){
        let removeShopIdList = []
        let removeFilterShopIdList = []
        this.deleteTotal.map((item,index) => {
          let obj = {}
          let filterObj = {}
          obj.goodsId = item.goodsId
          obj.goodsEt = item.goodsEt
          filterObj.goodsCheckRemoveId = item.goodsId + item.goodsEt
          removeShopIdList.push(obj)
          removeFilterShopIdList.push(filterObj)
        })
        let data = {
          removeShopIdList:removeShopIdList,
          removeFilterShopIdList:removeFilterShopIdList
        }
        if (removeShopIdList.length){
          this.$dialog.confirm({
            title: '提示',
            message: `确认删除${removeShopIdList.length}个商品吗？`
          }).then(() => {
            this.$store.dispatch('getRemoveShopList',data)
          }).catch(() => {

          });
        }else {
          common.toast('请选择要删除的商品')
        }
      }
    }
  }
</script>
<style scoped>
  .ShoppingCartWrap {
    min-height: calc(100vh - 1.26rem);
    background-color: #f8f8f8;
    padding: 92px 0 170px 0;
    box-sizing: border-box;
  }
  .noticeAssist {
    width: 100%;
    box-sizing: border-box;
    height: 68px;
    line-height: 68px;
    padding-left: 10px;
    background-color: #fff7cc;
    color: #f56723;
    font-size: 22px;
  }
  .productWrap {
    width: 100%;
    padding: 0 0px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1PX #f8f8f8 solid;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    border-radius: 11px;
    overflow: hidden;
    margin-top: 30px;
    position: relative;
  }

  .productWrap:first-of-type {
    margin-top: 10px;
  }

  .shopType {
    padding: 30px 30px 0 30px;
    opacity: 0.4;
  }

  .shopType .typeTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
  }
  .shopType .typeTitle div{
    font-weight: normal !important;
  }

  .shopType .typeTitle img {
    width: 36px;
    height: 36px;
    margin-right: 20px;
  }

  .shopType .gitPayment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 18px 0 0 54px;
    font-size: 24px;
    color: rgb(51, 51, 51);
  }

  .shopType .gitPayment .code {
    padding: 5px 12px;
    background-color: rgb(242, 24, 12);
    border-radius: 50px;
    color: #ffffff;
    margin-right: 8px;
    font-size: 20px !important;
  }

  .product {
    width: 100%;
    border-bottom: 5PX #f8f8f8 solid;
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
    max-width: 390px;
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
    font-size: 28px;
  }

  .spanCount {
    height: 40px;
    line-height: 40px;
    font-size: 28px;
  }

  .profitAmountInfo{
    width: 100%;
    height:60px;
    position: fixed;
    bottom: 100px;
    background-color: #fff7cc;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #f56723;
    padding-left: 20px;
    box-sizing: border-box;
    font-size: 20px;
  }
  .profitAmountInfo i{
    margin-right: 10px;
    font-size: 24px !important;
  }

  footer{
    width: 100%;
    height:100px;
    border-top: 1PX #eee solid;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0px 0 20px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .checkAll{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .checkAll img{
    width: 36px;
    height:36px;
    margin-right: 5px;
  }
  .price{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .price span{
    font-size: 30px;
    color: #F2180C;
  }
  .price p{
    width: 240px;
    font-size: 32px;
    margin-left: 20px;
    background-color: #F2180C;
    height:100px;
    text-align: center;
    padding: 0 20px;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .price p span{
    font-size: 24px;
    color: #fff;
  }

  .emptyOther{
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .emptyOther img{
    width: 170px;
  }
  .emptyOther div:nth-child(2){
    font-size: 40px;
    color: #666;
    margin-top: 20px;
  }
  .emptyOther div:nth-child(3){
    font-size: 25px;
    color: #c8c9cc;
    margin-top: 20px;
  }
  .emptyOther div:nth-child(4){
    font-size: 25px;
    color: #999;
    padding: 15px 45px;
    border: 1PX #969799 solid;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-top: 40px;
    position: relative;
  }
</style>
