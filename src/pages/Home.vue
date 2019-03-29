<template>
  <div class="Home">
    <div class="wrap">
      <div class="search" @click="$router.push({path:'/SearchShop'})">
        <div class="searchContent">
          <van-icon name="search" />
          <span>&nbsp;&nbsp;&nbsp;臻宠</span>
        </div>
      </div>
      <div class="banner" v-if="userInfo && userInfo.memberType == '2'">
        <van-swipe :autoplay="3000" indicator-color="#fff">
          <van-swipe-item>
            <img src="https://timgsa.oss-cn-beijing.aliyuncs.com/micro/mallwxchat/banner2.png" alt="">
          </van-swipe-item>
          <van-swipe-item>
            <img src="https://timgsa.oss-cn-beijing.aliyuncs.com/micro/mallwxchat/banner.png" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="banner" v-else>
        <van-swipe :autoplay="3000" indicator-color="#fff">
          <van-swipe-item>
            <img src="https://timgsa.oss-cn-beijing.aliyuncs.com/micro/mallwxchat/banner.png" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div @click="$router.push({path:'/newPeopleDetails',query:{packageId:homeList.giftPackageList[0].packageId}})" class="newCustomer" v-if="homeList.giftPackageList && homeList.giftPackageList.length">
        <div class="newCustomerList" v-if="homeList.giftPackageList && homeList.giftPackageList.length">
          <img src="https://timgsa.oss-cn-beijing.aliyuncs.com/micro/mallwxchat/newUserBanner.png" alt="">
        </div>
      </div>
      <div class="packagePlan" v-if="homeList.marketPackageList && homeList.marketPackageList.length">
        <div class="packagePlanImg">
          <img src="../assets/img/02/plan.png" alt="" >
        </div>
        <div style="overflow-y: scroll;padding-bottom: 4px;">
          <div class="packagePlanList" v-if="homeList.marketPackageList && homeList.marketPackageList.length">
            <div class="packagePlanListProduct" @click="toPlanDetails(item.packageId,index)" v-for="(item,index) in homeList.marketPackageList">
              <div class="packagePlanListProductImgWrap">
                <img :src="item.packageThumb" alt="" v-if="item.packageThumb">
                <img src="https://img.yzcdn.cn/2.jpg" alt="" v-else>
              </div>
              <div class="packagePlanListProductContentWrap">
                <p class="packagePlanListProductTitle">{{item.packageName}}</p>
                <p class="packagePlanListProductCount">￥{{item.packageMarketPrice}}</p>
                <!--<p class="packagePlanListProductCount" style="margin-top: -10px;"><s>￥{{item.packageProductPrice}}</s></p>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hotSale">
        <div class="hotSaleImg">
          <img src="../assets/img/02/hotList.png" alt="">
        </div>
        <div class="hotSaleList" v-if="homeList.hotGoodsList && homeList.hotGoodsList.length">
          <div class="hotSaleListRight">
            <div class="hotSaleListProduct" @click="toGoodDetails(item.goodsId,index)" v-for="(item,index) in hotGoodsListRight">
              <div class="hotSaleImgWrap">
                <!--缺货显示的图片-->
                <img class="goodListFalse" src="../assets/img/02/goodsListFalse.png"  alt="" v-if="item.goodsStoreEmpty == '0'">
                <img :src="item.goodsThumb" alt="">
                <!--<img src="https://img.yzcdn.cn/2.jpg" alt="" v-else>-->
              </div>
              <p class="hotSaleListTitle">{{item.goodsTitle}}</p>
              <p class="hotSaleListDiscription">{{item.goodsSubtitle}}</p>
              <div v-if="item.goodsLabel">
                <div class="hotSaleListTabs" v-if="item.goodsLabel.indexOf(',') != -1">
                  <span v-for="(item,index) in label">{{item}}</span>
                </div>
                <div class="hotSaleListTabs" v-else>
                  <span>{{item.goodsLabel}}</span>
                </div>
              </div>
              <div v-if="item.goodsVipPrice">
                <p class="hotSaleCount" v-if="item.goodsVipPrice != item.goodsMarketPrice">
                  ￥<s>{{item.goodsMarketPrice}}</s>&emsp;
                  <span class="vipCount">
                    <img src="../assets/img/02/vip.png" alt="">
                    ￥{{item.goodsVipPrice}}
                  </span>
                </p>
                <p class="hotSaleCount" v-else>
                  <span class="vipCount">
                    <img src="../assets/img/02/vip.png" alt="">
                    ￥{{item.goodsVipPrice}}
                  </span>
                </p>
              </div>
              <div v-else>
                <p class="hotSaleCount">￥{{item.goodsMarketPrice}}&emsp;<s v-if="item.goodsMarketPrice != item.goodsProductPrice" style="color: #999999;">￥{{item.goodsProductPrice}}</s></p>
              </div>
            </div>
          </div>
          <div class="hotSaleListLeft">
            <div class="hotSaleListProduct" @click="toGoodDetails(item.goodsId,index)" v-for="(item,index) in hotGoodsListLeft">
              <div class="hotSaleImgWrap">
                <!--缺货显示的图片-->
                <img class="goodListFalse" src="../assets/img/02/goodsListFalse.png"  alt="" v-if="item.goodsStoreEmpty == '0'">
                <img :src="item.goodsThumb" alt="">
                <!--<img src="https://img.yzcdn.cn/2.jpg" alt="" v-else>-->
              </div>
              <p class="hotSaleListTitle">{{item.goodsTitle}}</p>
              <p class="hotSaleListDiscription">{{item.goodsSubtitle}}</p>
              <div v-if="item.goodsLabel">
                <div class="hotSaleListTabs" v-if="item.goodsLabel.indexOf(',') != -1">
                  <span v-for="(item,index) in label">{{item}}</span>
                </div>
                <div class="hotSaleListTabs" v-else>
                  <span>{{item.goodsLabel}}</span>
                </div>
              </div>
              <div v-if="item.goodsVipPrice">
                <p class="hotSaleCount" v-if="item.goodsVipPrice != item.goodsMarketPrice">
                  ￥<s>{{item.goodsMarketPrice}}</s>&emsp;
                  <span class="vipCount">
                    <img src="../assets/img/02/vip.png" alt="">
                    ￥{{item.goodsVipPrice}}
                  </span>
                </p>
                <p class="hotSaleCount" v-else>
                  <span class="vipCount">
                    <img src="../assets/img/02/vip.png" alt="">
                    ￥{{item.goodsVipPrice}}
                  </span>
                </p>
              </div>
              <div v-else>
                <p class="hotSaleCount">￥{{item.goodsMarketPrice}}&emsp;<s v-if="item.goodsMarketPrice != item.goodsProductPrice" style="color: #999999;">￥{{item.goodsProductPrice}}</s></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  import {initWx} from '../weixin';
  export default {
    props:['mode'],
    data () {
      return {
        images: [
          'https://img.yzcdn.cn/2.jpg',
          'https://img.yzcdn.cn/2.jpg'
        ],
//        loading:true,
        hotGoodsListLeft:[],
        hotGoodsListRight:[],
        label:[]
      }
    },
    computed:{
      ...mapState({
        'homeList':state => state.home.homeList,
        'userInfo':state => state.userInfo
      })
    },
    watch:{

    },
    beforeRouteEnter(to, from, next) {
      next( vm => {
        if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).memberToken){
          let userInfo = JSON.parse(localStorage.getItem('userInfo'))
          vm.$store.dispatch('getUserInfo',userInfo)
        }else {
          vm.$store.dispatch('removeUserInfo')
        }
      })
    },
    created(){
      this.$store.dispatch('getLoaclStorageHomeList')
        .then(res => {
          if (res.hotGoodsList && res.hotGoodsList.length){
            if (res.share && res.share.shareTitle){
              let obj = {
                title:this.homeList.share.shareTitle,
                link:this.homeList.share.shareLink,
                imgUrl:this.homeList.share.shareIcon,
                desc:this.homeList.share.shareDescription,
              }
              initWx(obj)
            }
            this.hotGoodsListLeft = res.hotGoodsList.filter((item,index) => ((index + 1) % 2) == 0)
            this.hotGoodsListRight = res.hotGoodsList.filter((item,index) => ((index + 1) % 2) != 0)

            this.homeList.hotGoodsList.map(item => {
              if (item.goodsLabel.indexOf(',') != -1){
                this.label = item.goodsLabel.split(',')
              }
            })
          }
//          this.loading = false
        })
        .catch(err => {
//          this.loading = false
        })
      this.$store.dispatch('getHomeList')
        .then(res => {
          if (this.homeList.hotGoodsList && this.homeList.hotGoodsList.length){
            if (res.share && res.share.shareTitle){
              let obj = {
                title:this.homeList.share.shareTitle,
                link:this.homeList.share.shareLink,
                imgUrl:this.homeList.share.shareIcon,
                desc:this.homeList.share.shareDescription,
              }
              initWx(obj)
            }
            this.hotGoodsListLeft = this.homeList.hotGoodsList.filter((item,index) => ((index + 1) % 2) == 0)
            this.hotGoodsListRight = this.homeList.hotGoodsList.filter((item,index) => ((index + 1) % 2) != 0)
            this.homeList.hotGoodsList.map(item => {
              if (item.goodsLabel.indexOf(',') != -1){
                this.label = item.goodsLabel.split(',')
              }
            })
          }
//          this.loading = false
        })
        .catch(err => {
//          this.loading = false
        })

    },
    mounted(){
      if (!sessionStorage.getItem('openId') || sessionStorage.getItem('openId') == 'undefined'){
        if (window.location.href.indexOf('code') != -1){
          let code = this._getParam('code')
          let data = {
            code:this._getParam('code')
          }
          this.httpCli({
            url:config.URL_WX_OPENID,
            data:data
          })
            .then(res => {
              if (res.errorCode == 100){
                res.data.openid ? sessionStorage.setItem('openId',res.data.openid) : common.toast(res.data.errorMsg)
                console.log(sessionStorage.getItem('openId'))
              }
            })
        }
      }
    },
    methods:{
      toPlanDetails(packageId,index){
        this.$router.push({path:'/planDetails',query:{packageId:packageId}})
      },
      toGoodDetails(goodsId,index){
        this.$router.push({path:'/GoodDetails',query:{goodsId:goodsId}})
      },
      _getParam(key) {
        let results = new RegExp('[\?&]' + key + '=([^&#]*)').exec(window.location.href);
        if (results) {
          return results[1];
        } else {
          return '';
        }
      },
    },
    components:{

    }
  }
