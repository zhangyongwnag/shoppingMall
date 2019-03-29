import Vue from 'vue'
import Vuex from 'vuex'
// 修改state时在console打印，便于调试
import createLogger from 'vuex/dist/logger'
import finance from '@/store/module/finance'
import home from '@/store/module/home'
import shopping from '@/store/module/shopping'
import assist from '@/store/module/assist'
import goodDetils from '@/store/module/goodDetils'
import collection from '@/store/module/collection'
import calculate from '@/store/module/calculate'
import funding from '@/store/module/funding'
import details from '@/store/module/details'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  userInfo:{}
}
const getters = {

}
const mutations = {
  setUserInfo(state,data){
    state.userInfo = data
  },
  fixUserInfo(state,data){
    state.userInfo.memberLogonPasswordStatus = data
    localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
  },
  setRemoveUserInfo(state){
    state.userInfo = {}
  }
}
const actions = {
  getUserInfo({commit},data){
    commit('setUserInfo',data)
  },
  fixCommitUserInfo({commit},data){
    commit('fixUserInfo',data)
  },
  removeUserInfo({commit},data){
    commit('setRemoveUserInfo')
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    finance,
    home,
    shopping,
    assist,
    goodDetils,
    collection,
    calculate,
    funding,
    details
  },
  // strict: debug,
  plugins: debug ? [createLogger()] : []
})
