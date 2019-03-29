import Vue from 'vue'
import * as common from '../../common'
import * as config from '../../config'
import api from '../../api/request'
export default {
  state: {
    goodDetails:{},
    goodSpecListChecked:[],
    goodSpecListCheckedMoni:[],
    planList:{},
    gifList:{}
  },
  getters: {
    getGoodSpecListChecked(state,getters){
      // if (state.goodDetails.subGoodsList && state.goodDetails.subGoodsList.length){
      //   return state.goodDetails.subGoodsList.filter(item => item.subGoodsSpec == state.goodSpecListChecked.join(","))
      return state.goodSpecListChecked
    },
    chooiseGoodsPrice(state){
      if (state.gifList.goodsList && state.gifList.goodsList.length){
        return state.gifList.goodsList.reduce((total,item) => total + (item.count > 0 ? item.count*1 : 0), 0)
      }
    }
  },
  mutations: {
    setGoodDetails(state,data){
      state.goodDetails = data
      if (data.goodsOptionStatus == '0'){
        return
      }
      state.goodSpecListChecked = data.goodsDefaultSpec.split(",")
      state.goodSpecListCheckedMoni = data.goodsDefaultSpec.split(",")
      if (data.goodsDefaultSpec.split(",").length){
        data.goodsDefaultSpec.split(",").map((item,index) => {
          if (state.goodDetails.goodSpecList.length){
            for (let i = 0;i < state.goodDetails.goodSpecList[index].specItemList.length;i++){
              let specItem = state.goodDetails.goodSpecList[index].specItemList[i]
              if (item === specItem.itemId){
                specItem.checkStatus = true
              }else {
                specItem.checkStatus = false
              }
              Vue.set(state.goodDetails.goodSpecList[index].specItemList , i ,specItem)
            }
          }
        })
      }
    },
    setCheckSubStatusClick(state,data){
        for (let i = 0;i < state.goodDetails.goodSpecList[data.index].specItemList.length;i++){
          let specItem = state.goodDetails.goodSpecList[data.index].specItemList[i]
          if (i === data.keyIndex){
            specItem.checkStatus = true
            state.goodSpecListCheckedMoni[data.index] = specItem.itemId
          }else {
            specItem.checkStatus = false
          }
          Vue.set(state.goodDetails.goodSpecList[data.index].specItemList , i ,specItem)
        }
        if (state.goodSpecListCheckedMoni && (state.goodSpecListCheckedMoni.length == state.goodDetails.goodSpecList.length)){
          state.goodSpecListChecked = state.goodSpecListCheckedMoni.join(",")
        }
    },
    setPlanDetails(state,data){
      state.planList = data
    },
    setGiftDetails(state,data){
      data.goodsList.map((item,index) => {
        item.count = 0
      })
      state.gifList = data
    },
    setAddGoodsCount(state,data){
      state.gifList.goodsList.map((item,index) => {
        if (item.goodsId == data.goodsId){
          item.count ++
        }
      })
    },
    setReduceGoodsCount(state,data){
      state.gifList.goodsList.map((item,index) => {
        if (item.goodsId == data.goodsId){
          item.count --
        }
      })
    },
    fixMutationGoodsCount(state,data){
      state.gifList.goodsList.map((item,index) => {
        if (item.goodsId == data.goodsId){
          item.count = data.goodsNum
        }
      })
    }
  },
  actions: {
    getGoodDetails({commit}, data) {
      return new Promise((resolve, reject) => {
        let apply = {
          goodsId: data
        }
        api({
          url: config.URL_SHOP_GOODS_DETAIL,
          data: apply
        })
          .then(res => {
            if (res.errorCode == 100 && res.data && res.data.detail) {
              commit('setGoodDetails', res.data.detail)
              resolve(res.data.detail)
            }else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getCheckSubStatusClick({commit}, data) {
      commit('setCheckSubStatusClick', data)
    },
    getPlanDetails({commit}, data) {
      return new Promise((resolve, reject) => {
        let apply = {
          packageId: data
        }
        api({
          url: config.URL_PACKAGE_CATEGORY_LIST,
          data: apply
        })
          .then(res => {
            if (res.errorCode == 100) {
              commit('setPlanDetails', res.data.detail)
              resolve(res.data.detail)
            }else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getGiftDetails({commit}, data) {
      return new Promise((resolve, reject) => {
        let apply = {
          packageId: data
        }
        api({
          url: config.URL_GOODS_GIFT_LIST,
          data: apply
        })
          .then(res => {
            if (res.errorCode == 100) {
              commit('setGiftDetails', res.data.detail)
              resolve(res.data.detail)
            }else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getAddGoodsCount({commit},data){
      commit('setAddGoodsCount',data)
    },
    getReduceGoodsCount({commit},data){
      commit('setReduceGoodsCount',data)
    },
    fixGoodsCount({commit},data){
      commit('fixMutationGoodsCount',data)
    }
  }
}