</script>
<style scoped>
  .Home{
    margin-bottom: 120px;
    overflow: hidden;
  }
  h4{
    text-align: center;
  }
.wrap{

}
  .search{
    width: 100%;
    height:64px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 18px;
  }
  .searchContent{
    width: 95%;
    height:80%;
    background-color: #f3f3f3;
    border-radius: 32px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    box-sizing: border-box;
  }
  .searchContent span{
    font-size: 28px;
    color: #999;
  }
  .banner{
    margin-top: 15px;
  }
  .newCustomer{
    width: 100%;
    margin: 0 auto;
    margin-top: 30px;
    padding: 0 15px;
  }
  .newCustomer img{
    width: 96%;
  }
  .newCustomer p{
    text-align: center;
    font-size: 30px;
  }
  .packagePlan{
    width: 100%;
  }
  .packagePlanImg{
    padding:50px 0 40px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .packagePlanImg img{
    width: 200px;
  }
  .packagePlanList{
    width: 1500px;
    /*display: flex;*/
  }
  .packagePlanListProduct{
    width: 222px !important;
    /*height:324px;*/
    border: 1Px #eeeeee solid;
    box-shadow: 0 0 8px 1Px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    float: left;
    margin-left: 20px;
  }
  .packagePlanListProductImgWrap{
    width: 222px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    border-bottom: 1Px #eee solid;
    background-color: #Eee;
    border-radius: 12px 12px 0 0;
  }
  .packagePlanListProductImgWrap img{
    width: 150px;
    /*margin-left: 8px*/
  }
  .packagePlanListProductContentWrap{
    width: 222px !important;
    border-radius:  0 0 12px 12px;
    background-color: #fff;
    padding: 20px 0 10px 0;
  }
  .packagePlanListProductTitle{
    font-size: 20px;
    margin: 0px auto 21px;
    width: 150px;
    height:34px;
    line-height: 34px;
    text-align: center;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1Px #333 solid;
    border-radius: 18px;
  }
  .packagePlanListProductCount{
    font-size: 20px;
    text-align: center;
    color: #f82a59;
    margin-top: 0px;
  }
  .hotSale{

  }
  .hotSaleImg{
    padding:50px 0 30px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hotSaleImg img{
    width: 150px;
  }
  .hotSaleList{
    display: flex;
    width: 100%;
  }
  .hotSaleListLeft{
    margin-left: 20px;
    width: 46%;
  }
  .hotSaleListRight{
    margin-left: 20px;
    width: 46%;
  }
  .hotSaleListProduct{
    width: 100%;
    border: 1Px #eeeeee solid;
    box-shadow: 0 0 5px 1Px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 10px 20px;
    box-sizing: border-box;
    margin-top: 20px;
  }
  .hotSaleImgWrap{
    display: flex;
    justify-content: center;
    align-items: center;
    height:270px;
    position: relative;
  }
  .hotSaleStoreEmpty{
    width: 70%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .goodListFalse{
    position: absolute;
    top:27.5px;
    left:40px;
    width: 225px !important;
    height:225px !important;
  }
  .hotSaleImgWrap img{
    width: 100%
  }
  .hotSaleListTabs{
    margin: 30px auto 24px;
    display: flex;
    align-items: flex-start;
  }
  .hotSaleListTabs span{
    border-radius: 4px;
    font-size: 18px;
    color: #fff;
    background-color: #f82a59;
    line-height: 20px;
    height:20px;
    text-align: center;
    padding: 5px 8px;
    margin-right: 8px;
  }
  .hotSaleListTabs img{
    width: 100px;
  }
  .hotSaleListTitle{
    font-size: 24px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 20px 0 20px;
  }
  .hotSaleListDiscription{
    font-size: 24px;
    text-align: justify;
    height:40px;
    color: #666;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
  }
  .hotSaleCount{
    font-size: 24px;
    /*text-align: justify;*/
    height:20px;
    color: #f82a59;
  }
  .vipCount{
    color: #333;
  }
  .vipCount img{
    width: 20px;
  }
</style>
