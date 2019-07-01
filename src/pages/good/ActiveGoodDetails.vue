<template>
  <div style="background-color: #F3f3f3;min-height: 100vh;" v-loading="loading">
    <div class="headerWrap" style="opacity: 0" id="headerWrap">
      <div class="detailsHeader">
        <div class="detailsIcon" @click="$router.back()">
          <van-icon name="arrow-left" />
        </div>
        <div class="detailsHeaderContent" @click.stop="changeHeaderGood">
          <img src="../../assets/img/position.png" alt="" v-if="headerStatus">
          <p :class="{detailsHeaderContentActive:headerStatus == true}">商品</p>
        </div>
        <div class="detailsHeaderContent" @click.stop="changeHeaderDetails">
          <img src="../../assets/img/position.png" alt="" v-if="!headerStatus">
          <p :class="{detailsHeaderContentActive:headerStatus == false}">详情</p>
        </div>
      </div>
    </div>

    <div>
      <div class="detailsContent" v-if="goodDetails">
        <van-swipe @change="onChange" class="vanSwiper" v-if="goodDetails.goodsImages">
          <van-swipe-item v-for="(item,index) in imgList" @touchstart="Touchstart" @touchmove="Touchmove" @touchend="Touchend(index)" :key="index">
            <img :src="item" alt="">
            <img class="goodListFalse" src="../../assets/img/goodEmpty.png" alt="" v-if="goodDetails.goodsOptionStatus == '1' && changeDetails.subGoodsStoreEmpty == '0'">
            <img class="goodListFalse" src="../../assets/img/goodEmpty.png" alt="" v-else-if="goodDetails.goodsOptionStatus == '0' && goodDetails.goodsStoreEmpty == '0'">
          </van-swipe-item>

          <div class="custom-indicator" slot="indicator">
            {{ current + 1 }}/{{imgList.length}}
          </div>
        </van-swipe>
        <div class="goodDitails">
          <div class="goodMount">
            <div class="goodPirceWrap">
              <!--<div class="goodPirce">-->
                <!--<span>￥{{goodDetails.goodsMarketPrice}}</span>-->
                <!--<s v-if="goodDetails.goodsMarketPrice != goodDetails.goodsProductPrice">￥{{goodDetails.goodsProductPrice}}</s>-->
              <!--</div>-->
              <div class="goodPirce">
                <span>￥0&nbsp;<s>市场价￥{{goodDetails.goodsMarketPrice}}</s></span>
              </div>
            </div>
            <div class="goodDescription">
              <div class="goodDescriptionTitle">
                <div v-if="goodDetails.goodsLabel" style="display: inline-block">
                  <div class="goodLabels" v-if="goodDetails.goodsLabel.indexOf(',') != -1">
                    <span v-for="(item,index) in label">
                      <div class="lableInfo">{{item}}</div>
                    </span>
                  </div>
                  <div class="goodLabels" v-else>
                    <span>
                      <div class="lableInfo">{{goodDetails.goodsLabel}}</div>
                    </span>
                  </div>
                </div>
                {{goodDetails.goodsTitle}}&nbsp;·&nbsp;{{goodDetails.goodsSubtitle}}
              </div>
         <!--     <div class="goodCollect">
                <div v-if="goodDetails.goodsIsCollect == '1'" @click="cancelCollectGoodsOptionFalse">
                  <img src="../../assets/img/shop/shopping_collation_checkTrue.png" alt="">
                  <div class="collectText" style="color: #F2180C;">已收藏</div>
                </div>
                <div v-else @click="collectGoodsOptionFalse">
                  <img src="../../assets/img/shop/shopping_collation_checkFalse.png" alt="">
                  <div class="collectText">收藏</div>
                </div>
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="goodSpecifications" v-waves>
        <van-cell class="goodSpecificationsCell" id="teletextDetails" @click="$router.push({path:'/AddressList',query:{status:true}})" v-if="$route.query.status">
          <template slot="title" class="goodSpecificationsCellContent">
            <span class="custom-text" style="color: #666;">收货地址：</span>
            <span class="custom-text goodSpecificationsCellContentText" v-if="address.addressId">{{address.address}}</span>
            <span class="custom-text goodSpecificationsCellContentText" v-else>点击选择</span>
          </template>
        </van-cell>
        <van-cell class="goodSpecificationsCell" id="teletextDetails" v-else>
          <template slot="title" class="goodSpecificationsCellContent">
            <span class="custom-text" style="color: #666;">活动商品</span>
          </template>
        </van-cell>
      </div>
      <div class="teletextDetails" v-if="contentImgList && contentImgList.length">
        <div class="teletextDetailsHeader">
          <span>图文详情：</span>
        </div>
      </div>
      <div class="teletextDetailsContent" v-if="contentImgList && contentImgList.length">
        <img :src="item" alt="" v-for="(item,index) in contentImgList">
      </div>

      <div class="activeButton" v-if="$route.query.status">
        <van-button v-waves round type="danger" @click="submit">参与换购</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState,mapGetters} from 'vuex'
  import Vue from 'vue'
  import { ImagePreview } from 'vant';
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  import {initWx} from '../../utils/weixin';
  export default {
    data() {
      return {
        headerStatus:true,
        current: 0,
        showSku:false,
        buyNum:'1',
        imgList:[],
        contentImgList:[],
        checkSubStatus:'',
        changeDetails:[],
        loading:false,
        label:[],
        stop:false,
        showExpressWay:false,
      }
    },
    computed:{
      ...mapState({
        'goodDetails':state => state.goodDetail.goodDetails,
        'address': state => state.funding.address,
      }),
    },
    watch:{
    },
    created(){
      this.loading = true
      this.$store.dispatch('getGoodDetails',this.$route.query.goodsId)
        .then(res => {
          this.loading = false
          if (res.goodsImages){
            this.imgList = this.goodDetails.goodsImages.split(",")
          }
          if (res.goodsContent){
            this.contentImgList = this.goodDetails.goodsContent.split(",")
          }
          if (res.goodsLabel.indexOf(',') != -1){
            this.label = this.goodDetails.goodsLabel.split(',')
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    mounted(){
      window.addEventListener('scroll', this.onLoad)
    },
    destroyed(){
      window.removeEventListener('scroll', this.onLoad)
    },

    methods:{
      onLoad(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let detailsOffset = document.getElementById('teletextDetails').offsetTop
        let headerWrapOffset = document.getElementById('headerWrap').offsetTop
        scrollTop < detailsOffset? this.headerStatus = true : this.headerStatus = false

        if (scrollTop > headerWrapOffset){
          document.getElementById('headerWrap').style.opacity = '1'
        }else {
          document.getElementById('headerWrap').style.opacity = '0'
        }
      },
      changeHeaderGood(){
        if (document.getElementById('headerWrap').style.opacity == '0'){
          return
        }
        if (!this.headerStatus){
          let timeOver = setInterval(()=>{
            let osTop = document.documentElement.scrollTop || document.body.scrollTop
            let ispeed = Math.floor(-osTop / 5)
            document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
            if (osTop === 0) {
              clearInterval(timeOver)
            }
          },30)
        }
      },
      changeHeaderDetails(){
        if (document.getElementById('headerWrap').style.opacity == '0'){
          return
        }
        if (this.headerStatus){
          let timeOver = setInterval(()=>{
            let osTop = document.documentElement.scrollTop || document.body.scrollTop
            let detailsOffset = document.getElementById('teletextDetails').offsetTop
            let ispeed = Math.floor((detailsOffset) / 10)
            document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
            if (osTop > (detailsOffset - 20)) {
              clearInterval(timeOver)
            }
          },30)
        }
      },
      onChange(index) {
        this.current = index;
      },
      Touchstart(e){
        this.stop = false
      },
      Touchmove(e){
        this.stop = true
      },
      Touchend(index){
        if (!this.stop){
          ImagePreview({
            images: this.imgList,
            startPosition: index,
            showIndicators:true
          })
        }
      },
      submit(){
        if (!this.address.addressId){
          common.toast('请选择收货地址')
          return
        }
        this.$dialog.confirm({
          title: '提示',
          message: `确定要0元换购此商品吗？`
        })
          .then(res => {
            this.$toast.loading({
              mask: true,
              message: '提交中...',
              loadingType:'spinner',
              duration:0
            });
            let data = {
              goodsId:this.goodDetails.goodsId,
              addressId:this.address.addressId
            }
            this.httpCli({
              url:config.URL_MEMBER_DIAMONDS_EXCHANGE_ORDER,
              data:data
            })
              .then(res => {
                this.$toast.clear()
                if (res.errorCode == 100){
                  this.$router.replace({path:'/PaySuccess',query:{totalAmount:'0.00',status:false,title:'换购成功'}})
                }
              })
              .catch(err => {
                this.$toast.clear()
              })
          })
          .catch(err => {

          })
      }
    }
  }
</script>
<style scoped>
  .headerWrap{
    position: fixed;
    width: 100%;
    top:0px;
    z-index: 99;
    transition: all 0.5s;
  }
  .detailsHeader{
    height:92px;
    /*border-bottom: 1PX #ddd solid;*/
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1PX 15px 3px #eee;
    background-color: #ffffff;
    position: relative;
  }
  .detailsIcon{
    position: absolute;
    left:28px;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    margin:2px 0 0 2px;
  }
  .detailsHeaderContent{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
    margin-left: 40px;
    background-color: #ffffff;
  }
  .detailsHeaderContent img{
    width: 22px;
    margin-right: 10px;
  }
  .detailsHeaderContentActive{
    color: #F2180C;
  }
  .detailsContent {
    background-color: #ffffff;
  }
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
    position: relative;
  }
  .goodListFalse{
    position: absolute;
    left: 280px;
    top:200px;
    width: 200px !important;
    height:200px !important;
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
    border-top: 1PX #ddd solid;
    padding: 0 25px 0 20px;
    box-sizing: border-box;
    justify-content: space-between;
  }
  .goodMount{

  }
  .vipCount{

  }
  .vipCount img{
    width: 29px;
  }
  .goodPirceWrap{
    margin: 49px 0 30px 0;
    font-size: 36px;
    color: #F2180C;
    display: flex;
    align-items: center;
  }
  .goodPirce{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .goodPirce span{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .goodPirceWrap s{
    font-size: 30px;
    color: #666;
    margin-right: 41px;
    margin-top: 3px;
  }
  .goodDescription{
    width:100%;
    font-size: 30px;
    color: #333333;
    margin: 0px 0px 60px 8px;
    text-align: justify;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .goodDescriptionTitle{

  }
  .goodDescriptionTitle .goodLabels{
    display: flex;
    justify-content: flex-start;
  }
  .goodDescriptionTitle .goodLabels span{
    border-radius: 20px;
    border: 1PX #F2180C solid;
    background-color: #F2180C;
    color: #fff !important;
    padding: 2px 10px;
    display: inline-block;
  }
  .lableInfo{
    font-size: 20px !important;
  }
  .goodCollect{
    font-size: 20px;
    color: #999;
    display: flex;
    flex-direction: column;
    align-content: center;
    white-space: nowrap;
    margin-left: 50px;
  }
  .goodCollect img{
    width: 40px;
    margin-bottom: 5px;
  }
  .goodCollect div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .collectText{
    width: 50px;
    text-align: center;
  }
  .goodSpecifications{
    margin-top: 10px;
  }

  .goodSpecificationsCell{
    padding: 40px 20px;
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
    padding-bottom: 110px;
    font-size: 0px;
  }
  .teletextDetailsContent img{
    width: 100%;
  }
  .activeButton{
    position: fixed;
    left:0;
    bottom: 30px;
    width: 100%;
  }
  .activeButton button{
    border: 0px;
    width: 90%;
    margin-left: 5%;
    height:80px;
    line-height: 80px;
    border-radius: 40px;
    font-size: 30px;
    background-color: #F2180C;
    box-shadow: 0px 5px 20px 0px rgba(255,41,28,0.2);
  }
</style>
