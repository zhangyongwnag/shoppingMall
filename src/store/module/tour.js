import Vue from 'vue'
import * as common from '../../utils/common'
import * as config from '../../utils/config'
import httpCli from '../../api/request'
import store from '../index'

export default {
  state: {
    chooiseStartProvinceResult:{},
    chooiseToProvinceResult:{},
    addressList:[]
  },
  getters: {

  },
  mutations: {
    setStartCity(state,data) {
      // data.pushStatus ? state.chooiseStartProvinceResult.push(data) : state.chooiseStartProvinceResult = state.chooiseStartProvinceResult.filter(item => item.regionCode != data.regionCode)
      state.chooiseStartProvinceResult = data
      store.commit('setAddressList',data.regionCode)
    },
    setToProvince(state,data){
      state.chooiseToProvinceResult = data
    },
    setAddressList(state,data){
      let apply = {
        cityCode:data
      }
      httpCli({
        url:config.URL_TOURLIST_ADDRESS_LIST,
        data:apply
      })
        .then(res => {
          if (res.errorCode == 100){
            state.addressList = res.data.addressList
            state.addressList.map(item => item.name = item.addressDetail)
          }
        })
    },
    clearTourData(state) {
      state.chooiseStartProvinceResult = {}
      state.chooiseToProvinceResult = {}
      state.addressList = []
    },
  },
  actions: {
    getStartCity({commit},data){
      return new Promise((resolve,reject) => {
        commit('setStartCity',data)
        resolve()
      })
    },
    getToProvince({commit},data){
      return new Promise((resolve,reject) => {
        commit('setToProvince',data)
        resolve()
      })
    },
  }
}
