<template>
  <div style="background-color: #F3f3f3;min-height: 100vh" v-if="!loading">
    <div class="detailsContent">
      <van-swipe @change="onChange" class="vanSwiper">
        <van-swipe-item v-for="(item,index) in imgList" :key="index" @click.stop="imgPreview(index)">
          <img :src="item" alt="">
        </van-swipe-item>

        <div class="custom-indicator" slot="indicator">
          {{ current + 1 }}/{{imgList.length}}
        </div>
      </van-swipe>
      <div class="goodDitails">
        <div class="goodMount">
          <div class="goodPirce">
            <span>￥{{planList.packageMarketPrice}}</span>
            <s>￥{{planList.packageProductPrice}}</s>
            <!--<div class="goodLabels">-->
              <!--<span>包税</span>-->
              <!--<span>退换无忧</span>-->
            <!--</div>-->
          </div>
          <div class="goodTitle">
            {{planList.packageTitle}}
          </div>
          <div class="goodDescription">
            保障金额：￥{{planList.packageMarketPrice}}
          </div>
        </div>
      </div>
    </div>

    <div class="teletextDetails">
      <div class="teletextDetailsHeader">
        <span>商品清单：</span>
      </div>
      <div class="goodsList" v-if="planList.goodsList && planList.goodsList.length">
        <div class="goodDetails" v-for="(item,index) in planList.goodsList" @click="toGoodDetails(item.goodsId,index)">
          <div class="shopListWrap">
            <div class="product">
              <div class="shopInfo">
                <div class="imgWrap">
                  <img :src="item.goodsThumb" alt="">
                </div>
                <div class="shopDetail">
                  <p class="detailTitle">{{item.goodsTitle}}</p>
                  <p class="detailDescription">{{item.goodsSubtitle}}</p>
                  <div class="detailCount">
                    <div class="spanCount">
                      <span>x{{item.goodsNum}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="detailsFooter" @click="submit">
      <div class="footerButton">
        <p>参与活动</p>
      </div>
    </div>

  </div>
  <div class="spinner" style="margin-top: 3rem;" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  import { ImagePreview } from 'vant';
  export default {
    data() {
      return {
        current: 0,
        imgList:[],
        loading:true
      }
    },
    computed:{
      ...mapState({
        'planList':state => state.goodDetils.planList,
      })
    },
    watch:{
    },
    created(){
      this.$store.dispatch('getPlanDetails',this.$route.query.packageId)
        .then(res => {
          this.loading = false
          if (res.packageImages){
            this.imgList = this.planList.packageImages.split(",")
          }
        })
        .catch(err => {
          this.loading = true
        })
    },
    mounted(){
    },
    beforeDestory(){
    },
    methods:{
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
      toGoodDetails(goodsId,index){
        this.$router.push({path:'/GoodDetails',query:{goodsId:goodsId}})
      },
      submit(){
        this.$toast.loading({
          mask: true,
          message: '结算中...',
          loadingType:'spinner',
          duration:0
        });
        let goodsList = []
        this.planList.goodsList.map((item,index) => {
          let obj = {}
          obj.goodsId = item.goodsId
          obj.goodsNum = item.goodsNum
          goodsList.push(obj)
        })
        let data = {
          packageId:this.$route.query.packageId,
          goodsList:JSON.stringify(goodsList)
        }
        this.$store.dispatch('getPayCalculate',data)
          .then(res => {
            this.$router.push({path:'/ConfirmOrders',query:{packageId:data.packageId,goodsList:data.goodsList,status:'1',from:'market'}})
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
  .detailsHeaderContent img{
    width: 22px;
    margin-right: 10px;
  }
  .detailsHeaderContentActive{
    color: #f82a59;
  }
  .detailsContent {
    /*margin-top: 100px;*/
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
    border-top: 1Px #ddd solid;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: space-between;
  }
  .goodMount{

  }
  .goodPirce{
    margin: 40px 0 30px 0;
    font-size: 36px;
    color: #f82a59;
    display: flex;
    align-items: center;
  }
  .goodPirce span{
    margin-right: 28px;
  }
  .goodPirce s{
    font-size: 30px;
    color: #666;
    margin-right: 41px;
    margin-top: 3px;
  }
  .goodPirce .goodLabels{
    display: flex;
    justify-content: flex-start;
  }
  .goodPirce .goodLabels span{
    border-radius: 4px;
    border: 1Px #f82a59 solid;
    font-size: 20px;
    color: #f82a59;
    line-height: 20px;
    height:20px;
    text-align: center;
    padding: 5px;
    margin-left: -15px;
  }
  .goodTitle{
    font-size: 30px;
    color: #333333;
    margin: 0px 0px 30px 8px;
  }
  .goodDescription{
    font-size: 24px;
    color: #666;
    margin: 30px 0px 50px 8px;
  }
  .goodCollect img{
    width: 40px;
    margin-top: 50px;
  }
  .goodSpecificationsCell .van-cell__title{
    display: flex;
    align-items: center;
  }
  .goodSpecificationsCellContent span{
    font-size: 30px;
    color: #666;
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
    border-top: 1Px #ddd solid;
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
    border: 1Px #eee solid;
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
    border: 1Px #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }
  .imgWrap img{
    height:100%;
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
    justify-content: flex-end;
    min-width: 100%;
    font-size: 28px;
  }
  .spanCount{
    height:40px;
    line-height: 40px;
    font-size: 28px;
  }
</style>
