import Vue from 'vue'
import * as common from '../../common'
import * as config from '../../config'
import api from '../../api/request'
export default {
  state: {
    assistList:{}
  },
  getters: {

  },
  mutations: {
    setAssistList(state,data){
      state.assistList = data
    }
  },
  actions: {
    getAssistList({commit}){
      return new Promise((resolve,reject) => {
        api({
          url:config.URL_MEMBER_ASSIST_REGISTER_INFO
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setAssistList',res.data)
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
