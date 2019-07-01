<template>
  <div style="background-color: #f3f3f3;min-height: 100vh">
    <van-cell @click="$router.push({path:'/RevisePassword',query:{status:userInfo.memberLoginPasswordStatus == '1' ? true : false,title:userInfo.memberLoginPasswordStatus == '1' ? '修改登录密码' : '设置登录密码'}})" :title="userInfo.memberLoginPasswordStatus == '1' ? '修改登录密码' : '设置登录密码'" is-link />
    <van-cell @click="$router.push({path:'/SetPaypwd',query:{status:userInfo.memberPayPasswordStatus == '1' ? true : false,title:userInfo.memberPayPasswordStatus == '1' ? '修改支付密码' : '设置支付密码'}})" :title="userInfo.memberPayPasswordStatus == '1' ? '修改支付密码' : '设置支付密码'" is-link />

    <div class="logout">
      <van-button v-waves round type="danger" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data() {
      return {
        userInfo:{}
      }
    },
    computed:{

    },
    created(){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    mounted(){

    },
    methods:{
      logout(){
        this.$dialog.confirm({
          title: '提示',
          message: '您确定退出登录吗？',
          overlay:true,
        })
          .then((res) => {
            this.httpCli({
              url:config.URL_GET_LOGIN_OUT
            })
              .then(res => {
                if (res.errorCode == 100){
                  this.$router.replace({path:'/Login'})
                }
              })
          })
          .catch(err => {

          })
      }
    }
  }
</script>
<style scoped>
  .logout{
    position: fixed;
    left:0;
    bottom: 50px;
    width: 100%;
  }
  .logout button{
    border: 0px;
    width: 75%;
    margin-left: 12.5%;
    height:80px;
    line-height: 80px;
    border-radius: 40px;
    font-size: 30px;
    background-color: #F2180C;
    box-shadow: 0px 5px 20px 0px rgba(255,41,28,0.2);
  }
</style>
