<template>
  <div class="wrap">
    <van-tabs class="couponWrap" v-model="active" swipeable :line-width="12" :swipe-threshold="6" :sticky="true"
              :lazy-render="true">
      <van-tab title="服务中">
        <div v-loading="loading" style="min-height: 100vh">
          <div v-if="serviceList.length">
            <section v-for="(item,index) in serviceList" @click="check(item.touristId,index)">
              <div class="title">
                发团信息
                <span style="color: #F2180C;">{{item.processStatusDesc}}</span>
              </div>
              <div class="content">
                <div class="cell" v-if="item.touristStartProvinceName">
                  <div class="cellTitle">出发城市：{{item.touristStartProvinceName + item.touristStartCityName}}</div>
                </div>
                <div class="cell" v-if="item.touristArriveProvinceName">
                  <div class="cellTitle">到达省份：{{item.touristArriveProvinceName}}</div>
                </div>
                <div class="cell" v-if="item.touristPeopleNum">
                  <div class="cellTitle">旅行团人数：{{item.touristPeopleNum}}人</div>
                </div>
                <div class="cell" v-if="item.touristCarLicense">
                  <div class="cellTitle">车牌号：{{item.touristCarLicense}}</div>
                </div>
                <div class="cell" v-if="item.touristAgencyName">
                  <div class="cellTitle">旅行社名称：{{item.touristAgencyName}}</div>
                </div>
                <div class="cell" v-if="item.startTime">
                  <div class="cellTitle">出发时间：{{item.startTime}}</div>
                </div>
                <div class="cell" v-if="item.startPlace">
                  <div class="cellTitle">出发地点：{{item.startPlace}}</div>
                </div>
                <div class="cell" v-if="item.startContactPhone">
                  <div class="cellTitle">出发联系电话：{{item.startContactPhone}}</div>
                </div>
                <div class="cell" v-if="item.startShopperName">
                  <div class="cellTitle">出发配送员：{{item.startShopperName}}</div>
                </div>
                <div class="cell" v-if="item.startShopperPhone">
                  <div class="cellTitle">出发配送员联系方式：{{item.startShopperPhone}}</div>
                </div>
                <div class="cell" v-if="item.backTime">
                  <div class="cellTitle">返程抵达时间：{{item.backTime}}</div>
                </div>
                <div class="cell" v-if="item.backPlace">
                  <div class="cellTitle">返程抵达地点：{{item.backPlace}}</div>
                </div>
                <div class="cell" v-if="item.backContactPhone">
                  <div class="cellTitle">返程抵达联系电话：{{item.backContactPhone}}</div>
                </div>
                <div class="cell" v-if="item.backShopperName">
                  <div class="cellTitle">返程配送员：{{item.backShopperName}}</div>
                </div>
                <div class="cell" v-if="item.backShopperPhone">
                  <div class="cellTitle">返程配送员联系方式：{{item.backShopperPhone}}</div>
                </div>
                <div class="action" @click.stop>
                  <p v-waves @click.stop="cancel(item.touristId,item.processStatus,index)" v-if="item.processStatus == '0' || item.processStatus == '1' || item.processStatus == '2'">取消行程</p>
                  <p v-waves @click="check(item.touristId,index)">查看详情</p>
                  <p v-waves @click="confirm(item.touristId,index)" v-if="item.processStatus == '2'" style="background-color: #F2180C;border: 0px;color: #fff;">出发签收</p>
                </div>
              </div>
            </section>
          </div>
          <div class="empty" v-else>
            <img src="../../assets/img/empty_tourLisr.png" alt="">
            <p>暂时没有行程</p>
          </div>
        </div>
      </van-tab>
      <van-tab title="已完成">
        <div v-loading="loading" style="min-height: 100vh">
          <div v-if="completeList.length">
            <section v-for="(item,index) in completeList" @click="check(item.touristId,index)">
              <div class="title">
                发团信息
                <span style="color: #F2180C;">{{item.processStatusDesc}}</span>
              </div>
              <div class="content">
                <div class="cell" v-if="item.touristStartProvinceName">
                  <div class="cellTitle">出发城市：{{item.touristStartProvinceName + item.touristStartCityName}}</div>
                </div>
                <div class="cell" v-if="item.touristArriveProvinceName">
                  <div class="cellTitle">到达省份：{{item.touristArriveProvinceName}}</div>
                </div>
                <div class="cell" v-if="item.touristPeopleNum">
                  <div class="cellTitle">旅行团人数：{{item.touristPeopleNum}}人</div>
                </div>
                <div class="cell" v-if="item.touristCarLicense">
                  <div class="cellTitle">车牌号：{{item.touristCarLicense}}</div>
                </div>
                <div class="cell" v-if="item.touristAgencyName">
                  <div class="cellTitle">旅行社名称：{{item.touristAgencyName}}</div>
                </div>
                <div class="cell" v-if="item.startTime">
                  <div class="cellTitle">出发时间：{{item.startTime}}</div>
                </div>
                <div class="cell" v-if="item.startPlace">
                  <div class="cellTitle">出发地点：{{item.startPlace}}</div>
                </div>
                <div class="cell" v-if="item.startContactPhone">
                  <div class="cellTitle">出发联系电话：{{item.startContactPhone}}</div>
                </div>
                <div class="cell" v-if="item.startShopperName">
                  <div class="cellTitle">出发配送员：{{item.startShopperName}}</div>
                </div>
                <div class="cell" v-if="item.startShopperPhone">
                  <div class="cellTitle">出发配送员联系方式：{{item.startShopperPhone}}</div>
                </div>
                <div class="cell" v-if="item.backTime">
                  <div class="cellTitle">返程抵达时间：{{item.backTime}}</div>
                </div>
                <div class="cell" v-if="item.backPlace">
                  <div class="cellTitle">返程抵达地点：{{item.backPlace}}</div>
                </div>
                <div class="cell" v-if="item.backContactPhone">
                  <div class="cellTitle">返程抵达联系电话：{{item.backContactPhone}}</div>
                </div>
                <div class="cell" v-if="item.backShopperName">
                  <div class="cellTitle">返程配送员：{{item.backShopperName}}</div>
                </div>
                <div class="cell" v-if="item.backShopperPhone">
                  <div class="cellTitle">返程配送员联系方式：{{item.backShopperPhone}}</div>
                </div>
                <div class="action" @click.stop>
                  <p v-waves @click="check(item.touristId,index)">查看详情</p>
                </div>
              </div>
            </section>
          </div>
          <div class="empty" v-else>
            <img src="../../assets/img/empty_tourLisr.png" alt="">
            <p>暂时没有行程</p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="footer">
      <van-button v-waves round @click="append" id="footerButton">新增行程</van-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import * as common from '../../utils/common'
  import * as config from '../../utils/config'
  import ClipboardText from '../../components/ClipboardText.vue'
  export default {
    data () {
      return {
        loading:false,
        active:0,
        serviceList:[],
        completeList:[]
      }
    },
    watch:{
      active:{
        handler(v){
          switch (v){
            case 0:
              this._getServiceList(true)
              break;
            case 1:
              this._getCompleteList(true)
              break;
          }
        },
        immediate:true
      }
    },
    created(){
      window.addEventListener('scroll', this.onLoad)
    },
    destroyed(){
      window.removeEventListener('scroll', this.onLoad)
    },
    methods:{
      onLoad(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 5){
          document.getElementById('footerButton').style.width = '14.5%'
          document.getElementById('footerButton').innerHTML = '+'
        }else {
          document.getElementById('footerButton').style.width = '100%'
          document.getElementById('footerButton').innerHTML = '新增行程'
        }
      },
      append(){
        !this.serviceList.length ? this.$router.push({path:'/AppendTours'}) : common.toast('您有未结束的行程')
      },
      cancel(touristId,processStatus,index){
        if (processStatus != '0'){
          this.$dialog.alert({
            title: '提示',
            message: `配送员已经接单，请联系配送员处理`,
            overlay: true,
          })
          return
        }
        this.$dialog.confirm({
          title: '提示',
          message: `您确定取消该行程吗`,
          overlay: true,
          closeOnClickOverlay: true,
        })
          .then(() => {
          let data = {
            touristId:touristId
          }
          this.httpCli({
            url:config.URL_TOURLIST_CANCEL,
            data:data
          })
            .then(res => {
              if(res.errorCode == 100){
                this.$toast.success('取消成功')
                this.serviceList.splice(index,1)
              }
            })
          })
          .catch(() =>{

          })
      },
      check(touristId,index){
        this.$router.push({path:'/DeliveryOrderDetail',query:{touristId:touristId}})
      },
      confirm(touristId,index){
        this.$dialog.confirm({
          title: '提示',
          message: `您确定确认签收吗`,
          overlay: true,
          closeOnClickOverlay: true,
        })
          .then(res => {
            let data = {
              touristId:touristId
            }
            this.httpCli({
              url:config.URL_TOURLIST_START_CONFIRM,
              data:data
            })
              .then(res => {
                if (res.errorCode == 100){
                  this.$toast.success('确认签收成功')
                  this._getServiceList(false)
                }
              })
          })
          .catch(err => {

          })
      },
      _getServiceList(status){
        status ? this.loading = true : ''
        this.loading = true
        let data = {
          currentPage:'1',
          pageRow:'1000'
        }
        this.httpCli({
          url:config.URL_TOURLIST_SERVICE_LIST,
          data:data
        })
          .then(res => {
            this.loading = false
            if (res.errorCode == 100){
              this.serviceList = res.data.list.gridModel
            }
          })
          .catch(err => {
            this.loading = false
          })
      },
      _getCompleteList(status){
        status ? this.loading = true : ''
        this.loading = true
        let apply = {
          currentPage:'1',
          pageRow:'1000'
        }
        this.httpCli({
          url:config.URL_TOURLIST_COMPLETE_LIST,
          data:apply
        })
          .then(res => {
            this.loading = false
            if (res.errorCode == 100){
              this.completeList = res.data.list.gridModel
            }
          })
          .catch(err => {
            this.loading = false
          })
      },
    },
    components:{
      ClipboardText
    }
  }
</script>
<style scoped>
  .wrap{
    box-sizing: border-box;
    padding:00px 0 150px 0;
  }
  .couponWrap{
    width: 100%;
  }
  section{
    width: 100%;
    padding: 28px 50px 5px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 30px;
    border-radius: 15px;
    border: 1PX #eee solid;
  }

  section .title{
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  section .title span{
    font-size: 26px;
  }
  section .content{
    padding-top: 20px;
    padding-bottom: 10px;
  }
  section .content .cell{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26px;
    color: #999;
    height:50px;
  }
  section .content .action{
    display: flex;
    justify-content: flex-end;
    margin-right: -20px;
  }
  section .content .action p{
    padding: 10px 30px;
    border-radius: 30px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1PX #999 solid;
    background-color: #fff;
    color: rgb(51,51,51);
  }
  .footer{
    position: fixed;
    bottom: 40px;
    left: 7.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85%;
  }
  .footer button {
    height:90px;
    width: 100%;
    border-radius: 51px;
    background-color: #F2180C;
    font-size: 30px;
    color: rgb(248,248,248);
    transition: all 0.2s;
  }
</style>
