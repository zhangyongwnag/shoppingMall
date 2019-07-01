<template>
  <div style="background-color: #f3f2f1;min-height: 100vh">
    <div class="content">
      <img src="../../assets/img/invite/invite_vipImg.png" alt="">
      <div class="giveShopList">
        <img class="becomeText" src="../../assets/img/invite/invite_brcomeText.png" alt="">
        <div class="imgWrap">
          <div class="imgWrapLeft">
            <div>您将获得</div>
            <div><span style="font-size: 0.67rem">￥</span>199</div>
            <div style="padding-top: 0.5rem">现金红包</div>
          </div>
          <div class="imgWrapLeft">
            <div>好友可得</div>
            <div><span style="font-size: 0.67rem">￥</span>988</div>
            <div class="imgWrapLeftTextWrap">
              <span>礼包兑换券</span>
              <span>每年≥1万购物优惠券</span>
              <span>钻石会员专属权益</span>
            </div>
          </div>
        </div>
      </div>
      <div class="giveShopList">
        <van-tabs v-model="active" :line-width="30" class="tabWrap" swipeable>
          <van-tab title="邀请攻略">
            <div class="inviteInfo">
              <div class="inviteInfoTitle">如何邀请注册</div>
              <div class="inviteStep">
                <div class="stepInfo">
                  <img src="../../assets/img/invite/invite_step1.png" alt="">
                  <div>分享注册</div>
                  <div>链接或扫码</div>
                </div>
                <div class="stepInfo">
                  <img src="../../assets/img/invite/invite_step2.png" alt="">
                  <div>好友支付</div>
                  <div>￥988注册</div>
                </div>
                <div class="stepInfo">
                  <img src="../../assets/img/invite/invite_step3.png" alt="">
                  <div>登录换购</div>
                  <div>钻石会员礼包</div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="全部礼包">
                   <div class="goodInfoWrap">
                     <div class="goodInfo" v-for="(item,index) in inviteHighVipMiddlePageData.inviteGoodsList" @click="$router.push({path:'/ActiveGoodDetails',query:{goodsId:item.goodsId,status:false}})">
                       <div class="goodImg">
                         <img :src="item.goodsThumb" alt="">
                       </div>
                       <div>
                         <div class="goodTitle">{{item.goodsTitle}}</div>
                         <div class="goodPrice">券后￥0&nbsp;&nbsp;<span><s>市场价￥{{item.goodsMarketPrice}}</s></span></div>
                       </div>
                     </div>
                   </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="footer">
        <van-button v-waves round @click.stop.prevent="animationWrapShow">邀请钻石会员</van-button>
      </div>
    </div>
    <div @click.stop.prevent="animationWrapHidden" class="shareWrap" style="transform: scale(0)" id="shareWrap">
      <img src="../../assets/img/shareWrap.png" alt="">
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  import * as wx from '../../utils/weixin'
  export default {
    data () {
      return {
        active:'0',
      }
    },
    computed:{
      ...mapState({
        'inviteHighVipMiddlePageData':state => state.invite.inviteHighVipMiddlePageData
      })
    },
    created(){
      this._getData()
    },
    activated(){
      if (!this.inviteHighVipMiddlePageData.memberDiamondQrcode){
        this._getData()
      }else {
        let obj = {
          title:this.inviteHighVipMiddlePageData.share.shareTitle,
          link:this.inviteHighVipMiddlePageData.share.shareLink,
          imgUrl:this.inviteHighVipMiddlePageData.share.shareIcon,
          desc:this.inviteHighVipMiddlePageData.share.shareDescription,
        }
        wx.initWx(obj)
      }
    },
    destroyed(){
      wx.shareInfo()
    },
    deactivated(){
      wx.shareInfo()
    },
    methods:{
      animationWrapShow(){
        document.getElementById('shareWrap').style.opacity = '1'
        document.getElementById('shareWrap').style.transform = 'scale(1)'
      },
      animationWrapHidden(){
        document.getElementById('shareWrap').style.opacity = '0'
        document.getElementById('shareWrap').style.transform = 'scale(0)'
      },
      _getData(){
        this.$toast.loading({
          mask: true,
          message: '加载中...',
          loadingType:'spinner',
          duration:0
        });
        this.$store.dispatch('getInviteHighVipMiddlePage')
          .then(res => {
            this.$toast.clear()
            let obj = {
              title:res.data.share.shareTitle,
              link:res.data.share.shareLink,
              imgUrl:res.data.share.shareIcon,
              desc:res.data.share.shareDescription,
            }
            wx.initWx(obj)
          })
          .catch(err => {
            this.$toast.clear()
          })
      }
    }
  }
</script>
<style scoped>
  .content{
    width: 100%;
    background-image: url(../../assets/img/invite/invite_bjRed.png);
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 42px;
    /*height:460px;*/
  }
  .content img{
    width: 90%;
  }
  .giveShopList{
    width: 95%;
    background-color: #ffffff;
    border-radius: 12px;
    margin-top: 30px;
  }
  .becomeText{
    width: 100% !important;
    margin-top: 30px;
  }
  .imgWrap{
    padding: 40px 70px;
    display: flex;
    justify-content: space-around;
  }
  .imgWrap .imgWrapLeft{
    width: 45%;
    background-image: url(../../assets/img/invite/invite_imgWrapLef.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height:310px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-around;
    color: #fff;
    margin-right:40px;
    padding: 20px 0;
    box-sizing: border-box;
  }
  .imgWrap .imgWrapLeft div:nth-child(1){
    font-size: 28px;
    color: #D29B5E;
    border-radius: 12px 12px 12px 0px;
    background-color: #fff;
    padding: 5px;
    box-sizing: border-box;
    letter-spacing: 5px;
  }
  .imgWrap .imgWrapLeft div:nth-child(2){
    font-size: 56px;
    font-weight: bold;
  }
  .imgWrap .imgWrapLeft div:nth-child(3){
    height:100px;
    font-size: 22px;
    box-sizing: border-box;
  }
  .imgWrapLeftTextWrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .imgWrapLeftTextWrap span{
    margin-top: 3px;
  }
  .imgWrap .imgWrapRight{
    width: 45%;
    height:270px;
    border: 1PX #eee solid;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .imgWrap .imgWrapRight img{
    width: 100%;
    height:100%;
  }
  .tabWrap{
    width: 100%;
    padding-left:50px;
    padding-right:50px;
    box-sizing: border-box;
    box-shadow: none !important;
    border: 0px;
    border-radius: 15px 15px 0 0;
    padding-bottom: 30px;
    margin-top: 0px;
  }
  .tabWrap div{
    box-shadow: none !important;
  }
  .inviteInfo{

  }
  .inviteInfo .inviteInfoTitle{
    font-size: 60px;
    font-weight: bold;
    text-align: center;
    color: rgb(51,51,51);
    margin-top: 76px;
  }
  .inviteStep{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    padding: 60px 10px;
  }
  .stepInfo{
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .stepInfo img{
    width: 100px;
    margin-bottom: 10px;
  }
  .goodInfoWrap{
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .goodInfo{
    width: 47.5%;
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .goodImg img{
    width: 100%;
  }
  .goodTitle{
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
    white-space: nowrap;
  }
  .goodPrice span{
    font-size: 22px;
    color: rgb(102,102,102);
  }
  .footer{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 100px 0 100px 0;
  }
  .footer button {
    width: 350px;
    /*height: 102px;*/
    border-radius: 51px;
    background-color: rgb(168,49,59);
    font-size: 30px;
    color: rgb(248,248,248);
  }
</style>
