<template>
  <div class="wrap">
    <section>
      <div class="title">发团信息</div>
      <div class="content">
        <div class="cell" @click="$router.push({path:'/StartCityChooise'})">
          <div class="cellTitle">出发城市</div>
          <div class="cellRightContent">
            {{chooiseStartProvinceResult.regionName ? `${chooiseStartProvinceResult.regionNameParent}${chooiseStartProvinceResult.regionName}` : `请选择`}}
            <van-icon name="arrow"/>
          </div>
        </div>
        <div class="cell" @click="$router.push({path:'/ToProvinceChooise'})">
          <div class="cellTitle">到达省份</div>
          <div class="cellRightContent">
            {{chooiseToProvinceResult.regionName ? `${chooiseToProvinceResult.regionName}` : `请选择`}}
            <van-icon name="arrow"/>
          </div>
        </div>
        <div class="cell">
          <div class="cellTitle">旅行团人数</div>
          <div class="cellRightContent" style="padding-right: 0.25rem">
            <input v-model="touristPeopleNum" type="number" max="60" maxlength="2"
                   class="van-field__control van-field__control--right inputText" placeholder="请输入">
          </div>
        </div>
        <div class="cell">
          <div class="cellTitle">车牌号</div>
          <div class="cellRightContent" style="padding-right: 0.25rem">
            <input v-model="touristCarLicense" type="text"
                   class="van-field__control van-field__control--right inputText" placeholder="例如：京A88888">
          </div>
        </div>
        <div class="cell" @click="getTouristAgencyList">
          <div class="cellTitle">旅行社名称</div>
          <div class="cellRightContent">
            {{touristAgencyName}}
            <van-icon name="arrow"/>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="title">出发信息</div>
      <div class="content">
        <div class="cell" @click="showStartTimePopup">
          <div class="cellTitle">出发时间</div>
          <div class="cellRightContent">{{startTime || '请选择'}}
            <van-icon name="arrow"/>
          </div>
        </div>
        <div class="cell" @click="showStartTimeActionSheet">
          <div class="cellTitle">出发地点</div>
          <div class="cellRightContent">{{startPlace || '请选择'}}
            <van-icon name="arrow"/>
          </div>
        </div>
        <div class="cell">
          <div class="cellTitle">出发联系电话</div>
          <div class="cellRightContent" style="padding-right: 0.25rem">
            <input v-model="startContactPhone" type="number" maxlength="11"
                   class="van-field__control van-field__control--right inputText" placeholder="请输入">
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="title">返程信息</div>
      <div class="content">
        <div class="cell" @click="showBackTimePopup">
          <div class="cellTitle">返程抵达时间</div>
          <div class="cellRightContent">{{backTime || '请选择'}}
            <van-icon name="arrow"/>
          </div>
        </div>
        <div class="cell" @click="showBackTimeActionSheet">
          <div class="cellTitle">返程抵达地点</div>
          <div class="cellRightContent">{{backPlace || '请选择'}}
            <van-icon name="arrow"/>
          </div>
        </div>
        <div class="cell">
          <div class="cellTitle">返程联系电话</div>
          <div class="cellRightContent" style="padding-right: 0.25rem">
            <input v-model="backContactPhone" type="number" maxlength="11"
                   class="van-field__control van-field__control--right inputText" placeholder="请输入">
          </div>
        </div>
      </div>
    </section>

    <section @click="showGoodsChooiseStatus = true">
      <div class="title">出发携带商品选择<van-icon name="arrow"/></div>
      <div class="shopListWrap">
        <div class="product" v-for="(item,index) in chooiseResultGoodsList">
          <div class="shopInfo" @click.stop>
            <div class="imgWrap" style="position: relative;overflow: hidden">
              <img :src="item.goodsThumb" alt="">
            </div>
            <div class="shopDetail">
              <div class="detailTitle">{{item.goodsTitle}}</div>
              <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
              <div class="detailDescription" v-else>{{item.goodsSubtitle}}</div>
              <div class="detailDescription" style="color: #F2180C;font-size: 0.3rem">￥{{item.goodsMarketPrice}}</div>
            </div>
            <div class="shopNumber">x{{item.goodsNum}}</div>
          </div>
        </div>
      </div>
    </section>

    <van-popup v-model="showTimePopup" position="bottom" overlay>
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="new Date(new Date().getTime())"
        :max-date="new Date(new Date().getTime() + 2592000000)"
        :formatter="formatter"
        @confirm="chooiseDate"
      />
    </van-popup>


    <van-popup v-model="showPlaceActionSheet" position="bottom" :overlay="true">
      <div class="addressList">
        <div class="adressListDetail" v-for="(item,index) in addressList" @click="chooisePlace(item.name,index)">
          <div>
            <img src="../../assets/img/order/order_addressPosition.png" alt="">
            {{item.name}}
          </div>
          <div class="addressButtonWrap">
            <div class="checkButton" v-active @click.stop="checkMap(item.name,index)">查看地图</div>
          </div>
        </div>
      </div>
    </van-popup>

    <div class="detailsFooter" @click="submit" v-waves>
      <div class="footerButton">
        <p>提交申请</p>
      </div>
    </div>

    <van-popup v-model="showGoodsChooiseStatus" position="bottom" :overlay="true" style="width: 100%;height: 100%;background-color: #f3f2f1">
      <div style="overflow:scroll;height:91%;">
        <div class="ShoppingCartWrapChooise">
          <div class="productWrap">
            <div class="product" v-for="(item,index) in tourGoodsList" @click="chooiseGoods(item.goodsId,index)">
              <div class="checkbox">
                <img src="../../assets/img/shop/shopping_check.png" alt="" v-if="item.goodsCheckStatus">
                <img src="../../assets/img/shop/shopping_checkNormal.png" alt="" v-else>
              </div>
              <div class="shopInfo">
                <div class="imgWrap">
                  <img :src="item.goodsThumb" alt="">
                </div>
                <div class="shopDetail">
                  <div class="detailTitle">{{item.goodsTitle}}</div>
                  <p class="detailDescription" v-if="item.goodsOptionName">{{item.goodsOptionName}}</p>
                  <div class="detailDescription" v-else>{{item.goodsSubtitle}}</div>
                  <div class="detailCount" @click.stop>
                    <div>
                      <span style="color: #F2180C;">￥{{item.goodsMarketPrice}}</span>
                    </div>
                    <van-stepper
                      :value="item.goodsNum"
                      @plus="add(item.goodsId,index)"
                      @minus="reduce(item.goodsId,index)"
                      :min="1"
                      @change="changeNum"
                      @focus="focus(item.goodsId,index)"
                      @blur="blur(index)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div>
          <div class="price">共：{{chooiseResultGoodsList.length}}种商品&emsp;合计：<span>{{chooiseResultGoodsNum}}</span>件</div>
        </div>
        <p @click="showGoodsChooiseStatus = false" v-waves>确认选择</p>
      </footer>
    </van-popup>

    <van-popup v-model="showTouristAgencyPopup" position="bottom" :overlay="true" style="width: 100%;height: 100%;background-color: #FFF">
      <div class="contentInfo">
        <div class="goodsList" v-for="(item,index) in touristAgencyList" @click="chooiseTouristAgency(item.agencyId,item.agencyName,index)">
          <div class="goodDetail">
            <div>{{item.agencyName}}</div>
            <img src="../../assets/img/shop/shopping_check.png" alt="" v-if="touristAgencyId == item.agencyId">
            <img src="../../assets/img/shop/shopping_checkNormal.png" alt="" v-else>
          </div>
        </div>
        <div class="touristAgencyFooter">
          <p v-waves @click="showTouristAgencyPopup = false">确认选择</p>
          <p v-waves @click="showTouristAgencyDialog = true">手动输入</p>
        </div>
      </div>
    </van-popup>

    <van-dialog
      v-model="showTouristAgencyDialog"
      title="请输入"
      show-cancel-button
      @confirm="confirmTouristAgencyInputName"
    >
      <input v-model="touristAgencyInputName" type="text"
             class="van-field__control van-field__control--right inputTextSpecial" placeholder="请输入旅行社名称" ref="inputTextSpecial">
    </van-dialog>

    <van-popup v-model="showMapPositon" position="left" :overlay="true" style="width: 100%;height: 100%;background-color: #FFF">
      <Map :positionData="positonData" @closeMap="closeMap"></Map>
    </van-popup>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  import Map from '../../components/Map.vue'
  export default {
    data () {
      return {
        touristPeopleNum: '',
        startValue: '',
        backValue: '',
        startContactPhone: '',
        touristCarLicense:'',
        showTouristAgencyPopup:false,
        touristAgencyList:[],
        touristAgencyName:'请确认',
        touristAgencyInputName:'',
        touristAgencyId:'',
        showTouristAgencyDialog:false,
        backContactPhone: '',
        currentDate: new Date(new Date().getTime()),
        showTimePopup: false,
        showTimePopupStatus: '',
        showPlaceActionSheet: false,
        showPlaceActionSheetStatus: '',
        startPlace: '',
        backPlace: '',
        showGoodsChooiseStatus:false,
        buyNum:'1',
        tourGoodsList:[],
        goodsId:'',
        showMapPositon:false,
        positonData:{}
      }
    },
    computed: {
      ...mapState({
        'chooiseStartProvinceResult': state => state.tour.chooiseStartProvinceResult,
        'chooiseToProvinceResult': state => state.tour.chooiseToProvinceResult,
        'addressList': state => state.tour.addressList
      }),
      startTime () {
        return this.startValue ? common.dateResult(this.startValue, 'yyyy-MM-dd hh:mm') : ''
      },
      backTime () {
        return this.backValue ? common.dateResult(this.backValue, 'yyyy-MM-dd hh:mm') : ''
      },
      chooiseResultGoodsList () {
        return this.tourGoodsList.filter(item => item.goodsCheckStatus)
      },
      chooiseResultGoodsNum () {
        return this.chooiseResultGoodsList.reduce((total,item) => total + Number(item.goodsNum) ,0)
      }
    },
    watch: {
      chooiseStartProvinceResult (v) {
        this.startPlace = ''
        this.backPlace = ''
      },
      showTouristAgencyDialog(v) {
        if (v) {
          setTimeout(() => {
            this.$refs.inputTextSpecial.focus()
          },200)
        }
      }
    },
    created () {
      this._getGoodsList()
    },
    activated(){
      if (!this.tourGoodsList.length){
        this._getGoodsList()
      }
    },
    methods: {
      showStartTimePopup () {
        this.showTimePopupStatus = 'start'
        this.showTimePopup = true
        this.startTime ? this.currentDate = new Date(this.startTime) : ''
      },
      showBackTimePopup () {
        this.showTimePopupStatus = 'back'
        this.showTimePopup = true
        this.backTime ? this.currentDate = new Date(this.backTime) : ''
      },
      formatter (type, value) {
        if (type === 'year') {
          return `${value}年`
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        } else if (type === 'hour') {
          return `${value}时`
        } else if (type === 'minute') {
          return `${value}分`
        }
        return value
      },
      chooiseDate (value) {
        if (this.showTimePopupStatus == 'start') {
          this.startValue = value
          this.showTimePopup = false
        } else if (this.showTimePopupStatus == 'back') {
          this.backValue = value
          this.showTimePopup = false
        }
      },
      showStartTimeActionSheet () {
        console.log(this.addressList)
        if (!this.chooiseStartProvinceResult.regionName) {
          common.toast('请先选择出发城市')
          return
        }
        this.showPlaceActionSheetStatus = 'start'
        this.showPlaceActionSheet = true
      },
      showBackTimeActionSheet () {
        if (!this.chooiseToProvinceResult.regionName) {
          common.toast('请先选择到达省份')
          return
        }
        this.showPlaceActionSheetStatus = 'back'
        this.showPlaceActionSheet = true
      },
      chooisePlace (name,index) {
        if (this.showPlaceActionSheetStatus == 'start') {
          this.startPlace = name
          this.showPlaceActionSheet = false
        } else if (this.showPlaceActionSheetStatus == 'back') {
          this.backPlace = name
          this.showPlaceActionSheet = false
        }
      },
      checkMap(name,index){
        this.showMapPositon = true
        this.positonData = {
          center: [120.406051, 30.179695],
          label:{
            content:name,
            offset:[10,12]
          }
        }
      },
      chooiseGoods(goodsId,index){
        for (let i = 0;i<this.tourGoodsList.length;i++){
          let item = this.tourGoodsList[i]
          item.goodsId == goodsId ? item.goodsCheckStatus = !item.goodsCheckStatus : ''
          Vue.set(this.tourGoodsList,i,item)
        }
      },
      add(goodsId,index){
        this.tourGoodsList.map((item,index) => {
          item.goodsId == goodsId ? item.goodsNum ++ : ''
        })
      },
      reduce(goodsId,index){
        this.tourGoodsList.map((item,index) => {
          item.goodsId == goodsId ? item.goodsNum -- : ''
        })
      },
      focus(goodsId,index){
        this.goodsId = goodsId
      },
      blur(){
        this.goodsId = ''
      },
      changeNum(value){
        if (this.goodsId){
          this.tourGoodsList.map((item,index) => {
            item.goodsId == this.goodsId ? item.goodsNum = value : ''
          })
        }
      },
      getTouristAgencyList(){
        this.$toast.loading({
          mask: true,
          message: '加载中...',
          loadingType:'spinner',
          duration:0
        });
        this.httpCli({
          url:config.URL_TOURLIST_START_AGENCY_LIST
        })
          .then(res => {
            this.$toast.clear()
            if (res.errorCode == 100){
              this.touristAgencyList = res.data.list
              this.showTouristAgencyPopup = true
            }
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      chooiseTouristAgency(agencyId,agencyName,index){
        this.touristAgencyList.map((item,index) => {
          if (item.agencyId == agencyId){
            this.touristAgencyName = agencyName
            this.touristAgencyId = agencyId
          }
        })
      },
      confirmTouristAgencyInputName(){
        if (this.touristAgencyInputName){
          this.touristAgencyName = this.touristAgencyInputName
          this.touristAgencyId = ''
          this.showTouristAgencyPopup = false
        }else {
          common.toast('请输入旅行社名称')
          return
        }
      },
      submit () {
        if (!this.chooiseStartProvinceResult.regionName) {
          common.toast('请选择出发城市')
          return
        }
        if (!this.chooiseToProvinceResult.regionName) {
          common.toast('请选择到达省份')
          return
        }
        if (!this.touristPeopleNum || this.touristPeopleNum > 60) {
          common.toast('请输入正确的旅行团人数')
          return
        }
        if (!this.touristCarLicense){
          common.toast('请输入车牌号')
          return
        }
        if (this.touristAgencyName == '请确认' && !this.touristAgencyId){
          common.toast('请确认您的旅行社')
          return
        }
        if (!this.startValue) {
          common.toast('请选择出发时间')
          return
        }
        if (!this.startPlace) {
          common.toast('请选择出发地点')
          return
        }
        if (!common.isphone(this.startContactPhone)) {
          common.toast('请输入正确的出发联系电话')
          return
        }
        if (!this.backValue) {
          common.toast('请选择返程抵达时间')
          return
        }
        if (!this.backPlace) {
          common.toast('请选择返程抵达地点')
          return
        }
        if (!common.isphone(this.backContactPhone)) {
          common.toast('请输入正确的返程联系电话')
          return
        }
        if (!this.chooiseResultGoodsList.length){
          common.toast('请选择出发携带商品')
          return
        }
        this.$toast.loading({
          mask: true,
          message: '提交中...',
          loadingType: 'spinner',
          duration: 0
        })
        let goodsIdList = []
        this.chooiseResultGoodsList.map((item,index) => {
          let obj = {}
          obj.goodsId = item.goodsId
          obj.goodsNum = item.goodsNum
          goodsIdList.push(obj)
        })
        let data = {
          touristId: '',
          touristStartProvinceName: this.chooiseStartProvinceResult.regionNameParent,
          touristStartProvinceCode: this.chooiseStartProvinceResult.regionCodeParent,
          touristStartCityName: this.chooiseStartProvinceResult.regionName,
          touristStartCityCode: this.chooiseStartProvinceResult.regionCode,
          touristArriveProvinceName: this.chooiseToProvinceResult.regionName,
          touristArriveProvinceCode: this.chooiseToProvinceResult.regionCode,
          touristPeopleNum: this.touristPeopleNum,
          startContactPhone: this.startContactPhone,
          backContactPhone: this.backContactPhone,
          startTime: common.dateResult(this.startValue, 'yyyyMMddhhmm'),
          backTime: common.dateResult(this.backValue, 'yyyyMMddhhmm'),
          startPlace: this.startPlace,
          backPlace: this.backPlace,
          goodsList:JSON.stringify(goodsIdList),
          touristAgencyName:this.touristAgencyName,
          touristAgencyId:this.touristAgencyId,
          touristCarLicense:this.touristCarLicense
        }
        this.httpCli({
          url: config.URL_TOURLIST_SUBMIT,
          data: data
        })
          .then(res => {
            this.$toast.clear()
            if (res.errorCode == 100) {
              this.$toast.success('申请成功')
              setTimeout(() => {
                this.$router.replace({path: '/DeliveryOrderMange'})
                this.$store.commit('clearTourData')
              }, 500)
            }
          })
          .catch(err => {
            this.$toast.clear()
          })
      },
      _getGoodsList(){
        this.httpCli({
          url:config.URL_TOURLIST_GOODS_LIST,
        })
          .then(res => {
            if (res.errorCode == 100){
              this.tourGoodsList = res.data.goodsList
              this.tourGoodsList.map(item => item.goodsCheckStatus = true)
            }
          })
      },
      closeMap(){
        this.showMapPositon = false
      }
    },
    components:{
      Map
    }
  }
</script>
<style scoped>
  .wrap {
    min-height: 100vh;
    background-color: #f3f2f1;
    padding: 30px 0 130px;
    box-sizing: border-box;
  }

  section {
    width: 100%;
    padding: 28px 50px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 30px;
  }

  section:nth-child(1) {
    margin-top: 0;
  }

  section .title {
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  section .title i{
    color: #999999;
  }

  section .content {
    padding-top: 34px;
  }

  section .content .cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26px;
    color: #999;
    height: 70px;
  }

  section .content .cell .cellTitle {

  }

  section .content .cell .cellRightContent {
    display: flex;
    align-items: center;
  }

  .inputText {
    width: 200px;
    font-size: 26px;
    color: #999;
    margin-right: 5px;
    height: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .inputTextSpecial{
    width: 70%;
    height:150px;
    margin-left: 15%;
    text-align: left!important;
  }

  .detailsFooter {
    position: fixed !important;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    display: flex;
    border-top: 1Px #ddd solid;
    background-color: #ffffff;
  }

  .addressList{

  }
  .addressList .adressListDetail{
    padding: 30px 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
  }
  .addressList .adressListDetail div{
    display: flex;
    align-items: center;
  }
  .addressList .adressListDetail div img{
    width: 20px;
    margin-right: 10px;
  }
  .addressList .adressListDetail .addressButtonWrap .checkButton{
    font-size: 24px;
    width: 150px;
    height:55px;
    background-color: #F2180C;
    color: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .footerButton {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F2180C;
    color: #ffffff;
    font-size: 30px;
  }

  .shopListWrap{
    width: 100%;
    box-sizing: border-box;
    padding:20px 0;
  }
  .product{
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #ffffff;
  }
  .shopInfo{
    width: 100%;
    display: flex;
    height:150px;
    margin-top: 20px;
  }
  .imgWrap{
    width: 150px;
    height:150px;
    min-width: 150px;
    min-height: 150px;
    border: 1PX #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    overflow: hidden;
  }
  .imgWrap img{
    width:100%;
  }
  .shopDetail{
    width: 410px;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-top: 10px;
  }
  .shopNumber{
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    color: #666;
    margin-left: 25px;
  }
  .detailTitle{
    margin-top: 0px;
    text-align: justify;
    font-size: 24px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .detailDescription{
    font-size: 20px;
    margin-top:0px;
    color: rgb(153,153,153);
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hotSaleCount{
    font-size: 30px;
    color: #F2180C;
  }
  .detailCount{
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
  }

  .detailCountAll span{
    font-size: 20px;
    color: #666;
    line-height: 88px;
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
    background-color: #F2180C;
    color: #ffffff;
  }
  .emptyOther{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
  }
  .emptyOther img{
    width: 150px;
  }
  .emptyOther p{
    font-size: 30px;
    color: #999;
    margin-top: 30px;
  }

  .ShoppingCartWrapChooise {
    background-color: #fff;
    height:100%;
  }
  .ShoppingCartWrapChooise .productWrap {
    width: 100%;
    padding: 0 0px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1PX #f3f2f1 solid;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    border-radius: 15px;
    overflow: hidden;
    margin-top: 30px;
    position: relative;
  }

  .ShoppingCartWrapChooise .productWrap:first-of-type {
    margin-top: 28px;
  }

  .ShoppingCartWrapChooise .productWrap .product {
    width: 100%;
    border-bottom: 5PX #f3f2f1 solid;
    /*box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);*/
    display: flex;
    padding: 30px;
    box-sizing: border-box;
  }
  .ShoppingCartWrapChooise .productWrap .product .productFail{
    opacity: 0.4;
  }

  .ShoppingCartWrapChooise .productWrap .product:last-of-type {
    border-bottom: 0px;
  }

  .ShoppingCartWrapChooise .productWrap .product .checkboxFail{
    opacity: 0.5;
    margin-right: 5px;
  }
  .ShoppingCartWrapChooise .productWrap .product .checkboxFail div{
    background-color: #666;
    font-size: 20px;
    color: #fff;
    padding: 4px 12px;
    border-radius: 35px;
    white-space: nowrap;
  }

  .ShoppingCartWrapChooise .productWrap .product .checkbox {
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .ShoppingCartWrapChooise .productWrap .product .checkbox img {
    width: 36px;
    height: 36px;
  }

  .ShoppingCartWrapChooise .productWrap .product .shopInfo {
    width: 100%;
    display: flex;
    height: 200px;
  }

  .ShoppingCartWrapChooise .productWrap .product .shopInfo .imgWrap {
    width: 200px;
    height: 200px;
    min-width: 200px;
    min-height: 200px;
    border: 1Px #ddd solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }

  .ShoppingCartWrapChooise .productWrap .product .shopInfo .imgWrap img {
    width: 100%;
  }

  .ShoppingCartWrapChooise .productWrap .product .shopInfo .shopDetail {
    max-width: 390px;
    width: 100% !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .ShoppingCartWrapChooise .productWrap .product .shopInfo .shopDetail .detailTitle {
    margin-top: 15px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 24px;
    color: #333;
    font-weight: bold;
  }

  .ShoppingCartWrapChooise .productWrap .product .shopInfo .shopDetail .detailDescription {
    font-size: 20px;
    margin-top: -20px;
    color: #999;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ShoppingCartWrapChooise .productWrap .product .shopInfo .shopDetail .detailCount {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
    font-size: 28px;
  }

  .spanCount {
    height: 40px;
    line-height: 40px;
    font-size: 28px;
  }

  footer{
    width: 100%;
    height:100px;
    border-top: 1PX #eee solid;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0px 0 20px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .price{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28px;
    color: #000;
  }
  .price span{
    font-size: 30px;
    font-weight: bold;
  }
  footer p{
    width: 240px;
    font-size: 32px;
    margin-left: 20px;
    background-color: #F2180C;
    height:100px;
    text-align: center;
    padding: 0 20px;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  footer p span{
    font-size: 24px;
    color: #fff;
  }

  .contentInfo{
    padding: 30px;
  }
  .contentInfo .goodsList{
    overflow: hidden;
    padding-bottom: 30px;
  }
  .contentInfo .goodsList .goodDetail{
    height: 40px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
    color: rgb(51,51,51);
    float: left;
    margin:30px 0 0 0px;
  }
  .contentInfo .goodsList .goodDetail img{
    width: 30px;
  }
  .touristAgencyFooter{
    position: absolute;
    bottom:30px;
    left:5%;
    width: 90%;
    height:80px;
    border-radius: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    background-color: #F2180C;
  }
  .touristAgencyFooter p{
    width: 50%;
    height:80px;
    line-height: 80px;
    text-align: center;
    color: #fff;
    font-size: 28px;
  }
  .touristAgencyFooter p:nth-child(1){
    border-right: 1PX #fff solid;
  }
</style>

