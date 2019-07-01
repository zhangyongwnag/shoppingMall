import Vue from 'vue'
import Vuex from 'vuex'
// 修改state时在console.log打印，便于调试
import createLogger from 'vuex/dist/logger'
import userInfo from './module/userInfo'
import home from './module/home'
import classify from './module/classify'
import shopping from './module/shopping'
import person from './module/person'
import collection from './module/collection'
import goodDetail from './module/goodDetail'
import funding from './module/funding'
import tour from './module/tour'
import calculate from './module/calculate'
import details from './module/details'
import invite from './module/invite'
import error from './module/error'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules :{
    userInfo,
    home,
    classify,
    shopping,
    person,
    collection,
    goodDetail,
    funding,
    tour,
    calculate,
    details,
    invite,
    error
  },
  // strict: debug, // 严格模式不允许直接修改state
  plugins: debug ? [createLogger()] : []
})
