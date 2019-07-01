<template>
  <div>
    <van-cell-group>
      <van-switch-cell class="headerToast" v-model="checked" title="将我分享后的商品，自动添加至我的推荐" />
    </van-cell-group>
    <div class="shopListWrap">
      <div class="product">
        <div class="shopInfo" @click.stop>
          <div class="imgWrap" style="position: relative;overflow: hidden">
            <!--<img :src="dataItem.goodsThumb" alt="">-->
            <div class="giftFree">
              <span>赠品</span>
            </div>
          </div>
          <div class="shopDetail">
            <div class="detailTitle">我是title阿萨德啊实打实大所多阿达湿哒哒实打实大师</div>
            <!--<p class="detailDescription" v-if="dataItem.goodsOptionName">{{dataItem.goodsOptionName}}</p>-->
            <div class="detailDescription">我是subtitle</div>
            <div>
              <!--<span class="hotSaleCount" v-if="dataItem.goodsVipPrice">-->
              <!--￥{{dataItem.goodsVipPrice}}-->
              <!--</span>-->
              <span class="hotSaleCount">
                    ￥100.00
                  </span>
            </div>
          </div>
        </div>
        <div class="detailCount detailCountAll">
          <span>库存123</span>
          <div>
            <p @click="shareShop" v-waves>分享赚</p>
          </div>
        </div>
      </div>
      <div class="product">
        <div class="shopInfo" @click.stop>
          <div class="imgWrap" style="position: relative;overflow: hidden">
            <!--<img :src="dataItem.goodsThumb" alt="">-->
            <div class="giftFree">
              <span>赠品</span>
            </div>
          </div>
          <div class="shopDetail">
            <div class="detailTitle">我是title阿萨德啊实打实大所多阿达湿哒哒实打实大师</div>
            <!--<p class="detailDescription" v-if="dataItem.goodsOptionName">{{dataItem.goodsOptionName}}</p>-->
            <div class="detailDescription">我是subtitle</div>
            <div>
              <!--<span class="hotSaleCount" v-if="dataItem.goodsVipPrice">-->
              <!--￥{{dataItem.goodsVipPrice}}-->
              <!--</span>-->
              <span class="hotSaleCount">
                    ￥100.00
                  </span>
            </div>
          </div>
        </div>
        <div class="detailCount detailCountAll">
          <span>库存123</span>
          <div>
            <p @click="" v-waves>分享赚</p>
          </div>
        </div>
      </div>
    </div>
    <div @click.stop.prevent="animationWrapHidden" class="shareWrap" style="transform: scale(0)" id="shareWrap">
      <img src="../../assets/img/shareWrap.png" alt="">
    </div>
  </div>
</template>
<script>
  import * as wx from '../../utils/weixin'
  export default {
    data () {
      return {
        checked:true
      }
    },
    destroyed(){
      wx.shareInfo()
    },
    methods:{
      shareShop(){
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
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 50px;
  }
  .product{
    width: 100%;
    border: 1PX #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    padding: 22px 30px 0px 30px;
    box-sizing: border-box;
    border-radius: 0px;
    background-color: #ffffff;
    margin: 0 auto;
  }
  .product:nth-child(1){
    border-radius: 10px 10px 0 0;
  }
  .product:last-of-type{
    border-radius: 0 0 10px 10px;
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
  }
  .imgWrap img{
    width:100%;
  }
  .shopDetail{
    width: 80% !important;
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
