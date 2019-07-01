<template>
  <div v-loading="loading">
    <div class="Home" v-if="homeList.bannerList">
      <div class="wrap">
        <div class="wrapHeader">
          <div class="search" @click="$router.push({path:'/SearchShop'})">
            <div class="searchContent">
              <van-icon name="search"/>
              <span>&nbsp;&nbsp;&nbsp;菩提圣果</span>
            </div>
          </div>
          <div class="banner">
            <van-swipe :autoplay="3000" indicator-color="#fff">
              <van-swipe-item v-for="(item,index) in homeList.bannerList" :key="index" class="van_swipe_item">
                <img :src="item" alt="">
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="classIfy">
            <div class="classIfyDetail" v-for="(item,index) in homeList.categoryList"
                 @click="toClassify(item.categoryId,index)">
              <img :src="item.categoryThumbImage" alt="">
              <div>{{item.categoryName}}</div>
            </div>
          </div>
        </div>
        <!--       <div class="activity">
                 <div class="hotSaleImg">
                   <img src="../../assets/img/main/home_title_icon1.png" alt="">
                   <div>查看更多<van-icon name="arrow"/></div>
                 </div>
                 <div class="hotSaleList">
                   <div class="hotSaleListRight">
                     <div class="hotSaleListProduct" style="background-color: #fff">
                       <div class="hotSaleImgWrap">
                         &lt;!&ndash;缺货显示的图片&ndash;&gt;
                         <img class="goodListFalse" src="../../assets/img/goodEmpty.png"  alt="">
                         &lt;!&ndash;<img :src="item.goodsThumb" alt="">&ndash;&gt;
                       </div>
                       <p class="hotSaleListTitle">{{123}}</p>
                       <p class="hotSaleCount">
                         <span class="vipCount">
                           ￥123
                         </span>
                         <img src="../../assets/img/add_shoppingCart.png" alt="">
                       </p>
                     </div>
                     <div class="hotSaleListProduct" style="background-color: #fff">
                       <div class="hotSaleImgWrap">
                         &lt;!&ndash;缺货显示的图片&ndash;&gt;
                         <img class="goodListFalse" src="../../assets/img/goodEmpty.png"  alt="">
                         &lt;!&ndash;<img :src="item.goodsThumb" alt="">&ndash;&gt;
                       </div>
                       <p class="hotSaleListTitle">{{123}}</p>
                       <p class="hotSaleCount">
                         <span class="vipCount">
                           ￥123
                         </span>
                         <img src="../../assets/img/add_shoppingCart.png" alt="">
                       </p>
                     </div>
                   </div>
                   <div class="hotSaleListLeft">
                     <div class="hotSaleListProduct" style="background-color: #fff">
                       <div class="hotSaleImgWrap">
                         &lt;!&ndash;缺货显示的图片&ndash;&gt;
                         <img class="goodListFalse" src="../../assets/img/goodEmpty.png"  alt="">
                         &lt;!&ndash;<img :src="item.goodsThumb" alt="">&ndash;&gt;
                       </div>
                       <p class="hotSaleListTitle">{{123}}</p>
                       <p class="hotSaleCount">
                         <span class="vipCount">
                           ￥123
                         </span>
                         <img src="../../assets/img/add_shoppingCart.png" alt="">
                       </p>
                     </div>
                     <div class="hotSaleListProduct" style="background-color: #fff">
                       <div class="hotSaleImgWrap">
                         &lt;!&ndash;缺货显示的图片&ndash;&gt;
                         <img class="goodListFalse" src="../../assets/img/goodEmpty.png"  alt="">
                         &lt;!&ndash;<img :src="item.goodsThumb" alt="">&ndash;&gt;
                       </div>
                       <p class="hotSaleListTitle">{{123}}</p>
                       <p class="hotSaleCount">
                         <span class="vipCount">
                           ￥123
                         </span>
                         <img src="../../assets/img/add_shoppingCart.png" alt="">
                       </p>
                     </div>
                   </div>
                 </div>
               </div>-->
        <div class="hotSale">
          <div class="hotSaleImg" @click="toSearchShop">
            <img :src="homeList.navUrl" alt="">
          </div>
          <div class="hotSaleList">
            <div class="hotSaleListLeft">
              <div class="hotSaleListProduct" style="background-color: #fff" v-for="(item,index) in hotGoodsListLeft"
                   @click="$router.push({path:'/GoodDetails',query:{goodsId:item.goodsId + (item.goodsOptionId ? `,${item.goodsOptionId}` : '')}})">
                <div class="hotSaleImgWrap">
                  <!--缺货显示的图片-->
                  <img class="goodListFalse" src="../../assets/img/goodEmpty.png" alt=""
                       v-if="item.goodsStoreEmpty == '0'">
                  <img :src="item.goodsThumb" alt="" v-else>
                  <div class="giftFree" v-if="item.goodsPickStockNum > '0'">
                    <span>现场</span>
                  </div>
                </div>
                <p class="hotSaleListTitle">{{item.goodsTitle}}</p>
                <p class="hotSaleListDiscription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
                <p class="hotSaleListDiscription" v-else>{{item.goodsSubtitle}}</p>
                <div v-if="item.goodsLabel">
                  <div class="hotSaleListTabs" v-if="item.goodsLabel.indexOf(',') != -1">
                    <span v-for="(item,index) in label">{{item}}</span>
                  </div>
                  <div class="hotSaleListTabs" v-else>
                    <span>{{item.goodsLabel}}</span>
                  </div>
                </div>
                <p class="hotSaleCount">
                        <span class="vipCount" v-if="item.goodsMarketProfit">
                    ￥{{item.goodsMarketPrice}}&nbsp;/&nbsp;<span class="vipCountPro">赚&nbsp;{{item.goodsMarketProfit}}</span>
                  </span>
                  <span class="vipCount" v-else style="color: #F2180C;">
                    ￥{{item.goodsMarketPrice}}&nbsp;&nbsp;<s
                    v-if="item.goodsMarketPrice != item.goodsProductPrice">￥{{item.goodsProductPrice}}</s>
                  </span>
                  <!--<img src="../../assets/img/add_shoppingCart.png" alt="">-->
                </p>
              </div>
            </div>
            <div class="hotSaleListRight">
              <div class="hotSaleListProduct" style="background-color: #fff" v-for="(item,index) in hotGoodsListRight"
                   @click="$router.push({path:'/GoodDetails',query:{goodsId:item.goodsId + (item.goodsOptionId ? `,${item.goodsOptionId}` : '')}})">
                <div class="hotSaleImgWrap">
                  <!--缺货显示的图片-->
                  <img class="goodListFalse" src="../../assets/img/goodEmpty.png" alt=""
                       v-if="item.goodsStoreEmpty == '0'">
                  <img :src="item.goodsThumb" alt="" v-else>
                  <div class="giftFree" v-if="item.goodsPickStockNum > '0'">
                    <span>现场</span>
                  </div>
                </div>
                <p class="hotSaleListTitle">{{item.goodsTitle}}</p>
                <p class="hotSaleListDiscription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
                <p class="hotSaleListDiscription" v-else>{{item.goodsSubtitle}}</p>
                <div v-if="item.goodsLabel">
                  <div class="hotSaleListTabs" v-if="item.goodsLabel.indexOf(',') != -1">
                    <span v-for="(item,index) in label">{{item}}</span>
                  </div>
                  <div class="hotSaleListTabs" v-else>
                    <span>{{item.goodsLabel}}</span>
                  </div>
                </div>
                <p class="hotSaleCount">
                        <span class="vipCount" v-if="item.goodsMarketProfit">
                    ￥{{item.goodsMarketPrice}}&nbsp;/&nbsp;<span class="vipCountPro">赚&nbsp;{{item.goodsMarketProfit}}</span>
                  </span>
                  <span class="vipCount" v-else style="color: #F2180C;">
                    ￥{{item.goodsMarketPrice}}&nbsp;&nbsp;<s
                            v-if="item.goodsMarketPrice != item.goodsProductPrice">￥{{item.goodsProductPrice}}</s>
                  </span>
                  <!--<img src="../../assets/img/add_shoppingCart.png" alt="">-->
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapTour" v-else>
      <div class="contentTour" v-for="(item,index) in homeList.hotGoodsList"
           @click="$router.push({path:'/GoodDetails',query:{goodsId:item.goodsId + (item.goodsOptionId ? `,${item.goodsOptionId}` : '')}})">
        <div class="imgWrapTour">
          <img :src="item.goodsBigThumb" alt="">
        </div>
        <div class="shopInfoTour">
          <div class="shopTitleTour">{{item.goodsTitle}}</div>
          <div class="shopSubtitleTour">{{item.goodsSubtitle}}</div>
          <div class="bugInfoTour">
            <span>￥{{item.goodsMarketPrice}}&nbsp;<s v-if="item.goodsMarketPrice != item.goodsProductPrice"
                                                style="color: #999;">￥{{item.goodsProductPrice}}</s></span>
            <span v-active>立即购买</span>
          </div>
        </div>
      </div>
    </div>

    <van-popup v-model="popupShow" style="border-radius: 8px;">
      <div class="wxContent">
        <img :src="wxInfo.subQRCode" alt="" v-if="wxInfo.subQRCode">
        <p>长按二维码关注公众号</p>
        <div class="info" @click="getResult">
          我已关注？
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  import * as wx from '../../utils/weixin'
  export default {
    data () {
      return {
        label: [],
        popupShow:false,
        wxInfo:{}
      }
    },
    computed: {
      ...mapState({
        'homeList': state => state.home.homeList,
        'loading': state => state.home.loading,
        'hotGoodsListLeft': state => state.home.hotGoodsListLeft,
        'hotGoodsListRight': state => state.home.hotGoodsListRight,
      })
    },
    created () {
      common.getOpenId()
        .then(res => {
          this.wxInfo = res
          if (res.subscribe == false){
            console.log('subscribe===' + res.subscribe)
            this.popupShow = true
          }else {
            this.popupShow = false
          }
        })
      wx.shareInfo()
    },
    mounted () {
      if (localStorage.getItem('caseGifShow') && localStorage.getItem('caseGifShow') == true) {
        this.$router.push({path: '/CaseGift', query: {status: 'new'}})
      }
      this.$store.dispatch('getHomeList')
        .then(res => {
          if (this.homeList.bannerList) {
            this.homeList.hotGoodsList.map(item => {
              if (item.goodsLabel.indexOf(',') != -1) {
                this.label = item.goodsLabel.split(',')
              }
            })
          }
        })
        .catch(err => {

        })
    },

    methods: {
      toClassify (categoryId) {
        categoryId ? sessionStorage.setItem('classifyCheckCategoryId', categoryId) : ''
        this.$router.push({path:'/Main/Classify'})
      },
      toSearchShop(){
        this.homeList.navCode != '000000' ? this.$router.push({path:'/SearchShop',query:{categoryId:this.homeList.navCode,categoryName:'更多旅游特产'}}) : ''
      },
      getResult(){
        common.getUser()
          .then(res => {
            if (res.subscribe == false){
              this.$notify({
                message: '您还未关注公众号！',
                duration: 1000,
                background: '#F2180C'
              });
            }else {
              this.popupShow = false
            }
          })
      }
    },
  }
