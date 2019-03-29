import Vue from 'vue'
import * as common from '../../common'
import * as config from '../../config'
import api from '../../api/request'
export default {
  state: {
    defaultBankList:{}
  },
  getters: {

  },
  mutations: {
    setDefaultBank(state,data){
      state.defaultBankList = data
    }
  },
  actions: {
    getDefaultBank({commit},data){
      commit('setDefaultBank',data)
    }
  }
}
