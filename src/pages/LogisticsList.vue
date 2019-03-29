<template>
  <div>
    <div class="shopListWrap">
      <div class="product" v-for="(item,index) in packages">
        <div class="shopInfo" @click.stop="checkInfo(item.expressSn,index)">
          <div class="scroll">
            <div class="wrap">
              <div class="imgPreview" v-for="(dataItem,dataIndex) in item.expressList">
                <img :src="dataItem.goodsThumb">
              </div>
            </div>
          </div>
          <div class="shopNumber">
            <span>共{{item.goodsNum}}件商品</span>
            <van-icon class="icon" name="arrow" /></div>
        </div>
        <div class="detailCount">
          <span>{{item.expressMsg}}</span>
          <div>
            <p @click="checkInfo(item.expressSn,index)">查看物流</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  export default {
    data() {
      return {
        packages:[]
      }
    },
    created(){
      let data = {
        orderId:this.$route.query.orderId
      }
      this.httpCli({
        url:config.URL_ORDER_EPRESS_LIST,
        data:data
      })
        .then(res => {
          if (res.errorCode == 100){
            this.packages = res.data.packages
          }
        })
    },
    methods:{
      checkInfo(expressSn,index){
        this.$router.push({path:'/LogisticsInfo',query:{expressSn:expressSn}})
      }
    }
  }
</script>
<style scoped>
  .shopListWrap{
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 50px;
    padding-top:5px;
  }
  .product{
    width: 95%;
    border: 1Px #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    padding: 0px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top: 30px;
    margin-left: 2.5%;
  }
  .productStatus{
    font-size: 24px;
    color: #f82a59;
  }
  .product:nth-child(1){
    margin-top: 30px;
  }
  .checkbox img {
    width: 36px;
    height:36px;
  }
  .shopInfo{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:200px;
    border-bottom: 1Px #eeeeee solid;
  }
  .scroll{
    width: 100%;
    overflow-x: scroll;
  }
  .wrap{
    display: flex;
  }
  .imgPreview{
    width: 150px;
    height:150px;
    margin-right: 10px;
    border-radius: 10px; /*no*/
    border: 2px #eee solid;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 150px;
    min-height: 150px;
  }
  .imgPreview img{
    max-height: 100px;
    max-width: 100px;
  }
  .imgWrap{
    width: 200px;
    height:200px;
    border: 1pX #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }
  .imgWrap img{
    height:100%;
  }
  .imgWrap img{
    height:100%;
  }
  .shopDetail{
    max-width: 380px;
    width: 100% !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 20px;
  }
  .shopNumber{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #666;
    margin-left: 25px;
    white-space: nowrap;
  }
  .shopNumber span{
    margin-right: 25px;
  }
  .shopNumber .icon{
    font-size: 30px;
    color: #999999;
  }
  .shopNumber
  .detailTitle{
    margin-top: 0px;
    text-align: justify;
    font-size: 28px;
    color: #333;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
  }
  .detailDescription{
    font-size: 20px;
    margin-top:0px;
    color: #999;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height:100px;
  }
  .detailCount{
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
    margin-top: 0px;
  }
  .detailCount span{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 75%;
  }
  .detailCount div{
    display: flex;
    align-items: center;
  }
  .detailCount div p{
    width: 110px;
    height:44px;
    line-height: 44px;
    text-align: center;
    border: 1Px #999999 solid;
    border-radius: 22px;
    font-size: 20px;
    color: #666;
    position: relative;
  }
  .detailCount div p::before{
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    border-color: #000;
    background-color: #000;
    border-radius: inherit;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .detailCount div p:active::before {
    opacity: 0.3;
  }
</style>
