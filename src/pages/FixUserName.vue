<template>
  <div style="background-color: #f3f3f3;min-height: 100vh">
    <van-cell-group>
      <van-field type="text" maxLength="6" v-model.trim="value" placeholder="请输入昵称" />
    </van-cell-group>
    <p class="text">1-6个字符组成，可由中英文，数字组成</p>

    <div class="finish">
      <van-button  @click="finish">完成</van-button>
    </div>
  </div>
</template>
<script>
  import * as common from '../common'
  import * as config from '../config'
  export default {
    data() {
      return {
        value:'',
      }
    },
    methods:{
      finish(){
        let data = {
          nickname:this.value
        }
        this.httpCli({
          url:config.URL_MEMBER_NICKNAME_SET,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              this.$toast.success('修改成功')
              setTimeout(()=>{
                this.$router.replace({path:'/UserInfo'})
              },1000)
            }
          })
          .catch(err => {

          })
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
    background-color: #Fc3;
    border-radius: 50px;
  }
</style>
