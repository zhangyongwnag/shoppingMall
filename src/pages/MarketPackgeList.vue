<template>
  <div v-if="!loading">
    <div class="shopListWrap" v-if="packageList.gridModel && packageList.gridModel.length">
      <div class="product" v-for="(item,index) in packageList.gridModel" @click="$router.push({path:'/PlanDetails',query:{packageId:item.packageId}})">
        <div class="shopInfo">
          <div class="imgWrap">
            <img :src="item.packageThumb" alt="">
        </div>
          <div class="shopDetail">
            <p class="detailTitle">{{item.packageName}}</p>
            <p class="detailDescription">{{item.packageTitle}}</p>
            <div class="detailCount">
              <div>
                <span style="color: #f82a59;">￥{{item.packageMarketPrice}}</span>
              </div>
              <div class="spanCount">
                <!--<span>x{{123}}</span>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <img src="../assets/img/empty.png" alt="">
      <p>暂时没有数据</p>
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
        loading:false,
        packageList:{}
      }
    },
    created(){
      this.loading = true
      let data = {
        currentPage:'1',
        pageRow:'10000'
      }
      this.httpCli({
        url:config.URL_SHOP_MARKET_PACKAGE_LIST,
        data:data
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.packageList = res.data.list
          }
        })
        .catch(err => {
          this.loading = false
        })
    }
  }
</script>
<style scoped>
  .shopListWrap{
    width: 100%;
    padding:0 0px;
    box-sizing: border-box;
  }
  .product{
    width: 100%;
    border: 1px #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    padding: 40px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top: 30px;
  }
  .product:nth-child(1){
    margin-top: 0px;
  }
  .shopInfo{
    width: 100%;
    display: flex;
    height:200px;
  }
  .imgWrap{
    width: 200px;
    height:200px;
    border: 1Px #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }
  .imgWrap img{
    height:100%;
  }
  .shopDetail{
    max-width: 410px;
    width: 100% !important;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detailTitle{
    margin-top: 15px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 28px;
    color: #333;
  }
  .detailDescription{
    font-size: 20px;
    margin-top: -50px;
    color: #999;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .detailCount{
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
    font-size: 28px;
  }
  .spanCount{
    height:40px;
    line-height: 40px;
    font-size: 28px;
  }
</style>
