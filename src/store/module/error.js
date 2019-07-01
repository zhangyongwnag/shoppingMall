import Vue from 'vue'
import * as common from '../../utils/common'
import * as config from '../../utils/config'
import httpCli from '../../api/request'
import store from '../../store/index'
import {Toast} from 'vant'

export default {
  state: {
    reply:1
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    getNetwork(){
      return new Promise((resolve,reject) => {
        httpCli({
          url:'https://www.baidu.com/',
          timeout:'',
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    //测试网络，如果成功返回重新请求
    reloadLoading({state}){
      console.log(state)
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          Toast.loading({
            message: `正在重连中...`,
            forbidClick:true,
            loadingType:'circular',
            duration:0
          });
          setTimeout(() => {
            Toast.clear()
            store.dispatch('getNetwork')
              .then(res => {
                Toast.success('网络连接成功')
                resolve(res)
              })
              .catch(err => {
                // state.reply ++
                // if (state.reply < 6){
                //   store.dispatch('reloadLoading')
                // }
                reject(err)
              })
          },2500)
        },2800)
      })
    }
  }
}
