import Vue from 'vue'
import * as common from '../../utils/common'
import * as config from '../../utils/config'
import httpCli from '../../api/request'
import store from '../index'

export default {
  state: {
    loading:true,
    classifyList:[],
    classifyGoodsList:[]
  },
  getters: {

  },
  mutations: {
    setClassifyList(state,data){
      state.classifyList = data
    },
    setClassifyGoodsList(state,data){
      state.classifyGoodsList = data
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
    getClassifyList({commit,state},data){
      let apply = {
        categoryParentId:data
      }
      return new Promise((resolve,reject) => {
        httpCli({
          url:config.URL_GOODS_CATEGORY_LIST,
          data:apply
        })
          .then(res => {
            state.loading = false
            if (res.errorCode == 100){
              if (data == 0){
                commit('setClassifyList',res.data.categoryList)
              }else {
                commit('setClassifyGoodsList',res.data.categoryList)
              }
              resolve(res.data.categoryList)
            }
          })
          .catch(err => {
            reject(err)
            commit('setErrorLoading')
          })
      })
    },
  }
}
