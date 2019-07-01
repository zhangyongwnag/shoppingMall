import Vue from 'vue'
import * as common from '../../utils/common'
import * as config from '../../utils/config'
import httpCli from '../../api/request'

export default {
  state: {
    inviteHighVipMiddlePageData:{},
    inviteVipMiddlePageData:{}
  },
  getters: {

  },
  mutations: {
    setInviteHighVipMiddlePage(state,data){
      state.inviteHighVipMiddlePageData = data
    },
    setInviteVipMiddlePage(state,data){
      state.inviteVipMiddlePageData = data
    }
  },
  actions: {
    getInviteHighVipMiddlePage({commit}){
      return new Promise((resolve,reject) => {
        httpCli({
          url:config.URL_INVITE_DIAMONDS
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setInviteHighVipMiddlePage',res.data)
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
    getInviteVipMiddlePage({commit}){
      return new Promise((resolve,reject) => {
        httpCli({
          url:config.URL_INVITE_VIP
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setInviteVipMiddlePage',res.data)
              resolve(res)
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
