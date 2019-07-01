import Vue from 'vue'
import * as common from '../../utils/common'
import * as config from '../../utils/config'
import httpCli from '../../api/request'
import store from '../index'

export default {
  state: {
    loading:true,
    homeList:{},
    hotGoodsListLeft:[],
    hotGoodsListRight:[]
  },
  getters: {

  },
  mutations: {
    setHomeList(state,data){
      state.homeList = data
      if (state.homeList.bannerList){
        state.hotGoodsListRight = state.homeList.hotGoodsList.filter((item, index) => ((index + 1) % 2) == 0)
        state.hotGoodsListLeft = state.homeList.hotGoodsList.filter((item, index) => ((index + 1) % 2) != 0)
      }
    },
    setErrorLoading(state,data){
      state.loading = false
      store.dispatch('reloadLoading')
        .then(res => {
          store.dispatch('getHomeList')
        })
    }
  },
  actions: {
    getHomeList({commit,state}){
      return new Promise((resolve,reject) => {
        httpCli({
          url:config.URL_GET_SHOP_LIST
        })
          .then(res => {
            resolve(res.data)
            state.loading = false
            if (res.errorCode == 100){
              commit('setHomeList',res.data)
            }
          })
          .catch(err => {
            reject(err)
            commit('setErrorLoading')
          })
      })
    }
  }
}
