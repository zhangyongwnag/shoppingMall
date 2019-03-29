<template>
  <div v-else class="empty" v-if="!loading">
    <img src="../assets/img/empty.png" alt="">
    <p>暂时还没有订单</p>
  </div>
  <div class="spinner" style="margin-top: 3rem;" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import * as common from '../common'
  import * as config from '../config'
  export default {
    data() {
      return {
        loading:false,
        afterSaleList:{}
      }
    },
    created(){
      this.loading = true
      let data = {
        currentPage:'1',
        pageRow:'10000',
      }
      this.httpCli({
        url:config.URL_AFTERSALE_LIST,
        data:data
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.afterSaleList = res.data.list
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    methods:{

    }
  }
</script>
<style style>

</style>
