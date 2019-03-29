<template>
  <div style="background-color: #F3f3f3;min-height: 100vh" v-if="!loading">
    <div class="detailsContent">
      <van-swipe @change="onChange" class="vanSwiper">
        <van-swipe-item v-for="(item,index) in imgList" :key="index" @click="imgPreview(index)">
          <img :src="item" alt="">
        </van-swipe-item>

        <div class="custom-indicator" slot="indicator">
          {{ current + 1 }}/{{imgList.length}}
        </div>
      </van-swipe>
      <div class="goodDitails">
        <div class="goodMount">
          <div class="goodPirce">
            <p>{{gifList.packageTitle}}</p>
          </div>
          <div class="goodDescription">
            <img src="../assets/img/02/newPeopleGive.png" alt="">
            <span>{{gift}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="goodSpecifications" @click="chooiseGoodsStatus = true">
      <van-cell is-link class="goodSpecificationsCell">
        <!--<template slot="title" class="goodSpecificationsCellContent">-->
          <!--<span class="custom-text" style="color: #666;">已选：</span>-->
          <!--<span class="custom-text goodSpecificationsCellContentText">蜂蜜酵素苹果500ml</span>-->
        <!--</template>-->
        <template slot="title" class="goodSpecificationsCellContent">
          <span class="custom-text goodSpecificationsCellContentText" v-if="num">挑选商品：已选 {{num}} 件</span>
          <span class="custom-text goodSpecificationsCellContentText" v-else>挑选商品：点击挑选</span>
        </template>
      </van-cell>
    </div>

    <div class="teletextDetails">
      <div class="teletextDetailsHeader">
        <span>礼盒详情：</span>
      </div>
      <div class="teletextDetailsContent" v-html="gifList.packageContent">
        {{gifList.packageContent}}
      </div>
    </div>

    <div class="detailsFooter" @click="submit">
      <div class="footerButton">
        <p>参与活动</p>
      </div>
    </div>

    <van-popup v-model="chooiseGoodsStatus" position="right" :overlay="true" style="width: 100%;height: 100%;" :lock-scroll="true">
      <div class="noticeAssist">
        购买满 ￥998 即可参与新人有礼活动！
      </div>
      <div class="shopListWrap">
        <div class="product" v-for="(item,index) in goodsList.gridModel">
          <div class="shopInfo" @click.stop>
            <div class="imgWrap">
              <img :src="item.goodsThumb" alt="">
            </div>
            <div class="shopDetail">
              <p class="detailTitle">{{item.goodsTitle}}</p>
              <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
              <p class="detailDescription" v-else>{{item.goodsSubtitle}}</p>
              <div class="detailCount">
                <div>
                  <span style="color: #f82a59;" v-if="item.goodsVipPrice">￥{{item.goodsVipPrice}}</span>
                  <span style="color: #f82a59;" v-else>￥{{item.goodsMarketPrice}}</span>
                </div>
                <van-stepper
                  :value="item.count"
                  @plus="add(item.goodsId,item.goodsVipPrice,item.count,index)"
                  @minus="reduce(item.goodsId,item.goodsVipPrice,item.count,index)"
                  :min="0"
                  @change="changeNum"
                  @focus="focus(item.goodsId,index)"
                  @blur="blur(index)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-button class="buttonSummitAssist" type="default" @click="chooiseGoodsStatus = false">确定</van-button>
    </van-popup>
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
        current: 0,
        imgList:[],
        gift:'',
        chooiseGoodsStatus:false,
        loading:true,
        goodsId:'',
        goodsList:{},
        num:0,
      }
    },
    computed:{
      ...mapState({
        'gifList':state => state.goodDetils.gifList,
      }),
//      chooiseGoodsPrice(){
//        if (this.goodsList.gridModel && this.goodsList.gridModel.length){
//          return this.goodsList.gridModel.reduce((total,item) => total + (item.count > 0 ? item.count*1 : 0), 0)
//        }
//      }
    },
    watch:{

    },
    created(){
      this.$store.dispatch('getGiftDetails',this.$route.query.packageId)
        .then(res => {
          this.loading = false
          let giftList = []
          if (res.packageImages){
            this.imgList = this.gifList.packageImages.split(",")
          }
          if (res.goodsList.length){
            res.goodsList.map(item => {
              giftList.push(`${item.goodsTitle} x ${item.goodsNum}`)
            })
            giftList.length ? this.gift = giftList.join("，") : this.gift = '暂无赠品'
          }
        })
        .catch(err => {
          this.loading = false
        })

      let data = {
        currentPage:'1',
        pageRow:'10000'
      }
      this.httpCli({
        url:config.URL_SHOP_GOODS_LIST,
        data:data
      })
        .then(res => {
          if (res.errorCode == 100){
            this.goodsList = res.data.list
            this.goodsList.gridModel.map(item => item.count = 0)
          }
        })
    },
    mounted(){

    },
    methods:{
      onChange(index) {
        this.current = index;
      },
      add(goodsId,goodsMarketPrice,goodsNum,index){
        this.goodsList.gridModel.map((item,index) => {
          item.goodsId == goodsId ? item.count ++ : ''
        })
        this._getCount()
      },
      reduce(goodsId,goodsMarketPrice,goodsNum,index){
        this.goodsList.gridModel.map((item,index) => {
          item.goodsId == goodsId ? item.count -- : ''
        })
        this._getCount()
      },
      focus(goodsId,index){
        this.goodsId = goodsId
      },
      blur(){
        this.goodsId = ''
      },
      changeNum(value){
        if (this.goodsId){
          this.goodsList.gridModel.map((item,index) => {
            item.goodsId == this.goodsId ? item.count = value : ''
          })
          this._getCount()
        }
      },
      imgPreview(index){
        ImagePreview({
          images: this.imgList,
          startPosition: index,
          showIndicators:true
        })
      },
      submit(){
        let goodsList = []
        this.goodsList.gridModel.map((item,index) => {
          if (item.count != 0){
            let obj = {}
            obj.goodsId = item.goodsId
            obj.goodsNum = item.count
            goodsList.push(obj)
          }
        })
        if (!goodsList.length){
          common.toast('请先选择商品')
          this.chooiseGoodsStatus = true
          return
        }
        this.$toast.loading({
          mask: true,
          message: '结算中...',
          loadingType:'spinner',
          duration:0
        });
        let data = {
          packageId:this.$route.query.packageId,
          goodsList:JSON.stringify(goodsList)
        }
        this.$store.dispatch('getPayCalculate',data)
          .then(res => {
            this.$router.push({path:'/ConfirmOrders',query:{packageId:data.packageId,goodsList:data.goodsList,status:'1',from:'gift'}})
            this.$toast.clear()
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      _getCount(){
        let goodsList = []
        this.goodsList.gridModel.map((item,index) => {
          if (item.count != 0){
            goodsList.push(item.count)
          }
        })
        this.num = goodsList.reduce((total,item) => total + item ,0)
      }
    }
  }
</script>
<style scoped>
  .van-swipe{
    padding: 0px 0;
  }
  .van-swipe__track{
    position: relative;
  }
  .van-swipe-item{
    display: flex;
    justify-content: center;
    align-items: center;
    height:633px !important;
  }
  .detailsHeaderContent img{
    width: 22px;
    margin-right: 10px;
  }
  .detailsContent {
    /*margin-top: 120px;*/
    background-color: #ffffff;
  }
  .vanSwiper img{
    height:100%;
  }
  .custom-indicator{
    position: absolute;
    right: 40px;
    bottom: 40px;
    color: #999;
    height:20px;
  }
  .goodDitails{
    display: flex;
    border-top: 1px #ddd solid;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: space-between;
  }
  .goodMount{

  }
  .goodPirce{
    margin: 10px 0 0px 0;
    font-size: 30px;
    color: #000;
    display: flex;
    align-items: center;
  }
  .goodDescription{
    font-size: 30px;
    color: #333333;
    margin: 0px 0px 40px 8px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .goodDescription img{
    width: 70px;
    margin-right: 10px;
    margin-left: -4px;
  }
  .goodDescription span{
    color: #999999;
    font-size: 28px;
    margin-top: -5px;
  }
  .goodCollect img{
    width: 40px;
    margin-top: 50px;
  }
  .goodSpecifications{
    margin-top: 10px;
  }

  .goodSpecificationsCell{
    padding: 20px 20px;
  }
  .goodSpecificationsCellContent{

  }
  .goodSpecificationsCell .van-cell__title{
    display: flex;
    align-items: center;
  }
  .goodSpecificationsCellContent span{
    font-size: 30px;
    color: #666;
  }
  .goodSpecificationsCellContentText{
    display: inline-block;
    color: #333333;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .teletextDetails{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .teletextDetailsHeader{
    padding: 40px 20px;
  }
  .teletextDetailsHeader span{
    font-size: 30px;
    color: #666;
  }
  .teletextDetailsContent {
    padding: 0px 20px;
    height:2000px;
  }
  .detailsFooter{
    position: fixed;
    left:0;
    bottom: 0;
    width: 100%;
    height:100px;
    display: flex;
    border-top: 1px #ddd solid;
    background-color: #ffffff;
  }
  .footerButton{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #f82a59;
    color: #ffffff;
    font-size: 30px;
  }
  .footerButton::before{
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
  .footerButton:active::before {
    opacity: 0.3;
  }
  .footerButton img{
    width: 50px;
  }

  .noticeAssist{
    background-color: #fedae2;
    /*margin-top: 20px;*/
    height:80px;
    width: 100%;
    font-size: 24px;
    color: #ea1c4b;
    line-height: 80px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .goodsList{
    padding: 0px 20px 50px;
    margin-bottom: 100px;
  }
  .detailsFooter{
    position: fixed;
    left:0;
    bottom: 0;
    width: 100%;
    height:100px;
    display: flex;
    border-top: 1px #ddd solid;
    background-color: #ffffff;
  }
  .footerButton{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #f82a59;
    color: #ffffff;
    font-size: 30px;
  }
  .footerButton::before{
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
  .footerButton:active::before {
    opacity: 0.3;
  }
  .footerButton img{
    width: 50px;
  }

  .shopListWrap{
    width: 100%;
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
    max-width: 460px;
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
    margin-top:-20px;
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
  .buttonSummitAssist{
    width: 100%;
    height:96px;
    border-radius: 0;
    font-size: 30px;
    background-color: #f82a59;
    color: #ffffff;
    margin-top: 50px;
  }
</style>
