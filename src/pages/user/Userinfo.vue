<template>
  <div style="background-color: #f3f3f3;min-height: 100vh" v-loading="loading">
    <van-cell title="头像" class="imgCell">
      <div class="Avatar" v-if="memberInfo.memberAvatar">
        <van-uploader :after-read="onRead" accept="image/*" class="imgWrap">
          <img :src="imgUrl" alt="" v-if="imgUrl">
          <img :src="memberInfo.memberAvatar" alt="" v-else>
        </van-uploader>
        <van-icon class="imgCellIcon" name="arrow" />
      </div>
      <div class="Avatar" v-else>
        <van-uploader :after-read="onRead" accept="image/*" class="imgWrap">
          <img :src="imgUrl" alt="" v-if="imgUrl">
          <img src="../../assets/img/upload.png" alt="" class="imgUpload" v-else>
        </van-uploader>
        <van-icon class="imgCellIcon" name="arrow" />
      </div>
    </van-cell>
    <div>
      <van-cell w-waves @click="$router.push({path:'/FixUserName',query:{title:'修改昵称'}})" title="昵称" is-link :value="memberInfo.memberNickname || '暂无'" />
      <!--<van-cell v-if="memberInfo.memberType == '2'" w-waves title="姓名" :value="memberInfo.memberName || '暂无'" />-->
      <van-cell v-if="memberInfo.memberSex" w-waves @click="showUserSex = true" title="性别" is-link :value="memberInfo.memberSex == '1' ? '男' : '女'" />
      <van-cell v-else @click="showUserSex = true" title="性别" is-link value="请选择" />
      <van-cell w-waves @click="showUserBirthday = true" title="出生日期" is-link :value="memberInfo.memberBirthday || '请选择'" />

      <van-cell v-if="memberInfo.memberType == '2'" w-waves style="margin-top: 0.15rem;" @click="showStore = true" title="我的店铺" is-link />
      <van-cell v-if="memberInfo.memberType == '2'" w-waves @click="$router.push({path:'/MyQRcode',query:{wxNum:memberInfo.memberWechatNo,wxQR:memberInfo.memberWechatQrcode}})" title="微信二维码" is-link />

      <van-action-sheet
        v-model="showUserSex"
        :actions="active"
        cancel-text="取消"
        @select="chooiseUserSex"
      />

      <van-popup v-model="showUserBirthday" position="bottom" overlay>
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="new Date(new Date().getFullYear() - 118, 0, 1)"
          :max-date="new Date(new Date().getTime())"
          :formatter="formatter"
          @confirm="chooiseDate"
        />
      </van-popup>

      <van-popup v-model="showStore" position="bottom" overlay style="width: 100%;height: 100%;background-color: #fff">
        <div>
          <van-cell title="头像" class="imgCell">
            <div class="Avatar">
              <van-uploader :after-read="onReadStore" accept="image/*" class="imgWrap">
                <img :src="imgStoreUrl" alt="" v-if="imgStoreUrl">
                <img :src="memberInfo.storeLogo" alt="" v-else>
              </van-uploader>
              <van-icon class="imgCellIcon" name="arrow" />
            </div>
          </van-cell>
          <van-cell @click="$router.push({path:'/FixUserName',query:{title:'修改店铺名称'}})" title="店铺名称" is-link :value="memberInfo.storeName || '暂无'" />
          <van-cell @click="$router.push({path:'/FixUserName',query:{title:'修改店铺介绍',value:memberInfo.storeBrief}})" v-if="memberInfo.storeBrief && memberInfo.storeBrief.length" style="border-bottom: 1px #eee solid;" title="店铺介绍" is-link :value="memberInfo.storeBrief.length > 6 ? memberInfo.storeBrief.substring(0,6) + '...' : memberInfo.storeBrief" />
        </div>
        <div class="logout">
          <van-button v-waves round type="danger" @click="showStore = false">返回</van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  export default {
    data() {
      return {
        imgUrl:'',
        userName:'15210906902',
        userSex:'请选择',
        userBirthday:'请选择',
        showUserSex:false,
        active:[
          {
            name:'男'
          },
          {
            name:'女'
          }
        ],
        showUserBirthday:false,
        currentDate:new Date(new Date().getFullYear() - 38, 0, 1),
        memberInfo:{},
        loading:false,
        showDialog:false,
        showStore:Boolean(sessionStorage.getItem('storePopupStatus')) || false,
        imgStoreUrl:'',
      }
    },
    computed:{

    },
    beforeRouteLeave(to, from, next) {
      if (to.name == 'FixUserName'){
        sessionStorage.setItem('storePopupStatus',true)
      }else {
        sessionStorage.removeItem('storePopupStatus')
      }
      next()
    },
    created(){
      this.loading = true
      this.httpCli({
        url:config.URL_MEMBER_INFO
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.memberInfo = res.data.member
            res.data.member.memberBirthday ? this.currentDate = new Date(res.data.member.memberBirthday) : this.currentDate = new Date(new Date().getFullYear() - 38, 0, 1)
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    mounted(){

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
                    memberAvatar:res.data.urlList[0]
                  }
                  this.httpCli({
                    url:config.URL_MEMBER_AVATAR_SET,
                    data:apply
                  })
                    .then(res => {
                      if (res.errorCode == 100){
                        this.$toast.success('修改头像成功')
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
      onReadStore(file){
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
                  this.imgStoreUrl = res.data.urlList[0]
                  let apply = {
                    storeLogo:res.data.urlList[0]
                  }
                  this.httpCli({
                    url:config.URL_MEMBER_STORE_LOGO_SET,
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
      chooiseUserSex(v){
        let data = {
          memberSex:v.name == '男' ? '1' : '2'
        }
        this.httpCli({
          url:config.URL_MEMBER_SEX_SET,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              this.userSex = v.name
              this.getMemberInfo()
              this.showUserSex = false
            }
          })
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        }
        return value;
      },
      chooiseDate(value){
        let data = {
          memberBirthday:common.dateResult(value,'yyyyMMdd')
        }
        this.httpCli({
          url:config.URL_MEMBER_BIRTHDAY_SET,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              this.userBirthday = common.dateResult(value,'yyyy-MM-dd')
              this.getMemberInfo()
              this.showUserBirthday = false
            }
          })
      },
      getMemberInfo(){
        this.httpCli({
          url:config.URL_MEMBER_INFO,
        })
          .then(res => {
            if (res.errorCode == 100){
              this.memberInfo = res.data.member
            }
          })
      },
    },
    components:{

    }
  }
</script>
<style scoped>
  .Avatar{
    display: flex;
    align-items: center;
  }
  .memberCell {
    margin-top: 10px;
  }
  .memberCell .van-cell__title{
    color: #999;
  }
  .imgCell{
    height:200px;
  }
  .calssInfo{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .calssInfo span {
    margin-left: 15px;
    margin-top: -8px;
  }
  .calssInfo div{
    /*margin-top: 8px;*/
  }
  .imgCell .van-cell__title{
  display: flex;
  align-items: center;
}
  .imgCell .van-cell__value{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .imgCellIcon{
    font-size: 35px;
    /*margin: 0 -10px 0 5px;*/
  }
  .imgWrap{
    width: 150px;
    height:150px;
    border: 1Px #eeeeee solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .imgWrap img{
    max-width: 150px;
  }
  .userClass{
    width: 65px;
  }
  .imgUpload{
    width: 75px !important;
    height:75px !important;
  }
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
