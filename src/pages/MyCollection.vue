<template>
  <div>
    <div v-if="!loading">
      <div class="goodsList" v-if="collectList.gridModel && collectList.gridModel.length">
        <div class="goodDetails" v-for="(item,index) in collectList.gridModel" @click="toGoodDetails(item.goodsId,index)">
          <div class="shopListWrap">
            <div class="product">
              <div class="shopInfo">
                <div class="imgWrap">
                  <img :src="item.goodsThumb" alt="" >
                  <img v-if="item.goodsStoreEmpty == '0'" src="../assets/img/02/goodsListFalse.png" alt="" class="goodsNumFalse">
                </div>
                <div class="shopDetail">
                  <p class="detailTitle">{{item.goodsTitle}}</p>
                  <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
                  <p class="detailDescription" v-else>{{item.goodsSubtitle}}</p>
                  <div class="detailCount" @click.stop>
                    <span style="color: #f82a59;" v-if="userInfo.memberType == '1'">￥{{item.goodsMarketPrice}}</span>
                    <span style="color: #f82a59;" v-else>￥{{item.goodsVipPrice}}</span>
                    <div class="spanCount" @click="cancelCollect(item.goodsId,index)">
                      <img src="../assets/img/05/wdscTrue.png" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty">
        <img src="../assets/img/empty.png" alt="">
        <p>暂时还没有商品</p>
      </div>
    </div>
    <div class="spinner" style="margin-top: 3rem;" v-else>
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  export default {
    data() {
      return {
        loading:true,
      }
    },
    computed:{
      ...mapState({
        'collectList':state => state.collection.collectList,
        'userInfo':state => state.userInfo
      })
    },
    created(){
      this.$store.dispatch('getCollectList')
        .then(res => {
          this.loading = false
        })
        .catch(err => {
          this.loading = false
        })
    },
    methods:{
      cancelCollect(goodsId,index){
        this.$store.dispatch('getCancelGood',goodsId)
      },
      toGoodDetails(goodsId,index){
        this.$router.push({path:'/GoodDetails',query:{goodsId:goodsId}})
      },
    }
  }
</script>
<style scoped>
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
    border: 1pX #eee solid;
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
    position: relative;
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
    justify-content: space-between;
    min-width: 100%;
    font-size: 28px;
  }
  .spanCount{
    height:40px;
    line-height: 40px;
    font-size: 28px;
  }
  .spanCount img{
    width: 30px;
  }
  .goodsNumFalse{
    position: absolute;
    left: 25px;
    top:25px;
    width: 150px;
    height: 150px !important;
  }
</style>
