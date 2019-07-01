<template>
  <div v-loading="loading">
    <!--<div class="shopListWrap">-->
      <!--<div class="product">-->
        <!--<div class="productStatus">-->
              <!--<span>-->
                <!--已完成-->
              <!--</span>-->
          <!--<span>已超过售后时间&nbsp;<van-icon name="arrow"/></span>-->
        <!--</div>-->
        <!--&lt;!&ndash;<div class="shopInfo" @click.stop>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="imgWrap" style="position: relative;overflow: hidden">&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;<img :src="dataItem.goodsThumb" alt="">&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="giftFree">&ndash;&gt;-->
              <!--&lt;!&ndash;<span>赠品</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="shopDetail">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="detailTitle">我是title阿萨德啊实打实大所多阿达湿哒哒实打实大师</div>&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;<p class="detailDescription" v-if="dataItem.goodsOptionName">{{dataItem.goodsOptionName}}</p>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="detailDescription">我是subtitle</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div>&ndash;&gt;-->
              <!--&lt;!&ndash;&lt;!&ndash;<span class="hotSaleCount" v-if="dataItem.goodsVipPrice">&ndash;&gt;&ndash;&gt;-->
              <!--&lt;!&ndash;&lt;!&ndash;￥{{dataItem.goodsVipPrice}}&ndash;&gt;&ndash;&gt;-->
              <!--&lt;!&ndash;&lt;!&ndash;</span>&ndash;&gt;&ndash;&gt;-->
              <!--&lt;!&ndash;<span class="hotSaleCount">&ndash;&gt;-->
                    <!--&lt;!&ndash;￥100.00&ndash;&gt;-->
                  <!--&lt;!&ndash;</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="shopNumber">x12</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--<div class="shopInfo" @click.stop>-->
          <!--<div class="scroll">-->
            <!--<div class="wrap">-->
              <!--<div class="imgWrap" style="position: relative;overflow: hidden">-->
                <!--&lt;!&ndash;<img :src="dataItem.goodsThumb">&ndash;&gt;-->
                <!--<div class="giftFree">-->
                  <!--<span>赠品</span>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="imgWrap">-->
                <!--&lt;!&ndash;<img :src="dataItem.goodsThumb">&ndash;&gt;-->
              <!--</div>-->
              <!--<div class="imgWrap">-->
                <!--&lt;!&ndash;<img :src="dataItem.goodsThumb">&ndash;&gt;-->
              <!--</div>-->
              <!--<div class="imgWrap">-->
                <!--&lt;!&ndash;<img :src="dataItem.goodsThumb">&ndash;&gt;-->
              <!--</div>-->
              <!--<div class="imgWrap">-->
                <!--&lt;!&ndash;<img :src="dataItem.goodsThumb">&ndash;&gt;-->
              <!--</div>-->
              <!--<div class="imgWrap">-->
                <!--&lt;!&ndash;<img :src="dataItem.goodsThumb">&ndash;&gt;-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="detailCount detailCountAll">-->
          <!--<span>共计123件商品&nbsp;合计：￥123</span>-->
          <!--<div>-->
            <!--<p @click="" v-active>申请售后</p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="empty">
      <img src="../../assets/img/empty_order.png" alt="">
      <p>暂时没有订单</p>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data() {
      return {
        loading:false,
        packages:[]
      }
    },
    created(){
      this.loading = true
      setTimeout(() => {
        this.loading = false
      },500)
    },
    methods:{

    }
  }
</script>
<style scoped>
  .shopListWrap{
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 50px;
  }
  .product{
    width: 93%;
    border: 1PX #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    padding: 30px 32px 0px 30px;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #ffffff;
    margin: 0 auto;
    margin-top: 28px;
  }
  .productStatus{
    padding-bottom: 0px;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .productStatus span:nth-child(1){
    color: rgb(51,51,51);
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .productStatus span:nth-child(2){
    color: #F2180C;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .productStatus span:nth-child(2) i{
    font-size: 24px;
    margin-top: 0px;
    color: rgb(51,51,51);
  }
  .shopInfo{
    width: 100%;
    display: flex;
    height:200px;
    margin-top: 30px;
  }
  .scroll{
    width: 100%;
    overflow-x: auto;
    height:205px;
  }
  .wrap{
    display: flex;
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
    width: 100% !important;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 10px;
  }
  .shopNumber{
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    color: #666;
    margin-left: 25px;
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
    min-width: 100%;
  }
  .detailCount div{
    display: flex;
    align-items: center;
  }
  .detailCount div p{
    width: 120px;
    height:44px;
    line-height: 44px;
    text-align: center;
    border: 1Px rgb(102,102,102) solid;
    border-radius: 22px;
    font-size: 22px;
    color: rgb(102,102,102);
    margin-left: 30px;
    position: relative;
  }
  .detailCount div p:nth-child(1){
    border: 1Px #F2180C solid;
    color: #F2180C;
    margin-left: 0;
  }

  .detailCountAll span{
    font-size: 20px;
    color: #666;
    line-height: 88px;
  }
</style>
