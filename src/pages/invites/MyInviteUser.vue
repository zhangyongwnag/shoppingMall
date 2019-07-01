<template>
  <div style="background-color: #f3f2f1;min-height: 100vh">
    <van-list
      v-model="pageLoading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div class="inviteUserList" v-if="inviteUserList.length">
        <div class="inviteInfo" v-for="(item,index) in inviteUserList">
          <div class="avatar">
            <img :src="item.memberAvatar" alt="" v-if="item.memberAvatar">
            <img src="../../assets/img/avatar.png" alt="" v-else>
          </div>
          <div class="userInfo">
            <div>
              {{item.memberNickname}}
              <img src="../../assets/img/main/prson_vip.png" alt="" v-if="item.memberType == '1'">
              <img src="../../assets/img/main/person_highVip.png" alt="" v-else-if="item.memberType == '2'">
            </div>
            <div>注册时间：{{item.memberVipTime}}</div>
          </div>
        </div>
      </div>
      <div class="empty" v-else-if="finished && !inviteUserList.length">
        <img src="../../assets/img/empty_inviteList.png" alt="">
        <p>暂无邀请记录</p>
      </div>
      <div class="spinner" slot="loading" style="margin-top: 0;padding: 0.35rem 0">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </van-list>
  </div>
</template>
<script>
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  export default {
    data () {
      return {
        pageLoading:false,
        finished: false,
        error:false,
        currentPage:'1',
        totalPage:'1',
        inviteUserList:[],
      }
    },
    created(){

    },
    methods:{
      onLoad(){
        this._getWithdrawList()
      },
      _getWithdrawList(){
        if (this.currentPage > this.totalPage){
          this.pageLoading = false
          this.finished = true
          return
        }
        let data = {
          currentPage:this.currentPage++,
          pageRow:10
        }
        this.pageLoading = true
        this.httpCli({
          url:config.URL_INVITE_MEMBER_LIST,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              setTimeout(() => {
                this.pageLoading = false
                res.data.inviteList.gridModel.map(item => item.memberVipTime = common.dateResult(Number(item.memberVipTime),'yyyy-MM-dd hh:mm:ss'))
                this.inviteUserList = this.inviteUserList.concat(res.data.inviteList.gridModel)
                this.totalPage = res.data.inviteList.totalPage
              },500)
            }else {
              this.error = true
            }
          })
          .catch(err =>{
            this.error = true
          })
      }
    }
  }
</script>
<style scoped>
.inviteUserList{
  padding: 30px;
  box-sizing: border-box;
}
  .inviteInfo{
    width: 100%;
    height:160px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.05);
    margin-top: 30px;
    padding: 26px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
.inviteInfo:nth-child(1){
  margin-top: 0;
}
  .avatar{
    width: 106px;
    height:106px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
    border: 1PX #eeeeee solid;
  }
.avatar img{
  width: 100%;
}
.userInfo{
  margin-left: 46px;
}
  .userInfo div:nth-child(1){
    font-size: 28px;
    color: rgb(51,51,51);
  }
.userInfo div:nth-child(1) img{
  height:25px;
  margin: 0px 0 -2px 5px;
}
.userInfo div:nth-child(2){
  font-size: 22px;
  color: rgb(153,153,153);
  margin-top: 10px;
}
</style>
