<template>
  <div style="background-color: #f3f2f1;min-height: 100vh">
    <div class="inviteInfo">
      <div class="avatar">
        <img :src="inviteInfo.inviteMember.memberAvatar" alt=""
             v-if="inviteInfo.inviteMember && inviteInfo.inviteMember.memberAvatar">
        <img src="../../assets/img/avatar.png" alt="" v-else>
      </div>
      <div class="userInfo">
        <div>Hi,我是 <span
          v-if="inviteInfo.inviteMember && inviteInfo.inviteMember.memberNickname">{{inviteInfo.inviteMember.memberNickname}}</span>
        </div>
        <div>分享一个优质购物平台给你~</div>
      </div>
    </div>
    <div class="content">
      <img src="../../assets/img/invite/invite_become_imgVip.png" alt="">
      <div class="contentInfo">
        <div class="contentInfoList">
          <img src="../../assets/img/invite/invite_icon1.png" alt="">
          <div>尊享礼包</div>
        </div>
        <div class="contentInfoList">
          <img src="../../assets/img/invite/invite_icon2.png" alt="">
          <div>每年≥1万元优惠券</div>
        </div>
        <div class="contentInfoList">
          <img src="../../assets/img/invite/invite_icon3.png" alt="">
          <div>最高5折优惠</div>
        </div>
        <div class="contentInfoList">
          <img src="../../assets/img/invite/invite_icon4.png" alt="">
          <div>丰富特产商品</div>
        </div>
      </div>
      <div class="giveShopList">
        <img class="becomeText" src="../../assets/img/invite/invite_brcomeText.png" alt="">
        <div class="goodInfoWrap">
          <div class="goodInfo" v-for="(item,index) in inviteInfo.inviteGoodsList" @click="$router.push({path:'/ActiveGoodDetails',query:{goodsId:item.goodsId,status:false}})">
            <div class="goodImg">
              <img :src="item.goodsThumb" alt="">
            </div>
            <div>)
              <div class="goodTitle">{{item.goodsTitle}}</div>
              <div class="goodPrice">券后￥0&nbsp;&nbsp;<span><s>市场价￥{{item.goodsMarketPrice}}</s></span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <van-button round
                    @click="$router.push({path:'/BeInvitedHighVipUser',query:{invite:inviteId,wxUserInfo:wxUserInfo}})"
                    v-waves>支付398(<s>￥988</s>)元成为钻石会员
        </van-button>
      </div>
      <div style="color: #f3f2f1;padding-top: 0.1rem">我是底部高度</div>
    </div>
  </div>
</template>
<script>
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'

  export default {
    data () {
      return {
        inviteInfo: {},
        wxUserInfo: {},
        inviteId:''
      }
    },
    created () {
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        loadingType: 'spinner',
        duration: 0
      })
      this.inviteId = this._getParam('invite')
      let data = {
        invite:this.inviteId
      }
      this.httpCli({
        url: config.URL_INVITED_DIAMONDS,
        data: data
      })
        .then(res => {
          this.$toast.clear()
          if (res.errorCode == 100) {
            this.inviteInfo = res.data
          }
        })
        .catch(err => {
          this.$toast.clear()
        })
    },
    mounted () {
      common.getOpenId()
        .then(res => {
          this.wxUserInfo = res
        })
    },
    methods: {
      _getParam (key) {
        let results = new RegExp('[\?&]' + key + '=([^&#]*)').exec(window.location.href)
        if (results) {
          return results[1]
        } else {
          return ''
        }
      }
    }
  }
</script>
<style scoped>
  .inviteInfo {
    width: 100%;
    height: 128px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
  }

  .avatar img {
    width: 100%;
  }

  .userInfo {
    margin-left: 25px;
  }

  .userInfo div:nth-child(1) {
    font-size: 28px;
    color: rgb(153, 153, 153);
  }

  .userInfo div:nth-child(1) span {
    color: rgb(51, 51, 51);
  }

  .userInfo div:nth-child(2) {
    color: rgb(102, 102, 102);
    margin-top: 10px;
  }

  .content {
    width: 100%;
    background-image: url(../../assets/img/invite/invite_bjRed_large.png);
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 42px;
    /*height: 460px;*/
  }

  .content img {
    width: 90%;
  }
  .contentInfo{
    width: 96%;
    display: flex;
    justify-content: space-between;
  }
  .contentInfoList{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:18px 0 0 -18px;
  }
  .contentInfoList img{
    width: 70px;
  }
  .contentInfoList div{
    text-align: center;
    width: 190px;
    font-size: 22px;
    margin-top: 10px;
    color: #FFF;
  }
  .giveShopList {
    width: 95%;
    background-color: #ffffff;
    border-radius: 12px;
    margin-top: 30px;
    padding-bottom: 30px;
  }

  .becomeText {
    width: 100% !important;
    margin-top: 30px;
  }

  .goodInfoWrap {
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
  }

  .goodInfo {
    width: 47.5%;
    border-radius: 12px;
    border: 1PX rgb(170, 170, 170) solid;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 30px;
  }

  .goodInfo:nth-child(odd) {
    float: left;
  }

  .goodInfo:nth-child(even) {
    float: right;
  }

  .goodImg {
    height: 280px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .goodImg img {
    width: 100%;
  }

  .goodTitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 24px;
    color: rgb(102, 102, 102);
  }

  .goodPrice {
    display: flex;
    align-items: center;
    font-size: 28px;
    color: rgb(168, 49, 59);
    margin-top: 10px;
  }

  .goodPrice span {
    font-size: 22px;
    color: rgb(102, 102, 102);
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 90px 0 0px 0;
    margin-bottom: 50px;
    position: relative;
  }

  .footer button {
    /*width: 350px;*/
    height: 102px;
    border-radius: 51px;
    background-color: rgb(168, 49, 59);
    font-size: 30px;
    color: rgb(248, 248, 248);
  }
</style>
