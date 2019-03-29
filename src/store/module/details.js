import Vue from 'vue'
import * as common from '../../common'
import * as config from '../../config'
import api from '../../api/request'
export default {
  state: {
    orderDetails:{}
  },
  getters: {

  },
  mutations: {
    setOrderDetails(state,data){
      state.orderDetails = data
    }
  },
  actions: {
    getOrderDetails({commit},data){
      return new Promise((resolve,reject) => {
        let apply = {
          orderId:data
        }
        api({
          url:config.URL_ORDER_DETAIL,
          data:apply
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setOrderDetails',res.data)
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
    getDeliveryOrderDetails({commit},data){
      return new Promise((resolve,reject) => {
        let apply = {
          orderId:data
        }
        api({
          url:config.URL_DELIVERY_DETAIL,
          data:apply
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setOrderDetails',res.data)
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
    getSubOrderDetails({commit},data){
      return new Promise((resolve,reject) => {
        let apply = {
          orderId:data
        }
        api({
          url:config.URL_SUB_ORDER_DETAIL,
          data:apply
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setOrderDetails',res.data)
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
  }
}
