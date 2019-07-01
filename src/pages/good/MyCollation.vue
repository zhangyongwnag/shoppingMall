<template>
  <div>
    <van-list
      v-model="pageLoading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div class="goodsList" v-if="collectionList.length">
        <div class="goodDetails">
          <div class="shopListWrap">
            <div class="product" v-for="(item,index) in collectionList">
              <div class="shopInfo">
                <div class="imgWrap">
                  <img :src="item.goodsThumb" alt="" v-if="item.goodsStoreEmpty != '0'">
                  <img src="../../assets/img/goodEmpty.png" alt="" class="goodsNumFalse" v-else>
                </div>
                <div class="shopDetail">
                  <div class="detailTitle">{{item.goodsTitle}}</div>
                  <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
                  <div class="detailDescription" v-else>{{item.goodsSubtitle}}</div>
                  <div class="detailCount" @click.stop>
                    <span style="color: #F2180C;">￥123</span>
                    <div class="spanCount" @click="cancelCollect(item.goodsId,index)">
                      <img src="../../assets/img/shop/shopping_collation_checkFalse.png" alt="">
                    </div>
                  </div>
                </div>
              </div>
              <div class="detailCount detailCountAll">
                <span>库存{{item.stockNum}}</span>
                <div>
                  <p @click="shareShop(item.shareTitle,item.shareLink,item.shareDescription,item.shareIcon)" v-waves>分享赚</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="!pageLoading && !collectionList.length" class="empty">
        <img src="../../assets/img/empty_goods.png" alt="">
        <p>暂无收藏商品</p>
      </div>
      <div class="spinner" slot="loading" style="margin-top: 0;padding: 0.35rem 0">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>

      <div v-if="!pageLoading" @click="animationWrapHidden" class="shareWrap" style="transform: scale(0)" id="shareWrap">
        <img src="../../assets/img/shareWrap.png" alt="">
      </div>
    </van-list>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  import * as wx from '../../utils/weixin'
  export default {
    data() {
      return {
        pageLoading:false,
        finished: false,
        error:false,
        currentPage:'1',
        totalPage:'1',
      }
    },
    computed:{
      ...mapState({
        'collectionList':state => state.collection.collectionList
      })
    },
    created(){

    },
    destroyed(){
      this.$store.commit('clearCollecionList')
      wx.shareInfo()
    },
    methods:{
      onLoad(){
        console.log(1)
        this._getColllectionList()
      },
      _getColllectionList(){
        if (this.currentPage > this.totalPage){
          this.pageLoading = false
          this.finished = true
          return
        }
        let data = {
          currentPage:this.currentPage++,
          pageRow:10
        }
        this.pageLoading = true
        this.$store.dispatch('getCollectionList',data)
          .then(res => {
            this.pageLoading = false
            this.totalPage = res.totalPage
          })
          .catch(err => {
            this.pageLoading = false
          })
      },
      cancelCollect(goodsId,index){
        this.$toast.loading({
          mask: true,
          message: '加载中...',
          loadingType:'spinner',
          duration:0
        });
        this.$store.dispatch('getCancelGood',goodsId)
          .then(res => {
            this.$toast.clear()
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      toGoodDetails(goodsId,index){
        this.$router.push({path:'/GoodDetails',query:{goodsId:goodsId}})
      },
      shareShop(title,link,desc,imgUrl){
        let obj = {
          title:title,
          link:link,
          imgUrl:imgUrl,
          desc:desc,
        }
        wx.initWx(obj)
        document.getElementById('shareWrap').style.opacity = '1'
        document.getElementById('shareWrap').style.transform = 'scale(1)'
      },
      animationWrapHidden(){
        document.getElementById('shareWrap').style.opacity = '0'
        document.getElementById('shareWrap').style.transform = 'scale(0)'
      }
    }
  }
</script>
<style scoped>
  .headerToast{
    background-color: rgb(242,244,243);
    white-space: nowrap;
    font-size: 24px;
    color: rgb(102,102,102);
  }

  .shopListWrap{
    width: 93%;
    box-sizing: border-box;
    padding-bottom: 50px;
    margin: 0 auto;
    padding-top: 30px;
  }
  .product{
    width: 100%;
    border: 1PX #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    padding: 22px 30px 0px 30px;
    box-sizing: border-box;
    background-color: #ffffff;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 10px;
  }
  .product:nth-child(1){
    margin-top: 0px;
  }
  .shopInfo{
    width: 100%;
    display: flex;
    height:200px;
  }
  .imgWrap{
    width: 200px;
    height:200px;
    min-width: 200px;
    min-height: 200px;
    border: 1PX #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    overflow: hidden;
    position: relative;
  }
  .imgWrap img{
    width:100%;
  }
  .spanCount{
    height:40px;
    line-height: 40px;
    font-size: 28px;
    margin-right: 10px;
  }
  .spanCount img{
    width: 35px;
  }
  .goodsNumFalse{
    position: absolute;
    left: 25px;
    top:25px;
    width: 150px !important;
    height: 150px !important;
  }
  .shopDetail{
    width: 65% !important;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 10px;
  }
  .detailTitle{
    margin-top: 0px;
    text-align: justify;
    font-size: 24px;
    color: #333;
    /*word-break: break-all;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box; !** 对象作为伸缩盒子模型显示 **!*/
    /*-webkit-box-orient: vertical; !** 设置或检索伸缩盒对象的子元素的排列方式 **!*/
    /*-webkit-line-clamp: 2; !** 显示的行数 **!*/
    /*overflow: hidden;  !** 隐藏超出的内容 **!*/
  }
  .detailDescription{
    font-size: 20px;
    margin-top:-20px;
    color: rgb(153,153,153);
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hotSaleCount{
    font-size: 30px;
    color: #F2180C;
  }
  .detailCount{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 98%;
    margin-left: 10px;
  }
  .detailCount div{
    display: flex;
    align-items: center;
  }
  .detailCount div p{
    width: 120px;
    height:50px;
    line-height: 50px;
    text-align: center;
    border-radius: 22px;
    font-size: 22px;
    position: relative;
    color: #ffffff;
    background-color: #F2180C;
  }

  .detailCountAll span{
    font-size: 22px;
    color: #666;
    line-height: 88px;
  }
</style>
