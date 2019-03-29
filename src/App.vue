<template>
  <div id="app">
    <transition name="router-fade">
      <keep-alive>
        <div>
          <van-nav-bar
            :title="$route.meta.title"
            left-text=""
            left-arrow
            @click-left="$router.back()"
            v-if="$route.meta.keepAlive && !isWeixinStatus"
            fixed
          ></van-nav-bar>
          <router-view :class="isWeixinStatus ? 'weixinMargin' : 'notWeixinMargin'" v-if="$route.meta.keepAlive" v-title="$route.meta.title"></router-view>
        </div>
      </keep-alive>
    </transition>
    <transition name="router-fade">
      <div>
        <van-nav-bar
          :title="$route.meta.title"
          left-text=""
          left-arrow
          @click-left="$router.back()"
          v-if="!$route.meta.keepAlive && !isWeixinStatus"
          fixed
        ></van-nav-bar>
        <router-view :class="isWeixinStatus ? 'weixinMargin' : 'notWeixinMargin'" v-if="!$route.meta.keepAlive" v-title="$route.meta.title"></router-view>
      </div>
    </transition>

    <div class="toTop" @click="topTopClick" v-show="topStatus">
      <img src="./assets/img/toTop.png" alt="">
    </div>

    <div class="QRcode" v-if="show">
      <p>如需了解更多信息 <br>请关注微信公众号</p>
      <img src="https://timgsa.oss-cn-beijing.aliyuncs.com/portal/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190306145412.jpg" alt="">
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import * as common from './common'
  import {initWx} from './weixin';
  export default {
    name: 'App',
    data(){
      return{
        topStatus:false,
        isWeixinStatus:'',
        marginTop:'',
        show:''
      }
    },
    computed:{
      ...mapState({
        'homeList':state => state.home.homeList,
      })
    },
    watch: {
      // 监听 $route 变化调用分享链接
      "$route"(to, from) {
        if (!to.meta.shareStatus && this.homeList.share){
          let obj = {
            title:this.homeList.share.shareTitle,
            link:this.homeList.share.shareLink,
            imgUrl:this.homeList.share.shareIcon,
            desc:this.homeList.share.shareDescription,
          }
          initWx(obj)
        }
      }
    },
    created(){
      let dpi = window.screen.width
      dpi > 800 ? this.show = true : this.show = false
      if (common.is_weixn()){
        this.isWeixinStatus = true
        this.marginTop = '0px'
      }else {
        this.isWeixinStatus = false
        this.marginTop = '46px'
      }
    },
    mounted(){
      window.addEventListener('scroll', this.onLoad)
    },
//    beforeDestory(){
//      window.removeEventListener('scroll', this.onLoad)
//    },
    methods:{
      onLoad(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        //回到顶部
        scrollTop > 250 ? this.topStatus = true : this.topStatus = false
      },
      topTopClick(){
        let timeOver = setInterval(()=>{
          let osTop = document.documentElement.scrollTop || document.body.scrollTop
          let ispeed = Math.floor(-osTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          if (osTop === 0) {
            clearInterval(timeOver)
          }
        },30)
      }
    }
  }
</script>

<style>
  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
    padding: 0;
    cursor: pointer;
    /*scroll-behavior: smooth;*/
    max-width: 960px;
    min-width: 640px;
    margin: 0 auto;
  }
  .router-fade-enter-active, .router-fade-leave-active {
    transition: all 0.2s;
    opacity: 0;
  }
  .router-fade-enter, .router-fade-leave-to {
    transition: all 0.2s;
    opacity: 0;
  }

  .toTop{
    position: fixed;
    bottom: 160px;
    right: 65px;
  }
  .toTop img{
    width: 65px;
  }
  .QRcode{
    position: fixed;
    top:100px;
    left: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .QRcode p {
    font-size: 25px;
    line-height: 40px;
  }
  .QRcode img{
    width: 251px;
    margin-top: -20px;
  }
  .notWeixinMargin{
    margin-top: 92px;
  }
  .weixinMargin{
    margin-top: 0px;
  }
  .empty{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
  }
  .empty img{
    width: 275px;
  }
  .empty p{
    font-size: 30px;
    color: #999;
    margin-top: 45px;
  }
</style>
