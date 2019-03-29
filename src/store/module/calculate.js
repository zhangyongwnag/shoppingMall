import Vue from 'vue'
import * as common from '../../common'
import * as config from '../../config'
import api from '../../api/request'
export default {
  state: {
    calculateList:{},
    payOrder:{},
    deliverCalculateList:{},
  },
  getters: {

  },
  mutations: {
    setPayCalculate(state,data){
      state.calculateList = data
    },
    setPayOrder(state,data){
      state.payOrder = data
    },
    setDeliveryPayCalculate(state,data){
      state.deliverCalculateList = data
    },
    setAmountPayOrder(state,data){
      state.payOrder = data
    },
    setOrderInfoByOrderId(state,data){
      state.payOrder = data
    }
  },
  actions: {
    getPayCalculate({commit},data){
      return new Promise((resolve,reject) =>{
        api({
          url:config.URL_PAY_CALCULATE,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setPayCalculate',res.data)
              resolve(res.data)
            }else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getPayOrder({commit},data){
      return new Promise((resolve,reject) => {
        api({
          url:config.URL_PAY_ORDER,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setPayOrder',res.data)
              resolve(res.data)
            }else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getDeliveryPayCalculate({commit},data){
      return new Promise((resolve,reject) => {
        api({
          url:config.URL_DELIVERY_CALULATE,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setDeliveryPayCalculate',res.data)
              resolve(res.data)
            }else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getDeliverPayOrder({commit},data){
      return new Promise((resolve,reject) => {
        api({
          url:config.URL_DELIVERY_SUBMIT,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
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
    getAmountPayOrder({commit},data){
      return new Promise((resolve,reject) => {
        api({
          url:config.URL_WALLER_RECHARGE_ONLINE_ORDER,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setAmountPayOrder',res.data)
              resolve(res.data)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getOrderInfoByOrderId({commit},data){
      return new Promise((resolve,reject) => {
        console.log(data)
        let apply = {
          orderNo:data
        }
        api({
          url:config.URL_PAY_ORDER_INFO,
          data:apply
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setOrderInfoByOrderId',res.data)
              resolve(res.data)
            }else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
}
