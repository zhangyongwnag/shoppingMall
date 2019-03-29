import Vue from 'vue'
import * as common from '../../common'
import * as config from '../../config'
import api from '../../api/request'
export default {
  state: {
    homeList:{},
    // loading:true
  },
  getters: {
  },
  mutations: {
    setHomeList(state,data){
      state.homeList = data
      localStorage.setItem('index',JSON.stringify(data))
    },
    setLoaclStorageHomeList(state,data){
      state.homeList = data
    }
    // setLoadingStatus(state){
    //   if (state.homeList.hotGoodsList){
    //     state.loading = false
    //   }
    // }
  },
  actions: {
    getHomeList({commit}){
      return new Promise((resolve,reject)=>{
        api({
          url:config.URL_GET_SHOP_LIST,
        })
          .then(res => {
            if (res.errorCode == 100){
              commit('setHomeList',res.data)
            }
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getLoaclStorageHomeList({commit}){
      return new Promise((resolve,reject) => {
        if (localStorage.getItem('index')){
          let localStorageData = JSON.parse(localStorage.getItem('index'))
          commit('setLoaclStorageHomeList',localStorageData)
          resolve(localStorageData)
        }else {
          reject()
        }
      })
    }
  }
}
