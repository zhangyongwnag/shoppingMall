<template>
  <div class="wrap">
    <form action="/" class="search" v-if="!$route.query.categoryId">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        background="white"
      />
    </form>

    <div class="defaultSearchList" v-if="!searchStatus">
      <p class="hotSearch">热门搜索</p>
      <span class="defaultButton" v-for="(item,index) in hotList" @click="setHot(item.name,index)">
        {{item.name}}
      </span>
    </div>

    <div v-else>
      <div class="hotSale" v-loading="loading" :style="$route.query.categoryId ? {minHeight:'100vh'} : {minHeight:'calc(100vh - 1.10rem)'}">
        <div class="hotSaleList" v-if="searchListLeft.length">
          <div class="hotSaleListLeft">
            <div class="hotSaleListProduct" style="background-color: #fff" v-for="(item,index) in searchListLeft"
                 @click="$router.push({path:'/GoodDetails',query:{goodsId:item.goodsId}})">
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
            <div class="hotSaleListProduct" style="background-color: #fff" v-for="(item,index) in searchListRight"
                 @click="$router.push({path:'/GoodDetails',query:{goodsId:item.goodsId}})">
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
        <div v-else class="empty">
          <img src="../../assets/img/emptyData.png" alt="">
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  export default {
    data() {
      return {
        value:'',
        searchStatus:false,
        loading:false,
        hotList:[
          {
            name:'面膜'
          },
          {
            name:'补水'
          },
          {
            name:'备长炭'
          },
          {
            name:'氨基酸'
          },
          {
            name:'洁面乳'
          },
          {
            name:'保湿乳'
          },
          {
            name:'臻宠'
          },
          {
            name:'臻享'
          },
        ],
        searchList:{},
        searchListLeft:[],
        searchListRight:[],
        label:[]
      }
    },
    watch:{
      value(v){
        if (v == ''){
          this.searchStatus = false
        }
      }
    },
    computed:{

    },
    beforeRouteEnter(to, from, next) {
      to.meta.title = to.query.categoryName
      next()
    },
    created(){
      this._getSearchGoodByCategoryId()
    },
    activated(){
      this._getSearchGoodByCategoryId()
    },
    methods:{
      onSearch(){
        let data = {
          currentPage:'1',
          pageRow:'10000',
          categoryId:'',
          searchKey:this.value
        }
        this._searchGood(data)
      },
      onCancel(){
        this.searchStatus = false
        this.loading = false
      },
      setHot(name,index){
        this.value = name
        this.onSearch()
      },
      toGoodDetails(goodsId,index){
        this.$router.push({path:'/GoodDetails',query:{goodsId:goodsId}})
      },
      _searchGood(data){
        this.loading = true
        this.searchStatus = true
        this.httpCli({
          url:config.URL_GET_SHOP_GOODS_LIST,
          data:data
        })
          .then(res => {
            this.loading = false
            if (res.errorCode == 100){
              this.searchList = res.data.list
              this.searchListRight = this.searchList.gridModel.filter((item,index) => ((index + 1) % 2) == 0)
              this. searchListLeft = this.searchList.gridModel.filter((item,index) => ((index + 1) % 2) != 0)

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
      },
      _getSearchGoodByCategoryId(){
        if (this.$route.query.categoryId){
          this.value = this.$route.query.categoryName
          let data = {
            currentPage:'1',
            pageRow:'10000',
            categoryId:this.$route.query.categoryId,
            searchKey:''
          }
          this._searchGood(data)
        }else {
          this.value = ''
        }
      }
    }
  }
</script>
<style scoped>
  .wrap{
    background-color: #fff;
  }
.search{
  height:64px;
  border-radius: 32px;
  background-color: #fff;
  padding-top: 15px;
}
  .defaultSearchList{
    padding: 0px 0px 0 20px;
    overflow: hidden;
    height: calc(100vh - 80px);
  }
  .defaultButton{
    /*display: inline-block;*/
    border-radius: 32px;
    padding: 15px 30px;
    background-color: #fee1e8;
    margin: 30px 30px 0 0;
    font-size: 28px;
    color: #df2650;
    float: left;
    text-align: center;
    position: relative;
  }
  .defaultButton::before{
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
  .defaultButton:active::before {
    opacity: 0.3;
  }
  .hotSearch{
    font-size: 24px;
    color: #333333;
    margin: 50px 0 10px 0;
  }
.hotSale{
  /*margin-top: 15px;*/
  padding: 17px 0;
  box-sizing: border-box;
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
    padding: 20px 30px;
    box-sizing: border-box;
    margin-top: 20px;
  }
  .hotSaleImgWrap{
    display: flex;
    justify-content: center;
    align-items: center;
    height:270px;
    position: relative;
    overflow: hidden;
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
    width: 100%
  }
  .hotSaleListTabs{
    margin: 30px auto 24px;
    display: flex;
    align-items: flex-start;
  }
  .hotSaleListTabs span{
    display: block;
    border-radius: 4px;
    font-size: 18px;
    color: #fff;
    background-color: #F2180C;
    line-height: 20px;
    height:20px;
    text-align: center;
    padding: 5px 8px;
    margin-right: 8px;
  }
  .hotSaleListTitle{
    font-size: 28px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 20px 0 20px;
  }
  .hotSaleListDiscription{
    font-size: 24px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #666;
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
</style>
