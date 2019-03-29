<template>
  <div class="wrap" v-if="!loading">
    <div class="shopListWrap" v-if="stockList.gridModel && stockList.gridModel.length">
      <div class="product" v-for="(item,index) in stockList.gridModel">
        <div class="shopInfo" @click.stop>
          <div class="imgWrap">
            <img :src="item.goodsThumb" alt="">
          </div>
          <div class="shopDetail">
            <p class="detailTitle">{{item.goodsTitle}}</p>
            <p class="detailDescription">{{item.goodsSubtitle}}</p>
            <div class="detailCount">
              <div>
                <span style="color: #f82a59;">库存数量：{{item.goodsNum}}</span>
              </div>
              <van-stepper
                :value="item.count"
                @plus="add(item.goodsId,item.goodsVipPrice,item.count,index)"
                @minus="reduce(item.goodsId,item.goodsVipPrice,item.count,index)"
                :min="0"
                :max="item.goodsNum"
                @change="changeNum"
                @focus="focus(item.goodsId,index)"
                @blur="blur(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <img src="../assets/img/empty.png" alt="">
      <p>暂时还没有商品</p>
    </div>
    <div class="footer" v-if="stockList.gridModel && stockList.gridModel.length">
      <van-button class="buttonSummitAssist" type="default" style="border-right: 1px #f82a59 solid;width: 50%" @click="submit">申请提货</van-button>
      <van-button class="buttonSummitAssist" type="default" style="width: 50%;" @click="$router.push({path:'/ToRestoking'})">我要进货</van-button>
    </div>
  </div>
  <div class="spinner" style="margin-top: 3rem" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import { mapState , mapGetters} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  import { ImagePreview } from 'vant';
  export default {
    data() {
      return {
        loading:false,
        stockList:{},
        goodsId:'',
      }
    },
    created(){
      this.loading = true
      let data = {
        currentPage:'1',
        pageRow:'10000'
      }
      this.httpCli({
        url:config.URL_DELIVERY_STOCK_LIST,
        data:data
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.stockList = res.data.list
            this.stockList.gridModel.map(item => item.count = '0')
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    computed:{

    },
    watch:{

    },
    mounted(){

    },
    methods:{
      add(goodsId,goodsMarketPrice,goodsNum,index){
        this.stockList.gridModel.map((item,index) => {
          item.goodsId == goodsId ? item.count ++ : ''
        })
      },
      reduce(goodsId,goodsMarketPrice,goodsNum,index){
        this.stockList.gridModel.map((item,index) => {
          item.goodsId == goodsId ? item.count -- : ''
        })
      },
      focus(goodsId,index){
        this.goodsId = goodsId
      },
      blur(){
        this.goodsId = ''
      },
      changeNum(value){
        if (this.goodsId){
          this.stockList.gridModel.map((item,index) => {
            item.goodsId == this.goodsId ? item.count = value : ''
          })
        }
      },
      submit(){
        let goodsList = []
        this.stockList.gridModel.map((item,index) => {
          if (item.count != 0){
            let obj = {}
            obj.goodsId = item.goodsId
            obj.goodsNum = item.count
            goodsList.push(obj)
          }
        })
        if (!goodsList.length){
          common.toast('请先选择商品')
          return
        }
        this.$toast.loading({
          mask: true,
          message: '结算中...',
          loadingType:'spinner',
          duration:0
        });
        let data = {
          goodsList:JSON.stringify(goodsList)
        }
        this.$store.dispatch('getDeliveryPayCalculate',data)
          .then(res => {
            this.$router.push({path:'/ConfirmOrders',query:{goodsList:data.goodsList,status:'2',from:'delivery'}})
            this.$toast.clear()
          })
          .catch(err => {
            this.$toast.clear()
          })
      }
    }
  }
</script>
<style scoped>
  .shopListWrap{
    width: 100%;
    box-sizing: border-box;
    padding: 30px 20px;
    padding-bottom: 140px;
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
    height:200px;
  }
  .imgWrap{
    width: 200px;
    height:200px;
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
  .imgWrap img{
    height:100%;
  }
  .shopDetail{
    max-width: 425px;
    width: 100% !important;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detailTitle{
    margin-top: 10px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 28px;
    color: #333;
  }
  .detailDescription{
    font-size: 20px;
    margin-top: -20px;
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
    font-size: 20px;
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
  .footer{
    display: flex;
    justify-content: space-around;
  }
  .footer button:nth-child(2){
    margin-left: 50%;
  }
</style>
