<template>
  <div style="background-color: #F3f3f3;min-height: 100vh;">
    <div class="headerWrap" style="opacity: 0" id="headerWrap">
      <div class="detailsHeader">
        <div class="detailsIcon" @click="$router.back()">
          <van-icon name="arrow-left" />
        </div>
        <div class="detailsHeaderContent" @click.stop="changeHeaderGood">
          <img src="../assets/img/02/position.png" alt="" v-if="headerStatus">
          <p :class="{detailsHeaderContentActive:headerStatus == true}">商品</p>
        </div>
        <div class="detailsHeaderContent" @click.stop="changeHeaderDetails">
          <img src="../assets/img/02/position.png" alt="" v-if="!headerStatus">
          <p :class="{detailsHeaderContentActive:headerStatus == false}">详情</p>
        </div>
      </div>
    </div>

    <div v-if="!loading">
      <div class="detailsContent" v-if="goodDetails">
        <van-swipe @change="onChange" class="vanSwiper" v-if="goodDetails.goodsImages">
          <van-swipe-item v-for="(item,index) in imgList" :key="index" @click="imgPreview(index)">
            <img :src="item" alt="">
            <img class="goodListFalse" src="../assets/img/02/goodsListFalse.png" alt="" v-if="goodDetails.goodsOptionStatus == '1' && changeDetails.subGoodsStoreEmpty == '0'">
            <img class="goodListFalse" src="../assets/img/02/goodsListFalse.png" alt="" v-else-if="goodDetails.goodsOptionStatus == '0' && goodDetails.goodsStoreEmpty == '0'">
          </van-swipe-item>

          <div class="custom-indicator" slot="indicator">
            {{ current + 1 }}/{{imgList.length}}
          </div>
        </van-swipe>
        <div class="goodDitails">
          <div class="goodMount">
            <div class="goodPirceWrap" v-if="goodDetails.goodsOptionStatus == '1'">
              <div class="goodPirce" v-if="changeDetails.subGoodsVipPrice">
                <span class="vipCount">
                  <img src="../assets/img/02/vip.png" alt="">
                  ￥{{changeDetails.subGoodsVipPrice}}
                </span>
                <!--<span>￥{{changeDetails.subGoodsVipPrice}}</span>-->
                <s v-if="changeDetails.subGoodsMarketPrice != changeDetails.subGoodsVipPrice">￥{{changeDetails.subGoodsMarketPrice}}</s>
              </div>
              <div class="goodPirce" v-else>
                <span>￥{{changeDetails.subGoodsMarketPrice}}</span>
                <s v-if="changeDetails.subGoodsProductPrice != changeDetails.subGoodsMarketPrice">￥{{changeDetails.subGoodsProductPrice}}</s>
              </div>
              <div v-if="goodDetails.goodsLabel">
                <div class="goodLabels" v-if="goodDetails.goodsLabel.indexOf(',') != -1">
                  <span v-for="(item,index) in label">{{item}}</span>
                </div>
                <div class="goodLabels" v-else>
                  <span>{{goodDetails.goodsLabel}}</span>
                </div>
              </div>
            </div>
            <div class="goodPirceWrap" v-else>
              <div class="goodPirce" v-if="goodDetails.goodsVipPrice">
                <span class="vipCount">
                  <img src="../assets/img/02/vip.png" alt="">
                  ￥{{goodDetails.goodsVipPrice}}
                </span>
                <!--<span>￥{{goodDetails.goodsVipPrice}}</span>-->
                <s v-if="goodDetails.goodsMarketPrice != goodDetails.goodsVipPrice">￥{{goodDetails.goodsMarketPrice}}</s>
              </div>
              <div class="goodPirce" v-else>
                <span>￥{{goodDetails.goodsMarketPrice}}</span>
                <s v-if="goodDetails.goodsMarketPrice != goodDetails.goodsProductPrice">￥{{goodDetails.goodsProductPrice}}</s>
              </div>
              <div v-if="goodDetails.goodsLabel">
                <div class="goodLabels" v-if="goodDetails.goodsLabel.indexOf(',') != -1">
                  <span v-for="(item,index) in label">{{item}}</span>
                </div>
                <div class="goodLabels" v-else>
                  <span>{{goodDetails.goodsLabel}}</span>
                </div>
              </div>
            </div>
            <div class="goodDescription">
              {{goodDetails.goodsTitle}}
            </div>
          </div>
          <div class="goodCollect" v-if="goodDetails.goodsOptionStatus == '1'">
            <div v-if="changeDetails.goodsIsCollect == '1'" @click="cancelCollectGoodsOptionTrue">
              <img src="../assets/img/02/collectTrue.png" alt="">
              <div class="collectText">已收藏</div>
            </div>
            <div v-else @click="collectGoodsOptionTrue">
              <img src="../assets/img/02/collectFalse.png" alt="">
              <div class="collectText">收藏</div>
            </div>
          </div>
          <div class="goodCollect" v-else>
            <div v-if="goodDetails.goodsIsCollect == '1'" @click="cancelCollectGoodsOptionFalse">
              <img src="../assets/img/02/collectTrue.png" alt="">
              <div class="collectText">已收藏</div>
            </div>
            <div v-else @click="collectGoodsOptionFalse">
              <img src="../assets/img/02/collectFalse.png" alt="">
              <div class="collectText">收藏</div>
            </div>
          </div>
        </div>
      </div>

      <div class="goodSpecifications" @click="showSku = true">
        <van-cell is-link class="goodSpecificationsCell" id="teletextDetails">
          <template slot="title" class="goodSpecificationsCellContent">
            <span class="custom-text" style="color: #666;">已选：</span>
            <span class="custom-text goodSpecificationsCellContentText" v-if="goodDetails.goodsOptionStatus == '1'">{{changeDetails.subGoodsSpecName}}<span v-if="changeDetails.subGoodsStoreEmpty != '0'">,{{buyNum}}件</span></span>
            <span class="custom-text goodSpecificationsCellContentText" v-else>{{buyNum}}&nbsp;件</span>
          </template>
        </van-cell>
      </div>

      <div class="teletextDetails" v-if="goodDetails && goodDetails.goodsContent">
        <div class="teletextDetailsHeader">
          <span>图文详情：</span>
        </div>
        <div class="teletextDetailsContent" v-html="goodDetails.goodsContent">
          {{goodDetails.goodsContent}}
        </div>
      </div>

      <div v-if="goodDetails.goodsOptionStatus == '1'">
        <div class="detailsFooter" v-if="changeDetails.subGoodsStoreEmpty != '0'">
          <div class="footerButton" @click="$router.push({path:'/Main/Home'})">
            <img src="../assets/img/02/toindex.png" alt="">
          </div>
          <!--<div class="footerButton">-->
            <!--<img src="../assets/img/02/kefu.png" alt="">-->
          <!--</div>-->
          <div class="footerButton" @click="addGoodsOptionTrueRouter">
            <img src="../assets/img/02/addshopping.png" alt="">
          </div>
          <div class="footerButton addshopping" @click="showSku = true">
            <p>加入购物车</p>
          </div>
          <div class="footerButton buy" @click="showSku = true">
            <p>立即购买</p>
          </div>
        </div>

        <div class="detailsFooter" v-else>
          <div v-if="changeDetails.goodsIsCollect == '0'" class="footerButton addCollect" @click="collectGoodsOptionTrue">
            <p>加入收藏</p>
          </div>
          <div class="footerButton addCollect" @click="cancelCollectGoodsOptionTrue" v-else>
            <p>取消收藏</p>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="detailsFooter" v-if="goodDetails.goodsStoreEmpty != '0'">
          <div class="footerButton" @click="$router.push({path:'/Main/Home'})">
            <img src="../assets/img/02/toindex.png" alt="">
          </div>
          <!--<div class="footerButton">-->
            <!--<img src="../assets/img/02/kefu.png" alt="">-->
          <!--</div>-->
          <div class="footerButton" @click="addGoodsOptionFalseRouter">
            <img src="../assets/img/02/addshopping.png" alt="">
          </div>
          <div class="footerButton addshopping" @click="showSku = true">
            <p>加入购物车</p>
          </div>
          <div class="footerButton buy" @click="showSku = true">
            <p>立即购买</p>
          </div>
        </div>

        <div class="detailsFooter" v-else>
          <div class="footerButton addCollect" @click="collectGoodsOptionFalse" v-if="goodDetails.goodsIsCollect != '1'">
            <p>加入收藏</p>
          </div>
          <div class="footerButton addCollect" @click="cancelCollectGoodsOptionFalse" v-else>
            <p>取消收藏</p>
          </div>
        </div>
      </div>
    </div>
    <div class="spinner" style="padding-top: 3rem;" v-else>
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>


    <van-popup v-model="showSku" position="bottom" :overlay="true" :lock-scroll="true">
      <div class="skuContnet">
        <div class="skuHeader">
          <div class="skuHeaderImgWrap">
            <img :src="changeDetails.subGoodsThumb" alt="" v-if="goodDetails.goodsOptionStatus == '1'">
            <img :src="imgList[0]" alt="" v-else>
          </div>
          <div class="skuHeaderDetails" v-if="goodDetails.goodsOptionStatus == '1'">
            <p v-if="changeDetails.subGoodsVipPrice">￥{{changeDetails.subGoodsVipPrice}}</p>
            <p v-else>￥{{changeDetails.subGoodsMarketPrice}}</p>
            <div>已选：<span>{{changeDetails.subGoodsSpecName}}</span></div>
          </div>
          <div class="skuHeaderDetails" v-else>
            <p v-if="goodDetails.goodsVipPrice">￥{{goodDetails.goodsVipPrice}}</p>
            <p v-else>￥{{goodDetails.goodsMarketPrice}}</p>
            <!--<div>已选：<span>{{goodDetails.goodsDefaultSpecName}}</span></div>-->
          </div>
          <div class="skuHeaderClose" @click="showSku = false">
            <van-icon name="close" />
          </div>
        </div>
        <div class="skuMiddle" v-if="goodDetails.goodsOptionStatus == '1'">
          <div v-for="(item,index) in goodDetails.goodSpecList">
            <p>{{item.specTitle}}</p>
            <div style="overflow: scroll;">
              <div class="skuMiddleClass">
                <div style="display: flex">
                  <div :class="{skuMiddleClassSpanActive:detail.checkStatus == true}" class="skuMiddleClassSpan" v-for="(detail,keyIndex) in item.specItemList" @click="checkSubStatusClick(detail.itemId,index,keyIndex)">{{detail.itemTitle}}</div>
                  <!--<span class="skuMiddleClassSpan skuMiddleClassSpanActive">蜂蜜柠檬</span>-->
                  <!--<span class="skuMiddleClassSpan skuMiddleClassSpanFail">蜂蜜柠檬</span>-->
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="skuFooter" v-if="goodDetails.goodsOptionStatus == '1'">
          <van-cell-group v-if="changeDetails.subGoodsStoreEmpty != '0'">
            <van-cell title="购买数量">
              <div>
                <van-stepper
                  v-model="buyNum"
                  integer
                  :min="1"
                />
              </div>
            </van-cell>
          </van-cell-group>
          <div class="skuFooterButton" v-if="changeDetails.subGoodsStoreEmpty != '0'">
            <div class="footerButton addshopping" style="width: 50%" @click="addGoodsOptionTrue">
              <p>加入购物车</p>
            </div>
            <div class="footerButton buy" style="width: 50%" @click="buyGoodsOptionTrue">
              <p>立即购买</p>
            </div>
          </div>
          <div class="skuFooterButton" v-else @click="collectGoodsOptionTrue">
            <div class="footerButton addshopping" style="width:100%;background-color: #Fdc734;color: #000;">
              <p>加入收藏</p>
            </div>
          </div>
        </div>
        <div class="skuFooter" v-else>
          <van-cell-group>
            <van-cell title="购买数量" v-if="goodDetails.goodsStoreEmpty != '0'">
              <div>
                <van-stepper
                  v-model="buyNum"
                  integer
                  :min="1"
                />
              </div>
            </van-cell>
          </van-cell-group>
          <div class="skuFooterButton" v-if="goodDetails.goodsStoreEmpty != '0'">
            <div class="footerButton addshopping" style="width: 50%" @click="addGoodsOptionFalse">
              <p>加入购物车</p>
            </div>
            <div class="footerButton buy" style="width: 50%" @click="buyGoodsOptionFalse">
              <p>立即购买</p>
            </div>
          </div>
          <div class="skuFooterButton" v-else @click="collectGoodsOptionFalse">
            <div class="footerButton addshopping" style="width:100%;background-color: #Fdc734;color: #000;">
              <p>加入收藏</p>
            </div>
          </div>
        </div>
      </div>
    </van-popup>

  </div>
