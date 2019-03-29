/**
 * @date 2018/10/18 15:37
 * @author Zyw_20160118
 * @description 封装axios,公共参数,统一处理错误码
 * @query config response error
 * @return response or config
 */

import axios from 'axios'
import qs from 'qs'
import * as config from '../config'
import router from '../router'
import * as common from '../common'
import {Toast} from "vant";

axios.defaults.retry = 5
axios.defaults.retryDelay = 1000
axios.defaults.method = 'post'
const service = axios.create({
  // baseURL:config.HOST, //自行配置host，这边由于想要实现自动配置api，config区分了一下本地、测试、正式。
  timeout:8000,
  // retry:5,
  // retryDelay:1000
  })
service.interceptors.request.use(config => {
  //开始请求，可以添加toast/model，做点事情
  if (config.method === 'post'){
    //添加公共参数/签名。
    config.data = qs.stringify({...config.data})
  }else {
    config.params = {...config.params}
  }
  //添加请求头
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'tracecode': encodeURIComponent(JSON.stringify(common.testparam()))
  }
  return config
},error => {
  common.toast('未知错误',error)
})

service.interceptors.response.use(
  response => { //成功请求到数据
    if (response.data){
      if (response.data.errorMsg){
        switch (response.data.errorCode){
          case '104':
            //清除token
            common.toast('登录信息已失效')
            localStorage.removeItem('userInfo')
            setTimeout(()=>{
              router.replace({path:'/Login'})
            },500)
            break;
          case '106':
            //未设置支付密码
            common.toast('请先设置支付密码')
            break;
          default:
            common.toast(response.data.errorMsg)
        }
      }
      return response.data
    }else {
      common.toast('未知错误')
    }
  },
  error => { //失败统一处理
    let config = error.config
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      common.toast('请求超时')
      // if (config.retry == 0){
      //   return
      // }
      // setTimeout(()=>{
      //   Toast.loading({
      //     mask: false,
      //     message: '重新加载...',
      //     forbidClick:true,
      //     duration:0,
      //     loadingType:'spinner'
      //   });
      //   setTimeout(()=>{
      //     Toast.clear()
      //     config.retry --
      //     return axios(config);//例如再重复请求一次
      //   },2000)
      // },5000)
    } else if (error.message == 'Network Error'){
      common.toast('网络连接异常，请重试')
      // if (config.retry == 0){
      //   return
      // }
      // setTimeout(()=>{
      //   Toast.loading({
      //     mask: false,
      //     message: '重新加载...',
      //     forbidClick:true,
      //     duration:0,
      //     loadingType:'spinner'
      //   });
      //   setTimeout(()=>{
      //     Toast.clear()
      //     config.retry --
      //     return service.request(config);//例如再重复请求一次
      //   },2000)
      // },5000)
    }else {
      common.toast('未知错误',error.message)
    }
    return Promise.reject(error)
    // //404跳转404页面或者toast，网络异常可以进行异常处理，重试按钮
    // error.status == '404' ? alert('呜呜呜~~~ 404 !') : alert('网络连接异常，请重试')
    // return Promise.reject(error)

    // var config = error.config;
    // console.log(config)
    // if(!config || !config.retry) return Promise.reject(error);
    //
    // config.__retryCount = config.__retryCount || 0;
    //
    // if(config.__retryCount >= config.retry) {
    //   // Reject with the error
    //   console.log(config)
    //   return Promise.reject(error);
    // }
    //
    // config.__retryCount += 1;
    //
    // var backoff = new Promise(function(resolve) {
    //   setTimeout(function() {
    //     resolve();
    //   }, config.retryDelay || 1);
    // });
    //
    // return backoff.then(function() {
    //   return axios(config);
    // });
  }
)

export default service;


