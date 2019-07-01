import Vue from 'vue'
import * as common from '../../utils/common'
import * as config from '../../utils/config'
import api from '../../api/request'
export default {
  state: {
    defaultBankList:{},
    address:{}
  },
  getters: {

  },
  mutations: {
    setDefaultBank(state,data){
      state.defaultBankList = data
    },
    setOrderAddress(state,data){
      state.address = data
    }
  },
  actions: {
    getDefaultBank({commit},data){
      commit('setDefaultBank',data)
    },
    getOrderAddress({commit},data){
      commit('setOrderAddress',data)
    },
  }
}
