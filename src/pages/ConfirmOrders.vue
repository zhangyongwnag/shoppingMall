<template>
  <div style="height: 100vh;background-color: #f3f3f3" v-if="status == '1'">
    <div class="content">
      <div class="wrap">
        <div class="address" @click="$router.push({path:'/AddressList',query:{status:true,from:from}})">
          <div class="addressContent" v-if="!address.addressId">
            <img src="../assets/img/03/shouhuoPosition.png" alt="">
            <div class="addressList" v-if="calculateList.address && calculateList.address.addressId">
              <span>{{calculateList.address.addressRealname}} <span>{{calculateList.address.addressMobile}}</span></span>
              <span>{{(calculateList.address.addressProvince || '') + (calculateList.address.addressCity || '') + (calculateList.address.addressArea || '') + calculateList.address.addressDetail}}</span>
            </div>
            <div class="addressList" v-else><span style="color: #666;">添加收货地址</span></div>
          </div>
          <div class="addressContent" v-else>
            <img src="../assets/img/03/shouhuoPosition.png" alt="">
            <div class="addressList" v-if="address.addressId">
              <span>{{address.addressRealname}} <span>{{address.addressMobile}}</span></span>
              <span>{{(address.addressProvince || '') + (address.addressCity || '') + (address.addressArea || '') + address.addressDetail}}</span>
            </div>
          </div>
          <img src="../assets/img/03/chooise.png" alt="">
        </div>
        <img src="../assets/img/03/adressFenge.png" alt="" class="addressPart">
        <div class="noticeAssist" v-if="calculateList.orderMsg">
          {{calculateList.orderMsg}}
        </div>
      </div>
      <div class="shopListWrap">
        <div class="product" v-for="(item,index) in calculateList.goodsList">
          <div class="shopInfo" @click.stop>
            <div class="imgWrap">
              <img :src="item.goodsThumb" alt="">
            </div>
            <div class="shopDetail">
              <p class="detailTitle">{{item.goodsTitle}}</p>
              <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
              <p class="detailDescription" v-else>{{item.goodsSubtitle}}</p>
              <div class="detailCount">
                <div v-if="item.goodsIsGift == '1'">
                  <span style="color: #f82a59;">赠品</span>
                </div>
                <div v-else>
                  <div v-if="item.goodsVipPrice">
                    <span style="color: #f82a59;">￥{{item.goodsVipPrice}}</span>
                  </div>
                  <div v-else>
                    <span style="color: #f82a59;">￥{{item.goodsMarketPrice}}</span>
                  </div>
                </div>
                x{{item.goodsNum}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-cell title="运费" value="0.00" style="margin-bottom: 100px;"/>
    </div>

    <div class="footer">
      <p><span>共{{calculateList.totalNum}}件商品</span>&nbsp;&nbsp;合计:<span style="color: #f82a59;">￥{{calculateList.totalAmount}}</span></p>
      <div @click="submit">
        在线支付
      </div>
    </div>
  </div>
  <div style="height: 100vh;background-color: #f3f3f3" v-else-if="status == '2'">
    <div class="content">
      <div class="wrap">
        <div class="address" @click="$router.push({path:'/AddressList',query:{status:true,from:from}})">
          <div class="addressContent" v-if="!address.addressId">
            <img src="../assets/img/03/shouhuoPosition.png" alt="">
            <div class="addressList" v-if="deliverCalculateList.address && deliverCalculateList.address.addressId">
              <span>{{deliverCalculateList.address.addressRealname}} <span>{{deliverCalculateList.address.addressMobile}}</span></span>
              <span>{{(deliverCalculateList.address.addressProvince || '') + (deliverCalculateList.address.addressCity || '') + (deliverCalculateList.address.addressArea || '') + deliverCalculateList.address.addressDetail}}</span>
            </div>
            <div class="addressList" v-else><span style="color: #666;">添加收货地址</span></div>
          </div>
          <div class="addressContent" v-else>
            <img src="../assets/img/03/shouhuoPosition.png" alt="">
            <div class="addressList" v-if="address.addressId">
              <span>{{address.addressRealname}} <span>{{address.addressMobile}}</span></span>
              <span>{{(address.addressProvince || '') + (address.addressCity || '') + (address.addressArea || '') + address.addressDetail}}</span>
            </div>
          </div>
          <img src="../assets/img/03/chooise.png" alt="">
        </div>
        <img src="../assets/img/03/adressFenge.png" alt="" class="addressPart">
      </div>
      <div class="shopListWrap">
        <div class="product" v-for="(item,index) in deliverCalculateList.goodsList">
          <div class="shopInfo" @click.stop>
            <div class="imgWrap">
              <img :src="item.goodsThumb" alt="">
            </div>
            <div class="shopDetail">
              <p class="detailTitle">{{item.goodsTitle}}</p>
              <p class="detailDescription">{{item.goodsSubtitle}}</p>
              <div class="detailCount">
                <div v-if="userInfo.memberType == '1'">
                  <!--<span style="color: #f82a59;">￥{{item.goodsMarketPrice}}</span>-->
                </div>
                <div v-else>
                  <!--<span style="color: #f82a59;">￥{{item.goodsVipPrice}}</span>-->
                </div>
                x{{item.goodsNum}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer" style="width: 100%">
      <div @click="submit" style="width: 100%">
        确认
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  export default {
    data() {
      return {
        packageId:'',
        goodsList:{},
        status:'',
        from:''
      }
    },
    created(){
      this.packageId = this.$route.query.packageId ? this.$route.query.packageId : ''
      this.goodsList = this.$route.query.goodsList
      this.status = this.$route.query.status
      this.from = this.$route.query.from
      console.log(this.status,this.from)
    },
    computed:{
      ...mapState({
        'calculateList':state => state.calculate.calculateList,
        'payOrder':state => state.calculate.payOrder,
        'deliverCalculateList':state => state.calculate.deliverCalculateList,
        'address':state => state.shopping.address,
        'userInfo':state => state.userInfo,
      })
    },
    methods:{
      submit(){
        if (!this.address.addressId && !this.calculateList.address){
          common.toast('请选择收货地址')
          return
        }
        if (this.status == '1'){
          this.$toast.loading({
            mask: true,
            message: '结算中...',
            loadingType:'spinner',
            duration:0
          });
          let data = {
            packageId:this.packageId,
            goodsList:this.goodsList,
            addressId:this.address.addressId ? this.address.addressId : this.calculateList.address.addressId
          }
          this.$store.dispatch('getPayOrder',data)
            .then(res => {
              this.$toast.clear()
              this.$router.replace({path:'/PaymentMethods',query:{status:true}})
            })
            .catch(err => {
              this.$toast.clear()
            })
        }else if (this.status == '2'){
          this.$toast.loading({
            mask: true,
            message: '结算中...',
            loadingType:'spinner',
            duration:0
          });
          let data = {
            goodsList:this.goodsList,
            addressId:this.address.addressId ? this.address.addressId : this.deliverCalculateList.address.addressId
          }
          this.$store.dispatch('getDeliverPayOrder',data)
            .then(res => {
              this.$toast.clear()
              this.$router.replace({path:'/PaySuccess',query:{status:true}})
            })
            .catch(err => {
              this.$toast.clear()
            })
        }

      }
    },
  }
</script>
<style scoped>
  .content{
    padding-bottom: 50px;
  }
  .wrap{
    background-color: #FFffff;
    margin-bottom: 10px;
  }
.address{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 20px 30px;
  background-color: #Fff;
}
.address img{
  width: 15px;
}
.addressContent{
  display: flex;
  align-items: center;
}
.addressContent img{
  width: 40px;
  margin-right: 50px;
}
  .addressList{
    display: flex;
    flex-direction: column;
  }
.addressList span{
  font-size: 30px;
  color: #333333;
  margin-right: 98px;
}
.addressList span:nth-child(2){
  display: block;
  width: 500px;
  margin-top: 20px;
  font-size: 24px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.addressList span span{
  font-size: 24px;
  color: #666;
  margin-left: 50px;
}
  .addressPart{
    height:10px;
    width: 100%;
    margin-top: -40px;
  }

.noticeAssist{
  background-color: #fedae2;
  /*margin-top: 20px;*/
  width: 100%;
  font-size: 24px;
  color: #ea1c4b;
  box-sizing: border-box;
  padding: 20px 0 20px 20px;
  margin-top: 10px;
}
  .shopListWrap{
    width: 100%;
    box-sizing: border-box;
    margin:-18px 0 15px 0;
  }
  .product{
    width: 100%;
    border: 1Px #eee solid;
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
  }
  .detailCount{
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
    font-size: 28px;
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
  .footer p span{
    font-size: 28px;
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
    opacity: 0.3;
  }
</style>
