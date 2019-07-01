<template>
  <div id="app">
    <keep-alive>
      <van-nav-bar
        :title="$route.meta.title"
        left-text=""
        left-arrow
        @click-left="$router.back()"
        v-if="$route.meta.keepAlive && !isWeixinStatus"
        fixed
      ></van-nav-bar>
      <router-view :class="isWeixinStatus ? 'weixinMargin' : 'notWeixinMargin'" v-title="$route.meta.title"
                   v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <van-nav-bar
      :title="$route.meta.title"
      left-text=""
      left-arrow
      @click-left="$router.back()"
      v-if="!$route.meta.keepAlive && !isWeixinStatus"
      fixed
    ></van-nav-bar>
    <router-view :class="isWeixinStatus ? 'weixinMargin' : 'notWeixinMargin'" v-title="$route.meta.title"
                 v-if="!$route.meta.keepAlive"/>

    <Loading/>

    <div class="QRcode" v-if="show">
      <p>如需了解更多信息 <br>请关注微信公众号</p>
      <img
        src="./assets/img/wxQRcode_dk.jpg"
        alt="">
    </div>

    <div class="toTop" @click="topTopClick" v-show="topStatus">
      <img src="./assets/img/toTop.png" alt="">
    </div>

    <!--<div class="test" @click="textChange">-->
      <!--测试&nbsp;v1.1.0-->
    <!--</div>-->
  </div>
</template>

<script>
  import * as common from '@/utils/common'
  import Loading from '@/components/Loading.vue'

  export default {
    name: 'App',
    data () {
      return {
        isWeixinStatus: '',
        show: '',
        topStatus: false
      }
    },
    watch: {
      '$route': {
        handler (v) {
          this.topStatus = false
        }
      }
    },
    created () {
      let dpi = window.screen.width
      dpi > 800 ? this.show = true : this.show = false
      if (common.is_weixn()) {
        this.isWeixinStatus = true
        this.show = false
      } else {
        this.isWeixinStatus = false
      }
    },
    mounted () {
      window.addEventListener('scroll', this.onLoad)
      // 无痕浏览模式
      setTimeout(() => {
        if(typeof localStorage === 'object'){
          try{
            localStorage.setItem('localStorage', 1);
            localStorage.removeItem('localStorage');
          }catch(e){
            Storage.prototype._setItem = Storage.prototype.setItem;
            Storage.prototype.setItem = function() {};
            alert("请关闭无痕模式!");
          };
        };
      },500)
    },
    methods: {
      onLoad () {       //回到顶部
        if (!this.$route.meta.toTopHidden) {
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

          scrollTop > 250 ? this.topStatus = true : this.topStatus = false
        }
      },
      topTopClick () {
        let timeOver = setInterval(() => {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop
          let ispeed = Math.floor(-osTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          if (osTop === 0) {
            clearInterval(timeOver)
          }
        }, 30)
      },
      textChange () {
//        this.$toast.loading({
//          mask: true,
//          message: '切换中...',
//          loadingType: 'spinner',
//          duration: 0
//        })
//        if (sessionStorage.getItem('test')) {
//          sessionStorage.removeItem('test')
//        } else {
//          sessionStorage.setItem('test', '/88888888')
//        }
//        this.$router.replace({path: '/Main/Home'})
//        location.reload()
      }
    },
    components: {
      Loading
    }
  }
</script>

<style>
  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
    padding: 0;
    cursor: pointer;
    scroll-behavior: smooth;
    max-width: 960px;
    min-width: 640px;
    margin: 0 auto;
  }

  .toTop {
    position: fixed;
    bottom: 190px;
    right: 70px;
    z-index: 1000;
    width: 70px;
    height: 70px;
    touch-action: none;
  }

  .toTop img {
    width: 65px;
  }

  .QRcode {
    position: fixed;
    top: 100px;
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

  .QRcode img {
    width: 251px;
    margin-top: -20px;
  }

  .notWeixinMargin {
    margin-top: 92px;
  }

  .weixinMargin {
    margin-top: 0px;
  }

  .giftFree {
    position: absolute;
    left: -40px;
    top: 15px;
    padding: 2px 50px;
    background-color: #F2180C;
    color: #ffffff;
    font-size: 22px;
    transform: rotate(-45deg);
  }


  .giftSend{
    position: absolute;
    left: 0px;
    bottom: 0px;
    padding: 2px 15px;
    color: #ffffff;
    font-size: 22px;
    border-radius: 0px 15px 0 0;
    background: -webkit-gradient(linear, left top, right top, from(#fdcb79) , to(#f9b13c));
    background: linear-gradient(to right, #fdcb79 , #f9b13c);
  }

  .shareWrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    transition: all 0.4s;
    z-index: 999;
    transform: scale(0);
  }

  .shareWrap img {
    width: 100%;
    height: 100%;
  }

  .empty {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
  }

  .empty img {
    width: 350px;
  }

  .empty p {
    font-size: 30px;
    color: #999;
    margin-top: -5px;
  }

  .test {
    display: block;
    position: fixed;
    bottom: 230px;
    left: 0px;
    font-size: 30px;
    padding: 15px 25px;
    border-radius: 5px;
    color: #fff;
    background-color: #04be02;
    line-height: 1;
    z-index: 10000;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
</style>
