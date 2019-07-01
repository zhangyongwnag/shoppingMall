import Vue from 'vue'
import * as common from '../../utils/common'
import * as config from '../../utils/config'
import httpCli from '../../api/request'
import {Toast} from 'vant'

export default {
  state: {
    collectionList:[]
  },
  getters: {

  },
  mutations: {
    setCollectionList(state,data){
      state.collectionList = state.collectionList.concat(data)
    },
    setCancelGood(state,data){
      state.collectionList = state.collectionList.filter(item => data != item.goodsId)
    },
    clearCollecionList(state){
      state.collectionList = []
    }
  },
  actions: {
    getCollectionList({commit},data){
      return new Promise((resolve,reject) => {
        httpCli({
          url:config.URL_COLLECT_LIST,
          data:data
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setCollectionList',res.data.goodList.gridModel)
              resolve(res.data.goodList)
            }else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getAddGood({commit},data){
      return new Promise((resolve,reject) => {
        let apply = {
          goodsIds:data
        }
        httpCli({
          url:config.URL_COLLECT_ADD,
          data:apply
        })
          .then(res => {
            if (res.errorCode == 100) {
              Toast.success('收藏成功')
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
    getCancelGood({commit},data){
      return new Promise((resolve,reject) => {
        let apply = {
          goodsId:data
        }
        httpCli({
          url:config.URL_COLLECT_CENCEL,
          data:apply
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setCancelGood',data)
              Toast.success('取消收藏')
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
  }
}
