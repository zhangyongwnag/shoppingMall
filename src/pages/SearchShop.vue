<template>
  <div class="wrap">
    <form action="/" class="search">
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
      <div class="spinner" style="margin-top: 50px;" v-else>
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
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
      ...mapState({
        'userInfo':state => state.userInfo
      })
    },
    created(){
      if (this.$route.query.categoryId){
        let data = {
          currentPage:'1',
          pageRow:'10000',
          categoryId:this.$route.query.categoryId,
          searchKey:''
        }
        this.searchGood(data)
      }
    },
    methods:{
      onSearch(){
        let data = {
          currentPage:'1',
          pageRow:'10000',
          categoryId:'',
          searchKey:this.value
        }
        this.searchGood(data)
      },
      onCancel(){
        this.searchStatus = false
      },
      setHot(name,index){
        this.value = name
        this.onSearch()
      },
      toGoodDetails(goodsId,index){
        this.$router.push({path:'/GoodDetails',query:{goodsId:goodsId}})
      },
      searchGood(data){
        this.loading = true
        this.searchStatus = true
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
  .wrap{
    padding-top: 15px;
  }
.search{
  height:64px;
  border-radius: 32px;
  background-color: #f3f3f3;
}
  .defaultSearchList{
    padding: 0px 0px 0 20px;
    overflow: hidden;
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
