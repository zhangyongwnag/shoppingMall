import Vue from 'vue'
import * as common from '../../utils/common'
import * as config from '../../utils/config'
import httpCli from '../../api/request'
import store from '../../store/index'
import {Toast} from 'vant'

export default {
  state: {
    loading:true,
    shopInfo:{},
    invalidGoodsList:[],
    resultInfo:{}
  },
  getters: {
    changeAllStatus(state){
      if (state.shopInfo.goodsList && state.shopInfo.goodsList.length){
        return state.shopInfo.goodsList.filter(item => !item.goodsChooseStatus).length
      }
    },
    changeAllDeleteStatus(state){
      if (state.shopInfo.goodsList && state.shopInfo.goodsList.length) {
        return state.shopInfo.goodsList.filter(item => !item.checkRemoveStatus).length
      }
    },
    deleteTotal(state){
      if (state.shopInfo.goodsList && state.shopInfo.goodsList.length) {
        return state.shopInfo.goodsList.filter(item => item.checkRemoveStatus)
      }
    },
  },
  mutations: {
    setShopInfo(state,data){
      state.shopInfo = data
      state.invalidGoodsList = data.invalidGoodsList
      state.shopInfo.goodsList.map((item,index) => {
        item.goodsChooseStatus = item.goodsChooseStatus == '1' ? true : false
        item.checkRemoveStatus = false
      })
    },
    setChangeStatusResult(state,data){
      for (let i = 0;i<state.shopInfo.goodsList.length;i++){
        let item = state.shopInfo.goodsList[i]
        if ((item.goodsId + item.goodsEt) === (data.goodsId + data.goodsEt)){
          data.manageStatus ? item.checkRemoveStatus = !item.checkRemoveStatus : item.goodsChooseStatus = !item.goodsChooseStatus
        }
        Vue.set(state.shopInfo.goodsList,i,item)
      }
      !data.manageStatus ? store.commit('_setResultInfo') : ''
    },
    setAllChangeChooiseStatus(state,data){
      for (let i in state.shopInfo.goodsList){
        let item = state.shopInfo.goodsList[i]
        data.manageStatus ? item.checkRemoveStatus = data.status :item.goodsChooseStatus = data.status
        Vue.set(state.shopInfo.goodsList,i,item)
      }
      !data.manageStatus ? store.commit('_setResultInfo') : ''
    },
    addChangeCount(state,data){
      state.shopInfo.goodsList.map(item => {
        if (item.goodsId === data.goodsId){
          let apply = {
            goodsId:item.goodsId,
            goodsNum:1,
            goodsEt:item.goodsEt
          }
          httpCli({
            url:config.URL_CART_PLUS,
            data:apply
          })
            .then(res => {
              if (res.errorCode == 100){
                item.goodsNum = res.data.goodsFinalNum
                store.commit('_setResultInfo')
              }
            })
        }
      })
    },
    reduceChangeCount(state,data){
      state.shopInfo.goodsList.map(item => {
        if (item.goodsId === data.goodsId) {
          let apply = {
            goodsId: item.goodsId,
            goodsEt:item.goodsEt
          }
          httpCli({
            url: config.URL_CART_REDUCE,
            data: apply
          })
            .then(res => {
              if (res.errorCode == 100) {
                item.goodsNum = res.data.goodsFinalNum
                store.commit('_setResultInfo')
              }
            })
        }
      })
    },
    setRemoveShopList(state,data){
      let apply = {
        goodsList:JSON.stringify(data.removeShopIdList)
      }
      httpCli({
        url:config.URL_CART_REMOVE,
        data:apply
      })
        .then(res => {
          if (res.errorCode == 100){
            let idList = []
            data.removeFilterShopIdList.map(item => idList.push(item.goodsCheckRemoveId))
            state.shopInfo.goodsList = state.shopInfo.goodsList.filter(item => idList.indexOf(item.goodsId + item.goodsEt) == -1)
            Toast.success('刪除商品成功')
          }
        })
    },
    setClearInvalid(state){
      Toast.loading({
        mask: true,
        message: '清理中...',
        loadingType:'spinner',
        duration:0
      });
      httpCli({
        url:config.URL_CART_INVALID_CLEAR
      })
        .then(res => {
          if (res.errorCode == 100){
            state.invalidGoodsList = []
            Toast.success('清理成功')
          }
        })
        .catch(err => {
          Toast.clear()
        })
    },
    clearResultInfo(state){
      state.resultInfo = {}
    },
    _setResultInfo(state,data){
      let goodsList = []
      let chekcList = state.shopInfo.goodsList.filter(item => item.goodsChooseStatus == true)
      chekcList.map((item,index) => {
        let obj = {}
        obj.goodsId = item.goodsId
        obj.goodsNum = item.goodsNum
        obj.goodsEt = item.goodsEt
        goodsList.push(obj)
      })
      let apply = {
        goodsList:JSON.stringify(goodsList),
        from:'cart',
      }
      store.dispatch('getPayCalculate',apply)
        .then(res => {
          state.resultInfo = res
        })
    },
    setErrorLoading(state,data){
      state.loading = false
      store.dispatch('reloadLoading')
        .then(res => {
          store.dispatch('getShopInfo')
        })
    }
  },
  actions: {
    getShopInfo({commit,state},data){
      return new Promise((resolve,reject) => {
        httpCli({
          url:config.URL_CART_LIST
        })
          .then(res => {
            resolve(res)
            state.loading = false
            if (res.errorCode == 100){
              commit('setShopInfo',res.data)
            }
          })
          .catch(err => {
            reject(err)
            commit('setErrorLoading')
          })
      })
    },
    changeGoodStatus({commit},data){
      commit('setChangeStatusResult',data)
    },
    getAllChangeChooiseStatus({commit},data){
      commit('setAllChangeChooiseStatus',data)
    },
    addCount({commit},data){
      commit('addChangeCount',data)
    },
    reduceCount({commit},data){
      commit('reduceChangeCount',data)
    },
    getRemoveShopList({commit},data){
      commit('setRemoveShopList',data)
    },
    getClearInvalid({commit}){
      commit('setClearInvalid')
    }
  }
}
