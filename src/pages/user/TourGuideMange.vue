<template>
  <div class="wrap">
    <div class="contentWrap">
      <div class="contentTop" v-if="TourGuideUsername">
        <van-icon @click="showPopup = true" name="info-o" />
        <div>您正在进行导游身份认证</div>
        <div>请继续完善信息</div>
      </div>
      <div class="contentTop" v-else-if="resultInfo.guideAuditStatus == '1'">
        <van-icon @click="showPopup = true" name="info-o" />
        <div>您已提交信息</div>
        <div>请耐心等待审核结果</div>
      </div>
      <div class="contentTop" v-else-if="resultInfo.guideAuditStatus == '2'">
        <van-icon @click="showPopup = true" name="info-o" />
        <div>恭喜您！</div>
        <div>导游身份认证成功</div>
      </div>
      <div class="contentTop" v-else-if="resultInfo.guideAuditStatus == '3'">
        <van-icon @click="showPopup = true" name="info-o" />
        <div>很抱歉！</div>
        <div>导游身份认证失败 <span @click="checkFailReason">查看失败原因</span></div>
      </div>
      <div class="contentTop" v-else>
        <van-icon @click="showPopup = true" name="info-o" />
        <div>等待申请！</div>
        <div>快去申请成为导游</div>
      </div>
      <img src="../../assets/img/user/user_upload_middle.png" alt="">
      <div class="contentMiddle contentMiddleSpecial" v-if="TourGuideUsername">
        <div class="info"><img src="../../assets/img/user/user_upload_name.png" alt=""><span>{{TourGuideUsername || '未填写'}}</span></div>
        <div class="info"><img src="../../assets/img/user/user_upload_idcard.png" alt=""><span>{{TourGuideIdcard || '未填写'}}</span></div>
        <div class="info"><img src="../../assets/img/user/user_upload_idcard.png" alt=""><span>{{TourGuideTourcard || '未填写'}}</span></div>
        <div class="info"><img src="../../assets/img/user/user_upload_img.png" alt=""><span>{{TourGuideTravelName || '未填写'}}</span></div>
        <van-button type="primary" class="submit" v-waves @click="$router.push({path:'/TourGuideVerify'})" v-if="TourGuideUsername">继续认证</van-button>
        <div class="footerText" @click="$router.push({path:'/TourGuideLogin'})">{{userInfo.memberPhone}}&nbsp;<span style="text-decoration: underline">切换账号</span></div>
      </div>
      <div class="contentMiddle" v-else-if="resultInfo.guideAuditStatus == '1'">
        <div class="info"><img src="../../assets/img/user/user_upload_name.png" alt=""><span>{{resultInfo.guideName}}</span></div>
        <div class="info"><img src="../../assets/img/user/user_upload_idcard.png" alt=""><span>{{resultInfo.guideIdcard}}</span></div>
        <div class="info"><img src="../../assets/img/user/user_upload_idcard.png" alt=""><span>{{resultInfo.guideCertificateNo}}</span></div>
        <div class="info"><img src="../../assets/img/user/user_upload_img.png" alt=""><span>{{resultInfo.guideTravelAgency}}</span></div>
        <div class="footerText" style="margin-top: 0.6rem" @click="$router.push({path:'/TourGuideLogin'})">{{userInfo.memberPhone}}&nbsp;<span style="text-decoration: underline">切换账号</span></div>
      </div>
      <div class="contentMiddle contentMiddleSpecial" v-else>
        <div class="info"><img src="../../assets/img/user/user_upload_name.png" alt=""><span>{{resultInfo.guideName || '待申请'}}</span></div>
        <div class="info"><img src="../../assets/img/user/user_upload_idcard.png" alt=""><span>{{resultInfo.guideIdcard || '待申请'}}</span></div>
        <div class="info"><img src="../../assets/img/user/user_upload_idcard.png" alt=""><span>{{resultInfo.guideCertificateNo || '待申请'}}</span></div>
        <div class="info"><img src="../../assets/img/user/user_upload_img.png" alt=""><span>{{resultInfo.guideTravelAgency || '待申请'}}</span></div>
        <van-button type="primary" class="submit" v-waves @click="$router.replace({path:'/Main/Home'})" v-if="resultInfo.guideAuditStatus == '2'">立即进入</van-button>

        <van-button type="primary" class="submit" v-waves @click="$router.push({path:'/TourGuideVerify',query:{status:'fail'}})" v-else-if="resultInfo.guideAuditStatus == '3'">重新认证</van-button>
        <van-button type="primary" class="submit" v-waves @click="$router.push({path:'/TourGuideVerify'})" v-else>等待申请</van-button>
        <div class="footerText" @click="$router.push({path:'/TourGuideLogin'})">{{userInfo.memberPhone}}&nbsp;<span style="text-decoration: underline">切换账号</span></div>
      </div>
    </div>

    <van-popup v-model="showPopup" :overlay="true" style="background-color: transparent;width: 74%">
      <div class="popupWrap">
        <div class="info">
          <van-icon @click="showPopup = false" name="close" />
          <p>认证导游身份的好处：</p>
          <div>1、升级钻石会员并拥有属于自己的店铺；</div>
          <div>2、与平台合作优化车购商品；</div>
          <div>3、在团期间，获得丰厚的车购利润；</div>
          <div>4、分享商品售卖可赚到利润；</div>
          <div>5、自己购买商品可节省成本；</div>
          <p>提示：</p>
          <div>非付费钻石会员，您的“蝶库VIP会员”10天内在蝶库购物，您可获得利润；</div>
          <div>付费钻石会员，您的“蝶库VIP会员”购物商品，您都享有利润。</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data () {
      return {
        loading:true,
        TourGuideUsername:'',
        TourGuideIdcard:'',
        TourGuideTourcard:'',
        TourGuideTravelName:'',
        resultInfo:{},
        userInfo:{},
        showPopup:false,
      }
    },
    created(){
      common.getOpenId()

      localStorage.getItem('TourGuideUsername') ? this.TourGuideUsername = localStorage.getItem('TourGuideUsername') : this.TourGuideUsername = ''
      localStorage.getItem('TourGuideIdcard') ? this.TourGuideIdcard = localStorage.getItem('TourGuideIdcard') : this.TourGuideIdcard = ''
      localStorage.getItem('TourGuideTourcard') ? this.TourGuideTourcard = localStorage.getItem('TourGuideTourcard') : this.TourGuideTourcard = ''
      localStorage.getItem('TourGuideTravelName') ? this.TourGuideTravelName = localStorage.getItem('TourGuideTravelName') : this.TourGuideTravelName = ''
      this.userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        loadingType:'spinner',
        duration:0
      });
      this.httpCli({
        url:config.URL_GUIDE_CERT_RESULT
      })
        .then(res => {
          this.$toast.clear()
          if (res.errorCode == 100){
            this.resultInfo = res.data.result
            if (!localStorage.getItem('TourGuideUsername')){
              if (this.resultInfo.guideAuditStatus == '0'){
                common.toast('未填写申请资料')
//                setTimeout(() => {
//                  this.$router.replace({path:'/TourGuideVerify'})
//                },1000)
              }
            }
          }
        })
        .catch(err => {
          this.$toast.clear()
        })
    },
    methods:{
      checkFailReason(){
        this.$dialog.alert({
          title: '提示',
          message: this.resultInfo.guideAuditFailedReason,
          confirmButtonText:'我知道了',
          confirmButtonColor:'#000',
          overlay:true,
          closeOnClickOverlay:true,
        }).then(() => {

        });
      },
      afresh(){

      }
    }
  }
