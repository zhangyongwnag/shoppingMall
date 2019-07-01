<template>
  <div style="background-color: #f8f8f8;min-height: 100vh;overflow: hidden" v-loading="loading">
    <div class="wrap">
      <div class="scrollLeft">
        <div class="menu">
          <div v-waves @click="chooiseClass(item.categoryId,index)" :class="checkCategoryId == item.categoryId ? 'activeItem' : ''" class="item" v-for="(item,index) in classifyList">
            <p :class="checkCategoryId == item.categoryId ? 'activeText' : ''">{{item.categoryName}}</p>
          </div>
        </div>
      </div>
      <div class="scrollRight">
        <div class="content" v-if="classifyGoodsList.length">
          <div class="goodsList">
            <div class="goodDetail" v-for="(item,index) in classifyGoodsList" @click="$router.push({path:'/SearchShop',query:{categoryId:item.categoryId,categoryName:item.categoryName}})">
              <img :src="item.categoryThumbImage" alt="">
              <div>{{item.categoryName}}</div>
            </div>
          </div>
        </div>
        <!--<div v-else class="empty" style="margin-top: 0rem">-->
          <!--<img src="../../assets/img/emptyData.png" alt="">-->
          <!--<p>暂无数据</p>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState,mapGetters} from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  export default {
    data () {
      return {
        checkCategoryId:''
      }
    },
    computed:{
      ...mapState({
        'classifyList':state => state.classify.classifyList,
        'classifyGoodsList':state => state.classify.classifyGoodsList,
        'loading':state => state.classify.loading,
      })
    },
    created(){
      this.$store.dispatch('getClassifyList',0)
        .then(res => {
          if (sessionStorage.getItem('classifyCheckCategoryId')){
            this.checkCategoryId = sessionStorage.getItem('classifyCheckCategoryId')
            this.$store.dispatch('getClassifyList',this.checkCategoryId)
          }else {
            this.checkCategoryId = res[0].categoryId
            this.$store.dispatch('getClassifyList',this.checkCategoryId)
          }
        })
    },
    mounted(){

    },
    methods:{
      chooiseClass(categoryId,index){
        this.classifyList.map((item,index) => {
          if (item.categoryId === categoryId){
            this.checkCategoryId = categoryId
            this.$store.dispatch('getClassifyList',this.checkCategoryId)
            sessionStorage.setItem('classifyCheckCategoryId',this.checkCategoryId)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .wrap{
    display: flex;
  }
  .scrollLeft{
    overflow-y: scroll;
    overflow-x: hidden;
    height:calc(100vh - 122px);
    background-color: #f8f8f8;
    border-radius: 0 0 15px 15px;
  }
  .scrollRight{
    width: 870px;
    overflow-y: scroll;
    overflow-x: hidden;
    height:calc(100vh - 102px);
    padding: 20px;
    box-sizing: border-box;
  }
  .menu{
    width: 230px;
  }
  .menu .item{
    width: 160px;
    height:80px;
    border-top: 1PX #f8f8f8 solid;
    border-bottom: 1PX #f8f8f8 solid;
    background-color: #f8f8f8;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu .item p{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(102,102,102);
  }
  .menu .activeItem {
    background-color: #f8f8f8 !important;
    border-right: 1PX #ffffff solid;
  }
  .menu .activeText {
    color: rgb(242,24,12)!important;
    border-left: 3PX rgb(242,24,12) solid;
  }
  .content{
    border-radius: 15px;
    background-color: #fff;
    height:100%;
  }
  .content .goodsList{
    overflow: hidden;
    padding-bottom: 30px;
  }
  .content .goodsList .goodDetail{
    width: 142px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(51,51,51);
    float: left;
    margin:30px 0 0 30px;
    font-size: 24px;
  }
  .content .goodsList .goodDetail img{
    width: 80%;
    margin-bottom: 20px;
  }
  .content .goodsList .goodDetail div{
    width: 142px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
</style>
