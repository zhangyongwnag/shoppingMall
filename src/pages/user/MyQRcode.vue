<template>
  <div class="wrap">
    <div class="wxNumber" @click="focus">
      微信号：<input ref="input" type="text" :value="$route.query.wxNum" @blur="blur">
    </div>
    <div class="content">
      <van-uploader :after-read="onRead" accept="image/*">
        <img :src="imgUrl" alt="" v-if="imgUrl" @click="$refs.upload.click()">
        <img :src="$route.query.wxQR" alt="" v-else-if="$route.query.wxQR" @click="$refs.upload.click()">
        <img src="../../assets/img/uploadPZ.png" alt="" v-else @click="$refs.upload.click()">
      </van-uploader>
      <van-uploader :after-read="onRead" accept="image/*" class="imgWrap">
        <span ref="upload">点击上传二维码</span>
      </van-uploader>
    </div>
  </div>
</template>
<script>
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  export default {
    data () {
      return {
        imgUrl:''
      }
    },
    methods:{
      onRead(file){
        this.$toast.loading({
          mask: true,
          message: '上传中...',
          loadingType:'spinner',
          duration:0
        });
        lrz(file.file)
          .then(res => {
            let data = {
              file: res.base64
            }
            this.httpCli({
              url:config.URL_FILE_BASE64_UPLOAD,
              data:data,
              timeout:''
            })
              .then(res => {
                if (res.errorCode == 100){
                  this.imgUrl = res.data.urlList[0]
                  let apply = {
                    memberWechatQrcode:res.data.urlList[0]
                  }
                  this.httpCli({
                    url:config.URL_MEMBER_WX_QRCODE_SET,
                    data:apply
                  })
                    .then(res => {
                      if (res.errorCode == 100){
                        this.$toast.success('修改成功')
                      }else {

                      }
                    })
                    .catch(err => {

                    })
                }else {
                  this.$toast.clear()
                }
              })
              .catch(err => {
                this.$toast.clear()
              })
          })
      },
      focus(){
        this.$refs.input.focus()
      },
      blur(){
        if (!this.$refs.input.value){
          common.toast('请输入微信号')
          return
        }
        let data = {
          memberWechatNo:this.$refs.input.value
        }
        this.httpCli({
          url:config.URL_MEMBER_WX_NO_SET,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              this.$toast.success('修改成功')
            }
          })
      }
    }
  }
</script>
<style scoped>
  .wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f2f1;
    min-height: 100vh;
    position: relative;
  }
  .wxNumber{
    position: absolute;
    left: 10%;
    top:106px;
    font-size: 28px;
    color: rgb(102,102,102);
  }
  .wxNumber input{
    background-color: #f3f2f1;
    border: 0px;
    padding: 10px 0;
  }
  .wxNumber input:focus{
    background-color: #fff;
  }
.content{
  width: 80%;
  box-sizing: border-box;
  border-radius: 15px;
  margin: 0 auto;
  padding: 20px 20px 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
  .content img{
    width: 100%;
  }
  .content div{
    font-size: 24px;
    color: rgb(153,153,153);
    margin-top: 0px;
    text-decoration: underline;
  }
</style>
