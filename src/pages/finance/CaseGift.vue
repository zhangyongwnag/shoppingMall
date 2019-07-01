<template>
  <div class="wrap">
    <div class="title">钻石会员礼包专区</div>
    <div class="subtitle">您有一张988元钻石会员礼包抵用券</div>
    <div class="giftContent" v-waves>
      <div class="price">￥988</div>
      <div class="info">
        <div>钻石会员礼包抵扣券</div>
        <div>仅限于礼包专区商品 <br>注册之日起7天内有效</div>
      </div>
    </div>
    <div class="goodInfoWrap">
      <div class="goodInfo" v-for="(item,index) in giftList" @click="$router.push({path:'/ActiveGoodDetails',query:{goodsId:item.goodsId,status:true}})">
        <div class="goodImg">
          <img :src="item.goodsThumb" alt="">
        </div>
        <div>
          <div class="goodTitle">{{item.goodsTitle}}</div>
          <div class="goodPrice">券后￥0&nbsp;&nbsp;<span><s>市场价￥{{item.goodsMarketPrice}}</s></span></div>
          <van-button class="buyButton" v-active round>立即换购</van-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <!--<van-button round v-waves @click="quit">暂不领取，跳过</van-button>-->
      <div @click="quit" style="color: dodgerblue;text-decoration: underline">暂不领取，跳过</div>
    </div>
  </div>
</template>
<script>
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data () {
      return {
        giftList:[]
      }
    },
    created(){
      this._getGiftList()
    },
    activated(){
      if (!this.giftList.length){
        this._getGiftList()
      }
    },
    methods:{
      quit(){
        this.$route.query.status == 'new' ? this.$router.replace({path:'/Main/Home'}) : this.$router.replace({path:'/Main/PersonCenter'})
        localStorage.setItem('caseGifShow',false)
      },
      _getGiftList(){
        this.$toast.loading({
          mask: true,
          message: '加载中...',
          loadingType:'spinner',
          duration:0
        });
        let data = {

        }
        this.httpCli({
          url:config.URL_MEMBER_DIAMONDS_GOODS_LIST,
          data:data
        })
          .then(res => {
            this.$toast.clear()
            if (res.errorCode == 100){
              this.giftList = res.data.goodsList
            }
          })
          .catch(err => {
            this.$toast.clear()
          })
      }
    }
  }
</script>
<style scoped>
.wrap{
  padding: 30px;
  background-color: #fff;
}
.title{
  font-size: 36px;
  /*font-weight: bold;*/
}
.subtitle{
  font-size: 24px;
  margin-top: 8px;
}
.giftContent{
  margin-top: 30px;
  width: 100%;
  height:200px;
  border-radius: 15px;
  background-image: url(../../assets/img/invite/invite_imgWrapLef.png);
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 15px;
  box-sizing: border-box;
}
.giftContent .price{
  font-size: 58px;
  font-weight: bold;
  color: #59380e;
  width: 38%;
  border-right: 2PX rgb(144,92,25) dashed;
  display: flex;
  align-items: center;
  justify-content: center;
}
.giftContent .info{
  width: 62%;
  padding-left: 45px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.giftContent .info div:nth-child(1){
  font-size: 34px;
  color: #59380e;
  margin-bottom: 10px;
}
.giftContent .info div {
  font-size: 24px;
  margin-top: 5px;
  color: #333333;
}
.goodInfoWrap{
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.goodInfo{
  width: 48%;
  border-radius: 12px;
  border: 1PX rgb(170,170,170) solid;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 30px;
}
.goodInfo:nth-child(odd){
  float: left;
}
.goodInfo:nth-child(even){
  float: right;
}
.goodImg{
  height:280px;
  overflow: hidden;
}
.goodImg img{
  width: 100%;
}
.goodTitle{
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 24px;
  color: rgb(102,102,102);
}
.goodPrice{
  display: flex;
  align-items: center;
  font-size: 28px;
  color: rgb(168,49,59);
  margin-top: 10px;
}
.goodPrice span{
  font-size: 22px;
  color: rgb(102,102,102);
}
.buyButton{
  font-size: 24px;
  width: 190px;
  height:56px;
  line-height: 56px;
  text-align: center;
  background-color: rgb(168,49,59);
  white-space: nowrap;
  color: #fff;
  margin:20px 0 0 55px;
}
.footer{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px 0 0px 0;
  margin-bottom: 30px;
  position: relative;
}
.footer button {
  width: 100%;
  height: 92px;
  border-radius: 10px;
  background-color: #fff;
  font-size: 30px;
  color: #c8c9cc;
  border: 1PX #eee solid;
}
</style>
