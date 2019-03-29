<template>
  <div style="background-color: #f3f3f3;min-height: 100vh" v-if="!loading">
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
          <img src="../assets/img/01/upload.png" alt="" class="imgUpload" v-else>
        </van-uploader>
        <van-icon class="imgCellIcon" name="arrow" />
      </div>
    </van-cell>
    <div v-if="userInfo.memberType == '1'">
      <van-cell to="FixUserName" title="昵称" is-link :value="memberInfo.memberNickname" />
      <van-cell v-if="memberInfo.memberSex" @click="showUserSex = true" title="性别" is-link :value="memberInfo.memberSex == '1' ? '男' : '女'" />
      <van-cell v-else @click="showUserSex = true" title="性别" is-link value="请选择" />
      <van-cell @click="showUserBirthday = true" title="出生日期" is-link :value="memberInfo.memberBirthday || '请选择'" />

      <van-actionsheet
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
    </div>
    <div class="memberCell" v-else>
      <van-cell-group>
        <van-cell title="会员姓名" :value="memberInfo.memberName" />
        <van-cell title="身份证号" :value="memberInfo.memberIdcardno" />
        <van-cell title="手机号码" :value="memberInfo.memberPhone" />
        <van-cell title="会员等级">
          <div v-if="memberInfo.memberLevelCode == '0'">
            <span>{{memberInfo.memberLevelName}}</span>
          </div>
          <div v-if="memberInfo.memberLevelCode == '1'">
            <img src="../assets/img/05/VIP1.png" alt="" class="userClass">
          </div>
          <div v-if="memberInfo.memberLevelCode == '2'">
            <img src="../assets/img/05/VIP2.png" alt="" class="userClass">
          </div>
          <div v-if="memberInfo.memberLevelCode == '3'">
            <img src="../assets/img/05/VIP3.png" alt="" class="userClass">
          </div>
          <div v-if="memberInfo.memberLevelCode == '4'">
            <img src="../assets/img/05/VIP4.png" alt="" class="userClass">
          </div>
          <div v-if="memberInfo.memberLevelCode == '5'">
            <img src="../assets/img/05/VIP5.png" alt="" class="userClass">
          </div>
        </van-cell>
        <van-cell title="所在城市" :value="memberInfo.memberCity" />
        <van-cell title="推荐会员" :value="memberInfo.parentMemberName" />
      </van-cell-group>
    </div>
  </div>
  <div class="spinner" style="margin-top: 3rem;" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
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
      }
    },
    computed:{
      ...mapState({
        'userInfo':state => state.userInfo
      }),
    },
    created(){
      this.getMemberInfo()
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
              data:data
            })
              .then(res => {
                if (res.errorCode == 100){
                  this.imgUrl = res.data.urlList[0]
                  let apply = {
                    avatar:res.data.urlList[0]
                  }
                  this.httpCli({
                    url:config.URL_MEMBER_AVATAR_SET,
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
          sex:v.name == '男' ? '1' : '2'
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
          birthday:common.dateCoutince(value)
        }
        this.httpCli({
          url:config.URL_MEMBER_BIRTHDAY_SET,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              this.userBirthday = common.date(value)
              this.getMemberInfo()
              this.showUserBirthday = false
            }
          })
      },
      getMemberInfo(){
        this.loading = true
        let data = {
          token:this.userInfo.memberToken
        }
        this.httpCli({
          url:config.URL_MEMBER_INFO,
          data:data
        })
          .then(res => {
            this.loading = false
            if (res.errorCode == 100){
              this.memberInfo = res.data.member
//              this.memberInfo.memberBirthday = common.date(this.memberInfo.memberBirthday/1000)
            }
          })
          .catch(err => {
            this.loading = false
          })
      }
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
</style>
