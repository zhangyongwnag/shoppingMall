import Vue from 'vue'
import * as common from '../../utils/common'
import * as config from '../../utils/config'
import httpCli from '../../api/request'

export default {
  state: {
    calculateList: {},
    orderInfo:{},
    payOrder: {},
    chooiseGiftGoodsId: '',
    chooiseGiftGoodsTitle: ''
  },
  getters: {},
  mutations: {
    setPayCalculate (state, data) {
      state.calculateList = data
      if (data.giftGoodsList.length) {
        state.chooiseGiftGoodsId = data.giftGoodsList[0].goodsId
        state.chooiseGiftGoodsTitle = data.giftGoodsList[0].goodsTitle
      }else {
        state.chooiseGiftGoodsId = ''
        state.chooiseGiftGoodsTitle = ''
      }
    },
    setChooiseGift (state, data) {
      for (let i = 0; i < state.calculateList.giftGoodsList.length; i++) {
        let item = state.calculateList.giftGoodsList[i]
        if (item.goodsId === data.goodsId) {
          state.chooiseGiftGoodsId = data.goodsId
          state.chooiseGiftGoodsTitle = item.goodsTitle
        }
      }
    },
    setOrderInfoByOrderId (state, data) {
      state.payOrder = data
    }
  },
  actions: {
    getPayCalculate ({commit}, data) {
      return new Promise((resolve, reject) => {
        httpCli({
          url: config.URL_PAY_CALCULATE,
          data: data
        })
          .then(res => {
            if (res.errorCode == 100) {
              commit('setPayCalculate', res.data)
              resolve(res.data)
            } else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getOrderInfoByGoodsList ({commit,state},data) {
      return new Promise((resolve, reject) => {
        let goodsList = []
        state.calculateList.goodsList.map((item, index) => {
          let obj = {}
          obj.goodsId = item.goodsId
          obj.goodsNum = item.goodsNum
          obj.goodsEt = item.goodsEt
          goodsList.push(obj)
        })
        let apply = {
          goodsList: JSON.stringify(goodsList),
          giftGoodsId: state.chooiseGiftGoodsId,
        }
        if (state.calculateList.addressRequired == '1') {
          if (data.addressId) {
            apply['addressId'] = data.addressId
          } else if (state.calculateList.address && state.calculateList.address.addressId) {
            apply['addressId'] = state.calculateList.address.addressId
          }
        }
        httpCli({
          url: config.URL_PAY_ORDER,
          data: apply
        })
          .then(res => {
            if (res.errorCode == 100) {
              state.orderInfo = res.data
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
    getOrderInfoByOrderId ({commit}, data) {
      return new Promise((resolve, reject) => {
        let apply = {
          orderNo: data
        }
        httpCli({
          url: config.URL_PAY_ORDER_INFO,
          data: apply
        })
          .then(res => {
            if (res.errorCode == 100) {
              commit('setOrderInfoByOrderId', res.data)
              resolve(res.data)
            } else {
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