</script>
<style scoped>
  .wrapTour {
    background-color: #f3f2f1;
    min-height: 100vh;
    padding: 0px 15px 30px;
    padding-bottom: 130px;
    box-sizing: border-box;
  }

  .contentTour {
    margin: 0 auto;
    border-radius: 20px;
    background-color: #ffffff;
    margin-top: 30px;
  }

  .content:nth-child(1) {
    margin-top: 0;
  }

  .imgWrapTour {
    border-radius: 20px 20px 0 0;
    overflow: hidden;
    height: 318px;
  }

  .imgWrapTour img {
    width: 100%;
    height: 100%;
  }

  .shopInfoTour {
    padding: 22px 24px;
  }

  .shopTitleTour {
    font-size: 28px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .shopSubtitleTour {
    font-size: 22px;
    color: #666;
    margin-top: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bugInfoTour {
    margin-top: 36px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .bugInfoTour span:nth-child(1) {
    font-size: 28px;
    color: #F2180C;
  }

  .bugInfoTour span:nth-child(2) {
    padding: 12px 35px;
    background-color: #F2180C;
    color: #ffffff;
    font-size: 22px;
    position: relative;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<style scoped>
  .Home {
    padding-bottom: 125px;
    overflow: hidden;
    background-color: #f8F8F8;
  }

  .wrap {

  }

  .wrapHeader {
    background-color: #fff;
    padding: 20px 0;
    box-sizing: border-box;
    border-radius: 0 0 18px 18px;
    margin-bottom: 30px;
  }

  .search {
    width: 100%;
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .searchContent {
    width: 95%;
    height: 80%;
    background-color: #f3f3f3;
    border-radius: 32px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    box-sizing: border-box;
  }

  .searchContent span {
    font-size: 28px;
    color: #333;
  }

  .banner {
    width: 100%;
    margin-top: 18px;
    box-sizing: border-box;
  }

  .van_swipe_item {
    /*border-radius: 18px;*/
    overflow: hidden;
  }

  .classIfy {
    box-sizing: border-box;
    border-radius: 15px;
    margin: 0 auto;
    padding: 30px 44px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
  }

  .classIfyDetail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .classIfyDetail img {
    width: 100px;
  }

  .classIfyDetail div {
    margin-top: 14px;
    font-size: 24px;
  }

  .activity {
    background-image: url(../../assets/img/main/home_acivity_bj.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0 0px 30px;
    box-sizing: border-box;
  }

  .hotSale {

  }

  .hotSaleImg {
    padding: 4px 0 24px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hotSaleImg img {
    width: 100%;
    margin-left: -15px;
  }

  .hotSaleList {
    display: flex;
    width: 100%;
  }

  .hotSaleListLeft {
    margin-left: 10px;
    width: 47.5%;
  }

  .hotSaleListRight {
    margin-left: 10px;
    width: 47.5%;
  }

  .hotSaleListProduct {
    width: 100%;
    /*border: 1Px #eeeeee solid;*/
    border-radius: 18px;
    padding: 10px 20px;
    box-sizing: border-box;
    margin-top: 10px;
  }

  .hotSaleImgWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 270px;
    position: relative;
    overflow: hidden;
  }

  .hotSaleStoreEmpty {
    width: 70%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .goodListFalse {
    position: absolute;
    top: 27.5px;
    left: 40px;
    width: 225px !important;
    height: 225px !important;
  }

  .hotSaleImgWrap img {
    width: 100%
  }

  .hotSaleListTabs {
    margin: 30px auto 24px;
    display: flex;
    align-items: flex-start;
  }

  .hotSaleListTabs span {
    display: block;
    border-radius: 4px;
    font-size: 18px;
    color: #fff;
    background-color: #F2180C;
    text-align: center;
    padding: 6px 8px 4px;
    margin-right: 8px;
  }

  .hotSaleListTabs img {
    width: 100px;
  }

  .hotSaleListTitle {
    font-size: 28px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 20px 0 22px;
  }

  .hotSaleListDiscription {
    margin-top: -10px;
    font-size: 24px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    /*height:40px;*/
    color: #666;
    /*word-break: break-all;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box; !** 对象作为伸缩盒子模型显示 **!*/
    /*-webkit-box-orient: vertical; !** 设置或检索伸缩盒对象的子元素的排列方式 **!*/
    /*-webkit-line-clamp: 2; !** 显示的行数 **!*/
    /*overflow: hidden;  !** 隐藏超出的内容 **!*/
  }

  .hotSaleCount {
    font-size: 28px;
    /*text-align: justify;*/
    height: 20px;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    letter-spacing: -1Px;
    margin-top: 60px;
  }

  .hotSaleCount img {
    width: 44px;
    height:44px;
  }

  .vipCount {
    color: #333;
  }
  .vipCount .vipCountPro{
    color: #F2180C;
    font-weight: bold;
  }

  .vipCount s {
    color: #999;
    font-weight: normal;
    font-size: 24px;
  }

  .wxContent {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px;
    box-sizing: border-box;
  }

  .wxContent img {
    width: 550px;
  }

  .wxContent p {
    margin-top: -12px;
    font-size: 26px;
    color: #F2180C;
  }

  .wxContent .info {
    padding: 25px 0 15px 0;
    border-top: 1PX #eee dashed;
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: rgb(153, 153, 153);
  }
</style>
