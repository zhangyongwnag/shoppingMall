<template>
  <div style="background-color: #f3f3f3;min-height: 100vh">
    <div class="wrap">
      <div class="general">
        <span>收货人</span>
        <van-cell-group class="groupAssist">
          <van-field v-model="name" placeholder="收货人" />
        </van-cell-group>
      </div>
      <div class="general">
        <span>联系电话</span>
        <van-cell-group class="groupAssist">
          <van-field type="tel" maxLength="11" v-model="phone" placeholder="联系电话" />
        </van-cell-group>
      </div>
      <div class="general" style="position: relative" @click="show = true" v-waves>
        <span>所在城市</span>
        <van-cell-group class="groupAssist">
          <van-field :value="province === city ? province + area : province + city + area" placeholder="请选择所在城市" />
        </van-cell-group>
        <div class="translate">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="general">
        <span>详细地址</span>
        <van-cell-group class="groupAssist">
          <van-field type="text" v-model="address" placeholder="详细地址" />
        </van-cell-group>
      </div>
      <!--<div class="general">-->
        <!--<span>邮政编码</span>-->
        <!--<van-cell-group class="groupAssist">-->
          <!--<van-field type="tel" maxLength="6" v-model="postid" placeholder="邮政编码" />-->
        <!--</van-cell-group>-->
      <!--</div>-->
      <div class="general switch" v-waves>
        <span>设置为默认地址</span>
        <van-switch
          v-model="checked"
          size="30px"
        />
      </div>
    </div>

    <div class="actionButton" v-if="$route.query.address && $route.query.address.addressId">
      <van-button type="default" @click="deleteAddress" v-waves>删除</van-button>
      <van-button type="default" @click="saveAddress" v-waves>保存</van-button>
    </div>

    <div class="actionButtonOther" v-else>
      <van-button type="default" @click="saveAddress" v-waves>保存</van-button>
    </div>

    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-area :area-list="areaList" @confirm="show = false" @cancel="show = false" @change="chooiseArea"></van-area>
    </van-popup>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  import area from '../../utils/area'
  export default {
    data() {
      return {
        name:'',
        phone:'',
        province:'',
        city:'',
        area:'',
        address:'',
//        postid:'',
        checked:false,
        addressInfo:{},
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
      if (this.$route.query.address && this.$route.query.address.addressId){
        this.addressInfo = this.$route.query.address
        this.name = this.addressInfo.addressRealname
        this.phone = this.addressInfo.addressMobile
        this.province = this.addressInfo.addressProvince
        this.city = this.addressInfo.addressCity
        this.area = this.addressInfo.addressArea
        this.address = this.addressInfo.addressDetail
//        this.postid = this.addressInfo.addressZipcode
        this.checked = this.addressInfo.addressIsdefault == '0' ? false : true
      }
    },
    mounted(){

    },
    methods:{
      chooiseArea(picker){
        let values = picker.getValues()
        this.province = values[0].name
        this.city = values[1].name
        this.area = values[2] ? values[2].name : ''
      },
      deleteAddress(){
        this.$dialog.confirm({
          title: '提示',
          message: `确定要删除地址吗？`
        }).then(() => {
          this.$toast.loading({
            mask: true,
            message: '删除中...',
            loadingType:'spinner',
            duration:0
          });
          let data = {
            addressId:this.addressInfo.addressId
          }
          this.httpCli({
            url:config.URL_ADDRESS_DEL,
            data:data
          })
            .then(res => {
              this.$toast.clear()
              if (res.errorCode == 100){
                this.$toast.success('删除成功')
                setTimeout(()=>{
                  this.$router.back()
                },1000)
              }
            })
            .catch(err => {
              this.$toast.clear()
            })
        }).catch(() => {

        });

      },
      saveAddress(){
        if (!this.name){
          common.toast('请输入收货人')
          return
        }
        if (!common.isphone(this.phone)){
          common.toast('请输入正确的手机号')
          return
        }
        if (!this.city){
          common.toast('请输入省市县')
          return
        }
        if (!this.address){
          common.toast('请输入详细地址')
          return
        }
        this.$toast.loading({
          mask: true,
          message: '提交中...',
          loadingType:'spinner',
          duration:0
        });
        let data = {
          addressRealname:this.name,
          addressMobile:this.phone,
          addressProvince:this.province,
          addressCity:this.city,
          addressArea:this.area ? this.area : this.city,
          addressDetail:this.address,
          addressIsdefault:this.checked ? '1' : '0',
//          addressZipcode:this.postid,
          addressId:this.addressInfo.addressId || '',
        }
        this.httpCli({
          url:config.URL_ADDRESS_SAVE,
          data:data
        })
          .then(res => {
            this.$toast.clear()
            if (res.errorCode == 100){
              this.$toast.success('保存成功')
              setTimeout(()=>{
                this.$router.back()
              },1000)
            }
          })
          .catch(err => {
            this.$toast.clear()
          })
      }
    }
  }
</script>
<style scoped>
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
  .switch{
    justify-content: space-between;
    padding-right: 30px;
  }
  .general span{
    width: 90px;
    white-space: nowrap;
  }
  .groupAssist{
    /*height:85%;*/
    margin-left: 100px;
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
  .actionButton{
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin: 100px auto 0;
  }
  .actionButton button{
    width: 280px;
    border-radius: 40px;
    height:80px;
    font-size: 30px;
    color: #fff;
  }
  .actionButton button:nth-child(1){
    background-color: #999999;
    margin-right: 50px;
    box-shadow: 0px 5px 20px 0px rgba(1, 1, 1, 0.2);
  }
  .actionButton button:nth-child(2){
    background-color: #F2180C;
    box-shadow: 0px 5px 20px 0px rgba(255,41,28,0.2);
  }
  .actionButtonOther{
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin: 100px auto 0;
  }
  .actionButtonOther button{
    width: 100%;
    border-radius: 40px;
    height:80px;
    font-size: 30px;
    color: #fff;
    background-color: #F2180C;
    box-shadow: 0px 5px 20px 0px rgba(255,41,28,0.2);
  }
</style>