</template>
<script>
  import {mapState,mapGetters} from 'vuex'
  import Vue from 'vue'
  import { ImagePreview } from 'vant';
  import * as common from '../common'
  import * as config from '../config'
  import {initWx} from '../weixin';
  export default {
    data() {
      return {
        headerStatus:true,
        current: 0,
        showSku:false,
        buyNum:'1',
        imgList:[],
        checkSubStatus:'',
        changeDetails:[],
        loading:false,
        label:[]
      }
    },
    computed:{
      ...mapState({
        'goodDetails':state => state.goodDetils.goodDetails,
        'userInfo':state => state.userInfo,
      }),
      ...mapGetters(['getGoodSpecListChecked']),
    },
    watch:{
      getGoodSpecListChecked(v){
        this.goodDetails.subGoodsList.filter(item => {
          if (item.subGoodsSpec == v){
            this.changeDetails = item
          }
        })
      }
    },
    created(){
      this.loading = true
      this.$store.dispatch('getGoodDetails',this.$route.query.goodsId)
        .then(res => {
          this.loading = false
          if (res.goodsImages){
            this.imgList = this.goodDetails.goodsImages.split(",")
          }
          if (res.goodsLabel.indexOf(',') != -1){
            this.label = this.goodDetails.goodsLabel.split(',')
          }
          window.addEventListener('scroll', this.onLoad)

          let obj = {
            title:res.shareTitle,
            link: res.shareLink,
            imgUrl:res.shareIcon,
            desc:res.shareDescription,
          }
          initWx(obj)
        })
        .catch(err => {
          this.loading = false
        })
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
      imgPreview(index){
        ImagePreview({
          images: this.imgList,
          startPosition: index,
          showIndicators:true
        })
      },
      checkSubStatusClick(itemId,index,keyIndex){
        let data = {
          itemId:itemId,
          index:index,
          keyIndex:keyIndex,
        }
        this.$store.dispatch('getCheckSubStatusClick',data)
      },
      collectGoodsOptionTrue(){
        this.$store.dispatch('getAddCollectGood',this.changeDetails.subGoodsId)
          .then(res => {
            this.$toast.success('收藏成功')
//            this.$store.dispatch('getCollectList')
            this.changeDetails.goodsIsCollect = '1'
            this.showSku = false
          })
          .catch(err => {
//            this.$toast.fail('收藏失败')
          })
      },
      cancelCollectGoodsOptionTrue(){
        this.$store.dispatch('getCancelGood',this.changeDetails.subGoodsId)
          .then(res => {
            this.$toast.success('取消成功')
//            this.$store.dispatch('getCollectList')
            this.changeDetails.goodsIsCollect = '0'
          })
          .catch(err => {
//            this.$toast.fail('取消收藏失败')
          })
      },
      addGoodsOptionTrue(){
        let data = {
          goodsId:this.changeDetails.subGoodsId
        }
        this.httpCli({
          url:config.URL_CART_PLUS,
          data:data
        })
          .then(res => {
            this.showSku = false
            if (res.errorCode == 100){
              this.$toast.success('添加成功')
            }else {
//              this.$toast.fail('添加失败')
            }
          })
          .catch(err => {
            this.showSku = false
//            this.$toast.fail('添加失败')
          })
      },
      buyGoodsOptionTrue(){
        this.$toast.loading({
          mask: true,
          message: '结算中...',
          loadingType:'spinner',
          duration:0
        });
        let goodsList = []
        goodsList.push({goodsId:this.changeDetails.subGoodsId,goodsNum:this.buyNum})
        let data = {
          packageId:'',
          goodsList:JSON.stringify(goodsList)
        }
        this.$store.dispatch('getPayCalculate',data)
          .then(res => {
            this.$router.push({path:'/ConfirmOrders',query:{packageId:data.packageId,goodsList:data.goodsList,status:'1'}})
            this.$toast.clear()
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      addGoodsOptionTrueRouter(){
        let data = {
          goodsId:this.changeDetails.subGoodsId
        }
        this.httpCli({
          url:config.URL_CART_PLUS,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              this.$router.push({path:'/Main/ShoppingCart'})
            }
          })
      },
      collectGoodsOptionFalse(){
        this.$store.dispatch('getAddCollectGood',this.goodDetails.goodsId)
          .then(res => {
            this.$toast.success('收藏成功')
            this.goodDetails.goodsIsCollect = '1'
          })
          .catch(err => {
//            this.$toast.fail('收藏失败')
          })
      },
      cancelCollectGoodsOptionFalse(){
        this.$store.dispatch('getCancelGood',this.goodDetails.goodsId)
          .then(res => {
            this.$toast.success('取消成功')
            this.goodDetails.goodsIsCollect = '0'
          })
          .catch(err => {
//            this.$toast.fail('取消收藏失败')
          })
      },
      addGoodsOptionFalse(){
        let data = {
          goodsId:this.goodDetails.goodsId
        }
        this.httpCli({
          url:config.URL_CART_PLUS,
          data:data
        })
          .then(res => {
            this.showSku = false
            if (res.errorCode == 100){
              this.$toast.success('添加成功')
            }else {
//              this.$toast.fail('添加失败')
            }
          })
          .catch(err => {
            this.showSku = false
//            this.$toast.fail('添加失败')
          })
      },
      buyGoodsOptionFalse(){
        this.$toast.loading({
          mask: true,
          message: '结算中...',
          loadingType:'spinner',
          duration:0
        });
        let goodsList = []
        goodsList.push({goodsId:this.goodDetails.goodsId,goodsNum:this.buyNum})
        let data = {
          packageId:'',
          goodsList:JSON.stringify(goodsList)
        }
        this.$store.dispatch('getPayCalculate',data)
          .then(res => {
            this.$router.push({path:'/ConfirmOrders',query:{packageId:data.packageId,goodsList:data.goodsList,status:'1'}})
            this.$toast.clear()
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      addGoodsOptionFalseRouter(){
        let data = {
          goodsId:this.goodDetails.goodsId
        }
        this.httpCli({
          url:config.URL_CART_PLUS,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              this.$router.push({path:'/Main/ShoppingCart'})
            }
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
    color: #f82a59;
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
  color: #f82a59;
  display: flex;
  align-items: center;
}
.goodPirce{

}
.goodPirceWrap span{
  margin-right: 28px;
}
.goodPirceWrap s{
  font-size: 30px;
  color: #666;
  margin-right: 41px;
  margin-top: 3px;
}
.goodPirceWrap .goodLabels{
  display: flex;
  justify-content: flex-start;
}
.goodPirceWrap .goodLabels span{
  border-radius: 4px;
  border: 1PX #f82a59 solid;
  font-size: 20px;
  color: #f82a59;
  line-height: 20px;
  height:20px;
  text-align: center;
  padding: 5px;
  margin-left: -15px;
}
.goodDescription{
  width:100%;
  font-size: 30px;
  color: #333333;
  margin: 0px 0px 60px 8px;
  text-align: justify;
}
.goodCollect{
  font-size: 20px;
  color: #999;
  display: flex;
  flex-direction: column;
  align-content: center;
  white-space: nowrap;
}
.goodCollect img{
  width: 40px;
  margin-top: 50px;
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
    border-top: 1PX #ddd solid;
    background-color: #ffffff;
  }
  .footerButton{
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
  .addshopping{
    width: 35%;
    font-size: 30px;
    background-color: #f82a59;
    color: #ffffff;
  }
  .buy{
    width: 35%;
    font-size: 30px;
    background-color: #333;
    color: #ffffff;
  }
  .addCollect{
    font-size: 30px;
    width: 100%;
    color: #000;
    background-color: #Fdc734;
  }

.van-popup{
  overflow-y: visible;
}
  .skuContnet{
    background-color: #ffffff;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
    transition: all 0.3s !important;
  }
  .skuHeader{
    height:180px;
    width: 100%;
    position: relative;
  }
  .skuHeaderImgWrap{
    float: left;
    position: relative;
    width: 230px;
    height:230px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 15px;
    margin-top: -50px;
  }
  .skuHeaderImgWrap img{
    height: 100%;
    border-radius: 15px;
  }
  .skuHeaderDetails{
    position: absolute;
    left: 280px;
    top:30px;
  }
  .skuHeaderDetails p{
    height:20px;
    font-size: 34px;
    color: #f82a59;
  }
  .skuHeaderDetails div{
    display: flex;
    align-items: center;
  }
  .skuHeaderDetails div span:nth-child(2){
    margin-top: 4px;
  }
  .skuHeaderClose{
    position: absolute;
    right: 10px;
    top:30px;
    font-size: 30px;
  }
  .skuMiddle{
    padding:30px 0 50px 0;
  }
.skuMiddle p {
  color: #666;
  font-size: 30px;
}
.skuMiddleClass {
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  float: left;
}
.skuMiddleClassSpan{
  margin-left: 50px;
  width: 170px;
  height:64px;
  font-size: 30px;
  border-radius: 32px;
  border: 2px #999999 solid;
  color: #999;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.skuMiddleClassSpan:nth-child(1){
  margin-left: 0px !important;
}
.skuMiddleClassSpan::before{
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
.skuMiddleClassSpan:active::before {
  opacity: 0.3;
}
.skuMiddleClassSpanActive{
  border: 2px #f82a59 solid;
  color: #f82a59;
}
.skuMiddleClassSpanFail{
  color: #cbcbcb;
  background-color: #f3f3f3;
  border: 0px;
  /*cursor: not-allowed;*/
}
.skuMiddleClassSpanFail:active::before {
  opacity: 0;
}
  .skuFooter{
    padding: 20px 0 25px 0;
    border-top: 1PX #ddd solid;
    margin-left: -20px;
    width: calc(100% + 40px);
  }
  .skuFooterButton{
    display: flex;
    height:100px;
    background-color: #f82a59;
    color: #ffffff;
    margin-bottom: -26px;
    margin-top: 10px;
  }
</style>
