//主要用于调用微信 JS SDK
import httpCli from '@/api/request';
import * as config from './config'
import {mapActions } from 'vuex';
// import store from 'store/index';
import wx from 'weixin-js-sdk';
import {Toast} from "vant";


let appidProduct = ''
if (process.env.NODE_ENV !== 'production'){
  appidProduct = 'wx7b82b14f7537603b'
}else {
  if (process.env.type == 'test'){
    appidProduct = 'wx7b82b14f7537603b'
  }else {
    appidProduct = 'wx9798402214886397'
  }
}
export const appId = appidProduct
export const location = window.location

// 浏览器参数
export const params = (() => {
  let res = {}
  if (location.search) {
    const arr = location.search.substring(1).split('&')
    arr.forEach((item) => {
      let param = item.split('=')
      res[param[0]] = decodeURIComponent(param[1])
    })
  }
  return res
})()

// 初始化
export const initWx = (obj) => {
  return new Promise((resolve, reject) => {
    const plaintext = {
      timestamp: String(new Date().getTime()),
      nonceStr: String(parseInt(Math.random()*100000000000000)),
      url: location.href.split('#')[0]
    }
    let data = {
      plaintext:JSON.stringify(plaintext)
    }
    httpCli({
      url:config.URL_WX_SINGATURE,
      data:data
    })
      .then((res) => {
        wx.config({
          // debug: true,
          appId,
          timestamp: plaintext.timestamp,
          nonceStr: plaintext.nonceStr,
          signature: res.data.signature,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage','onMenuShareTimeline']
        })
        // 注册完毕
        wx.ready(() => {
          // 自定义“分享给朋友”及“分享到QQ”按钮
          wx.updateAppMessageShareData({
            title:obj.title,
            link:obj.link,
            imgUrl:obj.imgUrl,
            desc:obj.desc,
            success: function (res) {
              // 用户确认分享后执行的回调函数
              // Toast.success('分享成功')
            },
            cancel: function () {
              // Toast.fail('取消分享')
            }
          })
          // 自定义“分享到朋友圈”及“分享到QQ空间”按钮
          wx.updateTimelineShareData({
            title:obj.title,
            link:obj.link,
            imgUrl:obj.imgUrl,
            desc:obj.desc,
            success: function (res) {
              // 用户确认分享后执行的回调函数
              // Toast.success('分享成功')
            },
            cancel: function () {
              // Toast.fail('取消分享')
            }
          })
        })
    }, (err) => {
      reject(err)
    })
  })
}

//根据orderNo获取微信prepay_id
function _getPrePayId(orderNo){
  return new Promise((resolve,reject) => {
    let data = {
      orderNo:orderNo,
      openid:sessionStorage.getItem('openId')
//            openid:'oFlnD01-mYk7JAxuY9tVKR2O839E'
    }
    httpCli({
      url:config.URL_PAY_WX_PREPAY,
      data:data,
    })
      .then(res => {
        if (res.errorCode == 100){
          resolve(res.data.order.thirdpartyPrepayId)
        }else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

//根据plaintext获取paySign
function _getPayData(orderNo) {
  return new Promise((resolve,reject) => {
    _getPrePayId(orderNo)
      .then(res => {
        let signData = {
          appId:appId,
          timeStamp:String(new Date().getTime()),
          nonceStr:String(parseInt(Math.random()*100000000000000)),
          package:`prepay_id=${res}`,
          signType:"MD5",
        }
        return signData
      })
      .then(reply => {
        let keys = []
        for (let i in reply) {
          keys.push(i);
        }
        keys.sort();
        let signStr = ''
        for(let key = 0;key<keys.length;key++){
          signStr += keys[key] + "=" + reply[keys[key]] + '&'
        }
        let plainData = {
          plaintext:signStr.substring(0,signStr.length - 1)
        }
        httpCli({
          url:config.URL_WX_PAY_SIGNATURE,
          data:plainData
        })
          .then(res => {
            if (res.errorCode == 100){
              reply['paySign'] = res.data.signature
              resolve(reply)
            }else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
      .catch(err => {
        reject(err)
      })
  })
}

//微信公众号支付
export function _onBridgeReady(orderNo){
  return new Promise((resolve,reject) => {
    Toast.loading({
      mask: true,
      message: '支付中...',
      loadingType:'spinner',
      duration:0
    });
    _getPayData(orderNo)
      .then(res => {
        Toast.clear()
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId":res.appId,     //公众号名称，由商户传入
            "timeStamp":res.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr":res.nonceStr, //随机串
            "package":res.package,
            "signType":res.signType,         //微信签名方式：
            "paySign":res.paySign //微信签名
          },
          res => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              resolve('ok')
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              resolve('cancel')
            } else {
              reject()
            }
          });
      })
      .catch(err => {
        Toast.clear()
      })
  })
}

//设置默认分享
export function shareInfo(){
  httpCli({
    url:config.URL_ASSIST_SHARE_DEFAULT
  })
    .then(res => {
      if (res.errorCode == 100){
        let obj = {
          title:res.data.share.shareTitle,
          link:res.data.share.shareLink,
          imgUrl:res.data.share.shareIcon,
          desc:res.data.share.shareDescription,
        }
        initWx(obj)
      }
    })
}










