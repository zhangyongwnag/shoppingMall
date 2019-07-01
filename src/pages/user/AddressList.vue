<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
      v-loading="loading"
      v-if="list.length"
    />
    <div v-else class="empty" v-loading="loading">
      <img src="../../assets/img/empty_address.png" alt="">
      <p>暂无收货地址</p>
    </div>
    <footer v-if="!list.length" @click="onAdd">
      <div v-waves>新增地址</div>
    </footer>
  </div>
</template>
<script>
  import * as config from '../../utils/config'
  import * as common from '../../utils/common'
  export default {
    data() {
      return {
        chosenAddressId:'2123',
        list: [],
        loading:false
      }
    },
    created(){
      this.loading = true
      this.httpCli({
        url:config.URL_ADDRESS_LIST,
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
                item.address = (item.addressProvince != item.addressCity ? item.addressProvince : '') + item.addressCity + item.addressArea + item.addressDetail
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
      onSelect(item,index){
        if (this.$route.query.status){
          this.$store.dispatch('getOrderAddress',item)
          this.$router.back()
        }
      }
    }
  }
</script>
<style scoped>
  button{
    background-color: #F2180C;
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
    /*background-color: #F2180C;*/
    color: #ffffff;
  }

  footer{
    width: 100%;
    height:100px;
    position: fixed;
    bottom: 0;
    background-color: #F2180C;
    color: #fff;
    font-size: 34px;
  }
  footer div{
    width: 100%;
    height:100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
