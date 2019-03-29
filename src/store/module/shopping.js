import Vue from 'vue'
import * as common from '../../common'
import * as config from '../../config'
import api from '../../api/request'
export default {
  state: {
    shopList:[],
    removeShopListID:[],
    address:{}
  },
  getters: {
    finalVipPrice(state){
      return parseInt(state.shopList.reduce((total,item) => total + (item.checkStatus ? item.goodsNum*1 : 0), 0))
    },
    finalPrice(state){
      return parseInt(state.shopList.reduce((total,item) => total + (item.checkStatus ? item.goodsNum*1 : 0), 0))
    },
    shopListCheckStatusTrue(state){
      return state.shopList.filter(item => item.checkStatus == true)
    },
    shopListRemoveCheckStatusTrue(state){
      return state.shopList.filter(item => item.checkRemoveStatus == true)
    },
  },
  mutations: {
    setShopList(state,data){
      state.shopList = data
      state.shopList.map((item,index) => {
        item.checkStatus = true
        item.checkRemoveStatus = false
      })
    },
    setChangeStatusResult(state,data){
      for (let i = 0;i<state.shopList.length;i++){
        let item = state.shopList[i]
        if (item.goodsId === data.goodsId){
          item.checkStatus = !item.checkStatus
        }
        Vue.set(state.shopList,i,item)
      }
    },
    addChangeCount(state,data){
      state.shopList.map(item => {
        if (item.goodsId === data.goodsId){
          let data = {
            goodsId:item.goodsId,
          }
          api({
            url:config.URL_CART_PLUS,
            data:data
          })
            .then(res => {
              if (res.errorCode == 100){
                item.goodsNum = res.data.result
              }
            })
        }
      })
    },
    reduceChangeCount(state,data){
      state.shopList.map(item => {
        if (item.goodsId === data.goodsId) {
          let data = {
            goodsId: item.goodsId,
            goodsNum: item.goodsNum
          }
          api({
            url: config.URL_CART_REDUCE,
            data: data
          })
            .then(res => {
              if (res.errorCode == 100) {
                item.goodsNum = res.data.result
              }
            })
        }
      })
    },
    setCheckAllStatus(state,data){
      for (let i = 0;i<state.shopList.length;i++){
        let item = state.shopList[i]
        item.checkStatus = data
        Vue.set(state.shopList,i,item)
      }
    },
    setChangeGoodRemoveStatus(state,data){
      for (let i = 0;i<state.shopList.length;i++){
        let item = state.shopList[i]
        if (item.goodsId === data.goodsId){
          item.checkRemoveStatus = !item.checkRemoveStatus
        }
        Vue.set(state.shopList,i,item)
      }
    },
    setCheckAllRemoveStatus(state,data){
      for (let i = 0;i<state.shopList.length;i++){
        let item = state.shopList[i]
        item.checkRemoveStatus = data
        Vue.set(state.shopList,i,item)
      }
    },
    setRemoveShopList(state,data){
      console.log(data)
      let apply = {
        goodsIds:data.join(",")
      }
      console.log(apply)
      api({
        url:config.URL_CART_REMOVE,
        data:apply
      })
        .then(res => {
          if (res.errorCode == 100){
            state.shopList = state.shopList.filter(item => (data.indexOf(item.goodsId) == -1))
          }
        })
    },

    setOrderAddress(state,data){
      state.address = data
    }
  },
  actions: {
    getShopList({commit,data}){
      return new Promise((resolve,reject) => {
        api({
          url:config.URL_CART_LIST
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setShopList',res.data.goodsList)
              resolve(res)
            }else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    changeGoodStatus({commit},data){
      commit('setChangeStatusResult',data)
    },
    addCount({commit},data){
      commit('addChangeCount',data)
    },
    reduceCount({commit},data){
      commit('reduceChangeCount',data)
    },
    getCheckAllStatus({commit},data){
      commit('setCheckAllStatus',data)
    },
    changeGoodRemoveStatus({commit},data){
      commit('setChangeGoodRemoveStatus',data)
    },
    getCheckAllRemoveStatus({commit},data){
      commit('setCheckAllRemoveStatus',data)
    },
    getRemoveShopList({commit},data){
      commit('setRemoveShopList',data)
    },

    getOrderAddress({commit},data){
      commit('setOrderAddress',data)
    }
  }
}
