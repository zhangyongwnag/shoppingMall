<template>
  <div class="wrap">
    <van-steps :active="active" active-color="rgb(242,24,12)" class="steps">
      <van-step>资格认证</van-step>
      <van-step>等待审核</van-step>
      <van-step>审核通过</van-step>
    </van-steps>
    <div class="content">
      <p>请填写信息完成导游身份认证</p>
      <van-cell-group>
        <van-field
          v-model="username"
          type="text"
          placeholder="姓名"
          @blur="nameBlur"
        >
          <div slot="left-icon">
            <img src="../../assets/img/user/user_upload_name.png" alt="" class="iconImg">
          </div>
        </van-field>
        <van-field
          v-model="idcard"
          type="tel"
          placeholder="身份证号"
          @blur="idcardBlur"
        >
          <div slot="left-icon">
            <img src="../../assets/img/user/user_upload_idcard.png" alt="" class="iconImg">
          </div>
        </van-field>
        <van-field
          v-model="tourcard"
          placeholder="导游证号"
          @blur="tourcardBlur"
        >
          <div slot="left-icon">
            <img src="../../assets/img/user/user_upload_idcard.png" alt="" class="iconImg">
          </div>
        </van-field>
        <van-field
          v-model="travelName"
          placeholder="旅行社名称"
          @blur="travelNameBlur"
        >
          <div slot="left-icon">
            <img src="../../assets/img/user/user_upload_img.png" alt="" class="iconImg">
          </div>
          <div slot="right-icon" style="white-space: nowrap;color: rgb(197,197,197);">选填</div>
        </van-field>
      </van-cell-group>

      <div class="imgUploadWrap">
        <div class="imgCard">
          <img :src="idCardimgTrue" alt="" v-if="idCardimgTrue" class="imgUploadSuccessOther">
          <img src="../../assets/img/cardTrue.png" alt="" v-else class="imgUploadSuccess">
          <div class="imgCardUploader">
            <van-uploader :after-read="changeIDcardTrue" accept="image/*" class="vanUploaderAssist">
              <img src="../../assets/img/upload.png" alt="" class="imgUploadBg">
            </van-uploader>
            <span class="imgUploadText">点击拍摄/上传证件照</span>
          </div>
        </div>
        <div class="info">
          温馨提示： <br>
          请上传带有本人姓名及导游证号的清晰图片
        </div>
      </div>

      <div class="submit">
        <van-button type="primary" v-waves @click="submit">提交</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'

  export default {
    data () {
      return {
        active: 0,
        username: '',
        idcard: '',
        tourcard: '',
        travelName: '',
        idCardimgTrue: '',
        memberIdcardPicFront: '',
      }
    },
    watch:{
      memberIdcardPicFront(v){

      },
    },
    created(){
      if (this.$route.query.status == 'fail'){
        this.$toast.loading({
          mask: true,
          message: '加载中...',
          loadingType:'spinner',
          duration:0
        });
        this.httpCli({
          url:config.URL_GUIDE_CERT_GET
        })
          .then(res => {
            this.$toast.clear()
            if (res.errorCode == 100){
              this.username = res.data.cert.guideName
              this.idcard = res.data.cert.guideIdcard
              this.tourcard = res.data.cert.guideCertificateNo
              this.travelName = res.data.cert.guideTravelAgency
              this.memberIdcardPicFront = res.data.cert.guideCertificatePic
              this.idCardimgTrue = res.data.cert.guideCertificatePic
            }
          })
          .catch(err => {
            this.$toast.clear()
          })
      }else {
        localStorage.getItem('TourGuideUsername') ? this.username = localStorage.getItem('TourGuideUsername') : this.username = ''
        localStorage.getItem('TourGuideIdcard') ? this.idcard = localStorage.getItem('TourGuideIdcard') : this.idcard = ''
        localStorage.getItem('TourGuideTourcard') ? this.tourcard = localStorage.getItem('TourGuideTourcard') : this.tourcard = ''
        localStorage.getItem('TourGuideTravelName') ? this.travelName = localStorage.getItem('TourGuideTravelName') : this.travelName = ''
        if (localStorage.getItem('TourGuideMemberIdcardPicFront')){
          this.memberIdcardPicFront = localStorage.getItem('TourGuideMemberIdcardPicFront')
          this.idCardimgTrue = localStorage.getItem('TourGuideMemberIdcardPicFront')
        }
      }
    },
    methods: {
      nameBlur(){
        this.$route.query.status != 'fail' ? localStorage.setItem('TourGuideUsername',this.username) : ''
      },
      idcardBlur(){
        this.$route.query.status != 'fail' ? localStorage.setItem('TourGuideIdcard',this.idcard) : ''
      },
      tourcardBlur(){
        this.$route.query.status != 'fail' ? localStorage.setItem('TourGuideTourcard',this.tourcard) : ''
      },
      travelNameBlur(){
        this.$route.query.status != 'fail' ? localStorage.setItem('TourGuideTravelName',this.travelName) :''
      },
      changeIDcardTrue (file) {
        this.$toast.loading({
          mask: true,
          message: '上传中...',
          loadingType: 'spinner',
          duration: 0
        })
        lrz(file.file)
          .then(res => {
            let data = {
              file: res.base64
            }
            this.httpCli({
              url: process.env.type == 'test' ? 'https://mall-api.bazaarbeya.com/bazaar/api/u/file/base64/upload' : config.URL_FILE_BASE64_UPLOAD,
              data: data,
              timeout: '',
            })
              .then(res => {
                this.$toast.clear()
                if (res.errorCode == 100) {
                  if (res.data.urlList.length) {
                    this.memberIdcardPicFront = res.data.urlList[0]
                    this.$route.query.status != 'fail' ? localStorage.setItem('TourGuideMemberIdcardPicFront',this.memberIdcardPicFront) : ''
                    this.idCardimgTrue = file.content
                    this.$toast.success('上传成功')
                  }
                }
              })
              .catch(err => {
                this.$toast.clear()
              })
          })
      },
      submit () {
        if (!this.username) {
          common.toast('请输入姓名')
          return
        }
        if (!this.idcard) {
          common.toast('请输入身份证号')
          return
        }
        if (!this.tourcard) {
          common.toast('请输入导游证号')
          return
        }
        if (!this.memberIdcardPicFront) {
          common.toast('请上传证件')
          return
        }
        this.$dialog.confirm({
          title: '提示',
          message: `请核对真实姓名【${this.username}】，错误的姓名将会影响提现！`,
          confirmButtonText: '修改姓名',
          cancelButtonText: '继续',
          overlay: true,
          closeOnClickOverlay: true,
        })
          .then(() => {

          })
          .catch(() => {
            this.$toast.loading({
              mask: true,
              message: '提交中...',
              loadingType:'spinner',
              duration:0
            });
            let data = {
              guideName: this.username,
              guideIdcard: this.idcard,
              guideCertificateNo: this.tourcard,
              guideCertificatePic: this.memberIdcardPicFront,
              guideTravelAgency: this.travelName,
            }
            this.httpCli({
              url: config.URL_GUIDE_CERT_SUBMIT,
              data: data,
            })
              .then(res => {
                this.$toast.clear()
                if (res.errorCode == 100) {
                  this.$toast.success('提交成功')
                  localStorage.removeItem('TourGuideUsername')
                  localStorage.removeItem('TourGuideIdcard')
                  localStorage.removeItem('TourGuideTourcard')
                  localStorage.removeItem('TourGuideTravelName')
                  localStorage.removeItem('TourGuideMemberIdcardPicFront')
                  setTimeout(() => {
                    this.$router.replace({path: '/TourGuideMange'})
                  }, 500)
                }
              })
              .catch(err => {
                this.$toast.clear()
              })
          })
      },
    }
  }
