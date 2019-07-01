import Vue from 'vue'
import * as common from '../../utils/common'
import * as config from '../../utils/config'
import httpCli from '../../api/request'
import store from '../index'
import {Toast} from 'vant'

export default {
  state: {
    loading:true,
    personInfo:{},
  },
  getters: {

  },
  mutations: {
    setPersonInfo(state,data){
      state.personInfo = data
    },
    setErrorLoading(state,data){
      state.loading = false
      store.dispatch('reloadLoading')
        .then(res => {
          store.dispatch('getPersonInfo')
        })
    }
  },
  actions: {
    getPersonInfo({commit,state},data){
      return new Promise((resolve,reject) => {
        httpCli({
          url:config.URL_MEMBER_CENTER
        })
          .then(res => {
            resolve(res)
            state.loading = false
            if (res.errorCode == 100){
              commit('setPersonInfo',res.data)
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
