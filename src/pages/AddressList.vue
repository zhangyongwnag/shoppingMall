<template>
  <div v-if="!loading">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="onSecect"
      v-if="list.length"
    />

    <div v-else>
      <div class="empty">
        <img src="../assets/img/empty.png" alt="">
        <p>暂时没有数据</p>
      </div>
      <van-button class="buttonSummitAssist" type="default" @click="$router.push({path:'/AddressListAction'})">新增地址</van-button>
    </div>
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
        chosenAddressId:'2123',
        list: [

        ],
        status:'',
        loading:false
      }
    },
    created(){
      console.log(this.$route.query.from)
      this.loading = true
      let data = {
        from:this.$route.query.from ? this.$route.query.from : ''
      }
      this.httpCli({
        url:config.URL_ADDRESS_LIST,
        data:data
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            if (res.data.addressList && res.data.addressList.length){
              res.data.addressList.map((item,index) => {
                item.id = item.addressId
                item.name = item.addressRealname
                if (item.addressIsdefault && item.addressIsdefault == '1'){
                  item.tel = item.addressMobile ? item.addressMobile + '（默认）' : ''
                  this.chosenAddressId = item.addressId
                }else {
                  item.tel = item.addressMobile ? item.addressMobile : ''
                  this.chosenAddressId = res.data.addressList[0].addressId
                }
                item.address = (item.addressProvince ? item.addressProvince : '') + (item.addressCity ? item.addressCity : '') + (item.addressArea ? item.addressArea : '') + (item.addressDetail ? item.addressDetail : '')
              })
              this.list = res.data.addressList

              if (res.data.addressList[0].addressRealname == '公司仓库'){
                setTimeout(()=>{
                  document.getElementsByClassName('van-address-item__edit')[0].style.display = 'none'
                })
              }
            }
          }
        })
        .catch(err => {
          this.loading = false
        })

      this.status = this.$route.query.status
    },
    methods: {
      onAdd() {
        this.$router.push({path:'/AddressListAction'})
      },
      onEdit(item, index) {
        if (item.id == 'bazaar'){
          common.toast('公司地址不可编辑')
          return
        }
        this.$router.push({path:'/AddressListAction',query:{address:item}})
      },
      onSecect(item, index){
        if (this.status){
          this.$store.dispatch('getOrderAddress',item)
          this.$router.back()
        }
      }
    }
  }
</script>
<style scoped>
  button{
    background-color: #f82a59;
    font-size: 34px;
  }
  .van-radio{
    display: flex;
    align-items: center;
  }
  .buttonSummitAssist{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height:96px;
    border-radius: 0;
    font-size: 34px;
    background-color: #f82a59;
    color: #ffffff;
  }
</style>
