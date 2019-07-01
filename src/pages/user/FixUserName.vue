<template>
  <div style="background-color: #f3f3f3;min-height: 100vh">
    <van-cell-group v-if="$route.query.title != '修改店铺介绍'">
      <van-field ref="input" type="text" maxLength="6" v-model.trim="value" :placeholder="placeholder" />
    </van-cell-group>
    <van-cell-group v-else>
      <van-field ref="input" type="textarea" v-model.trim="value" :placeholder="placeholder" />
    </van-cell-group>
    <p class="text" v-if="$route.query.title != '修改店铺介绍'">1-6个字符组成，可由中英文，数字组成</p>

    <div class="finish">
      <van-button v-waves @click="finish">完成</van-button>
    </div>
  </div>
</template>
<script>
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data() {
      return {
        value:'',
        placeholder:'请输入昵称'
      }
    },
    beforeRouteEnter(to, from, next) {
      to.meta.title = to.query.title
      next(vm => {
        switch (to.query.title){
          case '修改昵称':
            sessionStorage.removeItem('storePopupStatus')
            break;
          case '修改店铺名称':
            vm.placeholder = '请输入店铺名称'
            break;
          case '修改店铺介绍':
            vm.placeholder = '请输入店铺介绍'
            vm.value = to.query.value
            break;
        }
      })
    },
    mounted(){
      this.$refs.input.focus()
    },
    methods:{
      finish(){
        if (this.$route.query.title == '修改昵称'){
          if (!this.value){
            common.toast('请输入用户昵称')
            return
          }
          let data = {
            memberNickname:this.value
          }
          this.httpCli({
            url:config.URL_MEMBER_NICKNAME_SET,
            data:data
          })
            .then(res => {
              if (res.errorCode == 100){
                this.$toast.success('修改成功')
                setTimeout(()=>{
                  this.$router.back()
                },500)
              }
            })
            .catch(err => {

            })
        }else if (this.$route.query.title == '修改店铺名称'){
          if (!this.value){
            common.toast('请输入店铺名称')
            return
          }
          let data = {
            storeName:this.value
          }
          this.httpCli({
            url:config.URL_MEMBER_STORE_NAME_SET,
            data:data
          })
            .then(res => {
              if (res.errorCode == 100){
                this.$toast.success('修改成功')
                setTimeout(()=>{
                  this.$router.back()
                },500)
              }
            })
            .catch(err => {

            })
        }else if (this.$route.query.title == '修改店铺介绍'){
          if (!this.value){
            common.toast('请输入店铺介绍')
            return
          }
          let data = {
            storeBrief:this.value
          }
          this.httpCli({
            url:config.URL_MEMBER_STORE_BRIEF_SET,
            data:data
          })
            .then(res => {
              if (res.errorCode == 100){
                this.$toast.success('修改成功')
                setTimeout(()=>{
                  this.$router.back()
                },500)
              }
            })
            .catch(err => {

            })
        }
      }
    }
  }
</script>
<style scoped>
  .text{
    color: #999999;
    margin: 20px 0 0 30px;
  }
  .finish{
    width: 80%;
    margin:100px 0 0 10%;
  }
  .finish button{
    width: 100%;
    background-color: #F2180C;
    border-radius: 50px;
    color: #ffffff;
    box-shadow: 0px 5px 20px 0px rgba(255,41,28,0.2);
  }
</style>
