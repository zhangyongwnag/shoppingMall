<template>
  <div style="min-height: 100vh;background-color: #f3f3f3" v-if="!loading">
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item :name="index + 1" v-for="(item,index) in directList" :key="index">
        <div slot="title">{{item.levelName}}{{'（' + item.count + '）'}}</div>
        <div class="usersList" v-for="(dataItem,dataIndex) in item.subDirectList">
          <div class="usersAnavter">
            <img :src="dataItem.memberAvatar" alt="">
          </div>
          <span>{{dataItem.memberName}}{{'(' + dataItem.memberPhone + ')'}}</span>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
  <div class="spinner" style="margin-top: 3rem;" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import * as config from '../config'
  import * as common from '../common'
  export default {
    data() {
      return {
        activeNames:1,
        loading:false,
        directList:[]
      }
    },
    created(){
      this.loading = true
      this.httpCli({
        url:config.URL_ASSIST_PEOPLE_DIRECT
      })
        .then(res => {
          this.loading = false
          this.$toast.clear()
          if (res.errorCode == 100){
            this.directList = res.data.subDirectMemList
          }
        })
        .catch(err => {
          this.loading = false
        })
    }
  }
</script>
<style scoped>
.usersList{
  display: flex;
  align-items: center;
  border-top: 1Px #f3f3f3 solid;
  padding: 20px 0 20px 20px;
}
.usersList:nth-child(1){
  border-top: 0px;
}
  .usersAnavter{
    width: 80px;
    height:80px;
    border-radius: 50%;
    background-color: black;
    overflow: hidden;
  }
.usersAnavter img{
  width: 100%;
}
.usersList span{
  margin-left: 30px;
  font-size: 28px;
  color: #999;
}
</style>
