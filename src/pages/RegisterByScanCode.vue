<template>
  <div>
    <div style="background-color: #f3f3f3;min-height: 100vh">
      <div class="noticeAssist" v-if="assistList.verify && assistList.verify.verifyMsg" v-cloak>
        {{assistList.verify.verifyMsg}}
      </div>

      <div class="wrap">
        <div class="general">
          <span>经销商编号</span>
          <van-cell-group class="groupAssist">
            <van-field disabled v-model="proxyNo" placeholder="请输入经销商编号" />
          </van-cell-group>
        </div>
        <div class="general">
          <span>姓名</span>
          <van-cell-group class="groupAssist">
            <van-field type="text" maxLength="5" v-model="name" placeholder="请输入您的姓名" />
          </van-cell-group>
        </div>
        <div class="general">
          <span>手机号码</span>
          <van-cell-group class="groupAssist">
            <van-field type="tel" maxLength="11" v-model="phone" placeholder="请输入手机号码" />
          </van-cell-group>
        </div>
        <div class="general">
          <span>验证码</span>
          <van-cell-group class="groupAssist">
            <van-field type="tel" maxLength="4" v-model="validate" placeholder="请输入验证码">
              <van-button v-if="!disabledStatus" slot="button" size="small" type="primary" class="buttonAssist" @click="sendCode" v-cloak>{{scanMsg}}</van-button>
              <van-button v-else slot="button" size="small" type="primary" class="buttonCodeStatus" v-cloak>{{scanMsg}}</van-button>
            </van-field>
          </van-cell-group>
        </div>
        <div class="general">
          <span>登录密码</span>
          <van-cell-group class="groupAssist">
            <van-field type="password" v-model="password" placeholder="请输入登录密码" />
          </van-cell-group>
        </div>
        <div class="general">
          <span>确认密码</span>
          <van-cell-group class="groupAssist">
            <van-field type="password" v-model="repPassword" placeholder="请确认登录密码" />
          </van-cell-group>
        </div>
        <div class="general" style="position: relative" @click="show = true">
          <span>所在城市</span>
          <van-cell-group class="groupAssist">
            <van-field :value="province === city ? province + area : province + city + area" placeholder="请选择所在城市" />
          </van-cell-group>
          <div class="translate">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="general">
          <span>身份证号</span>
          <van-cell-group class="groupAssist">
            <van-field type="tel" maxLength="18" v-model="idcard" placeholder="请输入身份证号码" />
          </van-cell-group>
        </div>
        <div class="general spctil">
          <span>上传身份证</span>
          <div class="imgUploadWrap">
            <div class="imgCard">
              <img :src="idCardimgTrue" alt="" v-if="idCardimgTrue" class="imgUploadSuccessOther">
              <img src="../assets/img/01/cardTrue.png" alt="" v-else class="imgUploadSuccess">
              <div class="imgCardUploader">
                <van-uploader :after-read="changeIDcardTrue" accept="image/*" class="vanUploaderAssist">
                  <img src="../assets/img/01/upload.png" alt="" class="imgUploadBg">
                </van-uploader>
                <span class="imgUploadText">点击拍摄/上传人相面</span>
              </div>
            </div>
            <div class="imgCard">
              <img :src="idCardimgFalse" alt="" v-if="idCardimgFalse" class="imgUploadSuccessOther">
              <img src="../assets/img/01/cardFalse.png" alt="" v-else class="imgUploadSuccess">
              <div class="imgCardUploader">
                <van-uploader :after-read="changeIDcardFalse" accept="image/*" class="vanUploaderAssist">
                  <img src="../assets/img/01/upload.png" alt="" class="imgUploadBg">
                </van-uploader>
                <span class="imgUploadText">点击拍摄/上传国徽面</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="general">
            <span>推荐经销商</span>
            <van-cell-group class="groupAssist">
              <van-field disabled v-model="recommentName" placeholder="请输入推荐人" />
            </van-cell-group>
          </div>
          <div class="general">
            <span>推荐经销商编号</span>
            <van-cell-group class="groupAssist">
              <van-field disabled v-model="recommentNum" placeholder="请输入推荐人编号" />
            </van-cell-group>
          </div>
        </div>
      </div>

      <van-button v-if="this.assistList && this.assistList.verify && this.assistList.verify.verifyStatus == '3'" class="buttonSummitAssist" type="default" @click="submit">提交申请</van-button>
      <van-button v-else disabled class="buttonSummitAssist" type="default" @click="submit">提交申请</van-button>

      <van-popup v-model="show" position="bottom" :overlay="true">
        <van-area :area-list="areaList" @confirm="show = false" @cancel="show = false" @change="chooiseArea"></van-area>
      </van-popup>
    </div>
  </div>
