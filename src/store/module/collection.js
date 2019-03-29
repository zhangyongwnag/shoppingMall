import Vue from 'vue'
import * as common from '../../common'
import * as config from '../../config'
import api from '../../api/request'
export default {
  state: {
    collectList:{}
  },
  getters: {

  },
  mutations: {
    setCollectList(state,data){
      state.collectList = data
    },
    setCancelGood(state,data){
      if (state.collectList.gridModel){
        state.collectList.gridModel = state.collectList.gridModel.filter(item => item.goodsId != data)
      }
    }
  },
  actions: {
    getCollectList({commit}, data) {
      return new Promise((resolve,reject) => {
        let apply = {
          currentPage: '1',
          pageRow: '10000'
        }
        api({
          url: config.URL_COLLECT_LIST,
          data: apply
        })
          .then(res => {
            if (res.errorCode == 100) {
              commit('setCollectList', res.data.goodList)
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
    getCancelGood({commit}, data) {
      let apply = {
        goodsId: data
      }
      api({
        url: config.URL_COLLECT_CENCEL,
        data: apply
      })
        .then(res => {
          if (res.errorCode == 100) {
            commit('setCancelGood', data)
          }
        })
    },
    getAddCollectGood({commit}, data) {
      return new Promise((resolve,reject) => {
        let apply = {
          goodsIds: data
        }
        api({
          url: config.URL_COLLECT_ADD,
          data: apply
        })
          .then(res => {
            if (res.errorCode == 100) {
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
  },
}
