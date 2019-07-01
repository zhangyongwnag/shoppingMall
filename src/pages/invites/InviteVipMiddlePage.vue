<template>
  <div class="wrap">
    <div class="content">
      <img :src="inviteVipMiddlePageData.memberVipQrcode" alt="">
      <div class="toast">
        <div>一次邀请&nbsp;永久有益</div>
        <div>付费钻石会员邀请的VIP在"蝶库"购买商品，您都享有利润</div>
      </div>
      <div class="toast">
        <div>VIP自主下单&nbsp;省时省力</div>
        <div>VIP可自主挑选和购买商品、跟踪物流、申请和查看售后</div>
      </div>
      <van-button type="primary" class="inviteButton" v-waves @click="animationWrapShow">立即邀请</van-button>
      <div class="footerText" @click="$router.push({path:'/MyInviteUser'})">您已成功邀请&nbsp;{{inviteVipMiddlePageData.inviteNum}}&nbsp;位好友</div>
    </div>
    <div @click="animationWrapHidden" class="shareWrap" style="transform: scale(0)" id="shareWrap">
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
        inviteInfo:{},
        show:false
      }
    },
    computed:{
      ...mapState({
        'inviteVipMiddlePageData':state => state.invite.inviteVipMiddlePageData
      })
    },
    created(){
      this._getData()
    },
    activated(){
      if (!this.inviteVipMiddlePageData.memberVipQrcode){
        this._getData()
      }else {
        let obj = {
          title:this.inviteVipMiddlePageData.share.shareTitle,
          link:this.inviteVipMiddlePageData.share.shareLink,
          imgUrl:this.inviteVipMiddlePageData.share.shareIcon,
          desc:this.inviteVipMiddlePageData.share.shareDescription,
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
        this.$store.dispatch('getInviteVipMiddlePage')
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
.wrap{
  width: 100%;
  height:100vh;
  background-image: url(../../assets/img/invite/invite_vpiBj.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: #FB5615;
  padding-top: 340px;
  box-sizing: border-box;
}
  .content{
    width: 50%;
    margin: 0 25%;
  }
.content img{
  border-radius: 15px;
  width: 100%;
}
  .toast{
    margin-top: 15px;
    color: #fff;
  }
.toast div:nth-child(1){
  font-size: 34px;
  margin-top: 10px;
}
.toast div:nth-child(2){
  font-size: 24px;
  line-height: 38px;
  margin-top: 10px;
}
  .inviteButton{
    width: 100%;
    margin-top:20px;
    background-color: yellow;
    box-shadow: 0px 3px 20px 1Px #FB5615;
    font-size: 34px;
    font-weight: bold;
    color: #FB5615;
    border-radius: 22px;
  }
  .footerText{
    color: #fff;
    text-align: center;
    text-decoration: underline;
    margin-top: 10px;
  }
</style>