</template>
<script>
  import * as common from '../common'
  import * as config from '../config'
  import m from '../md5.min'
  import area from '../area'
  export default {
    data(){
      return{
        proxyNo:'',
        name:'',
        phone:'',
        validate:'',
        disabledStatus:false,
        scanMsg:'点击获取',
        password:'',
        repPassword:'',
        province:'',
        city:'',
        area:'',
        idcard:'',
        idCardimgTrue:'',
        idCardimgFalse:'',
        recommentName:'',
        recommentNum:'',
        memberIdcardPicFront:'',
        memberIdcardPicReverse:'',
        assistList:{},
        show:false,
        areaList:area
      }
    },
    watch:{
      show(v){
        if (!this.province){
          this.province = '北京市'
          this.city = '北京市'
          this.area = '东城区'
        }
      }
    },
    computed:{

    },
    created(){
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        loadingType:'spinner',
        duration:0
      });
      let data = {
        memberId:this._getParam('memberId')
      }
      this.httpCli({
        url:config.URL_MEMBER_REGISTER_INFO,
        data:data,
      })
        .then(res => {
          this.$toast.clear()
          if (res.errorCode == 100){
            this.assistList = res.data
            if (this.assistList && this.assistList.verify && this.assistList.verify.verifyStatus == '3'){
              this.proxyNo = this.assistList.memberNo
              this.recommentName = this.assistList.referee.memberName
              this.recommentNum = this.assistList.referee.memberNo
            }else {
              common.toast(res.data.verify.verifyMsg)
            }
          }else {
            common.toast(res.errorMsg)
          }
        })
        .catch(err => {
          this.$toast.clear()
          common.toast(err)
        })
    },
    mounted(){

    },
    destroyed(){

    },
    methods:{
      sendCode(){
        if (!common.isphone(this.phone)){
          common.toast('请输入正确的手机号')
          return
        }
        let time = 60
        let data = {
          memberPhone:this.phone
        }
        this.httpCli({
          url:config.URL_MEMBER_REGISTER_CODE,
          data:data,
        })
          .then(res =>{
            if (res.errorCode == 100){
              this.disabledStatus = true
              this.scanMsg = `剩余${time}秒`
              let timeOver = setInterval(()=>{
                time--
                this.scanMsg = `剩余${time}秒`
                if (time == 0){
                  this.scanMsg = '获取验证码'
                  clearInterval(timeOver)
                  this.disabledStatus = false
                }
              },1000)
            }
          })
      },
      chooiseArea(picker){
        let values = picker.getValues()
        this.province = values[0].name
        this.city = values[1].name
        this.area = values[2] ? values[2].name : ''
      },
      changeIDcardTrue(file){
        this.$toast.loading({
          mask: true,
          message: '上传中...',
          loadingType:'spinner',
          duration:0
        });
        lrz(file.file)
          .then(res => {
            let data = {
              file:res.base64
            }
            this.httpCli({
              url:config.URL_FILE_BASE64_UPLOAD,
              data:data,
            })
              .then(res => {
                this.$toast.clear()
                if (res.errorCode == 100){
                  if (res.data.urlList.length){
                    this.memberIdcardPicFront = res.data.urlList[0]
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
      changeIDcardFalse(file){
        this.$toast.loading({
          mask: true,
          message: '上传中...',
          loadingType:'spinner',
          duration:0
        });
        lrz(file.file)
          .then(res => {
            let data = {
              file:res.base64
            }
            this.httpCli({
              url:config.URL_FILE_BASE64_UPLOAD,
              data:data,
            })
              .then(res => {
                this.$toast.clear()
                if (res.errorCode == 100){
                  if (res.data.urlList.length){
                    this.memberIdcardPicReverse = res.data.urlList[0]
                    this.idCardimgFalse = file.content
                    this.$toast.success('上传成功')
                  }
                }
              })
              .catch(err => {
                this.$toast.clear()
              })
          })
      },
      submit(){
        if (this.assistList && this.assistList.verify && this.assistList.verify.verifyStatus != '3'){
          common.toast(this.assistList.verify.verifyMsg)
          return
        }
        if (!this.name){
          common.toast('请输入您的姓名')
          return
        }
        if (!common.isphone(this.phone)){
          common.toast('请输入正确的手机号')
          return
        }
        if (!this.validate){
          common.toast('请输入正确的验证码')
          return
        }
        if (!this.password || !this.repPassword){
          common.toast('请输入登录密码')
          return
        }
        if (this.password != this.repPassword){
          common.toast('请确认俩次密码输入相同')
          return
        }
        if (!this.city){
          common.toast('请输入省市县')
          return
        }
        if (!common.IdCardValidate(this.idcard)){
          common.toast('请输入正确的身份证号')
          return
        }
        if (!this.memberIdcardPicFront){
          common.toast('请上传身份证正面')
          return
        }
        if (!this.memberIdcardPicReverse){
          common.toast('请上传身份证正面')
          return
        }
        this.$toast.loading({
          mask: true,
          message: '提交中...',
          loadingType:'spinner',
          duration:0
        });
        let data = {
          memberParentid:this.assistList.referee.memberId,
          memberNo:this.assistList.referee.memberNo,
          memberName:this.name,
          memberPhone:this.phone,
          code:this.validate,
          memberPassword:m.md5(this.password),
          secondMemberPassword:m.md5(this.repPassword),
          memberIdcardno:this.idcard,
          memberIdcardPicFront:this.memberIdcardPicFront,
          memberIdcardPicReverse:this.memberIdcardPicReverse,
          memberProvince:this.province,
          memberCity:this.city,
          memberArea:this.area,
        }
        this.httpCli({
          url:config.URL_MEMBER_REGISTER_SUBMIT,
          data:data,
        })
          .then(res => {
            this.$toast.clear()
            if (res.errorCode == 100){
              this.$toast.success('申请成功')
            }
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      _getParam(key) {
        let results = new RegExp('[\?&]' + key + '=([^&#]*)').exec(window.location.href);
        if (results) {
          return results[1];
        } else {
          return '';
        }
      },
    },
    filters:{

    }
  }
</script>
<style scoped>
  .noticeAssist{
    background-color: #fedae2;
    margin-top: 20px;
    height:80px;
    width: 100%;
    font-size: 24px;
    color: #ea1c4b;
    line-height: 80px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .wrap{
    width: 100%;
  }
  .general{
    height:100px;
    padding-left: 20px;
    box-sizing: border-box;
    border: 1Px #eee solid;
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #666;
    background-color: #ffffff;
  }
  .spctil{
    height: 650px;
    align-items: flex-start;
    padding-top: 20px;
  }
  .general span{
    width: 90px;
    white-space: nowrap;
  }
  .groupAssist{
    /*height:85%;*/
    margin-left: 120px;
    overflow: hidden;
  }
  .translate{
    width: 90%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: 20px;
    top: 0;
    background-color: rgba(0,0,0,0);
  }
  .van-hairline--top-bottom::after{
    border:0px;
  }
  .buttonAssist{
    padding: 0 30px;
    font-size: 24px;
    color: #ffffff;
    border-radius: 30px;
    background-color: #f82a59;
  }
  .buttonCodeStatus{
    padding: 0 30px;
    font-size: 24px;
    color: #999;
    border-radius: 30px;
    border: 1Px #dddddd solid;
    background-color: #ffffff;
  }
  .footer{
    background-color: #f3f3f3;
    padding: 20px 0 150px;
  }
  .buttonSummitAssist{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height:96px;
    border-radius: 0;
    font-size: 30px;
    background-color: #f82a59;
    color: #ffffff;
  }
  .imgUploadWrap{
    width: 100%;
    display: flex;
    padding-top: 80px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: -90px;
  }
  .imgCard{
    margin-top: 30px;
    width: 340px;
    height:210px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1Px #eeeeee solid;
  }
  .imgUploadSuccess{
    width: 362px;
    height:232px;
    border-radius: 10px;
  }
  .imgUploadSuccessOther{
    max-width: 342px;
    max-height:212px;
    border-radius: 10px;
  }
  .imgCardUploader{
    width: 100%;
    height:100%;
    position: absolute;
    top: 0;
    left:0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .vanUploaderAssist{

  }
  .imgUploadBg{
    width: 70px !important;
  }
  .imgUploadText{
    font-size: 24px;
    color: #f82a59;
    text-align: center;
    width: 100% !important;
    margin-top: 5px;
  }
</style>
