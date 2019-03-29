import Vue from 'vue'
export default {
  state: {
    a:'123'
  },
  getters: {
    bbb(state){
      return state.a.split('')
    }
  },
  mutations: {
    setListItem(state,data){
      state.a = data
    }
  },
  actions: {
    setList({commit},data){
      commit('setListItem',data)
    }
  }
}