</script>
<style scoped>
  .wrap{
    height: 100vh;
    background-image: url(../../assets/img/user/user_upload_bj.png);
    background-repeat: no-repeat;
    background-size: 100%;
    overflow: hidden;
    background-color: #FFDF32;
  }
  .contentWrap{
    width: 73%;
    background-color: rgba(0,0,0,0);
    margin: 0 auto;
    border-radius: 18px 18px 0 0;
    overflow: hidden;
    padding-bottom: 80px;
    margin-top: 270px;
    font-size: 0;
  }
  .contentTop{
    background-color: white;
    padding:30px 0 15px 0;
    box-sizing: border-box;
    border-radius: 0 0 3PX 3PX;
    position: relative;
  }
  .contentTop i{
    position: absolute;
    right:20px;
    top: 20px;
    font-size: 40px;
    color: #F2180C;
  }
  .contentTop div:nth-child(2){
    font-size: 40px;
    color: rgb(51,51,51);
    text-align: center;
    font-weight: bold;
  }
  .contentTop div:nth-child(3){
    font-size: 28px;
    color: rgb(51,51,51);
    text-align: center;
    margin-top: 15px;
  }
  .contentTop span{
    margin-left: 15px;
    font-size: 22px;
    color: rgb(213,104,6);
    text-decoration: underline;
  }
  .contentWrap img{
    width: 100%;
    margin-top: -1Px;
  }
  .contentMiddle{
    background-color: white;
    padding: 55px 50px 45px;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: -1PX;
    border-radius:3PX 3PX 18px 18px;
  }
  .contentMiddle .info{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 38px;
  }
  .contentMiddle .info:nth-child(1){
    margin-top: 0;
  }
  .contentMiddle .info img{
    width: 44px;
    margin-right:20px;
  }
  .contentMiddle .info span{
    font-size: 28px;
    color: rgb(102,102,102);
  }
  .contentMiddle .submit{
    width: 100%;
    margin-top: 36px;
    border-radius: 13px;
    background-color: rgb(255,223,50);
    font-weight: bold;
    font-size: 30px;
  }
  .contentMiddle .submit:active::before{
    opacity: 0;
  }
  .contentMiddleSpecial{
    padding: 20px 50px 40px;
  }
  .contentMiddleSpecial .infoSpecial{
    margin-top: 25px;
  }
  .footerText{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 34px;
    font-size: 24px;
    color:rgb(102,102,102)
  }

  .popupWrap{
    background-color: #ffffff;
    padding: 20px 50px 50px;
    border-radius: 15px;
    box-sizing: border-box;
  }
  .info{
    font-size: 24px;
    color: rgb(213,104,6);
    position: relative;
  }
  .info i{
    position: absolute;
    right: -25px;
    top:-25px;
    font-size: 30px;
  }
  .info p{
    margin: 35px 0 25px;
    font-size: 28px;
  }
  .info div{
    margin-top: 20px;
  }
</style>