</script>
<style scoped>
  .wrap{
    min-height: 100vh;
    background-color: #fff;
    padding-top: 30px;
  }
  .steps {
    width: 80%;
    margin: 0px 0 0 9%;
  }

  .content {
    width: 95%;
    margin: 0 auto;
  }

  .content p {
    font-size: 30px;
    margin-left: 32px;
  }

  .iconImg {
    width: 48px;
    margin: 2px 10px 0 0;
  }

  .imgUploadWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 32px;
  }

  .imgCard {
    width: 425px;
    height: 262px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1PX #f3f2f1 solid;
    border-radius: 10px;
  }

  .imgUploadSuccess {
    width: 455px;
    height: 295px;
    border-radius: 10px;
  }

  .imgUploadSuccessOther {
    max-width: 425px;
    max-height: 262px;
    border-radius: 10px;
  }

  .imgCardUploader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .vanUploaderAssist {

  }

  .imgUploadBg {
    width: 70px !important;
  }

  .imgUploadText {
    font-size: 24px;
    color: #f82a59;
    text-align: center;
    width: 100% !important;
    margin-top: 5px;
  }

  .imgUploadWrap .info {
    box-sizing: border-box;
    margin-top: 15px;
    font-size: 22px;
    color: rgb(153, 153, 153);
  }

  .submit {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 52px;
  }

  .submit button {
    font-size: 30px;
    width: 60%;
    border-radius: 39px;
    color: white;
    background-color: rgb(242, 24, 12);
    background: -webkit-gradient(linear, left top, right top, from(rgb(255,88,76)) , to(rgb(255,41,28)));
    background: linear-gradient(to right, rgb(255,88,76) , rgb(255,41,28));
    box-shadow: 0px 5px 20px 0px rgba(255,41,28,0.2);
  }

  .submit button:active::before {
    opacity: 0;
  }
</style>
