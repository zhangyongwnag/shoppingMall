<template>
  <div style="background-color: #f3f3f3;min-height: 100vh">
    <van-cell to="RevisePassword" :title="userInfo.memberLogonPasswordStatus  == '1'? '修改登录密码' : '设置登录密码'" is-link />
    <van-cell @click="$router.push({path:'/SetPaypwd',query:{status:true}})" title="修改支付密码" is-link />
    <!--<van-cell to="RevisePhone" title="修改绑定手机号" is-link />-->

    <div class="quit">
      <van-button  @click="quit">退出登录</van-button>
    </div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  export default {
    data() {
      return {

      }
    },
    computed:{
      ...mapState({
        'userInfo':state => state.userInfo
      })
    },
    mounted(){

    },
    methods:{
      quit(){
        this.$dialog.confirm({
          title: '提示',
          message: '您确定要注销账号吗？'
        }).then(() => {
          this.httpCli({
            url:config.URL_GET_LOGIN_OUT
          })
            .then(res => {
              if (res.errorCode == 100){
                localStorage.removeItem('userInfo')
                this.$router.replace({path:'/Login'})
              }
            })
        }).catch(() => {
        });
      }
    }
  }
</script>
<style scoped>
.quit{
  position: absolute;
  left:10%;
  bottom:200px;
  width: 80%;
}
  .quit button{
    width: 100%;
    background-color: #Fc3;
    border-radius: 50px;
  }
</style>
