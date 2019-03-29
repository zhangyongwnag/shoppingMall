<template>
  <div style="min-height: 100vh;background-color: #f3f3f3">
    <div class="wrap">
      <div class="posterContent">
        <div class="posterUserInfo" v-if="memeberList.member">
          <div class="posterContentAnavter">
            <img :src="memeberList.member.memberAvatar" alt="">
          </div>
          <div class="posterContentInfo">
            <span style="white-space: nowrap">{{memeberList.member.memberName}}&nbsp;</span> <br>
            <p class="posterPhone">{{memeberList.member.memberPhone}}</p>
          </div>
        </div>
        <div v-if="memeberList.verify && memeberList.verify.verifyStatus == '1'">
          <div class="posterContent2Code" v-if="memeberList.member">
            <img :src="memeberList.member.memberPosterUrl" alt="">
          </div>
          <div class="posterContent2Code" v-if="memeberList.verify">
            <p style="text-align: center">{{memeberList.verify.verifyMsg}}</p>
          </div>
        </div>
        <div v-else>
          <div class="posterContent2Code" v-if="memeberList.verify">
            <p style="text-align: center">{{memeberList.verify.verifyMsg}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as config from '../config'
  import * as common from '../common'
  import {initWx} from '../weixin';
  export default {
    data() {
      return {
        memeberList:{}
      }
    },
    created(){
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        loadingType:'spinner',
        duration:0
      });
      this.httpCli({
        url:config.URL_ASSIST_POSTER
      })
        .then(res => {
          this.$toast.clear()
          if (res.errorCode == 100){
            this.memeberList = res.data

            let obj = {
              title:res.data.share.shareTitle,
              link:res.data.share.shareLink,
              imgUrl:res.data.share.shareIcon,
              desc:res.data.share.shareDescription,
            }
            initWx(obj)
          }
        })
        .catch(err => {
          this.$toast.clear()
        })
    },
  }
</script>
<style scoped>
.wrap{
  width: 100%;
  padding-top: 100px;
}
.posterContent{
  width: 85%;
  margin: 0 auto;
  background-color: #fff;
  padding: 40px 70px 60px;
  box-sizing: border-box;
}
  .posterUserInfo{
    display: flex;
    align-items: center;
  }
.posterUserInfo span{
  margin-left: 40px;
  font-size: 36px;
  color: #333333;
}
  .posterContentAnavter{
    border-radius: 50%;
    width: 116px;
    height:116px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .posterContentInfo{

  }
  .posterPhone{
    color: #999999 !important;
    font-size: 30px !important;
    margin:10px 0 0 40px;
  }
.posterContentAnavter img{
  width: 116px;
}
  .posterContent2Code{
    margin-top: 60px;
  }
.posterContent2Code img{
  width: 100%;
}
</style>
