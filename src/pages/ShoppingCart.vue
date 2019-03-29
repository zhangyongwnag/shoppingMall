<template>
  <div class="ShoppingCartWrap" v-if="!loading">
    <span v-if="shopList.length" class="manageText" @click="manage">{{!manageStatus ? '管理' : '完成'}}</span>
    <div v-if="!shopList.length" class="emptyOther">
      <img src="../assets/img/02/emptyShoppingCart.png" alt="">
      <div>购物车是空的</div>
      <div>再不去抢购，宝贝就消失了</div>
      <div @click="toHome">去逛逛</div>
    </div>

    <div class="shopListWrap" v-else-if="!manageStatus">
      <div class="product" v-for="(item,index) in shopList" @click="changeGoodStatus(item.goodsId,item.checkStatus,index)">
        <div class="checkbox">
          <img src="../assets/img/03/shoppoingtrue.png" alt="" v-if="item.checkStatus">
          <img src="../assets/img/03/shoppoingFalse.png" alt="" v-else>
        </div>
        <div class="shopInfo">
          <div class="imgWrap">
            <img :src="item.goodsThumb" alt="">
          </div>
          <div class="shopDetail">
            <p class="detailTitle">{{item.goodsTitle}}</p>
            <p class="detailDescription">{{item.goodsSubtitle}}</p>
            <div class="detailCount" @click.stop>
              <div>
                <span style="color: #f82a59;" v-if="!item.goodsVipPrice">￥{{item.goodsMarketPrice}}</span>
                <span style="color: #f82a59;" v-else>￥{{item.goodsVipPrice}}</span>
              </div>
              <van-stepper
                :value="item.goodsNum"
                @plus="add(item.goodsId,item.goodsNum,item.checkStatus,index)"
                @minus="reduce(item.goodsId,item.goodsNum,item.checkStatus,index)"
                :min="1"
                async-change
                :disable-input="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shopListWrap" v-else>
      <div class="product" v-for="(item,index) in shopList" @click="changeGoodRemoveStatus(item.goodsId,item.checkStatus,index)">
        <div class="checkbox">
          <img src="../assets/img/03/shoppoingtrue.png" alt="" v-if="item.checkRemoveStatus">
          <img src="../assets/img/03/shoppoingFalse.png" alt="" v-else>
        </div>
        <div class="shopInfo">
          <div class="imgWrap">
            <img :src="item.goodsThumb" alt="">
          </div>
          <div class="shopDetail">
            <p class="detailTitle">{{item.goodsTitle}}</p>
            <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
            <p class="detailDescription" v-else>{{item.goodsSubtitle}}</p>
            <div class="detailCount">
              <div>
                <span style="color: #f82a59;" v-if="!item.goodsVipPrice">￥{{item.goodsMarketPrice}}</span>
                <span style="color: #f82a59;" v-else>￥{{item.goodsVipPrice}}</span>
              </div>
              <div class="spanCount">
                <span>x{{item.goodsNum}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer" v-if="shopList.length && !manageStatus">
      <van-submit-bar
        button-text="去结算"
        @submit="onSubmit"
        class="van-submit-barShoppingCart"
      >
        <div class="van-submit-barShoppingCartNum" v-if="finalPrice || finalVipPrice">
          共：<span>{{userInfo.memberType == '1' ? finalPrice : finalVipPrice}}</span>&nbsp;件
        </div>
        <van-checkbox ref="checkboxes" checked-color="#f82a59" v-model="checked" class="checkboxFinal">全选</van-checkbox>
      </van-submit-bar>
    </div>

    <div class="footer" v-else-if="shopList.length && manageStatus">
      <van-submit-bar
        :button-text="`刪除（${shopListRemoveCheckStatusTrue.length}）`"
        @submit="onRemove"
        class="van-submit-barShoppingCartRemove"
      >
        <van-checkbox v-model="checkedRemove" checked-color="#f82a59" class="checkboxFinal">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
  <div class="spinner" style="margin-top: 3rem;" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import {mapState,mapGetters} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  export default {
    data() {
      return {
        checked:'',
        manageStatus:false,
        checkedRemove:'',
        loading:true,
      }
    },
    computed:{
      ...mapState({
        'shopList':state => state.shopping.shopList,
        'userInfo':state => state.userInfo
      }),
      ...mapGetters(['finalPrice','finalVipPrice','shopListCheckStatusTrue','shopListRemoveCheckStatusTrue'])
    },
    watch:{
      checked(v){
        if (!this.shopList.length) return
        if (this.shopListCheckStatusTrue.length < this.shopList.length && v == false) return
        this.$store.dispatch('getCheckAllStatus',v)
      },
      checkedRemove(v){
        if (!this.shopList.length) return
        if (this.shopListRemoveCheckStatusTrue.length < this.shopList.length && v == false) return
        this.$store.dispatch('getCheckAllRemoveStatus',v)
      },
      shopListCheckStatusTrue(v){
        !v.length ? this.checked = false : ''
        if (v.length>0 && v.length == this.shopList.length){
          this.checked = true
        }else if (v.length < this.shopList.length) {
          this.checked = false
        }
      },
      shopListRemoveCheckStatusTrue(v){
        !v.length ? this.checkedRemove = false : ''
        if (v.length>0 && v.length == this.shopList.length){
          this.checkedRemove = true
        }else if (v.length < this.shopList.length) {
          this.checkedRemove = false
        }
      }
    },
    created(){
      this.$store.dispatch('getShopList')
        .then(res => {
          this.loading = false
        })
        .catch(err => {
          this.loading = false
        })

      this.$store.dispatch('getHomeList')
    },
    mounted(){

    },
    methods:{
      toHome(){
        document.getElementsByClassName('van-tabbar-item')[0].click()
      },
      changeGoodStatus(goodsId,checkStatus,index){
        let data = {
          goodsId:goodsId,
          checkStatus:checkStatus
        }
        this.$store.dispatch('changeGoodStatus',data)
      },
      add(goodsId,goodsNum,checkStatus,index){
        let data = {
          goodsId:goodsId,
          goodsNum:goodsNum,
          status:checkStatus,
        }
        this.$store.dispatch('addCount',data)
      },
      reduce(goodsId,goodsNum,checkStatus,index){
        let data = {
          goodsId:goodsId,
          goodsNum:goodsNum,
          status:checkStatus,
        }
        this.$store.dispatch('reduceCount',data)
      },
      onSubmit(){
        if (!this.shopListCheckStatusTrue.length){
          common.toast('暂无选择商品')
        }else {
          console.log(this.shopListCheckStatusTrue)
          this.$toast.loading({
            mask: true,
            message: '结算中...',
            loadingType:'spinner',
            duration:0
          });
          let goodsList = []
          this.shopListCheckStatusTrue.map((item,index) => {
            let obj = {}
            obj.goodsId = item.goodsId
            obj.goodsNum = item.goodsNum
            goodsList.push(obj)
          })
          let data = {
            packageId:'',
            goodsList:JSON.stringify(goodsList)
          }
          this.$store.dispatch('getPayCalculate',data)
            .then(res => {
              this.$router.push({path:'/ConfirmOrders',query:{packageId:data.packageId,goodsList:data.goodsList,status:'1',from:''}})
              this.$toast.clear()
            })
            .catch(err => {
              this.$toast.clear()
            })
        }
      },

      manage(){
        this.manageStatus = !this.manageStatus
      },
      changeGoodRemoveStatus(goodsId,checkRemoveStatus,index){
        let data = {
          goodsId:goodsId,
          checkRemoveStatus:checkRemoveStatus
        }
        this.$store.dispatch('changeGoodRemoveStatus',data)
      },
      onRemove(){
        let removeShopListID = []
        this.shopListRemoveCheckStatusTrue.map(item => removeShopListID.push(item.goodsId))
        if (removeShopListID.length){
          this.$dialog.confirm({
            title: '提示',
            message: `确认删除${removeShopListID.length}个商品吗？`
          }).then(() => {
            this.$store.dispatch('getRemoveShopList',removeShopListID)
            this.$store.dispatch('getHomeList')
          }).catch(() => {

          });
        }else {
          common.toast('请选择要删除的商品')
        }
      },
    }
  }
</script>
<style scoped>
  .manageText{
    width: 100%;
    display: inline-block;
    padding: 20px;
    text-align: right;
    box-sizing: border-box;
  }
  .ShoppingCartWrap{
    padding-bottom: 200px;
  }
  .emptyOther{
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .emptyOther img{
    width: 260px;
  }
  .emptyOther div:nth-child(2){
    font-size: 40px;
    color: #666;
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
  .emptyOther div:nth-child(4)::before{
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
  .emptyOther div:nth-child(4):active::before {
    opacity: 0.3;
  }
.shopListWrap{
  width: 100%;
  padding:0 0px;
  box-sizing: border-box;
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
    margin-top: 0px;
  }
  .checkbox{
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .checkbox img {
    width: 36px;
    height:36px;
  }
  .shopInfo{
    width: 100%;
    display: flex;
    height:200px;
  }
  .imgWrap{
    width: 200px;
    height:200px;
    border: 1Px #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }
  .imgWrap img{
    width:100%;
  }
  .shopDetail{
    max-width: 410px;
    width: 100% !important;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detailTitle{
    margin-top: 15px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 28px;
    color: #333;
  }
  .detailDescription{
    font-size: 20px;
    margin-top: -50px;
    color: #999;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .detailCount{
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
    font-size: 28px;
  }
  .spanCount{
    height:40px;
    line-height: 40px;
    font-size: 28px;
  }
  .footer{

  }
  .checkboxFinal{
    margin-left: 20px;
  }
  .van-submit-barShoppingCart{
    bottom: 101px;
    z-index: 0;
  }
  .van-submit-barShoppingCart button{
    background-color: #f82a59;
  }
  .van-submit-barShoppingCartRemove{
    bottom: 101px;
    z-index: 0;
    position: fixed;
  }
  .van-submit-barShoppingCartRemove button{
    background-color: #333333;
    border: 0px;
  }
  .van-submit-barShoppingCartNum {
    position: absolute;
    right: 280px;
    top:30px;
  }
  .van-submit-barShoppingCartNum span{
    font-size: 30px;
    color: #f82a59;
  }
</style>
