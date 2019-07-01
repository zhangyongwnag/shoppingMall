<template>
  <div>
    <van-tabbar v-model="active" fixed route>
      <van-tabbar-item to='/Main/Home' replace>
        <span class="text">首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? indexTrue : indexFalse"
        >
      </van-tabbar-item>
      <van-tabbar-item to='/Main/Classify'>
        <span class="text">分类</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? classifyTrue : classifyFalse"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="wap-home" @click="toShoppingCart">
        <span class="text">购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? shoppingTrue : shoppingFalse"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="wap-home" :to="tokenStatus ? '/Main/PersonCenter' : '/Login'" :replace="tokenStatus">
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
  import homeCheck from '../../assets/img/main/home_iconCheck.png'
  import homeCheckNormal from '../../assets/img/main/home_iconCheckNromal.png'
  import classifyCheck from '../../assets/img/main/classify_iconCheck.png'
  import classifyCheckNormal from '../../assets/img/main/classify_iconCheckNromal.png'
  import shoppingCartCheck from '../../assets/img/main/shoppingCart_iconCheck.png'
  import shoppingCartCheckNromal from '../../assets/img/main/shoppingCart_iconCheckNromal.png'
  import personCheck from '../../assets/img/main/person_iconCheck.png'
  import personCheckNormal from '../../assets/img/main/person_iconCheckNromal.png'
  export default {
    data () {
      return {
        active:this.$route.meta.active ? this.$route.meta.active : 0,
        indexTrue: homeCheck,
        indexFalse: homeCheckNormal,
        classifyTrue: classifyCheck,
        classifyFalse: classifyCheckNormal,
        shoppingTrue: shoppingCartCheck,
        shoppingFalse: shoppingCartCheckNromal,
        personTrue: personCheck,
        personFalse: personCheckNormal,
        tokenStatus:'',
      }
    },
    computed:{

    },
    watch:{

    },
    created(){

    },
    mounted(){
      if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).memberToken){
        this.tokenStatus = true
      }else {
        this.tokenStatus = false
      }
    },
    methods:{
      toShoppingCart(){
        if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).memberToken){
          this.$router.push({path:'/ShoppingCart'})
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
    color: #F2180C;
  }
  .text{
    font-size: 20px;
  }
</style>
