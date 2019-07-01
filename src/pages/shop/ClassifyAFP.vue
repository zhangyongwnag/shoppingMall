<template>
  <div v-loading="loading">
    <div class="shopListWrap" v-if="classifyList.length">
      <div class="product" v-for="(item,index) in classifyList" @click="$router.push({path:'/SearchShop',query:{categoryId:item.categoryId,categoryName:item.categoryName}})">
        <div class="shopInfo">
          <img :src="item.categoryThumbImage" alt="">
          <p class="title">{{item.categoryName}}</p>
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <img src="../../assets/img/emptyData.png" alt="">
      <p>暂无数据</p>
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
        loading:false,
        classifyList:[]
      }
    },
    created(){
      this.loading = true
      let data = {
        categoryParentId:this.$route.query.categoryId
      }
        this.httpCli({
          url:config.URL_GOODS_CATEGORY_LIST,
          data:data
        })
          .then(res => {
            this.loading = false
            if (res.errorCode == 100){
              this.classifyList = res.data.categoryList
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
    background-color: #fff;
  }
  .product{
    width: 100%;
    border: 1px #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    border-radius: 10px;
    margin-top: 30px;
  }
  .product:nth-child(1){
    margin-top: 0px;
  }
  .shopInfo{
    width: 100%;
    display: flex;
    height:100px;
  }
  .shopInfo img{
    width: 100%;
    height:100%;
  }
</style>
