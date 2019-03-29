<template>
  <div>
    <div class="hotSale" v-if="!loading">
      <div class="hotSaleList" v-if="searchListLeft.length">
        <div class="hotSaleListRight">
          <div class="hotSaleListProduct" @click="toGoodDetails(item.goodsId,index)" v-for="(item,index) in searchListLeft">
            <div class="hotSaleImgWrap">
              <!--缺货显示的图片-->
              <img class="goodListFalse" src="../assets/img/02/goodsListFalse.png"  alt="" v-if="item.goodsStoreEmpty == '0'">
              <img :src="item.goodsThumb" alt="">
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
          <div class="hotSaleListProduct" @click="toGoodDetails(item.goodsId,index)" v-for="(item,index) in searchListRight">
            <div class="hotSaleImgWrap">
              <!--缺货显示的图片-->
              <img class="goodListFalse" src="../assets/img/02/goodsListFalse.png"  alt="" v-if="item.goodsStoreEmpty == '0'">
              <img :src="item.goodsThumb" alt="">
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
      <div v-else class="empty">
        <img src="../assets/img/empty.png" alt="">
        <p>暂时还没有商品</p>
      </div>
    </div>
    <div class="spinner" style="margin-top:3rem" v-else>
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
        loading:false,
        searchList:{},
        searchListLeft:[],
        searchListRight:[],
        label:[]
      }
    },
    beforeRouteEnter(to, from, next) {
      to.meta.title = to.query.categoryName
      next()
    },
    created(){
      if (this.$route.query.categoryId){
        let data = {
          currentPage:'1',
          pageRow:'10000',
          categoryId:this.$route.query.categoryId,
          searchKey:''
        }
        this.getShoppingList(data)
      }
    },
    methods:{
      toGoodDetails(goodsId,index){
        this.$router.push({path:'/GoodDetails',query:{goodsId:goodsId}})
      },
      getShoppingList(data){
        this.loading = true
        this.httpCli({
          url:config.URL_SHOP_GOODS_LIST,
          data:data
        })
          .then(res => {
            this.loading = false
            if (res.errorCode == 100){
              this.searchList = res.data.list
              this.searchListLeft = this.searchList.gridModel.filter((item,index) => ((index + 1) % 2) == 0)
              this.searchListRight = this.searchList.gridModel.filter((item,index) => ((index + 1) % 2) != 0)

              if (res.data.list.gridModel && res.data.list.gridModel){
                res.data.list.gridModel.map(item => {
                  if (item.goodsLabel.indexOf(',') != -1){
                    this.label = item.goodsLabel.split(',')
                  }
                })
              }
            }
          })
          .catch(err => {
            this.loading = false
          })
      }
    }
  }
</script>
<style scoped>
  .hotSale{
    margin-top: 15px;
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
  .goodListFalse{
    position: absolute;
    top:27.5px;
    left:40px;
    width: 225px !important;
    height:225px !important;
  }
  .hotSaleStoreEmpty{
    width: 70%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .hotSaleImgWrap img{
    width: 100%;
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
    /*word-break: break-all;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box; !** 对象作为伸缩盒子模型显示 **!*/
    /*-webkit-box-orient: vertical; !** 设置或检索伸缩盒对象的子元素的排列方式 **!*/
    /*-webkit-line-clamp: 2; !** 显示的行数 **!*/
    /*overflow: hidden;  !** 隐藏超出的内容 **!*/
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
