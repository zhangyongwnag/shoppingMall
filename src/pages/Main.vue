<template>
  <div>
    <van-tabbar v-model="active" fixed>
      <van-tabbar-item @click="$router.replace({path:'/Main/Home'})">
        <span class="text">首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? indexTrue : indexFalse"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="wap-home" @click="$router.replace({path:'/Main/Classify'})">
        <span class="text">分类</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? classifyTrue : classifyFalse"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="wap-home" :info="homeList.cartGoodsNum > 99 ? '99+' : homeList.cartGoodsNum" @click="toShoppingCart" v-if="homeList.cartGoodsNum != '0'">
        <span class="text">购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? shoppingTrue : shoppingFalse"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="wap-home" @click="toShoppingCart" v-else>
        <span class="text">购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? shoppingTrue : shoppingFalse"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="wap-home" @click="toPersonal">
        <span class="text">我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? personTrue : personFalse"
        >
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>
<script>
  import {mapGetters,mapState} from 'vuex'
  import indexTrue from '../assets/img/02/indexCheckActive.png'
  import indexFalse from '../assets/img/02/indexCheckNomal.png'
  import classifyTrue from '../assets/img/02/classifyTrue.png'
  import classifyFalse from '../assets/img/02/classifyFalse.png'
  import shoppingTrue from '../assets/img/02/shoppingTrue.png'
  import shoppingFalse from '../assets/img/02/shoppingFalse.png'
  import personTrue from '../assets/img/02/pensonTrue.png'
  import personFalse from '../assets/img/02/pensonFalse.png'
  export default {
    data () {
      return {
        active:this.$route.meta.active ? this.$route.meta.active : 0,
        indexTrue: indexTrue,
        indexFalse: indexFalse,
        classifyTrue: classifyTrue,
        classifyFalse: classifyFalse,
        shoppingTrue: shoppingTrue,
        shoppingFalse: shoppingFalse,
        personTrue: personTrue,
        personFalse: personFalse,
      }
    },
    computed:{
      ...mapState({
        'homeList':state => state.home.homeList,
      })
    },
    watch:{

    },
    created(){

    },
    mounted(){

    },
    methods:{
      toShoppingCart(){
        if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).memberToken){
          this.$router.replace({path:'/Main/ShoppingCart'})
        }else {
          this.$router.push({path:'/Login'})
        }
      },
      toPersonal(){
        if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).memberToken){
          this.$router.replace({path:'/Main/Personal'})
        }else {
          this.$router.push({path:'/Login'})
        }
      },
    },
    components:{

    }
  }
</script>
<style scoped>
  .van-tabbar-item--active{
    color: #f82a59;
  }
  .text{
    font-size: 20px;
  }
</style>
