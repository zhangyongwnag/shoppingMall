<template>
  <div style="padding-top: 0.05rem">
    <van-tabs type="card" class="couponWrap" v-model="active">
      <van-tab title="已使用">
        <div class="empty" v-loading="loading">
          <img src="../../assets/img/empty_coupon.png" alt="">
          <p>暂无优惠券</p>
        </div>
      </van-tab>
      <van-tab title="未使用">
        <div class="empty" v-loading="loading">
          <img src="../../assets/img/empty_coupon.png" alt="">
          <p>暂无优惠券</p>
        </div>
      </van-tab>
      <van-tab title="已过期">
        <div class="empty" v-loading="loading">
          <img src="../../assets/img/empty_coupon.png" alt="">
          <p>暂无优惠券</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data () {
      return {
        active:0,
        loading:false,
      }
    },
    watch:{
      active:{
        handler(v){
          this.loading = true
          setTimeout(() => {
            this.loading = false
          },500)
        },
        immediate:true
      }
    }
  }
</script>
<style scoped>
.couponWrap{
  width: 80%;
  margin:50px 10% 0 10%;
}
</style>
