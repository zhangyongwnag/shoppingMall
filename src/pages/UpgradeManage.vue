<template>
  <div v-if="!loading">
    <div style="height: 100vh;background-color: #f3f3f3" v-if="levelList.verify && levelList.verify.verifyStatus == '1'">
      <div class="noticeAssist" v-if="!resultPrice.currentAmount">
        您的当前等级：{{levelList.levelName}} <br>
        <span>距离升级还需要购买￥{{startList.levelBuyAmount - (resultPrice.currentAmount ? resultPrice.currentAmount : '0')}}</span>
        &emsp;当前已选择￥{{resultPrice.currentAmount ? resultPrice.currentAmount : '0'}}
      </div>

      <div class="noticeAssist" v-else>
        您的当前等级：{{levelList.levelName}} <br>
        <span v-if="resultPrice.currentAmount*100 < resultPrice.targetAmount*100">距离升级还需要购买￥{{startList.levelBuyAmount - (resultPrice.currentAmount ? resultPrice.currentAmount : '0')}}</span>
        <span v-else-if="resultPrice.currentAmount*100 >= resultPrice.targetAmount*100">已经满足升级条件</span>
        &emsp;当前已选择￥{{resultPrice.currentAmount ? resultPrice.currentAmount : '0'}}
      </div>
      <van-cell :title="startList.levelName" is-link @click="show = true">
        <img src="../assets/img/05/VIP1.png" alt="" slot="icon" class="userClass" v-if="startList.levelCode == '1'">
        <img src="../assets/img/05/VIP2.png" alt="" slot="icon" class="userClass" v-else-if="startList.levelCode == '2'">
        <img src="../assets/img/05/VIP3.png" alt="" slot="icon" class="userClass" v-else-if="startList.levelCode == '3'">
        <img src="../assets/img/05/VIP4.png" alt="" slot="icon" class="userClass" v-else-if="startList.levelCode == '4'">
        <img src="../assets/img/05/VIP5.png" alt="" slot="icon" class="userClass" v-else-if="startList.levelCode == '5'">
      </van-cell>
      <div class="shopListWrap">
        <div class="product" v-for="(item,index) in goodsList.gridModel">
          <div class="shopInfo" @click.stop>
            <div class="imgWrap">
              <img :src="item.goodsThumb" alt="">
            </div>
            <div class="shopDetail">
              <p class="detailTitle">{{item.goodsTitle}}</p>
              <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
              <p class="detailDescription" v-else>{{item.goodsSubtitle}}</p>
              <div class="detailCount">
                <div>
                  <span style="color: #f82a59;" v-if="item.goodsVipPrice">￥{{item.goodsVipPrice}}</span>
                  <span style="color: #f82a59;" v-else>￥{{item.goodsMarketPrice}}</span>
                </div>
                <van-stepper
                  :value="item.count"
                  @plus="add(item.goodsId,item.goodsVipPrice,item.count,index)"
                  @minus="reduce(item.goodsId,item.goodsVipPrice,item.count,index)"
                  :min="0"
                  @change="changeNum"
                  @focus="focus(item.goodsId,index)"
                  @blur="blur(index)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <p>总计：<span style="color: #f82a59;">￥{{resultPrice.currentAmount ? resultPrice.currentAmount : '0'}}</span></p>
        <div @click="accout">
          结算
        </div>
      </div>

      <van-actionsheet
        v-model="show"
        title="选择升级级别"
      >
        <div v-for="(item,index) in levelList.list" @click="chooise(index)">
          <div class="classList">
            <div class="classInfo">
              <div v-if="item.levelCode == '1'">
                <img src="../assets/img/05/VIP1.png" alt="" class="userClass">
              </div>
              <div v-if="item.levelCode == '2'">
                <img src="../assets/img/05/VIP2.png" alt="" class="userClass">
              </div>
              <div v-if="item.levelCode == '3'">
                <img src="../assets/img/05/VIP3.png" alt="" class="userClass">
              </div>
              <div v-if="item.levelCode == '4'">
                <img src="../assets/img/05/VIP4.png" alt="" class="userClass">
              </div>
              <div v-if="item.levelCode == '5'">
                <img src="../assets/img/05/VIP5.png" alt="" class="userClass">
              </div>
              <span>{{item.levelName}}</span>
            </div>
          </div>
        </div>
      </van-actionsheet>
    </div>
    <div class="infoTitle" v-else>
      <p>{{levelList.verify.verifyMsg}}</p>
    </div>
  </div>
  <div class="spinner" style="margin-top: 3rem;" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import { mapState , mapGetters} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  export default {
    data() {
      return {
        loading:true,
        show:false,
        goodsList:{},
        levelList:{},
        startList:{},
        resultPrice:{},
        goodsId:'',
      }
    },
    computed:{
      ...mapState({
        'gifList':state => state.goodDetils.gifList,
      }),
      ...mapGetters(['chooiseGoodsPrice'])
    },
    watch:{

    },
    created(){
      this.loading = true
      this.httpCli({
        url:config.URL_LEVEL_INFO
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.levelList = res.data
//            this.levelList.list.map((item,index) => {
//              item.name = item.levelName
//              item.disabled	 = item.enable == '1' ? false : true
//            })
            this.startList = this.levelList.list.find(item => item.enable == '1')
          }
        })
        .catch(err => {
          this.loading = false
        })

      let data = {
        currentPage:'1',
        pageRow:'10000'
      }
      this.httpCli({
        url:config.URL_SHOP_GOODS_LIST,
        data:data
      })
        .then(res => {
          if (res.errorCode == 100){
            this.goodsList = res.data.list
            this.goodsList.gridModel.map(item => item.count = '0')
          }
      })
    },

    mounted(){

    },
    methods:{
      add(goodsId,goodsMarketPrice,goodsNum,index){
        console.log(goodsId)
        this.goodsList.gridModel.map((item,index) => {
          item.goodsId == goodsId ? item.count ++ : ''
        })
        this.getResultPrice()
      },
      reduce(goodsId,goodsMarketPrice,goodsNum,index){
        this.goodsList.gridModel.map((item,index) => {
          item.goodsId == goodsId ? item.count -- : ''
        })
        this.getResultPrice()
      },
      focus(goodsId,index){
        this.goodsId = goodsId
      },
      blur(){
        this.goodsId = ''
      },
      changeNum(value){
        if (this.goodsId){
          this.goodsList.gridModel.map((item,index) => {
            item.goodsId == this.goodsId ? item.count = value : ''
          })
          this.getResultPrice()
        }
      },
      chooise(index){
        this.startList = this.levelList.list[index]
        this.getResultPrice()
        this.show = false
      },
      accout(){
        let goodsList = []
        this.goodsList.gridModel.map((item,index) => {
          if (item.count != 0){
            let obj = {}
            obj.goodsId = item.goodsId
            obj.goodsNum = item.count
            goodsList.push(obj)
          }
        })
        if (!goodsList.length){
          common.toast('请先选择商品')
          return
        }
        this.$toast.loading({
          mask: true,
          message: '结算中...',
          loadingType:'spinner',
          duration:0
        });
        let data = {
          packageId:'',
          goodsList:JSON.stringify(goodsList)
        }
        this.$store.dispatch('getPayCalculate',data)
          .then(res => {
            this.$router.push({path:'/ConfirmOrders',query:{packageId:data.packageId,goodsList:data.goodsList,status:'1',from:''}})
            this.$toast.clear()
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      getResultPrice(){
        let goodsList = []
        this.goodsList.gridModel.map((item,index) => {
          if (item.count != 0){
            let obj = {}
            obj.goodsId = item.goodsId
            obj.goodsNum = item.count
            goodsList.push(obj)
          }
        })
        let data = {
          targetLevel:this.startList.levelCode,
          goodsList:JSON.stringify(goodsList)
        }
        this.httpCli({
          url:config.URL_LEVEL_UPGRADE_CALULATE,
          data:data
        })
          .then(res => {
            if (res.errorCode = 100){
              this.resultPrice = res.data
            }
          })
      },
    }
  }
</script>
<style scoped>
  .infoTitle{
    padding-top: 150px;
  }
  .infoTitle p{
    font-size: 30px;
    text-align: center;
    color: #333333;
  }
  .infoTitle p:nth-child(2){
    margin-top: 46px;
  }
  .noticeAssist{
    background-color: #fedae2;
    /*margin-top: 20px;*/
    width: 100%;
    font-size: 24px;
    color: #ea1c4b;
    box-sizing: border-box;
    padding: 30px 0 30px 20px;
  }
  .goodsList{
    padding: 0px 20px 50px;
    margin-bottom: 100px;
  }
  .detailsFooter{
    position: fixed;
    left:0;
    bottom: 0;
    width: 100%;
    height:100px;
    display: flex;
    border-top: 1px #ddd solid;
    background-color: #ffffff;
  }
  .footerButton{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #f82a59;
    color: #ffffff;
    font-size: 30px;
  }
  .footerButton::before{
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
  .footerButton:active::before {
    opacity: 0.3;
  }
  .footerButton img{
    width: 50px;
  }

  .shopListWrap{
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 100px;
  }
  .product{
    width: 100%;
    border: 1px #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    padding: 40px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top: 15px;
    background-color: #fff;
  }
  .product:nth-child(1){
    margin-top: 15px;
  }
  .checkbox img {
    width: 36px;
    height:36px;
  }
  .shopInfo{
    width: 100%;
    display: flex;
    height:200px;
  }
  .imgWrap{
    width: 200px;
    height:200px;
    border: 1px #ddd solid;
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
    max-width: 460px;
    width: 100% !important;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detailTitle{
    margin-top: 10px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 28px;
    color: #333;
  }
  .detailDescription{
    font-size: 20px;
    margin-top: -20px;
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
  .buttonSummitAssist{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height:96px;
    border-radius: 0;
    font-size: 30px;
    background-color: #f82a59;
    color: #ffffff;
  }
  .footer{
    height: 100px;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .footer p{
    margin-left: 20px;
    font-size: 30px;
  }
  .footer div{
    height:100%;
    background-color: #f82a59;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    font-size: 30px;
    color: #fff;
    position: relative;
  }
  .footer div::before{
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
  .footer div:active::before {
    opacity: 0.1;
  }
  .classList{
    display: flex;
    align-content: center;
    justify-content: center;
    width: 100%;
    padding: 25px 0;
    border-bottom: 1Px #F3F3F3 solid;
    position: relative;
  }
  .classList::before{
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
  .classList:active::before {
    opacity: 0.3;
  }
  .classInfo{
    width:260px;
    display: flex;
    align-content: center;
    justify-content: flex-start;
  }
  .classInfo span{
    font-size: 30px;
    white-space: nowrap;
  }
  .userClass{
    width: 65px;
    height:33px;
    margin-top: 5px;
    margin-right: 25px;
  }
</style>
